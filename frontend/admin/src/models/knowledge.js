import { get, post } from '../services/request';

const initialState = {
  knowledges: [],
  fetchLoading: false,
  categorys: [],
  knowledge: {},
  fetchByIdLoading: false,
  saveLoading: false,
};

export default {
  name: 'knowledge',
  state: { ...initialState },
  reducers: {
    setState(state, { payload }) { return { ...state, ...payload }; },
  },
  effects: {
    *fetch(_, { put }) {
      yield put({ type: 'setState', payload: { fetchLoading: true } });
      const response = yield get(`/${window.settings.secure_path}/knowledge/fetch`);
      yield put({ type: 'setState', payload: { fetchLoading: false } });
      if (response.code === 200) yield put({ type: 'setState', payload: { knowledges: response.data } });
    },
    *fetchById({ id }, { put }) {
      yield put({ type: 'setState', payload: { fetchByIdLoading: true } });
      const response = yield get(`/${window.settings.secure_path}/knowledge/fetch`, { id });
      yield put({ type: 'setState', payload: { fetchByIdLoading: false } });
      if (response.code === 200) yield put({ type: 'setState', payload: { knowledge: response.data } });
    },
    *save({ callback }, { put, select }) {
      const knowledgeState = yield select(state => state.knowledge);
      yield put({ type: 'setState', payload: { saveLoading: true } });
      const response = yield post(`/${window.settings.secure_path}/knowledge/save`, { ...knowledgeState.knowledge });
      yield put({ type: 'setState', payload: { saveLoading: false } });
      if (response.code !== 200) return;
      yield put({ type: 'fetch' });
      if (typeof callback === 'function') callback();
    },
    *drop({ id }, { put }) {
      const response = yield post(`/${window.settings.secure_path}/knowledge/drop`, { id });
      if (response.code === 200) yield put({ type: 'fetch' });
    },
    *show({ id }, { put }) {
      const response = yield post(`/${window.settings.secure_path}/knowledge/show`, { id });
      if (response.code === 200) yield put({ type: 'fetch' });
    },
    *sort({ fromIndex, toIndex }, { select, put }) {
      yield put({ type: 'setState', payload: { fetchLoading: true } });
      const knowledgeState = yield select(state => state.knowledge);
      const knowledges = knowledgeState.knowledges;
      if (fromIndex < toIndex) {
        knowledges.splice(toIndex + 1, 0, knowledges[fromIndex]);
        knowledges.splice(fromIndex, 1);
      } else {
        knowledges.splice(toIndex, 0, knowledges[fromIndex]);
        knowledges.splice(fromIndex + 1, 1);
      }
      yield put({ type: 'setState', payload: { knowledges } });
      const response = yield post(`/${window.settings.secure_path}/knowledge/sort`, {
        knowledge_ids: knowledges.map(knowledge => knowledge.id),
      });
      if (response.code === 200) yield put({ type: 'fetch' });
    },
    *getCategory(_, { put }) {
      const response = yield get(`/${window.settings.secure_path}/knowledge/getCategory`);
      if (response.code === 200) yield put({ type: 'setState', payload: { categorys: response.data } });
    },
  },
};
