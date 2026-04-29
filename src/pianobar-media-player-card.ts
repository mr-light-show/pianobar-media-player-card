import { LitElement, html, TemplateResult, PropertyValues, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { createRef, ref, Ref } from 'lit/directives/ref.js';
import { cardStyles } from './styles';
import { resolveConfig } from './modes';
import { extractColors, extractRegionalColors, ExtractedColors } from './utils/color-extractor';
import {
  HomeAssistant,
  HassEntity,
  PianobarCardConfig,
  ResolvedConfig,
  LovelaceCard,
  Station,
  StationInfo,
  SearchResults,
  GenreCategory,
} from './types';
import { cardLocalize } from './i18n';

// Import components
import './components/playback-controls';
import './components/progress-bar';
import './components/volume-slider';
import './components/song-actions-menu';
import './components/station-selector';
import './components/overflow-menu';
import './components/upcoming-songs-popup';
import './components/station-mode-popup';
import './components/quickmix-popup';
import './components/rename-dialog';
import './components/delete-dialog';
import './components/station-info-popup';
import './components/add-music-popup';
import './components/create-station-modal';
import './components/account-selector-popup';
import './pianobar-card-editor';

// Card registration info
const CARD_VERSION = '1.0.0';

// Build timestamp injected by rollup at build time
declare const __BUILD_TIMESTAMP__: string;

console.info(
  `%c PIANOBAR-MEDIA-PLAYER-CARD %c ${CARD_VERSION} `,
  'color: white; background: #764ba2; font-weight: bold;',
  'color: #764ba2; background: white; font-weight: bold;'
);

// Register card with Home Assistant
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'pianobar-media-player-card',
  name: 'Pianobar Media Player Card',
  description: 'A custom media player card for Pianobar with thumbs up/down and volume override',
  preview: true,
});

@customElement('pianobar-media-player-card')
export class PianobarMediaPlayerCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) hass?: HomeAssistant;

  @state() private _config?: PianobarCardConfig;
  @state() private _resolvedConfig?: ResolvedConfig;
  @state() private _extractedColors?: ExtractedColors;
  @state() private _lastImageUrl?: string;
  @state() private _cardHeight = 0;
  @state() private _stationPopupOpen = false;
  @state() private _ratingsPopupOpen = false;
  @state() private _upcomingPopupOpen = false;
  @state() private _stationModePopupOpen = false;
  @state() private _popupAnchorPosition?: { left: number; top: number; bottom: number; right: number };
  @state() private _upcomingSongs: unknown[] = [];
  @state() private _stationModes: unknown[] = [];
  @state() private _stationModesLoading = false;
  @state() private _openQuickMixPopup = false;
  @state() private _openRenameDialog = false;
  @state() private _openDeleteDialog = false;
  @state() private _openStationInfoPopup = false;
  @state() private _stationInfo: StationInfo | null = null;
  @state() private _stationInfoLoading = false;
  @state() private _openAddMusicPopup = false;
  @state() private _searchResults: SearchResults = { categories: [] };
  @state() private _searchLoading = false;
  @state() private _openCreateStationModal = false;
  @state() private _genreCategories: GenreCategory[] = [];
  @state() private _genreLoading = false;
  @state() private _openAccountPopup = false;

  /** Previous `pandora_connected` for one-shot disconnect toast (true → false only). */
  private _prevPandoraConnected: boolean | undefined = undefined;
  
  private _createStationModalRef: Ref<any> = createRef();

  private _resizeObserver?: ResizeObserver;

  static styles = cardStyles;

  // Return the card editor element
  static getConfigElement(): HTMLElement {
    return document.createElement('pianobar-card-editor');
  }

  // Return default config for card picker
  static getStubConfig(): PianobarCardConfig {
    return {
      type: 'custom:pianobar-media-player-card',
      entity: '',
      mode: 'default',
    };
  }

  setConfig(config: PianobarCardConfig): void {
    if (!config.entity) {
      throw new Error('Please define an entity');
    }

    if (this._config?.entity !== config.entity) {
      this._prevPandoraConnected = undefined;
    }
    this._config = config;
    this._resolvedConfig = resolveConfig(config);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
  }

  protected firstUpdated(): void {
    this._setupResizeObserver();
  }

  private _setupResizeObserver(): void {
    this._resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.contentRect.height;
        if (height !== this._cardHeight) {
          this._cardHeight = height;
        }
      }
    });
    // Observe the ha-card element inside shadow DOM, not the host
    const card = this.shadowRoot?.querySelector('ha-card');
    if (card) {
      this._resizeObserver.observe(card);
    } else {
      // Fallback: observe host
      this._resizeObserver.observe(this);
    }
  }

  getCardSize(): number {
    if (this._resolvedConfig?.mode === 'minimal') {
      return 2;
    }
    if (this._resolvedConfig?.artwork === 'full-cover') {
      return 4;
    }
    return 3;
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);

    // Update artwork mode attribute for CSS
    if (this._resolvedConfig) {
      this.setAttribute('artwork-mode', this._resolvedConfig.artwork);
      this.setAttribute('mode', this._resolvedConfig.mode);
      if (this._resolvedConfig.artwork === 'tall') {
        const size = this._resolvedConfig.tallArtworkSize ?? 80;
        this.style.setProperty('--pmc-tall-artwork-width', `${size}%`);
      } else {
        this.style.removeProperty('--pmc-tall-artwork-width');
      }
    }

    // Extract colors when artwork changes
    if (changedProps.has('hass') && this.hass && this._config?.entity) {
      const entity = this.hass.states[this._config.entity];
      if (entity) {
        const imageUrl = entity.attributes.entity_picture;
        if (imageUrl && imageUrl !== this._lastImageUrl) {
          this._lastImageUrl = imageUrl;
          this._tallArtworkError = false; // Reset error state for new image
          this._updateColors(imageUrl);
        }
      }
    }

    // One-shot toast: pandora_connected true → false (Pandora session ended)
    const entity = this._getEntity();
    if (entity && this.hass && !this._isUnavailable(entity)) {
      const connected = entity.attributes.pandora_connected !== false;
      if (this._prevPandoraConnected === true && connected === false) {
        this.dispatchEvent(
          new CustomEvent('hass-notification', {
            detail: {
              message: cardLocalize(this.hass, 'card.toast_pandora_disconnected'),
              duration: 6000,
            },
            bubbles: true,
            composed: true,
          })
        );
      }
      this._prevPandoraConnected = connected;
    }
  }

  private async _updateColors(imageUrl: string): Promise<void> {
    // Use regional extraction for full cover mode, standard extraction otherwise
    const isFullCover = this._resolvedConfig?.artwork === 'full-cover';
    const colors = isFullCover 
      ? await extractRegionalColors(imageUrl)
      : await extractColors(imageUrl);
    this._extractedColors = colors;
  }

  private _getEntity(): HassEntity | undefined {
    if (!this.hass || !this._config?.entity) return undefined;
    return this.hass.states[this._config.entity];
  }

  private _getVolumeEntity(): HassEntity | undefined {
    if (!this.hass) return undefined;
    const volumeEntityId = this._resolvedConfig?.volume_entity || this._config?.entity;
    if (!volumeEntityId) return undefined;
    return this.hass.states[volumeEntityId];
  }

  private _isPlaying(entity: HassEntity): boolean {
    return entity.state === 'playing';
  }

  private _isUnavailable(entity: HassEntity): boolean {
    return entity.state === 'unavailable' || entity.state === 'unknown';
  }

  /** Pandora session ended; user must reconnect (e.g. turn_on / Connect). */
  private _isPandoraDisconnected(entity: HassEntity): boolean {
    return !this._isUnavailable(entity) && entity.attributes.pandora_connected === false;
  }

  private _renderPandoraDisconnectBanner(entity: HassEntity): TemplateResult | typeof nothing {
    if (!this._isPandoraDisconnected(entity)) return nothing;
    return html`
      <div
        class="pandora-disconnect-banner"
        role="alert"
        aria-live="polite"
      >
        <ha-icon class="pandora-disconnect-icon" icon="mdi:cloud-off-outline"></ha-icon>
        <div class="pandora-disconnect-text">
          <span>${cardLocalize(this.hass, 'card.pandora_disconnected_banner')}</span>
        </div>
        <button
          type="button"
          class="pandora-disconnect-reconnect"
          @click=${this._handlePandoraReconnect}
        >
          ${cardLocalize(this.hass, 'card.pandora_disconnected_reconnect')}
        </button>
      </div>
    `;
  }

  /** Effective supported service names: config.supported_actions or entity.attributes.supported_actions fallback. */
  private _getEffectiveSupportedActions(): string[] {
    const fromConfig = this._resolvedConfig?.supported_actions ?? this._config?.supported_actions;
    if (fromConfig && fromConfig.length > 0) return fromConfig;
    const entity = this._getEntity();
    const fromEntity = (entity?.attributes?.supported_actions as string[]) || [];
    return fromEntity;
  }

  /** True when supported_actions are from entity.attributes (no config.supported_actions). */
  private _isUsingSupportedActionsFallback(): boolean {
    const fromConfig = this._resolvedConfig?.supported_actions ?? this._config?.supported_actions;
    if (fromConfig && fromConfig.length > 0) return false;
    const entity = this._getEntity();
    const fromEntity = (entity?.attributes?.supported_actions as string[]) || [];
    return fromEntity.length > 0;
  }

  private _supportsLove(): boolean {
    return this._getEffectiveSupportedActions().includes('love_song');
  }

  private _supportsBan(): boolean {
    return this._getEffectiveSupportedActions().includes('ban_song');
  }

  private _supportsTired(): boolean {
    return this._getEffectiveSupportedActions().includes('tired_of_song');
  }

  private _supportsAnyRating(): boolean {
    const actions = this._getEffectiveSupportedActions();
    return actions.includes('love_song') || actions.includes('ban_song') || actions.includes('tired_of_song');
  }

  // Service calls
  private async _handlePlayPause(): Promise<void> {
    const entity = this._getEntity();
    if (!entity || !this.hass) return;
    if (this._isUnavailable(entity)) return;

    if (entity.state === 'off') {
      const stations = (entity.attributes.stations as Station[]) || [];
      const quickMix = stations.find((s) => s.isQuickMix === true);
      const name = quickMix?.name?.trim();
      if (name) {
        await this.hass.callService(
          'media_player',
          'select_source',
          { source: name },
          { entity_id: entity.entity_id }
        );
        return;
      }
    }

    await this.hass.callService('media_player', 'media_play_pause', undefined, {
      entity_id: entity.entity_id,
    });
  }

  private async _handleNextTrack(): Promise<void> {
    const entity = this._getEntity();
    if (!entity || !this.hass) return;

    await this.hass.callService('media_player', 'media_next_track', undefined, {
      entity_id: entity.entity_id,
    });
  }

  private async _handlePowerToggle(): Promise<void> {
    const entity = this._getEntity();
    if (!entity || !this.hass) return;

    const isOn = entity.state !== 'off' && entity.state !== 'unavailable';
    const service = isOn ? 'turn_off' : 'turn_on';
    
    await this.hass.callService('media_player', service, undefined, {
      entity_id: entity.entity_id,
    });
  }

  /** Same as overflow Connect: reconnect to Pandora via `turn_on`. */
  private async _handlePandoraReconnect(): Promise<void> {
    const entity = this._getEntity();
    if (!entity || !this.hass) return;
    await this.hass.callService('media_player', 'turn_on', undefined, {
      entity_id: entity.entity_id,
    });
  }

  private async _handleVolumeChange(ev: CustomEvent): Promise<void> {
    const volumeEntity = this._getVolumeEntity();
    if (!volumeEntity || !this.hass) return;

    const volume = (ev.detail as { volume: number }).volume;
    await this.hass.callService(
      'media_player',
      'volume_set',
      { volume_level: volume },
      { entity_id: volumeEntity.entity_id }
    );
  }

  private async _handleMuteToggle(): Promise<void> {
    const volumeEntity = this._getVolumeEntity();
    if (!volumeEntity || !this.hass) return;

    await this.hass.callService('media_player', 'volume_mute', {
      is_volume_muted: !volumeEntity.attributes.is_volume_muted,
    }, {
      entity_id: volumeEntity.entity_id,
    });
  }

  private async _handleLoveSong(): Promise<void> {
    const entity = this._getEntity();
    if (!entity || !this.hass) return;
    await this.hass.callService('pianobar', 'love_song', {
      entity_id: entity.entity_id
    });
  }

  private async _handleBanSong(): Promise<void> {
    const entity = this._getEntity();
    if (!entity || !this.hass) return;
    await this.hass.callService('pianobar', 'ban_song', {
      entity_id: entity.entity_id
    });
  }

  private async _handleTiredSong(): Promise<void> {
    const entity = this._getEntity();
    if (!entity || !this.hass) return;
    await this.hass.callService('pianobar', 'tired_of_song', {
      entity_id: entity.entity_id
    });
  }

  private async _handleStationChange(ev: CustomEvent): Promise<void> {
    const entity = this._getEntity();
    if (!entity || !this.hass) return;

    const { stationName } = ev.detail as { stationId: string; stationName: string };
    // Use select_source with the station name
    await this.hass.callService('media_player', 'select_source', {
      source: stationName,
    }, {
      entity_id: entity.entity_id,
    });
  }

  private _renderArtwork(entity: HassEntity): TemplateResult {
    const imageUrl = entity.attributes.media_image_url || entity.attributes.entity_picture;

    if (imageUrl) {
      return html`<img class="artwork" src="${imageUrl}" alt=${cardLocalize(this.hass, 'card.album_art_alt')} />`;
    }

    return html`
      <div class="artwork-placeholder">
        <ha-icon icon="mdi:music"></ha-icon>
      </div>
    `;
  }

  private _renderMediaInfo(entity: HassEntity): TemplateResult | typeof nothing {
    const showDetails = this._resolvedConfig?.showDetails ?? true;
    if (!showDetails) return nothing;

    const title = entity.attributes.media_title || cardLocalize(this.hass, 'card.no_media');
    const artist = entity.attributes.media_artist || '';
    const album = entity.attributes.media_album_name || '';

    const showTitle = this._resolvedConfig?.showTitle ?? true;
    const showArtist = this._resolvedConfig?.showArtist ?? true;
    const showAlbum = this._resolvedConfig?.showAlbum ?? true;

    // Station info for normal mode (but not in tall artwork - tall uses pill button)
    const isTallArtwork = this._resolvedConfig?.artwork === 'tall';
    const stationDisplay = this._resolvedConfig?.stationDisplay ?? 'hidden';
    const showStationInfo = stationDisplay === 'normal' && !isTallArtwork;
    const stations = (entity.attributes.stations as Station[]) || [];
    const currentStationName = entity.attributes.source as string || '';
    const currentStation = stations.find(s => s.name === currentStationName);
    const isQuickMix = currentStation?.isQuickMix ?? false;
    const songStationName = (entity.attributes.song_station_name as string) || '';
    // Show song's station for QuickMix, otherwise show current station
    const displayStationName = isQuickMix && songStationName ? songStationName : currentStationName;
    const stationIcon = isQuickMix ? 'mdi:shuffle' : 'mdi:radio';

    // If all detail items are hidden, return nothing
    if (!showTitle && !showArtist && !showAlbum && !showStationInfo) return nothing;

    return html`
      <div class="media-info">
        ${showTitle ? html`<p class="title">${title}</p>` : nothing}
        ${showArtist && artist ? html`<p class="artist">${artist}</p>` : nothing}
        ${showAlbum && album ? html`<p class="album">${album}</p>` : nothing}
        ${showStationInfo && (displayStationName || stations.length > 0) ? html`
          <p class="station-info clickable" @click=${this._handleOpenStationPopup}>
            <ha-icon icon="${displayStationName ? stationIcon : 'mdi:radio'}"></ha-icon>
            <span>${displayStationName || cardLocalize(this.hass, 'card.select_station')}</span>
          </p>
        ` : nothing}
      </div>
    `;
  }

  private _renderProgressBar(entity: HassEntity): TemplateResult | typeof nothing {
    if (!this._resolvedConfig?.showProgressBar) return nothing;

    const duration = entity.attributes.media_duration || 0;
    const position = entity.attributes.media_position || 0;
    const positionUpdatedAt = entity.attributes.media_position_updated_at || '';
    const imageUrl = entity.attributes.entity_picture;
    const isTallArtwork = this._resolvedConfig?.artwork === 'tall';
    const isFullCover = this._resolvedConfig?.artwork === 'full-cover';
    const hasArtwork = !!imageUrl && !isTallArtwork; // Don't use extracted colors in tall mode
    // Use regional controls color for full-cover, otherwise standard foreground
    const fgColor = isFullCover 
      ? (this._extractedColors?.controlsForeground || this._extractedColors?.foreground || 'var(--pmc-primary-text-color)')
      : (this._extractedColors?.foreground || 'var(--pmc-primary-text-color)');
    const showTime = this._resolvedConfig?.showProgressTime ?? false;
    const isPlaying = this._isPlaying(entity);

    return html`
      <pmc-progress-bar
        .duration=${duration}
        .position=${position}
        .positionUpdatedAt=${positionUpdatedAt}
        .showTime=${showTime}
        .isPlaying=${isPlaying}
        style="color: ${hasArtwork ? fgColor : 'inherit'}"
      ></pmc-progress-bar>
    `;
  }

  private _renderVolumeControl(): TemplateResult | typeof nothing {
    if (!this._resolvedConfig?.showVolumeControl) return nothing;

    const volumeEntity = this._getVolumeEntity();
    if (!volumeEntity) return nothing;

    const volume = volumeEntity.attributes.volume_level ?? 0.5;
    const muted = volumeEntity.attributes.is_volume_muted ?? false;
    const unavailable = this._isUnavailable(volumeEntity);
    const entity = this._getEntity();
    const isTallArtwork = this._resolvedConfig?.artwork === 'tall';
    const isFullCover = this._resolvedConfig?.artwork === 'full-cover';
    const hasArtwork = !!entity?.attributes.entity_picture && !isTallArtwork; // Don't use extracted colors in tall mode
    // Use regional controls color for full-cover, otherwise standard foreground
    const fgColor = isFullCover 
      ? (this._extractedColors?.controlsForeground || this._extractedColors?.foreground || 'var(--pmc-primary-text-color)')
      : (this._extractedColors?.foreground || 'var(--pmc-primary-text-color)');

    return html`
      <pmc-volume-slider
        .hass=${this.hass}
        .volume=${volume}
        .muted=${muted}
        .disabled=${unavailable}
        .sliderColor=${hasArtwork ? fgColor : 'var(--pmc-primary-text-color)'}
        style="color: ${hasArtwork ? fgColor : 'inherit'}"
        @volume-change=${this._handleVolumeChange}
        @mute-toggle=${this._handleMuteToggle}
      ></pmc-volume-slider>
    `;
  }

  private _renderPlaybackControls(entity: HassEntity): TemplateResult | typeof nothing {
    if (!this._resolvedConfig?.showPlaybackControls) return nothing;

    const playing = this._isPlaying(entity);
    const unavailable = this._isUnavailable(entity);
    const showPower = this._resolvedConfig?.showPowerButton ?? false;
    const isOn = entity.state !== 'off' && entity.state !== 'unavailable';

    return html`
      <pmc-playback-controls
        .hass=${this.hass}
        .playing=${playing}
        .disabled=${unavailable}
        .showPower=${showPower}
        .isOn=${isOn}
        @play-pause=${this._handlePlayPause}
        @next-track=${this._handleNextTrack}
        @power-toggle=${this._handlePowerToggle}
      ></pmc-playback-controls>
    `;
  }

  private _renderSongActions(entity: HassEntity): TemplateResult | typeof nothing {
    if (!this._resolvedConfig?.showSongActions) return nothing;

    // Hide if no current song is playing
    const hasCurrentSong = !!entity.attributes.media_title;
    if (!hasCurrentSong) return nothing;

    const supportsLove = this._supportsLove();
    const supportsBan = this._supportsBan();
    const supportsTired = this._supportsTired();

    // Hide entirely if no actions are available
    if (!supportsLove && !supportsBan && !supportsTired) return nothing;

    const rating = (entity.attributes.rating as number) || 0;
    const unavailable = this._isUnavailable(entity);

    return html`
      <pmc-song-actions-menu
        .hass=${this.hass}
        .rating=${rating}
        .disabled=${unavailable}
        .showLove=${supportsLove}
        .showBan=${supportsBan}
        .showTired=${supportsTired}
        @love-song=${this._handleLoveSong}
        @ban-song=${this._handleBanSong}
        @tired-song=${this._handleTiredSong}
      ></pmc-song-actions-menu>
    `;
  }

  private _renderStationSelector(entity: HassEntity): TemplateResult | typeof nothing {
    const stationDisplay = this._resolvedConfig?.stationDisplay ?? 'hidden';
    // Only render in controls row for compact mode
    if (stationDisplay !== 'compact') return nothing;

    // Get stations from entity attributes
    const stations = (entity.attributes.stations as Station[]) || [];
    if (stations.length === 0) return nothing;

    // Get current station info
    const currentStationName = entity.attributes.source as string || '';
    // Find the current station by name to get its ID
    const currentStation = stations.find(s => s.name === currentStationName);
    const currentStationId = currentStation?.id || '';

    // Get song's station name for QuickMix display
    const songStationName = (entity.attributes.song_station_name as string) || '';

    const unavailable = this._isUnavailable(entity);

    return html`
      <pmc-station-selector
        .hass=${this.hass}
        .stations=${stations}
        .currentStationId=${currentStationId}
        .currentStationName=${currentStationName}
        .songStationName=${songStationName}
        .disabled=${unavailable}
        @station-change=${this._handleStationChange}
      ></pmc-station-selector>
    `;
  }

  /**
   * Overflow visibility follows docs/MENU_STATE_MATRIX.md (desired matrix).
   * Scenario chain: disconnected → session ready → have stations → station selected → song (title).
   */
  private _renderOverflowMenu(entity: HassEntity): TemplateResult {
    const supported = this._getEffectiveSupportedActions();
    const stations = (entity.attributes.stations as Station[]) || [];
    const unavailable = this._isUnavailable(entity);
    const isOn = entity.state !== 'off' && entity.state !== 'unavailable';
    const pandoraSessionUp =
      !unavailable && !this._isPandoraDisconnected(entity);
    const sessionReady = pandoraSessionUp && isOn;
    const hasStations = stations.length > 0;
    const currentStation = stations.find(s => s.id === entity.attributes.media_content_id);
    const stationSelected = !!currentStation;
    const mediaTitle = (entity.attributes.media_title as string | undefined)?.trim() ?? '';
    const hasSong = stationSelected && mediaTitle.length > 0;
    const hasRatings = this._supportsAnyRating() && hasSong;

    const showExplain =
      sessionReady && hasSong && supported.includes('explain_song');
    const showUpcoming =
      sessionReady && stationSelected && supported.includes('get_upcoming');
    const showStationMode =
      sessionReady &&
      hasStations &&
      currentStation &&
      !currentStation.isQuickMix &&
      (supported.includes('get_station_modes') || supported.includes('set_station_mode'));
    const showStationInfo =
      sessionReady &&
      hasStations &&
      currentStation &&
      !currentStation.isQuickMix &&
      supported.includes('get_station_info');
    const showQuickMix =
      sessionReady && hasStations && supported.includes('set_quick_mix');
    const showCreateStation = sessionReady && supported.includes('create_station');
    const showAddMusic =
      sessionReady &&
      hasStations &&
      stationSelected &&
      currentStation &&
      supported.includes('add_seed');
    const showRename =
      sessionReady &&
      hasStations &&
      stationSelected &&
      supported.includes('rename_station');
    const showDelete =
      sessionReady &&
      hasStations &&
      stationSelected &&
      supported.includes('delete_station');
    const accounts = (entity.attributes.accounts as Array<{id: string; label: string}>) || [];
    const entityHasMultipleAccounts = accounts.length > 1;
    const overflowShowAccountSwitch =
      sessionReady &&
      entityHasMultipleAccounts &&
      this._resolvedConfig?.showAccountSwitch !== false;
    const showStationOption = sessionReady && hasStations;

    return html`
      <pmc-overflow-menu
        class="overflow-menu"
        .hass=${this.hass}
        .entityId=${entity.entity_id}
        .showStationOption=${showStationOption}
        .showRatingsOption=${hasRatings}
        .showExplainOption=${showExplain}
        .showUpcomingOption=${showUpcoming}
        .showStationModeOption=${showStationMode}
        .showQuickMixOption=${showQuickMix}
        .showStationInfoOption=${showStationInfo}
        .showAddMusicOption=${showAddMusic}
        .showCreateStationOption=${showCreateStation}
        .showRenameOption=${showRename}
        .showDeleteOption=${showDelete}
        .showAccountSwitch=${overflowShowAccountSwitch}
        .isOn=${isOn}
        .disabled=${this._isUnavailable(entity)}
        .buildTime=${__BUILD_TIMESTAMP__}
        .usingSupportedActionsFallback=${this._isUsingSupportedActionsFallback()}
        @more-info=${this._handleMoreInfo}
        @power-toggle=${this._handlePowerToggle}
        @select-station=${this._handleOpenStationPopup}
        @select-ratings=${this._handleOpenRatingsPopup}
        @explain-song=${this._handleExplainSong}
        @show-upcoming=${this._handleShowUpcoming}
        @station-mode=${this._handleStationMode}
        @quickmix=${this._handleQuickMix}
        @rename-station=${this._handleRenameStation}
        @delete-station=${this._handleDeleteStation}
        @station-info=${this._handleStationInfo}
        @add-music=${this._handleAddMusic}
        @create-station=${this._handleCreateStation}
        @switch-account=${this._handleOpenAccountPopup}
      ></pmc-overflow-menu>
    `;
  }

  private _handleMoreInfo(e: CustomEvent): void {
    // Dispatch hass-more-info from the main card (like mini-media-player does)
    const event = new Event('hass-more-info', { composed: true });
    (event as any).detail = { entityId: e.detail?.entityId };
    this.dispatchEvent(event);
  }

  private async _handleExplainSong(): Promise<void> {
    const entity = this._getEntity();
    if (!entity || !this.hass) return;

    try {
      // Call the service using WebSocket API to get response data
      const response = await this.hass.connection.sendMessagePromise({
        type: 'call_service',
        domain: 'pianobar',
        service: 'explain_song',
        service_data: {
          entity_id: entity.entity_id
        },
        return_response: true,
      }) as any;

      const explanation = response?.response?.explanation || cardLocalize(this.hass, 'card.no_explanation');
      
      // Show toast notification using Home Assistant's notification system
      const event = new CustomEvent('hass-notification', {
        detail: {
          message: explanation,
          duration: 8000, // Show for 8 seconds
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
    } catch (err) {
      console.error('Error explaining song:', err);
      // Show error toast
      const event = new CustomEvent('hass-notification', {
        detail: {
          message: cardLocalize(this.hass, 'card.toast_failed_explain'),
          duration: 3000,
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
    }
  }

  private _handleOpenStationPopup(e: Event): void {
    let anchorPosition = (e as CustomEvent).detail?.anchorPosition;
    
    // If no anchor position provided, calculate it from the clicked element
    if (!anchorPosition && e.currentTarget) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      anchorPosition = {
        left: rect.left,
        top: rect.top,
        bottom: rect.bottom,
        right: rect.right
      };
    }
    
    this._popupAnchorPosition = anchorPosition;
    this._stationPopupOpen = true;
  }

  private _handleStationPopupClosed(): void {
    this._stationPopupOpen = false;
    this._popupAnchorPosition = undefined;
  }

  private _handleOpenRatingsPopup(e: CustomEvent): void {
    this._popupAnchorPosition = e.detail?.anchorPosition;
    this._ratingsPopupOpen = true;
  }

  private _handleRatingsPopupClosed(): void {
    this._ratingsPopupOpen = false;
    this._popupAnchorPosition = undefined;
  }

  private async _handleShowUpcoming(e: CustomEvent): Promise<void> {
    const entity = this._getEntity();
    if (!entity || !this.hass) return;

    // Force close first to ensure clean state
    this._upcomingPopupOpen = false;
    await this.updateComplete;

    this._popupAnchorPosition = e.detail?.anchorPosition;
    
    try {
      // Call the service to get upcoming songs using WebSocket API
      const response = await this.hass.connection.sendMessagePromise({
        type: 'call_service',
        domain: 'pianobar',
        service: 'get_upcoming',
        service_data: {
          entity_id: entity.entity_id
        },
        return_response: true,
      }) as any;

      this._upcomingSongs = response?.response?.songs || [];
      this._upcomingPopupOpen = true;
    } catch (err) {
      console.error('Error getting upcoming songs:', err);
      // Show error toast
      const event = new CustomEvent('hass-notification', {
        detail: {
          message: cardLocalize(this.hass, 'card.toast_failed_upcoming'),
          duration: 3000,
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
    }
  }

  private _handleUpcomingPopupClosed(): void {
    this._upcomingPopupOpen = false;
    this._popupAnchorPosition = undefined;
  }

  private async _handleStationMode(e: CustomEvent): Promise<void> {
    const entity = this._getEntity();
    if (!entity || !this.hass) return;

    // Force close first to ensure clean state
    this._stationModePopupOpen = false;
    await this.updateComplete;

    this._popupAnchorPosition = e.detail?.anchorPosition;
    this._stationModesLoading = true;
    this._stationModePopupOpen = true;
    
    try {
      // Get current station ID
      const stationId = entity.attributes.media_content_id as string;
      if (!stationId) {
        throw new Error('No station selected');
      }

      // Call the service to get station modes using WebSocket API
      const response = await this.hass.connection.sendMessagePromise({
        type: 'call_service',
        domain: 'pianobar',
        service: 'get_station_modes',
        service_data: { 
          entity_id: entity.entity_id,
          station_id: stationId
        },
        return_response: true,
      }) as any;

      this._stationModes = response?.response?.modes || [];
    } catch (err) {
      console.error('Error getting station modes:', err);
      // Show error toast
      const event = new CustomEvent('hass-notification', {
        detail: {
          message: cardLocalize(this.hass, 'card.toast_failed_station_modes'),
          duration: 3000,
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
      this._stationModePopupOpen = false;
    } finally {
      this._stationModesLoading = false;
    }
  }

  private _handleStationModePopupClosed(): void {
    this._stationModePopupOpen = false;
    this._popupAnchorPosition = undefined;
    this._stationModes = [];
  }

  private async _handleSetStationMode(e: CustomEvent): Promise<void> {
    const entity = this._getEntity();
    if (!entity || !this.hass) return;

    const { stationId, modeId } = e.detail;
    
    try {
      await this.hass.callService(
        'pianobar',
        'set_station_mode',
        { 
          entity_id: entity.entity_id,
          station_id: stationId,
          mode_id: modeId
        }
      );
      
      // Show success toast
      const event = new CustomEvent('hass-notification', {
        detail: {
          message: cardLocalize(this.hass, 'card.toast_station_mode_updated'),
          duration: 2000,
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
    } catch (err) {
      console.error('Error setting station mode:', err);
      // Show error toast
      const event = new CustomEvent('hass-notification', {
        detail: {
          message: cardLocalize(this.hass, 'card.toast_failed_set_station_mode'),
          duration: 3000,
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
    }
  }

  // Account switching handlers
  private async _handleOpenAccountPopup(e: CustomEvent): Promise<void> {
    if (this._resolvedConfig?.showAccountSwitch === false) return;

    this._openAccountPopup = false;
    await this.updateComplete;

    this._popupAnchorPosition = e.detail?.anchorPosition;
    this._openAccountPopup = true;
  }

  private _handleAccountPopupClosed(): void {
    this._openAccountPopup = false;
    this._popupAnchorPosition = undefined;
  }

  private async _handleAccountSelect(e: CustomEvent): Promise<void> {
    const entity = this._getEntity();
    if (!entity || !this.hass) return;

    const { accountId } = e.detail;

    try {
      await this.hass.callService(
        'pianobar',
        'switch_account',
        {
          entity_id: entity.entity_id,
          account_id: accountId,
        }
      );
    } catch (err) {
      console.error('Error switching account:', err);
      const event = new CustomEvent('hass-notification', {
        detail: {
          message: cardLocalize(this.hass, 'card.toast_failed_switch_account'),
          duration: 3000,
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
    }
  }

  // QuickMix handlers
  private async _handleQuickMix(e: CustomEvent): Promise<void> {
    // Force close first to ensure clean state
    this._openQuickMixPopup = false;
    await this.updateComplete;

    this._popupAnchorPosition = e.detail?.anchorPosition;
    this._openQuickMixPopup = true;
  }

  private _handleQuickMixPopupClosed(): void {
    this._openQuickMixPopup = false;
    this._popupAnchorPosition = undefined;
  }

  private async _handleQuickMixSave(e: CustomEvent): Promise<void> {
    const entity = this._getEntity();
    if (!entity || !this.hass) return;

    const { stationIds } = e.detail;
    
    try {
      await this.hass.callService(
        'pianobar',
        'set_quick_mix',
        { 
          entity_id: entity.entity_id,
          station_ids: stationIds
        }
      );
      
      // Show success toast
      const event = new CustomEvent('hass-notification', {
        detail: {
          message: cardLocalize(this.hass, 'card.toast_quickmix_updated'),
          duration: 2000,
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
      
      // Close the popup
      this._handleQuickMixPopupClosed();
    } catch (err) {
      console.error('Error updating QuickMix:', err);
      const errorEvent = new CustomEvent('hass-notification', {
        detail: {
          message: cardLocalize(this.hass, 'card.error_quickmix'),
          duration: 3000,
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(errorEvent);
    }
  }

  // Rename handlers
  private async _handleRenameStation(e: CustomEvent): Promise<void> {
    // Force close first to ensure clean state
    this._openRenameDialog = false;
    await this.updateComplete;

    this._popupAnchorPosition = e.detail?.anchorPosition;
    this._openRenameDialog = true;
  }

  private _handleRenameDialogClosed(): void {
    this._openRenameDialog = false;
    this._popupAnchorPosition = undefined;
  }

  private async _handleRenameStationSubmit(e: CustomEvent): Promise<void> {
    const entity = this._getEntity();
    if (!entity || !this.hass) return;

    const { stationId, newName } = e.detail;
    
    try {
      await this.hass.callService(
        'pianobar',
        'rename_station',
        { 
          entity_id: entity.entity_id,
          station_id: stationId,
          name: newName
        }
      );
      
      // Show success toast
      const event = new CustomEvent('hass-notification', {
        detail: {
          message: `Station renamed to "${newName}"`,
          duration: 2000,
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
      
      // Close the dialog
      this._handleRenameDialogClosed();
      
      // Force a re-render after a short delay to allow HA to update the entity
      setTimeout(() => {
        this.requestUpdate();
      }, 500);
    } catch (err) {
      console.error('Error renaming station:', err);
      const errorEvent = new CustomEvent('hass-notification', {
        detail: {
          message: cardLocalize(this.hass, 'card.error_rename'),
          duration: 3000,
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(errorEvent);
    }
  }

  // Delete handlers
  private async _handleDeleteStation(e: CustomEvent): Promise<void> {
    // Force close first to ensure clean state
    this._openDeleteDialog = false;
    await this.updateComplete;

    this._popupAnchorPosition = e.detail?.anchorPosition;
    this._openDeleteDialog = true;
  }

  private _handleDeleteDialogClosed(): void {
    this._openDeleteDialog = false;
    this._popupAnchorPosition = undefined;
  }

  private async _handleDeleteStationSubmit(e: CustomEvent): Promise<void> {
    const entity = this._getEntity();
    if (!entity || !this.hass) return;

    const { stationId, stationName } = e.detail;
    
    try {
      await this.hass.callService(
        'pianobar',
        'delete_station',
        { 
          entity_id: entity.entity_id,
          station_id: stationId
        }
      );
      
      // Show success toast
      const event = new CustomEvent('hass-notification', {
        detail: {
          message: `Station "${stationName}" deleted`,
          duration: 2000,
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
      
      // Close the dialog
      this._handleDeleteDialogClosed();
    } catch (err) {
      console.error('Error deleting station:', err);
      const errorEvent = new CustomEvent('hass-notification', {
        detail: {
          message: cardLocalize(this.hass, 'card.error_delete_station'),
          duration: 3000,
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(errorEvent);
    }
  }

  // Station Info handlers
  private async _handleStationInfo(e: CustomEvent): Promise<void> {
    const entity = this._getEntity();
    if (!entity || !this.hass) return;

    // Clear old data and set loading state BEFORE opening popup
    this._stationInfo = null;
    this._stationInfoLoading = true;
    this._popupAnchorPosition = e.detail?.anchorPosition;
    this._openStationInfoPopup = true;

    try {
      const stationId = entity.attributes.media_content_id as string;
      if (!stationId) {
        throw new Error('No station selected');
      }

      const response = await this.hass.connection.sendMessagePromise({
        type: 'call_service',
        domain: 'pianobar',
        service: 'get_station_info',
        service_data: { 
          entity_id: entity.entity_id,
          station_id: stationId
        },
        return_response: true,
      }) as any;

      this._stationInfo = {
        artistSeeds: response?.response?.artistSeeds || [],
        songSeeds: response?.response?.songSeeds || [],
        stationSeeds: response?.response?.stationSeeds || [],
        feedback: response?.response?.feedback || []
      };
    } catch (err) {
      console.error('Error fetching station info:', err);
      this._stationInfo = null;
      const errorEvent = new CustomEvent('hass-notification', {
        detail: {
          message: cardLocalize(this.hass, 'card.error_station_info'),
          duration: 3000,
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(errorEvent);
    } finally {
      this._stationInfoLoading = false;
    }
  }

  private _handleStationInfoPopupClosed(): void {
    this._openStationInfoPopup = false;
    this._stationInfo = null;
    this._popupAnchorPosition = undefined;
  }

  private async _handleDeleteSeed(e: CustomEvent): Promise<void> {
    const entity = this._getEntity();
    if (!entity || !this.hass) return;

    const { seedId, seedType, stationId } = e.detail;
    
    try {
      await this.hass.callService(
        'pianobar',
        'delete_seed',
        { 
          entity_id: entity.entity_id,
          seed_id: seedId,
          seed_type: seedType,
          station_id: stationId
        }
      );
      
      // Show success toast
      const event = new CustomEvent('hass-notification', {
        detail: {
          message: cardLocalize(this.hass, 'card.toast_seed_deleted'),
          duration: 2000,
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);

      // Refresh station info
      this._handleStationInfo({ detail: {} } as CustomEvent);
    } catch (err) {
      console.error('Error deleting seed:', err);
      const errorEvent = new CustomEvent('hass-notification', {
        detail: {
          message: cardLocalize(this.hass, 'card.error_delete_seed'),
          duration: 3000,
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(errorEvent);
    }
  }

  private async _handleDeleteFeedback(e: CustomEvent): Promise<void> {
    const entity = this._getEntity();
    if (!entity || !this.hass) return;

    const { feedbackId, stationId } = e.detail;
    
    try {
      await this.hass.callService(
        'pianobar',
        'delete_feedback',
        { 
          entity_id: entity.entity_id,
          feedback_id: feedbackId,
          station_id: stationId
        }
      );
      
      // Show success toast
      const event = new CustomEvent('hass-notification', {
        detail: {
          message: cardLocalize(this.hass, 'card.toast_feedback_deleted'),
          duration: 2000,
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);

      // Refresh station info
      this._handleStationInfo({ detail: {} } as CustomEvent);
    } catch (err) {
      console.error('Error deleting feedback:', err);
      const errorEvent = new CustomEvent('hass-notification', {
        detail: {
          message: cardLocalize(this.hass, 'card.error_delete_feedback'),
          duration: 3000,
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(errorEvent);
    }
  }

  // Add Music handlers
  private async _handleAddMusic(e: CustomEvent): Promise<void> {
    // Force close first to ensure clean state
    this._openAddMusicPopup = false;
    await this.updateComplete;

    this._popupAnchorPosition = e.detail?.anchorPosition;
    this._openAddMusicPopup = true;
    this._searchResults = { categories: [] };
    this._searchLoading = false;
  }

  private _handleAddMusicPopupClosed(): void {
    this._openAddMusicPopup = false;
    this._searchResults = { categories: [] };
    this._searchLoading = false;
    this._popupAnchorPosition = undefined;
  }

  private async _handleMusicSearch(e: CustomEvent): Promise<void> {
    const entity = this._getEntity();
    if (!entity || !this.hass) return;

    const { query } = e.detail;
    this._searchLoading = true;

    try {
      const response = await this.hass.connection.sendMessagePromise({
        type: 'call_service',
        domain: 'pianobar',
        service: 'search',
        service_data: { 
          entity_id: entity.entity_id,
          query: query
        },
        return_response: true,
      }) as any;

      console.log('Music search response:', response);
      console.log('Response.response:', response?.response);
      console.log('Categories:', response?.response?.categories);

      this._searchResults = {
        categories: response?.response?.categories || []
      };
    } catch (err) {
      console.error('Error searching:', err);
      this._searchResults = { categories: [] };
      const errorEvent = new CustomEvent('hass-notification', {
        detail: {
          message: cardLocalize(this.hass, 'card.error_search_music'),
          duration: 3000,
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(errorEvent);
    } finally {
      this._searchLoading = false;
    }
  }

  private async _handleAddMusicSubmit(e: CustomEvent): Promise<void> {
    const entity = this._getEntity();
    if (!entity || !this.hass) return;

    const { musicId, stationId } = e.detail;
    
    try {
      await this.hass.callService(
        'pianobar',
        'add_seed',
        { 
          entity_id: entity.entity_id,
          music_id: musicId,
          station_id: stationId
        }
      );
      
      // Show success toast
      const event = new CustomEvent('hass-notification', {
        detail: {
          message: cardLocalize(this.hass, 'card.toast_music_added'),
          duration: 2000,
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
      
      // Close the popup
      this._handleAddMusicPopupClosed();
    } catch (err) {
      console.error('Error adding music:', err);
      const errorEvent = new CustomEvent('hass-notification', {
        detail: {
          message: cardLocalize(this.hass, 'card.error_add_music'),
          duration: 3000,
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(errorEvent);
    }
  }

  // Create Station handlers
  private async _handleCreateStation(e: CustomEvent): Promise<void> {
    // Force close first to ensure clean state
    this._openCreateStationModal = false;
    await this.updateComplete;

    this._popupAnchorPosition = e.detail?.anchorPosition;
    this._openCreateStationModal = true;
    this._searchResults = { categories: [] };
    this._genreCategories = [];
    this._searchLoading = false;
    this._genreLoading = false;
  }

  private _handleCreateStationModalClosed(): void {
    this._openCreateStationModal = false;
    this._searchResults = { categories: [] };
    this._genreCategories = [];
    this._searchLoading = false;
    this._genreLoading = false;
    this._popupAnchorPosition = undefined;
  }

  private async _handleCreateFromSong(): Promise<void> {
    const entity = this._getEntity();
    if (!entity || !this.hass) return;

    const trackToken = entity.attributes.media_content_id as string;
    if (!trackToken) return;

    try {
      await this.hass.callService(
        'pianobar',
        'create_station',
        { 
          entity_id: entity.entity_id,
          type: 'song'
        }
      );
      this.dispatchEvent(new CustomEvent('hass-notification', {
        detail: { message: cardLocalize(this.hass, 'card.toast_station_created_song'), duration: 2000 },
        bubbles: true,
        composed: true,
      }));
    } catch (err) {
      console.error('Error creating station:', err);
      this.dispatchEvent(new CustomEvent('hass-notification', {
        detail: { message: cardLocalize(this.hass, 'card.error_create_station'), duration: 3000 },
        bubbles: true,
        composed: true,
      }));
    }
  }

  private async _handleCreateFromArtist(): Promise<void> {
    const entity = this._getEntity();
    if (!entity || !this.hass) return;

    const trackToken = entity.attributes.media_content_id as string;
    if (!trackToken) return;

    try {
      await this.hass.callService(
        'pianobar',
        'create_station',
        { 
          entity_id: entity.entity_id,
          type: 'artist'
        }
      );
      this.dispatchEvent(new CustomEvent('hass-notification', {
        detail: { message: cardLocalize(this.hass, 'card.toast_station_created_artist'), duration: 2000 },
        bubbles: true,
        composed: true,
      }));
    } catch (err) {
      console.error('Error creating station:', err);
      this.dispatchEvent(new CustomEvent('hass-notification', {
        detail: { message: cardLocalize(this.hass, 'card.error_create_station'), duration: 3000 },
        bubbles: true,
        composed: true,
      }));
    }
  }

  private async _handleCreateStationSearch(e: CustomEvent): Promise<void> {
    console.log('[CARD] _handleCreateStationSearch called with:', e.detail);
    
    const entity = this._getEntity();
    if (!entity || !this.hass) {
      console.log('[CARD] No entity or hass, returning');
      return;
    }

    const { query } = e.detail;
    console.log('[CARD] Starting search for query:', query);
    this._searchLoading = true;

    try {
      console.log('[CARD] Calling service with entity_id:', entity.entity_id);
      const response = await this.hass.connection.sendMessagePromise({
        type: 'call_service',
        domain: 'pianobar',
        service: 'search',
        service_data: { 
          entity_id: entity.entity_id,
          query: query
        },
        return_response: true,
      }) as any;

      console.log('[CARD] Create station search response:', response);
      console.log('[CARD] Response.response:', response?.response);
      console.log('[CARD] Categories:', response?.response?.categories);

      this._searchResults = {
        categories: response?.response?.categories || []
      };
      
      console.log('[CARD] Set _searchResults to:', this._searchResults);
      console.log('[CARD] Triggering update...');
      
      // Directly update the modal if it exists
      if (this._createStationModalRef.value) {
        console.log('[CARD] Modal ref exists, updating searchResults and mode');
        this._createStationModalRef.value.searchResults = this._searchResults;
        this._createStationModalRef.value._mode = 'search-results';  // Trigger re-render by changing mode
        this._createStationModalRef.value.requestUpdate();
      } else {
        console.log('[CARD] No modal ref, using requestUpdate on card');
        this.requestUpdate(); // Force full re-render
      }
      
      console.log('[CARD] After update, _searchResults is:', this._searchResults);
    } catch (err) {
      console.error('[CARD] Error searching:', err);
      this._searchResults = { categories: [] };
      this.dispatchEvent(new CustomEvent('hass-notification', {
        detail: { message: cardLocalize(this.hass, 'card.error_search_music'), duration: 3000 },
        bubbles: true,
        composed: true,
      }));
    } finally {
      this._searchLoading = false;
      console.log('[CARD] Search loading finished');
    }
  }

  private async _handleBrowseGenres(): Promise<void> {
    const entity = this._getEntity();
    if (!entity || !this.hass) return;

    this._genreLoading = true;

    try {
      const response = await this.hass.connection.sendMessagePromise({
        type: 'call_service',
        domain: 'pianobar',
        service: 'get_genres',
        service_data: {
          entity_id: entity.entity_id
        },
        return_response: true,
      }) as any;

      this._genreCategories = response?.response?.categories || [];
    } catch (err) {
      console.error('Error fetching genres:', err);
      this._genreCategories = [];
      this.dispatchEvent(new CustomEvent('hass-notification', {
        detail: { message: cardLocalize(this.hass, 'card.error_genres'), duration: 3000 },
        bubbles: true,
        composed: true,
      }));
    } finally {
      this._genreLoading = false;
    }
  }

  private async _handleCreateFromMusicId(e: CustomEvent): Promise<void> {
    const entity = this._getEntity();
    if (!entity || !this.hass) return;

    const { musicId } = e.detail;

    try {
      await this.hass.callService(
        'pianobar',
        'create_station_from_music_id',
        { 
          entity_id: entity.entity_id,
          music_id: musicId
        }
      );
      this.dispatchEvent(new CustomEvent('hass-notification', {
        detail: { message: cardLocalize(this.hass, 'card.toast_station_created'), duration: 2000 },
        bubbles: true,
        composed: true,
      }));
    } catch (err) {
      console.error('Error creating station:', err);
      this.dispatchEvent(new CustomEvent('hass-notification', {
        detail: { message: cardLocalize(this.hass, 'card.error_create_station'), duration: 3000 },
        bubbles: true,
        composed: true,
      }));
    }
  }

  private async _handleCreateFromShared(e: CustomEvent): Promise<void> {
    const entity = this._getEntity();
    if (!entity || !this.hass) return;

    const { stationId } = e.detail;

    try {
      await this.hass.callService(
        'pianobar',
        'add_shared_station',
        { 
          entity_id: entity.entity_id,
          station_id: stationId
        }
      );
      this.dispatchEvent(new CustomEvent('hass-notification', {
        detail: { message: cardLocalize(this.hass, 'card.toast_shared_station_added'), duration: 2000 },
        bubbles: true,
        composed: true,
      }));
    } catch (err) {
      console.error('Error adding shared station:', err);
      this.dispatchEvent(new CustomEvent('hass-notification', {
        detail: { message: cardLocalize(this.hass, 'card.error_add_shared'), duration: 3000 },
        bubbles: true,
        composed: true,
      }));
    }
  }

  private _renderStationPopup(entity: HassEntity): TemplateResult | typeof nothing {
    const stationDisplay = this._resolvedConfig?.stationDisplay ?? 'hidden';
    // Render popup-only selector for normal mode OR when explicitly opened (e.g., from overflow menu)
    // In normal mode, always render so clicking station-info can open it
    // In other modes, only render when _stationPopupOpen is true
    const shouldRender = stationDisplay === 'normal' || this._stationPopupOpen;
    if (!shouldRender) return nothing;

    const stations = (entity.attributes.stations as Station[]) || [];
    if (stations.length === 0) return nothing;

    const currentStationName = entity.attributes.source as string || '';
    const currentStation = stations.find(s => s.name === currentStationName);
    const currentStationId = currentStation?.id || '';
    const songStationName = (entity.attributes.song_station_name as string) || '';
    const unavailable = this._isUnavailable(entity);

    return html`
      <pmc-station-selector
        .hass=${this.hass}
        .stations=${stations}
        .currentStationId=${currentStationId}
        .currentStationName=${currentStationName}
        .songStationName=${songStationName}
        .disabled=${unavailable}
        .popupOnly=${true}
        .externalOpen=${this._stationPopupOpen}
        .anchorPosition=${this._popupAnchorPosition}
        @station-change=${this._handleStationChange}
        @popup-closed=${this._handleStationPopupClosed}
      ></pmc-station-selector>
    `;
  }

  private _renderRatingsPopup(entity: HassEntity): TemplateResult | typeof nothing {
    // Only render when explicitly opened (from overflow menu)
    if (!this._ratingsPopupOpen) return nothing;

    const supportsLove = this._supportsLove();
    const supportsBan = this._supportsBan();
    const supportsTired = this._supportsTired();

    // Don't render if no actions are supported
    if (!supportsLove && !supportsBan && !supportsTired) return nothing;

    const rating = (entity.attributes.rating as number) || 0;
    const unavailable = this._isUnavailable(entity);

    return html`
      <pmc-song-actions-menu
        .hass=${this.hass}
        .rating=${rating}
        .disabled=${unavailable}
        .showLove=${supportsLove}
        .showBan=${supportsBan}
        .showTired=${supportsTired}
        .popupOnly=${true}
        .externalOpen=${this._ratingsPopupOpen}
        .anchorPosition=${this._popupAnchorPosition}
        @love-song=${this._handleLoveSong}
        @ban-song=${this._handleBanSong}
        @tired-song=${this._handleTiredSong}
        @popup-closed=${this._handleRatingsPopupClosed}
      ></pmc-song-actions-menu>
    `;
  }

  private _renderUpcomingPopup(): TemplateResult | typeof nothing {
    // Only render when explicitly opened
    if (!this._upcomingPopupOpen) return nothing;

    return html`
      <pmc-upcoming-songs-popup
        .hass=${this.hass}
        .externalOpen=${this._upcomingPopupOpen}
        .anchorPosition=${this._popupAnchorPosition}
        .songs=${this._upcomingSongs}
        @popup-closed=${this._handleUpcomingPopupClosed}
      ></pmc-upcoming-songs-popup>
    `;
  }

  private _renderStationModePopup(entity: HassEntity): TemplateResult | typeof nothing {
    // Only render when explicitly opened
    if (!this._stationModePopupOpen) return nothing;

    const stations = (entity.attributes.stations as Station[]) || [];
    const stationId = entity.attributes.media_content_id as string;
    const currentStation = stations.find(s => s.id === stationId);
    const stationName = currentStation?.name || '';

    return html`
      <pmc-station-mode-popup
        .hass=${this.hass}
        .externalOpen=${this._stationModePopupOpen}
        .anchorPosition=${this._popupAnchorPosition}
        .currentStationId=${stationId}
        .currentStationName=${stationName}
        .modes=${this._stationModes}
        .loading=${this._stationModesLoading}
        @set-mode=${this._handleSetStationMode}
        @popup-closed=${this._handleStationModePopupClosed}
      ></pmc-station-mode-popup>
    `;
  }

  private _renderQuickMixPopup(entity: HassEntity): TemplateResult | typeof nothing {
    if (!this._openQuickMixPopup) return nothing;

    const stations = (entity.attributes.stations as Station[]) || [];
    const unavailable = this._isUnavailable(entity);

    return html`
      <pmc-quickmix-popup
        .hass=${this.hass}
        .stations=${stations}
        .disabled=${unavailable}
        .externalOpen=${this._openQuickMixPopup}
        .anchorPosition=${this._popupAnchorPosition}
        @save=${this._handleQuickMixSave}
        @popup-closed=${this._handleQuickMixPopupClosed}
      ></pmc-quickmix-popup>
    `;
  }

  private _renderRenameDialog(entity: HassEntity): TemplateResult | typeof nothing {
    if (!this._openRenameDialog) return nothing;

    const stations = (entity.attributes.stations as Station[]) || [];
    const unavailable = this._isUnavailable(entity);

    return html`
      <pmc-rename-dialog
        .hass=${this.hass}
        .stations=${stations}
        .disabled=${unavailable}
        .externalOpen=${this._openRenameDialog}
        .anchorPosition=${this._popupAnchorPosition}
        @rename-station=${this._handleRenameStationSubmit}
        @dialog-closed=${this._handleRenameDialogClosed}
      ></pmc-rename-dialog>
    `;
  }

  private _renderDeleteDialog(entity: HassEntity): TemplateResult | typeof nothing {
    if (!this._openDeleteDialog) return nothing;

    const stations = (entity.attributes.stations as Station[]) || [];
    const unavailable = this._isUnavailable(entity);

    return html`
      <pmc-delete-dialog
        .hass=${this.hass}
        .stations=${stations}
        .disabled=${unavailable}
        .externalOpen=${this._openDeleteDialog}
        .anchorPosition=${this._popupAnchorPosition}
        @delete-station=${this._handleDeleteStationSubmit}
        @dialog-closed=${this._handleDeleteDialogClosed}
      ></pmc-delete-dialog>
    `;
  }

  private _renderStationInfoPopup(entity: HassEntity): TemplateResult {
    // Always render the component so it can receive property updates
    const stations = (entity.attributes.stations as Station[]) || [];
    const stationId = entity.attributes.media_content_id as string;
    const currentStation = stations.find(s => s.id === stationId);
    const stationName = currentStation?.name || '';
    const unavailable = this._isUnavailable(entity);

    return html`
      <pmc-station-info-popup
        .hass=${this.hass}
        .currentStationId=${stationId}
        .currentStationName=${stationName}
        .stationInfo=${this._stationInfo}
        .infoLoading=${this._stationInfoLoading}
        .disabled=${unavailable}
        .externalOpen=${this._openStationInfoPopup}
        .anchorPosition=${this._popupAnchorPosition}
        @delete-seed=${this._handleDeleteSeed}
        @delete-feedback=${this._handleDeleteFeedback}
        @popup-closed=${this._handleStationInfoPopupClosed}
      ></pmc-station-info-popup>
    `;
  }

  private _renderAddMusicPopup(entity: HassEntity): TemplateResult | typeof nothing {
    if (!this._openAddMusicPopup) return nothing;

    const stations = (entity.attributes.stations as Station[]) || [];
    const unavailable = this._isUnavailable(entity);

    return html`
      <pmc-add-music-popup
        .hass=${this.hass}
        .stations=${stations}
        .searchResults=${this._searchResults}
        .searchLoading=${this._searchLoading}
        .disabled=${unavailable}
        .externalOpen=${this._openAddMusicPopup}
        .anchorPosition=${this._popupAnchorPosition}
        @search=${this._handleMusicSearch}
        @add-music=${this._handleAddMusicSubmit}
        @popup-closed=${this._handleAddMusicPopupClosed}
      ></pmc-add-music-popup>
    `;
  }

  private _renderAccountPopup(entity: HassEntity): TemplateResult | typeof nothing {
    if (!this._openAccountPopup) return nothing;
    if (this._resolvedConfig?.showAccountSwitch === false) return nothing;

    const accounts = (entity.attributes.accounts as Array<{id: string; label: string}>) || [];
    const currentAccount = entity.attributes.current_account as {id: string; label: string} | undefined;
    const currentAccountId = currentAccount?.id || '';

    return html`
      <pmc-account-selector-popup
        .hass=${this.hass}
        .externalOpen=${this._openAccountPopup}
        .anchorPosition=${this._popupAnchorPosition}
        .accounts=${accounts}
        .currentAccountId=${currentAccountId}
        @account-select=${this._handleAccountSelect}
        @popup-closed=${this._handleAccountPopupClosed}
      ></pmc-account-selector-popup>
    `;
  }

  private _renderCreateStationModal(entity: HassEntity): TemplateResult | typeof nothing {
    if (!this._openCreateStationModal) return nothing;

    const unavailable = this._isUnavailable(entity);
    const currentSongName = entity.attributes.media_title as string || '';
    const currentArtistName = entity.attributes.media_artist as string || '';
    const currentTrackToken = entity.attributes.media_content_id as string || '';

    return html`
      <pmc-create-station-modal
        ${ref(this._createStationModalRef)}
        .hass=${this.hass}
        .currentSongName=${currentSongName}
        .currentArtistName=${currentArtistName}
        .currentTrackToken=${currentTrackToken}
        .searchResults=${this._searchResults}
        .genreCategories=${this._genreCategories}
        .searchLoading=${this._searchLoading}
        .genreLoading=${this._genreLoading}
        .externalOpen=${this._openCreateStationModal}
        .anchorPosition=${this._popupAnchorPosition}
        @create-from-song=${this._handleCreateFromSong}
        @create-from-artist=${this._handleCreateFromArtist}
        @search=${this._handleCreateStationSearch}
        @browse-genres=${this._handleBrowseGenres}
        @create-from-music-id=${this._handleCreateFromMusicId}
        @create-from-shared=${this._handleCreateFromShared}
        @popup-closed=${this._handleCreateStationModalClosed}
      ></pmc-create-station-modal>
    `;
  }

  private _renderStationPill(entity: HassEntity): TemplateResult | typeof nothing {
    const stationDisplay = this._resolvedConfig?.stationDisplay ?? 'hidden';
    if (stationDisplay === 'hidden') return nothing;

    const stations = (entity.attributes.stations as Station[]) || [];
    if (stations.length === 0) return nothing;

    const currentStationName = entity.attributes.source as string || '';
    const currentStation = stations.find(s => s.name === currentStationName);
    const isQuickMix = currentStation?.isQuickMix ?? false;
    const songStationName = (entity.attributes.song_station_name as string) || '';
    const displayStationName = isQuickMix && songStationName ? songStationName : currentStationName;
    const stationIcon = isQuickMix ? 'mdi:shuffle' : 'mdi:radio';

    return html`
      <div class="station-pill" @click=${this._handleOpenStationPopup}>
        <ha-icon icon="${displayStationName ? stationIcon : 'mdi:radio'}"></ha-icon>
        <span>${displayStationName || cardLocalize(this.hass, 'card.select_station')}</span>
      </div>
    `;
  }

  @state() private _tallArtworkError = false;

  private _handleTallArtworkError(): void {
    this._tallArtworkError = true;
  }

  render(): TemplateResult {
    if (!this._config || !this.hass) {
      return html``;
    }

    const entity = this._getEntity();

    if (!entity) {
      return html`
        <ha-card>
          <div class="unavailable-text">
            Entity not found: ${this._config.entity}
          </div>
        </ha-card>
      `;
    }

    const isTallArtwork = this._resolvedConfig?.artwork === 'tall';
    const unavailable = this._isUnavailable(entity);
    const isFullCover = this._resolvedConfig?.artwork === 'full-cover';
    const imageUrl = entity.attributes.entity_picture;
    // Tall mode needs special hasArtwork check for error handling
    const hasArtwork = isTallArtwork 
      ? (!!imageUrl && typeof imageUrl === 'string' && imageUrl.length > 0 && !this._tallArtworkError)
      : !!imageUrl;

    // Get extracted colors or fallbacks
    const bgColor = this._extractedColors?.background || 'var(--pmc-card-background)';
    const fgColor = this._extractedColors?.foreground || 'var(--pmc-primary-text-color)';
    
    // Regional colors for full-cover mode (fallback to main foreground if not available)
    const metadataColor = isFullCover 
      ? (this._extractedColors?.metadataForeground || fgColor)
      : fgColor;
    const controlsColor = isFullCover 
      ? (this._extractedColors?.controlsForeground || fgColor)
      : fgColor;

    // Card styles with extracted background color (not applied in tall artwork)
    const cardStyle = styleMap({
      '--pmc-extracted-bg': bgColor,
      '--pmc-extracted-fg': fgColor,
      backgroundColor: !isTallArtwork && hasArtwork ? bgColor : undefined,
    });

    // Gradient style for artwork fade
    // Uses pixel-based fade matching the card height (approach adapted from mini-media-player)
    const gradientStyle = styleMap({
      background: `linear-gradient(to left, transparent 0, ${bgColor} ${this._cardHeight}px, ${bgColor} 100%)`,
    });

    const showProgress = this._resolvedConfig?.showProgressBar;
    const showProgressTime = this._resolvedConfig?.showProgressTime;
    const reserveDetailsSpace = this._resolvedConfig?.reserveDetailsSpace ?? true;
    
    const cardClasses = [
      hasArtwork && !isTallArtwork ? 'has-artwork' : '',
      showProgress ? 'has-progress' : '',
      showProgress && showProgressTime ? 'show-time' : '',
      !reserveDetailsSpace ? 'no-reserve' : '',
    ].filter(Boolean).join(' ');

    return html`
      <ha-card 
        style=${isTallArtwork ? nothing : cardStyle} 
        class="${cardClasses}"
      >
        ${this._renderOverflowMenu(entity)}
        ${this._renderPandoraDisconnectBanner(entity)}

        ${isTallArtwork
          ? html`
              ${hasArtwork
                ? html`
                    <div class="artwork-container">
                      <img 
                        class="artwork-image" 
                        src="${imageUrl}" 
                        alt=""
                        @error=${this._handleTallArtworkError}
                      />
                    </div>
                  `
                : html`
                    <div class="artwork-placeholder-tall">
                      <ha-icon icon="mdi:music"></ha-icon>
                    </div>
                  `
              }
            `
          : nothing
        }
        
        ${!isTallArtwork && hasArtwork && !isFullCover
          ? html`
              <div class="artwork-container">
                <img class="artwork-image" src="${imageUrl}" alt="" />
              </div>
              <div class="artwork-gradient" style=${gradientStyle}></div>
            `
          : nothing
        }
        
        ${!isTallArtwork && isFullCover && imageUrl
          ? html`
              <div class="fullcover-background" style="background-image: url('${imageUrl}')"></div>
              <div class="fullcover-overlay"></div>
            `
          : nothing
        }

        <div class="card-content ${unavailable ? 'unavailable' : ''}" 
             style="color: ${hasArtwork && !isTallArtwork ? metadataColor : 'inherit'}">
          ${this._renderMediaInfo(entity)}
        </div>

        ${showProgress ? this._renderProgressBar(entity) : nothing}

        ${this._resolvedConfig?.showPlaybackControls ||
          this._resolvedConfig?.showVolumeControl ||
          this._resolvedConfig?.showSongActions ||
          this._resolvedConfig?.stationDisplay === 'compact'
            ? html`
                <div class="controls-section" 
                     style="color: ${hasArtwork && !isTallArtwork ? controlsColor : 'inherit'}">
                  ${isTallArtwork
                    ? html`
                        ${this._renderVolumeControl()}
                        <div class="controls-row">
                          ${this._renderSongActions(entity)}
                          ${this._renderPlaybackControls(entity)}
                        </div>
                        ${this._renderStationPill(entity)}
                      `
                    : html`
                        <div class="controls-row">
                          ${this._renderPlaybackControls(entity)}
                          <div class="controls-spacer"></div>
                          ${this._renderSongActions(entity)}
                          ${this._renderStationSelector(entity)}
                        </div>
                        ${this._renderVolumeControl()}
                      `
                  }
                </div>
              `
            : nothing
        }

        ${this._renderStationPopup(entity)}
        ${this._renderRatingsPopup(entity)}
        ${this._renderUpcomingPopup()}
        ${this._renderStationModePopup(entity)}
        ${this._renderQuickMixPopup(entity)}
        ${this._renderRenameDialog(entity)}
        ${this._renderDeleteDialog(entity)}
        ${this._renderStationInfoPopup(entity)}
        ${this._renderAddMusicPopup(entity)}
        ${this._renderCreateStationModal(entity)}
        ${this._renderAccountPopup(entity)}
      </ha-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pianobar-media-player-card': PianobarMediaPlayerCard;
  }
}
