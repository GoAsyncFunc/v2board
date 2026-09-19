import React from 'react';
import MainLayout from '../layouts/MainLayout.jsx';
import { connect } from '../vendor/reactRedux.js';
import { Table } from '../vendor/ui.js';
import { Button } from '../vendor/ui.js';
import { Divider } from '../vendor/Divider.js';
import { Icon } from '../vendor/Icon.js';
import { GroupEditor } from '../vendor/ui.js';
import { LoadingContainer } from '../vendor/ui.js';
import { createReadonlyServerGroupColumns } from '../components/ServerGroupDisplayColumns.jsx';

import '../vendor/iconStyles.js';

const readonlyColumns = createReadonlyServerGroupColumns();

class ServerGroupPage extends React.Component {
  constructor(props) {
    super(props), this.state = {
      group: [],
      submit: {},
      visible: !1
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: "serverGroup/fetch"
    });
  }
  drop(groupId) {
    this.props.dispatch({
      type: "serverGroup/drop",
      id: groupId
    });
  }
  modalVisible() {
    this.setState({
      visible: !this.state.visible,
      submit: {}
    });
  }
  render() {
    var serverGroup = this.props.serverGroup,
      groups = serverGroup.groups,
      fetchLoading = serverGroup.fetchLoading,
      columns = [readonlyColumns["id"], readonlyColumns["name"], readonlyColumns["user_count"], readonlyColumns["server_count"], {
        title: "操作",
        dataIndex: "action",
        key: "action",
        align: "right",
        render: (value, record) => {
          return <div>
                                <GroupEditor record={record} key={record.id}>
                                  <a href={"javascript:void(0);"}>
                                        {"编辑"}
                                  </a>
                                </GroupEditor>
                                <Divider type="vertical" />
                                <a href={"javascript:void(0);"} onClick={() => this.drop(record.id)}>
                                    {"删除"}
                                </a>
                            </div>;
        }
      }];
    return <MainLayout {...this.props} title="权限组管理">
      <div className={"d-flex justify-content-between align-items-center"}></div>
      <LoadingContainer loading={fetchLoading}>
        <div className={"block block-rounded"}>
          <div className={"bg-white"}>
            <div style={{ padding: 15 }}>
              <GroupEditor>
                <Button onClick={() => this.modalVisible()}>
                  <Icon type="plus" />{" 添加权限组"}
                </Button>
              </GroupEditor>
            </div>
            <Table
              tableLayout="auto"
              columns={columns}
              dataSource={groups}
              pagination={false}
            />
          </div>
        </div>
      </LoadingContainer>
    </MainLayout>;
  }
}
export default connect(state => ({ serverGroup: state.serverGroup }))(ServerGroupPage);
