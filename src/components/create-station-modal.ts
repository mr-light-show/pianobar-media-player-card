import { LitElement, html, css, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { SearchResults } from '../types';

interface Genre {
  name: string;
  musicId: string;
}

interface GenreCategory {
  name: string;
  genres: Genre[];
}

@customElement('pmc-create-station-modal')
export class CreateStationModal extends LitElement {
  @property({ type: String }) currentSongName = '';
  @property({ type: String }) currentArtistName = '';
  @property({ type: String }) currentTrackToken = '';
  @property({ type: Object }) searchResults: SearchResults = { categories: [] };
  @property({ type: Array }) genreCategories: GenreCategory[] = [];
  @property({ type: Boolean }) searchLoading = false;
  @property({ type: Boolean }) genreLoading = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) externalOpen = false;
  @property({ type: Object }) anchorPosition?: { left: number; top: number; bottom: number; right: number };

  @state() private _dialogOpen = false;
  @state() private _dialogTop = 0;
  @state() private _dialogLeft = 0;
  @state() private _mode: 'select' | 'search-results' | 'browse-genres' = 'select';
  @state() private _searchQuery: string = '';
  @state() private _expandedCategories: Set<string> = new Set();
  @state() private _selectedMusicId: string | null = null;
  @state() private _sharedStationId: string = '';

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
      max-height: 85vh;
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

    .select-options {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .option-button {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
      padding: 14px 16px;
      border: none;
      border-radius: 8px;
      background: var(--pmc-secondary-background);
      cursor: pointer;
      transition: all 0.2s;
      text-align: left;
    }

    .option-button:hover:not(:disabled) {
      background: rgba(128, 128, 128, 0.15);
      transform: translateY(-1px);
    }

    .option-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .option-main {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 500;
      font-size: 15px;
      color: var(--primary-text-color);
    }

    .option-detail {
      font-size: 13px;
      color: var(--secondary-text-color);
      margin-left: 32px;
    }

    .divider {
      height: 1px;
      background: var(--pmc-divider);
      margin: 12px 0;
    }

    .search-section, .shared-section {
      margin-top: 16px;
    }

    .section-label {
      font-size: 15px;
      font-weight: 500;
      color: var(--primary-text-color);
      margin-bottom: 12px;
    }

    .search-input-container, .shared-input-container {
      display: flex;
      gap: 12px;
    }

    .search-input, .shared-input {
      flex: 1;
      padding: 12px 16px;
      border: 1px solid var(--pmc-divider);
      border-radius: 8px;
      background: var(--pmc-card-background);
      color: var(--primary-text-color);
      font-size: 16px;
      font-family: inherit;
    }

    .search-input:focus, .shared-input:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    .search-button, .shared-button {
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
      min-width: 80px;
    }

    .search-button:hover:not(:disabled), .shared-button:hover:not(:disabled) {
      opacity: 0.9;
    }

    .search-button:disabled, .shared-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .category-list, .genre-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .category, .genre-category {
      border-radius: 8px;
      overflow: hidden;
    }

    .category-header, .genre-header {
      display: flex;
      align-items: center;
      padding: 12px;
      cursor: pointer;
      background: var(--pmc-secondary-background);
      transition: background 0.2s;
      user-select: none;
    }

    .category-header:hover, .genre-header:hover {
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

    .category-title, .genre-category-title {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color);
      flex: 1;
    }

    .category-count, .genre-count {
      font-size: 12px;
      color: var(--secondary-text-color);
    }

    .category-results, .genre-items {
      padding: 8px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .result-item, .genre-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      background: var(--pmc-secondary-background);
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .result-item:hover:not(.disabled), .genre-item:hover:not(.disabled) {
      background: rgba(128, 128, 128, 0.15);
    }

    .result-item.selected, .genre-item.selected {
      background: var(--primary-color);
      color: var(--text-primary-color);
    }

    .result-item.disabled, .genre-item.disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .result-item input[type="radio"], .genre-item input[type="radio"] {
      width: 16px;
      height: 16px;
      cursor: pointer;
      margin: 0;
      flex-shrink: 0;
    }

    .result-info, .genre-info {
      flex: 1;
      min-width: 0;
    }

    .result-name, .genre-name {
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

    .dialog-footer button.create {
      background: var(--primary-color);
      color: var(--text-primary-color);
    }

    .dialog-footer button.create:hover {
      opacity: 0.9;
    }

    .dialog-footer button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
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

  private _handleSelectArtist() {
    this.dispatchEvent(new CustomEvent('create-from-artist', {
      bubbles: true,
      composed: true
    }));
    this._handleClose();
  }

  private _handleSelectSong() {
    this.dispatchEvent(new CustomEvent('create-from-song', {
      bubbles: true,
      composed: true
    }));
    this._handleClose();
  }

  private _handleSearchInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this._searchQuery = input.value;
  }

  private _handleSearch() {
    if (!this._searchQuery.trim()) return;

    this._mode = 'search-results';
    this._selectedMusicId = null;
    this._expandedCategories.clear();

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

  private _handleCreateFromSearch() {
    if (this._selectedMusicId) {
      this.dispatchEvent(new CustomEvent('create-from-music-id', {
        bubbles: true,
        composed: true,
        detail: { musicId: this._selectedMusicId }
      }));
      this._handleClose();
    }
  }

  private _handleBrowseGenres() {
    this._mode = 'browse-genres';
    this._selectedMusicId = null;
    this._expandedCategories.clear();

    this.dispatchEvent(new CustomEvent('browse-genres', {
      bubbles: true,
      composed: true
    }));
  }

  private _handleGenreSelect(musicId: string) {
    this._selectedMusicId = musicId;
    this.requestUpdate();
  }

  private _handleCreateFromGenre() {
    if (this._selectedMusicId) {
      this.dispatchEvent(new CustomEvent('create-from-music-id', {
        bubbles: true,
        composed: true,
        detail: { musicId: this._selectedMusicId }
      }));
      this._handleClose();
    }
  }

  private _handleSharedStationInput(e: Event) {
    const input = e.target as HTMLInputElement;
    // Only allow digits
    const value = input.value.replace(/[^0-9]/g, '');
    this._sharedStationId = value;
    input.value = value;
  }

  private _handleAddSharedStation() {
    if (!this._sharedStationId.trim()) return;

    this.dispatchEvent(new CustomEvent('create-from-shared', {
      bubbles: true,
      composed: true,
      detail: { stationId: this._sharedStationId.trim() }
    }));
    this._handleClose();
  }

  private _handleBackToSelect() {
    this._mode = 'select';
    this._selectedMusicId = null;
    this._expandedCategories.clear();
    this.requestUpdate();
  }

  private _handleClose() {
    this._dialogOpen = false;
    this._mode = 'select';
    this._selectedMusicId = null;
    this._expandedCategories.clear();
    this._searchQuery = '';
    this._sharedStationId = '';
    this.dispatchEvent(new CustomEvent('popup-closed', { bubbles: true, composed: true }));
  }

  private _renderSelectMode() {
    const hasCurrentSong = !!this.currentSongName;
    const hasCurrentArtist = !!this.currentArtistName;

    return html`
      <div class="dialog-body">
        <div class="select-options">
          ${hasCurrentSong
            ? html`
                <button class="option-button" @click=${this._handleSelectSong} ?disabled=${this.disabled}>
                  <div class="option-main">
                    <ha-icon icon="mdi:music-note"></ha-icon>
                    <span>Current Song</span>
                  </div>
                  <div class="option-detail">${this.currentSongName}</div>
                </button>
              `
            : nothing}
          
          ${hasCurrentArtist
            ? html`
                <button class="option-button" @click=${this._handleSelectArtist} ?disabled=${this.disabled}>
                  <div class="option-main">
                    <ha-icon icon="mdi:account-music"></ha-icon>
                    <span>Current Artist</span>
                  </div>
                  <div class="option-detail">${this.currentArtistName}</div>
                </button>
              `
            : nothing}
        </div>

        ${hasCurrentSong || hasCurrentArtist ? html`<div class="divider"></div>` : nothing}

        <div class="search-section">
          <div class="section-label">Search for Music</div>
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

        <div class="divider"></div>

        <button class="option-button" @click=${this._handleBrowseGenres} ?disabled=${this.disabled}>
          <div class="option-main">
            <ha-icon icon="mdi:bookshelf"></ha-icon>
            <span>Browse Genres</span>
          </div>
        </button>

        <div class="divider"></div>

        <div class="shared-section">
          <div class="section-label">Add Shared Station</div>
          <div class="shared-input-container">
            <input
              type="text"
              class="shared-input"
              placeholder="Enter station ID..."
              .value=${this._sharedStationId}
              ?disabled=${this.disabled}
              @input=${this._handleSharedStationInput}
              @keydown=${(e: KeyboardEvent) => {
                if (e.key === 'Enter' && this._sharedStationId.trim()) {
                  this._handleAddSharedStation();
                }
              }}
            />
            <button
              class="shared-button"
              ?disabled=${!this._sharedStationId.trim() || this.disabled}
              @click=${this._handleAddSharedStation}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <div class="dialog-footer">
        <button class="cancel" @click=${this._handleClose} ?disabled=${this.disabled}>
          Cancel
        </button>
      </div>
    `;
  }

  private _renderSearchResults() {
    const hasResults = this.searchResults.categories.length > 0;

    return html`
      <div class="dialog-body">
        ${this.searchLoading
          ? html`<div class="loading">Searching...</div>`
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
        <button class="back" @click=${this._handleBackToSelect} ?disabled=${this.disabled}>
          Back
        </button>
        <button class="cancel" @click=${this._handleClose} ?disabled=${this.disabled}>
          Cancel
        </button>
        <button class="create" @click=${this._handleCreateFromSearch} ?disabled=${!this._selectedMusicId || this.disabled}>
          Create Station
        </button>
      </div>
    `;
  }

  private _renderBrowseGenres() {
    const hasGenres = this.genreCategories.length > 0;

    return html`
      <div class="dialog-body">
        ${this.genreLoading
          ? html`<div class="loading">Loading genres...</div>`
          : !hasGenres
          ? html`<div class="no-results">No genres available</div>`
          : html`
              <div class="genre-list">
                ${this.genreCategories.map(
                  (category) => {
                    const isExpanded = this._expandedCategories.has(category.name);
                    return html`
                      <div class="genre-category">
                        <div class="genre-header" @click=${() => this._toggleCategory(category.name)}>
                          <span class="chevron ${isExpanded ? 'expanded' : ''}">▶</span>
                          <span class="genre-category-title">${category.name}</span>
                          <span class="genre-count">(${category.genres.length})</span>
                        </div>
                        ${isExpanded
                          ? html`
                              <div class="genre-items">
                                ${category.genres.map(
                                  (genre) => {
                                    const isSelected = this._selectedMusicId === genre.musicId;
                                    return html`
                                      <div
                                        class="genre-item ${isSelected ? 'selected' : ''} ${this.disabled ? 'disabled' : ''}"
                                        @click=${() => !this.disabled && this._handleGenreSelect(genre.musicId)}
                                      >
                                        <input
                                          type="radio"
                                          name="genre-select"
                                          .value=${genre.musicId}
                                          .checked=${isSelected}
                                          ?disabled=${this.disabled}
                                          @change=${() => this._handleGenreSelect(genre.musicId)}
                                        />
                                        <div class="genre-info">
                                          <div class="genre-name">${genre.name}</div>
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
        <button class="back" @click=${this._handleBackToSelect} ?disabled=${this.disabled}>
          Back
        </button>
        <button class="cancel" @click=${this._handleClose} ?disabled=${this.disabled}>
          Cancel
        </button>
        <button class="create" @click=${this._handleCreateFromGenre} ?disabled=${!this._selectedMusicId || this.disabled}>
          Create Station
        </button>
      </div>
    `;
  }

  render() {
    if (!this.externalOpen && !this._dialogOpen) return nothing;

    let content;
    if (this._mode === 'search-results') {
      content = this._renderSearchResults();
    } else if (this._mode === 'browse-genres') {
      content = this._renderBrowseGenres();
    } else {
      content = this._renderSelectMode();
    }

    return html`
      <div class="backdrop" @click=${this._handleClickOutside}></div>
      <div
        class="dialog ${this._dialogOpen ? 'open' : ''}"
        style=${styleMap({
          left: `${this._dialogLeft}px`,
          top: `${this._dialogTop}px`,
        })}
      >
        <div class="dialog-header">Create Station</div>
        ${content}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pmc-create-station-modal': CreateStationModal;
  }
}

