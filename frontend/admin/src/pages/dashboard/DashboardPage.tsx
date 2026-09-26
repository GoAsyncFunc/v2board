import React from 'react';
import { connect } from 'react-redux';
import history from '@/app/navigationService';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import { get } from '@/services/apiClient';
import { siteSettings } from '@/config/siteSettings';
import type { DashboardStats } from '@/types/monitoringContracts';
import type { AdminDispatch, AdminRootState } from '@/types/storeContracts';
import DashboardAlerts from './components/DashboardAlerts';
import DashboardNavigation from './components/DashboardNavigation';
import DashboardCharts from './components/DashboardCharts';
import { createRankChartOption } from './components/DashboardServerRank';

export { createRankChartOption } from './components/DashboardServerRank';

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
    dashboardCharts = React.createRef<DashboardCharts>();

    constructor(props: DashboardProps) {
        super(props);
        this.chartResize = this.chartResize.bind(this);
    }

    chartResize(): void {
        this.dashboardCharts.current?.resizeCharts();
    }

    async componentDidMount(): Promise<void> {
        await this.checkQueue();
        this.props.dispatch({ type: 'stat/getOverride' });
        this.dashboardCharts.current?.loadCharts();
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

    render() {
        const { stat, config } = this.props;
        return (
            <MainLayout {...this.props} title="仪表盘">
                <DashboardAlerts
                    stat={stat}
                    queueStatus={this.state.queueStatus}
                    onOpenTickets={() => history.push('/ticket')}
                    onOpenCommissions={() => this.showPendingCommissionOrders()}
                />
                <DashboardNavigation />
                <DashboardCharts
                    ref={this.dashboardCharts}
                    stat={stat}
                    currency={config.site.currency}
                    dispatch={this.props.dispatch}
                />
            </MainLayout>
        );
    }
}

export default connect((state: AdminRootState) => ({ stat: state.stat, config: state.config }))(
    DashboardPage,
);
