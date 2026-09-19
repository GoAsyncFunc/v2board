import { notification } from '../vendor/ui.js';

import { get, post } from '../services/request.js';

import '../vendor/componentStyles.js';
const initialState = {
  tickets: [],
  fetchLoading: false,
  ticket: { message: [] },
  pagination: { pageSize: 10, current: 1 },
  filter: { status: 0 },
  replyLoading: false,
};

export default {
  name: 'ticket',
  state: { ...initialState },
  reducers: {
    setState(state, { payload }) { return { ...state, ...payload }; },
  },
  effects: {
    *fetch(_, { put, select }) {
      const ticketState = yield select(state => state.ticket);
      const { pagination, filter } = ticketState;
      yield put({ type: 'setState', payload: { fetchLoading: true } });
      const response = yield get(`/${window.settings.secure_path}/ticket/fetch`, { ...pagination, ...filter });
      yield put({ type: 'setState', payload: { fetchLoading: false } });
      if (response.code !== 200) return;
      yield put({ type: 'setState', payload: {
        tickets: response.data,
        pagination: { ...pagination, total: response.total },
      } });
    },
    *fetchById({ id }, { put, select }) {
      const response = yield get(`/${window.settings.secure_path}/ticket/fetch`, { id });
      if (response.code !== 200) return;
      yield put({ type: 'setState', payload: { ticket: response.data } });
      const userState = yield select(state => state.user);
      if (!userState.user.id) yield put({ type: 'user/getUserInfoById', id: response.data.user_id });
    },
    *close({ id }, { put }) {
      const response = yield post(`/${window.settings.secure_path}/ticket/close`, { id });
      if (response.code === 200) yield put({ type: 'fetch' });
    },
    *reply({ id, msg, callback }, { put }) {
      notification.loading('发送中');
      yield put({ type: 'setState', payload: { replyLoading: true } });
      const response = yield post(`/${window.settings.secure_path}/ticket/reply`, { id, message: msg });
      yield put({ type: 'setState', payload: { replyLoading: false } });
      notification.destroy();
      if (response.code !== 200) return;
      yield put({ type: 'fetchById', id });
      if (typeof callback === 'function') callback();
    },
    *filter({ pagination, filter }, { put, select }) {
      const ticketState = yield select(state => state.ticket);
      yield put({ type: 'setState', payload: {
        pagination: { ...ticketState.pagination, ...pagination },
        filter: { ...ticketState.filter, ...filter },
      } });
      yield put({ type: 'fetch' });
    },
  },
};
