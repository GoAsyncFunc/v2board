import React from 'react';
import { connect } from 'react-redux';
import Modal from 'antd/lib/modal';
import message from 'antd/lib/message';
import type { PaginationConfig } from 'antd/lib/table/interface';
import LoadingContainer from '../../components/common/LoadingContainer';
import history from '../../app/navigation';
import { setPreference } from '../../utils/siteHelpers';
import MainLayout from '../../layouts/MainLayout';
import UserFilterDrawer, { createUserFilterFields } from './_Drawer/UserFilterDrawer';
import { UserList, type UserSorter } from './_List';
import UserToolbar from './_Toolbar';
import type { FilterField, FilterValue } from '../../types/filter';
import type { AdminDispatch, AdminRootState } from '../../types/store';
import type {
    UserGroupOption,
    UserModuleState,
    UserPlanOption,
    UserRecord,
} from '../../types/user';

interface UserPageProps {
    dispatch: AdminDispatch;
    user: UserModuleState;
    serverGroup: { groups: UserGroupOption[] };
    plan: { plans: UserPlanOption[] };
}

export class UserPage extends React.Component<UserPageProps> {
    inputDelayTimer?: ReturnType<typeof setTimeout>;

    componentDidMount(): void {
        this.props.dispatch({ type: 'plan/fetch' });
        this.props.dispatch({ type: 'user/fetch' });
        this.props.dispatch({ type: 'serverGroup/fetch' });
    }

    componentWillUnmount(): void {
        if (this.inputDelayTimer) clearTimeout(this.inputDelayTimer);
        this.props.dispatch({ type: 'user/empty' });
        this.props.dispatch({ type: 'user/setState', payload: { filter: [] } });
    }

    tableOnChange(pagination: PaginationConfig, sorter: UserSorter): void {
        setPreference('user_manage_page_size', pagination.pageSize);
        this.props.dispatch({
            type: 'user/changeTable',
            pagination,
            sort: { sort_type: sorter.order === 'ascend' ? 'ASC' : 'DESC', sort: sorter.columnKey },
        });
    }

    searchOnChange(email: string): void {
        if (this.inputDelayTimer) clearTimeout(this.inputDelayTimer);
        this.inputDelayTimer = setTimeout(() => {
            this.inputDelayTimer = undefined;
            this.props.dispatch({
                type: 'user/filter',
                filter: { email },
                pagination: { current: 1 },
            });
        }, 400);
    }

    userFilter(key: string, condition: string, value: FilterValue, clear = false): void {
        this.props.dispatch({ type: 'user/addFilter', key, condition, value, clear });
    }

    orderFilter(key: string, condition: string, value: FilterValue): void {
        this.props.dispatch({ type: 'order/addFilter', key, condition, value });
        history.push('/order');
    }

    confirmBatch(action: 'ban' | 'allDel', content: string): void {
        Modal.confirm({
            title: '提醒',
            content,
            onOk: () => this.props.dispatch({ type: `user/${action}` }),
        });
    }

    dumpCsv(): void {
        this.props.dispatch({
            type: 'user/dumpCSV',
            start: () => message.loading('导出中'),
            finish: () => message.destroy(),
        });
    }

    resetSecret(user?: UserRecord): void {
        if (!user) return;
        Modal.confirm({
            title: '重置安全信息',
            content: `确定要重置${user.email}的安全信息吗？`,
            onOk: () =>
                this.props.dispatch({
                    type: 'user/resetSecret',
                    id: user.id,
                    complete: () => message.success('重置成功'),
                }),
            okText: '确定',
            cancelText: '取消',
        });
    }

    deleteUser(user?: UserRecord): void {
        if (!user) return;
        Modal.confirm({
            title: '删除用户',
            content: `确定要删除${user.email}的用户信息吗？`,
            onOk: () =>
                this.props.dispatch({
                    type: 'user/delUser',
                    id: user.id,
                    complete: () => message.success('删除成功'),
                }),
            okText: '确定',
            cancelText: '取消',
        });
    }

    filterFields(): FilterField[] {
        return createUserFilterFields(this.props.plan.plans);
    }

    render(): React.ReactNode {
        const { fetchLoading, filter } = this.props.user;
        return (
            <MainLayout {...this.props} title="用户管理">
                <LoadingContainer loading={fetchLoading}>
                    <div className="block border-bottom">
                        <div className="bg-white">
                            <UserToolbar
                                filter={filter}
                                plans={this.props.plan.plans}
                                onFilter={(nextFilter) =>
                                    this.props.dispatch({ type: 'user/filter', filter: nextFilter })
                                }
                                onExport={() => this.dumpCsv()}
                                onBatchBan={() => this.confirmBatch('ban', '确定要进行封禁吗？')}
                                onBatchDelete={() =>
                                    this.confirmBatch('allDel', '确定要进行删除吗？')
                                }
                            />
                            <UserList
                                dispatch={this.props.dispatch}
                                user={this.props.user}
                                serverGroup={this.props.serverGroup}
                                onTableChange={(pagination, sorter) =>
                                    this.tableOnChange(pagination, sorter)
                                }
                                onUserFilter={(key, condition, value, clear) =>
                                    this.userFilter(key, condition, value, clear)
                                }
                                onOrderFilter={(key, condition, value) =>
                                    this.orderFilter(key, condition, value)
                                }
                                onResetSecret={(user) => this.resetSecret(user)}
                                onDeleteUser={(user) => this.deleteUser(user)}
                            />
                        </div>
                    </div>
                </LoadingContainer>
            </MainLayout>
        );
    }
}

export { UserList } from './_List';
export { UserEditor } from './_Drawer/UserEditor';
export { SendMailEditor } from './_Modal/SendMailEditor';
export { UserGenerator } from './_Modal/UserGenerator';

export default connect((state: AdminRootState) => ({
    user: state.user,
    serverGroup: state.serverGroup,
    plan: state.plan,
}))(UserPage);
