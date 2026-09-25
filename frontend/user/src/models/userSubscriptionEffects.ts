import moment from 'moment';
import { get } from '../services/request';
import { isSuccessfulResponse } from '../types/api';
import { formatBytes } from '../utils/siteHelpers';
import type { UserSubscription } from '../types/subscription';
import type { UserModelEffect, UserModelEffectTools } from '../types/userModelContracts';

export function* getSubscribe(
    _action: { type?: string },
    { put }: UserModelEffectTools,
): UserModelEffect<UserSubscription> {
    const response = yield get<UserSubscription>('/user/getSubscribe');
    if (!isSuccessfulResponse(response)) return;
    yield put({ type: 'setState', payload: { subscribe: response.data } });
    if (window.$crisp) {
        const subscription = response.data;
        window.$crisp.push([
            'set',
            'session:data',
            [
                [
                    ['Plan', subscription.plan?.name || '-'],
                    [
                        'ExpireTime',
                        moment(1000 * Number(subscription.expired_at)).format('YYYY-MM-DD'),
                    ],
                    ['UsedTraffic', formatBytes(subscription.u + subscription.d)],
                    ['AllTraffic', formatBytes(subscription.transfer_enable)],
                ],
            ],
        ]);
    }
}

export function* getStat(
    _action: { type?: string },
    { put }: UserModelEffectTools,
): UserModelEffect<number[]> {
    const response = yield get<number[]>('/user/getStat');
    if (!isSuccessfulResponse(response)) return;
    yield put({ type: 'setState', payload: { stat: response.data } });
}
