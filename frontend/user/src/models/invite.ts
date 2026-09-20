import message from 'antd/lib/message';
import { get, post } from '../services/request';
import type { PutEffect } from 'redux-saga/effects';
import type { ApiResponse } from '../types/api';
import type { CommissionRecord, InviteState } from '../types/invite';
import type { StateUpdate } from '../types/queryModels';

type InviteAction = StateUpdate<InviteState> | { type: 'fetch' };
interface InviteEffects { put(action: InviteAction): PutEffect<InviteAction>; }
type InviteGenerator<Data> = Generator<Promise<ApiResponse<Data>> | PutEffect<InviteAction>, void, ApiResponse<Data>>;

const initialState: InviteState = {
    invites: [],
    codes: [],
    stat: [],
    detailsLoading: false,
    fetchLoading: true,
    saveLoading: false,
    detailsPagination: { total: 0, current: 1, page_size: 10 },
};

export default {
  name: 'invite',
  state: initialState,
  reducers: {
    setState(state: InviteState, { payload }: StateUpdate<InviteState>): InviteState { return { ...state, ...payload }; },
  },
  effects: {
    *details({ current, pageSize }: { current?: number; pageSize?: number }, { put }: InviteEffects): InviteGenerator<CommissionRecord[]> {
      yield put({ type: 'setState', payload: { detailsLoading: true } });
      const response = yield get<CommissionRecord[]>('/user/invite/details', { current, page_size: pageSize });
      yield put({ type: 'setState', payload: { detailsLoading: false } });
      if (response.code === 200) yield put({ type: 'setState', payload: {
        invites: response.data!,
        detailsPagination: { current, page_size: pageSize, total: response.total! },
      } });
    },
    *fetch(_action: { type?: string }, { put }: InviteEffects): InviteGenerator<Pick<InviteState, 'codes' | 'stat'>> {
      yield put({ type: 'setState', payload: { fetchLoading: true } });
      const response = yield get<Pick<InviteState, 'codes' | 'stat'>>('/user/invite/fetch');
      yield put({ type: 'setState', payload: { fetchLoading: false } });
      if (response.code === 200) yield put({ type: 'setState', payload: { ...response.data } });
    },
    *save(_action: { type?: string }, { put }: InviteEffects): InviteGenerator<boolean> {
      yield put({ type: 'setState', payload: { saveLoading: true } });
      const response = yield post<boolean>('/user/invite/save');
      yield put({ type: 'setState', payload: { saveLoading: false } });
      if (response.code !== 200) return;
      message.success('已生成');
      yield put({ type: 'fetch' });
    },
  },
};
