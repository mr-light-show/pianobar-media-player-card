import { LitElement, html, css, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

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
export class StationInfoPopup extends LitElement {
  @property({ type: String }) currentStationId = '';
  @property({ type: String }) currentStationName = '';
  @property({ type: Object }) stationInfo: StationInfo | null = null;
  @property({ type: Boolean }) infoLoading = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) externalOpen = false;
  @property({ type: Object }) anchorPosition?: { left: number; top: number; bottom: number; right: number };

  @state() private _dialogOpen = false;
  @state() private _dialogTop = 0;
  @state() private _dialogLeft = 0;
  @state() private _expandedSections: Set<string> = new Set(['artistSeeds', 'songSeeds', 'stationSeeds', 'feedback']);

  private _ignoreNextClickOutside = false;

  static styles = css`
    :host {
      position: relative;
      display: inline-block;
    }

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
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s, visibility 0.2s;
      transform: translate(-50%, -50%);
    }

    .dialog.open {
      opacity: 1;
      visibility: visible;
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
    if (this._dialogOpen && !event.composedPath().includes(this)) {
      this._handleClose();
    }
  }

  firstUpdated() {
    if (this.externalOpen && !this._dialogOpen) {
      this._openDialogExternal();
    }
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('externalOpen') && this.externalOpen && !this._dialogOpen) {
      this._openDialogExternal();
    }
  }

  private _openDialogExternal() {
    this._ignoreNextClickOutside = true;
    requestAnimationFrame(() => {
      this._openDialog();
    });
  }

  private _openDialog() {
    if (!this.disabled) {
      this._updateDialogPosition();
      this._dialogOpen = true;
    }
  }

  private _updateDialogPosition() {
    // Center dialog on screen
    this._dialogLeft = window.innerWidth / 2;
    this._dialogTop = window.innerHeight / 2;
  }

  private _toggleSection(section: string) {
    if (this._expandedSections.has(section)) {
      this._expandedSections.delete(section);
    } else {
      this._expandedSections.add(section);
    }
    this.requestUpdate();
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
    this._dialogOpen = false;
    this._expandedSections = new Set(['artistSeeds', 'songSeeds', 'stationSeeds', 'feedback']);
    this.dispatchEvent(new CustomEvent('popup-closed', { bubbles: true, composed: true }));
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

  render() {
    if (!this.externalOpen && !this._dialogOpen) return nothing;

    const hasAnyItems = this.stationInfo && (
      this.stationInfo.artistSeeds.length > 0 ||
      this.stationInfo.songSeeds.length > 0 ||
      this.stationInfo.stationSeeds.length > 0 ||
      this.stationInfo.feedback.length > 0
    );

    return html`
      <div class="backdrop" @click=${this._handleClickOutside}></div>
      <div
        class="dialog ${this._dialogOpen ? 'open' : ''}"
        style=${styleMap({
          left: `${this._dialogLeft}px`,
          top: `${this._dialogTop}px`,
        })}
      >
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
          <button class="close" @click=${this._handleClose}>Close</button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pmc-station-info-popup': StationInfoPopup;
  }
}

