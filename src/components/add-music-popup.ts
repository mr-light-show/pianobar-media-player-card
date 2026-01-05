import { LitElement, html, css, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { Station } from '../types';

interface SearchResult {
  name?: string;
  title?: string;
  artist?: string;
  musicId: string;
}

interface SearchCategory {
  name: string;
  results: SearchResult[];
}

interface SearchResults {
  categories: SearchCategory[];
}

@customElement('pmc-add-music-popup')
export class AddMusicPopup extends LitElement {
  @property({ type: Array }) stations: Station[] = [];
  @property({ type: Boolean }) searchLoading = false;
  @property({ type: Object }) searchResults: SearchResults = { categories: [] };
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) externalOpen = false;
  @property({ type: Object }) anchorPosition?: { left: number; top: number; bottom: number; right: number };

  @state() private _dialogOpen = false;
  @state() private _dialogTop = 0;
  @state() private _dialogLeft = 0;
  @state() private _stage: 'select-station' | 'search' = 'select-station';
  @state() private _selectedStationId: string | null = null;
  @state() private _selectedStationName: string = '';
  @state() private _searchQuery: string = '';
  @state() private _expandedCategories: Set<string> = new Set();
  @state() private _selectedMusicId: string | null = null;
  @state() private _searchPerformed: boolean = false;

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
      max-width: 500px;
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
      padding: 20px;
      overflow-y: auto;
      flex: 1;
    }

    .station-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .station-item {
      display: flex;
      align-items: center;
      padding: 12px;
      border-radius: 8px;
      background: transparent;
      transition: background 0.2s;
      cursor: pointer;
    }

    .station-item:hover:not(.disabled) {
      background: var(--pmc-secondary-background);
    }

    .station-item.disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .station-item label {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      cursor: pointer;
    }

    .station-item.disabled label {
      cursor: not-allowed;
    }

    .station-item input[type="radio"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
      margin: 0;
      flex-shrink: 0;
    }

    .station-item.disabled input[type="radio"] {
      cursor: not-allowed;
    }

    .station-name {
      flex: 1;
      font-size: 14px;
      color: var(--primary-text-color);
    }

    .search-section {
      margin-bottom: 16px;
    }

    .search-input-container {
      display: flex;
      gap: 12px;
    }

    .search-input {
      flex: 1;
      padding: 12px 16px;
      border: 1px solid var(--pmc-divider);
      border-radius: 8px;
      background: var(--pmc-card-background);
      color: var(--primary-text-color);
      font-size: 16px;
      font-family: inherit;
    }

    .search-input:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    .search-button {
      padding: 12px 20px;
      border: none;
      border-radius: 8px;
      background: var(--primary-color);
      color: var(--text-primary-color);
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s;
      white-space: nowrap;
    }

    .search-button:hover:not(:disabled) {
      opacity: 0.9;
    }

    .search-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .category-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .category {
      border-radius: 8px;
      overflow: hidden;
    }

    .category-header {
      display: flex;
      align-items: center;
      padding: 12px;
      cursor: pointer;
      background: var(--pmc-secondary-background);
      transition: background 0.2s;
      user-select: none;
    }

    .category-header:hover {
      background: rgba(128, 128, 128, 0.15);
    }

    .chevron {
      margin-right: 8px;
      transition: transform 0.2s;
      font-size: 16px;
      color: var(--secondary-text-color);
    }

    .chevron.expanded {
      transform: rotate(90deg);
    }

    .category-title {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color);
      flex: 1;
    }

    .category-count {
      font-size: 12px;
      color: var(--secondary-text-color);
    }

    .category-results {
      padding: 8px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .result-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      background: var(--pmc-secondary-background);
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .result-item:hover:not(.disabled) {
      background: rgba(128, 128, 128, 0.15);
    }

    .result-item.selected {
      background: var(--primary-color);
      color: var(--text-primary-color);
    }

    .result-item.disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .result-item input[type="radio"] {
      width: 16px;
      height: 16px;
      cursor: pointer;
      margin: 0;
      flex-shrink: 0;
    }

    .result-info {
      flex: 1;
      min-width: 0;
    }

    .result-name {
      font-size: 14px;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .result-artist {
      font-size: 12px;
      opacity: 0.8;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .no-results {
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

    .dialog-footer button.back {
      margin-right: auto;
      background: transparent;
      color: var(--primary-text-color);
    }

    .dialog-footer button.back:hover {
      background: var(--pmc-secondary-background);
    }

    .dialog-footer button.cancel {
      background: transparent;
      color: var(--primary-text-color);
    }

    .dialog-footer button.cancel:hover {
      background: var(--pmc-secondary-background);
    }

    .dialog-footer button.confirm {
      background: var(--primary-color);
      color: var(--text-primary-color);
    }

    .dialog-footer button.confirm:hover {
      opacity: 0.9;
    }

    .dialog-footer button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .no-stations {
      padding: 16px;
      text-align: center;
      color: var(--secondary-text-color);
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

  private _handleStationSelect(stationId: string, stationName: string) {
    this._selectedStationId = stationId;
    this._selectedStationName = stationName;
    this.requestUpdate();
  }

  private _handleNext() {
    if (this._selectedStationId) {
      this._stage = 'search';
      this.requestUpdate();
    }
  }

  private _handleBack() {
    this._stage = 'select-station';
    this._searchQuery = '';
    this._selectedMusicId = null;
    this._expandedCategories.clear();
    this._searchPerformed = false;
    this.requestUpdate();
  }

  private _handleSearchInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this._searchQuery = input.value;
  }

  private _handleSearch() {
    if (!this._searchQuery.trim()) return;

    this._selectedMusicId = null;
    this._expandedCategories.clear();
    this._searchPerformed = true;

    this.dispatchEvent(new CustomEvent('search', {
      bubbles: true,
      composed: true,
      detail: { query: this._searchQuery.trim() }
    }));
  }

  private _toggleCategory(categoryName: string) {
    if (this._expandedCategories.has(categoryName)) {
      this._expandedCategories.delete(categoryName);
    } else {
      this._expandedCategories.add(categoryName);
    }
    this.requestUpdate();
  }

  private _handleResultSelect(musicId: string) {
    this._selectedMusicId = musicId;
    this.requestUpdate();
  }

  private _handleAddMusic() {
    if (this._selectedMusicId && this._selectedStationId) {
      this.dispatchEvent(new CustomEvent('add-music', {
        bubbles: true,
        composed: true,
        detail: { 
          musicId: this._selectedMusicId,
          stationId: this._selectedStationId
        }
      }));
      this._handleClose();
    }
  }

  private _handleClose() {
    this._dialogOpen = false;
    this._stage = 'select-station';
    this._selectedStationId = null;
    this._selectedStationName = '';
    this._selectedMusicId = null;
    this._expandedCategories.clear();
    this._searchQuery = '';
    this._searchPerformed = false;
    this.dispatchEvent(new CustomEvent('popup-closed', { bubbles: true, composed: true }));
  }

  private _renderSelectStation() {
    const selectableStations = this.stations.filter(s => !s.isQuickMix);

    return html`
      <div class="dialog-header">Add Music to Station</div>
      <div class="dialog-body">
        ${selectableStations.length === 0
          ? html`<div class="no-stations">No stations available</div>`
          : html`
              <div class="station-list">
                ${selectableStations.map(
                  (station) => html`
                    <div class="station-item ${this.disabled ? 'disabled' : ''}">
                      <label>
                        <input
                          type="radio"
                          name="station-select"
                          .value=${station.id}
                          .checked=${this._selectedStationId === station.id}
                          ?disabled=${this.disabled}
                          @change=${() => this._handleStationSelect(station.id, station.name)}
                        />
                        <span class="station-name">${station.name}</span>
                      </label>
                    </div>
                  `
                )}
              </div>
            `}
      </div>
      <div class="dialog-footer">
        <button class="cancel" @click=${this._handleClose} ?disabled=${this.disabled}>
          Cancel
        </button>
        <button class="confirm" @click=${this._handleNext} ?disabled=${!this._selectedStationId || this.disabled}>
          Next
        </button>
      </div>
    `;
  }

  private _renderSearch() {
    const hasResults = this.searchResults.categories.length > 0;

    return html`
      <div class="dialog-header">Add Music to ${this._selectedStationName}</div>
      <div class="dialog-body">
        <div class="search-section">
          <div class="search-input-container">
            <input
              type="text"
              class="search-input"
              placeholder="Search for artists or songs..."
              .value=${this._searchQuery}
              ?disabled=${this.disabled || this.searchLoading}
              @input=${this._handleSearchInput}
              @keydown=${(e: KeyboardEvent) => {
                if (e.key === 'Enter' && this._searchQuery.trim() && !this.searchLoading) {
                  this._handleSearch();
                }
              }}
              autofocus
            />
            <button
              class="search-button"
              ?disabled=${!this._searchQuery.trim() || this.disabled || this.searchLoading}
              @click=${this._handleSearch}
            >
              ${this.searchLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        ${this.searchLoading
          ? html`<div class="loading">Searching...</div>`
          : !this._searchPerformed
          ? html`<div class="no-results">Enter a search query to find music</div>`
          : !hasResults
          ? html`<div class="no-results">No results found for "${this._searchQuery}"</div>`
          : html`
              <div class="category-list">
                ${this.searchResults.categories.map(
                  (category) => {
                    const isExpanded = this._expandedCategories.has(category.name);
                    return html`
                      <div class="category">
                        <div class="category-header" @click=${() => this._toggleCategory(category.name)}>
                          <span class="chevron ${isExpanded ? 'expanded' : ''}">▶</span>
                          <span class="category-title">${category.name}</span>
                          <span class="category-count">(${category.results.length})</span>
                        </div>
                        ${isExpanded
                          ? html`
                              <div class="category-results">
                                ${category.results.map(
                                  (result) => {
                                    const isSelected = this._selectedMusicId === result.musicId;
                                    const displayName = result.title || result.name || '';
                                    return html`
                                      <div
                                        class="result-item ${isSelected ? 'selected' : ''} ${this.disabled ? 'disabled' : ''}"
                                        @click=${() => !this.disabled && this._handleResultSelect(result.musicId)}
                                      >
                                        <input
                                          type="radio"
                                          name="result-select"
                                          .value=${result.musicId}
                                          .checked=${isSelected}
                                          ?disabled=${this.disabled}
                                          @change=${() => this._handleResultSelect(result.musicId)}
                                        />
                                        <div class="result-info">
                                          <div class="result-name">${displayName}</div>
                                          ${result.artist ? html`<div class="result-artist">${result.artist}</div>` : nothing}
                                        </div>
                                      </div>
                                    `;
                                  }
                                )}
                              </div>
                            `
                          : nothing}
                      </div>
                    `;
                  }
                )}
              </div>
            `}
      </div>
      <div class="dialog-footer">
        <button class="back" @click=${this._handleBack} ?disabled=${this.disabled}>
          Back
        </button>
        <button class="cancel" @click=${this._handleClose} ?disabled=${this.disabled}>
          Cancel
        </button>
        <button class="confirm" @click=${this._handleAddMusic} ?disabled=${!this._selectedMusicId || this.disabled}>
          Add Music
        </button>
      </div>
    `;
  }

  render() {
    if (!this.externalOpen && !this._dialogOpen) return nothing;

    return html`
      <div class="backdrop" @click=${this._handleClickOutside}></div>
      <div
        class="dialog ${this._dialogOpen ? 'open' : ''}"
        style=${styleMap({
          left: `${this._dialogLeft}px`,
          top: `${this._dialogTop}px`,
        })}
      >
        ${this._stage === 'select-station' ? this._renderSelectStation() : this._renderSearch()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pmc-add-music-popup': AddMusicPopup;
  }
}

