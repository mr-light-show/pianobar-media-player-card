import { LitElement, html, css, TemplateResult, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { PropertyValues } from 'lit';
import {
  HomeAssistant,
  PianobarCardConfig,
  LovelaceCardEditor,
} from './types';
import { getModePreset, detectMatchingPreset } from './modes';
import { cardLocalize } from './i18n';

// Injected at build time by rollup
declare const __BUILD_TIMESTAMP__: string;
const BUILD_TIMESTAMP_RAW = typeof __BUILD_TIMESTAMP__ !== 'undefined' ? __BUILD_TIMESTAMP__ : 'dev';

// Format the timestamp in local time
function formatBuildTime(isoString: string): string {
  if (isoString === 'dev') return 'dev';
  try {
    const date = new Date(isoString);
    return date.toLocaleString();
  } catch {
    return isoString;
  }
}
const BUILD_VERSION = formatBuildTime(BUILD_TIMESTAMP_RAW);

// Schema for ha-form - this is the modern HA way to create form fields
const GENERAL_SCHEMA = [
  {
    name: 'entity',
    required: true,
    selector: { entity: { domain: 'media_player' } },
  },
];


const ADVANCED_SCHEMA = [
  {
    name: 'name',
    selector: { text: {} },
  },
  {
    name: 'volume_entity',
    selector: { entity: { domain: 'media_player' } },
  },
];

/** Schema for Tall artwork size (%); only shown when layout is tall. */
const TALL_ARTWORK_SIZE_SCHEMA = [
  {
    name: 'tallArtworkSize',
    selector: { number: { min: 50, max: 100, step: 5 } },
  },
];

@customElement('pianobar-card-editor')
export class PianobarCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) lovelace?: unknown;

  @state() private _config?: PianobarCardConfig;
  @state() private _activeTab = 'general';
  @state() private _supportedActions: string[] = [];
  @state() private _supportsRating = true;
  /** Temporary debug tab: new way (get_services_for_target) vs old way (entity.attributes). */
  @state() private _newWayActions: string[] = [];
  @state() private _newWayError: string | null = null;
  /** When error is "No result in response", this holds a truncated JSON of what we received. */
  @state() private _newWayRawResponseStr: string | null = null;
  @state() private _oldWayActions: string[] = [];
  private _fetchedEntityId: string | null = null;

  static styles = css`
    :host {
      display: block;
    }
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .tabs {
      display: flex;
      border-bottom: 1px solid var(--divider-color);
      margin-bottom: 8px;
    }
    .tab {
      padding: 8px 16px;
      cursor: pointer;
      border: none;
      background: none;
      font-size: 0.875rem;
      color: var(--secondary-text-color);
      border-bottom: 2px solid transparent;
      transition: all 0.2s;
    }
    .tab:hover {
      color: var(--primary-text-color);
    }
    .tab.active {
      color: var(--primary-color);
      border-bottom-color: var(--primary-color);
    }
    .tab-content {
      display: none;
    }
    .tab-content.active {
      display: block;
    }
    .section-title {
      font-weight: 500;
      margin-bottom: 4px;
      margin-top: 8px;
      color: var(--primary-text-color);
      font-size: 0.875rem;
    }
    .helper-text {
      font-size: 0.75rem;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }
    ha-form {
      display: block;
    }
    .version-info {
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid var(--divider-color);
      font-size: 0.7rem;
      color: var(--secondary-text-color);
      opacity: 0.7;
    }
    .options-group {
      margin-bottom: 12px;
    }
    .options-group-title {
      font-size: 0.8rem;
      font-weight: 500;
      margin-bottom: 4px;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .checkbox-row {
      display: flex;
      align-items: center;
      padding: 2px 0;
    }
    .checkbox-row.indent {
      padding-left: 24px;
    }
    .checkbox-row ha-checkbox {
      margin-right: 4px;
    }
    .checkbox-label {
      font-size: 0.875rem;
      color: var(--primary-text-color);
      cursor: pointer;
      flex: 1;
    }
    .checkbox-row.indent .checkbox-label {
      color: var(--secondary-text-color);
    }
    .checkbox-row.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
    .debug-error {
      font-size: 0.75rem;
      color: var(--error-color);
      background: var(--ha-card-background);
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      padding: 8px;
      margin: 4px 0;
      word-break: break-word;
    }
    .debug-list {
      font-size: 0.8rem;
      font-family: var(--code-font-family, monospace);
      color: var(--secondary-text-color);
      margin: 4px 0;
    }
    .debug-raw {
      font-size: 0.7rem;
      font-family: var(--code-font-family, monospace);
      color: var(--secondary-text-color);
      background: var(--ha-card-background);
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      padding: 6px;
      margin: 4px 0;
      word-break: break-all;
    }
  `;

  setConfig(config: PianobarCardConfig): void {
    this._config = config;
    // Reset fetch state so we refetch when entity is set
    if (config.entity !== this._fetchedEntityId) {
      this._fetchedEntityId = null;
    }
  }

  private _updateConfig(key: string, value: unknown): void {
    if (!this._config) return;

    const newConfig = { ...this._config };
    if (value === '' || value === undefined || value === null) {
      delete (newConfig as Record<string, unknown>)[key];
    } else {
      (newConfig as Record<string, unknown>)[key] = value;
    }

    this._config = newConfig;
    this._fireConfigChanged();
  }

  private _fireConfigChanged(): void {
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _valueChanged(ev: CustomEvent): void {
    const detail = ev.detail as { value: Record<string, unknown> };
    if (!detail.value) return;

    // Check if mode is being changed
    if ('mode' in detail.value && this._config) {
      const newMode = detail.value.mode as string;
      
      if (newMode !== 'custom') {
        // Switching to preset mode: clear all preset-controllable fields
        // Prefer values from detail.value so user's selection in this event is not lost
        const entity = (detail.value.entity ?? this._config.entity) as string | undefined;
        const volume_entity = detail.value.volume_entity ?? this._config.volume_entity;
        const name = detail.value.name ?? this._config.name;
        const newConfig = {
          type: this._config.type,
          entity,
          mode: newMode,
          ...(volume_entity && { volume_entity }),
          ...(name && { name }),
        };
        this._config = newConfig as PianobarCardConfig;
        this._fireConfigChanged();
        return;
      }
    }

    // For other changes (or switching to custom mode), update normally
    Object.entries(detail.value).forEach(([key, value]) => {
      this._updateConfig(key, value);
    });
  }

  private _handleAppearanceChange(ev: CustomEvent): void {
    const detail = ev.detail as { value: Record<string, unknown> };
    if (!detail.value || !this._config) return;

    // Get FULLY RESOLVED config (with all preset values applied)
    const currentMode = this._config?.mode || 'default';
    const preset = getModePreset(currentMode);
    const isCustomMode = currentMode === 'custom';
    
    // Build complete config with all current effective values
    const effectiveTallSize =
      currentMode === 'tall'
        ? (this._config?.tallArtworkSize ?? 80)
        : isCustomMode
          ? (this._config?.tallArtworkSize ?? 80)
          : 80;
    const resolvedConfig = {
      ...this._config,
      // Fill in all preset values if not in custom mode
      artwork: isCustomMode ? (this._config?.artwork ?? preset.artwork) : preset.artwork,
      showDetails: isCustomMode ? (this._config?.showDetails ?? preset.showDetails) : preset.showDetails,
      showTitle: isCustomMode ? (this._config?.showTitle ?? preset.showTitle) : preset.showTitle,
      showArtist: isCustomMode ? (this._config?.showArtist ?? preset.showArtist) : preset.showArtist,
      showAlbum: isCustomMode ? (this._config?.showAlbum ?? preset.showAlbum) : preset.showAlbum,
      reserveDetailsSpace: isCustomMode ? (this._config?.reserveDetailsSpace ?? preset.reserveDetailsSpace) : preset.reserveDetailsSpace,
      showPlaybackControls: isCustomMode ? (this._config?.showPlaybackControls ?? preset.showPlaybackControls) : preset.showPlaybackControls,
      showPowerButton: isCustomMode ? (this._config?.showPowerButton ?? preset.showPowerButton) : preset.showPowerButton,
      showVolumeControl: isCustomMode ? (this._config?.showVolumeControl ?? preset.showVolumeControl) : preset.showVolumeControl,
      showSongActions: isCustomMode ? (this._config?.showSongActions ?? preset.showSongActions) : preset.showSongActions,
      showProgressBar: isCustomMode ? (this._config?.showProgressBar ?? preset.showProgressBar) : preset.showProgressBar,
      showProgressTime: isCustomMode ? (this._config?.showProgressTime ?? preset.showProgressTime) : preset.showProgressTime,
      showAccountSwitch: this._config?.showAccountSwitch !== false,
      stationDisplay: isCustomMode ? (this._config?.stationDisplay ?? preset.stationDisplay) : preset.stationDisplay,
      tallArtworkSize: effectiveTallSize,
    };
    
    // Now apply the appearance changes to the COMPLETE config
    const newConfig = { ...resolvedConfig, ...detail.value };
    
    // Clamp tallArtworkSize if present
    if (typeof newConfig.tallArtworkSize === 'number') {
      newConfig.tallArtworkSize = Math.min(100, Math.max(50, newConfig.tallArtworkSize));
    }
    
    // Detect if settings match a preset (tallArtworkSize must be 80 to match tall)
    const detectedMode = detectMatchingPreset(newConfig);
    newConfig.mode = detectedMode;
    
    // When we match tall preset, omit tallArtworkSize from saved config to keep YAML minimal
    if (detectedMode === 'tall' && (newConfig as Record<string, unknown>).tallArtworkSize === 80) {
      delete (newConfig as Record<string, unknown>).tallArtworkSize;
    }
    
    this._config = newConfig as PianobarCardConfig;
    this._fireConfigChanged();
  }

  private _handleControlsChange(ev: CustomEvent): void {
    const detail = ev.detail as { value: Record<string, unknown> };
    if (!detail.value || !this._config) return;

    // Build new config with control changes
    const newConfig = { ...this._config, ...detail.value };
    
    // Detect if settings match a preset
    const detectedMode = detectMatchingPreset(newConfig);
    newConfig.mode = detectedMode;
    
    this._config = newConfig as PianobarCardConfig;
    this._fireConfigChanged();
  }

  private _setActiveTab(tab: string): void {
    this._activeTab = tab;
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    const entityId = this._config?.entity;
    if (!entityId || !this.hass || entityId === this._fetchedEntityId) return;
    this._fetchedEntityId = entityId;
    this._fetchSupportedActions(entityId).then((actions) => {
      if (this._config?.entity !== entityId) return;
      this._supportedActions = actions;
      const supportsRating = this._supportsAnyRatingFromList(actions);
      this._supportsRating = supportsRating;
      const newConfig = { ...this._config };
      (newConfig as Record<string, unknown>).supported_actions = actions.length > 0 ? actions : undefined;
      if (!supportsRating) {
        newConfig.showSongActions = false;
      }
      this._config = newConfig as PianobarCardConfig;
      this._fireConfigChanged();
    });
  }

  private _modeSchema() {
    const L = (k: string) => cardLocalize(this.hass, k);
    return [
      {
        name: 'mode',
        selector: {
          select: {
            mode: 'dropdown',
            options: [
              { value: 'default', label: L('editor.mode_default') },
              { value: 'minimal', label: L('editor.mode_minimal') },
              { value: 'full', label: L('editor.mode_full') },
              { value: 'tall', label: L('editor.mode_tall') },
              { value: 'custom', label: L('editor.mode_custom') },
            ],
          },
        },
      },
    ];
  }

  private _customAppearanceSchema() {
    const L = (k: string) => cardLocalize(this.hass, k);
    return [
      {
        name: 'artwork',
        selector: {
          select: {
            mode: 'dropdown',
            options: [
              { value: 'default', label: L('editor.artwork_default') },
              { value: 'full-cover', label: L('editor.artwork_full_cover') },
              { value: 'tall', label: L('editor.artwork_tall') },
            ],
          },
        },
      },
    ];
  }

  private _stationDisplaySchema() {
    const L = (k: string) => cardLocalize(this.hass, k);
    return [
      {
        name: 'stationDisplay',
        selector: {
          select: {
            mode: 'dropdown',
            options: [
              { value: 'hidden', label: L('editor.station_hidden') },
              { value: 'compact', label: L('editor.station_compact') },
              { value: 'normal', label: L('editor.station_normal') },
            ],
          },
        },
      },
    ];
  }

  private _computeLabel = (schema: { name: string }): string => {
    const keyMap: Record<string, string> = {
      entity: 'editor.label_entity',
      name: 'editor.label_custom_name',
      volume_entity: 'editor.label_volume_entity',
      artwork: 'editor.label_artwork',
      tallArtworkSize: 'editor.label_tall_artwork_size',
      stationDisplay: 'editor.label_station_display',
    };
    const k = keyMap[schema.name];
    return k ? cardLocalize(this.hass, k) : schema.name;
  };

  private _computeHelper = (schema: { name: string }): string => {
    const keyMap: Record<string, string> = {
      entity: 'editor.helper_entity',
      name: 'editor.helper_name',
      volume_entity: 'editor.helper_volume_entity',
    };
    const k = keyMap[schema.name];
    return k ? cardLocalize(this.hass, k) : '';
  };

  /** Fetch supported service names for the given entity (get_services_for_target or entity.attributes fallback). Populates debug state for the temporary debug tab. */
  private async _fetchSupportedActions(entityId: string): Promise<string[]> {
    const entity = this.hass?.states[entityId];
    const fallback = (entity?.attributes?.supported_actions as string[] | undefined) || [];
    this._oldWayActions = fallback;

    if (!this.hass?.connection?.sendMessagePromise) {
      this._newWayActions = [];
      this._newWayError = 'No sendMessagePromise';
      this._newWayRawResponseStr = null;
      return fallback;
    }
    try {
      // HA WebSocket API: type "get_services_for_target", target.entity_id; backend returns result as set of "domain.service" strings
      const response = await this.hass.connection.sendMessagePromise({
        type: 'get_services_for_target',
        target: { entity_id: [entityId] },
        expand_group: true,
      }) as unknown;
      // Promise may resolve with full message { result: [...] } or with unwrapped result (array directly)
      const raw = Array.isArray(response)
        ? response
        : (response && typeof response === 'object' && (response as { result?: unknown }).result) as string[] | undefined;
      if (!Array.isArray(raw)) {
        this._newWayActions = [];
        this._newWayError = 'No result in response';
        try {
          this._newWayRawResponseStr = JSON.stringify(response).slice(0, 600);
        } catch {
          this._newWayRawResponseStr = String(response).slice(0, 600);
        }
        return fallback;
      }
      this._newWayRawResponseStr = null;
      // HA returns e.g. ["pianobar.love_song", "pianobar.ban_song", ...]; strip domain prefix
      const derived = raw
        .filter((s) => typeof s === 'string' && s.startsWith('pianobar.'))
        .map((s) => (s as string).slice('pianobar.'.length));
      this._newWayActions = derived;
      this._newWayError = null;
      return derived.length > 0 ? derived : fallback;
    } catch (e) {
      const errMsg = (e as Error)?.message ?? (e as { code?: string })?.code ?? String(e);
      this._newWayActions = [];
      this._newWayError = errMsg;
      this._newWayRawResponseStr = null;
      return fallback;
    }
  }

  private _supportsAnyRatingFromList(actions: string[]): boolean {
    return (
      actions.includes('love_song') ||
      actions.includes('ban_song') ||
      actions.includes('tired_of_song')
    );
  }

  private _renderGeneralTab(): TemplateResult {
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${GENERAL_SCHEMA}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <div class="section-title">${cardLocalize(this.hass, 'editor.section_mode')}</div>
      <ha-form
        .hass=${this.hass}
        .data=${{ mode: this._config?.mode || 'default' }}
        .schema=${this._modeSchema()}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _renderAppearanceTab(): TemplateResult {
    // Get the resolved values (from preset or custom)
    const currentMode = this._config?.mode || 'default';
    const preset = getModePreset(currentMode);
    const isCustomMode = currentMode === 'custom';
    const effectiveArtwork = isCustomMode ? (this._config?.artwork ?? preset.artwork) : preset.artwork;
    const showTallSize = currentMode === 'tall' || (isCustomMode && effectiveArtwork === 'tall');
    const effectiveTallSize =
      currentMode === 'tall'
        ? (this._config?.tallArtworkSize ?? 80)
        : isCustomMode
          ? (this._config?.tallArtworkSize ?? 80)
          : 80;
    
    const appearanceSchema = showTallSize
      ? [...this._customAppearanceSchema(), ...TALL_ARTWORK_SIZE_SCHEMA]
      : this._customAppearanceSchema();
    
    const dataWithResolvedValues = {
      ...this._config,
      artwork: effectiveArtwork,
      ...(showTallSize ? { tallArtworkSize: effectiveTallSize } : {}),
    };

    const stationDisplay = isCustomMode 
      ? (this._config?.stationDisplay ?? preset.stationDisplay)
      : preset.stationDisplay;
    const supportsStations = this._supportsStations();

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${dataWithResolvedValues}
        .schema=${appearanceSchema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._handleAppearanceChange}
      ></ha-form>

      <div class="section-title">${cardLocalize(this.hass, 'editor.section_station_selector')}</div>
      ${supportsStations
        ? html`
            <ha-form
              .hass=${this.hass}
              .data=${{ stationDisplay }}
              .schema=${this._stationDisplaySchema()}
              .computeLabel=${this._computeLabel}
              @value-changed=${this._handleAppearanceChange}
            ></ha-form>
          `
        : html`<p class="helper-text">${cardLocalize(this.hass, 'editor.helper_station_pianobar')}</p>`}
    `;
  }

  private _handleCheckboxChange(key: string, ev: Event): void {
    const target = ev.target as HTMLInputElement;
    
    // Get FULLY RESOLVED config (with all preset values applied)
    const currentMode = this._config?.mode || 'default';
    const preset = getModePreset(currentMode);
    const isCustomMode = currentMode === 'custom';
    
    // Build complete config with all current effective values
    const resolvedConfig = {
      ...this._config,
      // Fill in all preset values if not in custom mode
      artwork: isCustomMode ? (this._config?.artwork ?? preset.artwork) : preset.artwork,
      showDetails: isCustomMode ? (this._config?.showDetails ?? preset.showDetails) : preset.showDetails,
      showTitle: isCustomMode ? (this._config?.showTitle ?? preset.showTitle) : preset.showTitle,
      showArtist: isCustomMode ? (this._config?.showArtist ?? preset.showArtist) : preset.showArtist,
      showAlbum: isCustomMode ? (this._config?.showAlbum ?? preset.showAlbum) : preset.showAlbum,
      reserveDetailsSpace: isCustomMode ? (this._config?.reserveDetailsSpace ?? preset.reserveDetailsSpace) : preset.reserveDetailsSpace,
      showPlaybackControls: isCustomMode ? (this._config?.showPlaybackControls ?? preset.showPlaybackControls) : preset.showPlaybackControls,
      showPowerButton: isCustomMode ? (this._config?.showPowerButton ?? preset.showPowerButton) : preset.showPowerButton,
      showVolumeControl: isCustomMode ? (this._config?.showVolumeControl ?? preset.showVolumeControl) : preset.showVolumeControl,
      showSongActions: isCustomMode ? (this._config?.showSongActions ?? preset.showSongActions) : preset.showSongActions,
      showProgressBar: isCustomMode ? (this._config?.showProgressBar ?? preset.showProgressBar) : preset.showProgressBar,
      showProgressTime: isCustomMode ? (this._config?.showProgressTime ?? preset.showProgressTime) : preset.showProgressTime,
      showAccountSwitch: this._config?.showAccountSwitch !== false,
      stationDisplay: isCustomMode ? (this._config?.stationDisplay ?? preset.stationDisplay) : preset.stationDisplay,
    };
    
    // Now apply the checkbox change to the COMPLETE config
    const newConfig = { ...resolvedConfig, [key]: target.checked };
    
    // Detect if settings match a preset (usually won't - will be 'custom')
    const detectedMode = detectMatchingPreset(newConfig);
    newConfig.mode = detectedMode;
    
    this._config = newConfig as PianobarCardConfig;
    this._fireConfigChanged();
  }

  private _renderCheckbox(key: string, label: string, checked: boolean, indent = false, disabled = false): TemplateResult {
    return html`
      <div class="checkbox-row ${indent ? 'indent' : ''} ${disabled ? 'disabled' : ''}">
        <ha-checkbox
          .checked=${checked}
          .disabled=${disabled}
          @change=${(ev: Event) => this._handleCheckboxChange(key, ev)}
        ></ha-checkbox>
        <span 
          class="checkbox-label"
          @click=${() => {
            if (disabled) return;
            const checkbox = this.shadowRoot?.querySelector(`ha-checkbox[data-key="${key}"]`) as HTMLInputElement;
            if (checkbox) checkbox.click();
          }}
        >${label}</span>
      </div>
    `;
  }

  private _supportsStations(): boolean {
    if (!this.hass || !this._config?.entity) return false;
    const entity = this.hass.states[this._config.entity];
    // Check if the entity has stations attribute (Pianobar integration)
    const stations = entity?.attributes?.stations as unknown[];
    return Array.isArray(stations) && stations.length > 0;
  }

  private _supportsMultipleAccounts(): boolean {
    if (!this.hass || !this._config?.entity) return false;
    const entity = this.hass.states[this._config.entity];
    const accounts = entity?.attributes?.accounts as unknown[];
    return Array.isArray(accounts) && accounts.length > 1;
  }

  private _renderControlsTab(): TemplateResult {
    // Get the resolved values (from preset or custom)
    const currentMode = this._config?.mode || 'default';
    const preset = getModePreset(currentMode);

    // For preset modes, ONLY show preset values
    // For custom mode, show config values with preset fallback
    const isCustomMode = currentMode === 'custom';

    const showPlaybackControls = isCustomMode 
      ? (this._config?.showPlaybackControls ?? preset.showPlaybackControls)
      : preset.showPlaybackControls;
    const showPowerButton = isCustomMode
      ? (this._config?.showPowerButton ?? preset.showPowerButton)
      : preset.showPowerButton;
    const showSongActions = isCustomMode
      ? (this._config?.showSongActions ?? preset.showSongActions)
      : preset.showSongActions;
    const showProgressBar = isCustomMode
      ? (this._config?.showProgressBar ?? preset.showProgressBar)
      : preset.showProgressBar;
    const showProgressTime = isCustomMode
      ? (this._config?.showProgressTime ?? preset.showProgressTime)
      : preset.showProgressTime;
    const showVolumeControl = isCustomMode
      ? (this._config?.showVolumeControl ?? preset.showVolumeControl)
      : preset.showVolumeControl;
    const showDetails = isCustomMode
      ? (this._config?.showDetails ?? preset.showDetails)
      : preset.showDetails;
    const showTitle = isCustomMode
      ? (this._config?.showTitle ?? preset.showTitle)
      : preset.showTitle;
    const showArtist = isCustomMode
      ? (this._config?.showArtist ?? preset.showArtist)
      : preset.showArtist;
    const showAlbum = isCustomMode
      ? (this._config?.showAlbum ?? preset.showAlbum)
      : preset.showAlbum;
    const reserveDetailsSpace = isCustomMode
      ? (this._config?.reserveDetailsSpace ?? preset.reserveDetailsSpace)
      : preset.reserveDetailsSpace;
    const showAccountSwitch = this._config?.showAccountSwitch !== false;

    // Use fetched supported_actions: if entity has no rating support, force off and disable checkbox
    const supportsRating = this._supportsRating;
    const supportsMultiAccount = this._supportsMultipleAccounts();

    const L = (k: string) => cardLocalize(this.hass, k);
    return html`
      ${this._renderCheckbox('showPlaybackControls', L('editor.checkbox_show_playback'), showPlaybackControls)}
      ${this._renderCheckbox('showPowerButton', L('editor.checkbox_show_power'), showPowerButton, true, !showPlaybackControls)}
      ${this._renderCheckbox('showSongActions', L('editor.checkbox_show_thumbs'), supportsRating ? showSongActions : false, true, !showPlaybackControls || !supportsRating)}

      ${this._renderCheckbox('showProgressBar', L('editor.checkbox_show_progress'), showProgressBar)}
      ${this._renderCheckbox('showProgressTime', L('editor.checkbox_show_progress_time'), showProgressTime, true, !showProgressBar)}

      ${this._renderCheckbox('showVolumeControl', L('editor.checkbox_show_volume'), showVolumeControl)}

      ${supportsMultiAccount
        ? this._renderCheckbox(
            'showAccountSwitch',
            L('editor.checkbox_show_account_switch'),
            showAccountSwitch
          )
        : html`<p class="helper-text">${L('editor.helper_switch_account_multi')}</p>`}

      ${this._renderCheckbox('showDetails', L('editor.checkbox_show_details'), showDetails)}
      ${this._renderCheckbox('showTitle', L('editor.checkbox_show_title'), showTitle, true, !showDetails)}
      ${this._renderCheckbox('showArtist', L('editor.checkbox_show_artist'), showArtist, true, !showDetails)}
      ${this._renderCheckbox('showAlbum', L('editor.checkbox_show_album'), showAlbum, true, !showDetails)}
      ${this._renderCheckbox('reserveDetailsSpace', L('editor.checkbox_reserve_space'), reserveDetailsSpace, true, !showDetails)}
    `;
  }

  private _renderAdvancedTab(): TemplateResult {
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${ADVANCED_SCHEMA}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  /** Temporary debug tab: compare get_services_for_target (new way) vs entity.attributes (old way). */
  private _renderDebugActionsTab(): TemplateResult {
    const L = (k: string) => cardLocalize(this.hass, k);
    return html`
      <p class="helper-text">${L('editor.debug_help')}</p>
      <div class="section-title">${L('editor.debug_new_way')}</div>
      ${this._newWayError
        ? html`<div class="debug-error">${L('editor.debug_error')}: ${this._newWayError}</div>
      ${this._newWayRawResponseStr
        ? html`<div class="debug-raw">${L('editor.debug_raw')}: ${this._newWayRawResponseStr}${this._newWayRawResponseStr.length >= 600 ? '…' : ''}</div>`
        : nothing}`
        : nothing}
      <div class="debug-list">
        ${this._newWayActions.length > 0
          ? this._newWayActions.join(', ')
          : L('editor.debug_none')}
      </div>
      <div class="section-title">${L('editor.debug_old_way')}</div>
      <div class="debug-list">
        ${this._oldWayActions.length > 0
          ? this._oldWayActions.join(', ')
          : L('editor.debug_none')}
      </div>
    `;
  }

  render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    const L = (k: string) => cardLocalize(this.hass, k);
    const tabs = [
      { id: 'general', label: L('editor.tab_general') },
      { id: 'appearance', label: L('editor.tab_appearance') },
      { id: 'controls', label: L('editor.tab_controls') },
      { id: 'advanced', label: L('editor.tab_advanced') },
      // { id: 'debug-actions', label: 'Supported actions (debug)' },
    ];

    return html`
      <div class="card-config">
        <div class="tabs">
          ${tabs.map(
            (tab) => html`
              <button
                class="tab ${this._activeTab === tab.id ? 'active' : ''}"
                @click=${() => this._setActiveTab(tab.id)}
                type="button"
              >
                ${tab.label}
              </button>
            `
          )}
        </div>

        <div class="tab-content ${this._activeTab === 'general' ? 'active' : ''}">
          ${this._renderGeneralTab()}
        </div>
        <div class="tab-content ${this._activeTab === 'appearance' ? 'active' : ''}">
          ${this._renderAppearanceTab()}
        </div>
        <div class="tab-content ${this._activeTab === 'controls' ? 'active' : ''}">
          ${this._renderControlsTab()}
        </div>
        <div class="tab-content ${this._activeTab === 'advanced' ? 'active' : ''}">
          ${this._renderAdvancedTab()}
        </div>
        ${false /* Debug tab: set to true and uncomment tab entry to re-enable */
          ? html`<div class="tab-content ${this._activeTab === 'debug-actions' ? 'active' : ''}">${this._renderDebugActionsTab()}</div>`
          : nothing}

        <div class="version-info">
          ${cardLocalize(this.hass, 'editor.build')}: ${BUILD_VERSION}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pianobar-card-editor': PianobarCardEditor;
  }
}
