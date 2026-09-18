import React from 'react';
import moment from 'moment';
import Modal from '../Modal.js';
import { LoadingContainer, Table } from '../ui.js';
import { get } from '../../services/request.js';
import { formatBytes } from '../siteHelpers.js';

export default class TrafficPanel extends React.Component {
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

  loadRecords = async () => {
    const { pagination } = this.state;
    this.setState({ loading: true });
    const response = await get(`/${window.settings.secure_path}/stat/getStatUser`, {
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

  changePage = pagination => this.setState({ pagination }, this.loadRecords);

  render() {
    const { children } = this.props;
    const { visible, records, pagination, loading } = this.state;
    const columns = [
      { title: '日期', dataIndex: 'record_at', key: 'record_at', render: value => moment(1000 * value).format('YYYY-MM-DD') },
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
            <Table
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
