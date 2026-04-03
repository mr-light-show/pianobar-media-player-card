import type { HomeAssistant } from './types';
import en from './translations/en.json';

const STRINGS: Record<string, string> = en as Record<string, string>;

/**
 * Resolve a card UI string. Bundled `en.json` supplies English; add more locale files later.
 * Optionally pass `hass` for future `hass.localize('component.pianobar…')` reuse.
 */
export function cardLocalize(_hass: HomeAssistant | undefined, key: string): string {
  return STRINGS[key] ?? key;
}

/** Replace `{placeholders}` in a localized template string. */
export function cardLocalizeFormat(
  hass: HomeAssistant | undefined,
  key: string,
  values: Record<string, string | number>
): string {
  let s = cardLocalize(hass, key);
  for (const [k, v] of Object.entries(values)) {
    s = s.replaceAll(`{${k}}`, String(v));
  }
  return s;
}
