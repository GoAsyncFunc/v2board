import React from 'react';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import Drawer from 'antd/lib/drawer';
import Icon from 'antd/lib/icon';
import { UserFormFields } from './UserFormFields';
import type { AdminDispatch, AdminRootState } from '../../../types/storeContracts';
import type { UserModuleState, UserPlanOption, UserRecord } from '../../../types/userContracts';

interface UserEditorOwnProps {
    userId?: string | number;
    children: React.ReactElement;
}
interface UserEditorProps extends UserEditorOwnProps {
    dispatch: AdminDispatch;
    user: UserModuleState;
    plan: { plans: UserPlanOption[] };
}
interface UserEditorState {
    visible: boolean;
}

export class UserEditor extends React.Component<UserEditorProps, UserEditorState> {
    state = { visible: false };

    show(): void {
        if (!this.props.userId) return;
        this.setState({ visible: true }, () =>
            this.props.dispatch({ type: 'user/getUserInfoById', id: this.props.userId }),
        );
    }

    hide(): void {
        this.setState({ visible: false }, () =>
            this.props.dispatch({ type: 'user/setState', payload: { user: {} } }),
        );
    }

    formChange<Field extends keyof UserRecord>(field: Field, value: UserRecord[Field]): void {
        this.props.dispatch({
            type: 'user/setState',
            payload: { user: { ...this.props.user.user, [field]: value } },
        });
    }

    submit(): void {
        this.props.dispatch({
            type: 'user/update',
            params: { ...this.props.user.user },
            callback: () => this.hide(),
        });
    }

    render(): React.ReactNode {
        const { user, updateLoading } = this.props.user;
        return (
            <>
                {React.cloneElement(this.props.children, { onClick: () => this.show() })}
                <Drawer
                    width="80%"
                    title="用户管理"
                    visible={this.state.visible}
                    onClose={() => this.hide()}
                >
                    {user.email ? (
                        <div>
                            <UserFormFields
                                user={user}
                                plans={this.props.plan.plans}
                                onChange={(field, value) => this.formChange(field, value)}
                            />
                            <div className="v2board-drawer-action">
                                <Button style={{ marginRight: 8 }} onClick={() => this.hide()}>
                                    取消
                                </Button>
                                <Button
                                    disabled={updateLoading}
                                    loading={updateLoading}
                                    onClick={() => this.submit()}
                                    type="primary"
                                >
                                    提交
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <Icon type="loading" style={{ fontSize: 24, color: '#415A94' }} />
                    )}
                </Drawer>
            </>
        );
    }
}

export default connect((state: AdminRootState) => ({ user: state.user, plan: state.plan }))(
    UserEditor,
);
