import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';

const script = await fs.readFile(new URL('../scripts/deploy-test.sh', import.meta.url), 'utf8');
const template = await fs.readFile(
    new URL('../../../public/theme/default/dashboard.blade.php', import.meta.url),
    'utf8',
);

test('user deployment publishes versioned static assets with the application', () => {
    assert.match(script, /-C dist app\.js app\.js\.map source-build\.json settings\.js theme/);
    assert.match(script, /remote_archive=\/tmp\/v2board-user-ui-\$stamp\.tar\.gz/);
    assert.match(script, /cp -R \"\$stage\/theme\" \"\$release\//);
    assert.match(script, /assets\/restored-\{stamp\}\/user\/theme\/default\/assets/);
    assert.match(script, /theme\/default\/assets\/antd\.css/);
    assert.match(script, /user HTML does not reference/);
    assert.match(script, /grep -Fq "\/assets\/restored-\$stamp\/user\/\$resource"/);
    assert.match(script, /ui_version=.*source-build\.json/);
    assert.match(script, /"ui_version": "\$ui_version"/);
    assert.match(script, /UI_VERSION=%s/);
    assert.match(script, /rm -rf '\$release'/);
});

test('user Blade entry selects the source build independently from the legacy fallback', () => {
    assert.match(template, /config\('v2board\.user_source_build', false\)/g);
    assert.match(template, /\/user-build\/app\.js/);
    assert.match(template, /\/user-build\/theme\/default\/assets\/antd\.css/);
    assert.match(template, /\/theme\/\{\{\$theme\}\}\/assets\/umi\.js/);
    assert.match(template, /assets_path:\s*'\{\{config\('v2board\.user_source_build'/);
});
