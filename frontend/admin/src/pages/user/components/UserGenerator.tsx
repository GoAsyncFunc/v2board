import React from 'react';
import { connect } from 'react-redux';
import Modal from 'antd/lib/modal';
import UserGenerationForm, { type UserGenerationFormValues } from './UserGenerationForm';
import type { AdminDispatch, AdminRootState } from '../../../types/storeContracts';
import type { UserModuleState } from '../../../types/userContracts';

interface UserGeneratorOwnProps {
    children: React.ReactElement<{ onClick?: React.MouseEventHandler }>;
}

interface UserGeneratorProps extends UserGeneratorOwnProps {
    dispatch: AdminDispatch;
    user: UserModuleState;
    plan: { plans?: { id: string | number; name: string }[] };
}

interface UserGeneratorState {
    visible: boolean;
    submit: UserGenerationFormValues;
}

export class UserGenerator extends React.Component<UserGeneratorProps, UserGeneratorState> {
    state: UserGeneratorState = { visible: false, submit: {} };

    show = () => this.setState({ visible: true });
    hide = () => this.setState({ visible: false, submit: {} });
    update = <Field extends keyof UserGenerationFormValues>(
        field: Field,
        value: UserGenerationFormValues[Field],
    ): void => {
        this.setState(({ submit }) => ({ submit: { ...submit, [field]: value } }));
    };

    submit = () => {
        this.props.dispatch({
            type: 'user/generate',
            params: { ...this.state.submit },
            callback: this.hide,
        });
    };

    render() {
        const { children, user, plan } = this.props;
        const { visible, submit } = this.state;
        const showPrefix = !submit.generate_count;
        const isBatch = !showPrefix;
        return (
            <>
                {React.cloneElement(children, { onClick: this.show })}
                <Modal
                    title="创建用户"
                    visible={visible}
                    onCancel={this.hide}
                    onOk={this.submit}
                    okButtonProps={{ loading: user.generateLoading }}
                    okText="生成"
                    cancelText="取消"
                >
                    <UserGenerationForm
                        submit={submit}
                        plans={plan.plans}
                        isBatch={isBatch}
                        showPrefix={showPrefix}
                        onChange={this.update}
                    />
                </Modal>
            </>
        );
    }
}

export default connect((state: AdminRootState) => ({ user: state.user, plan: state.plan }))(
    UserGenerator,
);
