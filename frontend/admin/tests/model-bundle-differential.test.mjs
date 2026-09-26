// Differential evidence for the recovered dva models: every effect of every
// model runs against the original webpack module and the recovered TypeScript
// model, and the traced side effects (select/put/request/message/navigate/
// callback/download) must match. The bundle modules are executed unmodified
// through a minimal webpack module runtime; namespace -> module id pairs come
// from the dva bootstrap (module 78673550).
import assert from 'node:assert/strict';
import test from 'node:test';
import { compareAllModelEffects } from './helpers/model-differential.mjs';

const MODELS = [
    { name: 'coupon', bundle: '654f4378.js', file: 'couponModel.ts' },
    { name: 'knowledge', bundle: '6d484e62.js', file: 'knowledgeModel.ts' },
    { name: 'notice', bundle: '6c455476.js', file: 'noticeModel.ts' },
    { name: 'theme', bundle: '4f386f71.js', file: 'themeModel.ts' },
    { name: 'ticket', bundle: '652b396e.js', file: 'ticketModel.ts' },
    { name: 'payment', bundle: '4e395253.js', file: 'paymentModel.ts' },
    { name: 'stat', bundle: '54346762.js', file: 'dashboardStatisticsModel.ts' },
    { name: 'system', bundle: '366c4b4b.js', file: 'configurationModel.ts' },
    { name: 'queue', bundle: '67454e5a.js', file: 'queueMonitoringModel.ts' },
    { name: 'serverGroup', bundle: '5a6c4137.js', file: 'serverGroupModel.ts' },
    { name: 'serverManage', bundle: '3164442f.js', file: 'serverManagementModel.ts' },
    { name: 'serverRoute', bundle: '30666e30.js', file: 'serverRouteModel.ts' },
    { name: 'giftcard', bundle: '63616c6c676966746361726470616765.js', file: 'giftCardModel.ts' },
    {
        name: 'serverHysteria',
        bundle: '686a7764.js',
        file: 'serverProtocolModels.ts',
        exportName: 'serverHysteria',
    },
    {
        name: 'serverShadowsocks',
        bundle: '4c4d7949.js',
        file: 'serverProtocolModels.ts',
        exportName: 'serverShadowsocks',
    },
    {
        name: 'serverTrojan',
        bundle: '6c577855.js',
        file: 'serverProtocolModels.ts',
        exportName: 'serverTrojan',
    },
    {
        name: 'serverVless',
        bundle: '6e507472.js',
        file: 'serverProtocolModels.ts',
        exportName: 'serverVless',
    },
    {
        name: 'serverVmess',
        bundle: '77744472.js',
        file: 'serverProtocolModels.ts',
        exportName: 'serverVmess',
    },
];

// A rich action so parameter-driven branches take their data paths on both
// sides; each run receives a deep clone because effects mutate in place.
const GENERIC_ACTION = {
    id: 7,
    params: { type: 1, value: 10, generate_count: 2, email: 'a@x.com', title: 't' },
    pagination: { current: 2, pageSize: 50 },
    sort: {},
    key: 'email',
    condition: '=',
    value: 'v',
    filter: [{ key: 'email', condition: '=', value: 'v' }],
    title: '标题',
    content: '内容',
    status: 1,
    email: 'a@x.com',
    remark: '备注',
    states: {},
};

const plain = (value) => JSON.parse(JSON.stringify(value));

// The bundle inlines the mail-test notification content as elements while the
// recovery renders the MailTestResult component (whose row structure is
// verified in system-config-components tests); compare variant and title only.
function normalizeTrace(trace) {
    return plain(
        trace.map((entry) => {
            if (entry[0] === 'modal' || entry[0] === 'message') {
                const [kind, variant, options] = entry;
                return [kind, variant, options?.title ?? null];
            }
            return entry;
        }),
    );
}

for (const { name, bundle, file, exportName } of MODELS) {
    test(`model ${name} effects match the bundle module`, async () => {
        const outcomes = await compareAllModelEffects({
            bundleFile: bundle,
            modelFile: file,
            exportName: exportName,
            action: GENERIC_ACTION,
        });
        for (const { effect, original, recovered } of outcomes.traces) {
            assert.deepEqual(
                normalizeTrace(recovered),
                normalizeTrace(original),
                `model ${name} effect ${effect} diverges from the bundle`,
            );
        }
        assert.deepEqual(
            plain(outcomes.recoveredState),
            plain(outcomes.originalState),
            `model ${name} initial state diverges from the bundle`,
        );
    });
}
