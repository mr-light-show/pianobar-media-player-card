import { LitElement, html, css, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface UpcomingSong {
  title: string;
  artist: string;
  album: string;
  coverArt: string;
  rating: number;
  duration: number;
  stationName: string;
}

@customElement('pmc-upcoming-songs-popup')
export class UpcomingSongsPopup extends LitElement {
  @property({ type: Array }) songs: UpcomingSong[] = [];
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) externalOpen = false;
  @property({ type: Object }) anchorPosition?: { left: number; top: number; bottom: number; right: number };

  @state() private _menuOpen = false;
  @state() private _menuTop = 0;
  @state() private _menuLeft = 0;

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
      min-width: 300px;
      max-width: 400px;
      max-height: 500px;
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
      padding: 8px 12px;
      font-size: 16px;
      font-weight: 600;
      color: var(--primary-text-color);
      border-bottom: 1px solid var(--pmc-divider);
      margin-bottom: 4px;
    }

    .song-item {
      display: flex;
      gap: 12px;
      padding: 8px;
      border-radius: 8px;
      transition: background-color 0.2s;
    }

    .song-item:hover {
      background: var(--pmc-secondary-background);
    }

    .song-artwork {
      width: 48px;
      height: 48px;
      border-radius: 4px;
      object-fit: cover;
      flex-shrink: 0;
      background: var(--pmc-secondary-background);
    }

    .song-artwork-placeholder {
      width: 48px;
      height: 48px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--pmc-secondary-background);
      color: var(--secondary-text-color);
      flex-shrink: 0;
    }

    .song-artwork-placeholder ha-icon {
      --mdc-icon-size: 24px;
    }

    .song-info {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .song-title {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .song-artist {
      font-size: 12px;
      color: var(--secondary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .song-station {
      font-size: 11px;
      color: var(--secondary-text-color);
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .song-station ha-icon {
      --mdc-icon-size: 12px;
    }

    .song-rating {
      display: flex;
      align-items: center;
      margin-top: 2px;
    }

    .song-rating ha-icon {
      --mdc-icon-size: 16px;
      color: var(--pmc-primary-color);
    }

    .no-songs {
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
    if (this.anchorPosition) {
      // Use anchor position for popup positioning
      const menuWidth = 350;
      const menuHeight = Math.min(500, this.songs.length * 64 + 50);
      const padding = 8;
      const gap = 4;

      // Position below anchor by default
      let left = this.anchorPosition.left;
      let top = this.anchorPosition.bottom + gap;

      // Clamp to screen edges
      left = Math.max(padding, Math.min(left, window.innerWidth - menuWidth - padding));
      
      // If not enough space below, show above
      if (top + menuHeight > window.innerHeight - padding) {
        top = this.anchorPosition.top - gap - menuHeight;
        top = Math.max(padding, top);
      }

      this._menuLeft = left;
      this._menuTop = top;
    }
  }

  render() {
    if (!this.externalOpen) {
      return nothing;
    }

    return html`
      ${this._menuOpen ? html`<div class="backdrop" @click=${() => { this._menuOpen = false; }}></div>` : nothing}
      <div
        class="menu-popup ${this._menuOpen ? 'open' : ''}"
        style="left: ${this._menuLeft}px; top: ${this._menuTop}px;"
      >
        <div class="popup-header">Upcoming Songs</div>
        ${this.songs.length > 0
          ? this.songs.map(song => this._renderSongItem(song))
          : html`<div class="no-songs">No upcoming songs</div>`
        }
      </div>
    `;
  }

  private _renderSongItem(song: UpcomingSong) {
    return html`
      <div class="song-item">
        ${song.coverArt
          ? html`<img class="song-artwork" src="${song.coverArt}" alt="" />`
          : html`
              <div class="song-artwork-placeholder">
                <ha-icon icon="mdi:music"></ha-icon>
              </div>
            `
        }
        <div class="song-info">
          <div class="song-title">${song.title}</div>
          <div class="song-artist">${song.artist}</div>
          ${song.stationName
            ? html`
                <div class="song-station">
                  <ha-icon icon="mdi:radio"></ha-icon>
                  <span>${song.stationName}</span>
                </div>
              `
            : nothing
          }
          ${song.rating === 1
            ? html`
                <div class="song-rating">
                  <ha-icon icon="mdi:thumb-up"></ha-icon>
                </div>
              `
            : nothing
          }
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pmc-upcoming-songs-popup': UpcomingSongsPopup;
  }
}

