import { getPreference } from '@/utils/siteHelpers';
import {
    addFilter as addUserFilter,
    changeTable as changeUserTable,
    fetch as fetchUsers,
    filter as filterUsers,
    getUserInfoById,
} from './userManagementEffects';
import {
    allDel as deleteFilteredUsers,
    ban as banFilteredUsers,
    delUser as deleteUser,
    resetSecret as resetUserSecret,
    sendMail as sendMailToUsers,
    update as updateUser,
    dumpCSV as exportUsersCsv,
    generate as generateUsers,
} from './userManagementEffects';
import { checkLogin, getUserInfo } from './userManagementEffects';
import type { UserModuleState } from '@/types/userContracts';

const initialState: UserModuleState = {
    userInfo: {},
    getUserInfoLoading: false,
    pagination: { pageSize: Number(getPreference('user_manage_page_size')) || 10, current: 1 },
    filter: [],
    users: [],
    fetchLoading: false,
    user: {},
    sort: {},
    generateLoading: false,
    sendMailLoading: false,
};
export default {
    namespace: 'user',
    state: { ...initialState },
    reducers: {
        setState(state: UserModuleState, { payload }: { payload: Partial<UserModuleState> }) {
            return { ...state, ...payload };
        },
        empty(state: UserModuleState) {
            return { ...initialState, userInfo: state.userInfo };
        },
    },
    effects: {
        checkLogin,
        getUserInfo,
        getUserInfoById,
        fetch: fetchUsers,
        filter: filterUsers,
        changeTable: changeUserTable,
        addFilter: addUserFilter,
        update: updateUser,
        sendMail: sendMailToUsers,
        ban: banFilteredUsers,
        resetSecret: resetUserSecret,
        delUser: deleteUser,
        allDel: deleteFilteredUsers,
        generate: generateUsers,
        dumpCSV: exportUsersCsv,
    },
};
