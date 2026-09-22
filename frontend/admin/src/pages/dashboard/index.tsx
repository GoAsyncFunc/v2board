import React from 'react';
import { connect } from 'react-redux';
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
import history from '../../app/navigation';
import MainLayout from '../../layouts/MainLayout';
import { get } from '../../services/request';
import { siteSettings } from '../../config/siteSettings';
import type { DashboardStats, OrderChartRecord, RankChartRecord } from '../../types/monitoring';
import type { AdminDispatch, AdminRootState } from '../../types/store';
import DashboardNavigation from './_Nav';
import DashboardOverview from './_Overview';
import { createRankChartOption, RankChart } from './_ServerRank';
import { createOrderChartOption } from './chartOptions';

export { createRankChartOption } from './_ServerRank';

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

interface DashboardConfig {
    site: { currency?: string };
}

interface DashboardProps {
    dispatch: AdminDispatch;
    stat: DashboardStats;
    config: DashboardConfig;
}

interface DashboardState {
    queueStatus?: string;
}

export class DashboardPage extends React.Component<DashboardProps, DashboardState> {
    state: DashboardState = {};
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

    constructor(props: DashboardProps) {
        super(props);
        this.chartResize = this.chartResize.bind(this);
    }

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

    chartResize(): void {
        [
            this.orderChartObject,
            this.serverLastRankChartObject,
            this.serverTodayRankChartObject,
            this.userTodayRankChartObject,
            this.userLastRankChartObject,
        ].forEach((chart) => chart?.resize());
    }

    async componentDidMount(): Promise<void> {
        await this.checkQueue();
        this.props.dispatch({ type: 'stat/getOverride' });
        this.props.dispatch({
            type: 'stat/getOrder',
            complete: (data: OrderChartRecord[]) => this.renderOrderChart(data),
        });
        this.props.dispatch({
            type: 'stat/getServerLastRank',
            complete: (data: RankChartRecord[]) =>
                this.renderRankChart(
                    this.serverLastRankChart,
                    'serverLastRankChartObject',
                    data,
                    (item) => item.server_name,
                ),
        });
        this.props.dispatch({
            type: 'stat/getServerTodayRank',
            complete: (data: RankChartRecord[]) =>
                this.renderRankChart(
                    this.serverTodayRankChart,
                    'serverTodayRankChartObject',
                    data,
                    (item) => item.server_name,
                ),
        });
        this.props.dispatch({
            type: 'stat/getUserTodayRank',
            complete: (data: RankChartRecord[]) =>
                this.renderRankChart(
                    this.userTodayRankChart,
                    'userTodayRankChartObject',
                    data,
                    (item) => item.email,
                ),
        });
        this.props.dispatch({
            type: 'stat/getUserLastRank',
            complete: (data: RankChartRecord[]) =>
                this.renderRankChart(
                    this.userLastRankChart,
                    'userLastRankChartObject',
                    data,
                    (item) => item.email,
                ),
        });
        this.props.dispatch({ type: 'config/fetch', key: 'site' });
        window.addEventListener('resize', this.chartResize);
    }

    componentWillUnmount(): void {
        window.removeEventListener('resize', this.chartResize);
    }

    async checkQueue(): Promise<void> {
        const serviceUrl = new URL(siteSettings.serviceHost);
        const response = await get(`${serviceUrl.origin}/monitor/api/stats`);
        this.setState({
            queueStatus: typeof response?.status === 'string' ? response.status : undefined,
        });
    }

    showPendingCommissionOrders(): void {
        this.props.dispatch({ type: 'order/addFilter', key: 'status', condition: '=', value: '3' });
        this.props.dispatch({
            type: 'order/addFilter',
            key: 'commission_status',
            condition: '=',
            value: '0',
        });
        this.props.dispatch({
            type: 'order/addFilter',
            key: 'commission_balance',
            condition: '>',
            value: '0',
        });
        history.push('/order');
    }

    renderAlerts() {
        const { stat } = this.props;
        return (
            <>
                {this.state.queueStatus && this.state.queueStatus !== 'running' && (
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="alert alert-danger" role="alert">
                                <p className="mb-0">
                                    当前队列服务运行异常，可能会导致业务无法使用。
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                {Boolean(stat.ticket_pending_total) && (
                    <div className="alert alert-danger" role="alert">
                        <p className="mb-0">
                            有 {stat.ticket_pending_total} 条工单等待处理{' '}
                            <a
                                className="alert-link"
                                href="javascript:void(0)"
                                onClick={() => history.push('/ticket')}
                            >
                                立即处理
                            </a>
                        </p>
                    </div>
                )}
                {Boolean(stat.commission_pending_total) && (
                    <div className="alert alert-danger" role="alert">
                        <p className="mb-0">
                            有 {stat.commission_pending_total} 笔佣金等待确认{' '}
                            <a
                                className="alert-link"
                                href="javascript:void(0)"
                                onClick={() => this.showPendingCommissionOrders()}
                            >
                                立即处理
                            </a>
                        </p>
                    </div>
                )}
            </>
        );
    }

    render() {
        const { stat, config } = this.props;
        return (
            <MainLayout {...this.props} title="仪表盘">
                {this.renderAlerts()}
                <DashboardNavigation />
                <DashboardOverview
                    stat={stat}
                    currency={config.site.currency}
                    orderChart={this.orderChart}
                />
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
            </MainLayout>
        );
    }
}

export default connect((state: AdminRootState) => ({ stat: state.stat, config: state.config }))(
    DashboardPage,
);
