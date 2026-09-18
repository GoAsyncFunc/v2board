import React from 'react';
import { connect } from '../reactRedux.js';
import Modal from '../Modal.js';
import Icon from '../Icon.js';
import { Input, Select } from '../ui.js';
import { settings } from '../adminSettings.js';

const emptySubmit = email => ({ email: email || undefined, plan_id: undefined, period: undefined, total_amount: undefined });

class AssignOrderEditor extends React.Component {
  state = { visible: false, submit: emptySubmit(this.props.email) };

  toggle = () => {
    this.setState(({ visible }) => ({ visible: !visible }), () => {
      if (!this.state.visible) this.setState({ submit: emptySubmit(this.props.email) });
    });
  };

  setSubmit = (field, value) => this.setState(({ submit }) => ({ submit: { ...submit, [field]: value } }));

  submit = () => {
    this.props.dispatch({
      type: 'order/assign',
      params: { ...this.state.submit },
      callback: this.toggle,
    });
  };

  render() {
    const { children, plan, order } = this.props;
    const { visible, submit } = this.state;
    return (
      <>
        {React.cloneElement(children, { onClick: this.toggle })}
        <Modal title="订单分配" visible={visible} onCancel={this.toggle} onOk={this.submit}>
          <div className="form-group">
            <label htmlFor="assign-order-email">用户邮箱</label>
            <Input id="assign-order-email" placeholder="请输入用户邮箱" value={submit.email} onChange={event => this.setSubmit('email', event.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="assign-order-plan">请选择订阅</label>
            <Select id="assign-order-plan" value={submit.plan_id} style={{ width: '100%' }} placeholder="请选择订阅" onChange={value => this.setSubmit('plan_id', value)}>
              {(plan.plans || []).map(item => <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>)}
            </Select>
          </div>
          <div className="form-group">
            <label htmlFor="assign-order-period">请选择周期</label>
            <Select id="assign-order-period" value={submit.period} style={{ width: '100%' }} placeholder="请选择周期" onChange={value => this.setSubmit('period', value)}>
              {Object.entries(settings.periodText).map(([period, label]) => <Select.Option value={period} key={period}>{label}</Select.Option>)}
            </Select>
          </div>
          <div className="form-group">
            <label htmlFor="assign-order-amount">支付金额</label>
            <Input id="assign-order-amount" placeholder="请输入需要支付的金额" addonAfter="¥" value={submit.total_amount} onChange={event => this.setSubmit('total_amount', event.target.value)} />
          </div>
          {order.assignLoading && <Icon type="loading" />}
        </Modal>
      </>
    );
  }
}

export default connect(state => ({ plan: state.plan, order: state.order }))(AssignOrderEditor);
