import { html, css, nothing, TemplateResult, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BasePopup } from './base-popup';

@customElement('pmc-song-actions-menu')
export class SongActionsMenu extends BasePopup {
  @property({ type: Number }) rating = 0;
  @property({ type: Boolean }) showLove = true;
  @property({ type: Boolean }) showBan = true;
  @property({ type: Boolean }) showTired = true;
  @property({ type: Boolean }) popupOnly = false; // If true, only render popup (no button)

  static get styles(): CSSResultGroup {
    return [
      BasePopup.baseStyles,
      css`
        .trigger-button {
          background: none;
          border: none;
          padding: 8px;
          cursor: pointer;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
          color: inherit;
        }

        .trigger-button:hover:not(:disabled) {
          background-color: rgba(128, 128, 128, 0.2);
        }

        .trigger-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .trigger-button.loved {
          color: #4caf50;
        }

        .trigger-button ha-icon {
          --mdc-icon-size: 24px;
        }

        .popup-container {
          padding: 4px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 160px;
          max-height: calc(100vh - 100px);
          overflow-y: auto;
          transform: translateX(-50%);
        }

        .action-button {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 6px 16px;
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

        .action-button:hover {
          background: var(--pmc-secondary-background);
        }

        .action-button.love:hover {
          background: rgba(76, 175, 80, 0.15);
          color: #4caf50;
        }

        .action-button.love.active {
          background: rgba(76, 175, 80, 0.15);
          color: #4caf50;
        }

        .action-button.ban:hover {
          background: rgba(244, 67, 54, 0.15);
          color: #f44336;
        }

        .action-button.tired:hover {
          background: rgba(255, 152, 0, 0.15);
          color: #ff9800;
        }

        .action-button ha-icon {
          --mdc-icon-size: 20px;
        }
      `
    ];
  }

  protected getPopupDimensions(): { width: number; height: number } {
    const menuWidth = 180;
    let itemCount = 0;
    if (this.showLove) itemCount++;
    if (this.showBan) itemCount++;
    if (this.showTired) itemCount++;
    const menuHeight = Math.min(itemCount * 36 + 8, window.innerHeight - 100);
    return { width: menuWidth, height: menuHeight };
  }

  private toggleMenu(event: Event): void {
    event.stopPropagation();
    if (this.isOpen) {
      this.closePopup();
    } else {
      // Get button position to use as anchor
      const button = event.currentTarget as HTMLElement;
      const rect = button.getBoundingClientRect();
      this.anchorPosition = {
        left: rect.left + rect.width / 2, // Center of button
        top: rect.top,
        bottom: rect.bottom,
        right: rect.right
      };
      
      this.ignoreNextClickOutside = true;
      requestAnimationFrame(() => {
        this.openPopup();
      });
    }
  }

  private handleLove(): void {
    this.dispatchEvent(
      new CustomEvent('love-song', { bubbles: true, composed: true })
    );
    this.closePopup();
  }

  private handleBan(): void {
    this.dispatchEvent(
      new CustomEvent('ban-song', { bubbles: true, composed: true })
    );
    this.closePopup();
  }

  private handleTired(): void {
    this.dispatchEvent(
      new CustomEvent('tired-song', { bubbles: true, composed: true })
    );
    this.closePopup();
  }

  protected renderPopupContent(): TemplateResult {
    const isLoved = this.rating === 1;

    return html`
      ${this.showLove ? html`
        <button
          class="action-button love ${isLoved ? 'active' : ''}"
          @click=${this.handleLove}
        >
          <ha-icon icon="mdi:thumb-up"></ha-icon>
          <span>Love Song</span>
        </button>
      ` : nothing}
      ${this.showBan ? html`
        <button class="action-button ban" @click=${this.handleBan}>
          <ha-icon icon="mdi:thumb-down"></ha-icon>
          <span>Ban Song</span>
        </button>
      ` : nothing}
      ${this.showTired ? html`
        <button class="action-button tired" @click=${this.handleTired}>
          <ha-icon icon="mdi:sleep"></ha-icon>
          <span>Snooze (1 month)</span>
        </button>
      ` : nothing}
    `;
  }

  render(): TemplateResult | typeof nothing {
    const isLoved = this.rating === 1;

    // If popup only mode, use base class render
    if (this.popupOnly) {
      return super.render();
    }

    // Otherwise, render button + popup
    return html`
      ${this.renderBackdrop()}
      ${html`
        <button
          class="trigger-button ${isLoved ? 'loved' : ''}"
          @click=${this.toggleMenu}
          ?disabled=${this.disabled}
          title="${isLoved ? 'Loved' : 'Song actions'}"
        >
          <ha-icon icon="${isLoved ? 'mdi:thumb-up' : 'mdi:thumbs-up-down-outline'}"></ha-icon>
        </button>
      `}
      <div 
        class="popup-container ${this.isOpen ? 'open' : ''}"
        style="left: ${this.left}px; top: ${this.top}px;"
      >
        ${this.renderPopupContent()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pmc-song-actions-menu': SongActionsMenu;
  }
}
