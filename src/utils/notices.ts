/**
 * One-shot toast for the integration's `player_busy` attribute: fire only on a
 * false/unknown → true edge. `prev` is undefined until the first available state,
 * so a card loaded while already busy does not toast.
 */
export function shouldToastBusy(prev: boolean | undefined, busy: boolean): boolean {
  return prev === false && busy;
}
