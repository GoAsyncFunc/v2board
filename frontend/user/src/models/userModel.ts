import { checkLogin, getUserInfo, logout } from './userSessionEffects';
import {
    getStat as getUsageStatistics,
    getSubscribe as getSubscription,
} from './userSubscriptionEffects';
import {
    changePassword,
    newPeriod as startNewSubscriptionPeriod,
    redeemGiftCard,
    resetSecurity,
    transfer as transferCommission,
    update as updateUserSetting,
} from './userAccountEffects';
import type { StateUpdate } from '../types/queryStateContracts';
import type { UserState } from '../types/userContracts';

const initialState: UserState = {
    subscribe: {},
    stat: [],
    userInfo: {},
    getUserInfoLoading: false,
    changePasswordLoading: false,
    resetSecurityLoading: false,
    newPeriodLoading: false,
    unbindTelegramLoading: false,
    events: [],
};

export default {
    namespace: 'user',
    state: initialState,
    reducers: {
        setState(state: UserState, { payload }: StateUpdate<UserState>): UserState {
            return { ...state, ...payload };
        },
    },
    effects: {
        checkLogin,
        getUserInfo,
        logout,
        getSubscribe: getSubscription,
        getStat: getUsageStatistics,
        update: updateUserSetting,
        changePassword,
        newPeriod: startNewSubscriptionPeriod,
        redeemgiftcard: redeemGiftCard,
        resetSecurity,
        transfer: transferCommission,
    },
};
