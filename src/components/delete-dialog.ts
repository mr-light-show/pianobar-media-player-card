import { LitElement, html, css, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { Station } from '../types';

@customElement('pmc-delete-dialog')
export class DeleteDialog extends LitElement {
  @property({ type: Array }) stations: Station[] = [];
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) externalOpen = false;
  @property({ type: Object }) anchorPosition?: { left: number; top: number; bottom: number; right: number };

  @state() private _dialogOpen = false;
  @state() private _dialogTop = 0;
  @state() private _dialogLeft = 0;
  @state() private _selectedStationId: string | null = null;
  @state() private _selectedStationName: string = '';

  private _ignoreNextClickOutside = false;

  static styles = css`
    :host {
      position: relative;
      display: inline-block;
    }

    .dialog {
      position: fixed;
      background: var(--pmc-card-background);
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      padding: 0;
      display: flex;
      flex-direction: column;
      z-index: 99999;
      min-width: 320px;
      max-width: 450px;
      max-height: calc(100vh - 100px);
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s, visibility 0.2s;
      transform: translate(-50%, -50%);
    }

    .dialog.open {
      opacity: 1;
      visibility: visible;
    }

    .dialog-header {
      padding: 16px 20px;
      font-weight: 600;
      font-size: 18px;
      color: var(--primary-text-color);
      border-bottom: 1px solid var(--pmc-divider);
    }

    .dialog-body {
      padding: 20px;
      overflow-y: auto;
      flex: 1;
      min-height: 0;
    }

    .station-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .station-item {
      display: flex;
      align-items: center;
      padding: 12px;
      border-radius: 8px;
      background: transparent;
      transition: background 0.2s;
      cursor: pointer;
    }

    .station-item:hover:not(.disabled) {
      background: var(--pmc-secondary-background);
    }

    .station-item.disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .station-item label {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      cursor: pointer;
    }

    .station-item.disabled label {
      cursor: not-allowed;
    }

    .station-item input[type="radio"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
      margin: 0;
      flex-shrink: 0;
    }

    .station-item.disabled input[type="radio"] {
      cursor: not-allowed;
    }

    .station-name {
      flex: 1;
      font-size: 14px;
      color: var(--primary-text-color);
    }

    .warning-message {
      padding: 16px;
      background: rgba(244, 67, 54, 0.1);
      border-left: 4px solid #f44336;
      border-radius: 4px;
      margin-bottom: 16px;
    }

    .warning-message p {
      margin: 0;
      font-size: 14px;
      color: var(--primary-text-color);
      line-height: 1.4;
    }

    .warning-message strong {
      color: #f44336;
    }

    .dialog-footer {
      display: flex;
      gap: 8px;
      padding: 16px 20px;
      border-top: 1px solid var(--pmc-divider);
      justify-content: flex-end;
    }

    .dialog-footer button {
      padding: 8px 16px;
      border-radius: 8px;
      border: none;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .dialog-footer button.cancel {
      background: transparent;
      color: var(--primary-text-color);
    }

    .dialog-footer button.cancel:hover {
      background: var(--pmc-secondary-background);
    }

    .dialog-footer button.delete {
      background: #f44336;
      color: #fff;
    }

    .dialog-footer button.delete:hover {
      background: #d32f2f;
    }

    .dialog-footer button:disabled {
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
    if (this._dialogOpen && !event.composedPath().includes(this)) {
      this._handleCancel();
    }
  }

  firstUpdated() {
    if (this.externalOpen && !this._dialogOpen) {
      this._openDialogExternal();
    }
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('externalOpen') && this.externalOpen && !this._dialogOpen) {
      this._openDialogExternal();
    }
  }

  private _openDialogExternal() {
    this._ignoreNextClickOutside = true;
    requestAnimationFrame(() => {
      this._openDialog();
    });
  }

  private _openDialog() {
    if (!this.disabled) {
      this._updateDialogPosition();
      this._dialogOpen = true;
    }
  }

  private _updateDialogPosition() {
    // Center dialog on screen
    this._dialogLeft = window.innerWidth / 2;
    this._dialogTop = window.innerHeight / 2;
  }

  private _handleStationSelect(stationId: string, stationName: string) {
    this._selectedStationId = stationId;
    this._selectedStationName = stationName;
    this.requestUpdate();
  }

  private _handleDelete() {
    if (this._selectedStationId && this._selectedStationName) {
      this.dispatchEvent(new CustomEvent('delete-station', {
        bubbles: true,
        composed: true,
        detail: { 
          stationId: this._selectedStationId,
          stationName: this._selectedStationName
        }
      }));
      this._handleClose();
    }
  }

  private _handleCancel() {
    this._handleClose();
  }

  private _handleClose() {
    this._dialogOpen = false;
    this._selectedStationId = null;
    this._selectedStationName = '';
    this.dispatchEvent(new CustomEvent('dialog-closed', { bubbles: true, composed: true }));
  }

  render() {
    if (!this.externalOpen && !this._dialogOpen) return nothing;

    const selectableStations = this.stations.filter(s => !s.isQuickMix);

    return html`
      <div class="backdrop" @click=${this._handleClickOutside}></div>
      <div
        class="dialog ${this._dialogOpen ? 'open' : ''}"
        style=${styleMap({
          left: `${this._dialogLeft}px`,
          top: `${this._dialogTop}px`,
        })}
      >
        <div class="dialog-header">Delete Station</div>
        <div class="dialog-body">
          <div class="warning-message">
            <p>
              <strong>Warning:</strong> This will permanently delete the selected station. 
              This action cannot be undone.
            </p>
          </div>
          
          ${selectableStations.length === 0
            ? html`<div class="no-stations">No stations available to delete</div>`
            : html`
                <div class="station-list">
                  ${selectableStations.map(
                    (station) => html`
                      <div class="station-item ${this.disabled ? 'disabled' : ''}">
                        <label>
                          <input
                            type="radio"
                            name="station-select"
                            .value=${station.id}
                            .checked=${this._selectedStationId === station.id}
                            ?disabled=${this.disabled}
                            @change=${() => this._handleStationSelect(station.id, station.name)}
                          />
                          <span class="station-name">${station.name}</span>
                        </label>
                      </div>
                    `
                  )}
                </div>
              `}
        </div>
        <div class="dialog-footer">
          <button class="cancel" @click=${this._handleCancel} ?disabled=${this.disabled}>
            Cancel
          </button>
          <button class="delete" @click=${this._handleDelete} ?disabled=${!this._selectedStationId || this.disabled}>
            Delete Station
          </button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pmc-delete-dialog': DeleteDialog;
  }
}

