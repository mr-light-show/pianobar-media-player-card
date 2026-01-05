import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('pmc-overflow-menu')
export class OverflowMenu extends LitElement {
  @property({ type: String }) entityId = '';
  @property({ type: Boolean }) showStationOption = false;
  @property({ type: Boolean }) showRatingsOption = false;
  @property({ type: Boolean }) showExplainOption = false;
  @property({ type: Boolean }) showUpcomingOption = false;
  @property({ type: Boolean }) showStationModeOption = false;
  @property({ type: Boolean }) isOn = true;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) buildTime = '';

  @state() private _menuOpen = false;
  @state() private _menuTop = 0;
  @state() private _menuLeft = 0;

  private _portalContainer: HTMLDivElement | null = null;

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

    .trigger-button ha-icon {
      --mdc-icon-size: 24px;
    }

    .menu-popup {
      position: fixed;
      background: var(--pmc-card-background);
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      padding: 4px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      z-index: 99999;
      min-width: 180px;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s, visibility 0.2s;
    }

    .menu-popup.open {
      opacity: 1;
      visibility: visible;
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 16px;
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

    .menu-item:hover {
      background: var(--pmc-secondary-background);
    }

    .menu-item ha-icon {
      --mdc-icon-size: 20px;
    }

    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 99998;
    }

    .build-time {
      padding: 8px 16px;
      font-size: 11px;
      color: var(--pmc-secondary-text-color);
      text-align: center;
      border-top: 1px solid var(--pmc-divider);
      margin-top: 4px;
      pointer-events: none;
      user-select: text;
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
    this._removePortal();
  }

  private _createPortal() {
    if (this._portalContainer) return;
    this._portalContainer = document.createElement('div');
    this._portalContainer.className = 'pmc-overflow-menu-portal';
    document.body.appendChild(this._portalContainer);
  }

  private _removePortal() {
    if (this._portalContainer) {
      this._portalContainer.remove();
      this._portalContainer = null;
    }
  }

  private _handleClickOutside(event: MouseEvent) {
    const path = event.composedPath();
    const includesThis = path.includes(this);
    const includesPortal = this._portalContainer ? path.includes(this._portalContainer) : false;
    if (this._menuOpen && !includesThis && !includesPortal) {
      this._menuOpen = false;
    }
  }

  private _toggleMenu(e: Event) {
    e.stopPropagation();
    if (!this.disabled) {
      if (!this._menuOpen) {
        this._updateMenuPosition();
        this._createPortal();
      }
      this._menuOpen = !this._menuOpen;
      this._updatePortalContent();
    }
  }

  private _updateMenuPosition() {
    const rect = this.getBoundingClientRect();
    // Calculate menu height based on options shown
    let itemCount = 2; // More Information and Connect/Disconnect are always shown
    if (this.showStationOption) itemCount++;
    if (this.showRatingsOption) itemCount++;
    if (this.showExplainOption) itemCount++;
    if (this.showUpcomingOption) itemCount++;
    if (this.showStationModeOption) itemCount++;
    const menuHeight = itemCount * 44 + (this.buildTime ? 40 : 0); // Approximate height per item + build time
    const menuWidth = 180;
    const padding = 8;
    const gap = 4;

    // Position below and to the left of the button (right-aligned)
    let left = rect.right - menuWidth;
    let top = rect.bottom + gap;

    // Clamp to screen edges
    left = Math.max(padding, Math.min(left, window.innerWidth - menuWidth - padding));
    top = Math.min(top, window.innerHeight - menuHeight - padding);

    // If not enough space below, show above
    if (top + menuHeight > window.innerHeight - padding) {
      top = rect.top - gap - menuHeight;
      top = Math.max(padding, top);
    }

    this._menuLeft = left;
    this._menuTop = top;
  }

  private _handleMoreInfo() {
    // Emit event for parent to handle (parent dispatches hass-more-info)
    this.dispatchEvent(
      new CustomEvent('more-info', {
        bubbles: true,
        composed: true,
        detail: { entityId: this.entityId },
      })
    );
    this._menuOpen = false;
  }

  private _getElementPosition(el: Element): { left: number; top: number; bottom: number; right: number } {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left,
      top: rect.top,
      bottom: rect.bottom,
      right: rect.right,
    };
  }

  private _handleSelectStation(e: Event) {
    const target = e.currentTarget as Element;
    this.dispatchEvent(
      new CustomEvent('select-station', {
        bubbles: true,
        composed: true,
        detail: { anchorPosition: this._getElementPosition(target) },
      })
    );
    this._menuOpen = false;
  }

  private _handleSelectRatings(e: Event) {
    const target = e.currentTarget as Element;
    this.dispatchEvent(
      new CustomEvent('select-ratings', {
        bubbles: true,
        composed: true,
        detail: { anchorPosition: this._getElementPosition(target) },
      })
    );
    this._menuOpen = false;
  }

  private _closeMenu() {
    this._menuOpen = false;
    this._updatePortalContent();
  }

  private _updatePortalContent() {
    if (!this._portalContainer) return;

    if (!this._menuOpen) {
      this._portalContainer.innerHTML = '';
      return;
    }

    // Create styles
    const styles = `
      .pmc-portal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99998;
      }
      .pmc-portal-menu {
        position: fixed;
        background: var(--card-background-color, #fff);
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        padding: 4px;
        display: flex;
        flex-direction: column;
        gap: 2px;
        z-index: 99999;
        min-width: 180px;
      }
      .pmc-portal-menu .menu-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 16px;
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
      .pmc-portal-menu .menu-item:hover {
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
      }
      .pmc-portal-menu .menu-item ha-icon {
        --mdc-icon-size: 20px;
      }
      .pmc-portal-menu .build-time {
        padding: 8px 16px;
        font-size: 11px;
        color: var(--secondary-text-color, rgba(0, 0, 0, 0.5));
        text-align: center;
        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));
        margin-top: 4px;
        pointer-events: none;
        user-select: text;
      }
    `;

    // Build menu items HTML
    let menuItems = '';
    
    // Song actions section (if any are shown)
    if (this.showExplainOption) {
      menuItems += `
        <button class="menu-item" data-action="explain-song">
          <ha-icon icon="mdi:comment-question-outline"></ha-icon>
          <span>Why this song?</span>
        </button>
      `;
    }
    
    if (this.showUpcomingOption) {
      menuItems += `
        <button class="menu-item" data-action="show-upcoming">
          <ha-icon icon="mdi:playlist-music"></ha-icon>
          <span>Show Upcoming Songs</span>
        </button>
      `;
    }
    
    if (this.showRatingsOption) {
      menuItems += `
        <button class="menu-item" data-action="select-ratings">
          <ha-icon icon="mdi:thumbs-up-down-outline"></ha-icon>
          <span>Song Ratings</span>
        </button>
      `;
    }

    // Divider if song actions exist
    if (this.showExplainOption || this.showRatingsOption || this.showUpcomingOption) {
      menuItems += `<div style="height: 1px; background: var(--divider-color, rgba(0, 0, 0, 0.1)); margin: 4px 0;"></div>`;
    }
    
    // Station actions section
    if (this.showStationModeOption) {
      menuItems += `
        <button class="menu-item" data-action="station-mode">
          <ha-icon icon="mdi:tune-variant"></ha-icon>
          <span>Station Mode</span>
        </button>
      `;
    }
    
    // Divider after station actions if they exist
    if (this.showStationModeOption) {
      menuItems += `<div style="height: 1px; background: var(--divider-color, rgba(0, 0, 0, 0.1)); margin: 4px 0;"></div>`;
    }
    
    // Station/System actions
    if (this.showStationOption) {
      menuItems += `
        <button class="menu-item" data-action="select-station">
          <ha-icon icon="mdi:radio"></ha-icon>
          <span>Select Station</span>
        </button>
      `;
    }
    
    menuItems += `
      <button class="menu-item" data-action="more-info">
        <ha-icon icon="mdi:information-outline"></ha-icon>
        <span>More Information</span>
      </button>
      <button class="menu-item" data-action="power-toggle">
        <ha-icon icon="mdi:power"></ha-icon>
        <span>${this.isOn ? 'Disconnect' : 'Connect'}</span>
      </button>
    `;

    if (this.buildTime) {
      menuItems += `<div class="build-time">${this._formatBuildTime(this.buildTime)}</div>`;
    }

    this._portalContainer.innerHTML = `
      <style>${styles}</style>
      <div class="pmc-portal-backdrop"></div>
      <div class="pmc-portal-menu" style="left: ${this._menuLeft}px; top: ${this._menuTop}px;">
        ${menuItems}
      </div>
    `;

    // Add event listeners
    const backdrop = this._portalContainer.querySelector('.pmc-portal-backdrop');
    backdrop?.addEventListener('click', () => {
      this._menuOpen = false;
      this._updatePortalContent();
    });

    const menuItemElements = this._portalContainer.querySelectorAll('.menu-item');
    menuItemElements.forEach(item => {
      item.addEventListener('click', (e) => {
        const action = (item as HTMLElement).dataset.action;
        if (action === 'more-info') {
          this.dispatchEvent(new CustomEvent('more-info', { bubbles: true, composed: true, detail: { entityId: this.entityId } }));
        } else if (action === 'power-toggle') {
          this.dispatchEvent(new CustomEvent('power-toggle', { bubbles: true, composed: true }));
        } else if (action === 'select-station') {
          const rect = (item as Element).getBoundingClientRect();
          this.dispatchEvent(new CustomEvent('select-station', { bubbles: true, composed: true, detail: { anchorPosition: { left: rect.left, top: rect.top, bottom: rect.bottom, right: rect.right } } }));
        } else if (action === 'select-ratings') {
          const rect = (item as Element).getBoundingClientRect();
          this.dispatchEvent(new CustomEvent('select-ratings', { bubbles: true, composed: true, detail: { anchorPosition: { left: rect.left, top: rect.top, bottom: rect.bottom, right: rect.right } } }));
        } else if (action === 'explain-song') {
          this.dispatchEvent(new CustomEvent('explain-song', { bubbles: true, composed: true }));
        } else if (action === 'show-upcoming') {
          const rect = (item as Element).getBoundingClientRect();
          this.dispatchEvent(new CustomEvent('show-upcoming', { bubbles: true, composed: true, detail: { anchorPosition: { left: rect.left, top: rect.top, bottom: rect.bottom, right: rect.right } } }));
        } else if (action === 'station-mode') {
          const rect = (item as Element).getBoundingClientRect();
          this.dispatchEvent(new CustomEvent('station-mode', { bubbles: true, composed: true, detail: { anchorPosition: { left: rect.left, top: rect.top, bottom: rect.bottom, right: rect.right } } }));
        }
        this._menuOpen = false;
        this._updatePortalContent();
      });
    });
  }

  render() {
    // Only render the trigger button - menu is rendered in portal
    return html`
      <button
        class="trigger-button"
        @click=${this._toggleMenu}
        ?disabled=${this.disabled}
        title="More options"
      >
        <ha-icon icon="mdi:dots-vertical"></ha-icon>
      </button>
    `;
  }

  private _formatBuildTime(buildTime: string): string {
    try {
      const date = new Date(buildTime);
      const dateStr = date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
      const timeStr = date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
      return `Built: ${dateStr} ${timeStr}`;
    } catch {
      return `Built: ${buildTime}`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pmc-overflow-menu': OverflowMenu;
  }
}

