import { get } from '../services/request';
import { isSuccessfulResponse, type ApiResponse } from '../types/api';
import type { DashboardStats, OrderChartRecord, RankChartRecord } from '../types/monitoring';
import type { AdminAction } from '../types/store';
import type { ModelEffect, PutEffectTools } from '../types/effects';

interface StatEffectTools extends PutEffectTools {}

interface CompleteAction<Data> {
  complete(data: Data): void;
}

type StatEffect<Data> = ModelEffect<ApiResponse<Data>>;

function statEndpoint(action: string): string {
  return `/${window.settings.secure_path}/stat/${action}`;
}

export default {
  name: 'stat',
  state: {},
  reducers: {
    save(state: DashboardStats, { payload }: { payload: Partial<DashboardStats> }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getOverride(_: AdminAction, { put }: StatEffectTools): StatEffect<DashboardStats> {
      const response = yield get<DashboardStats>(statEndpoint('getOverride'));
      if (isSuccessfulResponse(response)) yield put({ type: 'save', payload: { ...response.data } });
    },
    *getOrder({ complete }: CompleteAction<OrderChartRecord[]>): StatEffect<OrderChartRecord[]> {
      const response = yield get<OrderChartRecord[]>(statEndpoint('getOrder'));
      if (isSuccessfulResponse(response)) complete(response.data);
    },
    *getServerLastRank({ complete }: CompleteAction<RankChartRecord[]>): StatEffect<RankChartRecord[]> {
      const response = yield get<RankChartRecord[]>(statEndpoint('getServerLastRank'));
      if (isSuccessfulResponse(response)) complete(response.data);
    },
    *getServerTodayRank({ complete }: CompleteAction<RankChartRecord[]>): StatEffect<RankChartRecord[]> {
      const response = yield get<RankChartRecord[]>(statEndpoint('getServerTodayRank'));
      if (isSuccessfulResponse(response)) complete(response.data);
    },
    *getUserTodayRank({ complete }: CompleteAction<RankChartRecord[]>): StatEffect<RankChartRecord[]> {
      const response = yield get<RankChartRecord[]>(statEndpoint('getUserTodayRank'));
      if (isSuccessfulResponse(response)) complete(response.data);
    },
    *getUserLastRank({ complete }: CompleteAction<RankChartRecord[]>): StatEffect<RankChartRecord[]> {
      const response = yield get<RankChartRecord[]>(statEndpoint('getUserLastRank'));
      if (isSuccessfulResponse(response)) complete(response.data);
    },
  },
};
