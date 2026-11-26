/** Major component of a version string such as "3.0.0" or "v3.0.0-dev.2"; null when unparseable. */
export function majorOf(v: string | undefined): number | null {
  if (typeof v !== 'string') return null;
  const m = /^\s*v?(\d+)(?:\.|-|\+|$)/i.exec(v);
  return m ? Number(m[1]) : null;
}

/**
 * True when the card and integration major versions differ (warn only, never refuse).
 * A missing integration version means an older integration (true); an unparseable
 * card version ("dev") or integration version ("dev") never warns.
 */
export function versionMismatch(card: string, integration: string | undefined): boolean {
  const cardMajor = majorOf(card);
  if (cardMajor === null) return false;
  if (integration === undefined || integration === null || integration === '') return true;
  const integrationMajor = majorOf(integration);
  if (integrationMajor === null) return false;
  return cardMajor !== integrationMajor;
}

/** Attributes only the pianobar integration sets; used when the entity registry is unavailable. */
const PIANOBAR_ATTRIBUTES = ['supported_actions', 'stations', 'player_connected', 'pandora_connected'];

/**
 * True when the entity belongs to the pianobar integration. Prefers the entity registry
 * platform (`hass.entities`); falls back to pianobar-only attributes so an older
 * integration without `integration_version` is still recognized.
 */
export function isPianobarEntity(
  platform: string | undefined,
  attributes: Record<string, unknown> | undefined
): boolean {
  if (platform) return platform === 'pianobar';
  return PIANOBAR_ATTRIBUTES.some((key) => attributes?.[key] !== undefined);
}
