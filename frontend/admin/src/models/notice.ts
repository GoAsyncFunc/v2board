import { get, isSuccessfulResponse, post, type ApiResponse, type FormRecord } from '../services/request';
import type { NoticeRecord } from '../components/NoticeDisplayColumns';
import type { AdminAction } from '../types/store';
import type { ModelEffect, PutEffectTools } from '../types/effects';
import type { NoticeState } from '../types/notice';

interface NoticeEffectTools extends PutEffectTools {}

interface NoticeIdAction { id: string | number; }
interface SaveNoticeAction { params: FormRecord; callback?: () => void; }
type NoticeEffect = ModelEffect<ApiResponse<NoticeRecord[]>>;

const initialState: NoticeState = { notices: [], fetchLoading: false };

export default {
  name: 'notice',
  state: { ...initialState },
  reducers: {
    setState(state: NoticeState, { payload }: { payload: Partial<NoticeState> }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *fetch(_: AdminAction, { put }: NoticeEffectTools): NoticeEffect {
      yield put({ type: 'setState', payload: { fetchLoading: true } });
      const response = yield get<NoticeRecord[]>(`/${window.settings.secure_path}/notice/fetch`);
      yield put({ type: 'setState', payload: { fetchLoading: false } });
      if (isSuccessfulResponse(response)) yield put({ type: 'setState', payload: { notices: response.data } });
    },
    *save({ params, callback }: SaveNoticeAction, { put }: NoticeEffectTools): NoticeEffect {
      yield put({ type: 'setState', payload: { saveLoading: true } });
      const response = yield post<NoticeRecord[]>(`/${window.settings.secure_path}/notice/save`, params);
      yield put({ type: 'setState', payload: { saveLoading: false } });
      if (!isSuccessfulResponse(response)) return;
      yield put({ type: 'fetch' });
      callback?.();
    },
    *drop({ id }: NoticeIdAction, { put }: NoticeEffectTools): NoticeEffect {
      const response = yield post<NoticeRecord[]>(`/${window.settings.secure_path}/notice/drop`, { id });
      if (isSuccessfulResponse(response)) yield put({ type: 'fetch' });
    },
    *show({ id }: NoticeIdAction, { put }: NoticeEffectTools): NoticeEffect {
      const response = yield post<NoticeRecord[]>(`/${window.settings.secure_path}/notice/show`, { id });
      if (isSuccessfulResponse(response)) yield put({ type: 'fetch' });
    },
  },
};
