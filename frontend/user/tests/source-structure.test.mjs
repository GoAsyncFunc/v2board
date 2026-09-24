import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

test('user business components live outside the vendor compatibility layer', async () => {
    const componentsDirectory = new URL('../src/components/', import.meta.url);
    const componentEntries = await fs.readdir(componentsDirectory, { withFileTypes: true });
    const expectedDomains = [
        'account',
        'auth',
        'commerce',
        'common',
        'dashboard',
        'subscription',
        'support',
    ];
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

    for (const domain of expectedDomains) {
        const componentNames = await fs.readdir(new URL(`${domain}/`, componentsDirectory));
        assert.ok(
            componentNames.some((name) => /\.tsx?$/.test(name)),
            `${domain} should contain at least one component`,
        );
    }
    await fs.access(new URL('commerce/checkout/', componentsDirectory));

    const componentPaths = [
        '../src/components/auth/AuthBrand.tsx',
        '../src/components/auth/AuthPageShell.tsx',
        '../src/components/auth/RegistrationForm.tsx',
        '../src/components/common/Recaptcha.tsx',
        '../src/components/subscription/SubscribeImporter.tsx',
        '../src/components/subscription/checkout/PlanOrderSidebar.tsx',
        '../src/components/subscription/checkout/PlanPurchaseDetails.tsx',
        '../src/components/account/TelegramBindModal.tsx',
        '../src/components/dashboard/DashboardSubscription.tsx',
        '../src/components/dashboard/DashboardNoticeSection.tsx',
        '../src/components/common/LoadingContainer.tsx',
        '../src/components/commerce/checkout/StripePaymentForm.tsx',
    ];
    for (const relativePath of componentPaths) {
        const source = await fs.readFile(new URL(relativePath, import.meta.url), 'utf8');
        assert.match(source, /export default/);
    }

    const removedVendorPaths = [
        '../src/vendor/features.js',
        '../src/vendor/features',
        '../src/vendor/featureRuntime.js',
        '../src/vendor/loadingIndicator.js',
        '../src/vendor/payment.js',
        '../src/vendor/Divider.js',
        '../src/vendor/Icon.js',
        '../src/vendor/Modal.js',
        '../src/vendor/clipboard.js',
        '../src/vendor/dateTime.js',
        '../src/vendor/iconStyles.js',
        '../src/vendor/notification.js',
        '../src/vendor/reactRedux.js',
        '../src/vendor/router.js',
        '../src/vendor/theme.js',
        '../src/vendor/routerHistory.js',
        '../src/vendor/content.js',
        '../src/vendor/subscribeStyles.js',
        '../src/vendor/utilities.js',
        '../src/vendor/ui.js',
        '../src/vendor/siteHelpers.js',
        '../src/vendor/siteHelpers.d.ts',
        '../src/vendor/localeSettings.js',
        '../src/vendor/i18n.js',
        '../src/vendor/i18n.d.ts',
        '../src/vendor/locales.js',
        '../src/vendor/appDvaConfig.js',
        '../src/vendor/appRuntime.js',
        '../src/vendor/dva.js',
        '../src/vendor/rootRuntime.js',
        '../src/vendor/routerRuntime.js',
    ];
    for (const relativePath of removedVendorPaths) {
        await assert.rejects(fs.access(new URL(relativePath, import.meta.url)));
    }
});

test('user route definitions live in the dedicated routes directory', async () => {
    const routeSource = await fs.readFile(
        new URL('../src/routes/index.ts', import.meta.url),
        'utf8',
    );
    assert.match(routeSource, /export interface UserRoute/);
    assert.match(routeSource, /path: '\/dashboard'/);
    assert.match(routeSource, /path: '\/order\/:trade_no'/);
    await assert.rejects(fs.access(new URL('../src/app/routes.ts', import.meta.url)));
});

test('user pages are grouped by business domain without migration scripts', async () => {
    const pagesDirectory = new URL('../src/pages/', import.meta.url);
    const pageEntries = await fs.readdir(pagesDirectory, { withFileTypes: true });
    const expectedDomains = ['account', 'auth', 'commerce', 'dashboard', 'subscription', 'support'];
    assert.deepEqual(
        pageEntries
            .filter((entry) => entry.isDirectory())
            .map((entry) => entry.name)
            .sort(),
        expectedDomains,
    );
    assert.deepEqual(
        pageEntries.filter((entry) => entry.isFile() && entry.name.endsWith('.tsx')),
        [],
    );

    for (const domain of expectedDomains) {
        const pageNames = await fs.readdir(new URL(`${domain}/`, pagesDirectory));
        assert.ok(
            pageNames.some((name) => name.endsWith('.tsx')),
            `${domain} should contain at least one page`,
        );
    }

    const scriptNames = await fs.readdir(new URL('../scripts/', import.meta.url));
    for (const removedScript of ['split-order-payment.mjs', 'check-page-screenshots.mjs']) {
        assert.equal(scriptNames.includes(removedScript), false);
    }
});

test('user model composition uses named business effects instead of module aliases', async () => {
    const userModel = await fs.readFile(new URL('../src/models/user.ts', import.meta.url), 'utf8');
    const orderModel = await fs.readFile(
        new URL('../src/models/order.ts', import.meta.url),
        'utf8',
    );
    const orderEffects = await fs.readFile(
        new URL('../src/models/orderEffects.ts', import.meta.url),
        'utf8',
    );
    const accountEffects = await fs.readFile(
        new URL('../src/models/userAccountEffects.ts', import.meta.url),
        'utf8',
    );
    const subscriptionEffects = await fs.readFile(
        new URL('../src/models/userSubscriptionEffects.ts', import.meta.url),
        'utf8',
    );

    for (const source of [userModel, orderModel]) {
        assert.doesNotMatch(source, /import \* as /);
        assert.doesNotMatch(source, /\bexports\./);
    }
    for (const effect of [
        'detail',
        'check',
        'getPaymentMethod',
        'fetch',
        'save',
        'checkout',
        'checkoutByStripe',
        'cancel',
    ]) {
        assert.match(orderEffects, new RegExp(`export function\\* ${effect}\\b`));
    }
    for (const effect of [
        'update',
        'changePassword',
        'newPeriod',
        'redeemGiftcard',
        'resetSecurity',
        'transfer',
    ]) {
        assert.match(accountEffects, new RegExp(`export function\\* ${effect}\\b`));
    }
    for (const effect of ['getSubscribe', 'getStat']) {
        assert.match(subscriptionEffects, new RegExp(`export function\\* ${effect}\\b`));
    }
    assert.doesNotMatch(userModel, /\b(?:get|post)\(|window\.|history\./);

    const modelDirectory = new URL('../src/models/', import.meta.url);
    const modelNamespaces = [
        'comm',
        'coupon',
        'guest',
        'invite',
        'knowledge',
        'layout',
        'notice',
        'order',
        'passport',
        'plan',
        'server',
        'stat',
        'telegram',
        'ticket',
        'tutorial',
        'user',
    ];
    for (const namespace of modelNamespaces) {
        const source = await fs.readFile(new URL(`${namespace}.ts`, modelDirectory), 'utf8');
        assert.match(source, new RegExp(`export default\\s*{\\s*namespace: ['"]${namespace}['"]`));
        assert.doesNotMatch(source, /export default\s*{\s*name:/);
    }

    const store = await fs.readFile(new URL('../src/app/store.tsx', import.meta.url), 'utf8');
    assert.match(store, /model\.namespace !== registeredNamespace/);
    assert.match(store, /appInstance\?\.model\(model\)/);
    assert.doesNotMatch(store, /model\(\{ namespace, \.\.\.model \}\)/);
});

test('user application runtime is implemented as typed TSX components', async () => {
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
            ['@types/qrcode.react', '@types/react-intl', '@types/react-loadable'].map((name) => [
                name,
                packageJson.devDependencies[name],
            ]),
        ),
        {
            '@types/qrcode.react': '1.0.5',
            '@types/react-intl': '2.3.18',
            '@types/react-loadable': '5.5.11',
        },
    );
    await fs.access(new URL('../src/types/classnames.d.ts', import.meta.url));
    await fs.access(new URL('../src/types/dvaCore.d.ts', import.meta.url));
    await assert.rejects(fs.access(new URL('../src/types/legacyPackages.d.ts', import.meta.url)));
});

test('user DVA runtime uses named contracts instead of broad object placeholders', async () => {
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
    const loadingRuntime = await fs.readFile(
        new URL('../src/runtime/loadingPlugin.ts', import.meta.url),
        'utf8',
    );
    assert.match(storeTypes, /Action extends UserAction/);
    assert.match(dvaTypes, /export interface DvaPlugin/);
    assert.match(dvaTypes, /export type DvaEffectEnhancer/);
    assert.doesNotMatch(dvaTypes, /DvaHook|DvaReducer/);
    assert.match(dvaTypes, /setupMiddlewares\(middlewares: Middleware\[\]\)/);
    assert.doesNotMatch(loadingRuntime, /effectContext|Iterator<unknown>/);
});

test('user plugin runtime separates callable hooks from configuration values', async () => {
    const pluginRuntime = await fs.readFile(
        new URL('../src/runtime/pluginRuntime.ts', import.meta.url),
        'utf8',
    );
    const routerRuntime = await fs.readFile(
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
    assert.doesNotMatch(routerRuntime, /Record<string, PluginValue>/);
    assert.match(bootstrap, /apply<React\.ReactElement>/);
    assert.match(bootstrap, /compose<\(\) => Promise<void> \| void>/);
});

test('user root state names every registered business model', async () => {
    const storeTypes = await fs.readFile(new URL('../src/types/store.ts', import.meta.url), 'utf8');
    const rootRuntime = await fs.readFile(
        new URL('../src/app/rootRuntime.tsx', import.meta.url),
        'utf8',
    );
    const dashboard = await fs.readFile(
        new URL('../src/pages/dashboard/Dashboard.tsx', import.meta.url),
        'utf8',
    );
    assert.match(storeTypes, /export interface UserRootState/);
    for (const model of [
        'comm',
        'coupon',
        'guest',
        'invite',
        'knowledge',
        'layout',
        'notice',
        'order',
        'passport',
        'plan',
        'server',
        'stat',
        'telegram',
        'ticket',
        'tutorial',
        'user',
    ]) {
        assert.match(storeTypes, new RegExp(`\\b${model}:`));
    }
    assert.doesNotMatch(storeTypes, /UserRootState = Record<string, object>/);
    assert.match(storeTypes, /router\?: RouterState/);
    assert.match(rootRuntime, /Partial<UserRootState>/);
    assert.match(dashboard, /Pick<UserRootState/);
    for (const component of [
        'DashboardAlerts',
        'DashboardNoticeSection',
        'DashboardShortcuts',
        'DashboardSubscription',
    ]) {
        assert.match(dashboard, new RegExp(`components/dashboard/${component}`));
    }
    const dashboardNoticeSection = await fs.readFile(
        new URL('../src/components/dashboard/DashboardNoticeSection.tsx', import.meta.url),
        'utf8',
    );
    assert.match(dashboardNoticeSection, /DashboardNoticeCard/);
    assert.doesNotMatch(dashboard, /components\/subscription\/SubscribeImporter/);
    assert.doesNotMatch(dashboard, /antd\/lib\/button/);

    const profile = await fs.readFile(
        new URL('../src/pages/account/Profile.tsx', import.meta.url),
        'utf8',
    );
    for (const component of [
        'ProfileGiftcard',
        'ProfileNotificationSettings',
        'ProfilePasswordForm',
        'ProfileSecurityReset',
        'ProfileTelegram',
        'ProfileWallet',
    ]) {
        assert.match(profile, new RegExp(`components/account/profile/${component}`));
    }
    assert.doesNotMatch(profile, /antd\/lib\/(?:button|switch)/);

    const invite = await fs.readFile(
        new URL('../src/pages/account/Invite.tsx', import.meta.url),
        'utf8',
    );
    for (const component of [
        'InviteCodeManager',
        'InviteCommissionHistory',
        'InviteCommissionWallet',
        'InviteStatistics',
    ]) {
        assert.match(invite, new RegExp(`components/account/invite/${component}`));
    }

    const knowledge = await fs.readFile(
        new URL('../src/pages/support/Knowledge.tsx', import.meta.url),
        'utf8',
    );
    for (const component of ['KnowledgeArticleList', 'KnowledgeSearchBar']) {
        assert.match(knowledge, new RegExp(`components/support/${component}`));
    }
    assert.doesNotMatch(knowledge, /markdown-it|antd\/lib\/(drawer|message)/);

    const planDetail = await fs.readFile(
        new URL('../src/pages/subscription/PlanDetail.tsx', import.meta.url),
        'utf8',
    );
    for (const component of ['PlanOrderSidebar', 'PlanPurchaseDetails']) {
        assert.match(planDetail, new RegExp(`components/subscription/checkout/${component}`));
    }
    assert.doesNotMatch(
        planDetail,
        /dangerouslySetInnerHTML|components\/commerce\/checkout\/OrderSummary/,
    );
});

test('user Redux selectors share the canonical root state contract', async () => {
    const sourceRoot = new URL('../src/', import.meta.url);
    const sourceFiles = [];
    const visit = async (directory) => {
        for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
            const entryUrl = new URL(
                entry.name,
                directory.href.endsWith('/') ? directory : new URL(`${directory.href}/`),
            );
            if (entry.isDirectory()) await visit(new URL(`${entryUrl.href}/`));
            else if (/\.tsx?$/.test(entry.name)) sourceFiles.push(entryUrl);
        }
    };
    await visit(sourceRoot);

    for (const fileUrl of sourceFiles) {
        const source = await fs.readFile(fileUrl, 'utf8');
        if (!fileUrl.pathname.endsWith('/types/store.ts')) {
            assert.doesNotMatch(source, /(?:interface|type)\s+\w*RootState\b/, fileUrl.pathname);
        }
        if (!source.includes('connect(') || fileUrl.pathname.endsWith('/layouts/Sidebar.tsx'))
            continue;
        for (const selector of source.matchAll(/connect(?:<[^;]+?>)?\(\s*\(?([^=]*?)\)?\s*=>/gs)) {
            assert.match(selector[1], /UserRootState/, fileUrl.pathname);
        }
    }

    const routerTypes = await fs.readFile(
        new URL('../src/types/router.ts', import.meta.url),
        'utf8',
    );
    const routerBindings = await fs.readFile(
        new URL('../src/runtime/routerBindings.tsx', import.meta.url),
        'utf8',
    );
    assert.match(routerTypes, /export interface RouterState/);
    assert.match(routerBindings, /state: UserRootState/);
});

test('user model layer does not import rendering notifications', async () => {
    const modelsDirectory = new URL('../src/models/', import.meta.url);
    const modelNames = (await fs.readdir(modelsDirectory)).filter((name) => name.endsWith('.ts'));
    for (const modelName of modelNames) {
        const source = await fs.readFile(new URL(modelName, modelsDirectory), 'utf8');
        assert.doesNotMatch(
            source,
            /from ['"]antd\/lib\/(?:message|notification|modal)['"]/,
            `${modelName} imports a rendering notification`,
        );
        assert.doesNotMatch(
            source,
            /from ['"]\.\.\/app\/notifications['"]/,
            `${modelName} imports the application notification presenter`,
        );
    }
});

test('user transport and utility layers are presentation independent', async () => {
    const requestSource = await fs.readFile(
        new URL('../src/services/request.ts', import.meta.url),
        'utf8',
    );
    const helperSource = await fs.readFile(
        new URL('../src/utils/siteHelpers.ts', import.meta.url),
        'utf8',
    );
    const notificationSource = await fs.readFile(
        new URL('../src/app/notifications.ts', import.meta.url),
        'utf8',
    );
    const requestPresentationSource = await fs.readFile(
        new URL('../src/app/requestPresentation.ts', import.meta.url),
        'utf8',
    );
    assert.doesNotMatch(requestSource, /from ['"]antd\//);
    assert.doesNotMatch(requestSource, /\bnotify\(/);
    assert.doesNotMatch(helperSource, /from ['"]antd\//);
    assert.doesNotMatch(helperSource, /export function notify/);
    assert.match(notificationSource, /from ['"]antd\/lib\/notification['"]/);
    assert.match(requestPresentationSource, /setRequestFailurePresenter/);
});
