// Home Assistant types
export interface HomeAssistant {
  states: Record<string, HassEntity>;
  services: Record<string, Record<string, object>>;
  callService: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: Record<string, unknown>
  ) => Promise<any>;
  connection: {
    subscribeEvents: (
      callback: (event: unknown) => void,
      eventType: string
    ) => Promise<() => void>;
  };
  language: string;
  config: {
    unit_system: {
      length: string;
      mass: string;
      temperature: string;
      volume: string;
    };
  };
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: HassEntityAttributes;
  last_changed: string;
  last_updated: string;
  context: {
    id: string;
    parent_id: string | null;
    user_id: string | null;
  };
}

export interface HassEntityAttributes {
  friendly_name?: string;
  icon?: string;
  entity_picture?: string;
  media_content_id?: string;
  media_content_type?: string;
  media_title?: string;
  media_artist?: string;
  media_album_name?: string;
  media_image_url?: string;
  media_duration?: number;
  media_position?: number;
  media_position_updated_at?: string;
  volume_level?: number;
  is_volume_muted?: boolean;
  source?: string;
  source_list?: string[];
  // Pianobar-specific attributes
  rating?: number;
  [key: string]: unknown;
}

// Station types
export interface Station {
  id: string;
  name: string;
  isQuickMix?: boolean;
  isQuickMixed?: boolean;
}

// Station info types for seeds and feedback
export interface ArtistSeed {
  seedId: string;
  name: string;
}

export interface SongSeed {
  seedId: string;
  title: string;
  artist: string;
}

export interface StationSeed {
  seedId: string;
  name: string;
}

export interface Feedback {
  feedbackId: string;
  title: string;
  artist: string;
  rating: number; // 1 = love, 0 = ban
}

export interface StationInfo {
  artistSeeds: ArtistSeed[];
  songSeeds: SongSeed[];
  stationSeeds: StationSeed[];
  feedback: Feedback[];
}

// Search result types
export interface SearchResult {
  name?: string;
  title?: string;
  artist?: string;
  musicId: string;
}

export interface SearchCategory {
  name: string;
  results: SearchResult[];
}

export interface SearchResults {
  categories: SearchCategory[];
}

// Genre types
export interface Genre {
  name: string;
  musicId: string;
}

export interface GenreCategory {
  name: string;
  genres: Genre[];
}

export type StationDisplayMode = 'hidden' | 'compact' | 'normal';

// Card configuration types
export type CardMode = 'default' | 'full' | 'minimal' | 'tall' | 'custom';
export type ArtworkMode = 'default' | 'full-cover' | 'tall';

export interface PianobarCardConfig {
  type: string;
  entity: string;
  mode?: CardMode;
  artwork?: ArtworkMode;
  // Display options
  showDetails?: boolean;
  showTitle?: boolean;
  showArtist?: boolean;
  showAlbum?: boolean;
  reserveDetailsSpace?: boolean;
  // Control options
  showVolumeControl?: boolean;
  showSongActions?: boolean;
  showProgressBar?: boolean;
  showProgressTime?: boolean;
  showPlaybackControls?: boolean;
  showPowerButton?: boolean;
  stationDisplay?: StationDisplayMode;
  volume_entity?: string;
  name?: string;
}

// Resolved config with all values filled in
export interface ResolvedConfig {
  entity: string;
  mode: CardMode;
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
  volume_entity?: string;
  name?: string;
}

// Lovelace card element interface
export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: PianobarCardConfig): void;
  getCardSize?(): number;
}

// Lovelace card editor interface
export interface LovelaceCardEditor extends HTMLElement {
  hass?: HomeAssistant;
  lovelace?: unknown;
  setConfig(config: PianobarCardConfig): void;
}

// Custom element window extension
declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
    }>;
  }
}

