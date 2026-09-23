import test from 'node:test';
import assert from 'node:assert/strict';
import { createUiVersion } from '../scripts/build.mjs';

test('Admin source build version includes its UTC build timestamp', () => {
    assert.equal(
        createUiVersion(new Date('2026-09-23T08:41:37.000Z')),
        'admin-source-20260923.084137',
    );
});

test('Admin source builds in different seconds have distinguishable versions', () => {
    const firstBuild = createUiVersion(new Date('2026-09-23T08:41:37.000Z'));
    const nextBuild = createUiVersion(new Date('2026-09-23T08:41:38.000Z'));

    assert.notEqual(firstBuild, nextBuild);
});
