import { html, css, nothing, PropertyValues, TemplateResult, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BasePopup } from './base-popup';

interface Account {
  id: string;
  label: string;
}

@customElement('pmc-account-selector-popup')
export class AccountSelectorPopup extends BasePopup {
  @property({ type: Array }) accounts: Account[] = [];
  @property({ type: String }) currentAccountId = '';

  @state() private _selectedAccountId: string | null = null;

  static get styles(): CSSResultGroup {
    return [
      BasePopup.baseStyles,
      css`
    :host {
      position: relative;
      display: inline-block;
    }
    `
    ];
  }

  protected getPopupDimensions(): { width: number; height: number } {
    const menuWidth = 320;
    const estimatedHeight = this.accounts.length * 52 + 120;
    const maxMenuHeight = window.innerHeight - 100;
    const menuHeight = Math.min(estimatedHeight, maxMenuHeight);
    return { width: menuWidth, height: menuHeight };
  }

  protected openPopup(): void {
    this._selectedAccountId = this.currentAccountId || null;
    super.openPopup();
  }

  protected closePopup(): void {
    this._selectedAccountId = null;
    super.closePopup();
  }

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has('currentAccountId') && this.isOpen) {
      this._selectedAccountId = this.currentAccountId;
    }
  }

  protected getComponentStylesString(): string {
    return `
      .pmc-popup-container {
        min-width: 280px;
        max-width: 400px;
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

      .accounts-list {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: 12px;
      }

      .account-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        background: transparent;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s;
        user-select: none;
        border: 2px solid transparent;
      }

      .account-item:hover {
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
      }

      .account-item.active {
        border-color: var(--primary-color);
        background: rgba(118, 75, 162, 0.1);
      }

      .account-item.selected {
        border-color: var(--primary-color);
      }

      .account-item input[type="radio"] {
        margin: 0;
        cursor: pointer;
      }

      .account-icon {
        --mdc-icon-size: 20px;
        color: var(--secondary-text-color);
      }

      .account-name {
        font-size: 15px;
        font-weight: 500;
        color: var(--primary-text-color);
        flex: 1;
      }

      .account-active-badge {
        padding: 4px 10px;
        background: var(--primary-color);
        color: white;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
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
    `;
  }

  private _handleAccountSelect(accountId: string) {
    this._selectedAccountId = accountId;
  }

  private _handleConfirm() {
    if (this._selectedAccountId && this._selectedAccountId !== this.currentAccountId) {
      this.dispatchEvent(new CustomEvent('account-select', {
        bubbles: true,
        composed: true,
        detail: { accountId: this._selectedAccountId }
      }));
      this.closePopup();
    }
  }

  protected renderPopupContent(): TemplateResult {
    const noChange = !this._selectedAccountId || this._selectedAccountId === this.currentAccountId;

    return html`
      <div class="popup-header">Switch Account</div>
      
      <div class="accounts-list">
        ${this.accounts.map(acct => html`
          <div 
            class="account-item ${acct.id === this.currentAccountId ? 'active' : ''} ${this._selectedAccountId === acct.id ? 'selected' : ''}"
            @click=${() => this._handleAccountSelect(acct.id)}
          >
            <input
              type="radio"
              name="account-select"
              .value=${acct.id}
              .checked=${this._selectedAccountId === acct.id}
              @change=${() => this._handleAccountSelect(acct.id)}
            >
            <ha-icon class="account-icon" icon="mdi:account-circle"></ha-icon>
            <span class="account-name">${acct.label}</span>
            ${acct.id === this.currentAccountId ? html`<span class="account-active-badge">Active</span>` : nothing}
          </div>
        `)}
      </div>
      
      <div class="popup-footer">
        <button class="button-cancel" @click=${() => this.closePopup()}>
          Cancel
        </button>
        <button 
          class="button-confirm"
          ?disabled=${noChange}
          @click=${() => this._handleConfirm()}
        >
          Switch
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pmc-account-selector-popup': AccountSelectorPopup;
  }
}
