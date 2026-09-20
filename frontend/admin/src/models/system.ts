import { get, type ApiResponse } from '../services/request';
import type { QueueWorkload } from '../components/QueueDisplayColumns';
import type { QueueStats, SystemMonitoringState } from '../types/monitoring';
import type { AdminAction } from '../types/store';

interface SystemEffectTools {
  put(action: AdminAction): unknown;
}

type QueueStatsEffect = Generator<unknown, void, ApiResponse<QueueStats>>;
type QueueWorkloadEffect = Generator<unknown, void, ApiResponse<QueueWorkload[]>>;

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
      if (response.code === 200) yield put({ type: 'save', payload: { queueStats: response.data } });
    },
    *getQueueWorkload(_: AdminAction, { put }: SystemEffectTools): QueueWorkloadEffect {
      yield put({ type: 'save', payload: { getQueueWorkloadLoading: true } });
      const response = yield get<QueueWorkload[]>(`/${window.settings.secure_path}/system/getQueueWorkload`);
      yield put({ type: 'save', payload: { getQueueWorkloadLoading: false } });
      if (response.code === 200) yield put({ type: 'save', payload: { queueWorkload: response.data } });
    },
  },
};
