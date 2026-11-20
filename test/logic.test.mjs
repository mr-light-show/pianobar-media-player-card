import test from 'node:test';
import assert from 'node:assert/strict';
import { shouldToastBusy } from '../.test-build/utils/notices.js';

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
