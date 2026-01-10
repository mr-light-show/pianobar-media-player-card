import { html, css, nothing, PropertyValues, TemplateResult, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BasePopup } from './base-popup';

interface StationMode {
  id: number;
  name: string;
  description: string;
  active: boolean;
}

@customElement('pmc-station-mode-popup')
export class StationModePopup extends BasePopup {
  @property({ type: String }) currentStationId = '';
  @property({ type: String }) currentStationName = '';
  @property({ type: Array }) modes: StationMode[] = [];
  @property({ type: Boolean }) loading = false;

  @state() private _selectedModeId: number | null = null;

  static get styles(): CSSResultGroup {
    return [
      BasePopup.baseStyles,
      css`
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
    `
    ];
  }

  protected getPopupDimensions(): { width: number; height: number } {
    const menuWidth = 400;
    const estimatedHeight = this.modes.length * 80 + 150;
    const maxMenuHeight = window.innerHeight - 100;
    const menuHeight = Math.min(estimatedHeight, maxMenuHeight);
    return { width: menuWidth, height: menuHeight };
  }

  // Override to pre-select active mode when opening
  protected openPopup(): void {
    const activeMode = this.modes.find(m => m.active);
    if (activeMode && this._selectedModeId === null) {
      this._selectedModeId = activeMode.id;
    }
    super.openPopup();
  }

  // Override to reset selection when closing
  protected closePopup(): void {
    this._selectedModeId = null;
    super.closePopup();
  }

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    // Reset selected mode when modes change
    if (changedProperties.has('modes') && this.modes.length > 0) {
      const activeMode = this.modes.find(m => m.active);
      if (activeMode && this._selectedModeId === null) {
        this._selectedModeId = activeMode.id;
      }
    }
  }

  protected getComponentStylesString(): string {
    return `
      .pmc-popup-container {
        min-width: 350px;
        max-width: 500px;
        max-height: calc(100vh - 100px);
        overflow-y: auto;
        padding: 8px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .popup-header {
        padding: 12px 16px;
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text-color);
        border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));
        margin-bottom: 8px;
      }

      .info-note {
        padding: 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
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
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
      }

      .mode-item.active {
        border-color: var(--primary-color);
        background: rgba(118, 75, 162, 0.1);
      }

      .mode-item.selected {
        border-color: var(--primary-color);
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
        background: var(--primary-color);
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
        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));
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
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
      }

      .button-confirm {
        background: var(--primary-color);
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
    `;
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
      this.closePopup();
    }
  }

  protected renderPopupContent(): TemplateResult {
    return html`
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
                <button class="button-cancel" @click=${() => this.closePopup()}>
                  Cancel
                </button>
                <button 
                  class="button-confirm"
                  ?disabled=${this._selectedModeId === null}
                  @click=${() => this._handleSetMode()}
                >
                  Set Mode
                </button>
              </div>
            `
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pmc-station-mode-popup': StationModePopup;
  }
}

