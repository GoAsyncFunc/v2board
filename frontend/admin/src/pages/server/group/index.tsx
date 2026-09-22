import React from 'react';
import MainLayout from '../../../layouts/MainLayout';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import LoadingContainer from '../../../components/common/LoadingContainer';
import PermissionGroupEditor from '../../../components/common/PermissionGroupEditor';
import ServerGroupList from './_List';
import type { ServerGroupRecord } from './_List/ServerGroupDisplayColumns';
import type { ServerGroupState } from '../../../types/server';
import type { AdminDispatch, AdminRootState } from '../../../types/store';

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
                            <ServerGroupList groups={groups} onDelete={(id) => this.drop(id)} />
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
