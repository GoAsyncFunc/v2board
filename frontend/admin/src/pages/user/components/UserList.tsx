import React from 'react';
import { connect } from 'react-redux';
import type { PaginationConfig, SorterResult } from 'antd/lib/table/interface';
import ContextMenuTable from '@/components/common/ContextMenuTable';
import type { AdminDispatch, AdminRootState } from '@/types/storeContracts';
import type { FilterValue } from '@/types/filterContracts';
import type { UserGroupOption, UserModuleState, UserRecord } from '@/types/userContracts';
import { UserActionDropdown, UserContextMenu, type UserListActions } from './UserListActions';
import { createUserListColumns } from './UserListColumns';

export interface UserListProps {
    dispatch: AdminDispatch;
    user: UserModuleState;
    serverGroup: { groups: UserGroupOption[] };
    onTableChange: (pagination: PaginationConfig, sorter: SorterResult<UserRecord>) => void;
    onUserFilter: (key: string, condition: string, value: FilterValue, clear?: boolean) => void;
    onOrderFilter: (key: string, condition: string, value: FilterValue) => void;
    onResetSecret: (user?: UserRecord) => void;
    onDeleteUser: (user?: UserRecord) => void;
}

export class UserList extends React.Component<UserListProps> {
    contextUser?: UserRecord;

    listActions(): UserListActions {
        return {
            onResetSecret: this.props.onResetSecret,
            onDeleteUser: this.props.onDeleteUser,
            onUserFilter: this.props.onUserFilter,
            onOrderFilter: this.props.onOrderFilter,
        };
    }

    render(): React.ReactNode {
        const { users, pagination } = this.props.user;
        return (
            <ContextMenuTable<UserRecord>
                onContextMenu={(user) => {
                    this.contextUser = user;
                    this.forceUpdate();
                }}
                className="v2board-table"
                tableLayout="auto"
                dataSource={users}
                pagination={{
                    ...pagination,
                    size: 'small',
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '50', '100', '150'],
                }}
                columns={createUserListColumns(this.props.serverGroup.groups, (user) => (
                    <UserActionDropdown user={user} actions={this.listActions()} />
                ))}
                scroll={{ x: 1500 }}
                onChange={(nextPagination, _filters, sorter) =>
                    this.props.onTableChange(nextPagination, sorter)
                }
            >
                <UserContextMenu user={this.contextUser} actions={this.listActions()} />
            </ContextMenuTable>
        );
    }
}

export default connect((state: AdminRootState) => ({
    user: state.user,
    serverGroup: state.serverGroup,
}))(UserList);
