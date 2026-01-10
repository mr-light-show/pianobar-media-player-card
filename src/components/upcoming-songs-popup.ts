import { html, css, nothing, TemplateResult, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BasePopup } from './base-popup';

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
export class UpcomingSongsPopup extends BasePopup {
  @property({ type: Array }) songs: UpcomingSong[] = [];

  static get styles(): CSSResultGroup {
    return [
      BasePopup.baseStyles,
      css`
        .popup-container {
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 300px;
          max-width: 400px;
          max-height: calc(100vh - 100px);
          overflow-y: auto;
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
      `
    ];
  }

  protected getPopupDimensions(): { width: number; height: number } {
    const menuWidth = 350;
    const estimatedHeight = this.songs.length * 64 + 50;
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
        min-width: 300px;
        max-width: 400px;
        max-height: calc(100vh - 100px);
        overflow-y: auto;
      }

      .popup-header {
        padding: 8px 12px;
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text-color);
        border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));
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
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
      }

      .song-artwork {
        width: 48px;
        height: 48px;
        border-radius: 4px;
        object-fit: cover;
        flex-shrink: 0;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
      }

      .song-artwork-placeholder {
        width: 48px;
        height: 48px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
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
        color: var(--primary-color);
      }

      .no-songs {
        padding: 24px;
        text-align: center;
        color: var(--secondary-text-color);
        font-size: 14px;
      }
    `;
  }

  protected renderPopupContent(): TemplateResult {
    return html`
      <div class="popup-header">Upcoming Songs</div>
      ${this.songs.length > 0
        ? this.songs.map(song => this.renderSongItem(song))
        : html`<div class="no-songs">No upcoming songs</div>`
      }
    `;
  }

  private renderSongItem(song: UpcomingSong): TemplateResult {
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
