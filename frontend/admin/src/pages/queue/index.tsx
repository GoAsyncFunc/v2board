import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { connect } from 'react-redux';
import Table from 'antd/lib/table';
import LoadingContainer from '../../components/common/LoadingContainer';
import { createReadonlyQueueColumns } from './components/QueueColumns';
import QueueOverview from './components/QueueOverview';
import type { QueueWorkload, SystemMonitoringState } from '../../types/monitoring';
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
                    <div className="block block-rounded">
                        <div className="block-header block-header-default">
                            <h3 className="block-title">当前作业详情</h3>
                        </div>
                        <div className="block-content p-0">
                            <Table<QueueWorkload>
                                columns={createReadonlyQueueColumns()}
                                dataSource={
                                    queueWorkload
                                        ? queueWorkload.filter((queue) => queue.name !== 'default')
                                        : undefined
                                }
                                pagination={false}
                            />
                        </div>
                    </div>
                </LoadingContainer>
            </MainLayout>
        );
    }
}

export default connect((state: AdminRootState) => ({ system: state.system }))(QueuePage);
