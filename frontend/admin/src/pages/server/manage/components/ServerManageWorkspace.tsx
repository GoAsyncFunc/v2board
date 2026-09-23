import React from 'react';
import type { ColumnProps } from 'antd/lib/table/interface';
import SortableTable from '../../../../components/common/SortableTable';
import ContextMenuTable from '../../../../components/common/ContextMenuTable';
import type {
    ManagedServerRecord,
    ServerGroupOption,
    ServerRecord,
} from '../../../../types/server';
import { createServerManageColumns, createServerSortColumns } from './ServerManageColumns';
import ServerManageMobileList from './ServerManageMobileList';
import {
    createServerContextMenu,
    ServerActionDropdown,
    type ServerManageActions,
} from './ServerManageActions';
import { ServerManageToolbar } from './ServerManageToolbar';

interface ServerManageWorkspaceProps {
    groups: ServerGroupOption[];
    onCopy: (server: ServerRecord) => void;
    onDrop: (server: ServerRecord) => void;
    onPageSizeChange: (pageSize: number) => void;
    onSearch: (searchKey: string) => void;
    onSort: (fromIndex: number, toIndex: number) => void;
    onToggleSort: () => void;
    onUpdate: <Key extends keyof ServerRecord>(
        server: ServerRecord,
        key: Key,
        value: ServerRecord[Key],
    ) => void;
    mobile: boolean;
    pageSize: number;
    servers: ManagedServerRecord[];
    showSortControls: boolean;
    sortMode: boolean;
}

export default class ServerManageWorkspace extends React.Component<ServerManageWorkspaceProps> {
    contextServer: ServerRecord | null = null;

    listActions(): ServerManageActions {
        return {
            onCopy: this.props.onCopy,
            onDrop: this.props.onDrop,
        };
    }

    actionDropdown(server: ServerRecord, trigger?: React.ReactElement): React.ReactElement {
        return (
            <ServerActionDropdown server={server} actions={this.listActions()} trigger={trigger} />
        );
    }

    columns(): ColumnProps<ManagedServerRecord>[] {
        return createServerManageColumns({
            groups: this.props.groups,
            renderActions: (server) => this.actionDropdown(server),
            updateServer: (server, key, value) => this.props.onUpdate(server, key, value),
        });
    }

    renderMobileList(): React.ReactElement {
        const { onUpdate, servers } = this.props;
        return (
            <ServerManageMobileList
                servers={servers}
                renderActions={(server) => this.actionDropdown(server)}
                updateServer={onUpdate}
            />
        );
    }

    renderContextMenu(): React.ReactElement {
        return createServerContextMenu(this.contextServer, this.listActions());
    }

    renderDesktopTable(): React.ReactElement {
        const { onPageSizeChange, onSort, pageSize, servers, sortMode } = this.props;
        return (
            <SortableTable
                records={servers}
                getRowKey={(server) => String(server.id ?? '')}
                onSortEnd={onSort}
            >
                <ContextMenuTable
                    onContextMenu={(server) => {
                        this.contextServer = server || null;
                        this.forceUpdate();
                    }}
                    disableRightClick={sortMode}
                    tableLayout="auto"
                    dataSource={servers}
                    columns={sortMode ? createServerSortColumns() : this.columns()}
                    pagination={
                        !sortMode && {
                            pageSize,
                            pageSizeOptions: ['10', '50', '100', '500'],
                            showSizeChanger: true,
                            onShowSizeChange: (_current: number, nextPageSize: number) =>
                                onPageSizeChange(nextPageSize),
                        }
                    }
                    scroll={{ x: 1300 }}
                    rowClassName={(server) => (server.parent_id ? 'child_node' : '')}
                >
                    {this.renderContextMenu()}
                </ContextMenuTable>
            </SortableTable>
        );
    }

    render(): React.ReactElement {
        const { mobile, onSearch, onToggleSort, showSortControls, sortMode } = this.props;
        return (
            <div className="bg-white">
                <ServerManageToolbar
                    sortMode={sortMode}
                    showSortControls={showSortControls}
                    onSearch={onSearch}
                    onToggleSort={onToggleSort}
                />
                {mobile ? this.renderMobileList() : this.renderDesktopTable()}
            </div>
        );
    }
}
