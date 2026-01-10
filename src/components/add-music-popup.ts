import { html, css, nothing, TemplateResult, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { CenteredPopup } from './centered-popup';
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
export class AddMusicPopup extends CenteredPopup {
  @property({ type: Array }) stations: Station[] = [];
  @property({ type: Boolean }) searchLoading = false;
  @property({ type: Object }) searchResults: SearchResults = { categories: [] };

  @state() private _stage: 'select-station' | 'search' = 'select-station';
  @state() private _selectedStationId: string | null = null;
  @state() private _selectedStationName: string = '';
  @state() private _searchQuery: string = '';
  @state() private _expandedCategories: Set<string> = new Set();
  @state() private _selectedMusicId: string | null = null;
  @state() private _searchPerformed: boolean = false;

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
        max-width: 500px;
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
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 8px;
        background: var(--secondary-background-color, rgba(128, 128, 128, 0.1));
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
    this._stage = 'select-station';
    this._selectedStationId = null;
    this._selectedStationName = '';
    this._selectedMusicId = null;
    this._expandedCategories.clear();
    this._searchQuery = '';
    this._searchPerformed = false;
    super.closePopup();
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
      this.closePopup();
    }
  }

  private _handleCancel() {
    this.closePopup();
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
        <button class="cancel" @click=${() => this._handleCancel()} ?disabled=${this.disabled}>
          Cancel
        </button>
        <button class="confirm" @click=${() => this._handleNext()} ?disabled=${!this._selectedStationId || this.disabled}>
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
              id="add-music-search-input"
              placeholder="Search for artists or songs..."
              .value=${this._searchQuery}
              ?disabled=${this.disabled || this.searchLoading}
              @input=${(e: Event) => {
                const input = e.target as HTMLInputElement;
                const cursorPos = input.selectionStart;
                this._searchQuery = input.value;
                this.requestUpdate();
                this.updateComplete.then(() => {
                  // Restore focus and cursor position after re-render
                  const newInput = document.querySelector('.pmc-popup-container #add-music-search-input') as HTMLInputElement;
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
              autofocus
            />
            <button
              class="search-button"
              ?disabled=${!this._searchQuery.trim() || this.disabled || this.searchLoading}
              @click=${() => this._handleSearch()}
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
        <button class="back" @click=${() => this._handleBack()} ?disabled=${this.disabled}>
          Back
        </button>
        <button class="cancel" @click=${() => this._handleCancel()} ?disabled=${this.disabled}>
          Cancel
        </button>
        <button class="confirm" @click=${() => this._handleAddMusic()} ?disabled=${!this._selectedMusicId || this.disabled}>
          Add Music
        </button>
      </div>
    `;
  }

  protected renderPopupContent(): TemplateResult {
    const content = this._stage === 'select-station' ? this._renderSelectStation() : this._renderSearch();
    return html`
      <div class="dialog">
        ${content}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pmc-add-music-popup': AddMusicPopup;
  }
}
