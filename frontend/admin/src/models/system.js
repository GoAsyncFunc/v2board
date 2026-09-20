import { get } from '../services/request';

export default {
  name: 'system',
  state: {},
  reducers: {
    save(state, { payload }) { return { ...state, ...payload }; },
  },
  effects: {
    *getQueueStats(_, { put }) {
      yield put({ type: 'save', payload: { getQueueStatsLoading: true } });
      const response = yield get(`/${window.settings.secure_path}/system/getQueueStats`);
      yield put({ type: 'save', payload: { getQueueStatsLoading: false } });
      if (response.code === 200) yield put({ type: 'save', payload: { queueStats: response.data } });
    },
    *getQueueWorkload(_, { put }) {
      yield put({ type: 'save', payload: { getQueueWorkloadLoading: true } });
      const response = yield get(`/${window.settings.secure_path}/system/getQueueWorkload`);
      yield put({ type: 'save', payload: { getQueueWorkloadLoading: false } });
      if (response.code === 200) yield put({ type: 'save', payload: { queueWorkload: response.data } });
    },
  },
};
