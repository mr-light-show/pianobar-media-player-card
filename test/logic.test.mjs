import test from 'node:test';
import assert from 'node:assert/strict';
import { isPianobarEntity, majorOf, versionMismatch } from '../.test-build/version-check.js';
import {
  shouldToastBusy,
  isVersionBannerDismissed,
  dismissVersionBanner,
  VERSION_BANNER_KEY,
} from '../.test-build/utils/notices.js';

function memStore() {
  const m = new Map();
  return { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => void m.set(k, v) };
}

test('majorOf parses release and dev tags', () => {
  assert.equal(majorOf('3.0.0'), 3);
  assert.equal(majorOf('v3.0.0-dev.2'), 3);
  assert.equal(majorOf('12'), 12);
  assert.equal(majorOf('dev'), null);
  assert.equal(majorOf(''), null);
  assert.equal(majorOf(undefined), null);
});

test('versionMismatch compares majors only', () => {
  assert.equal(versionMismatch('3.0.0', '3.1.2'), false);
  assert.equal(versionMismatch('3.0.0', '2.7.0'), true);
  assert.equal(versionMismatch('3.0.0', undefined), true);
  assert.equal(versionMismatch('3.0.0', ''), true);
  assert.equal(versionMismatch('3.0.0', 'dev'), false);
  assert.equal(versionMismatch('dev', '3.0.0'), false);
  assert.equal(versionMismatch('dev', undefined), false);
});

test('isPianobarEntity prefers registry platform, else pianobar-only attributes', () => {
  assert.equal(isPianobarEntity('pianobar', {}), true);
  assert.equal(isPianobarEntity('sonos', { supported_actions: [] }), false);
  assert.equal(isPianobarEntity(undefined, { stations: [] }), true);
  assert.equal(isPianobarEntity(undefined, { player_connected: false }), true);
  assert.equal(isPianobarEntity(undefined, { friendly_name: 'TV' }), false);
  assert.equal(isPianobarEntity(undefined, undefined), false);
});

test('shouldToastBusy fires once per busy episode', () => {
  let prev;
  const fired = [];
  for (const busy of [false, true, true, false, true]) {
    fired.push(shouldToastBusy(prev, busy));
    prev = busy;
  }
  assert.deepEqual(fired, [false, true, false, false, true]);
  assert.equal(shouldToastBusy(undefined, true), false);
});

test('version banner dismissal persists per versions pair', () => {
  const s = memStore();
  assert.equal(isVersionBannerDismissed('3.0.0', '2.7.0', s), false);
  dismissVersionBanner('3.0.0', '2.7.0', s);
  assert.equal(isVersionBannerDismissed('3.0.0', '2.7.0', s), true);
  assert.equal(isVersionBannerDismissed('3.0.0', '2.8.0', s), false);
  assert.ok(s.getItem(VERSION_BANNER_KEY));
  dismissVersionBanner('3.0.0', undefined, s);
  assert.equal(isVersionBannerDismissed('3.0.0', undefined, s), true);
});

test('banner storage failures and absence are tolerated', () => {
  const bad = { getItem() { throw new Error('x'); }, setItem() { throw new Error('x'); } };
  assert.equal(isVersionBannerDismissed('3', '2', bad), false);
  dismissVersionBanner('3', '2', bad);
  assert.equal(isVersionBannerDismissed('3', '2', undefined), false);
  dismissVersionBanner('3', '2', undefined);
});
