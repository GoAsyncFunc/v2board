import { get, isSuccessfulResponse, type ApiResponse } from '../services/request';
import type { QueueWorkload } from '../components/QueueDisplayColumns';
import type { QueueStats, SystemMonitoringState } from '../types/monitoring';
import type { AdminAction } from '../types/store';
import type { ModelEffect, PutEffectTools } from '../types/effects';

interface SystemEffectTools extends PutEffectTools {}

type QueueStatsEffect = ModelEffect<ApiResponse<QueueStats>>;
type QueueWorkloadEffect = ModelEffect<ApiResponse<QueueWorkload[]>>;

export default {
  name: 'system',
  state: {},
  reducers: {
    save(state: SystemMonitoringState, { payload }: { payload: Partial<SystemMonitoringState> }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getQueueStats(_: AdminAction, { put }: SystemEffectTools): QueueStatsEffect {
      yield put({ type: 'save', payload: { getQueueStatsLoading: true } });
      const response = yield get<QueueStats>(`/${window.settings.secure_path}/system/getQueueStats`);
      yield put({ type: 'save', payload: { getQueueStatsLoading: false } });
      if (isSuccessfulResponse(response)) yield put({ type: 'save', payload: { queueStats: response.data } });
    },
    *getQueueWorkload(_: AdminAction, { put }: SystemEffectTools): QueueWorkloadEffect {
      yield put({ type: 'save', payload: { getQueueWorkloadLoading: true } });
      const response = yield get<QueueWorkload[]>(`/${window.settings.secure_path}/system/getQueueWorkload`);
      yield put({ type: 'save', payload: { getQueueWorkloadLoading: false } });
      if (isSuccessfulResponse(response)) yield put({ type: 'save', payload: { queueWorkload: response.data } });
    },
  },
};
