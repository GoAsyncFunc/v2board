import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

async function collectSourceFiles(directory) {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
        const entryPath = new URL(`${entry.name}${entry.isDirectory() ? '/' : ''}`, directory);
        if (entry.isDirectory()) {
            files.push(...(await collectSourceFiles(entryPath)));
        } else {
            files.push(entryPath);
        }
    }
    return files;
}

test('admin application runtime uses typed source modules outside vendor', async () => {
    const typedRuntimePaths = [
        '../src/main.ts',
        '../src/app/bootstrap.tsx',
        '../src/app/history.ts',
        '../src/app/historyFactory.ts',
        '../src/app/store.tsx',
        '../src/app/dvaConfig.ts',
        '../src/app/navigation.ts',
        '../src/app/requestPresentation.ts',
        '../src/app/rootRuntime.tsx',
        '../src/runtime/dvaApplication.tsx',
        '../src/runtime/loadingPlugin.ts',
        '../src/runtime/pluginRuntime.ts',
        '../src/runtime/routerBindings.tsx',
        '../src/runtime/routeRenderer.tsx',
        '../src/services/fetchResponse.ts',
        '../src/services/request.ts',
        '../src/services/download.ts',
        '../src/routes/index.ts',
        '../src/routes/types.ts',
        '../src/types/api.ts',
        '../src/types/dva.ts',
        '../src/types/dvaCore.d.ts',
        '../src/utils/clipboard.ts',
    ];
    for (const relativePath of typedRuntimePaths) {
        const stat = await fs.stat(new URL(relativePath, import.meta.url));
        assert.equal(stat.isFile(), true, `${relativePath} should be a file`);
    }

    const removedPaths = [
        '../src/main.js',
        '../src/app/bootstrap.js',
        '../src/app/history.js',
        '../src/app/store.js',
        '../src/runtime/loadingPlugin.js',
        '../src/runtime/pluginRuntime.js',
        '../src/runtime/routerBindings.js',
        '../src/runtime/routeRenderer.js',
        '../src/services/request.js',
        '../src/services/request.d.ts',
        '../src/services/download.js',
        '../src/app/routes.js',
        '../src/app/routes.ts',
        '../src/app/moduleInterop.js',
        '../src/vendor/appDvaConfig.js',
        '../src/vendor/appRuntime.js',
        '../src/vendor/dva.js',
        '../src/vendor/reactRedux.js',
        '../src/vendor/rootRuntime.js',
        '../src/vendor/routerHistory.js',
        '../src/vendor/routerHistory.d.ts',
        '../src/types/legacyPackages.d.ts',
        '../src/types/copyToClipboard.d.ts',
    ];
    for (const relativePath of removedPaths) {
        await assert.rejects(fs.access(new URL(relativePath, import.meta.url)));
    }
});

test('admin route definitions live in the dedicated routes directory', async () => {
    const routeSource = await fs.readFile(
        new URL('../src/routes/index.ts', import.meta.url),
        'utf8',
    );
    const routeTypeSource = await fs.readFile(
        new URL('../src/routes/types.ts', import.meta.url),
        'utf8',
    );
    assert.match(routeSource, /const adminRoutes: AdminRouteConfig\[\]/);
    assert.match(routeSource, /path: '\/dashboard'/);
    assert.match(routeSource, /path: '\/ticket\/:ticket_id'/);
    assert.match(routeTypeSource, /export interface AdminRouteConfig/);
    await assert.rejects(fs.access(new URL('../src/app/routes.ts', import.meta.url)));
});

test('admin configuration and browser helpers use typed source modules outside vendor', async () => {
    const typedSourcePaths = [
        '../src/config/adminSettings.ts',
        '../src/config/siteSettings.ts',
        '../src/utils/siteHelpers.ts',
    ];
    for (const relativePath of typedSourcePaths) {
        const stat = await fs.stat(new URL(relativePath, import.meta.url));
        assert.equal(stat.isFile(), true, `${relativePath} should be a file`);
    }

    const removedPaths = [
        '../src/vendor/adminSettings.js',
        '../src/vendor/adminSettings.d.ts',
        '../src/vendor/clipboard.js',
        '../src/vendor/dateTime.js',
        '../src/vendor/notification.js',
        '../src/vendor/siteHelpers.js',
        '../src/vendor/siteHelpers.d.ts',
        '../src/vendor/siteSettings.js',
        '../src/vendor/siteSettings.d.ts',
        '../src/vendor/ui.js',
    ];
    for (const relativePath of removedPaths) {
        await assert.rejects(fs.access(new URL(relativePath, import.meta.url)));
    }
});

test('admin source no longer contains a vendor compatibility directory', async () => {
    const typedStylePath = '../src/styles/ticketDetail.ts';
    const stat = await fs.stat(new URL(typedStylePath, import.meta.url));
    assert.equal(stat.isFile(), true, `${typedStylePath} should be a file`);
    await assert.rejects(fs.access(new URL('../src/vendor', import.meta.url)));
});

test('admin production source has no compiler-generated module or style identifiers', async () => {
    const sourceDirectory = new URL('../src/', import.meta.url);
    const sourceFiles = await collectSourceFiles(sourceDirectory);
    const sourceText = [];
    for (const file of sourceFiles) {
        assert.match(file.pathname, /\.(?:ts|tsx|d\.ts)$/);
        const text = await fs.readFile(file, 'utf8');
        sourceText.push(`${file.pathname}\n${text}`);
        assert.doesNotMatch(text, /(?:from|require\()\s*['"][^'"]+\.(?:js|jsx)['"]/);
        assert.doesNotMatch(text, /(?:vendor\/modules|webpackJsonp|moduleId|interopDefault)/);
        assert.doesNotMatch(text, /(?:className|class)\s*=?.*___[A-Za-z0-9_-]{4,}/);
    }
    assert.doesNotMatch(sourceText.join('\n'), /\b(?:var|let|const)\s+[rioaslc](?:\s*,|\s*=)/);
});

test('server security editors are organized as named source modules', async () => {
    const compatibilitySource = await fs.readFile(
        new URL('../src/pages/server/manage/_Editors/ServerSecuritySettings.tsx', import.meta.url),
        'utf8',
    );
    const tlsSource = await fs.readFile(
        new URL('../src/pages/server/manage/_Editors/Security/TlsSettings.tsx', import.meta.url),
        'utf8',
    );
    const tlsAdvancedSource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/_Editors/Security/TlsAdvancedSettings.tsx',
            import.meta.url,
        ),
        'utf8',
    );
    const tlsCertificateSource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/_Editors/Security/TlsCertificateSettings.tsx',
            import.meta.url,
        ),
        'utf8',
    );
    const tlsRealitySource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/_Editors/Security/TlsRealitySettings.tsx',
            import.meta.url,
        ),
        'utf8',
    );
    const encryptionSource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/_Editors/Security/EncryptionSettings.tsx',
            import.meta.url,
        ),
        'utf8',
    );
    assert.match(compatibilitySource, /export \{ TlsSettings \} from '\.\/Security\/TlsSettings'/);
    assert.match(
        compatibilitySource,
        /export \{ EncryptionSettings \} from '\.\/Security\/EncryptionSettings'/,
    );
    assert.match(tlsSource, /export class TlsSettings/);
    assert.match(tlsSource, /<TlsAdvancedSettings/);
    assert.match(tlsAdvancedSource, /export function TlsAdvancedSettings/);
    assert.match(tlsSource, /<TlsCertificateSettings/);
    assert.match(tlsSource, /<TlsRealitySettings/);
    assert.match(tlsCertificateSource, /export function TlsCertificateSettings/);
    assert.match(tlsRealitySource, /export function TlsRealitySettings/);
    assert.match(encryptionSource, /export class EncryptionSettings/);
    assert.doesNotMatch(compatibilitySource, /class (?:TlsSettings|EncryptionSettings)/);
});

test('Trojan transport settings live in a focused protocol module', async () => {
    const editorSource = await fs.readFile(
        new URL('../src/pages/server/manage/_Editors/TrojanEditor.tsx', import.meta.url),
        'utf8',
    );
    const networkSource = await fs.readFile(
        new URL('../src/pages/server/manage/_Editors/Trojan/NetworkSettings.tsx', import.meta.url),
        'utf8',
    );
    const generalFieldsSource = await fs.readFile(
        new URL('../src/pages/server/manage/_Editors/Trojan/GeneralFields.tsx', import.meta.url),
        'utf8',
    );
    const relationshipFieldsSource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/_Editors/Trojan/RelationshipFields.tsx',
            import.meta.url,
        ),
        'utf8',
    );
    assert.match(
        editorSource,
        /import \{ TrojanNetworkSettings \} from '\.\/Trojan\/NetworkSettings'/,
    );
    assert.match(editorSource, /<TrojanNetworkSettings/);
    assert.match(networkSource, /export function TrojanNetworkSettings/);
    assert.match(editorSource, /<TrojanGeneralFields/);
    assert.match(editorSource, /<TrojanRelationshipFields/);
    assert.match(generalFieldsSource, /export function TrojanGeneralFields/);
    assert.match(relationshipFieldsSource, /export function TrojanRelationshipFields/);
    assert.doesNotMatch(editorSource, /PermissionGroupEditor|父节点说明/);
    assert.doesNotMatch(editorSource, /<JsonEditor/);
});

test('Hysteria obfuscation settings live in a focused protocol module', async () => {
    const editorSource = await fs.readFile(
        new URL('../src/pages/server/manage/_Editors/HysteriaEditor.tsx', import.meta.url),
        'utf8',
    );
    const obfuscationSource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/_Editors/Hysteria/ObfuscationSettings.tsx',
            import.meta.url,
        ),
        'utf8',
    );
    const relationshipSource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/_Editors/Hysteria/RelationshipFields.tsx',
            import.meta.url,
        ),
        'utf8',
    );
    const generalFieldsSource = await fs.readFile(
        new URL('../src/pages/server/manage/_Editors/Hysteria/GeneralFields.tsx', import.meta.url),
        'utf8',
    );
    assert.match(
        editorSource,
        /import \{ HysteriaObfuscationSettings \} from '\.\/Hysteria\/ObfuscationSettings'/,
    );
    assert.match(editorSource, /<HysteriaObfuscationSettings/);
    assert.match(obfuscationSource, /export function HysteriaObfuscationSettings/);
    assert.match(editorSource, /<HysteriaRelationshipFields/);
    assert.match(editorSource, /<HysteriaGeneralFields/);
    assert.match(generalFieldsSource, /export function HysteriaGeneralFields/);
    assert.match(relationshipSource, /export function HysteriaRelationshipFields/);
    assert.doesNotMatch(editorSource, /混淆方式obfs/);
});

test('AnyTLS padding configuration lives in a focused protocol module', async () => {
    const editorSource = await fs.readFile(
        new URL('../src/pages/server/manage/_Editors/AnyTlsEditor.tsx', import.meta.url),
        'utf8',
    );
    const paddingSource = await fs.readFile(
        new URL('../src/pages/server/manage/_Editors/AnyTls/PaddingScheme.tsx', import.meta.url),
        'utf8',
    );
    const generalFieldsSource = await fs.readFile(
        new URL('../src/pages/server/manage/_Editors/AnyTls/GeneralFields.tsx', import.meta.url),
        'utf8',
    );
    const relationshipFieldsSource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/_Editors/AnyTls/RelationshipFields.tsx',
            import.meta.url,
        ),
        'utf8',
    );
    assert.match(editorSource, /import \{ AnyTlsPaddingScheme \} from '\.\/AnyTls\/PaddingScheme'/);
    assert.match(editorSource, /<AnyTlsPaddingScheme/);
    assert.match(paddingSource, /export const DEFAULT_PADDING_SCHEME/);
    assert.match(paddingSource, /export function AnyTlsPaddingScheme/);
    assert.match(editorSource, /<AnyTlsGeneralFields/);
    assert.match(editorSource, /<AnyTlsRelationshipFields/);
    assert.match(generalFieldsSource, /export function AnyTlsGeneralFields/);
    assert.match(relationshipFieldsSource, /export function AnyTlsRelationshipFields/);
    assert.doesNotMatch(editorSource, /<JsonEditor/);
});

test('Shadowsocks security settings live in a focused protocol module', async () => {
    const editorSource = await fs.readFile(
        new URL('../src/pages/server/manage/_Editors/ShadowsocksEditor.tsx', import.meta.url),
        'utf8',
    );
    const securitySource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/_Editors/Shadowsocks/SecuritySettings.tsx',
            import.meta.url,
        ),
        'utf8',
    );
    const generalFieldsSource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/_Editors/Shadowsocks/GeneralFields.tsx',
            import.meta.url,
        ),
        'utf8',
    );
    const relationshipFieldsSource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/_Editors/Shadowsocks/RelationshipFields.tsx',
            import.meta.url,
        ),
        'utf8',
    );
    assert.match(
        editorSource,
        /import \{ ShadowsocksSecuritySettings \} from '\.\/Shadowsocks\/SecuritySettings'/,
    );
    assert.match(editorSource, /<ShadowsocksSecuritySettings/);
    assert.match(securitySource, /export const SHADOWSOCKS_CIPHERS/);
    assert.match(securitySource, /export function ShadowsocksSecuritySettings/);
    assert.match(editorSource, /<ShadowsocksGeneralFields/);
    assert.match(editorSource, /<ShadowsocksRelationshipFields/);
    assert.match(generalFieldsSource, /export function ShadowsocksGeneralFields/);
    assert.match(relationshipFieldsSource, /export function ShadowsocksRelationshipFields/);
    assert.doesNotMatch(editorSource, /加密算法|混淆/);
});

test('Tuic editor fields live in focused protocol modules', async () => {
    const editorSource = await fs.readFile(
        new URL('../src/pages/server/manage/_Editors/TuicEditor.tsx', import.meta.url),
        'utf8',
    );
    const transportSource = await fs.readFile(
        new URL('../src/pages/server/manage/_Editors/Tuic/TransportSettings.tsx', import.meta.url),
        'utf8',
    );
    const generalFieldsSource = await fs.readFile(
        new URL('../src/pages/server/manage/_Editors/Tuic/GeneralFields.tsx', import.meta.url),
        'utf8',
    );
    const relationshipFieldsSource = await fs.readFile(
        new URL('../src/pages/server/manage/_Editors/Tuic/RelationshipFields.tsx', import.meta.url),
        'utf8',
    );
    assert.match(
        editorSource,
        /import \{ TuicTransportSettings \} from '\.\/Tuic\/TransportSettings'/,
    );
    assert.match(editorSource, /<TuicTransportSettings/);
    assert.match(transportSource, /export function TuicTransportSettings/);
    assert.match(editorSource, /<TuicGeneralFields/);
    assert.match(editorSource, /<TuicRelationshipFields/);
    assert.match(generalFieldsSource, /export function TuicGeneralFields/);
    assert.match(relationshipFieldsSource, /export function TuicRelationshipFields/);
    assert.doesNotMatch(editorSource, /<label>禁用SNI|<label>拥塞控制算法/);
});

test('admin model composition uses named business effects instead of module aliases', async () => {
    const userModel = await fs.readFile(new URL('../src/models/user.ts', import.meta.url), 'utf8');
    const orderModel = await fs.readFile(
        new URL('../src/models/order.ts', import.meta.url),
        'utf8',
    );
    const orderMutations = await fs.readFile(
        new URL('../src/models/orderMutationEffects.ts', import.meta.url),
        'utf8',
    );

    for (const source of [userModel, orderModel]) {
        assert.doesNotMatch(source, /import \* as /);
        assert.doesNotMatch(source, /\bexports\./);
    }
    for (const effect of ['update', 'paid', 'cancel', 'assign']) {
        assert.match(orderMutations, new RegExp(`export function\\* ${effect}\\b`));
    }
    assert.doesNotMatch(orderModel, /\bpost\(|window\.settings/);

    const modelDirectory = new URL('../src/models/', import.meta.url);
    const directModels = [
        { file: 'administratorAuthentication', namespace: 'auth' },
        ...[
            'config',
            'coupon',
            'giftcard',
            'knowledge',
            'layout',
            'notice',
            'order',
            'passport',
            'payment',
            'plan',
            'serverGroup',
            'serverManage',
            'serverRoute',
            'system',
            'theme',
            'ticket',
            'user',
        ].map((namespace) => ({ file: namespace, namespace })),
        { file: 'dashboardStatistics', namespace: 'stat' },
    ];
    for (const { file, namespace } of directModels) {
        const source = await fs.readFile(new URL(`${file}.ts`, modelDirectory), 'utf8');
        assert.match(source, new RegExp(`export default\\s*{\\s*namespace: ['"]${namespace}['"]`));
        assert.doesNotMatch(source, /export default\s*{\s*name:/);
    }

    const protocolModelNamespaces = [
        'serverAnyTLS',
        'serverHysteria',
        'serverShadowsocks',
        'serverTrojan',
        'serverTuic',
        'serverV2node',
        'serverVless',
        'serverVmess',
    ];
    for (const namespace of protocolModelNamespaces) {
        const source = await fs.readFile(new URL(`${namespace}.ts`, modelDirectory), 'utf8');
        assert.match(source, new RegExp(`namespace: ['"]${namespace}['"]`));
        assert.doesNotMatch(source, /\bname:\s*['"]/);
    }

    const protocolFactory = await fs.readFile(
        new URL('createServerProtocolModel.ts', modelDirectory),
        'utf8',
    );
    assert.match(protocolFactory, /interface ServerProtocolModelOptions\s*{\s*namespace: string;/);
    assert.match(protocolFactory, /return\s*{\s*namespace,/);
    assert.doesNotMatch(protocolFactory, /\bname:\s*string/);

    const store = await fs.readFile(new URL('../src/app/store.tsx', import.meta.url), 'utf8');
    assert.match(store, /model\.namespace !== registeredNamespace/);
    assert.match(store, /appInstance\?\.model\(model\)/);
    assert.doesNotMatch(store, /model\(\{ namespace, \.\.\.model \}\)/);
});

test('admin scripts exclude one-time reverse-engineering extractors', async () => {
    const scriptNames = await fs.readdir(new URL('../scripts/', import.meta.url));
    assert.deepEqual(
        scriptNames.filter((name) => name.startsWith('extract-')),
        [],
    );
});

test('admin application runtime is implemented as typed TSX components', async () => {
    const runtimeSource = await fs.readFile(
        new URL('../src/runtime/dvaApplication.tsx', import.meta.url),
        'utf8',
    );
    const tsconfig = JSON.parse(
        await fs.readFile(new URL('../tsconfig.json', import.meta.url), 'utf8'),
    );
    const packageJson = JSON.parse(
        await fs.readFile(new URL('../package.json', import.meta.url), 'utf8'),
    );
    assert.match(runtimeSource, /function createApplicationProvider/);
    assert.match(runtimeSource, /<ApplicationProvider \/>/);
    assert.doesNotMatch(runtimeSource, /React\.createElement/);
    assert.equal(tsconfig.compilerOptions.allowJs, false);
    assert.deepEqual(
        Object.fromEntries(
            ['@types/markdown-it', '@types/react-loadable', '@types/react-router-dom'].map(
                (name) => [name, packageJson.devDependencies[name]],
            ),
        ),
        {
            '@types/markdown-it': '10.0.3',
            '@types/react-loadable': '5.5.11',
            '@types/react-router-dom': '5.3.3',
        },
    );
});

test('admin DVA runtime uses named contracts instead of broad object placeholders', async () => {
    const contractPaths = [
        '../src/types/store.ts',
        '../src/types/dva.ts',
        '../src/types/dvaCore.d.ts',
        '../src/runtime/dvaApplication.tsx',
        '../src/runtime/loadingPlugin.ts',
        '../src/app/store.tsx',
    ];
    for (const relativePath of contractPaths) {
        const source = await fs.readFile(new URL(relativePath, import.meta.url), 'utf8');
        assert.doesNotMatch(source, /:\s*object\b|\bobject\[\]/, relativePath);
    }

    const storeTypes = await fs.readFile(new URL('../src/types/store.ts', import.meta.url), 'utf8');
    const dvaTypes = await fs.readFile(new URL('../src/types/dva.ts', import.meta.url), 'utf8');
    const effectTypes = await fs.readFile(
        new URL('../src/types/effects.ts', import.meta.url),
        'utf8',
    );
    const loadingRuntime = await fs.readFile(
        new URL('../src/runtime/loadingPlugin.ts', import.meta.url),
        'utf8',
    );
    assert.match(storeTypes, /Action extends AdminAction/);
    assert.match(dvaTypes, /export interface DvaPlugin/);
    assert.match(dvaTypes, /export type DvaEffectEnhancer/);
    assert.doesNotMatch(dvaTypes, /DvaHook|DvaReducer/);
    assert.match(dvaTypes, /setupMiddlewares\(middlewares: Middleware\[\]\)/);
    assert.match(effectTypes, /Effect \| Promise<RequestEffectResult>/);
    assert.doesNotMatch(effectTypes, /EffectInstruction = object/);
    assert.doesNotMatch(loadingRuntime, /effectContext|Iterator<unknown>/);
});

test('admin plugin runtime separates callable hooks from route and configuration values', async () => {
    const pluginRuntime = await fs.readFile(
        new URL('../src/runtime/pluginRuntime.ts', import.meta.url),
        'utf8',
    );
    const routeRuntime = await fs.readFile(
        new URL('../src/runtime/routeRenderer.tsx', import.meta.url),
        'utf8',
    );
    const bootstrap = await fs.readFile(
        new URL('../src/app/bootstrap.tsx', import.meta.url),
        'utf8',
    );
    assert.match(pluginRuntime, /export type PluginCallback/);
    assert.match(pluginRuntime, /export interface PluginConfiguration/);
    assert.doesNotMatch(pluginRuntime, /PluginValue\s*=\s*object/);
    assert.match(routeRuntime, /Partial<AdminRootState>/);
    assert.doesNotMatch(routeRuntime, /Record<string, PluginValue>/);
    assert.match(bootstrap, /apply<React\.ReactElement>/);
    assert.match(bootstrap, /compose<\(\) => Promise<void> \| void>/);
});

test('admin business contracts do not depend on rendering components', async () => {
    const typesDirectory = new URL('../src/types/', import.meta.url);
    const typeNames = (await fs.readdir(typesDirectory)).filter((name) => name.endsWith('.ts'));
    assert.ok(typeNames.includes('filter.ts'));
    for (const typeName of typeNames) {
        const source = await fs.readFile(new URL(typeName, typesDirectory), 'utf8');
        assert.doesNotMatch(
            source,
            /from ['"]\.\.\/(components|pages|layouts)\//,
            `${typeName} depends on the rendering layer`,
        );
    }

    const modelsDirectory = new URL('../src/models/', import.meta.url);
    const modelNames = (await fs.readdir(modelsDirectory)).filter((name) => name.endsWith('.ts'));
    for (const modelName of modelNames) {
        const source = await fs.readFile(new URL(modelName, modelsDirectory), 'utf8');
        assert.doesNotMatch(
            source,
            /from ['"]\.\.\/components\//,
            `${modelName} depends on a component`,
        );
        assert.doesNotMatch(
            source,
            /from ['"]antd\/lib\/(?:message|notification|modal)['"]/,
            `${modelName} imports a rendering notification`,
        );
    }

    const contractSources = {
        'filter.ts': ['FilterItem', 'FilterField'],
        'knowledge.ts': ['KnowledgeRecord'],
        'monitoring.ts': ['QueueWorkload', 'DisplayScalar'],
        'notice.ts': ['NoticeRecord'],
        'order.ts': ['OrderDetailRecord'],
        'payment.ts': ['PaymentRecord'],
        'promotion.ts': ['CouponRecord', 'GiftcardRecord'],
        'ticket.ts': ['TicketRecord', 'TicketMessage'],
    };
    for (const [typeName, contracts] of Object.entries(contractSources)) {
        const source = await fs.readFile(new URL(typeName, typesDirectory), 'utf8');
        for (const contract of contracts)
            assert.match(source, new RegExp(`export (?:interface|type) ${contract}\\b`));
    }
});

test('admin request transport does not depend on the rendering library', async () => {
    const requestSource = await fs.readFile(
        new URL('../src/services/request.ts', import.meta.url),
        'utf8',
    );
    const headerSource = await fs.readFile(
        new URL('../src/layouts/Header/index.tsx', import.meta.url),
        'utf8',
    );
    const presentationSource = await fs.readFile(
        new URL('../src/app/requestPresentation.ts', import.meta.url),
        'utf8',
    );
    assert.doesNotMatch(requestSource, /from ['"]antd\//);
    assert.doesNotMatch(headerSource, /import ['"]\.\.\/services\/request['"]/);
    assert.match(presentationSource, /setRequestFailurePresenter/);
    assert.match(presentationSource, /from ['"]antd\/lib\/notification['"]/);
});

test('admin models depend on API contracts separately from request transport', async () => {
    const apiSource = await fs.readFile(new URL('../src/types/api.ts', import.meta.url), 'utf8');
    const requestSource = await fs.readFile(
        new URL('../src/services/request.ts', import.meta.url),
        'utf8',
    );
    assert.match(apiSource, /export interface ApiResponse/);
    assert.match(apiSource, /export interface FormRecord/);
    assert.match(apiSource, /export function isSuccessfulResponse/);
    assert.doesNotMatch(requestSource, /export interface ApiResponse/);
    assert.doesNotMatch(requestSource, /export type FormValue/);

    const modelsDirectory = new URL('../src/models/', import.meta.url);
    const modelNames = (await fs.readdir(modelsDirectory)).filter((name) => name.endsWith('.ts'));
    for (const modelName of modelNames) {
        const source = await fs.readFile(new URL(modelName, modelsDirectory), 'utf8');
        assert.doesNotMatch(
            source,
            /import\s*\{[^}]*\b(?:ApiResponse|FormRecord|FormValue|JsonValue|isSuccessfulResponse)\b[^}]*\}\s*from ['"]\.\.\/services\/request['"]/s,
            `${modelName} imports API contracts from request transport`,
        );
    }
});

test('admin root state names every registered business model', async () => {
    const storeTypes = await fs.readFile(new URL('../src/types/store.ts', import.meta.url), 'utf8');
    const rootRuntime = await fs.readFile(
        new URL('../src/app/rootRuntime.tsx', import.meta.url),
        'utf8',
    );
    assert.match(storeTypes, /export interface AdminRootState/);
    for (const model of [
        'auth',
        'config',
        'coupon',
        'giftcard',
        'knowledge',
        'layout',
        'notice',
        'order',
        'passport',
        'payment',
        'plan',
        'serverAnyTLS',
        'serverGroup',
        'serverHysteria',
        'serverManage',
        'serverRoute',
        'serverShadowsocks',
        'serverTrojan',
        'serverTuic',
        'serverV2node',
        'serverVless',
        'serverVmess',
        'stat',
        'system',
        'theme',
        'ticket',
        'user',
    ])
        assert.match(storeTypes, new RegExp(`\\b${model}:`));
    assert.doesNotMatch(storeTypes, /AdminRootState = Record<string, object>/);
    assert.match(rootRuntime, /Partial<AdminRootState>/);
});

test('admin pages select from the canonical root state', async () => {
    const pagesDirectory = new URL('../src/pages/', import.meta.url);
    const domainEntries = await fs.readdir(pagesDirectory, { withFileTypes: true });
    const expectedDomains = [
        'config',
        'coupon',
        'dashboard',
        'giftcard',
        'knowledge',
        'login',
        'notice',
        'order',
        'plan',
        'queue',
        'server',
        'ticket',
        'user',
    ];
    assert.deepEqual(
        domainEntries
            .filter((entry) => entry.isDirectory())
            .map((entry) => entry.name)
            .sort(),
        expectedDomains,
    );
    assert.deepEqual(
        domainEntries
            .filter((entry) => entry.isFile() && entry.name.endsWith('.tsx'))
            .map((entry) => entry.name),
        ['index.tsx'],
    );

    for (const domain of expectedDomains) {
        const domainDirectory = new URL(`${domain}/`, pagesDirectory);
        const files = await fs.readdir(domainDirectory, { withFileTypes: true });
        if (!['config', 'server'].includes(domain)) {
            assert.ok(
                files.some((entry) => entry.name === 'index.tsx'),
                `${domain} should expose an index page`,
            );
        }
        const sourceFiles = [];
        async function collect(directory, prefix = '') {
            for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
                const relative = `${prefix}${entry.name}`;
                if (entry.isDirectory())
                    await collect(new URL(`${entry.name}/`, directory), `${relative}/`);
                else if (entry.name.endsWith('.tsx')) sourceFiles.push(relative);
            }
        }
        await collect(domainDirectory);
        for (const relativePageName of sourceFiles) {
            const source = await fs.readFile(new URL(relativePageName, domainDirectory), 'utf8');
            assert.doesNotMatch(
                source,
                /interface\s+\w*RootState\b/,
                `${domain}/${relativePageName} declares a duplicate root state`,
            );
            if (source.includes('connect(')) {
                assert.match(
                    source,
                    /connect\(\(state:\s*AdminRootState\)/,
                    `${domain}/${relativePageName} must select from AdminRootState`,
                );
            }
        }
    }

    assert.ok((await fs.readdir(new URL('config/', pagesDirectory))).includes('payment'));
    assert.ok((await fs.readdir(new URL('config/', pagesDirectory))).includes('system'));
    assert.ok((await fs.readdir(new URL('config/', pagesDirectory))).includes('theme'));
    const paymentDirectory = new URL('config/payment/', pagesDirectory);
    assert.ok((await fs.readdir(paymentDirectory)).includes('components'));
    const paymentComponentsDirectory = new URL('components/', paymentDirectory);
    assert.ok(
        (await fs.readdir(paymentComponentsDirectory)).includes('PaymentList.tsx'),
    );
    assert.ok(
        (await fs.readdir(paymentComponentsDirectory)).includes('PaymentEditor.tsx'),
    );
    assert.ok(
        (await fs.readdir(paymentComponentsDirectory)).includes('PaymentDisplayColumns.ts'),
    );
    assert.ok(
        (await fs.readdir(paymentComponentsDirectory)).includes('PaymentNotifyColumn.tsx'),
    );
    const themeDirectory = new URL('config/theme/', pagesDirectory);
    assert.ok((await fs.readdir(themeDirectory)).includes('components'));
    assert.ok(
        (await fs.readdir(new URL('components/', themeDirectory))).includes(
            'ThemeConfigEditor.tsx',
        ),
    );
    const systemDirectory = new URL('config/system/', pagesDirectory);
    assert.ok((await fs.readdir(systemDirectory)).includes('index.tsx'));
    assert.ok((await fs.readdir(systemDirectory)).includes('components'));
    const systemComponentsDirectory = new URL('components/', systemDirectory);
    for (const component of [
        'AppConfigTab.tsx',
        'ConfigRow.tsx',
        'DepositConfigTab.tsx',
        'EmailConfigTab.tsx',
        'FrontendConfigTab.tsx',
        'InviteConfigTab.tsx',
        'MailTestResult.tsx',
        'SafeConfigTab.tsx',
        'ServerConfigTab.tsx',
        'SiteConfigTab.tsx',
        'SubscribeConfigTab.tsx',
        'TelegramConfigTab.tsx',
        'TicketConfigTab.tsx',
    ]) {
        assert.ok(
            (await fs.readdir(systemComponentsDirectory)).includes(component),
            `system components should include ${component}`,
        );
    }
    assert.ok((await fs.readdir(new URL('server/', pagesDirectory))).includes('group'));
    assert.ok((await fs.readdir(new URL('server/', pagesDirectory))).includes('manage'));
    assert.ok((await fs.readdir(new URL('server/', pagesDirectory))).includes('route'));
    const serverGroupDirectory = new URL('server/group/', pagesDirectory);
    assert.ok((await fs.readdir(serverGroupDirectory)).includes('components'));
    const serverGroupComponentsDirectory = new URL('components/', serverGroupDirectory);
    assert.ok(
        (await fs.readdir(serverGroupComponentsDirectory)).includes('ServerGroupList.tsx'),
    );
    assert.ok(
        (await fs.readdir(serverGroupComponentsDirectory)).includes('ServerGroupColumns.tsx'),
    );
    const serverRouteDirectory = new URL('server/route/', pagesDirectory);
    assert.ok((await fs.readdir(serverRouteDirectory)).includes('components'));
    const serverRouteComponentsDirectory = new URL('components/', serverRouteDirectory);
    for (const component of [
        'ServerRouteList.tsx',
        'ServerRouteColumns.ts',
        'RouteActionColumn.ts',
        'RouteEditor.tsx',
        'RouteActionField.tsx',
        'RouteBasicFields.tsx',
        'RouteMatchField.tsx',
    ]) {
        assert.ok(
            (await fs.readdir(serverRouteComponentsDirectory)).includes(component),
            `server route components should include ${component}`,
        );
    }
    const knowledgeDirectory = new URL('knowledge/', pagesDirectory);
    assert.ok((await fs.readdir(knowledgeDirectory)).includes('index.tsx'));
    assert.ok((await fs.readdir(knowledgeDirectory)).includes('components'));
    const knowledgeComponentsDirectory = new URL('components/', knowledgeDirectory);
    assert.ok((await fs.readdir(knowledgeComponentsDirectory)).includes('KnowledgeList.tsx'));
    assert.ok((await fs.readdir(knowledgeComponentsDirectory)).includes('KnowledgeColumns.ts'));
    assert.ok((await fs.readdir(knowledgeComponentsDirectory)).includes('KnowledgeEditor.tsx'));
    const couponDirectory = new URL('coupon/', pagesDirectory);
    assert.ok((await fs.readdir(couponDirectory)).includes('index.tsx'));
    assert.ok((await fs.readdir(couponDirectory)).includes('components'));
    const couponComponentsDirectory = new URL('components/', couponDirectory);
    assert.ok((await fs.readdir(couponComponentsDirectory)).includes('CouponList.tsx'));
    assert.ok((await fs.readdir(couponComponentsDirectory)).includes('CouponColumns.tsx'));
    assert.ok((await fs.readdir(couponComponentsDirectory)).includes('CouponEditor.tsx'));
    const giftcardDirectory = new URL('giftcard/', pagesDirectory);
    assert.ok((await fs.readdir(giftcardDirectory)).includes('index.tsx'));
    assert.ok((await fs.readdir(giftcardDirectory)).includes('components'));
    const giftcardComponentsDirectory = new URL('components/', giftcardDirectory);
    assert.ok((await fs.readdir(giftcardComponentsDirectory)).includes('GiftcardList.tsx'));
    assert.ok((await fs.readdir(giftcardComponentsDirectory)).includes('GiftcardColumns.tsx'));
    assert.ok((await fs.readdir(giftcardComponentsDirectory)).includes('GiftcardEditor.tsx'));
    const dashboardDirectory = new URL('dashboard/', pagesDirectory);
    assert.ok((await fs.readdir(dashboardDirectory)).includes('index.tsx'));
    assert.ok((await fs.readdir(dashboardDirectory)).includes('components'));
    const dashboardComponentsDirectory = new URL('components/', dashboardDirectory);
    for (const component of [
        'DashboardNavigation.tsx',
        'DashboardOverview.tsx',
        'DashboardServerRank.tsx',
    ]) {
        assert.ok(
            (await fs.readdir(dashboardComponentsDirectory)).includes(component),
            `dashboard components should include ${component}`,
        );
    }
    const planDirectory = new URL('plan/', pagesDirectory);
    assert.ok((await fs.readdir(planDirectory)).includes('index.tsx'));
    assert.ok((await fs.readdir(planDirectory)).includes('components'));
    assert.ok((await fs.readdir(new URL('components/', planDirectory))).includes('PlanList.tsx'));
    assert.ok((await fs.readdir(new URL('components/', planDirectory))).includes('PlanGroupColumn.tsx'));
    assert.ok((await fs.readdir(new URL('components/', planDirectory))).includes('PlanPriceColumns.ts'));
    assert.ok(
        (await fs.readdir(new URL('components/', planDirectory))).includes('PlanResourceColumns.tsx'),
    );
    assert.ok((await fs.readdir(new URL('components/', planDirectory))).includes('PlanEditor.tsx'));
    const orderDirectory = new URL('order/', pagesDirectory);
    assert.ok((await fs.readdir(orderDirectory)).includes('index.tsx'));
    assert.ok((await fs.readdir(orderDirectory)).includes('components'));
    assert.ok(
        (await fs.readdir(new URL('components/', orderDirectory))).includes('OrderFilterDrawer.tsx'),
    );
    assert.ok((await fs.readdir(new URL('components/', orderDirectory))).includes('OrderList.tsx'));
    assert.ok(
        (await fs.readdir(new URL('components/', orderDirectory))).includes('OrderColumns.tsx'),
    );
    assert.ok(
        (await fs.readdir(new URL('components/', orderDirectory))).includes('OrderListColumns.tsx'),
    );
    assert.ok(
        (await fs.readdir(new URL('components/', orderDirectory))).includes('OrderDetailModal.tsx'),
    );
    assert.ok(
        (await fs.readdir(new URL('components/', orderDirectory))).includes('OrderDetailBody.tsx'),
    );
    const userDirectory = new URL('user/', pagesDirectory);
    assert.ok((await fs.readdir(userDirectory)).includes('index.tsx'));
    assert.ok((await fs.readdir(userDirectory)).includes('components'));
    const userComponentsDirectory = new URL('components/', userDirectory);
    for (const component of [
        'FormGroup.tsx',
        'SendMailEditor.tsx',
        'UserDisplayColumns.tsx',
        'UserEditor.tsx',
        'UserFilterDrawer.tsx',
        'UserFormFields.tsx',
        'UserGenerator.tsx',
        'UserList.tsx',
        'UserListActions.tsx',
        'UserListColumns.tsx',
        'UserMoneyFields.tsx',
        'UserToolbar.tsx',
        'UserTrafficFields.tsx',
    ]) {
        assert.ok(
            (await fs.readdir(userComponentsDirectory)).includes(component),
            `user components should include ${component}`,
        );
    }
    const noticeDirectory = new URL('notice/', pagesDirectory);
    assert.ok((await fs.readdir(noticeDirectory)).includes('index.tsx'));
    assert.ok((await fs.readdir(noticeDirectory)).includes('components'));
    const noticeComponentsDirectory = new URL('components/', noticeDirectory);
    assert.ok((await fs.readdir(noticeComponentsDirectory)).includes('NoticeList.tsx'));
    assert.ok((await fs.readdir(noticeComponentsDirectory)).includes('NoticeColumns.ts'));
    assert.ok((await fs.readdir(noticeComponentsDirectory)).includes('NoticeEditor.tsx'));
    assert.ok((await fs.readdir(new URL('ticket/', pagesDirectory))).includes('[id].tsx'));
    const ticketDirectory = new URL('ticket/', pagesDirectory);
    assert.ok((await fs.readdir(ticketDirectory)).includes('components'));
    const ticketComponentsDirectory = new URL('components/', ticketDirectory);
    assert.ok((await fs.readdir(ticketComponentsDirectory)).includes('TicketList.tsx'));
    assert.ok((await fs.readdir(ticketComponentsDirectory)).includes('TicketColumns.ts'));
    await assert.rejects(fs.access(new URL('../src/pages/content/Knowledge.tsx', import.meta.url)));
    await assert.rejects(
        fs.access(new URL('../src/components/content/NoticeDisplayColumns.ts', import.meta.url)),
    );
    await assert.rejects(
        fs.access(new URL('../src/components/promotion/CouponDisplayColumns.tsx', import.meta.url)),
    );
    await assert.rejects(
        fs.access(
            new URL('../src/components/promotion/GiftcardDisplayColumns.tsx', import.meta.url),
        ),
    );
    await assert.rejects(
        fs.access(new URL('../src/components/commerce/PlanGroupColumn.tsx', import.meta.url)),
    );
    await assert.rejects(
        fs.access(new URL('../src/components/commerce/PlanPriceColumns.ts', import.meta.url)),
    );
    await assert.rejects(
        fs.access(new URL('../src/components/commerce/PlanResourceColumns.tsx', import.meta.url)),
    );
    await assert.rejects(
        fs.access(new URL('../src/components/commerce/OrderDisplayColumns.tsx', import.meta.url)),
    );
    await assert.rejects(
        fs.access(new URL('../src/components/commerce/OrderDetailBody.tsx', import.meta.url)),
    );
    await assert.rejects(
        fs.access(new URL('../src/components/content/TicketDisplayColumns.ts', import.meta.url)),
    );
    for (const legacyUserPath of [
        '../src/components/user/UserDisplayColumns.tsx',
        '../src/components/user/UserEditor.tsx',
        '../src/components/user/UserGenerator.tsx',
        '../src/components/user/SendMailEditor.tsx',
    ]) {
        await assert.rejects(fs.access(new URL(legacyUserPath, import.meta.url)));
    }
});

test('admin components use business domains and connected editors use the canonical root state', async () => {
    const componentsDirectory = new URL('../src/components/', import.meta.url);
    const componentEntries = await fs.readdir(componentsDirectory, { withFileTypes: true });
    const expectedDomains = ['commerce', 'common', 'user'];
    assert.deepEqual(
        componentEntries
            .filter((entry) => entry.isDirectory())
            .map((entry) => entry.name)
            .sort(),
        expectedDomains,
    );
    assert.deepEqual(
        componentEntries.filter((entry) => entry.isFile() && /\.tsx?$/.test(entry.name)),
        [],
    );

    const serverManagePage = await fs.readFile(
        new URL('../src/pages/server/manage/index.tsx', import.meta.url),
        'utf8',
    );
    assert.match(serverManagePage, /from ['"]\.\/\_Editors\/ServerEditorRegistry['"]/);
    assert.match(serverManagePage, /from ['"]\.\/components\/ServerManageColumns['"]/);
    assert.match(serverManagePage, /from ['"]\.\/components\/ServerManageMobileList['"]/);
    assert.match(serverManagePage, /from ['"]\.\/components\/ServerManageActions['"]/);
    assert.match(serverManagePage, /from ['"]\.\/components\/ServerManageToolbar['"]/);
    const serverManageDirectory = new URL('../src/pages/server/manage/', import.meta.url);
    assert.ok((await fs.readdir(serverManageDirectory)).includes('components'));
    const serverManageComponentsDirectory = new URL('components/', serverManageDirectory);
    for (const component of [
        'ServerManageActions.tsx',
        'ServerManageColumns.tsx',
        'ServerManageMobileList.tsx',
        'ServerManageToolbar.tsx',
        'ServerNameColumn.tsx',
        'ServerRateColumn.tsx',
        'ServerTypeTag.tsx',
    ]) {
        assert.ok(
            (await fs.readdir(serverManageComponentsDirectory)).includes(component),
            `server manage components should include ${component}`,
        );
    }
    assert.doesNotMatch(
        serverManagePage,
        /from ['"]\.\.\/\.\.\/\.\.\/components\/server\/(?:V2Node|Vmess|Vless|Trojan|Tuic|Hysteria|Shadowsocks|AnyTls)Editor['"]/,
    );

    for (const domain of expectedDomains) {
        const componentNames = await fs.readdir(new URL(`${domain}/`, componentsDirectory));
        assert.ok(
            componentNames.some((name) => /\.tsx?$/.test(name)),
            `${domain} should contain at least one component`,
        );
    }

    const connectedSources = [
        '../src/layouts/Header/index.tsx',
        '../src/layouts/MainLayout/index.tsx',
        '../src/pages/server/manage/_Editors/AnyTlsEditor.tsx',
        '../src/components/commerce/AssignOrderEditor.tsx',
        '../src/pages/server/manage/_Editors/HysteriaEditor.tsx',
        '../src/components/common/PermissionGroupEditor.tsx',
        '../src/pages/user/components/SendMailEditor.tsx',
        '../src/pages/server/manage/_Editors/ShadowsocksEditor.tsx',
        '../src/pages/server/manage/_Editors/TrojanEditor.tsx',
        '../src/pages/server/manage/_Editors/TuicEditor.tsx',
        '../src/pages/user/components/UserEditor.tsx',
        '../src/pages/user/components/UserGenerator.tsx',
        '../src/pages/server/manage/_Editors/V2NodeEditor.tsx',
        '../src/pages/server/manage/_Editors/VlessEditor.tsx',
        '../src/pages/server/manage/_Editors/VmessEditor.tsx',
    ];
    for (const relativePath of connectedSources) {
        const source = await fs.readFile(new URL(relativePath, import.meta.url), 'utf8');
        assert.doesNotMatch(
            source,
            /interface\s+\w*RootState\b/,
            `${relativePath} declares a duplicate root state`,
        );
        assert.match(source, /AdminRootState/, `${relativePath} must select from AdminRootState`);
    }
});

test('V2Node editor composes focused field modules', async () => {
    const editorSource = await fs.readFile(
        new URL('../src/pages/server/manage/_Editors/V2NodeEditor.tsx', import.meta.url),
        'utf8',
    );
    const generalFieldsSource = await fs.readFile(
        new URL('../src/pages/server/manage/_Editors/V2Node/GeneralFields.tsx', import.meta.url),
        'utf8',
    );
    const relationshipFieldsSource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/_Editors/V2Node/RelationshipFields.tsx',
            import.meta.url,
        ),
        'utf8',
    );
    const protocolFieldsSource = await fs.readFile(
        new URL('../src/pages/server/manage/_Editors/V2Node/ProtocolFields.tsx', import.meta.url),
        'utf8',
    );
    const protocolSpecificFieldsSource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/_Editors/V2Node/ProtocolSpecificFields.tsx',
            import.meta.url,
        ),
        'utf8',
    );
    const protocolSelectionFieldsSource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/_Editors/V2Node/ProtocolSelectionFields.tsx',
            import.meta.url,
        ),
        'utf8',
    );
    const transportFieldsSource = await fs.readFile(
        new URL('../src/pages/server/manage/_Editors/V2Node/TransportFields.tsx', import.meta.url),
        'utf8',
    );
    const childSettingsSource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/_Editors/V2Node/ChildSettingsPanel.tsx',
            import.meta.url,
        ),
        'utf8',
    );
    const protocolSpecificDirectory = new URL(
        '../src/pages/server/manage/_Editors/V2Node/ProtocolSpecific/',
        import.meta.url,
    );
    for (const file of [
        'Hysteria2Fields.tsx',
        'TuicFields.tsx',
        'ShadowsocksFields.tsx',
        'VlessFields.tsx',
    ]) {
        assert.equal((await fs.stat(new URL(file, protocolSpecificDirectory))).isFile(), true);
    }
    const hysteria2FieldsSource = await fs.readFile(
        new URL('Hysteria2Fields.tsx', protocolSpecificDirectory),
        'utf8',
    );

    assert.match(editorSource, /<V2NodeGeneralFields/);
    assert.match(editorSource, /<V2NodeProtocolFields/);
    assert.match(editorSource, /<V2NodeProtocolSpecificFields/);
    assert.match(editorSource, /<V2NodeRelationshipFields/);
    assert.match(editorSource, /<V2NodeChildSettingsPanel/);
    assert.doesNotMatch(editorSource, /PermissionGroupEditor|父节点说明|节点协议|混淆方式obfs/);
    assert.match(generalFieldsSource, /function V2NodeGeneralFields/);
    assert.match(generalFieldsSource, /PermissionGroupEditor/);
    assert.match(protocolFieldsSource, /function V2NodeProtocolFields/);
    assert.match(protocolFieldsSource, /<V2NodeProtocolSelectionFields/);
    assert.match(protocolFieldsSource, /<V2NodeTransportFields/);
    assert.match(protocolSelectionFieldsSource, /function V2NodeProtocolSelectionFields/);
    assert.match(protocolSelectionFieldsSource, /节点协议/);
    assert.match(transportFieldsSource, /function V2NodeTransportFields/);
    assert.match(protocolSpecificFieldsSource, /function V2NodeProtocolSpecificFields/);
    assert.match(protocolSpecificFieldsSource, /switch \(server\.protocol\)/);
    assert.match(hysteria2FieldsSource, /混淆方式obfs/);
    assert.match(childSettingsSource, /export function V2NodeChildSettingsPanel/);
    assert.doesNotMatch(editorSource, /<JsonEditor|renderChildDrawer/);
    assert.match(relationshipFieldsSource, /function V2NodeRelationshipFields/);
    assert.match(relationshipFieldsSource, /父节点说明/);
});

test('Vmess editor composes focused field and settings modules', async () => {
    const editorSource = await fs.readFile(
        new URL('../src/pages/server/manage/_Editors/VmessEditor.tsx', import.meta.url),
        'utf8',
    );
    const generalFieldsSource = await fs.readFile(
        new URL('../src/pages/server/manage/_Editors/Vmess/GeneralFields.tsx', import.meta.url),
        'utf8',
    );
    const relationshipFieldsSource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/_Editors/Vmess/RelationshipFields.tsx',
            import.meta.url,
        ),
        'utf8',
    );
    const networkFieldsSource = await fs.readFile(
        new URL('../src/pages/server/manage/_Editors/Vmess/NetworkFields.tsx', import.meta.url),
        'utf8',
    );
    const settingsEditorsSource = await fs.readFile(
        new URL('../src/pages/server/manage/_Editors/Vmess/SettingsEditors.tsx', import.meta.url),
        'utf8',
    );
    const childSettingsSource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/_Editors/Vmess/ChildSettingsPanel.tsx',
            import.meta.url,
        ),
        'utf8',
    );
    const dnsSettingsSource = await fs.readFile(
        new URL('../src/pages/server/manage/_Editors/Vmess/DnsSettings.tsx', import.meta.url),
        'utf8',
    );
    const ruleSettingsSource = await fs.readFile(
        new URL('../src/pages/server/manage/_Editors/Vmess/RuleSettings.tsx', import.meta.url),
        'utf8',
    );
    const tlsSettingsSource = await fs.readFile(
        new URL('../src/pages/server/manage/_Editors/Vmess/TlsSettings.tsx', import.meta.url),
        'utf8',
    );

    assert.equal((editorSource.match(/<VmessGeneralFields/g) || []).length, 1);
    assert.match(editorSource, /<VmessNetworkFields/);
    assert.match(editorSource, /<VmessRelationshipFields/);
    assert.match(editorSource, /from ['"]\.\/Vmess\/SettingsEditors['"]/);
    assert.doesNotMatch(editorSource, /class DnsSettings|class RuleSettings|class TlsSettings/);
    assert.match(generalFieldsSource, /function VmessGeneralFields/);
    assert.match(relationshipFieldsSource, /function VmessRelationshipFields/);
    assert.match(networkFieldsSource, /function VmessNetworkFields/);
    assert.match(editorSource, /<VmessChildSettingsPanel/);
    assert.match(childSettingsSource, /export function VmessChildSettingsPanel/);
    assert.match(dnsSettingsSource, /export class DnsSettings/);
    assert.match(ruleSettingsSource, /export class RuleSettings/);
    assert.match(tlsSettingsSource, /export class TlsSettings/);
    assert.match(settingsEditorsSource, /export \{ DnsSettings \} from '\.\/DnsSettings'/);
    assert.doesNotMatch(editorSource, /<JsonEditor|renderChildDrawer/);
});

test('Trojan network settings use the server model value contract', async () => {
    const networkSource = await fs.readFile(
        new URL('../src/pages/server/manage/_Editors/Trojan/NetworkSettings.tsx', import.meta.url),
        'utf8',
    );
    assert.match(networkSource, /value\?: ServerRecord\['network_settings'\]/);
    assert.match(
        networkSource,
        /formatNetworkSettings\(value: ServerRecord\['network_settings'\]\)/,
    );
    assert.doesNotMatch(networkSource, /value\?: unknown|formatNetworkSettings\(value: unknown\)/);
});

test('Vless editor composes focused general and relationship field modules', async () => {
    const editorSource = await fs.readFile(
        new URL('../src/pages/server/manage/_Editors/VlessEditor.tsx', import.meta.url),
        'utf8',
    );
    const generalFieldsSource = await fs.readFile(
        new URL('../src/pages/server/manage/_Editors/Vless/GeneralFields.tsx', import.meta.url),
        'utf8',
    );
    const relationshipFieldsSource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/_Editors/Vless/RelationshipFields.tsx',
            import.meta.url,
        ),
        'utf8',
    );
    const childSettingsSource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/_Editors/Vless/ChildSettingsPanel.tsx',
            import.meta.url,
        ),
        'utf8',
    );

    assert.equal((editorSource.match(/<VlessGeneralFields/g) || []).length, 1);
    assert.match(editorSource, /<VlessRelationshipFields/);
    assert.match(editorSource, /<VlessChildSettingsPanel/);
    assert.doesNotMatch(editorSource, /PermissionGroupEditor|父节点说明|加密方式/);
    assert.match(generalFieldsSource, /function VlessGeneralFields/);
    assert.match(generalFieldsSource, /加密方式/);
    assert.match(relationshipFieldsSource, /function VlessRelationshipFields/);
    assert.match(childSettingsSource, /export function VlessChildSettingsPanel/);
    assert.doesNotMatch(editorSource, /<JsonEditor|renderChildDrawer/);
    assert.match(relationshipFieldsSource, /父节点说明/);
});

test('admin router selectors use the canonical root state', async () => {
    const storeTypes = await fs.readFile(new URL('../src/types/store.ts', import.meta.url), 'utf8');
    const routerTypes = await fs.readFile(
        new URL('../src/types/router.ts', import.meta.url),
        'utf8',
    );
    const routerBindings = await fs.readFile(
        new URL('../src/runtime/routerBindings.tsx', import.meta.url),
        'utf8',
    );
    assert.match(storeTypes, /router\?: RouterState/);
    assert.match(routerTypes, /export interface RouterState/);
    assert.doesNotMatch(routerBindings, /interface\s+RouterRootState\b/);
    assert.match(routerBindings, /state: AdminRootState/);
});
