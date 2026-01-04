import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('pmc-song-actions-menu')
export class SongActionsMenu extends LitElement {
  @property({ type: Number }) rating = 0;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) showLove = true;
  @property({ type: Boolean }) showBan = true;
  @property({ type: Boolean }) showTired = true;

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
      min-width: 160px;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s, visibility 0.2s;
      transform: translateX(-50%);
    }

    .menu-popup.open {
      opacity: 1;
      visibility: visible;
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
      background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
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
    if (!this.disabled) {
      if (!this._menuOpen) {
        this._updateMenuPosition();
      }
      this._menuOpen = !this._menuOpen;
    }
  }

  private _updateMenuPosition() {
    const rect = this.getBoundingClientRect();
    const menuHeight = 100; // Approximate menu height (3 buttons with reduced padding)
    const padding = 8; // Minimum padding from screen edge
    const gap = 8; // Gap between button and menu
    
    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;
    
    // Only show above if there's enough space, otherwise show below
    this._showAbove = spaceAbove >= menuHeight + gap;
    
    // Center horizontally on button, but clamp to screen edges
    this._menuLeft = Math.max(padding + 80, Math.min(
      rect.left + rect.width / 2,
      window.innerWidth - padding - 80
    ));
    
    if (this._showAbove) {
      // Position menu above button - top of menu is (button top - gap - menuHeight)
      // Clamp so menu doesn't go above viewport
      this._menuTop = Math.max(padding, rect.top - gap - menuHeight);
    } else {
      // Position menu below button - top of menu is (button bottom + gap)
      // Clamp so menu doesn't go below viewport
      this._menuTop = Math.min(rect.bottom + gap, window.innerHeight - menuHeight - padding);
    }
  }

  private _handleLove() {
    this.dispatchEvent(
      new CustomEvent('love-song', { bubbles: true, composed: true })
    );
    this._menuOpen = false;
  }

  private _handleBan() {
    this.dispatchEvent(
      new CustomEvent('ban-song', { bubbles: true, composed: true })
    );
    this._menuOpen = false;
  }

  private _handleTired() {
    this.dispatchEvent(
      new CustomEvent('tired-song', { bubbles: true, composed: true })
    );
    this._menuOpen = false;
  }

  private _closeMenu() {
    this._menuOpen = false;
  }

  render() {
    const isLoved = this.rating === 1;

    return html`
      ${this._menuOpen
        ? html`<div class="backdrop" @click=${this._closeMenu}></div>`
        : ''}
      <button
        class="trigger-button ${isLoved ? 'loved' : ''}"
        @click=${this._toggleMenu}
        ?disabled=${this.disabled}
        title="${isLoved ? 'Loved' : 'Song actions'}"
      >
        <ha-icon icon="${isLoved ? 'mdi:thumb-up' : 'mdi:thumbs-up-down-outline'}"></ha-icon>
      </button>
      <div 
        class="menu-popup ${this._menuOpen ? 'open' : ''}"
        style="left: ${this._menuLeft}px; top: ${this._menuTop}px;"
      >
        ${this.showLove ? html`
          <button
            class="action-button love ${isLoved ? 'active' : ''}"
            @click=${this._handleLove}
          >
            <ha-icon icon="mdi:thumb-up"></ha-icon>
            <span>Love Song</span>
          </button>
        ` : ''}
        ${this.showBan ? html`
          <button class="action-button ban" @click=${this._handleBan}>
            <ha-icon icon="mdi:thumb-down"></ha-icon>
            <span>Ban Song</span>
          </button>
        ` : ''}
        ${this.showTired ? html`
          <button class="action-button tired" @click=${this._handleTired}>
            <ha-icon icon="mdi:sleep"></ha-icon>
            <span>Snooze (1 month)</span>
          </button>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pmc-song-actions-menu': SongActionsMenu;
  }
}

