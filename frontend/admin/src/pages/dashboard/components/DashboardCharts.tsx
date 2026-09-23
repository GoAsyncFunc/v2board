import React from 'react';
import * as echarts from 'echarts/core';
import type { EChartsType } from 'echarts/core';
import { BarChart, LineChart } from 'echarts/charts';
import {
    DatasetComponent,
    GridComponent,
    LegendComponent,
    TooltipComponent,
    TransformComponent,
} from 'echarts/components';
import { LabelLayout } from 'echarts/features';
import { SVGRenderer } from 'echarts/renderers';
import DashboardOverview from './DashboardOverview';
import { createRankChartOption, RankChart } from './DashboardServerRank';
import { createOrderChartOption } from '../chartOptions';
import type { DashboardStats, OrderChartRecord, RankChartRecord } from '../../../types/monitoring';
import type { AdminDispatch } from '../../../types/store';

echarts.use([
    LineChart,
    BarChart,
    GridComponent,
    TooltipComponent,
    LegendComponent,
    DatasetComponent,
    TransformComponent,
    LabelLayout,
    SVGRenderer,
]);

export interface DashboardChartsHandle {
    loadCharts(): void;
    resizeCharts(): void;
}

interface DashboardChartsProps {
    currency?: string;
    dispatch: AdminDispatch;
    stat: DashboardStats;
}

export default class DashboardCharts
    extends React.Component<DashboardChartsProps>
    implements DashboardChartsHandle
{
    orderChart = React.createRef<HTMLDivElement>();
    serverLastRankChart = React.createRef<HTMLDivElement>();
    serverTodayRankChart = React.createRef<HTMLDivElement>();
    userTodayRankChart = React.createRef<HTMLDivElement>();
    userLastRankChart = React.createRef<HTMLDivElement>();
    orderChartObject?: EChartsType;
    serverLastRankChartObject?: EChartsType;
    serverTodayRankChartObject?: EChartsType;
    userTodayRankChartObject?: EChartsType;
    userLastRankChartObject?: EChartsType;

    renderOrderChart(data: OrderChartRecord[]): void {
        this.orderChartObject = echarts.init(this.orderChart.current, 'vintage', {
            renderer: 'svg',
        });
        this.orderChartObject.setOption(createOrderChartOption(data));
    }

    renderRankChart(
        ref: React.RefObject<HTMLDivElement>,
        propertyName:
            | 'serverLastRankChartObject'
            | 'serverTodayRankChartObject'
            | 'userTodayRankChartObject'
            | 'userLastRankChartObject',
        data: RankChartRecord[],
        getLabel: (item: RankChartRecord) => string | undefined,
    ): void {
        const chart = echarts.init(ref.current);
        this[propertyName] = chart;
        chart.setOption(createRankChartOption(data, getLabel));
    }

    loadCharts(): void {
        const { dispatch } = this.props;
        dispatch({
            type: 'stat/getOrder',
            complete: (data: OrderChartRecord[]) => this.renderOrderChart(data),
        });
        dispatch({
            type: 'stat/getServerLastRank',
            complete: (data: RankChartRecord[]) =>
                this.renderRankChart(
                    this.serverLastRankChart,
                    'serverLastRankChartObject',
                    data,
                    (item) => item.server_name,
                ),
        });
        dispatch({
            type: 'stat/getServerTodayRank',
            complete: (data: RankChartRecord[]) =>
                this.renderRankChart(
                    this.serverTodayRankChart,
                    'serverTodayRankChartObject',
                    data,
                    (item) => item.server_name,
                ),
        });
        dispatch({
            type: 'stat/getUserTodayRank',
            complete: (data: RankChartRecord[]) =>
                this.renderRankChart(
                    this.userTodayRankChart,
                    'userTodayRankChartObject',
                    data,
                    (item) => item.email,
                ),
        });
        dispatch({
            type: 'stat/getUserLastRank',
            complete: (data: RankChartRecord[]) =>
                this.renderRankChart(
                    this.userLastRankChart,
                    'userLastRankChartObject',
                    data,
                    (item) => item.email,
                ),
        });
    }

    resizeCharts(): void {
        [
            this.orderChartObject,
            this.serverLastRankChartObject,
            this.serverTodayRankChartObject,
            this.userTodayRankChartObject,
            this.userLastRankChartObject,
        ].forEach((chart) => chart?.resize());
    }

    render(): React.ReactElement {
        const { currency, stat } = this.props;
        return (
            <>
                <DashboardOverview stat={stat} currency={currency} orderChart={this.orderChart} />
                <div className="row mt-xl-3">
                    <RankChart
                        title="今日节点流量排行"
                        chartRef={this.serverTodayRankChart}
                        extraClass="pr-xl-1"
                    />
                    <RankChart title="昨日节点流量排行" chartRef={this.serverLastRankChart} />
                    <RankChart
                        title="今日用户流量排行"
                        chartRef={this.userTodayRankChart}
                        extraClass="pr-xl-1"
                    />
                    <RankChart title="昨日用户流量排行" chartRef={this.userLastRankChart} />
                </div>
            </>
        );
    }
}
