import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function loadUserModel(pageSizePreference) {
    const source = await fs.readFile(new URL('../src/models/userModel.ts', import.meta.url), 'utf8');
    const { code } = await transform(source, { format: 'cjs', loader: 'ts' });
    const module = { exports: {} };
    const effects = {
        addFilter() {},
        allDel() {},
        ban() {},
        changeTable() {},
        checkLogin() {},
        delUser() {},
        dumpCSV() {},
        fetch() {},
        filter() {},
        generate() {},
        getUserInfo() {},
        getUserInfoById() {},
        resetSecret() {},
        sendMail() {},
        update() {},
    };
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        require(id) {
            if (id === '../utils/siteHelpers' || id === '@/utils/siteHelpers') {
                return { getPreference: () => pageSizePreference };
            }
            if (id.startsWith('./')) return effects;
            throw new Error(`Unexpected dependency: ${id}`);
        },
    });
    return module.exports.default;
}

test('user model reads page-size preferences as numbers', async (t) => {
    for (const [preference, expected] of [
        [50, 50],
        ['50', 50],
        [0, 10],
        [false, 10],
        ['invalid', 10],
    ]) {
        await t.test(`${String(preference)} -> ${expected}`, async () => {
            const userModel = await loadUserModel(preference);
            assert.equal(userModel.state.pagination.pageSize, expected);
        });
    }
});
