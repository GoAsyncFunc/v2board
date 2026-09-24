import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function loadFormValues() {
    const source = await fs.readFile(
        new URL('../src/pages/user/components/userFormValues.ts', import.meta.url),
        'utf8',
    );
    const { code } = await transform(source, { format: 'cjs', loader: 'ts' });
    const module = { exports: {} };

    vm.runInNewContext(code, { module, exports: module.exports });
    return module.exports;
}

test('nullable user form values map to empty input defaults without changing values', async () => {
    const { toInputDefaultValue } = await loadFormValues();

    assert.equal(toInputDefaultValue(null), undefined);
    assert.equal(toInputDefaultValue(undefined), undefined);
    assert.equal(toInputDefaultValue('12.50'), '12.50');
    assert.equal(toInputDefaultValue(12.5), 12.5);
});

test('user editor inputs use explicit null handling instead of type assertions', async () => {
    for (const fileName of ['UserFormFields.tsx', 'UserTrafficFields.tsx', 'UserMoneyFields.tsx']) {
        const source = await fs.readFile(
            new URL(`../src/pages/user/components/${fileName}`, import.meta.url),
            'utf8',
        );

        assert.doesNotMatch(source, /as string \| number \| undefined/);
    }
});

test('user account settings fields stay in a dedicated component', async () => {
    const userForm = await fs.readFile(
        new URL('../src/pages/user/components/UserFormFields.tsx', import.meta.url),
        'utf8',
    );
    const accountSettings = await fs.readFile(
        new URL('../src/pages/user/components/UserAccountSettingsFields.tsx', import.meta.url),
        'utf8',
    );
    assert.match(userForm, /UserAccountSettingsFields/);
    assert.match(accountSettings, /export interface UserAccountSettingsFieldsProps/);
});
