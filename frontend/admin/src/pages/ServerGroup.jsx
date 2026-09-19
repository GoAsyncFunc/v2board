import React from 'react';
import MainLayout from '../layouts/MainLayout.jsx';
import { connect } from '../vendor/reactRedux.js';
import { Table, Button, LoadingContainer } from '../vendor/ui.js';
import { Divider } from '../vendor/Divider.js';
import { Icon } from '../vendor/Icon.js';
import PermissionGroupEditor from '../components/PermissionGroupEditor.jsx';
import { createReadonlyServerGroupColumns } from '../components/ServerGroupDisplayColumns.jsx';
import '../vendor/iconStyles.js';

const readonlyColumns = createReadonlyServerGroupColumns();

export class ServerGroupPage extends React.Component {
  state = { submit: {}, visible: false };

  componentDidMount() {
    this.props.dispatch({ type: 'serverGroup/fetch' });
  }

  drop(groupId) {
    this.props.dispatch({ type: 'serverGroup/drop', id: groupId });
  }

  toggleModal() {
    this.setState(state => ({ visible: !state.visible, submit: {} }));
  }

  render() {
    const { groups, fetchLoading } = this.props.serverGroup;
    const columns = [
      readonlyColumns.id,
      readonlyColumns.name,
      readonlyColumns.user_count,
      readonlyColumns.server_count,
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        align: 'right',
        render: (value, record) => (
          <div>
            <PermissionGroupEditor record={record}>
              <a href="javascript:void(0);">编辑</a>
            </PermissionGroupEditor>
            <Divider type="vertical" />
            <a href="javascript:void(0);" onClick={() => this.drop(record.id)}>删除</a>
          </div>
        ),
      },
    ];
    return (
      <MainLayout {...this.props} title="权限组管理">
        <LoadingContainer loading={fetchLoading}>
          <div className="block block-rounded">
            <div className="bg-white">
              <div style={{ padding: 15 }}>
                <PermissionGroupEditor>
                  <Button onClick={() => this.toggleModal()}>
                    <Icon type="plus" /> 添加权限组
                  </Button>
                </PermissionGroupEditor>
              </div>
              <Table tableLayout="auto" columns={columns} dataSource={groups} pagination={false} />
            </div>
          </div>
        </LoadingContainer>
      </MainLayout>
    );
  }
}

export default connect(state => ({ serverGroup: state.serverGroup }))(ServerGroupPage);
