/**
 * One-shot toast for the integration's `player_busy` attribute: fire only on a
 * false/unknown → true edge. `prev` is undefined until the first available state,
 * so a card loaded while already busy does not toast.
 */
export function shouldToastBusy(prev: boolean | undefined, busy: boolean): boolean {
  return prev === false && busy;
}

export const VERSION_BANNER_KEY = 'pianobar-card-version-banner-dismissed';

type StorageLike = Pick<Storage, 'getItem' | 'setItem'>;

function sessionStore(): StorageLike | undefined {
  try {
    return typeof sessionStorage !== 'undefined' ? sessionStorage : undefined;
  } catch {
    return undefined;
  }
}

/** Whether the user dismissed the version banner for this versions pair this session. */
export function isVersionBannerDismissed(
  cardVersion: string,
  integrationVersion: string | undefined,
  store: StorageLike | undefined = sessionStore()
): boolean {
  try {
    return store?.getItem(VERSION_BANNER_KEY) === `${cardVersion}|${integrationVersion ?? ''}`;
  } catch {
    return false;
  }
}

export function dismissVersionBanner(
  cardVersion: string,
  integrationVersion: string | undefined,
  store: StorageLike | undefined = sessionStore()
): void {
  try {
    store?.setItem(VERSION_BANNER_KEY, `${cardVersion}|${integrationVersion ?? ''}`);
  } catch {
    /* storage unavailable: banner reappears on next render, acceptable */
  }
}
