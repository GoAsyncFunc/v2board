import { notification } from '../vendor/ui.js';
import history from '../vendor/routerHistory.js';
import { get, post } from '../services/request';

const initialState = {
  tickets: [],
  ticket: { message: [] },
  fetchLoading: false,
  saveLoading: false,
  replyLoading: false,
  newTicketModalVisible: false,
  saveData: {},
  replyData: {},
};

export default {
  name: 'ticket',
  state: { ...initialState },
  reducers: {
    setState(state, { payload }) { return { ...state, ...payload }; },
    empty() { return { ...initialState }; },
  },
  effects: {
    *fetch(_, { put }) {
      yield put({ type: 'setState', payload: { fetchLoading: true } });
      const response = yield get('/user/ticket/fetch');
      yield put({ type: 'setState', payload: { fetchLoading: false } });
      if (response.code === 200) yield put({ type: 'setState', payload: { tickets: response.data } });
    },
    *fetchById({ id }, { put }) {
      const response = yield get('/user/ticket/fetch', { id });
      if (response.code === 200) yield put({ type: 'setState', payload: { ticket: response.data } });
    },
    *close({ id }, { put }) {
      const response = yield post('/user/ticket/close', { id });
      if (response.code === 200) yield put({ type: 'fetch' });
    },
    *save(_, { put, select }) {
      const ticketState = yield select(state => state.ticket);
      const response = yield post('/user/ticket/save', ticketState.saveData);
      if (response.code !== 200) return;
      yield put({ type: 'setState', payload: { saveData: {}, newTicketModalVisible: false } });
      yield put({ type: 'fetch' });
    },
    *reply({ id, complete }, { put, select }) {
      const ticketState = yield select(state => state.ticket);
      yield put({ type: 'setState', payload: { replyLoading: true } });
      notification.loading('发送中');
      const response = yield post('/user/ticket/reply', { id, ...ticketState.replyData });
      notification.destroy();
      yield put({ type: 'setState', payload: { replyLoading: false } });
      if (response.code !== 200) return;
      notification.success('发送成功');
      yield put({ type: 'setState', payload: { replyData: {} } });
      complete();
    },
    *withdraw({ withdrawAccount, withdrawMethod, callback }) {
      const response = yield post('/user/ticket/withdraw', {
        withdraw_account: withdrawAccount,
        withdraw_method: withdrawMethod,
      });
      if (response.code !== 200) return;
      history.push('/ticket');
      if (typeof callback === 'function') callback();
    },
  },
};
