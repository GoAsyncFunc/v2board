import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

export async function loadDateTimeFormatter(moment) {
    const source = await fs.readFile(
        new URL('../../src/utils/dateTimeFormatter.ts', import.meta.url),
        'utf8',
    );
    const { code } = await transform(source, { format: 'cjs', loader: 'ts' });
    const module = { exports: {} };

    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        require(id) {
            if (id === 'moment' || id.includes('77642f52')) return moment;
            throw new Error(id);
        },
    });

    return module.exports;
}
