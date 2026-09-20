import React from 'react';
import MainLayout from '../layouts/MainLayout';
import Table from 'antd/lib/table';
import { connect } from 'react-redux';
import { formatMessage } from '../locales/i18n';
import { createTrafficColumns } from '../components/TrafficColumns';
import type { TrafficState } from '../types/queryModels';
import type { UserDispatch, UserRootState } from '../types/store';

interface TrafficStateProps {
  stat: TrafficState;
}

export class TrafficPage extends React.Component<TrafficStateProps & { dispatch: UserDispatch }> {
  componentDidMount() {
    this.props.dispatch({ type: 'stat/getTrafficLog' });
  }

  render() {
    const { traffics, getTrafficLogLoading } = this.props.stat;
    return (
      <MainLayout {...this.props} title={formatMessage({ id: '流量明细' })}>
        <main id="main-container">
          <div className="content content-full">
            <div className={'block block-rounded  ' + (getTrafficLogLoading ? 'block-mode-loading' : '')}>
              <div className="bg-white">
                <div className="row p-3">
                  <div className="col-lg-12">
                    <div className="alert alert-info mb-0" role="alert">
                      <p className="mb-0">{formatMessage({ id: '流量明细仅保留近月数据以供查询。' })}</p>
                    </div>
                  </div>
                </div>
                <Table tableLayout="auto" style={{ borderTop: '1px solid #e8e8e8' }}
                  dataSource={traffics} pagination={false} columns={createTrafficColumns()} scroll={{ x: 800 }} />
              </div>
            </div>
          </div>
        </main>
      </MainLayout>
    );
  }
}
export default connect(({ stat }: UserRootState) => ({ stat }))(TrafficPage);
