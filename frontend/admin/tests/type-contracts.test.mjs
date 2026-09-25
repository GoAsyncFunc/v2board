import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const sourceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src');

async function sourceFiles(directory) {
    const files = [];
    for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
        const absolutePath = path.join(directory, entry.name);
        if (entry.isDirectory()) files.push(...(await sourceFiles(absolutePath)));
        else if (/\.tsx?$/.test(entry.name)) files.push(absolutePath);
    }
    return files;
}

test('admin source uses explicit nullable and successful-response contracts', async () => {
    const nonNullAssertions = [];
    const directStatusChecks = [];
    const unsafeCompatibilityAssertions = [];
    for (const file of await sourceFiles(sourceRoot)) {
        const source = await fs.readFile(file, 'utf8');
        const relativePath = path.relative(sourceRoot, file);
        if (
            relativePath !== path.join('types', 'apiContracts.ts') &&
            /response\.code\s*[!=]==?\s*200/.test(source)
        ) {
            directStatusChecks.push(relativePath);
        }
        if (/\bas\s+unknown\s+as\b|\bas\s+never\b/.test(source)) {
            unsafeCompatibilityAssertions.push(relativePath);
        }
        const sourceFile = ts.createSourceFile(
            file,
            source,
            ts.ScriptTarget.Latest,
            true,
            file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
        );
        function visit(node) {
            if (ts.isNonNullExpression(node)) {
                const location = sourceFile.getLineAndCharacterOfPosition(
                    node.getStart(sourceFile),
                );
                nonNullAssertions.push(
                    `${relativePath}:${location.line + 1}:${location.character + 1}`,
                );
            }
            ts.forEachChild(node, visit);
        }
        visit(sourceFile);
    }
    assert.deepEqual(nonNullAssertions, []);
    assert.deepEqual(directStatusChecks, []);
    assert.deepEqual(unsafeCompatibilityAssertions, []);
});

test('server security settings use protocol-specific fields instead of a generic string index', async () => {
    const typeSource = await fs.readFile(
        path.join(sourceRoot, 'types', 'serverContracts.ts'),
        'utf8',
    );
    const componentSource = await fs.readFile(
        path.join(
            sourceRoot,
            'pages',
            'server',
            'manage',
            'editors',
            'Security',
            'TlsSettings.tsx',
        ),
        'utf8',
    );
    const advancedComponentSource = await fs.readFile(
        path.join(
            sourceRoot,
            'pages',
            'server',
            'manage',
            'editors',
            'Security',
            'TlsAdvancedSettings.tsx',
        ),
        'utf8',
    );

    assert.doesNotMatch(
        typeSource,
        /interface (?:NodeTlsSettings|EncryptionSecuritySettings|VmessTlsSettings)\s*{[^}]*\[key:\s*string\]/s,
    );
    for (const contract of ['NodeTlsSettings', 'EncryptionSecuritySettings', 'VmessTlsSettings']) {
        assert.match(typeSource, new RegExp(`interface ${contract}\\b`));
    }
    for (const field of ['cert_mode', 'fingerprint', 'ech', 'mode', 'rtt']) {
        assert.match(typeSource, new RegExp(`\\b${field}\\?`));
    }
    assert.doesNotMatch(componentSource, /settings\.[A-Za-z_][A-Za-z0-9_]*\s+as\s+/);
    assert.match(componentSource, /function inputValue\(/);
    assert.match(advancedComponentSource, /function isEchMode\(/);
});

test('admin business boundary types avoid broad object placeholders', async () => {
    const relativePaths = [
        'types/userContracts.ts',
        'types/monitoringContracts.ts',
        'pages/server/manage/ServerManagePage.tsx',
        'components/common/ContextMenuTable.tsx',
        'pages/server/route/components/RouteActionColumn.ts',
        'pages/server/route/components/ServerRouteColumns.ts',
        'pages/server/group/components/ServerGroupColumns.tsx',
    ];
    for (const relativePath of relativePaths) {
        const source = await fs.readFile(path.join(sourceRoot, relativePath), 'utf8');
        assert.doesNotMatch(source, /:\s*object\b|extends\s+object\b|=\s*object\b/, relativePath);
    }

    const userTypes = await fs.readFile(path.join(sourceRoot, 'types', 'userContracts.ts'), 'utf8');
    const monitoringTypes = await fs.readFile(
        path.join(sourceRoot, 'types', 'monitoringContracts.ts'),
        'utf8',
    );
    const managePage = await fs.readFile(
        path.join(sourceRoot, 'pages', 'server', 'manage', 'ServerManagePage.tsx'),
        'utf8',
    );
    assert.match(userTypes, /invite_user\?: InvitingUserReference \| null/);
    assert.match(monitoringTypes, /interface CoercibleQueueWait/);
    assert.match(managePage, /type ServerProtocolAction = 'copy' \| 'drop' \| 'update'/);
});

test('admin plan model narrows configured price fields and numeric values explicitly', async () => {
    const source = await fs.readFile(path.join(sourceRoot, 'models', 'planModel.ts'), 'utf8');

    assert.match(source, /function isPlanPriceField\(value: string\): value is PlanPriceField/);
    assert.match(source, /Math\.round\(100 \* Number\(price\)\)/);
    assert.match(source, /Number\(price\) \/ 100/);
    assert.doesNotMatch(source, /Object\.keys\(settings\.periodText\) as PlanPriceField\[\]/);
    assert.doesNotMatch(source, /plan\[period\] as number/);
});

test('admin promotion models use explicit numeric and optional CSV buffer contracts', async () => {
    for (const model of ['couponModel.ts', 'giftCardModel.ts']) {
        const source = await fs.readFile(path.join(sourceRoot, 'models', model), 'utf8');

        assert.match(source, /Number\(params\.value\) \* 100/);
        assert.match(source, /Number\((?:coupon|giftcard)\.value\) \/ 100/);
        assert.match(source, /buffer: BlobPart\s*}/);
        assert.match(source, /download(?:Coupon|GiftCard)Csv\(response\.buffer\)/);
        assert.doesNotMatch(source, /value as number|buffer as BlobPart/);
    }
});
