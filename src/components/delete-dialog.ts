import { html, css, nothing, TemplateResult, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { CenteredPopup } from './centered-popup';
import { Station } from '../types';

@customElement('pmc-delete-dialog')
export class DeleteDialog extends CenteredPopup {
  @property({ type: Array }) stations: Station[] = [];

  @state() private _selectedStationId: string | null = null;
  @state() private _selectedStationName: string = '';

  static get styles(): CSSResultGroup {
    return [
      css`
        :host {
          position: relative;
          display: inline-block;
        }
      `
    ];
  }

  protected getComponentStylesString(): string {
    return `
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
    `;
  }

  protected getPopupDimensions(): { width: number; height: number } {
    return {
      width: Math.min(450, window.innerWidth * 0.9),
      height: Math.min(window.innerHeight - 100, 600)
    };
  }

  // Override to reset state when closing
  protected closePopup(): void {
    this._selectedStationId = null;
    this._selectedStationName = '';
    super.closePopup();
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
      this.closePopup();
    }
  }

  private _handleCancel() {
    this.closePopup();
  }

  protected renderPopupContent(): TemplateResult {
    const selectableStations = this.stations.filter(s => !s.isQuickMix);

    return html`
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
        <button class="cancel" @click=${() => this._handleCancel()} ?disabled=${this.disabled}>
          Cancel
        </button>
        <button class="delete" @click=${() => this._handleDelete()} ?disabled=${!this._selectedStationId || this.disabled}>
          Delete Station
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pmc-delete-dialog': DeleteDialog;
  }
}

