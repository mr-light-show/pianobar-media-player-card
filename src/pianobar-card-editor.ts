import { LitElement, html, css, TemplateResult, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  HomeAssistant,
  PianobarCardConfig,
  LovelaceCardEditor,
} from './types';
import { getModePreset, detectMatchingPreset } from './modes';

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

const MODE_SCHEMA = [
  {
    name: 'mode',
    selector: {
      select: {
        mode: 'dropdown',
        options: [
          { value: 'default', label: 'Default - Standard layout with artwork on right' },
          { value: 'full', label: 'Full - Full-cover artwork background' },
          { value: 'minimal', label: 'Minimal - Compact view with minimal controls' },
          { value: 'tall', label: 'Tall - Vertical layout with artwork on top' },
          { value: 'custom', label: 'Custom - Full control over all options' },
        ],
      },
    },
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

const CUSTOM_APPEARANCE_SCHEMA = [
  {
    name: 'artwork',
    selector: {
      select: {
        mode: 'dropdown',
        options: [
          { value: 'default', label: 'Compact (right side)' },
          { value: 'full-cover', label: 'Full Cover (background)' },
          { value: 'tall', label: 'Tall (artwork on top)' },
        ],
      },
    },
  },
];

const STATION_DISPLAY_SCHEMA = [
  {
    name: 'stationDisplay',
    selector: {
      select: {
        mode: 'dropdown',
        options: [
          { value: 'hidden', label: 'Hidden' },
          { value: 'compact', label: 'Compact (icon only)' },
          { value: 'normal', label: 'Normal (icon + station name)' },
        ],
      },
    },
  },
];

@customElement('pianobar-card-editor')
export class PianobarCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) lovelace?: unknown;

  @state() private _config?: PianobarCardConfig;
  @state() private _activeTab = 'general';

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
  `;

  setConfig(config: PianobarCardConfig): void {
    this._config = config;
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
        const newConfig = {
          type: this._config.type,
          entity: this._config.entity,
          mode: newMode,
          // Only keep volume_entity and name
          ...(this._config.volume_entity && { volume_entity: this._config.volume_entity }),
          ...(this._config.name && { name: this._config.name }),
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

    // Build new config with appearance changes
    const newConfig = { ...this._config, ...detail.value };
    
    // Detect if settings match a preset
    const detectedMode = detectMatchingPreset(newConfig);
    newConfig.mode = detectedMode;
    
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

  private _computeLabel(schema: { name: string }): string {
    const labels: Record<string, string> = {
      entity: 'Entity',
      name: 'Custom Name',
      volume_entity: 'Volume Entity',
      artwork: 'Artwork Style',
      stationDisplay: 'Station Selector',
    };
    return labels[schema.name] || schema.name;
  }

  private _computeHelper(schema: { name: string }): string {
    const helpers: Record<string, string> = {
      entity: 'Select any media player entity',
      name: 'Leave empty to use entity name',
      volume_entity: 'Override volume control to a different media player (e.g., Sonos speaker)',
    };
    return helpers[schema.name] || '';
  }

  private _supportsAnyRating(): boolean {
    if (!this.hass || !this._config?.entity) return false;
    const entity = this.hass.states[this._config.entity];
    const supportedActions = (entity?.attributes?.supported_actions as string[]) || [];
    return (
      supportedActions.includes('love_song') ||
      supportedActions.includes('ban_song') ||
      supportedActions.includes('tired_of_song')
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

      <div class="section-title">Mode</div>
      <ha-form
        .hass=${this.hass}
        .data=${{ mode: this._config?.mode || 'default' }}
        .schema=${MODE_SCHEMA}
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
    
    const dataWithResolvedValues = {
      ...this._config,
      // Always show the effective value (from preset for preset modes)
      artwork: isCustomMode ? (this._config?.artwork ?? preset.artwork) : preset.artwork,
    };

    const stationDisplay = isCustomMode 
      ? (this._config?.stationDisplay ?? preset.stationDisplay)
      : preset.stationDisplay;
    const supportsStations = this._supportsStations();

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${dataWithResolvedValues}
        .schema=${CUSTOM_APPEARANCE_SCHEMA}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._handleAppearanceChange}
      ></ha-form>

      <div class="section-title">Station Selector</div>
      ${supportsStations
        ? html`
            <ha-form
              .hass=${this.hass}
              .data=${{ stationDisplay }}
              .schema=${STATION_DISPLAY_SCHEMA}
              .computeLabel=${this._computeLabel}
              @value-changed=${this._handleAppearanceChange}
            ></ha-form>
          `
        : html`<p class="helper-text">Station selector requires a Pianobar media player entity</p>`}
    `;
  }

  private _handleCheckboxChange(key: string, ev: Event): void {
    const target = ev.target as HTMLInputElement;
    const newConfig = { ...this._config, [key]: target.checked };
    
    // Detect if settings match a preset
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

    // Check if rating actions are supported
    const supportsRating = this._supportsAnyRating();

    return html`
      ${this._renderCheckbox('showPlaybackControls', 'Show playback controls', showPlaybackControls)}
      ${this._renderCheckbox('showPowerButton', 'Show power button', showPowerButton, true, !showPlaybackControls)}
      ${this._renderCheckbox('showSongActions', 'Show song actions (thumbs)', supportsRating ? showSongActions : false, true, !showPlaybackControls || !supportsRating)}

      ${this._renderCheckbox('showProgressBar', 'Show progress bar', showProgressBar)}
      ${this._renderCheckbox('showProgressTime', 'Show progress time', showProgressTime, true, !showProgressBar)}

      ${this._renderCheckbox('showVolumeControl', 'Show volume control', showVolumeControl)}

      ${this._renderCheckbox('showDetails', 'Show details', showDetails)}
      ${this._renderCheckbox('showTitle', 'Show title', showTitle, true, !showDetails)}
      ${this._renderCheckbox('showArtist', 'Show artist', showArtist, true, !showDetails)}
      ${this._renderCheckbox('showAlbum', 'Show album', showAlbum, true, !showDetails)}
      ${this._renderCheckbox('reserveDetailsSpace', 'Reserve space on card', reserveDetailsSpace, true, !showDetails)}
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

  render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    const tabs = [
      { id: 'general', label: 'General' },
      { id: 'appearance', label: 'Appearance' },
      { id: 'controls', label: 'Controls' },
      { id: 'advanced', label: 'Advanced' },
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

        <div class="version-info">
          Build: ${BUILD_VERSION}
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
