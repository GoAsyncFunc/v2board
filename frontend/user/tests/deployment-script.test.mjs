import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';

const script = await fs.readFile(new URL('../scripts/deploy-test.sh', import.meta.url), 'utf8');

test('user deployment publishes versioned static assets with the application', () => {
    assert.match(script, /-C dist app\.js app\.js\.map source-build\.json settings\.js theme/);
    assert.match(script, /cp -R \"\$stage\/theme\" \"\$release\//);
    assert.match(script, /assets\/restored-\{stamp\}\/user\/theme\/default\/assets/);
    assert.match(script, /theme\/default\/assets\/components\.chunk\.css/);
    assert.match(script, /rm -rf '\$release'/);
});
