import React from 'react';
import { connect } from 'react-redux';
import type { ColumnProps } from 'antd/lib/table/interface';
import { Prompt } from 'react-router-dom';
import Sortable from '../../../components/common/Sortable';
import LoadingContainer from '../../../components/common/LoadingContainer';
import { getPreference, isMobile, setPreference } from '../../../utils/siteHelpers';
import MainLayout from '../../../layouts/MainLayout';
import ContextMenuTable from '../../../components/common/ContextMenuTable';
import { serverModelNamespace } from './_Editors/ServerEditorRegistry';
import { createServerManageColumns, createServerSortColumns } from './_List/ServerManageColumns';
import ServerManageMobileList from './_List/ServerManageMobileList';
import {
    createServerContextMenu,
    ServerActionDropdown,
    type ServerManageActions,
} from './_List/ServerManageActions';
import { ServerManageToolbar } from './_List/ServerManageToolbar';
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

    listActions(): ServerManageActions {
        return {
            onCopy: (server) => this.copy(server),
            onDrop: (server) => this.drop(server),
        };
    }

    actionDropdown(server: ServerRecord, trigger?: React.ReactElement): React.ReactElement {
        return (
            <ServerActionDropdown server={server} actions={this.listActions()} trigger={trigger} />
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
        return createServerContextMenu(this.contextServer, this.listActions());
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
                            <ServerManageToolbar
                                sortMode={sortMode}
                                showSortControls={!isMobile()}
                                onSearch={(searchKey) => this.setState({ searchKey })}
                                onToggleSort={() =>
                                    sortMode
                                        ? this.props.dispatch({ type: 'serverManage/saveSort' })
                                        : this.props.dispatch({
                                              type: 'serverManage/setState',
                                              payload: { sortMode: true },
                                          })
                                }
                            />
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
