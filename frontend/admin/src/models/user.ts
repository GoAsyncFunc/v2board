import { getPreference } from '../utils/siteHelpers';
import * as session from './sessionEffects';
import * as queries from './userQueryEffects';
import * as mutations from './userMutationEffects';
import * as exports from './userExportEffects';
import type { UserModuleState } from '../types/user';

const initialState: UserModuleState = {
  userInfo: {}, getUserInfoLoading: false,
  pagination: { pageSize: (getPreference('user_manage_page_size') as number) || 10, current: 1 },
  filter: [], users: [], fetchLoading: false, user: {}, sort: {},
  generateLoading: false, sendMailLoading: false,
};
export default {
  name: 'user', state: { ...initialState },
  reducers: {
    setState(state: UserModuleState, { payload }: { payload: Partial<UserModuleState> }) { return { ...state, ...payload }; },
    empty(state: UserModuleState) { return { ...initialState, userInfo: state.userInfo }; },
  },
  effects: {
    checkLogin: session.checkLogin, getUserInfo: session.getUserInfo,
    getUserInfoById: queries.getUserInfoById, fetch: queries.fetch,
    filter: queries.filter, changeTable: queries.changeTable, addFilter: queries.addFilter,
    update: mutations.update, sendMail: mutations.sendMail, ban: mutations.ban,
    resetSecret: mutations.resetSecret, delUser: mutations.delUser, allDel: mutations.allDel,
    generate: exports.generate, dumpCSV: exports.dumpCSV,
  },
};
