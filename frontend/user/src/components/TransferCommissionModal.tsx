import React from 'react';
import { connect } from 'react-redux';
import Modal from 'antd/lib/modal';
import Input from 'antd/lib/input';
import { formatMessage } from '../locales/i18n';
import type { UserDispatch, UserRootState } from '../types/store';

type TransferStateProps = Pick<UserRootState, 'user'>;
interface TransferModalState { visible: boolean; transferAmount?: string; }
type TransferModalProps = TransferStateProps & { children: React.ReactElement; dispatch: UserDispatch };

export class TransferCommissionModal extends React.Component<TransferModalProps, TransferModalState> {
  state: TransferModalState = { visible: false, transferAmount: undefined };

  show() {
    this.setState(state => ({ visible: !state.visible, transferAmount: undefined }));
  }

  ok() {
    this.props.dispatch({
      type: 'user/transfer',
      transferAmount: this.state.transferAmount,
      callback: () => this.show(),
    });
  }

  render() {
    const { visible } = this.state;
    const { userInfo } = this.props.user;
    return (
      <>
        {React.cloneElement(this.props.children, { onClick: () => this.show() })}
        <Modal
          title={formatMessage({ id: '推广佣金划转至余额' })}
          visible={visible}
          onOk={() => this.ok()}
          onCancel={() => this.show()}
          okText={formatMessage({ id: '确认' })}
          cancelText={formatMessage({ id: '取消' })}
        >
          <div className="alert alert-danger d-flex align-items-center" role="alert">
            <div className="flex-00-auto"><i className="fa fa-fw fa-info-circle" /></div>
            <div className="flex-fill ml-3">
              <p className="mb-0">{formatMessage({ id: '划转后的余额仅用于{title}消费使用' }, { title: window.settings.title })}</p>
            </div>
          </div>
          <div className="form-group">
            <label>{formatMessage({ id: '当前推广佣金余额' })}</label>
            <Input disabled type="text" className="form-control" value={(userInfo.commission_balance || 0) / 100} />
          </div>
          <div className="form-group">
            <label>{formatMessage({ id: '划转金额' })}</label>
            <Input
              type="text"
              className="form-control"
              placeholder={formatMessage({ id: '请输入需要划转到余额的金额' })}
              onChange={event => this.setState({ transferAmount: event.target.value })}
            />
          </div>
        </Modal>
      </>
    );
  }
}

const ConnectedTransferCommissionModal = connect((state: UserRootState) => ({ user: state.user }))(TransferCommissionModal);
export default ConnectedTransferCommissionModal;
