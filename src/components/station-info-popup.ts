import { html, css, nothing, TemplateResult, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { CenteredPopup } from './centered-popup';

interface ArtistSeed {
  seedId: string;
  name: string;
}

interface SongSeed {
  seedId: string;
  title: string;
  artist: string;
}

interface StationSeed {
  seedId: string;
  name: string;
}

interface Feedback {
  feedbackId: string;
  title: string;
  artist: string;
  rating: number; // 1 = love, 0 = ban
}

interface StationInfo {
  artistSeeds: ArtistSeed[];
  songSeeds: SongSeed[];
  stationSeeds: StationSeed[];
  feedback: Feedback[];
}

@customElement('pmc-station-info-popup')
export class StationInfoPopup extends CenteredPopup {
  @property({ type: String }) currentStationId = '';
  @property({ type: String }) currentStationName = '';
  @property({ type: Object }) stationInfo: StationInfo | null = null;
  @property({ type: Boolean }) infoLoading = false;

  @state() private _expandedSections: Set<string> = new Set(['artistSeeds', 'songSeeds', 'stationSeeds', 'feedback']);

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
        width: 90vw;
        max-width: 650px;
        max-height: 80vh;
      }

      .dialog-header {
        padding: 16px 20px;
        font-weight: 600;
        font-size: 18px;
        color: var(--primary-text-color);
        border-bottom: 1px solid var(--pmc-divider);
      }

      .dialog-body {
        padding: 12px;
        overflow-y: auto;
        flex: 1;
      }

      .seeds-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .section {
        border-radius: 8px;
        overflow: hidden;
      }

      .section-header {
        display: flex;
        align-items: center;
        padding: 12px;
        cursor: pointer;
        background: var(--pmc-secondary-background);
        transition: background 0.2s;
        user-select: none;
      }

      .section-header:hover {
        background: rgba(128, 128, 128, 0.15);
      }

      .chevron {
        margin-right: 8px;
        transition: transform 0.2s;
        font-size: 20px;
        color: var(--secondary-text-color);
      }

      .chevron.expanded {
        transform: rotate(90deg);
      }

      .section-title {
        font-size: 15px;
        font-weight: 500;
        color: var(--primary-text-color);
        flex: 1;
      }

      .section-count {
        font-size: 13px;
        color: var(--secondary-text-color);
        margin-left: 8px;
      }

      .section-content {
        padding: 8px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .seed-item, .feedback-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 12px;
        background: var(--pmc-secondary-background);
        border-radius: 6px;
      }

      .seed-info {
        flex: 1;
        min-width: 0;
      }

      .seed-name, .feedback-title {
        font-size: 14px;
        color: var(--primary-text-color);
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .seed-artist, .feedback-artist {
        font-size: 12px;
        color: var(--secondary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .feedback-icon {
        font-size: 20px;
        margin-right: 4px;
      }

      .feedback-icon.loved {
        color: #4CAF50;
      }

      .feedback-icon.banned {
        color: #F44336;
      }

      .delete-button {
        padding: 6px 12px;
        border: none;
        border-radius: 6px;
        background: rgba(244, 67, 54, 0.1);
        color: #f44336;
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
        transition: all 0.2s;
      }

      .delete-button:hover:not(:disabled) {
        background: #f44336;
        color: #fff;
      }

      .delete-button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .no-items {
        padding: 32px;
        text-align: center;
        color: var(--secondary-text-color);
        font-size: 14px;
      }

      .loading {
        padding: 32px;
        text-align: center;
        color: var(--secondary-text-color);
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

      .dialog-footer button.close {
        background: var(--primary-color);
        color: var(--text-primary-color);
      }

      .dialog-footer button.close:hover {
        opacity: 0.9;
      }
    `;
  }

  protected getPopupDimensions(): { width: number; height: number } {
    return {
      width: Math.min(650, window.innerWidth * 0.9),
      height: Math.min(window.innerHeight * 0.8, 800)
    };
  }

  // Override to reset expanded sections when closing
  protected closePopup(): void {
    this._expandedSections = new Set(['artistSeeds', 'songSeeds', 'stationSeeds', 'feedback']);
    super.closePopup();
  }

  private _toggleSection(section: string) {
    const newSet = new Set(this._expandedSections);
    if (newSet.has(section)) {
      newSet.delete(section);
    } else {
      newSet.add(section);
    }
    this._expandedSections = newSet;  // New reference triggers change detection
  }

  private _handleDeleteSeed(seedId: string, seedType: string) {
    this.dispatchEvent(new CustomEvent('delete-seed', {
      bubbles: true,
      composed: true,
      detail: { 
        seedId,
        seedType,
        stationId: this.currentStationId
      }
    }));
  }

  private _handleDeleteFeedback(feedbackId: string) {
    this.dispatchEvent(new CustomEvent('delete-feedback', {
      bubbles: true,
      composed: true,
      detail: { 
        feedbackId,
        stationId: this.currentStationId
      }
    }));
  }

  private _handleClose() {
    this.closePopup();
  }

  private _renderSection(
    key: string,
    title: string,
    items: any[],
    renderItem: (item: any) => unknown
  ) {
    const isExpanded = this._expandedSections.has(key);

    return html`
      <div class="section">
        <div class="section-header" @click=${() => this._toggleSection(key)}>
          <span class="chevron ${isExpanded ? 'expanded' : ''}">▶</span>
          <span class="section-title">${title}</span>
          <span class="section-count">(${items.length})</span>
        </div>
        ${isExpanded && items.length > 0
          ? html`<div class="section-content">${items.map(renderItem)}</div>`
          : nothing}
      </div>
    `;
  }

  protected renderPopupContent(): TemplateResult {
    const hasAnyItems = this.stationInfo && (
      this.stationInfo.artistSeeds.length > 0 ||
      this.stationInfo.songSeeds.length > 0 ||
      this.stationInfo.stationSeeds.length > 0 ||
      this.stationInfo.feedback.length > 0
    );

    return html`
      <div class="dialog-header">Seeds: ${this.currentStationName}</div>
      <div class="dialog-body">
        ${this.infoLoading
          ? html`<div class="loading">Loading station info...</div>`
          : !hasAnyItems
          ? html`<div class="no-items">No seeds or feedback available for this station.</div>`
          : html`
                <div class="seeds-container">
                  ${this._renderSection(
                    'artistSeeds',
                    'Artist Seeds',
                    this.stationInfo?.artistSeeds || [],
                    (seed: ArtistSeed) => html`
                      <div class="seed-item">
                        <div class="seed-info">
                          <div class="seed-name">${seed.name}</div>
                        </div>
                        <button
                          class="delete-button"
                          ?disabled=${this.disabled}
                          @click=${() => this._handleDeleteSeed(seed.seedId, 'artist')}
                        >
                          Delete
                        </button>
                      </div>
                    `
                  )}
                  
                  ${this._renderSection(
                    'songSeeds',
                    'Song Seeds',
                    this.stationInfo?.songSeeds || [],
                    (seed: SongSeed) => html`
                      <div class="seed-item">
                        <div class="seed-info">
                          <div class="seed-name">${seed.title}</div>
                          <div class="seed-artist">${seed.artist}</div>
                        </div>
                        <button
                          class="delete-button"
                          ?disabled=${this.disabled}
                          @click=${() => this._handleDeleteSeed(seed.seedId, 'song')}
                        >
                          Delete
                        </button>
                      </div>
                    `
                  )}
                  
                  ${this._renderSection(
                    'stationSeeds',
                    'Station Seeds',
                    this.stationInfo?.stationSeeds || [],
                    (seed: StationSeed) => html`
                      <div class="seed-item">
                        <div class="seed-info">
                          <div class="seed-name">${seed.name}</div>
                        </div>
                        <button
                          class="delete-button"
                          ?disabled=${this.disabled}
                          @click=${() => this._handleDeleteSeed(seed.seedId, 'station')}
                        >
                          Delete
                        </button>
                      </div>
                    `
                  )}
                  
                  ${this._renderSection(
                    'feedback',
                    'Feedback',
                    this.stationInfo?.feedback || [],
                    (feedback: Feedback) => html`
                      <div class="feedback-item">
                        <span class="feedback-icon ${feedback.rating === 1 ? 'loved' : 'banned'}">
                          ${feedback.rating === 1 ? '❤️' : '🚫'}
                        </span>
                        <div class="seed-info">
                          <div class="feedback-title">${feedback.title}</div>
                          <div class="feedback-artist">${feedback.artist}</div>
                        </div>
                        <button
                          class="delete-button"
                          ?disabled=${this.disabled}
                          @click=${() => this._handleDeleteFeedback(feedback.feedbackId)}
                        >
                          Delete
                        </button>
                      </div>
                    `
                  )}
                </div>
              `}
      </div>
      <div class="dialog-footer">
        <button class="close" @click=${() => this._handleClose()}>Close</button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pmc-station-info-popup': StationInfoPopup;
  }
}

