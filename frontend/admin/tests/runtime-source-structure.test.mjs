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
        '../src/runtime/routeInitialProps.tsx',
        '../src/runtime/routeRuntimeTypes.ts',
        '../src/services/apiClient.ts',
        '../src/services/csvDownloadService.ts',
        '../src/routes/adminRoutes.ts',
        '../src/routes/routeConfig.ts',
        '../src/types/apiContracts.ts',
        '../src/types/dvaRuntimeContracts.ts',
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
        '../src/services/apiClient.js',
        '../src/services/apiClient.d.ts',
        '../src/services/csvDownloadService.js',
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
        new URL('../src/routes/adminRoutes.ts', import.meta.url),
        'utf8',
    );
    const routeTypeSource = await fs.readFile(
        new URL('../src/routes/routeConfig.ts', import.meta.url),
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
    const typedStylePath = '../src/styles/ticketDetailStyles.ts';
    const stat = await fs.stat(new URL(typedStylePath, import.meta.url));
    assert.equal(stat.isFile(), true, `${typedStylePath} should be a file`);
    await assert.rejects(fs.access(new URL('../src/vendor', import.meta.url)));
});

test('admin production source has no compiler-generated module or style identifiers', async () => {
    const sourceDirectory = new URL('../src/', import.meta.url);
    const sourceFiles = await collectSourceFiles(sourceDirectory);
    const sourceText = [];
    for (const file of sourceFiles) {
        assert.match(file.pathname, /\.(?:ts|tsx|d\.ts|css)$/);
        const fileName = file.pathname.split('/').pop() || '';
        assert.doesNotMatch(fileName, /^[0-9a-f]{6,}\.[^.]+$/i, file.pathname);
        assert.doesNotMatch(fileName, /___[A-Za-z0-9_-]{4,}/, file.pathname);
        const text = await fs.readFile(file, 'utf8');
        sourceText.push(`${file.pathname}\n${text}`);
        assert.doesNotMatch(text, /(?:from|require\()\s*['"][^'"]+\.(?:js|jsx)['"]/);
        assert.doesNotMatch(text, /(?:vendor\/modules|webpackJsonp|moduleId|interopDefault)/);
        assert.doesNotMatch(text, /(?:className|class)\s*=?.*___[A-Za-z0-9_-]{4,}/);
    }
    assert.doesNotMatch(sourceText.join('\n'), /\b(?:var|let|const)\s+[rioaslc](?:\s*,|\s*=)/);
});

test('server security editors are organized as named source modules', async () => {
    const vlessChildSource = await fs.readFile(
        new URL('../src/pages/server/manage/editors/Vless/ChildSettingsPanel.tsx', import.meta.url),
        'utf8',
    );
    const tlsSource = await fs.readFile(
        new URL('../src/pages/server/manage/editors/Security/TlsSettings.tsx', import.meta.url),
        'utf8',
    );
    const tlsAdvancedSource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/editors/Security/TlsAdvancedSettings.tsx',
            import.meta.url,
        ),
        'utf8',
    );
    const tlsCertificateSource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/editors/Security/TlsCertificateSettings.tsx',
            import.meta.url,
        ),
        'utf8',
    );
    const tlsRealitySource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/editors/Security/TlsRealitySettings.tsx',
            import.meta.url,
        ),
        'utf8',
    );
    const encryptionSource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/editors/Security/EncryptionSettings.tsx',
            import.meta.url,
        ),
        'utf8',
    );
    assert.match(vlessChildSource, /from ['"]\.\.\/Security\/TlsSettings['"]/);
    assert.match(vlessChildSource, /from ['"]\.\.\/Security\/EncryptionSettings['"]/);
    assert.match(tlsSource, /export class TlsSettings/);
    assert.match(tlsSource, /<TlsAdvancedSettings/);
    assert.match(tlsAdvancedSource, /export function TlsAdvancedSettings/);
    assert.match(tlsSource, /<TlsCertificateSettings/);
    assert.match(tlsSource, /<TlsRealitySettings/);
    assert.match(tlsCertificateSource, /export function TlsCertificateSettings/);
    assert.match(tlsRealitySource, /export function TlsRealitySettings/);
    assert.match(encryptionSource, /export class EncryptionSettings/);
    await assert.rejects(
        fs.access(
            new URL(
                '../src/pages/server/manage/editors/ServerSecuritySettings.tsx',
                import.meta.url,
            ),
        ),
    );
});

test('Trojan transport settings live in a focused protocol module', async () => {
    const editorSource = await fs.readFile(
        new URL('../src/pages/server/manage/editors/TrojanEditor.tsx', import.meta.url),
        'utf8',
    );
    const networkSource = await fs.readFile(
        new URL('../src/pages/server/manage/editors/Trojan/NetworkSettings.tsx', import.meta.url),
        'utf8',
    );
    const generalFieldsSource = await fs.readFile(
        new URL('../src/pages/server/manage/editors/Trojan/GeneralFields.tsx', import.meta.url),
        'utf8',
    );
    const relationshipFieldsSource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/editors/Trojan/RelationshipFields.tsx',
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
        new URL('../src/pages/server/manage/editors/HysteriaEditor.tsx', import.meta.url),
        'utf8',
    );
    const obfuscationSource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/editors/Hysteria/ObfuscationSettings.tsx',
            import.meta.url,
        ),
        'utf8',
    );
    const relationshipSource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/editors/Hysteria/RelationshipFields.tsx',
            import.meta.url,
        ),
        'utf8',
    );
    const generalFieldsSource = await fs.readFile(
        new URL('../src/pages/server/manage/editors/Hysteria/GeneralFields.tsx', import.meta.url),
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
        new URL('../src/pages/server/manage/editors/AnyTlsEditor.tsx', import.meta.url),
        'utf8',
    );
    const paddingSource = await fs.readFile(
        new URL('../src/pages/server/manage/editors/AnyTls/PaddingScheme.tsx', import.meta.url),
        'utf8',
    );
    const generalFieldsSource = await fs.readFile(
        new URL('../src/pages/server/manage/editors/AnyTls/GeneralFields.tsx', import.meta.url),
        'utf8',
    );
    const relationshipFieldsSource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/editors/AnyTls/RelationshipFields.tsx',
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
        new URL('../src/pages/server/manage/editors/ShadowsocksEditor.tsx', import.meta.url),
        'utf8',
    );
    const securitySource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/editors/Shadowsocks/SecuritySettings.tsx',
            import.meta.url,
        ),
        'utf8',
    );
    const generalFieldsSource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/editors/Shadowsocks/GeneralFields.tsx',
            import.meta.url,
        ),
        'utf8',
    );
    const relationshipFieldsSource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/editors/Shadowsocks/RelationshipFields.tsx',
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
        new URL('../src/pages/server/manage/editors/TuicEditor.tsx', import.meta.url),
        'utf8',
    );
    const transportSource = await fs.readFile(
        new URL('../src/pages/server/manage/editors/Tuic/TransportSettings.tsx', import.meta.url),
        'utf8',
    );
    const generalFieldsSource = await fs.readFile(
        new URL('../src/pages/server/manage/editors/Tuic/GeneralFields.tsx', import.meta.url),
        'utf8',
    );
    const relationshipFieldsSource = await fs.readFile(
        new URL('../src/pages/server/manage/editors/Tuic/RelationshipFields.tsx', import.meta.url),
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
    const userModel = await fs.readFile(
        new URL('../src/models/userModel.ts', import.meta.url),
        'utf8',
    );
    const orderModel = await fs.readFile(
        new URL('../src/models/orderModel.ts', import.meta.url),
        'utf8',
    );
    const orderManagementEffects = await fs.readFile(
        new URL('../src/models/orderManagementEffects.ts', import.meta.url),
        'utf8',
    );

    for (const source of [userModel, orderModel]) {
        assert.doesNotMatch(source, /import \* as /);
        assert.doesNotMatch(source, /\bexports\./);
    }
    for (const effect of ['update', 'paid', 'cancel', 'assign']) {
        assert.match(orderManagementEffects, new RegExp(`export function\\* ${effect}\\b`));
    }
    assert.doesNotMatch(orderModel, /\bpost\(|window\.settings/);

    const modelDirectory = new URL('../src/models/', import.meta.url);
    const directModels = [
        { file: 'adminAuthenticationModel', namespace: 'auth' },
        { file: 'configurationModel', namespace: 'config' },
        ...[
            ['couponModel', 'coupon'],
            ['giftCardModel', 'giftcard'],
            ['knowledgeModel', 'knowledge'],
            ['noticeModel', 'notice'],
            ['orderModel', 'order'],
            ['paymentModel', 'payment'],
            ['planModel', 'plan'],
            ['serverGroupModel', 'serverGroup'],
            ['serverRouteModel', 'serverRoute'],
            ['themeModel', 'theme'],
            ['ticketModel', 'ticket'],
            ['userModel', 'user'],
        ].map(([file, namespace]) => ({ file, namespace })),
        { file: 'queueMonitoringModel', namespace: 'system' },
        { file: 'serverManagementModel', namespace: 'serverManage' },
        { file: 'dashboardStatisticsModel', namespace: 'stat' },
        { file: 'layoutModel', namespace: 'layout' },
        { file: 'adminPassportModel', namespace: 'passport' },
    ];
    for (const { file, namespace } of directModels) {
        const source = await fs.readFile(new URL(`${file}.ts`, modelDirectory), 'utf8');
        assert.match(source, new RegExp(`export default\\s*{\\s*namespace: ['"]${namespace}['"]`));
        assert.doesNotMatch(source, /export default\s*{\s*name:/);
    }

    const protocolModels = [
        ['serverAnyTLS', 'anytls'],
        ['serverHysteria', 'hysteria'],
        ['serverShadowsocks', 'shadowsocks'],
        ['serverTrojan', 'trojan'],
        ['serverTuic', 'tuic'],
        ['serverV2node', 'v2node'],
        ['serverVless', 'vless'],
        ['serverVmess', 'vmess'],
    ];
    const protocolSource = await fs.readFile(
        new URL('serverProtocolModelFactory.ts', modelDirectory),
        'utf8',
    );
    for (const [namespace, protocol] of protocolModels) {
        const source = protocolSource;
        assert.match(source, new RegExp(`namespace: ['"]${namespace}['"]`));
        assert.match(source, new RegExp(`protocol: ['"]${protocol}['"]`));
        assert.doesNotMatch(source, /\bname:\s*['"]/);
    }

    assert.match(protocolSource, /interface ServerProtocolModelOptions\s*{\s*namespace: string;/);
    assert.match(protocolSource, /return\s*{\s*namespace,/);
    assert.doesNotMatch(protocolSource, /\bname:\s*string/);

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
        '../src/types/storeContracts.ts',
        '../src/types/dvaRuntimeContracts.ts',
        '../src/types/dvaCore.d.ts',
        '../src/runtime/dvaApplication.tsx',
        '../src/runtime/loadingPlugin.ts',
        '../src/app/store.tsx',
    ];
    for (const relativePath of contractPaths) {
        const source = await fs.readFile(new URL(relativePath, import.meta.url), 'utf8');
        assert.doesNotMatch(source, /:\s*object\b|\bobject\[\]/, relativePath);
    }

    const storeTypes = await fs.readFile(
        new URL('../src/types/storeContracts.ts', import.meta.url),
        'utf8',
    );
    const dvaTypes = await fs.readFile(
        new URL('../src/types/dvaRuntimeContracts.ts', import.meta.url),
        'utf8',
    );
    const effectTypes = await fs.readFile(
        new URL('../src/types/modelEffectContracts.ts', import.meta.url),
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
    const routeTypes = await fs.readFile(
        new URL('../src/runtime/routeRuntimeTypes.ts', import.meta.url),
        'utf8',
    );
    const bootstrap = await fs.readFile(
        new URL('../src/app/bootstrap.tsx', import.meta.url),
        'utf8',
    );
    assert.match(pluginRuntime, /export type PluginCallback/);
    assert.match(pluginRuntime, /export interface PluginConfiguration/);
    assert.doesNotMatch(pluginRuntime, /PluginValue\s*=\s*object/);
    assert.match(routeTypes, /Partial<AdminRootState>/);
    assert.match(routeRuntime, /from ['"]\.\/routeRuntimeTypes['"]/);
    assert.doesNotMatch(routeRuntime, /Record<string, PluginValue>/);
    assert.match(bootstrap, /apply<React\.ReactElement>/);
    assert.match(bootstrap, /compose<\(\) => Promise<void> \| void>/);
});

test('admin business contracts do not depend on rendering components', async () => {
    const typesDirectory = new URL('../src/types/', import.meta.url);
    const typeNames = (await fs.readdir(typesDirectory)).filter((name) => name.endsWith('.ts'));
    assert.ok(typeNames.includes('filterContracts.ts'));
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
        'filterContracts.ts': ['FilterItem', 'FilterField'],
        'knowledgeContracts.ts': ['KnowledgeRecord'],
        'monitoringContracts.ts': ['QueueWorkload', 'DisplayScalar'],
        'noticeContracts.ts': ['NoticeRecord'],
        'orderContracts.ts': ['OrderDetailRecord'],
        'paymentContracts.ts': ['PaymentRecord'],
        'promotionContracts.ts': ['CouponRecord', 'GiftcardRecord'],
        'ticketContracts.ts': ['TicketRecord', 'TicketMessage'],
    };
    for (const [typeName, contracts] of Object.entries(contractSources)) {
        const source = await fs.readFile(new URL(typeName, typesDirectory), 'utf8');
        for (const contract of contracts)
            assert.match(source, new RegExp(`export (?:interface|type) ${contract}\\b`));
    }
});

test('admin request transport does not depend on the rendering library', async () => {
    const requestSource = await fs.readFile(
        new URL('../src/services/apiClient.ts', import.meta.url),
        'utf8',
    );
    const headerSource = await fs.readFile(
        new URL('../src/layouts/Header/HeaderLayout.tsx', import.meta.url),
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

test('Header account menu is isolated under its owning layout', async () => {
    const headerComponentsDirectory = new URL('../src/layouts/Header/components/', import.meta.url);
    assert.ok((await fs.readdir(headerComponentsDirectory)).includes('HeaderAccountMenu.tsx'));
    const headerSource = await fs.readFile(
        new URL('../src/layouts/Header/HeaderLayout.tsx', import.meta.url),
        'utf8',
    );
    assert.match(
        headerSource,
        /import HeaderAccountMenu from ['"]\.\/components\/HeaderAccountMenu['"]/,
    );
});

test('Header search overlay is isolated under its owning layout', async () => {
    const headerComponentsDirectory = new URL('../src/layouts/Header/components/', import.meta.url);
    assert.ok((await fs.readdir(headerComponentsDirectory)).includes('HeaderSearchOverlay.tsx'));
    const headerSource = await fs.readFile(
        new URL('../src/layouts/Header/HeaderLayout.tsx', import.meta.url),
        'utf8',
    );
    assert.match(
        headerSource,
        /import HeaderSearchOverlay, \{ type HeaderSearchConfig \} from ['"]\.\/components\/HeaderSearchOverlay['"]/,
    );
    assert.doesNotMatch(headerSource, /overlay-header|input-group-prepend/);
});

test('Sidebar navigation is isolated under its owning layout', async () => {
    const sidebarComponentsDirectory = new URL(
        '../src/layouts/Sidebar/components/',
        import.meta.url,
    );
    assert.ok((await fs.readdir(sidebarComponentsDirectory)).includes('SidebarNavigation.tsx'));
    const sidebarSource = await fs.readFile(
        new URL('../src/layouts/Sidebar/SidebarLayout.tsx', import.meta.url),
        'utf8',
    );
    assert.match(
        sidebarSource,
        /import SidebarNavigation from ['"]\.\/components\/SidebarNavigation['"]/,
    );
});

test('admin login keeps presentation in a dedicated screen component', async () => {
    const loginComponentsDirectory = new URL('../src/pages/login/components/', import.meta.url);
    assert.ok((await fs.readdir(loginComponentsDirectory)).includes('AdminLoginScreen.tsx'));
    const loginSource = await fs.readFile(
        new URL('../src/pages/login/LoginPage.tsx', import.meta.url),
        'utf8',
    );
    assert.match(
        loginSource,
        /import AdminLoginScreen from ['"]\.\/components\/AdminLoginScreen['"]/,
    );
    assert.doesNotMatch(loginSource, /from ['"]antd\/lib\/icon['"]/);
});

test('queue monitoring keeps its statistics overview in a typed component', async () => {
    const queueComponentsDirectory = new URL('../src/pages/queue/components/', import.meta.url);
    assert.ok((await fs.readdir(queueComponentsDirectory)).includes('QueueOverview.tsx'));
    const queueSource = await fs.readFile(
        new URL('../src/pages/queue/QueuePage.tsx', import.meta.url),
        'utf8',
    );
    assert.match(queueSource, /import QueueOverview from ['"]\.\/components\/QueueOverview['"]/);
    assert.doesNotMatch(queueSource, /当前作业量/);
});

test('queue monitoring keeps workload table composition in a dedicated component', async () => {
    const queueComponentsDirectory = new URL('../src/pages/queue/components/', import.meta.url);
    assert.ok((await fs.readdir(queueComponentsDirectory)).includes('QueueWorkloadTable.tsx'));
    const queueSource = await fs.readFile(
        new URL('../src/pages/queue/QueuePage.tsx', import.meta.url),
        'utf8',
    );
    assert.match(
        queueSource,
        /import QueueWorkloadTable from ['"]\.\/components\/QueueWorkloadTable['"]/,
    );
    assert.doesNotMatch(queueSource, /当前作业详情|createReadonlyQueueColumns/);
});

test('ticket detail keeps chat presentation in the ticket components directory', async () => {
    const ticketComponentsDirectory = new URL('../src/pages/ticket/components/', import.meta.url);
    assert.ok((await fs.readdir(ticketComponentsDirectory)).includes('TicketDetailChat.tsx'));
    const detailSource = await fs.readFile(
        new URL('../src/pages/ticket/TicketDetailPage.tsx', import.meta.url),
        'utf8',
    );
    assert.match(
        detailSource,
        /import TicketDetailChat from ['"]\.\/components\/TicketDetailChat['"]/,
    );
    assert.doesNotMatch(detailSource, /TicketMessageList|UserEditor|TrafficPanel/);
});

test('ticket list keeps filters and search controls in a dedicated toolbar', async () => {
    const ticketComponentsDirectory = new URL('../src/pages/ticket/components/', import.meta.url);
    assert.ok((await fs.readdir(ticketComponentsDirectory)).includes('TicketToolbar.tsx'));
    const ticketSource = await fs.readFile(
        new URL('../src/pages/ticket/TicketPage.tsx', import.meta.url),
        'utf8',
    );
    assert.match(ticketSource, /import TicketToolbar from ['"]\.\/components\/TicketToolbar['"]/);
    assert.doesNotMatch(ticketSource, /from ['"]antd\/lib\/(input|radio)['"]/);
});

test('admin models depend on API contracts separately from request transport', async () => {
    const apiSource = await fs.readFile(
        new URL('../src/types/apiContracts.ts', import.meta.url),
        'utf8',
    );
    const requestSource = await fs.readFile(
        new URL('../src/services/apiClient.ts', import.meta.url),
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
    const storeTypes = await fs.readFile(
        new URL('../src/types/storeContracts.ts', import.meta.url),
        'utf8',
    );
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
        [],
    );

    for (const domain of expectedDomains) {
        const domainDirectory = new URL(`${domain}/`, pagesDirectory);
        const files = await fs.readdir(domainDirectory, { withFileTypes: true });
        if (!['config', 'server'].includes(domain)) {
            assert.ok(
                files.some((entry) => entry.name.endsWith('Page.tsx')),
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
    assert.ok((await fs.readdir(paymentComponentsDirectory)).includes('PaymentList.tsx'));
    assert.ok((await fs.readdir(paymentComponentsDirectory)).includes('PaymentEditor.tsx'));
    assert.ok((await fs.readdir(paymentComponentsDirectory)).includes('PaymentNotifyColumn.tsx'));
    const themeDirectory = new URL('config/theme/', pagesDirectory);
    assert.ok((await fs.readdir(themeDirectory)).includes('components'));
    assert.ok(
        (await fs.readdir(new URL('components/', themeDirectory))).includes(
            'ThemeConfigEditor.tsx',
        ),
    );
    const systemDirectory = new URL('config/system/', pagesDirectory);
    assert.ok((await fs.readdir(systemDirectory)).includes('SystemConfigPage.tsx'));
    assert.ok((await fs.readdir(systemDirectory)).includes('components'));
    const systemComponentsDirectory = new URL('components/', systemDirectory);
    for (const component of [
        'AppConfigTab.tsx',
        'ConfigRow.tsx',
        'DepositConfigTab.tsx',
        'EmailConfigTab.tsx',
        'FrontendConfigTab.tsx',
        'InviteConfigTab.tsx',
        'InviteCommissionDistribution.tsx',
        'MailTestResult.tsx',
        'SafeConfigTab.tsx',
        'SafeConfigFields.tsx',
        'SafeConfigLimits.tsx',
        'ServerConfigTab.tsx',
        'SiteConfigTab.tsx',
        'SiteTrialSettings.tsx',
        'SubscribeConfigTab.tsx',
        'SubscribeLinkValidity.tsx',
        'SystemConfigTabs.tsx',
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
    assert.ok((await fs.readdir(serverGroupComponentsDirectory)).includes('ServerGroupList.tsx'));
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
    assert.ok((await fs.readdir(knowledgeDirectory)).includes('KnowledgePage.tsx'));
    assert.ok((await fs.readdir(knowledgeDirectory)).includes('components'));
    const knowledgeComponentsDirectory = new URL('components/', knowledgeDirectory);
    assert.ok((await fs.readdir(knowledgeComponentsDirectory)).includes('KnowledgeList.tsx'));
    assert.ok((await fs.readdir(knowledgeComponentsDirectory)).includes('KnowledgeColumns.ts'));
    assert.ok((await fs.readdir(knowledgeComponentsDirectory)).includes('KnowledgeEditor.tsx'));
    const couponDirectory = new URL('coupon/', pagesDirectory);
    assert.ok((await fs.readdir(couponDirectory)).includes('CouponPage.tsx'));
    assert.ok((await fs.readdir(couponDirectory)).includes('components'));
    const couponComponentsDirectory = new URL('components/', couponDirectory);
    assert.ok((await fs.readdir(couponComponentsDirectory)).includes('CouponList.tsx'));
    assert.ok((await fs.readdir(couponComponentsDirectory)).includes('CouponColumns.tsx'));
    assert.ok((await fs.readdir(couponComponentsDirectory)).includes('CouponEditor.tsx'));
    const giftcardDirectory = new URL('giftcard/', pagesDirectory);
    assert.ok((await fs.readdir(giftcardDirectory)).includes('GiftcardPage.tsx'));
    assert.ok((await fs.readdir(giftcardDirectory)).includes('components'));
    const giftcardComponentsDirectory = new URL('components/', giftcardDirectory);
    assert.ok((await fs.readdir(giftcardComponentsDirectory)).includes('GiftcardList.tsx'));
    assert.ok((await fs.readdir(giftcardComponentsDirectory)).includes('GiftcardColumns.tsx'));
    assert.ok((await fs.readdir(giftcardComponentsDirectory)).includes('GiftcardEditor.tsx'));
    const dashboardDirectory = new URL('dashboard/', pagesDirectory);
    assert.ok((await fs.readdir(dashboardDirectory)).includes('DashboardPage.tsx'));
    assert.ok((await fs.readdir(dashboardDirectory)).includes('components'));
    const dashboardComponentsDirectory = new URL('components/', dashboardDirectory);
    for (const component of [
        'DashboardAlerts.tsx',
        'DashboardCharts.tsx',
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
    assert.ok((await fs.readdir(planDirectory)).includes('PlanPage.tsx'));
    assert.ok((await fs.readdir(planDirectory)).includes('components'));
    assert.ok((await fs.readdir(new URL('components/', planDirectory))).includes('PlanList.tsx'));
    assert.ok(
        (await fs.readdir(new URL('components/', planDirectory))).includes('PlanGroupColumn.tsx'),
    );
    assert.ok(
        (await fs.readdir(new URL('components/', planDirectory))).includes('PlanPriceColumns.ts'),
    );
    assert.ok(
        (await fs.readdir(new URL('components/', planDirectory))).includes(
            'PlanResourceColumns.tsx',
        ),
    );
    assert.ok((await fs.readdir(new URL('components/', planDirectory))).includes('PlanEditor.tsx'));
    const orderDirectory = new URL('order/', pagesDirectory);
    assert.ok((await fs.readdir(orderDirectory)).includes('OrderPage.tsx'));
    assert.ok((await fs.readdir(orderDirectory)).includes('components'));
    assert.ok(
        (await fs.readdir(new URL('components/', orderDirectory))).includes(
            'OrderFilterDrawer.tsx',
        ),
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
    assert.ok((await fs.readdir(userDirectory)).includes('UserPage.tsx'));
    assert.ok((await fs.readdir(userDirectory)).includes('components'));
    const userComponentsDirectory = new URL('components/', userDirectory);
    for (const component of [
        'UserFormFieldGroup.tsx',
        'SendMailEditor.tsx',
        'UserDisplayColumns.tsx',
        'UserEditor.tsx',
        'UserFilterDrawer.tsx',
        'UserFormFields.tsx',
        'UserAccountSettingsFields.tsx',
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
    assert.ok((await fs.readdir(noticeDirectory)).includes('NoticePage.tsx'));
    assert.ok((await fs.readdir(noticeDirectory)).includes('components'));
    const noticeComponentsDirectory = new URL('components/', noticeDirectory);
    assert.ok((await fs.readdir(noticeComponentsDirectory)).includes('NoticeList.tsx'));
    assert.ok((await fs.readdir(noticeComponentsDirectory)).includes('NoticeColumns.ts'));
    assert.ok((await fs.readdir(noticeComponentsDirectory)).includes('NoticeEditor.tsx'));
    assert.ok(
        (await fs.readdir(new URL('ticket/', pagesDirectory))).includes('TicketDetailPage.tsx'),
    );
    const ticketDirectory = new URL('ticket/', pagesDirectory);
    assert.ok((await fs.readdir(ticketDirectory)).includes('components'));
    const ticketComponentsDirectory = new URL('components/', ticketDirectory);
    assert.ok((await fs.readdir(ticketComponentsDirectory)).includes('TicketList.tsx'));
    assert.ok((await fs.readdir(ticketComponentsDirectory)).includes('TicketColumns.ts'));
    assert.ok((await fs.readdir(ticketComponentsDirectory)).includes('TicketMessageList.tsx'));
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
    const expectedDomains = ['common', 'order', 'user'];
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
        new URL('../src/pages/server/manage/ServerManagePage.tsx', import.meta.url),
        'utf8',
    );
    assert.match(serverManagePage, /from ['"]\.\/editors\/ServerEditorRegistry['"]/);
    assert.match(serverManagePage, /from ['"]\.\/components\/ServerManageWorkspace['"]/);
    assert.doesNotMatch(serverManagePage, /renderDesktopTable|renderMobileList|renderContextMenu/);
    const serverManageDirectory = new URL('../src/pages/server/manage/', import.meta.url);
    assert.ok((await fs.readdir(serverManageDirectory)).includes('editors'));
    assert.ok((await fs.readdir(serverManageDirectory)).includes('components'));
    const serverEditorsDirectory = new URL('editors/', serverManageDirectory);
    for (const component of [
        'AnyTlsEditor.tsx',
        'HysteriaEditor.tsx',
        'ServerEditorRegistry.tsx',
        'ShadowsocksEditor.tsx',
        'TrojanEditor.tsx',
        'TuicEditor.tsx',
        'V2NodeEditor.tsx',
        'VlessEditor.tsx',
        'VmessEditor.tsx',
    ]) {
        assert.ok(
            (await fs.readdir(serverEditorsDirectory)).includes(component),
            `server editors should include ${component}`,
        );
    }
    const serverManageComponentsDirectory = new URL('components/', serverManageDirectory);
    for (const component of [
        'ServerManageActions.tsx',
        'ServerManageColumns.tsx',
        'ServerManageMobileList.tsx',
        'ServerManageToolbar.tsx',
        'ServerManageWorkspace.tsx',
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
        '../src/layouts/Header/HeaderLayout.tsx',
        '../src/layouts/MainLayout/MainLayout.tsx',
        '../src/pages/server/manage/editors/AnyTlsEditor.tsx',
        '../src/components/order/AssignOrderEditor.tsx',
        '../src/pages/server/manage/editors/HysteriaEditor.tsx',
        '../src/components/common/PermissionGroupEditor.tsx',
        '../src/pages/user/components/SendMailEditor.tsx',
        '../src/pages/server/manage/editors/ShadowsocksEditor.tsx',
        '../src/pages/server/manage/editors/TrojanEditor.tsx',
        '../src/pages/server/manage/editors/TuicEditor.tsx',
        '../src/pages/user/components/UserEditor.tsx',
        '../src/pages/user/components/UserGenerator.tsx',
        '../src/pages/server/manage/editors/V2NodeEditor.tsx',
        '../src/pages/server/manage/editors/VlessEditor.tsx',
        '../src/pages/server/manage/editors/VmessEditor.tsx',
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

test('filter drawer controls are split into semantic common components', async () => {
    const commonDirectory = new URL('../src/components/common/', import.meta.url);
    for (const componentName of ['FilterCondition.tsx', 'FilterValueInput.tsx']) {
        assert.ok(
            (await fs.readdir(commonDirectory)).includes(componentName),
            `common components should include ${componentName}`,
        );
    }
    const drawerSource = await fs.readFile(
        new URL('../src/components/common/FilterDrawer.tsx', import.meta.url),
        'utf8',
    );
    assert.match(drawerSource, /import FilterCondition from ['"]\.\/FilterCondition['"]/);
});

test('V2Node editor composes focused field modules', async () => {
    const editorSource = await fs.readFile(
        new URL('../src/pages/server/manage/editors/V2NodeEditor.tsx', import.meta.url),
        'utf8',
    );
    const generalFieldsSource = await fs.readFile(
        new URL('../src/pages/server/manage/editors/V2Node/GeneralFields.tsx', import.meta.url),
        'utf8',
    );
    const relationshipFieldsSource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/editors/V2Node/RelationshipFields.tsx',
            import.meta.url,
        ),
        'utf8',
    );
    const protocolFieldsSource = await fs.readFile(
        new URL('../src/pages/server/manage/editors/V2Node/ProtocolFields.tsx', import.meta.url),
        'utf8',
    );
    const protocolSpecificFieldsSource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/editors/V2Node/ProtocolSpecificFields.tsx',
            import.meta.url,
        ),
        'utf8',
    );
    const protocolSelectionFieldsSource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/editors/V2Node/ProtocolSelectionFields.tsx',
            import.meta.url,
        ),
        'utf8',
    );
    const transportFieldsSource = await fs.readFile(
        new URL('../src/pages/server/manage/editors/V2Node/TransportFields.tsx', import.meta.url),
        'utf8',
    );
    const childSettingsSource = await fs.readFile(
        new URL(
            '../src/pages/server/manage/editors/V2Node/ChildSettingsPanel.tsx',
            import.meta.url,
        ),
        'utf8',
    );
    const protocolSpecificDirectory = new URL(
        '../src/pages/server/manage/editors/V2Node/ProtocolSpecific/',
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
        new URL('../src/pages/server/manage/editors/VmessEditor.tsx', import.meta.url),
        'utf8',
    );
    const generalFieldsSource = await fs.readFile(
        new URL('../src/pages/server/manage/editors/Vmess/GeneralFields.tsx', import.meta.url),
        'utf8',
    );
    const relationshipFieldsSource = await fs.readFile(
        new URL('../src/pages/server/manage/editors/Vmess/RelationshipFields.tsx', import.meta.url),
        'utf8',
    );
    const networkFieldsSource = await fs.readFile(
        new URL('../src/pages/server/manage/editors/Vmess/NetworkFields.tsx', import.meta.url),
        'utf8',
    );
    const childSettingsSource = await fs.readFile(
        new URL('../src/pages/server/manage/editors/Vmess/ChildSettingsPanel.tsx', import.meta.url),
        'utf8',
    );
    const dnsSettingsSource = await fs.readFile(
        new URL('../src/pages/server/manage/editors/Vmess/DnsSettings.tsx', import.meta.url),
        'utf8',
    );
    const ruleSettingsSource = await fs.readFile(
        new URL('../src/pages/server/manage/editors/Vmess/RuleSettings.tsx', import.meta.url),
        'utf8',
    );
    const tlsSettingsSource = await fs.readFile(
        new URL('../src/pages/server/manage/editors/Vmess/TlsSettings.tsx', import.meta.url),
        'utf8',
    );

    assert.equal((editorSource.match(/<VmessGeneralFields/g) || []).length, 1);
    assert.match(editorSource, /<VmessNetworkFields/);
    assert.match(editorSource, /<VmessRelationshipFields/);
    assert.match(editorSource, /from ['"]\.\/Vmess\/DnsSettings['"]/);
    assert.match(editorSource, /from ['"]\.\/Vmess\/RuleSettings['"]/);
    assert.match(editorSource, /from ['"]\.\/Vmess\/TlsSettings['"]/);
    assert.doesNotMatch(editorSource, /class DnsSettings|class RuleSettings|class TlsSettings/);
    assert.match(generalFieldsSource, /function VmessGeneralFields/);
    assert.match(relationshipFieldsSource, /function VmessRelationshipFields/);
    assert.match(networkFieldsSource, /function VmessNetworkFields/);
    assert.match(editorSource, /<VmessChildSettingsPanel/);
    assert.match(childSettingsSource, /export function VmessChildSettingsPanel/);
    assert.match(dnsSettingsSource, /export class DnsSettings/);
    assert.match(ruleSettingsSource, /export class RuleSettings/);
    assert.match(tlsSettingsSource, /export class TlsSettings/);
    await assert.rejects(
        fs.access(
            new URL(
                '../src/pages/server/manage/editors/Vmess/SettingsEditors.tsx',
                import.meta.url,
            ),
        ),
    );
    assert.doesNotMatch(editorSource, /<JsonEditor|renderChildDrawer/);
});

test('Trojan network settings use the server model value contract', async () => {
    const networkSource = await fs.readFile(
        new URL('../src/pages/server/manage/editors/Trojan/NetworkSettings.tsx', import.meta.url),
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
        new URL('../src/pages/server/manage/editors/VlessEditor.tsx', import.meta.url),
        'utf8',
    );
    const generalFieldsSource = await fs.readFile(
        new URL('../src/pages/server/manage/editors/Vless/GeneralFields.tsx', import.meta.url),
        'utf8',
    );
    const relationshipFieldsSource = await fs.readFile(
        new URL('../src/pages/server/manage/editors/Vless/RelationshipFields.tsx', import.meta.url),
        'utf8',
    );
    const childSettingsSource = await fs.readFile(
        new URL('../src/pages/server/manage/editors/Vless/ChildSettingsPanel.tsx', import.meta.url),
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
    const storeTypes = await fs.readFile(
        new URL('../src/types/storeContracts.ts', import.meta.url),
        'utf8',
    );
    const routerTypes = await fs.readFile(
        new URL('../src/types/routerContracts.ts', import.meta.url),
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
