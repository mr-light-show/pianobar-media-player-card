import { CardMode, ArtworkMode, ResolvedConfig, PianobarCardConfig, StationDisplayMode } from './types';

// Preset mode configurations
interface ModePreset {
  artwork: ArtworkMode;
  // Display options
  showDetails: boolean;
  showTitle: boolean;
  showArtist: boolean;
  showAlbum: boolean;
  reserveDetailsSpace: boolean;
  // Control options
  showVolumeControl: boolean;
  showSongActions: boolean;
  showProgressBar: boolean;
  showProgressTime: boolean;
  showPlaybackControls: boolean;
  showPowerButton: boolean;
  stationDisplay: StationDisplayMode;
}

const MODE_PRESETS: Record<CardMode, ModePreset> = {
  default: {
    artwork: 'default',
    showDetails: true,
    showTitle: true,
    showArtist: true,
    showAlbum: true,
    reserveDetailsSpace: true,
    showVolumeControl: true,
    showSongActions: true,
    showProgressBar: true,
    showProgressTime: false,
    showPlaybackControls: true,
    showPowerButton: false,
    stationDisplay: 'hidden',
  },
  full: {
    artwork: 'full-cover',
    showDetails: true,
    showTitle: true,
    showArtist: false,
    showAlbum: false,
    reserveDetailsSpace: true,
    showVolumeControl: true,
    showSongActions: true,
    showProgressBar: true,
    showProgressTime: false,
    showPlaybackControls: true,
    showPowerButton: false,
    stationDisplay: 'hidden',
  },
  minimal: {
    artwork: 'default',
    showDetails: true,
    showTitle: true,
    showArtist: false,
    showAlbum: false,
    reserveDetailsSpace: false,
    showVolumeControl: false,
    showSongActions: true,
    showProgressBar: true,
    showProgressTime: false,
    showPlaybackControls: true,
    showPowerButton: false,
    stationDisplay: 'hidden',
  },
  tall: {
    artwork: 'tall', // Vertical layout with artwork at top
    showDetails: true,
    showTitle: true,
    showArtist: true,
    showAlbum: true,
    reserveDetailsSpace: true,
    showVolumeControl: true,
    showSongActions: true,
    showProgressBar: true,
    showProgressTime: true,
    showPlaybackControls: true,
    showPowerButton: false,
    stationDisplay: 'normal', // Show station pill at bottom
  },
  custom: {
    // Custom mode uses user-provided values, these are fallback defaults
    artwork: 'default',
    showDetails: true,
    showTitle: true,
    showArtist: true,
    showAlbum: true,
    reserveDetailsSpace: true,
    showVolumeControl: true,
    showSongActions: true,
    showProgressBar: true,
    showProgressTime: false,
    showPlaybackControls: true,
    showPowerButton: false,
    stationDisplay: 'hidden',
  },
};

/**
 * Resolve the full configuration from user config and mode presets
 */
export function resolveConfig(config: PianobarCardConfig): ResolvedConfig {
  const mode = config.mode || 'default';
  const preset = MODE_PRESETS[mode];

  if (mode === 'custom') {
    // Custom mode: use user values with fallbacks
    return {
      entity: config.entity,
      mode,
      artwork: config.artwork ?? preset.artwork,
      showDetails: config.showDetails ?? preset.showDetails,
      showTitle: config.showTitle ?? preset.showTitle,
      showArtist: config.showArtist ?? preset.showArtist,
      showAlbum: config.showAlbum ?? preset.showAlbum,
      reserveDetailsSpace: config.reserveDetailsSpace ?? preset.reserveDetailsSpace,
      showVolumeControl: config.showVolumeControl ?? preset.showVolumeControl,
      showSongActions: config.showSongActions ?? preset.showSongActions,
      showProgressBar: config.showProgressBar ?? preset.showProgressBar,
      showProgressTime: config.showProgressTime ?? preset.showProgressTime,
      showPlaybackControls: config.showPlaybackControls ?? preset.showPlaybackControls,
      showPowerButton: config.showPowerButton ?? preset.showPowerButton,
      stationDisplay: config.stationDisplay ?? preset.stationDisplay,
      volume_entity: config.volume_entity,
      name: config.name,
    };
  }

  // Preset modes: use preset values, ignore user overrides (except volume_entity, name)
  return {
    entity: config.entity,
    mode,
    artwork: preset.artwork,
    showDetails: preset.showDetails,
    showTitle: preset.showTitle,
    showArtist: preset.showArtist,
    showAlbum: preset.showAlbum,
    reserveDetailsSpace: preset.reserveDetailsSpace,
    showVolumeControl: preset.showVolumeControl,
    showSongActions: preset.showSongActions,
    showProgressBar: preset.showProgressBar,
    showProgressTime: preset.showProgressTime,
    showPlaybackControls: preset.showPlaybackControls,
    showPowerButton: preset.showPowerButton,
    stationDisplay: preset.stationDisplay,
    volume_entity: config.volume_entity,
    name: config.name,
  };
}

/**
 * Get the display name for a mode
 */
export function getModeName(mode: CardMode): string {
  const names: Record<CardMode, string> = {
    default: 'Default',
    full: 'Full',
    minimal: 'Minimal',
    tall: 'Tall',
    custom: 'Custom',
  };
  return names[mode];
}

/**
 * Get the description for a mode
 */
export function getModeDescription(mode: CardMode): string {
  const descriptions: Record<CardMode, string> = {
    default: 'Standard layout with artwork on right',
    full: 'Full-cover artwork background',
    minimal: 'Compact view with minimal controls',
    tall: 'Vertical layout with artwork on top',
    custom: 'Full control over all options',
  };
  return descriptions[mode];
}

/**
 * Get the preset configuration for a mode
 */
export function getModePreset(mode: CardMode): ModePreset {
  return MODE_PRESETS[mode];
}

/**
 * Detect which preset mode matches the given config settings.
 * Returns the matching preset mode, or 'custom' if no preset matches.
 */
export function detectMatchingPreset(config: Partial<PianobarCardConfig>): CardMode {
  const presetModes: CardMode[] = ['default', 'full', 'minimal', 'tall'];

  for (const mode of presetModes) {
    const preset = MODE_PRESETS[mode];
    if (
      (config.artwork ?? 'default') === preset.artwork &&
      (config.showDetails ?? true) === preset.showDetails &&
      (config.showTitle ?? true) === preset.showTitle &&
      (config.showArtist ?? true) === preset.showArtist &&
      (config.showAlbum ?? true) === preset.showAlbum &&
      (config.reserveDetailsSpace ?? true) === preset.reserveDetailsSpace &&
      (config.showPlaybackControls ?? true) === preset.showPlaybackControls &&
      (config.showVolumeControl ?? true) === preset.showVolumeControl &&
      (config.showSongActions ?? true) === preset.showSongActions &&
      (config.showProgressBar ?? true) === preset.showProgressBar &&
      (config.showPowerButton ?? false) === preset.showPowerButton
    ) {
      return mode;
    }
  }
  return 'custom';
}

