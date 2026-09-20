import React from 'react';
import moment from 'moment';
import Modal from 'antd/lib/modal';
import Table from 'antd/lib/table';
import type { PaginationConfig } from 'antd/lib/pagination';
import type { ColumnProps } from 'antd/lib/table/interface';
import LoadingContainer from './LoadingContainer';
import { get } from '../services/request';
import { formatBytes } from '../utils/siteHelpers';

export interface TrafficRecord {
  record_at: number;
  u: string | number;
  d: string | number;
  server_rate: React.ReactNode;
}

export interface TrafficPanelProps {
  userId: string | number;
  children: React.ReactElement;
}

interface TrafficPanelState {
  visible: boolean;
  records: TrafficRecord[];
  loading: boolean;
  pagination: PaginationConfig & { page?: number };
}

export function formatTrafficDate(value: number): string {
  return moment(1000 * value).format('YYYY-MM-DD');
}

export default class TrafficPanel extends React.Component<TrafficPanelProps, TrafficPanelState> {
  state = {
    visible: false,
    records: [],
    loading: false,
    pagination: { page: 1, pageSize: 10, total: 0 },
  };

  show = () => {
    this.setState({ visible: true });
    this.loadRecords();
  };

  loadRecords = async (): Promise<void> => {
    const { pagination } = this.state;
    this.setState({ loading: true });
    const response = await get<TrafficRecord[]>(`/${window.settings.secure_path}/stat/getStatUser`, {
      user_id: this.props.userId,
      ...pagination,
    });
    this.setState({ loading: false });
    if (response.code !== 200) return;
    this.setState({
      records: response.data,
      pagination: { ...pagination, total: response.total },
    });
  };

  changePage = (pagination: PaginationConfig): void => this.setState({ pagination }, this.loadRecords);

  render() {
    const { children } = this.props;
    const { visible, records, pagination, loading } = this.state;
    const columns: ColumnProps<TrafficRecord>[] = [
      { title: '日期', dataIndex: 'record_at', key: 'record_at', render: formatTrafficDate },
      { title: '上行', dataIndex: 'u', key: 'u', align: 'right', render: formatBytes },
      { title: '下行', dataIndex: 'd', key: 'd', align: 'right', render: formatBytes },
      { title: '倍率', dataIndex: 'server_rate', key: 'server_rate', align: 'right' },
    ];

    return (
      <>
        {React.cloneElement(children, { onClick: this.show })}
        <Modal
          width="100%"
          style={{ maxWidth: 1000, padding: '0 10px', top: 20 }}
          bodyStyle={{ padding: 0 }}
          footer={false}
          visible={visible}
          title="流量记录"
          onCancel={() => this.setState({ visible: false })}
        >
          <LoadingContainer loading={loading}>
            <Table<TrafficRecord>
              pagination={{ ...pagination, size: 'small' }}
              columns={columns}
              dataSource={records}
              onChange={this.changePage}
            />
          </LoadingContainer>
        </Modal>
      </>
    );
  }
}
