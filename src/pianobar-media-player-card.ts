import { LitElement, html, TemplateResult, PropertyValues, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
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
} from './types';

// Import components
import './components/playback-controls';
import './components/progress-bar';
import './components/volume-slider';
import './components/song-actions-menu';
import './components/station-selector';
import './components/overflow-menu';
import './components/upcoming-songs-popup';
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
  @state() private _popupAnchorPosition?: { left: number; top: number; bottom: number; right: number };
  @state() private _upcomingSongs: unknown[] = [];

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

  // Check if specific song actions are supported via entity's supported_actions attribute
  private _getSupportedActions(): string[] {
    const entity = this._getEntity();
    return (entity?.attributes?.supported_actions as string[]) || [];
  }

  private _supportsLove(): boolean {
    return this._getSupportedActions().includes('love_song');
  }

  private _supportsBan(): boolean {
    return this._getSupportedActions().includes('ban_song');
  }

  private _supportsTired(): boolean {
    return this._getSupportedActions().includes('tired_of_song');
  }

  private _supportsAnyRating(entity: HassEntity): boolean {
    const supportedActions = entity.attributes.supported_actions as string[] | undefined;
    if (!supportedActions || !Array.isArray(supportedActions)) return false;
    return supportedActions.includes('love_song') ||
           supportedActions.includes('ban_song') ||
           supportedActions.includes('tired_of_song');
  }

  // Service calls
  private async _handlePlayPause(): Promise<void> {
    const entity = this._getEntity();
    if (!entity || !this.hass) return;

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
    if (!this.hass) return;
    await this.hass.callService('pianobar', 'love_song', {});
  }

  private async _handleBanSong(): Promise<void> {
    if (!this.hass) return;
    await this.hass.callService('pianobar', 'ban_song', {});
  }

  private async _handleTiredSong(): Promise<void> {
    if (!this.hass) return;
    await this.hass.callService('pianobar', 'tired_of_song', {});
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
      return html`<img class="artwork" src="${imageUrl}" alt="Album artwork" />`;
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

    const title = entity.attributes.media_title || 'No media';
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
        ${showStationInfo && displayStationName ? html`
          <p class="station-info clickable" @click=${this._handleOpenStationPopup}>
            <ha-icon icon="${stationIcon}"></ha-icon>
            <span>${displayStationName}</span>
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
        .stations=${stations}
        .currentStationId=${currentStationId}
        .currentStationName=${currentStationName}
        .songStationName=${songStationName}
        .disabled=${unavailable}
        @station-change=${this._handleStationChange}
      ></pmc-station-selector>
    `;
  }

  private _renderOverflowMenu(entity: HassEntity): TemplateResult {
    const stations = (entity.attributes.stations as Station[]) || [];
    const hasStations = stations.length > 0;
    const hasRatings = this._supportsAnyRating(entity);
    const hasCurrentSong = !!entity.attributes.media_title;
    const isOn = entity.state !== 'off' && entity.state !== 'unavailable';

    return html`
      <pmc-overflow-menu
        class="overflow-menu"
        .entityId=${entity.entity_id}
        .showStationOption=${hasStations}
        .showRatingsOption=${hasRatings}
        .showExplainOption=${hasCurrentSong}
        .showUpcomingOption=${isOn}
        .isOn=${isOn}
        .disabled=${this._isUnavailable(entity)}
        .buildTime=${__BUILD_TIMESTAMP__}
        @more-info=${this._handleMoreInfo}
        @power-toggle=${this._handlePowerToggle}
        @select-station=${this._handleOpenStationPopup}
        @select-ratings=${this._handleOpenRatingsPopup}
        @explain-song=${this._handleExplainSong}
        @show-upcoming=${this._handleShowUpcoming}
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
      // Call the service with return_response flag
      const response = await this.hass.callService(
        'pianobar',
        'explain_song',
        {},
        { entity_id: entity.entity_id },
        true // Return response
      ) as { explanation?: string } | undefined;

      const explanation = response?.explanation || 'No explanation available';
      
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
          message: 'Failed to get song explanation',
          duration: 3000,
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
    }
  }

  private _handleOpenStationPopup(e: CustomEvent): void {
    this._popupAnchorPosition = e.detail?.anchorPosition;
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

    this._popupAnchorPosition = e.detail?.anchorPosition;
    
    try {
      // Call the service to get upcoming songs
      const response = await this.hass.callService(
        'pianobar',
        'get_upcoming',
        {},
        { entity_id: entity.entity_id },
        true // Return response
      ) as { songs?: unknown[] } | undefined;

      this._upcomingSongs = response?.songs || [];
      this._upcomingPopupOpen = true;
    } catch (err) {
      console.error('Error getting upcoming songs:', err);
      // Show error toast
      const event = new CustomEvent('hass-notification', {
        detail: {
          message: 'Failed to get upcoming songs',
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
        .externalOpen=${this._upcomingPopupOpen}
        .anchorPosition=${this._popupAnchorPosition}
        .songs=${this._upcomingSongs}
        @popup-closed=${this._handleUpcomingPopupClosed}
      ></pmc-upcoming-songs-popup>
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

    if (!displayStationName) return nothing;

    return html`
      <div class="station-pill" @click=${this._handleOpenStationPopup}>
        <ha-icon icon="${stationIcon}"></ha-icon>
        <span>${displayStationName}</span>
      </div>
    `;
  }

  @state() private _tallArtworkError = false;

  private _handleTallArtworkError(): void {
    this._tallArtworkError = true;
  }

  private _renderTallMode(entity: HassEntity): TemplateResult {
    const unavailable = this._isUnavailable(entity);
    // Use same image source as main render - entity_picture is the thumbnail URL
    const imageUrl = entity.attributes.entity_picture;
    // Only consider valid if it's a non-empty string and hasn't errored
    const hasArtwork = !!imageUrl && typeof imageUrl === 'string' && imageUrl.length > 0 && !this._tallArtworkError;
    const showProgress = this._resolvedConfig?.showProgressBar;

    return html`
      ${this._renderOverflowMenu(entity)}

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
          `}

      <div class="card-content ${unavailable ? 'unavailable' : ''}">
        ${this._renderMediaInfo(entity)}
      </div>

      ${showProgress ? this._renderProgressBar(entity) : nothing}

      ${this._resolvedConfig?.showPlaybackControls ||
      this._resolvedConfig?.showVolumeControl ||
      this._resolvedConfig?.showSongActions
        ? html`
            <div class="controls-section">
              ${this._renderVolumeControl()}
              <div class="controls-row">
                ${this._renderSongActions(entity)}
                ${this._renderPlaybackControls(entity)}
              </div>
              ${this._renderStationPill(entity)}
            </div>
          `
        : nothing}

      ${this._renderStationPopup(entity)}
      ${this._renderRatingsPopup(entity)}
      ${this._renderUpcomingPopup()}
    `;
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
    const hasArtwork = !!imageUrl;

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

    // Use tall artwork layout
    if (isTallArtwork) {
      return html`
        <ha-card class="${cardClasses}">
          ${this._renderTallMode(entity)}
        </ha-card>
      `;
    }

    return html`
      <ha-card style=${cardStyle} class="${cardClasses}">
        ${hasArtwork && !isFullCover
          ? html`
              <div class="artwork-container">
                <img class="artwork-image" src="${imageUrl}" alt="" />
              </div>
              <div class="artwork-gradient" style=${gradientStyle}></div>
            `
          : nothing}
        
        ${isFullCover && imageUrl
          ? html`
              <div class="fullcover-background" style="background-image: url('${imageUrl}')"></div>
              <div class="fullcover-overlay"></div>
            `
          : nothing}

        <div class="card-content ${unavailable ? 'unavailable' : ''}" style="color: ${hasArtwork ? metadataColor : 'inherit'}">
          ${this._renderMediaInfo(entity)}
          ${this._renderOverflowMenu(entity)}
        </div>

        ${this._resolvedConfig?.showPlaybackControls ||
        this._resolvedConfig?.showVolumeControl ||
        this._resolvedConfig?.showSongActions ||
        this._resolvedConfig?.stationDisplay === 'compact'
          ? html`
              <div class="controls-section" style="color: ${hasArtwork ? controlsColor : 'inherit'}">
                <div class="controls-row">
                  ${this._renderPlaybackControls(entity)}
                  <div class="controls-spacer"></div>
                  ${this._renderSongActions(entity)}
                  ${this._renderStationSelector(entity)}
                </div>
                ${this._renderVolumeControl()}
              </div>
            `
          : nothing}

        ${showProgress ? this._renderProgressBar(entity) : nothing}

        ${this._renderStationPopup(entity)}
        ${this._renderRatingsPopup(entity)}
        ${this._renderUpcomingPopup()}
      </ha-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pianobar-media-player-card': PianobarMediaPlayerCard;
  }
}
