import { html, css, nothing, TemplateResult, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { CenteredPopup } from './centered-popup';
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
export class CreateStationModal extends CenteredPopup {
  @property({ type: String }) currentSongName = '';
  @property({ type: String }) currentArtistName = '';
  @property({ type: String }) currentTrackToken = '';
  @property({ type: Object }) searchResults: SearchResults = { categories: [] };
  @property({ type: Array }) genreCategories: GenreCategory[] = [];
  @property({ type: Boolean }) searchLoading = false;
  @property({ type: Boolean }) genreLoading = false;

  @state() private _mode: 'select' | 'searching' | 'search-results' | 'browse-genres' = 'select';
  @state() private _searchQuery: string = '';
  @state() private _expandedCategories: Set<string> = new Set();
  @state() private _selectedMusicId: string | null = null;
  @state() private _sharedStationId: string = '';

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
        background: var(--pmc-card-background);
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        padding: 0;
        display: flex;
        flex-direction: column;
        width: 90vw;
        min-width: 400px;
        max-width: 420px;
        max-height: 85vh;
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
        min-height: 0;
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
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 8px;
        background: var(--pmc-secondary-background);
        cursor: pointer;
        transition: all 0.2s;
        text-align: left;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .option-button:hover:not(:disabled) {
        background: rgba(128, 128, 128, 0.15);
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
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
        margin: 16px 0;
      }

      .section-label {
        font-size: 17px;
        font-weight: 500;
        color: var(--primary-text-color);
        margin-bottom: 12px;
        margin-top: 8px;
      }

      .search-section, .shared-section {
        margin-top: 16px;
      }

      .search-input-container {
        display: flex;
        gap: 12px;
        margin-bottom: 12px;
      }

      .shared-input-container {
        display: flex;
        gap: 12px;
      }

      .search-input, .shared-input {
        flex: 1;
        padding: 12px 16px;
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 8px;
        background: var(--secondary-background-color, rgba(128, 128, 128, 0.1));
        color: var(--primary-text-color);
        font-size: 14px;
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
        margin-left: 32px;
        margin-top: 8px;
        margin-bottom: 8px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .list-item {
        display: flex;
        align-items: center;
        padding: 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.2s;
        user-select: none;
      }

      .list-item:hover {
        background: var(--primary-background-color, rgba(128, 128, 128, 0.15));
      }

      .list-item.selected {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
      }

      .list-item label {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        flex: 1;
        user-select: none;
      }

      .list-item input[type="radio"] {
        width: 15px;
        height: 15px;
        cursor: pointer;
        margin: 0;
        flex-shrink: 0;
        accent-color: var(--primary-color);
      }

      .result-item-name,
      .genre-name {
        font-size: 14px;
        color: var(--primary-text-color);
      }

      .list-item.selected .result-item-name,
      .list-item.selected .genre-name {
        color: var(--text-primary-color, #fff);
      }

      .result-item-artist {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-left: 4px;
      }

      .list-item.selected .result-item-artist {
        color: var(--text-primary-color, #fff);
        opacity: 0.9;
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
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
      }

      .loading-spinner {
        width: 32px;
        height: 32px;
        border: 3px solid var(--pmc-divider);
        border-top-color: var(--primary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
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
    `;
  }

  protected getPopupDimensions(): { width: number; height: number } {
    return {
      width: Math.min(500, window.innerWidth * 0.9),
      height: Math.min(window.innerHeight * 0.85, 750)
    };
  }

  // Override to reset state when closing
  protected closePopup(): void {
    this._mode = 'select';
    this._selectedMusicId = null;
    this._expandedCategories.clear();
    this._searchQuery = '';
    this._sharedStationId = '';
    super.closePopup();
  }

  private _handleSelectArtist() {
    this.dispatchEvent(new CustomEvent('create-from-artist', {
      bubbles: true,
      composed: true
    }));
    this.closePopup();
  }

  private _handleSelectSong() {
    this.dispatchEvent(new CustomEvent('create-from-song', {
      bubbles: true,
      composed: true
    }));
    this.closePopup();
  }

  private _handleSearch() {
    if (!this._searchQuery.trim()) return;

    console.log('[SEARCH] Dispatching search event:', {
      query: this._searchQuery.trim(),
      mode: 'searching'
    });

    this._mode = 'searching';
    this._selectedMusicId = null;
    this._expandedCategories.clear();

    this.dispatchEvent(new CustomEvent('search', {
      bubbles: true,
      composed: true,
      detail: { query: this._searchQuery.trim() }
    }));
  }

  private _toggleCategory(categoryName: string) {
    const newSet = new Set(this._expandedCategories);
    if (newSet.has(categoryName)) {
      newSet.delete(categoryName);
    } else {
      newSet.add(categoryName);
    }
    this._expandedCategories = newSet;  // New reference triggers change detection
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
      this.closePopup();
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
      this.closePopup();
    }
  }

  private _handleAddSharedStation() {
    if (!this._sharedStationId.trim()) return;

    this.dispatchEvent(new CustomEvent('create-from-shared', {
      bubbles: true,
      composed: true,
      detail: { stationId: this._sharedStationId.trim() }
    }));
    this.closePopup();
  }

  private _handleBackToSelect() {
    this._mode = 'select';
    this._selectedMusicId = null;
    this._expandedCategories.clear();
    this.requestUpdate();
  }

  private _handleCancel(e: Event) {
    e.stopPropagation();
    this.closePopup();
  }

  private _renderSelectMode() {
    const searchButtonDisabled = !this._searchQuery.trim() || this.disabled || this.searchLoading;
    return html`
      <div class="dialog-body">
        <div class="search-input-container">
          <input
            type="text"
            class="search-input"
            id="search-input"
            placeholder="Search for artist or song..."
            .value=${this._searchQuery}
            ?disabled=${this.disabled || this.searchLoading}
            @input=${(e: Event) => {
              const input = e.target as HTMLInputElement;
              const cursorPos = input.selectionStart;
              this._searchQuery = input.value;
              this.requestUpdate('_searchQuery');
              this.updateComplete.then(() => {
                // Restore focus and cursor position after re-render
                const newInput = document.querySelector('.pmc-popup-container #search-input') as HTMLInputElement;
                if (newInput) {
                  newInput.focus();
                  if (cursorPos !== null) {
                    newInput.setSelectionRange(cursorPos, cursorPos);
                  }
                }
              });
            }}
            @keydown=${(e: KeyboardEvent) => {
              if (e.key === 'Enter' && this._searchQuery.trim() && !this.searchLoading) {
                this._handleSearch();
              }
            }}
          />
          <button
            class="search-button"
            ?disabled=${searchButtonDisabled}
            @click=${() => this._handleSearch()}
          >
            ${this.searchLoading ? 'Searching...' : 'Search'}
          </button>
        </div>

        <div class="shared-input-container">
          <input
            type="text"
            class="shared-input"
            id="shared-input"
            placeholder="Enter shared station ID (digits only)"
            .value=${this._sharedStationId}
            ?disabled=${this.disabled}
            @input=${(e: Event) => {
              const input = e.target as HTMLInputElement;
              const cursorPos = input.selectionStart;
              const value = input.value.replace(/[^0-9]/g, '');
              this._sharedStationId = value;
              input.value = value;
              this.requestUpdate('_sharedStationId');
              this.updateComplete.then(() => {
                // Restore focus and cursor position after re-render
                const newInput = document.querySelector('.pmc-popup-container #shared-input') as HTMLInputElement;
                if (newInput) {
                  newInput.focus();
                  if (cursorPos !== null) {
                    newInput.setSelectionRange(cursorPos, cursorPos);
                  }
                }
              });
            }}
            @keydown=${(e: KeyboardEvent) => {
              if (e.key === 'Enter' && this._sharedStationId.trim()) {
                this._handleAddSharedStation();
              }
            }}
          />
          <button
            class="shared-button"
            ?disabled=${!this._sharedStationId.trim() || this.disabled}
            @click=${() => this._handleAddSharedStation()}
          >
            Add
          </button>
        </div>

        <div class="divider"></div>

        <div class="section-label">Or create from:</div>

        <div class="select-options">
          ${this.currentTrackToken ? html`
            <button class="option-button" @click=${() => this._handleSelectArtist()} ?disabled=${this.disabled}>
              <div class="option-main">
                <ha-icon icon="mdi:account-music"></ha-icon>
                <span>The current Artist</span>
              </div>
              ${this.currentArtistName ? html`<div class="option-detail">${this.currentArtistName}</div>` : nothing}
            </button>

            <button class="option-button" @click=${() => this._handleSelectSong()} ?disabled=${this.disabled}>
              <div class="option-main">
                <ha-icon icon="mdi:music-note"></ha-icon>
                <span>The current Song</span>
              </div>
              ${this.currentSongName ? html`<div class="option-detail">${this.currentSongName}</div>` : nothing}
            </button>
          ` : nothing}

          <button class="option-button" @click=${() => this._handleBrowseGenres()} ?disabled=${this.disabled}>
            <div class="option-main">
              <ha-icon icon="mdi:bookshelf"></ha-icon>
              <span>Genre</span>
            </div>
            <div class="option-detail">Select a genre</div>
          </button>
        </div>
      </div>
    `;
  }

  private _renderSearching() {
    return html`
      <div class="dialog-body">
        <div class="search-section">
          <div class="search-input-container">
            <input
              type="text"
              class="search-input"
              placeholder="Search for artists or songs..."
              .value=${this._searchQuery}
              disabled
            />
            <button class="search-button" disabled>
              Searching...
            </button>
          </div>
        </div>
        <div class="loading">
          <div class="loading-spinner"></div>
          <div>Searching for "${this._searchQuery}"...</div>
        </div>
      </div>
      <div class="dialog-footer">
        <button class="back" @click=${() => this._handleBackToSelect()}>
          Back
        </button>
        <button class="cancel" @click=${(e: Event) => this._handleCancel(e)}>
          Cancel
        </button>
      </div>
    `;
  }

  private _renderSearchResults() {
    const hasResults = this.searchResults.categories.length > 0;
    
    // Debug logging
    console.log('[SEARCH RESULTS]', {
      searchQuery: this._searchQuery,
      searchResults: this.searchResults,
      categoriesCount: this.searchResults.categories.length,
      hasResults: hasResults,
      rawResults: JSON.stringify(this.searchResults, null, 2)
    });

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
                                      <div class="list-item ${isSelected ? 'selected' : ''}">
                                        <label>
                                          <input
                                            type="radio"
                                            name="result-select"
                                            .value=${result.musicId}
                                            .checked=${isSelected}
                                            ?disabled=${this.disabled}
                                            @change=${() => this._handleResultSelect(result.musicId)}
                                          >
                                          <span class="result-item-name">
                                            ${displayName}${result.artist ? html` <span class="result-item-artist">by ${result.artist}</span>` : nothing}
                                          </span>
                                        </label>
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
        <button class="back" @click=${() => this._handleBackToSelect()} ?disabled=${this.disabled}>
          Back
        </button>
        <button class="cancel" @click=${(e: Event) => this._handleCancel(e)} ?disabled=${this.disabled}>
          Cancel
        </button>
        <button class="create" @click=${() => this._handleCreateFromSearch()} ?disabled=${!this._selectedMusicId || this.disabled}>
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
                                      <div class="list-item ${isSelected ? 'selected' : ''}">
                                        <label>
                                          <input
                                            type="radio"
                                            name="genre-select"
                                            .value=${genre.musicId}
                                            .checked=${isSelected}
                                            ?disabled=${this.disabled}
                                            @change=${() => this._handleGenreSelect(genre.musicId)}
                                          >
                                          <span class="genre-name">${genre.name}</span>
                                        </label>
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
        <button class="back" @click=${() => this._handleBackToSelect()} ?disabled=${this.disabled}>
          Back
        </button>
        <button class="cancel" @click=${(e: Event) => this._handleCancel(e)} ?disabled=${this.disabled}>
          Cancel
        </button>
        <button class="create" @click=${() => this._handleCreateFromGenre()} ?disabled=${!this._selectedMusicId || this.disabled}>
          Create Station
        </button>
      </div>
    `;
  }

  protected renderPopupContent(): TemplateResult {
    let content;
    if (this._mode === 'searching') {
      content = this._renderSearching();
    } else if (this._mode === 'search-results') {
      content = this._renderSearchResults();
    } else if (this._mode === 'browse-genres') {
      content = this._renderBrowseGenres();
    } else {
      content = this._renderSelectMode();
    }

    return html`
      <div class="dialog">
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
