import React from 'react';
import { connect } from '../vendor/reactRedux.js';
import { Drawer } from '../vendor/ui.js';
import { Button } from '../vendor/ui.js';
import { Switch } from '../vendor/ui.js';
import { Tooltip } from '../vendor/ui.js';
import { Icon } from '../vendor/Icon.js';
import { Select } from '../vendor/ui.js';
import { DatePicker } from '../vendor/ui.js';
import { Input } from '../vendor/ui.js';
import moment from '../vendor/dateTime.js';

import '../vendor/iconStyles.js';

import '../vendor/componentStyles.js';
function FormGroup({ label, children }) {
  return <div className="form-group"><label>{label}</label>{children}</div>;
}

export class UserEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  show() {
    if (!this.props.userId) return;
    this.setState({ visible: true }, () => {
      this.props.dispatch({ type: 'user/getUserInfoById', id: this.props.userId });
    });
  }

  hide() {
    this.setState({ visible: false }, () => {
      this.props.dispatch({ type: 'user/setState', payload: { user: {} } });
    });
  }

  formChange(field, value) {
    this.props.dispatch({
      type: 'user/setState',
      payload: { user: { ...this.props.user.user, [field]: value } },
    });
  }

  submit() {
    this.props.dispatch({
      type: 'user/update',
      params: { ...this.props.user.user },
      callback: () => this.hide(),
    });
  }

  renderForm(user) {
    const plans = this.props.plan.plans;
    return <div>
      <FormGroup label="邮箱"><Input placeholder="请输入邮箱" defaultValue={user.email} onChange={event => this.formChange('email', event.target.value)} /></FormGroup>
      <FormGroup label="邀请人邮箱"><Input placeholder="请输入邀请人邮箱" defaultValue={user.invite_user_email} onChange={event => this.formChange('invite_user_email', event.target.value)} /></FormGroup>
      <FormGroup label="密码"><Input defaultValue={user.password} placeholder="如需修改密码请输入" onChange={event => this.formChange('password', event.target.value)} /></FormGroup>
      <div className="row">
        <div className="form-group col-md-6 col-xs-12"><label>余额</label><Input type="number" addonAfter="¥" placeholder="余额" defaultValue={user.balance} onChange={event => this.formChange('balance', event.target.value)} /></div>
        <div className="form-group col-md-6 col-xs-12"><label>推广佣金</label><Input type="number" addonAfter="¥" placeholder="推广佣金" defaultValue={user.commission_balance} onChange={event => this.formChange('commission_balance', event.target.value)} /></div>
      </div>
      <div className="row">
        <div className="form-group col-md-6 col-xs-12"><label>已用上行</label><Input type="number" addonAfter="GB" placeholder="已用上行" defaultValue={user.u} onChange={event => this.formChange('u', event.target.value)} /></div>
        <div className="form-group col-md-6 col-xs-12"><label>已用下行</label><Input type="number" addonAfter="GB" placeholder="已用下行" defaultValue={user.d} onChange={event => this.formChange('d', event.target.value)} /></div>
      </div>
      <FormGroup label="流量"><Input type="number" addonAfter="GB" defaultValue={user.transfer_enable} placeholder="请输入流量" onChange={event => this.formChange('transfer_enable', event.target.value)} /></FormGroup>
      <FormGroup label="设备数限制"><Input placeholder="留空则不限制" defaultValue={user.device_limit} onChange={event => this.formChange('device_limit', event.target.value)} /></FormGroup>
      <FormGroup label="到期时间"><DatePicker placeholder="长期有效" defaultValue={user.expired_at !== null ? moment(1000 * user.expired_at) : null} style={{ width: '100%' }} onChange={date => this.formChange('expired_at', date ? date.format('X') : null)} /></FormGroup>
      <FormGroup label="订阅计划"><Select placeholder="请选择用户订阅计划" style={{ width: '100%' }} defaultValue={user.plan_id || null} onChange={planId => this.formChange('plan_id', planId)}><Select.Option value={null}>无</Select.Option>{plans.map(plan => <Select.Option key={plan.id} value={plan.id}>{plan.name}</Select.Option>)}</Select></FormGroup>
      <FormGroup label="账户状态"><Select style={{ width: '100%' }} defaultValue={user.banned ? 1 : 0} onChange={banned => this.formChange('banned', banned)}><Select.Option value={1}>封禁</Select.Option><Select.Option value={0}>正常</Select.Option></Select></FormGroup>
      <FormGroup label="推荐返利类型"><Select style={{ width: '100%' }} defaultValue={parseInt(user.commission_type, 10)} onChange={type => this.formChange('commission_type', type)}><Select.Option value={0}>跟随系统设置</Select.Option><Select.Option value={1}>循环返利</Select.Option><Select.Option value={2}>首次返利</Select.Option></Select></FormGroup>
      <FormGroup label="推荐返利比例"><Input addonAfter="%" defaultValue={user.commission_rate} placeholder="请输入推荐返利比例(为空则跟随站点设置返利比例)" onChange={event => this.formChange('commission_rate', event.target.value)} /></FormGroup>
      <FormGroup label={<>专享折扣比例 <Tooltip placement="top" title="设置后该用户购买任何订阅将始终享受该折扣"><Icon type="question-circle" /></Tooltip></>}><Input addonAfter="%" defaultValue={user.discount} placeholder="请输入专享折扣比例" onChange={event => this.formChange('discount', event.target.value)} /></FormGroup>
      <FormGroup label="限速"><Input addonAfter="Mbps" defaultValue={user.speed_limit} placeholder="留空则不限制" onChange={event => this.formChange('speed_limit', event.target.value)} /></FormGroup>
      <FormGroup label="是否管理员"><Switch checked={user.is_admin} onChange={enabled => this.formChange('is_admin', enabled ? 1 : 0)} /></FormGroup>
      <FormGroup label="是否员工"><Switch checked={user.is_staff} onChange={enabled => this.formChange('is_staff', enabled ? 1 : 0)} /></FormGroup>
      <FormGroup label="备注"><Input.TextArea rows={4} placeholder="请在这里记录.." defaultValue={user.remarks} onChange={event => this.formChange('remarks', event.target.value)} /></FormGroup>
    </div>;
  }

  render() {
    const { user, updateLoading } = this.props.user;
    return <>
      {React.cloneElement(this.props.children, { onClick: () => this.show() })}
      <Drawer id="user" width="80%" title="用户管理" visible={this.state.visible} onClose={() => this.hide()} cancelText="取消">
        {user.email ? <div>
          {this.renderForm(user)}
          <div className="v2board-drawer-action"><Button style={{ marginRight: 8 }} onClick={() => this.hide()}>取消</Button><Button disabled={updateLoading} loading={updateLoading} onClick={() => this.submit()} type="primary">提交</Button></div>
        </div> : <Icon type="loading" style={{ fontSize: 24, color: '#415A94' }} />}
      </Drawer>
    </>;
  }
}

const ConnectedUserEditor = connect(state => ({ user: state.user, plan: state.plan }))(UserEditor);
export { ConnectedUserEditor as a };
export default ConnectedUserEditor;
