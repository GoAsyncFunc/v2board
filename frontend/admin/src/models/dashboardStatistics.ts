import { get } from '../services/request';
import { isSuccessfulResponse, type ApiResponse } from '../types/api';
import type { DashboardStats, OrderChartRecord, RankChartRecord } from '../types/monitoring';
import type { AdminAction } from '../types/store';
import type { ModelEffect, PutEffectTools } from '../types/effects';

interface DashboardStatisticsEffectTools extends PutEffectTools {}

interface CompleteAction<Data> {
    complete(data: Data): void;
}

type DashboardStatisticsEffect<Data> = ModelEffect<ApiResponse<Data>>;

function dashboardStatisticsEndpoint(action: string): string {
    return `/${window.settings.secure_path}/stat/${action}`;
}

export default {
    namespace: 'stat',
    state: {},
    reducers: {
        save(state: DashboardStats, { payload }: { payload: Partial<DashboardStats> }) {
            return { ...state, ...payload };
        },
    },
    effects: {
        *getOverride(
            _: AdminAction,
            { put }: DashboardStatisticsEffectTools,
        ): DashboardStatisticsEffect<DashboardStats> {
            const response = yield get<DashboardStats>(dashboardStatisticsEndpoint('getOverride'));
            if (isSuccessfulResponse(response))
                yield put({ type: 'save', payload: { ...response.data } });
        },
        *getOrder({
            complete,
        }: CompleteAction<OrderChartRecord[]>): DashboardStatisticsEffect<OrderChartRecord[]> {
            const response = yield get<OrderChartRecord[]>(dashboardStatisticsEndpoint('getOrder'));
            if (isSuccessfulResponse(response)) complete(response.data);
        },
        *getServerLastRank({
            complete,
        }: CompleteAction<RankChartRecord[]>): DashboardStatisticsEffect<RankChartRecord[]> {
            const response = yield get<RankChartRecord[]>(
                dashboardStatisticsEndpoint('getServerLastRank'),
            );
            if (isSuccessfulResponse(response)) complete(response.data);
        },
        *getServerTodayRank({
            complete,
        }: CompleteAction<RankChartRecord[]>): DashboardStatisticsEffect<RankChartRecord[]> {
            const response = yield get<RankChartRecord[]>(
                dashboardStatisticsEndpoint('getServerTodayRank'),
            );
            if (isSuccessfulResponse(response)) complete(response.data);
        },
        *getUserTodayRank({
            complete,
        }: CompleteAction<RankChartRecord[]>): DashboardStatisticsEffect<RankChartRecord[]> {
            const response = yield get<RankChartRecord[]>(
                dashboardStatisticsEndpoint('getUserTodayRank'),
            );
            if (isSuccessfulResponse(response)) complete(response.data);
        },
        *getUserLastRank({
            complete,
        }: CompleteAction<RankChartRecord[]>): DashboardStatisticsEffect<RankChartRecord[]> {
            const response = yield get<RankChartRecord[]>(
                dashboardStatisticsEndpoint('getUserLastRank'),
            );
            if (isSuccessfulResponse(response)) complete(response.data);
        },
    },
};
