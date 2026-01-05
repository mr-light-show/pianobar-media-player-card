import { LitElement, html, css, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { Station } from '../types';

@customElement('pmc-rename-dialog')
export class RenameDialog extends LitElement {
  @property({ type: Array }) stations: Station[] = [];
  @property({ type: Boolean}) disabled = false;
  @property({ type: Boolean }) externalOpen = false;
  @property({ type: Object }) anchorPosition?: { left: number; top: number; bottom: number; right: number };

  @state() private _dialogOpen = false;
  @state() private _dialogTop = 0;
  @state() private _dialogLeft = 0;
  @state() private _stage: 'select-station' | 'enter-name' = 'select-station';
  @state() private _selectedStationId: string | null = null;
  @state() private _selectedStationName: string = '';
  @state() private _newName: string = '';

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
      max-height: 400px;
      overflow-y: auto;
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

    .name-input-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .current-station {
      font-size: 14px;
      color: var(--secondary-text-color);
    }

    .current-station strong {
      color: var(--primary-text-color);
    }

    .name-input {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid var(--pmc-divider);
      border-radius: 8px;
      background: var(--pmc-card-background);
      color: var(--primary-text-color);
      font-size: 16px;
      font-family: inherit;
      box-sizing: border-box;
    }

    .name-input:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    .info-note {
      padding: 12px;
      background: var(--pmc-secondary-background);
      border-radius: 8px;
      font-size: 13px;
      color: var(--secondary-text-color);
      line-height: 1.4;
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

    .dialog-footer button.back {
      margin-right: auto;
      background: transparent;
      color: var(--primary-text-color);
    }

    .dialog-footer button.back:hover {
      background: var(--pmc-secondary-background);
    }

    .dialog-footer button.cancel {
      background: transparent;
      color: var(--primary-text-color);
    }

    .dialog-footer button.cancel:hover {
      background: var(--pmc-secondary-background);
    }

    .dialog-footer button.confirm {
      background: var(--primary-color);
      color: var(--text-primary-color);
    }

    .dialog-footer button.confirm:hover {
      opacity: 0.9;
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

  private _handleNext() {
    if (this._selectedStationId) {
      this._stage = 'enter-name';
      this._newName = this._selectedStationName; // Pre-fill with current name
      this.requestUpdate();
    }
  }

  private _handleBack() {
    this._stage = 'select-station';
    this._newName = '';
    this.requestUpdate();
  }

  private _handleNameInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this._newName = input.value;
    this.requestUpdate();
  }

  private _handleRename() {
    if (this._selectedStationId && this._newName.trim() && this._newName !== this._selectedStationName) {
      this.dispatchEvent(new CustomEvent('rename-station', {
        bubbles: true,
        composed: true,
        detail: { 
          stationId: this._selectedStationId,
          newName: this._newName.trim()
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
    this._stage = 'select-station';
    this._selectedStationId = null;
    this._selectedStationName = '';
    this._newName = '';
    this.dispatchEvent(new CustomEvent('dialog-closed', { bubbles: true, composed: true }));
  }

  private _renderSelectStation() {
    const selectableStations = this.stations.filter(s => !s.isQuickMix);

    return html`
      <div class="dialog-header">Rename Station</div>
      <div class="dialog-body">
        ${selectableStations.length === 0
          ? html`<div class="no-stations">No stations available to rename</div>`
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
        <button class="confirm" @click=${this._handleNext} ?disabled=${!this._selectedStationId || this.disabled}>
          Next
        </button>
      </div>
    `;
  }

  private _renderEnterName() {
    const isChanged = this._newName.trim() && this._newName !== this._selectedStationName;

    return html`
      <div class="dialog-header">Rename: ${this._selectedStationName}</div>
      <div class="dialog-body">
        <div class="name-input-section">
          <div class="current-station">
            Current name: <strong>${this._selectedStationName}</strong>
          </div>
          
          <input
            type="text"
            class="name-input"
            placeholder="Enter new station name"
            .value=${this._newName}
            ?disabled=${this.disabled}
            @input=${this._handleNameInput}
            @keydown=${(e: KeyboardEvent) => {
              if (e.key === 'Enter' && isChanged && !this.disabled) {
                this._handleRename();
              }
            }}
            autofocus
          />
          
          <div class="info-note">
            Note: Pandora may not allow some stations to be renamed.
          </div>
        </div>
      </div>
      <div class="dialog-footer">
        <button class="back" @click=${this._handleBack} ?disabled=${this.disabled}>
          Back
        </button>
        <button class="cancel" @click=${this._handleCancel} ?disabled=${this.disabled}>
          Cancel
        </button>
        <button class="confirm" @click=${this._handleRename} ?disabled=${!isChanged || this.disabled}>
          Rename
        </button>
      </div>
    `;
  }

  render() {
    if (!this.externalOpen && !this._dialogOpen) return nothing;

    return html`
      <div class="backdrop" @click=${this._handleClickOutside}></div>
      <div
        class="dialog ${this._dialogOpen ? 'open' : ''}"
        style=${styleMap({
          left: `${this._dialogLeft}px`,
          top: `${this._dialogTop}px`,
        })}
      >
        ${this._stage === 'select-station' ? this._renderSelectStation() : this._renderEnterName()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pmc-rename-dialog': RenameDialog;
  }
}

