import assert from 'node:assert/strict';
import vm from 'node:vm';
import test from 'node:test';
import { build } from 'esbuild';

const result = await build({
    absWorkingDir: new URL('../', import.meta.url).pathname,
    entryPoints: ['src/pages/server/manage/editors/serverJsonEditorValues.ts'],
    bundle: true,
    write: false,
    platform: 'node',
    format: 'cjs',
    logLevel: 'silent',
});
const module = { exports: {} };
vm.runInNewContext(result.outputFiles[0].text, { module, exports: module.exports });
const { formatServerJsonEditorValue, formatServerJsonStateValue, prepareServerJsonRequestValue } =
    module.exports;

test('server JSON editor formatting preserves strings and pretty-prints objects', () => {
    assert.equal(formatServerJsonEditorValue('already formatted'), 'already formatted');
    assert.equal(formatServerJsonEditorValue(null), '');
    assert.equal(
        formatServerJsonEditorValue({ enabled: true, nested: { port: 443 } }),
        '{\n  "enabled": true,\n  "nested": {\n    "port": 443\n  }\n}',
    );
});

test('server JSON editor state formatting preserves null and undefined values', () => {
    assert.equal(formatServerJsonStateValue(null), null);
    assert.equal(formatServerJsonStateValue(undefined), undefined);
    assert.equal(formatServerJsonStateValue('text'), 'text');
    assert.equal(formatServerJsonStateValue({ path: '/' }), '{\n  "path": "/"\n}');
});

test('server JSON request preparation parses text and preserves object values', () => {
    const objectValue = { path: '/', secure: true };

    assert.equal(
        JSON.stringify(prepareServerJsonRequestValue('{"path":"/","secure":true}')),
        JSON.stringify(objectValue),
    );
    assert.equal(
        JSON.stringify(prepareServerJsonRequestValue(objectValue)),
        JSON.stringify(objectValue),
    );
    assert.equal(prepareServerJsonRequestValue(null), null);
    assert.throws(
        () => prepareServerJsonRequestValue('{invalid json}'),
        (error) => {
            assert.equal(error.name, 'SyntaxError');
            return true;
        },
    );
});
