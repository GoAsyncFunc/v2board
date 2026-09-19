import { getPreference } from '../vendor/siteHelpers.js';
import * as session from './sessionEffects.js';
import * as queries from './userQueryEffects.js';
import * as mutations from './userMutationEffects.js';
import * as exports from './userExportEffects.js';

import '../vendor/componentStyles.js';
const initialState = {
  userInfo: {}, getUserInfoLoading: false,
  pagination: { pageSize: getPreference('user_manage_page_size') || 10, current: 1 },
  filter: [], users: [], fetchLoading: false, user: {}, sort: {},
  generateLoading: false, sendMailLoading: false,
};
export default {
  name: 'user',
  state: { ...initialState },
  reducers: {
    setState(state, { payload }) { return { ...state, ...payload }; },
    empty(state) { return { ...initialState, userInfo: state.userInfo }; },
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
