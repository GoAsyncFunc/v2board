import React from 'react';
import MainLayout from '../layouts/MainLayout.jsx';
import { connect } from '../vendor/reactRedux.js';
import { Table, LoadingContainer } from '../vendor/ui.js';
import { createReadonlyQueueColumns } from '../components/QueueDisplayColumns.jsx';

import '../vendor/dateTime.js';
import '../vendor/siteHelpers.js';
import '../components/UserEditor.jsx';
import '../components/FilterDrawer.jsx';
import '../components/ContextMenuTable.jsx';
import '../components/ShadowsocksEditor.jsx';
import '../components/VmessEditor.jsx';
import '../components/TrojanEditor.jsx';

export class QueuePage extends React.Component {
  state = {};

  componentDidMount() {
    this.fetchQueueData();
  }

  componentWillUnmount() {
    clearTimeout(this.refreshTimer);
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
              <Table
                columns={createReadonlyQueueColumns()}
                dataSource={queueWorkload && queueWorkload.filter(queue => queue.name !== 'default')}
                pagination={false}
              />
            </div>
          </div>
        </LoadingContainer>
      </MainLayout>
    );
  }
}

export default connect(state => ({ system: state.system }))(QueuePage);
