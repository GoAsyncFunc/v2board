import assert from 'node:assert/strict';
import test from 'node:test';
import { createUiVersion } from '../scripts/build.mjs';

test('User source builds expose a stable timestamped UI version', () => {
    assert.equal(
        createUiVersion(new Date('2026-09-25T08:41:37.000Z')),
        'user-source-20260925.084137',
    );
});

test('User source build versions change when the build timestamp changes', () => {
    const firstVersion = createUiVersion(new Date('2026-09-25T08:41:37.000Z'));
    const secondVersion = createUiVersion(new Date('2026-09-25T08:41:38.000Z'));

    assert.notEqual(firstVersion, secondVersion);
});
