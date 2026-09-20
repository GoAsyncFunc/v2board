import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { connect } from 'react-redux';
import Table from 'antd/lib/table';
import LoadingContainer from '../components/LoadingContainer';
import { createReadonlyQueueColumns, type QueueWorkload } from '../components/QueueDisplayColumns';
import type { SystemMonitoringState } from '../types/monitoring';
import type { AdminDispatch } from '../types/store';

interface QueuePageProps {
  dispatch: AdminDispatch;
  system: Required<Pick<SystemMonitoringState, 'queueStats' | 'queueWorkload'>>;
  [key: string]: unknown;
}

interface QueueRootState {
  system: QueuePageProps['system'];
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
          <div className="block block-rounded">
            <div className="block-header block-header-default">
              <h3 className="block-title">总览</h3>
            </div>
            <div className="block-content p-0">
              <div className="row no-gutters">
                <div className="col-lg-6 col-xl-3 border-right p-4 border-bottom">
                  <div>当前作业量</div>
                  <div className="mt-4 font-size-h3">{queueStats?.jobsPerMinute || '0'}</div>
                </div>
                <div className="col-lg-6 col-xl-3 border-right p-4 border-bottom">
                  <div>近一小时处理量</div>
                  <div className="mt-4 font-size-h3">{queueStats?.recentJobs || '0'}</div>
                </div>
                <div className="col-lg-6 col-xl-3 border-right p-4 border-bottom">
                  <div>7日内报错数量</div>
                  <div className="mt-4 font-size-h3">{queueStats?.failedJobs || '0'}</div>
                </div>
                <div className="col-lg-6 col-xl-3 p-4 border-bottom overflow-hidden">
                  <div>状态</div>
                  <div className="mt-4 font-size-h3">
                    {queueStats && (queueStats.status ? '运行中' : '未启动')}
                  </div>
                  {queueStats && (
                    <i
                      className={`si ${queueStats.status ? 'si-check text-success' : 'si-close text-danger'}`}
                      style={{ position: 'absolute', fontSize: 100, right: -20, bottom: -20 }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </LoadingContainer>
        <LoadingContainer loading={!queueWorkload}>
          <div className="block block-rounded">
            <div className="block-header block-header-default">
              <h3 className="block-title">当前作业详情</h3>
            </div>
            <div className="block-content p-0">
              <Table<QueueWorkload>
                columns={createReadonlyQueueColumns()}
                dataSource={queueWorkload ? queueWorkload.filter(queue => queue.name !== 'default') : undefined}
                pagination={false}
              />
            </div>
          </div>
        </LoadingContainer>
      </MainLayout>
    );
  }
}

export default connect((state: QueueRootState) => ({ system: state.system }))(QueuePage);
