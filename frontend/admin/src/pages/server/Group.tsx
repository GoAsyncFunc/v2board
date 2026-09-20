import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';
import Icon from 'antd/lib/icon';
import Table from 'antd/lib/table';
import type { ColumnProps } from 'antd/lib/table/interface';
import LoadingContainer from '../../components/common/LoadingContainer';
import PermissionGroupEditor from '../../components/common/PermissionGroupEditor';
import {
    createReadonlyServerGroupColumns,
    type ServerGroupRecord,
} from '../../components/server/ServerGroupDisplayColumns';
import type { ServerGroupState } from '../../types/server';
import type { AdminDispatch, AdminRootState } from '../../types/store';

const readonlyColumns = createReadonlyServerGroupColumns();

interface ServerGroupPageProps {
    dispatch: AdminDispatch;
    serverGroup: ServerGroupState;
}

export class ServerGroupPage extends React.Component<ServerGroupPageProps> {
    componentDidMount() {
        this.props.dispatch({ type: 'serverGroup/fetch' });
    }

    drop(groupId: string | number): void {
        this.props.dispatch({ type: 'serverGroup/drop', id: groupId });
    }

    render() {
        const { groups, fetchLoading } = this.props.serverGroup;
        const columns: ColumnProps<ServerGroupRecord>[] = [
            readonlyColumns.id,
            readonlyColumns.name,
            readonlyColumns.user_count,
            readonlyColumns.server_count,
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                align: 'right',
                render: (_value, record) => (
                    <div>
                        <PermissionGroupEditor record={record}>
                            <a href="javascript:void(0);">编辑</a>
                        </PermissionGroupEditor>
                        <Divider type="vertical" />
                        <a href="javascript:void(0);" onClick={() => this.drop(record.id)}>
                            删除
                        </a>
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
                                    <Button>
                                        <Icon type="plus" /> 添加权限组
                                    </Button>
                                </PermissionGroupEditor>
                            </div>
                            <Table<ServerGroupRecord>
                                tableLayout="auto"
                                columns={columns}
                                dataSource={groups}
                                pagination={false}
                            />
                        </div>
                    </div>
                </LoadingContainer>
            </MainLayout>
        );
    }
}

export default connect((state: AdminRootState) => ({ serverGroup: state.serverGroup }))(
    ServerGroupPage,
);
