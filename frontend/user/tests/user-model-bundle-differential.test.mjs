// Differential evidence for the user frontend dva models.
// Namespace -> webpack module ID (from dva bootstrap 78673550).
import assert from 'node:assert/strict';
import test from 'node:test';
import { compareUserModelEffect, plain } from './helpers/user-model-differential.mjs';

// Only test the models that are unique to the user frontend (the shared ones
// — coupon, knowledge, notice, order, stat, ticket, plan, user — are already
// covered by the admin model differentials since they use the same bundle
// modules).
const USER_MODELS = [
    { name: 'passport', bundle: '77443634.js', file: 'userPassportModel.ts' },
    { name: 'layout', bundle: '37744472.js', file: 'layoutModel.ts' },
    { name: 'comm', bundle: '45747830.js', file: 'communicationModel.ts' },
    { name: 'guest', bundle: '655a612f.js', file: 'guestAccessModel.ts' },
    { name: 'invite', bundle: '61786e66.js', file: 'invitationModel.ts' },
    { name: 'server', bundle: '38416674.js', file: 'serverCatalogModel.ts' },
    { name: 'tutorial', bundle: '6e353441.js', file: 'tutorialModel.ts' },
];

// A rich action to cover the common parameter patterns.
const GENERIC_ACTION = {
    email: 'a@x.com',
    password: 'pw',
    redirect: '/dashboard',
    id: 7,
    key: 'email',
    condition: '=',
    value: 'v',
    params: {},
};

const noop = () => {};

for (const { name, bundle, file } of USER_MODELS) {
    test(`user model ${name} effects match the bundle module`, async () => {
        const outcomes = await compareUserModelEffect({
            bundleFile: bundle,
            modelFile: file,
            action: GENERIC_ACTION,
        });
        // Both sides must have the same effect set
        assert.deepEqual(
            outcomes.recovered.effectNames.sort(),
            outcomes.original.effectNames.sort(),
            `user model ${name} effect key set diverges`,
        );
        // Compare traces per effect
        for (let i = 0; i < outcomes.original.traces.length; i++) {
            const a = plain(outcomes.recovered.traces[i].trace);
            const b = plain(outcomes.original.traces[i].trace);
            assert.deepEqual(
                a,
                b,
                `user model ${name} effect ${outcomes.original.traces[i].effect} diverges`,
            );
        }
    });
}
