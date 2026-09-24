import React from 'react';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import { connect } from 'react-redux';
import LoadingContainer from '../../components/common/LoadingContainer';
import QueueOverview from './components/QueueOverview';
import QueueWorkloadTable from './components/QueueWorkloadTable';
import type { SystemMonitoringState } from '../../types/monitoring';
import type { AdminDispatch, AdminRootState } from '../../types/store';

interface QueuePageProps {
    dispatch: AdminDispatch;
    system: SystemMonitoringState;
}

export class QueuePage extends React.Component<QueuePageProps> {
    refreshTimer?: ReturnType<typeof setTimeout>;

    componentDidMount() {
        this.fetchQueueData();
    }

    componentWillUnmount() {
        if (this.refreshTimer) clearTimeout(this.refreshTimer);
    }

    fetchQueueData() {
        this.props.dispatch({ type: 'system/getQueueStats' });
        this.props.dispatch({ type: 'system/getQueueWorkload' });
        this.refreshTimer = setTimeout(() => this.fetchQueueData(), 3000);
    }

    render() {
        const { queueStats, queueWorkload } = this.props.system;
        return (
            <MainLayout {...this.props} title="队列监控">
                <LoadingContainer loading={!queueStats}>
                    <QueueOverview queueStats={queueStats} />
                </LoadingContainer>
                <LoadingContainer loading={!queueWorkload}>
                    <QueueWorkloadTable workload={queueWorkload} />
                </LoadingContainer>
            </MainLayout>
        );
    }
}

export default connect((state: AdminRootState) => ({ system: state.system }))(QueuePage);
