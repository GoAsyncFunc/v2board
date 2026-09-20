import { get } from '../services/request';

export default {
  name: 'stat',
  state: {},
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getOverride(_, { put }) {
      const response = yield get(`/${window.settings.secure_path}/stat/getOverride`);
      if (response.code === 200) yield put({ type: 'save', payload: { ...response.data } });
    },
    *getOrder({ complete }) {
      const response = yield get(`/${window.settings.secure_path}/stat/getOrder`);
      if (response.code === 200) complete(response.data);
    },
    *getServerLastRank({ complete }) {
      const response = yield get(`/${window.settings.secure_path}/stat/getServerLastRank`);
      if (response.code === 200) complete(response.data);
    },
    *getServerTodayRank({ complete }) {
      const response = yield get(`/${window.settings.secure_path}/stat/getServerTodayRank`);
      if (response.code === 200) complete(response.data);
    },
    *getUserTodayRank({ complete }) {
      const response = yield get(`/${window.settings.secure_path}/stat/getUserTodayRank`);
      if (response.code === 200) complete(response.data);
    },
    *getUserLastRank({ complete }) {
      const response = yield get(`/${window.settings.secure_path}/stat/getUserLastRank`);
      if (response.code === 200) complete(response.data);
    },
  },
};
