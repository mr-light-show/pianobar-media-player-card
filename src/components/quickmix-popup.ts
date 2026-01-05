import { LitElement, html, css, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { Station } from '../types';

@customElement('pmc-quickmix-popup')
export class QuickMixPopup extends LitElement {
  @property({ type: Array }) stations: Station[] = [];
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) externalOpen = false;
  @property({ type: Object }) anchorPosition?: { left: number; top: number; bottom: number; right: number };

  @state() private _menuOpen = false;
  @state() private _menuTop = 0;
  @state() private _menuLeft = 0;
  @state() private _showAbove = true;
  @state() private _selectedStationIds: Set<string> = new Set();

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
      min-width: 280px;
      max-width: 350px;
      max-height: calc(100vh - 100px);
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

    .header {
      padding: 12px 8px 8px;
      font-weight: 600;
      font-size: 16px;
      color: var(--primary-text-color);
      border-bottom: 1px solid var(--pmc-divider);
    }

    .list-container {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 4px 0;
    }

    .list-item {
      display: flex;
      align-items: center;
      padding: 10px 12px;
      border-radius: 8px;
      background: transparent;
      transition: background 0.2s;
      cursor: pointer;
    }

    .list-item:hover:not(.disabled) {
      background: var(--pmc-secondary-background);
    }

    .list-item.disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .list-item label {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      cursor: pointer;
    }

    .list-item.disabled label {
      cursor: not-allowed;
    }

    .list-item input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
      margin: 0;
      flex-shrink: 0;
    }

    .list-item.disabled input[type="checkbox"] {
      cursor: not-allowed;
    }

    .item-name {
      flex: 1;
      font-size: 14px;
      color: var(--primary-text-color);
    }

    .footer {
      display: flex;
      gap: 8px;
      padding: 8px;
      border-top: 1px solid var(--pmc-divider);
      justify-content: flex-end;
    }

    .footer button {
      padding: 8px 16px;
      border-radius: 8px;
      border: none;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .footer button.cancel {
      background: transparent;
      color: var(--primary-text-color);
    }

    .footer button.cancel:hover {
      background: var(--pmc-secondary-background);
    }

    .footer button.save {
      background: var(--primary-color);
      color: var(--text-primary-color);
    }

    .footer button.save:hover {
      opacity: 0.9;
    }

    .footer button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .no-stations {
      padding: 16px;
      text-align: center;
      color: var(--secondary-text-color);
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
      this._menuOpen = false;
      this.dispatchEvent(new CustomEvent('popup-closed', { bubbles: true, composed: true }));
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
    if (changedProperties.has('stations') || changedProperties.has('externalOpen')) {
      this._initializeSelection();
    }
  }

  private _initializeSelection() {
    this._selectedStationIds = new Set(
      this.stations
        .filter(s => s.isQuickMixed && !s.isQuickMix)
        .map(s => s.id)
    );
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
      this._menuOpen = true;
    }
  }

  private _updateMenuPosition() {
    if (!this.anchorPosition) return;

    const menuWidth = 280; // min-width
    const selectableCount = this.stations.filter(s => !s.isQuickMix).length;
    const estimatedHeight = selectableCount * 50 + 80; // Approx height per item + header/footer
    const maxMenuHeight = window.innerHeight - 100; // Account for max-height: calc(100vh - 100px)
    const menuHeight = Math.min(estimatedHeight, maxMenuHeight);

    let left = this.anchorPosition.left + (this.anchorPosition.right - this.anchorPosition.left) / 2;
    let top = this.anchorPosition.bottom + 4; // 4px gap below anchor

    // Adjust for horizontal centering
    left -= menuWidth / 2;

    // Clamp to screen edges
    const padding = 8;
    left = Math.max(padding, Math.min(left, window.innerWidth - menuWidth - padding));

    // If not enough space below, try to show above
    if (top + menuHeight > window.innerHeight - padding) {
      top = this.anchorPosition.top - 4 - menuHeight;
      top = Math.max(padding, top);
      this._showAbove = true;
    } else {
      top = Math.min(top, window.innerHeight - menuHeight - padding);
      this._showAbove = false;
    }

    this._menuLeft = left;
    this._menuTop = top;
  }

  private _handleCheckboxChange(stationId: string, checked: boolean) {
    if (checked) {
      this._selectedStationIds.add(stationId);
    } else {
      this._selectedStationIds.delete(stationId);
    }
    this.requestUpdate();
  }

  private _handleSave() {
    const stationIds = Array.from(this._selectedStationIds);
    this.dispatchEvent(new CustomEvent('save', {
      bubbles: true,
      composed: true,
      detail: { stationIds },
    }));
    this._menuOpen = false;
    this.dispatchEvent(new CustomEvent('popup-closed', { bubbles: true, composed: true }));
  }

  private _handleCancel() {
    this._menuOpen = false;
    this.dispatchEvent(new CustomEvent('popup-closed', { bubbles: true, composed: true }));
  }

  render() {
    if (!this.externalOpen && !this._menuOpen) return nothing;

    // Filter out the QuickMix station itself
    const selectableStations = this.stations.filter(s => !s.isQuickMix);

    return html`
      <div class="backdrop" @click=${this._handleClickOutside}></div>
      <div
        class="menu-popup ${this._menuOpen ? 'open' : ''}"
        style=${styleMap({
          left: `${this._menuLeft}px`,
          top: `${this._menuTop}px`,
          transform: `translateX(-50%) translateY(${this._showAbove ? '-100%' : '0'})`,
        })}
      >
        <div class="header">Select QuickMix Stations</div>
        
        ${selectableStations.length === 0
          ? html`<div class="no-stations">No stations available</div>`
          : html`
              <div class="list-container">
                ${selectableStations.map(
                  (station) => html`
                    <div class="list-item ${this.disabled ? 'disabled' : ''}">
                      <label>
                        <input
                          type="checkbox"
                          .checked=${this._selectedStationIds.has(station.id)}
                          ?disabled=${this.disabled}
                          @change=${(e: Event) =>
                            this._handleCheckboxChange(station.id, (e.target as HTMLInputElement).checked)
                          }
                        />
                        <span class="item-name">${station.name}</span>
                      </label>
                    </div>
                  `
                )}
              </div>
              
              <div class="footer">
                <button class="cancel" @click=${this._handleCancel} ?disabled=${this.disabled}>
                  Cancel
                </button>
                <button class="save" @click=${this._handleSave} ?disabled=${this.disabled}>
                  Save
                </button>
              </div>
            `}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pmc-quickmix-popup': QuickMixPopup;
  }
}

