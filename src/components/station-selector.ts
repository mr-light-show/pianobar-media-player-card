import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Station } from '../types';

@customElement('pmc-station-selector')
export class StationSelector extends LitElement {
  @property({ type: Array }) stations: Station[] = [];
  @property({ type: String }) currentStationId = '';
  @property({ type: String }) currentStationName = '';
  @property({ type: String }) songStationName = '';
  @property({ type: String }) mode: 'compact' | 'normal' = 'compact';
  @property({ type: Boolean }) disabled = false;

  @state() private _menuOpen = false;
  @state() private _menuTop = 0;
  @state() private _menuLeft = 0;
  @state() private _showAbove = true;

  static styles = css`
    :host {
      position: relative;
      display: inline-block;
    }

    .trigger-button {
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      border-radius: 20px;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: background-color 0.2s;
      color: inherit;
      font-size: 14px;
      font-weight: 500;
    }

    .trigger-button:hover:not(:disabled) {
      background-color: rgba(128, 128, 128, 0.2);
    }

    .trigger-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .trigger-button ha-icon {
      --mdc-icon-size: 24px;
    }

    .trigger-button.compact {
      padding: 8px;
      border-radius: 50%;
    }

    .station-name {
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .quickmix-indicator {
      --mdc-icon-size: 16px;
      opacity: 0.7;
    }

    .menu-popup {
      position: fixed;
      background: var(--card-background-color, #fff);
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      padding: 4px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      z-index: 1000;
      min-width: 200px;
      max-width: 300px;
      max-height: 400px;
      overflow-y: auto;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s, visibility 0.2s;
      transform: translateX(-50%);
    }

    .menu-popup.open {
      opacity: 1;
      visibility: visible;
    }

    .station-button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border: none;
      border-radius: 8px;
      background: transparent;
      color: var(--primary-text-color);
      cursor: pointer;
      transition: all 0.2s;
      text-align: left;
      font-size: 14px;
      width: 100%;
    }

    .station-button:hover {
      background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
    }

    .station-button.active {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }

    .station-button.active:hover {
      background: var(--primary-color, #03a9f4);
    }

    .station-button ha-icon {
      --mdc-icon-size: 20px;
      flex-shrink: 0;
    }

    .station-button .station-text {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .station-button .quickmix-badge {
      --mdc-icon-size: 16px;
      flex-shrink: 0;
      color: var(--primary-color, #03a9f4);
    }

    .station-button.active .quickmix-badge {
      color: var(--text-primary-color, #fff);
    }

    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 99;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._handleClickOutside = this._handleClickOutside.bind(this);
    document.addEventListener('click', this._handleClickOutside);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleClickOutside);
  }

  private _handleClickOutside(event: MouseEvent) {
    if (this._menuOpen && !event.composedPath().includes(this)) {
      this._menuOpen = false;
    }
  }

  private _toggleMenu(e: Event) {
    e.stopPropagation();
    if (!this.disabled && this.stations.length > 0) {
      if (!this._menuOpen) {
        this._updateMenuPosition();
      }
      this._menuOpen = !this._menuOpen;
    }
  }

  private _updateMenuPosition() {
    const rect = this.getBoundingClientRect();
    const menuHeight = Math.min(400, this.stations.length * 40 + 8); // Approximate menu height
    const padding = 8; // Minimum padding from screen edge
    const gap = 8; // Gap between button and menu

    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;

    // Only show above if there's enough space, otherwise show below
    this._showAbove = spaceAbove >= menuHeight + gap;

    // Center horizontally on button, but clamp to screen edges
    this._menuLeft = Math.max(padding + 100, Math.min(
      rect.left + rect.width / 2,
      window.innerWidth - padding - 100
    ));

    if (this._showAbove) {
      // Position menu above button
      this._menuTop = Math.max(padding, rect.top - gap - menuHeight);
    } else {
      // Position menu below button
      this._menuTop = Math.min(rect.bottom + gap, window.innerHeight - menuHeight - padding);
    }
  }

  private _handleStationClick(station: Station) {
    this.dispatchEvent(
      new CustomEvent('station-change', {
        detail: { stationId: station.id, stationName: station.name },
        bubbles: true,
        composed: true,
      })
    );
    this._menuOpen = false;
  }

  private _closeMenu() {
    this._menuOpen = false;
  }

  private _getCurrentStation(): Station | undefined {
    return this.stations.find(s => s.id === this.currentStationId);
  }

  render() {
    const currentStation = this._getCurrentStation();
    const isQuickMix = currentStation?.isQuickMix ?? false;

    // Determine display name for normal mode
    let displayName = this.currentStationName || 'Select Station';
    if (isQuickMix && this.songStationName) {
      displayName = this.songStationName;
    }

    // Determine icon: shuffle for QuickMix, radio otherwise
    const icon = isQuickMix ? 'mdi:shuffle' : 'mdi:radio';

    return html`
      ${this._menuOpen
        ? html`<div class="backdrop" @click=${this._closeMenu}></div>`
        : nothing}
      <button
        class="trigger-button ${this.mode}"
        @click=${this._toggleMenu}
        ?disabled=${this.disabled || this.stations.length === 0}
        title="${displayName}"
      >
        <ha-icon icon="${icon}"></ha-icon>
        ${this.mode === 'normal'
          ? html`
              <span class="station-name">${displayName}</span>
              ${isQuickMix ? html`<ha-icon class="quickmix-indicator" icon="mdi:shuffle"></ha-icon>` : nothing}
            `
          : nothing}
      </button>
      <div
        class="menu-popup ${this._menuOpen ? 'open' : ''}"
        style="left: ${this._menuLeft}px; top: ${this._menuTop}px;"
      >
        ${this.stations.map(station => {
          const isActive = station.id === this.currentStationId;
          const stationIcon = station.isQuickMix ? 'mdi:shuffle' : 'mdi:play-circle-outline';
          const showQuickMixBadge = station.isQuickMixed && !station.isQuickMix;

          return html`
            <button
              class="station-button ${isActive ? 'active' : ''}"
              @click=${() => this._handleStationClick(station)}
            >
              <ha-icon icon="${stationIcon}"></ha-icon>
              <span class="station-text">${station.name}</span>
              ${showQuickMixBadge
                ? html`<ha-icon class="quickmix-badge" icon="mdi:shuffle"></ha-icon>`
                : nothing}
            </button>
          `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pmc-station-selector': StationSelector;
  }
}

