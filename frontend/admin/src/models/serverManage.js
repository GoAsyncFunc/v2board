import { get, post } from '../services/request.js';

const initialState = {
  servers: [],
  fetchLoading: false,
  sortMode: false,
};

export default {
  name: 'serverManage',
  state: { ...initialState },
  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getNodes(_, { put }) {
      yield put({ type: 'setState', payload: { fetchLoading: true } });
      const response = yield get(`/${window.settings.secure_path}/server/manage/getNodes`);
      yield put({ type: 'setState', payload: { fetchLoading: false } });
      if (response.code !== 200) return;
      yield put({ type: 'setState', payload: { servers: response.data, sortMode: false } });
    },
    *sort({ fromIndex, toIndex }, { put, select }) {
      const serverState = yield select(state => state.serverManage);
      const servers = serverState.servers;
      if (fromIndex < toIndex) {
        servers.splice(toIndex + 1, 0, servers[fromIndex]);
        servers.splice(fromIndex, 1);
      } else {
        servers.splice(toIndex, 0, servers[fromIndex]);
        servers.splice(fromIndex + 1, 1);
      }
      yield put({ type: 'setState', payload: { servers } });
    },
    *saveSort(_, { select, put }) {
      yield put({ type: 'setState', payload: { fetchLoading: true } });
      const serverState = yield select(state => state.serverManage);
      const sort = {};
      serverState.servers.forEach((server, index) => {
        if (typeof sort[server.type] !== 'object') sort[server.type] = {};
        sort[server.type][server.id] = index;
      });
      const response = yield post(`/${window.settings.secure_path}/server/manage/sort`, sort, true);
      yield put({ type: 'setState', payload: { fetchLoading: false } });
      if (response.code !== 200) return;
      yield put({ type: 'getNodes' });
    },
  },
};
