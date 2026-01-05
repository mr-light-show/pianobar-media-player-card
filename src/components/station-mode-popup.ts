import { LitElement, html, css, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface StationMode {
  id: number;
  name: string;
  description: string;
  active: boolean;
}

@customElement('pmc-station-mode-popup')
export class StationModePopup extends LitElement {
  @property({ type: String }) currentStationId = '';
  @property({ type: String }) currentStationName = '';
  @property({ type: Array }) modes: StationMode[] = [];
  @property({ type: Boolean }) loading = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) externalOpen = false;
  @property({ type: Object }) anchorPosition?: { left: number; top: number; bottom: number; right: number };

  @state() private _menuOpen = false;
  @state() private _menuTop = 0;
  @state() private _menuLeft = 0;
  @state() private _selectedModeId: number | null = null;

  private _ignoreNextClickOutside = false;

  static styles = css`
    :host {
      position: relative;
      display: inline-block;
    }

    .menu-popup {
      position: fixed;
      background: var(--pmc-card-background);
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      padding: 8px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      z-index: 99999;
      min-width: 350px;
      max-width: 500px;
      max-height: calc(100vh - 100px);
      overflow-y: auto;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s, visibility 0.2s;
    }

    .menu-popup.open {
      opacity: 1;
      visibility: visible;
    }

    .popup-header {
      padding: 12px 16px;
      font-size: 16px;
      font-weight: 600;
      color: var(--primary-text-color);
      border-bottom: 1px solid var(--pmc-divider);
      margin-bottom: 8px;
    }

    .info-note {
      padding: 12px;
      background: var(--pmc-secondary-background);
      border-radius: 8px;
      font-size: 13px;
      color: var(--secondary-text-color);
      line-height: 1.4;
      margin-bottom: 12px;
    }

    .modes-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 12px;
    }

    .mode-item {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 12px;
      background: transparent;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
      user-select: none;
      border: 2px solid transparent;
    }

    .mode-item:hover {
      background: var(--pmc-secondary-background);
    }

    .mode-item.active {
      border-color: var(--pmc-primary-color);
      background: rgba(var(--pmc-primary-color-rgb, 118, 75, 162), 0.1);
    }

    .mode-item.selected {
      border-color: var(--pmc-primary-color);
    }

    .mode-header {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .mode-header input[type="radio"] {
      margin: 0;
      cursor: pointer;
    }

    .mode-name {
      font-size: 15px;
      font-weight: 500;
      color: var(--primary-text-color);
      flex: 1;
    }

    .mode-active-badge {
      padding: 4px 10px;
      background: var(--pmc-primary-color);
      color: white;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .mode-description {
      font-size: 13px;
      color: var(--secondary-text-color);
      line-height: 1.4;
      margin-left: 32px;
    }

    .popup-footer {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding-top: 8px;
      border-top: 1px solid var(--pmc-divider);
    }

    .popup-footer button {
      padding: 8px 16px;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .popup-footer button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .button-cancel {
      background: transparent;
      color: var(--primary-text-color);
    }

    .button-cancel:hover:not(:disabled) {
      background: var(--pmc-secondary-background);
    }

    .button-confirm {
      background: var(--pmc-primary-color);
      color: white;
    }

    .button-confirm:hover:not(:disabled) {
      opacity: 0.9;
    }

    .loading {
      padding: 24px;
      text-align: center;
      color: var(--secondary-text-color);
      font-size: 14px;
    }

    .no-modes {
      padding: 24px;
      text-align: center;
      color: var(--secondary-text-color);
      font-size: 14px;
    }

    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 99998;
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
    if (this._ignoreNextClickOutside) {
      this._ignoreNextClickOutside = false;
      return;
    }
    if (this._menuOpen && !event.composedPath().includes(this)) {
      this._closePopup();
    }
  }

  firstUpdated() {
    if (this.externalOpen && !this._menuOpen) {
      this._openPopupExternal();
    }
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('externalOpen') && this.externalOpen && !this._menuOpen) {
      this._openPopupExternal();
    }
    if (changedProperties.has('anchorPosition') && this._menuOpen && this.anchorPosition) {
      this._updateMenuPosition();
    }
    // Reset selected mode when modes change
    if (changedProperties.has('modes') && this.modes.length > 0) {
      const activeMode = this.modes.find(m => m.active);
      if (activeMode && this._selectedModeId === null) {
        this._selectedModeId = activeMode.id;
      }
    }
  }

  private _openPopupExternal() {
    this._ignoreNextClickOutside = true;
    requestAnimationFrame(() => {
      this._openPopup();
    });
  }

  private _openPopup() {
    if (!this.disabled) {
      this._updateMenuPosition();
      // Pre-select the active mode
      const activeMode = this.modes.find(m => m.active);
      if (activeMode) {
        this._selectedModeId = activeMode.id;
      }
      this._menuOpen = true;
    }
  }

  private _closePopup() {
    this._menuOpen = false;
    this._selectedModeId = null;
    this.dispatchEvent(new CustomEvent('popup-closed', { bubbles: true, composed: true }));
  }

  private _updateMenuPosition() {
    if (this.anchorPosition) {
      const menuWidth = 400;
      const estimatedHeight = this.modes.length * 80 + 150;
      const maxMenuHeight = window.innerHeight - 100; // Account for max-height: calc(100vh - 100px)
      const menuHeight = Math.min(estimatedHeight, maxMenuHeight);
      const padding = 8;
      const gap = 4;

      // Position below anchor by default
      let left = this.anchorPosition.left;
      let top = this.anchorPosition.bottom + gap;

      // Clamp to screen edges
      left = Math.max(padding, Math.min(left, window.innerWidth - menuWidth - padding));
      
      // If not enough space below, show above
      if (top + menuHeight > window.innerHeight - padding) {
        top = this.anchorPosition.top - gap - menuHeight;
        top = Math.max(padding, top);
      } else {
        top = Math.min(top, window.innerHeight - menuHeight - padding);
      }

      this._menuLeft = left;
      this._menuTop = top;
    }
  }

  private _handleModeSelect(modeId: number) {
    this._selectedModeId = modeId;
  }

  private _handleSetMode() {
    if (this.currentStationId && this._selectedModeId !== null) {
      this.dispatchEvent(new CustomEvent('set-mode', {
        bubbles: true,
        composed: true,
        detail: { 
          stationId: this.currentStationId,
          modeId: this._selectedModeId
        }
      }));
      this._closePopup();
    }
  }

  render() {
    if (!this.externalOpen) {
      return nothing;
    }

    return html`
      ${this._menuOpen ? html`<div class="backdrop" @click=${this._closePopup}></div>` : nothing}
      <div
        class="menu-popup ${this._menuOpen ? 'open' : ''}"
        style="left: ${this._menuLeft}px; top: ${this._menuTop}px;"
      >
        <div class="popup-header">
          ${this.currentStationName ? `Station Mode: ${this.currentStationName}` : 'Station Mode'}
        </div>
        
        ${this.loading
          ? html`<div class="loading">Loading modes...</div>`
          : this.modes.length === 0
            ? html`<div class="no-modes">No modes available</div>`
            : html`
                <div class="info-note">
                  Note: Changing the station mode will restart playback.
                </div>
                
                <div class="modes-list">
                  ${this.modes.map(mode => html`
                    <div 
                      class="mode-item ${mode.active ? 'active' : ''} ${this._selectedModeId === mode.id ? 'selected' : ''}"
                      @click=${() => this._handleModeSelect(mode.id)}
                    >
                      <div class="mode-header">
                        <input
                          type="radio"
                          name="mode-select"
                          .value=${mode.id}
                          .checked=${this._selectedModeId === mode.id}
                          @change=${() => this._handleModeSelect(mode.id)}
                        >
                        <span class="mode-name">${mode.name}</span>
                        ${mode.active ? html`<span class="mode-active-badge">Active</span>` : nothing}
                      </div>
                      <div class="mode-description">${mode.description}</div>
                    </div>
                  `)}
                </div>
                
                <div class="popup-footer">
                  <button class="button-cancel" @click=${this._closePopup}>
                    Cancel
                  </button>
                  <button 
                    class="button-confirm"
                    ?disabled=${this._selectedModeId === null}
                    @click=${this._handleSetMode}
                  >
                    Set Mode
                  </button>
                </div>
              `
        }
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pmc-station-mode-popup': StationModePopup;
  }
}

