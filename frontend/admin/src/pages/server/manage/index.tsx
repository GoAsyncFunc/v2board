import React from 'react';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Menu from 'antd/lib/menu';
import type { ColumnProps } from 'antd/lib/table/interface';
import { Prompt } from 'react-router-dom';
import Sortable from '../../../components/common/Sortable';
import LoadingContainer from '../../../components/common/LoadingContainer';
import { getPreference, isMobile, setPreference } from '../../../utils/siteHelpers';
import MainLayout from '../../../layouts/MainLayout';
import ContextMenuTable from '../../../components/common/ContextMenuTable';
import {
    createNewServerMenu,
    renderServerEditor,
    serverModelNamespace,
} from '../../../components/server/ServerEditorRegistry';
import {
    createServerManageColumns,
    createServerSortColumns,
} from '../../../components/server/ServerManageColumns';
import ServerManageMobileList from '../../../components/server/ServerManageMobileList';
import type { AdminDispatch, AdminRootState } from '../../../types/store';
import type {
    ManagedServerRecord,
    ServerGroupOption,
    ServerGroupState,
    ServerManageState,
    ServerRecord,
} from '../../../types/server';

type ServerProtocolAction = 'copy' | 'drop' | 'update';
interface ServerUpdatePayload<Key extends keyof ServerRecord = keyof ServerRecord> {
    key: Key;
    value: ServerRecord[Key];
}

interface ServerManagePageProps {
    dispatch: AdminDispatch;
    serverManage: ServerManageState;
    serverGroup: ServerGroupState;
}
interface ServerManagePageState {
    searchKey?: string;
    pageSize: number;
}
export class ServerManagePage extends React.Component<
    ServerManagePageProps,
    ServerManagePageState
> {
    contextServer: ServerRecord | null;

    constructor(props: ServerManagePageProps) {
        super(props);
        this.state = {
            searchKey: undefined,
            pageSize: Number(getPreference('server_manage_page_size')) || 10,
        };
        this.contextServer = null;
    }

    componentDidMount(): void {
        this.props.dispatch({ type: 'serverManage/getNodes' });
        this.props.dispatch({ type: 'serverGroup/fetch' });
        this.props.dispatch({ type: 'serverRoute/fetch' });
    }

    dispatchServerAction(
        server: ServerRecord,
        action: Exclude<ServerProtocolAction, 'update'>,
    ): void;
    dispatchServerAction<Key extends keyof ServerRecord>(
        server: ServerRecord,
        action: 'update',
        payload: ServerUpdatePayload<Key>,
    ): void;
    dispatchServerAction(
        server: ServerRecord,
        action: ServerProtocolAction,
        payload?: ServerUpdatePayload,
    ): void {
        if (!server.type) return;
        const model = serverModelNamespace(server.type);
        if (model)
            this.props.dispatch({ type: `${model}/${action}`, id: server.id, ...(payload || {}) });
    }

    copy(server: ServerRecord): void {
        this.dispatchServerAction(server, 'copy');
    }
    drop(server: ServerRecord): void {
        this.dispatchServerAction(server, 'drop');
    }
    update<Key extends keyof ServerRecord>(
        server: ServerRecord,
        key: Key,
        value: ServerRecord[Key],
    ): void {
        this.dispatchServerAction(server, 'update', { key, value });
    }

    actionMenu(server: ServerRecord): React.ReactElement {
        return (
            <Menu>
                <Menu.Item onContextMenu={(event) => event.stopPropagation()}>
                    {renderServerEditor(
                        server,
                        <a>
                            <Icon type="edit" /> 编辑
                        </a>,
                    )}
                </Menu.Item>
                <Menu.Item onClick={() => this.copy(server)}>
                    <Icon type="copy" /> 复制
                </Menu.Item>
                <Menu.Item style={{ color: '#ff4d4f' }} onClick={() => this.drop(server)}>
                    <Icon type="delete" /> 删除
                </Menu.Item>
            </Menu>
        );
    }

    actionDropdown(server: ServerRecord, trigger?: React.ReactElement): React.ReactElement {
        return (
            <Dropdown trigger={['click']} overlay={this.actionMenu(server)}>
                {trigger || (
                    <a href="javascript:void(0);">
                        操作 <Icon type="caret-down" />
                    </a>
                )}
            </Dropdown>
        );
    }

    filteredServers(): ManagedServerRecord[] {
        const { servers } = this.props.serverManage;
        const { searchKey } = this.state;
        return searchKey
            ? servers.filter((server) => JSON.stringify(server).includes(searchKey))
            : servers;
    }

    columns(groups: ServerGroupOption[]): ColumnProps<ManagedServerRecord>[] {
        return createServerManageColumns({
            groups,
            renderActions: (server) => this.actionDropdown(server),
            updateServer: (server, key, value) => this.update(server, key, value),
        });
    }

    sortColumns(): ColumnProps<ManagedServerRecord>[] {
        return createServerSortColumns();
    }

    renderMobileList(servers: ManagedServerRecord[]): React.ReactElement {
        return (
            <ServerManageMobileList
                servers={servers}
                renderActions={(server) => this.actionDropdown(server)}
                updateServer={(server, key, value) => this.update(server, key, value)}
            />
        );
    }

    renderContextMenu(): React.ReactElement {
        const server = this.contextServer;
        return (
            <ul className="ant-dropdown-menu ant-dropdown-menu-light ant-dropdown-menu-root ant-dropdown-menu-vertical">
                <li className="ant-dropdown-menu-item">
                    {server &&
                        renderServerEditor(
                            server,
                            <a>
                                <Icon type="form" /> 编辑
                            </a>,
                            `context-${server.id}`,
                        )}
                </li>
                <li className="ant-dropdown-menu-item" onClick={() => server && this.copy(server)}>
                    <a>
                        <Icon type="copy" /> 复制
                    </a>
                </li>
                <li className="ant-dropdown-menu-item" onClick={() => server && this.drop(server)}>
                    <a style={{ color: '#ff4d4f' }}>
                        <Icon type="delete" /> 删除
                    </a>
                </li>
            </ul>
        );
    }

    renderDesktopTable(
        servers: ManagedServerRecord[],
        groups: ServerGroupOption[],
        sortMode: boolean,
    ): React.ReactElement {
        return (
            <Sortable
                onDragEnd={(fromIndex, toIndex) =>
                    this.props.dispatch({ type: 'serverManage/sort', fromIndex, toIndex })
                }
                nodeSelector="tr"
                handleSelector="i"
            >
                <ContextMenuTable
                    onContextMenu={(server) => {
                        this.contextServer = server || null;
                        this.forceUpdate();
                    }}
                    disableRightClick={sortMode}
                    tableLayout="auto"
                    dataSource={servers}
                    columns={sortMode ? this.sortColumns() : this.columns(groups)}
                    pagination={
                        !sortMode && {
                            pageSize: this.state.pageSize,
                            pageSizeOptions: ['10', '50', '100', '500'],
                            showSizeChanger: true,
                            onShowSizeChange: (_current: number, pageSize: number) =>
                                this.setState({ pageSize }, () =>
                                    setPreference('server_manage_page_size', pageSize),
                                ),
                        }
                    }
                    scroll={{ x: 1300 }}
                    rowClassName={(server) => (server.parent_id ? 'child_node' : '')}
                >
                    {this.renderContextMenu()}
                </ContextMenuTable>
            </Sortable>
        );
    }

    render(): React.ReactNode {
        const { servers, fetchLoading, sortMode } = this.props.serverManage;
        const groups = this.props.serverGroup.groups;
        const filteredServers = this.filteredServers();
        return (
            <MainLayout {...this.props} title="节点管理">
                <Prompt
                    when={sortMode}
                    message={() => window.confirm('节点排序还没有保存，是否离开')}
                />
                <LoadingContainer loading={fetchLoading}>
                    <div className="block block-bottom">
                        <div className="bg-white">
                            <div className="v2board-table-action" style={{ padding: 15 }}>
                                <Dropdown overlay={createNewServerMenu()}>
                                    <Button>
                                        <Icon type="plus" />
                                    </Button>
                                </Dropdown>
                                <Input
                                    placeholder="输入任意关键字搜索"
                                    style={{ width: 200 }}
                                    className="ml-2"
                                    onChange={(event) =>
                                        this.setState({ searchKey: event.target.value })
                                    }
                                />
                                {!isMobile() && (
                                    <Button
                                        style={{ float: 'right' }}
                                        type="primary"
                                        onClick={() =>
                                            sortMode
                                                ? this.props.dispatch({
                                                      type: 'serverManage/saveSort',
                                                  })
                                                : this.props.dispatch({
                                                      type: 'serverManage/setState',
                                                      payload: { sortMode: true },
                                                  })
                                        }
                                    >
                                        {sortMode ? '保存排序' : '编辑排序'}
                                    </Button>
                                )}
                            </div>
                            {isMobile()
                                ? this.renderMobileList(filteredServers)
                                : this.renderDesktopTable(filteredServers, groups, sortMode)}
                        </div>
                    </div>
                </LoadingContainer>
            </MainLayout>
        );
    }
}

export default connect((state: AdminRootState) => ({
    serverManage: state.serverManage,
    serverGroup: state.serverGroup,
}))(ServerManagePage);
