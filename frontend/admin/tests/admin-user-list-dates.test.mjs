import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';
import { loadDateTimeFormatter } from './helpers/load-date-time.mjs';

const fixedNow = 1700000000000;
class FixedDate extends Date {
    static now() {
        return fixedNow;
    }
}

const moment = (milliseconds) => ({
    format: (pattern) => `${milliseconds}:${pattern}`,
});
const normalize = (value) => JSON.parse(JSON.stringify(value));
const React = {
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
};

async function load(original) {
    const module = { exports: {} };
    const sourcePath = original
        ? './fixtures/pages/admin-user-list-date-display.cjs'
        : '../src/pages/user/components/UserListColumns.tsx';
    const source = await fs.readFile(new URL(sourcePath, import.meta.url), 'utf8');
    const dateTime = original ? null : await loadDateTimeFormatter(moment);

    vm.runInNewContext(
        original ? source : (await transform(source, { format: 'cjs', loader: 'tsx' })).code,
        {
            module,
            exports: module.exports,
            Date: FixedDate,
            require(id) {
                if (id === 'react') return React;
                if (id === 'antd/lib/tag') return 'Tag';
                if (id === 'antd/lib/tooltip') return 'Tooltip';
                if (id.includes('utils/dateTimeFormatter')) return dateTime;
                if (id.includes('UserDisplayColumns')) {
                    return { createUserEmailColumn: () => ({ key: 'email' }) };
                }
                throw new Error(id);
            },
        },
    );

    return original
        ? module.exports(moment)
        : module.exports
              .createUserListColumns([], () => null)
              .reduce((columns, column) => {
                  columns[column.key] = column;
                  return columns;
              }, {});
}

const expirationValues = [
    0,
    null,
    undefined,
    1,
    fixedNow / 1000 - 1,
    fixedNow / 1000,
    fixedNow / 1000 + 1,
    '1700000000',
    'invalid',
];

for (const value of expirationValues) {
    test(`user expiration date preserves value ${String(value)}`, async () => {
        const original = await load(true);
        const columns = await load(false);
        const rendered = columns.expired_at.render(value);

        assert.deepEqual(
            normalize({ color: rendered.props.color, text: rendered.children[0] }),
            normalize(original.expiration(value)),
        );
    });
}

for (const value of [undefined, null, 0, 1, '1700000000', 'invalid']) {
    test(`user creation date preserves value ${String(value)}`, async () => {
        const original = await load(true);
        const columns = await load(false);

        assert.equal(columns.created_at.render(value), original.createdAt(value));
    });
}
