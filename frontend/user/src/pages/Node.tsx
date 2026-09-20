import React from 'react';
import MainLayout from '../layouts/MainLayout';
import Table from 'antd/lib/table';
import { connect } from 'react-redux';
import history from '../app/routerHistory';
import { calculateUsage } from '../utils/siteHelpers';
import { formatMessage } from '../vendor/i18n.js';
import { createNodeColumns } from '../components/NodeColumns';
import type { OrderRecord } from '../types/commerce';
import type { ServerState } from '../types/queryModels';
import type { UserDispatch } from '../types/store';

import '../services/request';
const message = (id: string): string => formatMessage({ id });

interface NodePageStateProps {
  server: ServerState;
  user: { subscribe: { u: number; d: number; transfer_enable: number; plan_id?: number | null } };
  order: { orders: OrderRecord[]; fetchLoading: boolean; cancelLoading: boolean };
}

type NodePageProps = NodePageStateProps & { dispatch: UserDispatch };

export class NodePage extends React.Component<NodePageProps> {
  componentDidMount() { this.fetchData(); }
  fetchData() {
    this.props.dispatch({ type: 'user/getSubscribe' });
    this.props.dispatch({ type: 'server/fetch' });
  }
  render() {
    const { servers, fetchLoading } = this.props.server;
    const subscription = this.props.user.subscribe;
    // Retain this call while migrating; its return was unused in the original page.
    calculateUsage(subscription.u + subscription.d, subscription.transfer_enable);
    return (
      <MainLayout {...this.props} title={message('节点状态')}>
        <main id="main-container">
          <div className="content content-full">
            <div className="row mb-3 mb-md-0">
              <div className="col-md-12">
                {fetchLoading ? (
                  <div className="spinner-grow text-primary" role="status"><span className="sr-only">Loading...</span></div>
                ) : servers.length > 0 ? (
                  <div className="block block-rounded js-appear-enabled">
                    <div className="block-content p-0">
                      <Table tableLayout="auto" dataSource={servers} columns={createNodeColumns()} pagination={false} scroll={{ x: 900 }} />
                    </div>
                  </div>
                ) : (
                  <div className="alert alert-dark" role="alert">
                    <p className="mb-0">
                      {message('没有可用节点，如果您未订阅或已过期请')}{' '}
                      {subscription.plan_id ? (
                        <a className="alert-link" href="javascript:void(0);" onClick={() => history.push('/plan/' + subscription.plan_id)}>{message('续费')}</a>
                      ) : (
                        <a className="alert-link" href="javascript:void(0);" onClick={() => history.push('/plan')}>{message('订阅')}</a>
                      )}
                      {'。'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </MainLayout>
    );
  }
}
export default connect(({ user, server, order }: NodePageStateProps) => ({ user, server, order }))(NodePage);
