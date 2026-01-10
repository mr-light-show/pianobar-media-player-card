import { html, css, nothing, TemplateResult, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BasePopup } from './base-popup';
import { Station } from '../types';

@customElement('pmc-quickmix-popup')
export class QuickMixPopup extends BasePopup {
  @property({ type: Array }) stations: Station[] = [];
  
  @state() private selectedStationIds: Set<string> = new Set();

  static get styles(): CSSResultGroup {
    return [
      BasePopup.baseStyles,
      css`
        .popup-container {
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 280px;
          max-width: 350px;
          max-height: calc(100vh - 100px);
          overflow-y: auto;
          transform: translateX(-50%);
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
      `
    ];
  }

  // Override to initialize selection when popup opens
  protected openPopup(): void {
    this.initializeSelection();
    super.openPopup();
  }

  protected getPopupDimensions(): { width: number; height: number } {
    const menuWidth = 315;
    const selectableCount = this.stations.filter(s => !s.isQuickMix).length;
    const estimatedHeight = selectableCount * 50 + 120; // Approx height per item + header/footer
    const maxMenuHeight = window.innerHeight - 100;
    const menuHeight = Math.min(estimatedHeight, maxMenuHeight);
    return { width: menuWidth, height: menuHeight };
  }

  protected getComponentStylesString(): string {
    return `
      .pmc-popup-container {
        padding: 8px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 280px;
        max-width: 350px;
        max-height: calc(100vh - 100px);
        overflow-y: auto;
        transform: translateX(-50%);
      }

      .header {
        padding: 12px 8px 8px;
        font-weight: 600;
        font-size: 16px;
        color: var(--primary-text-color);
        border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));
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
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
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
        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));
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
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
      }

      .footer button.save {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
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
    `;
  }

  private initializeSelection(): void {
    this.selectedStationIds = new Set(
      this.stations
        .filter(s => s.isQuickMixed && !s.isQuickMix)
        .map(s => s.id)
    );
  }

  private handleCheckboxChange(stationId: string, checked: boolean): void {
    if (checked) {
      this.selectedStationIds.add(stationId);
    } else {
      this.selectedStationIds.delete(stationId);
    }
    this.requestUpdate();
  }

  private handleSave(): void {
    const stationIds = Array.from(this.selectedStationIds);
    this.dispatchEvent(new CustomEvent('save', {
      bubbles: true,
      composed: true,
      detail: { stationIds },
    }));
    this.closePopup();
  }

  private handleCancel(): void {
    this.closePopup();
  }

  protected renderPopupContent(): TemplateResult {
    // Filter out the QuickMix station itself
    const selectableStations = this.stations.filter(s => !s.isQuickMix);

    return html`
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
                        .checked=${this.selectedStationIds.has(station.id)}
                        ?disabled=${this.disabled}
                        @change=${(e: Event) =>
                          this.handleCheckboxChange(station.id, (e.target as HTMLInputElement).checked)
                        }
                      />
                      <span class="item-name">${station.name}</span>
                    </label>
                  </div>
                `
              )}
            </div>
            
            <div class="footer">
              <button class="cancel" @click=${() => this.handleCancel()} ?disabled=${this.disabled}>
                Cancel
              </button>
              <button class="save" @click=${() => this.handleSave()} ?disabled=${this.disabled}>
                Save
              </button>
            </div>
          `}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pmc-quickmix-popup': QuickMixPopup;
  }
}
