import React from 'react';
import { connect } from '../vendor/reactRedux.js';
import { Modal } from '../vendor/Modal.js';
import { Input } from '../vendor/ui.js';
import { Select } from '../vendor/ui.js';
import { formatMessage } from '../vendor/i18n.js';

import '../vendor/componentStyles.js';
export class WithdrawModal extends React.Component {
  state = { visible: false, withdrawMethod: undefined, withdrawAccount: undefined };

  show() {
    this.setState(state => ({
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
            <Select
              style={{ width: '100%' }}
              placeholder={formatMessage({ id: '请选择提现方式' })}
              value={withdrawMethod}
              onChange={method => this.setState({ withdrawMethod: method })}
            >
              {withdrawMethods?.map(method => <Select.Option key={method} value={method}>{method}</Select.Option>)}
            </Select>
          </div>
          <div className="form-group">
            <label>{formatMessage({ id: '提现账号' })}</label>
            <Input
              type="text"
              className="form-control"
              placeholder={formatMessage({ id: '请输入提现账号' })}
              onChange={event => this.setState({ withdrawAccount: event.target.value })}
            />
          </div>
        </Modal>
      </>
    );
  }
}

const ConnectedWithdrawModal = connect(state => ({ user: state.user, comm: state.comm }))(WithdrawModal);
export { ConnectedWithdrawModal as a };
export default ConnectedWithdrawModal;
