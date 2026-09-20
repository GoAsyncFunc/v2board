import React from 'react';
import { connect } from 'react-redux';
import Modal from 'antd/lib/modal';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import { formatMessage } from '../../locales/i18n';
import type { UserDispatch, UserRootState } from '../../types/store';

interface WithdrawStateProps {
    user: { userInfo: { commission_balance?: number } };
    comm: { config: { withdraw_methods?: string[] } };
}
interface WithdrawModalState {
    visible: boolean;
    withdrawMethod?: string;
    withdrawAccount?: string;
}
type WithdrawModalProps = WithdrawStateProps & {
    children: React.ReactElement;
    dispatch: UserDispatch;
};

export class WithdrawModal extends React.Component<WithdrawModalProps, WithdrawModalState> {
    state: WithdrawModalState = {
        visible: false,
        withdrawMethod: undefined,
        withdrawAccount: undefined,
    };

    show() {
        this.setState((state) => ({
            visible: !state.visible,
            withdrawMethod: undefined,
            withdrawAccount: undefined,
        }));
    }

    ok() {
        this.props.dispatch({
            type: 'ticket/withdraw',
            withdrawAccount: this.state.withdrawAccount,
            withdrawMethod: this.state.withdrawMethod,
            callback: () => this.show(),
        });
    }

    render() {
        const { visible, withdrawMethod } = this.state;
        const { withdraw_methods: withdrawMethods } = this.props.comm.config;
        return (
            <>
                {React.cloneElement(this.props.children, { onClick: () => this.show() })}
                <Modal
                    title={formatMessage({ id: '申请提现' })}
                    visible={visible}
                    onOk={() => this.ok()}
                    onCancel={() => this.show()}
                    okText={formatMessage({ id: '确认' })}
                    cancelText={formatMessage({ id: '取消' })}
                >
                    <div className="form-group">
                        <label>{formatMessage({ id: '提现方式' })}</label>
                        <Select<string>
                            style={{ width: '100%' }}
                            placeholder={formatMessage({ id: '请选择提现方式' })}
                            value={withdrawMethod}
                            onChange={(method) => this.setState({ withdrawMethod: method })}
                        >
                            {withdrawMethods?.map((method) => (
                                <Select.Option key={method} value={method}>
                                    {method}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                    <div className="form-group">
                        <label>{formatMessage({ id: '提现账号' })}</label>
                        <Input
                            type="text"
                            className="form-control"
                            placeholder={formatMessage({ id: '请输入提现账号' })}
                            onChange={(event) =>
                                this.setState({ withdrawAccount: event.target.value })
                            }
                        />
                    </div>
                </Modal>
            </>
        );
    }
}

const ConnectedWithdrawModal = connect((state: UserRootState) => ({
    user: state.user,
    comm: state.comm,
}))(WithdrawModal);
export default ConnectedWithdrawModal;
