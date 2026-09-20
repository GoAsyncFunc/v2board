import { get } from '../services/request';

export default {
  name: '使用文档',
  state: { knowledges: {}, knowledge: {}, fetchByIdLoading: false, categorys: [], fetchLoading: false },
  reducers: {
    setState(state, { payload }) { return { ...state, ...payload }; },
  },
  effects: {
    *fetch({ language, keyword }, { put }) {
      yield put({ type: 'setState', payload: { fetchLoading: true } });
      const response = yield get('/user/knowledge/fetch', { language, keyword });
      yield put({ type: 'setState', payload: { fetchLoading: false } });
      if (response.code === 200) yield put({ type: 'setState', payload: { knowledges: response.data } });
    },
    *fetchById({ id, language }, { put }) {
      yield put({ type: 'setState', payload: { fetchByIdLoading: true } });
      const response = yield get('/user/knowledge/fetch', { id, language });
      yield put({ type: 'setState', payload: { fetchByIdLoading: false } });
      if (response.code === 200) yield put({ type: 'setState', payload: { knowledge: response.data } });
    },
  },
};
