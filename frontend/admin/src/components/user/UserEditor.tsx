import React from 'react';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import DatePicker from 'antd/lib/date-picker';
import Drawer from 'antd/lib/drawer';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Switch from 'antd/lib/switch';
import Tooltip from 'antd/lib/tooltip';
import moment from 'moment';
import type { AdminDispatch, AdminRootState } from '../../types/store';
import type { UserModuleState, UserPlanOption, UserRecord } from '../../types/user';


interface FormGroupProps { label: React.ReactNode; children: React.ReactNode; }
function FormGroup({ label, children }: FormGroupProps) { return <div className="form-group"><label>{label}</label>{children}</div>; }

interface UserEditorOwnProps { userId?: string | number; children: React.ReactElement; }
interface UserEditorProps extends UserEditorOwnProps {
  dispatch: AdminDispatch;
  user: UserModuleState;
  plan: { plans: UserPlanOption[] };
}
interface UserEditorState { visible: boolean; }
const EMPTY_PLAN_VALUE = null as never;

export class UserEditor extends React.Component<UserEditorProps, UserEditorState> {
  state = { visible: false };

  show(): void {
    if (!this.props.userId) return;
    this.setState({ visible: true }, () => this.props.dispatch({ type: 'user/getUserInfoById', id: this.props.userId }));
  }

  hide(): void {
    this.setState({ visible: false }, () => this.props.dispatch({ type: 'user/setState', payload: { user: {} } }));
  }

  formChange<Field extends keyof UserRecord>(field: Field, value: UserRecord[Field]): void {
    this.props.dispatch({ type: 'user/setState', payload: { user: { ...this.props.user.user, [field]: value } } });
  }

  submit(): void {
    this.props.dispatch({ type: 'user/update', params: { ...this.props.user.user }, callback: () => this.hide() });
  }

  renderForm(user: Partial<UserRecord>): React.ReactElement {
    const plans = this.props.plan.plans;
    return <div>
      <FormGroup label="邮箱"><Input placeholder="请输入邮箱" defaultValue={user.email} onChange={event => this.formChange('email', event.target.value)} /></FormGroup>
      <FormGroup label="邀请人邮箱"><Input placeholder="请输入邀请人邮箱" defaultValue={user.invite_user_email} onChange={event => this.formChange('invite_user_email', event.target.value)} /></FormGroup>
      <FormGroup label="密码"><Input defaultValue={user.password} placeholder="如需修改密码请输入" onChange={event => this.formChange('password', event.target.value)} /></FormGroup>
      <div className="row"><div className="form-group col-md-6 col-xs-12"><label>余额</label><Input type="number" addonAfter="¥" placeholder="余额" defaultValue={user.balance as string | number | undefined} onChange={event => this.formChange('balance', event.target.value)} /></div><div className="form-group col-md-6 col-xs-12"><label>推广佣金</label><Input type="number" addonAfter="¥" placeholder="推广佣金" defaultValue={user.commission_balance as string | number | undefined} onChange={event => this.formChange('commission_balance', event.target.value)} /></div></div>
      <div className="row"><div className="form-group col-md-6 col-xs-12"><label>已用上行</label><Input type="number" addonAfter="GB" placeholder="已用上行" defaultValue={user.u as string | number | undefined} onChange={event => this.formChange('u', event.target.value)} /></div><div className="form-group col-md-6 col-xs-12"><label>已用下行</label><Input type="number" addonAfter="GB" placeholder="已用下行" defaultValue={user.d as string | number | undefined} onChange={event => this.formChange('d', event.target.value)} /></div></div>
      <FormGroup label="流量"><Input type="number" addonAfter="GB" defaultValue={user.transfer_enable as string | number | undefined} placeholder="请输入流量" onChange={event => this.formChange('transfer_enable', event.target.value)} /></FormGroup>
      <FormGroup label="设备数限制"><Input placeholder="留空则不限制" defaultValue={user.device_limit as string | number | undefined} onChange={event => this.formChange('device_limit', event.target.value)} /></FormGroup>
      <FormGroup label="到期时间"><DatePicker placeholder="长期有效" defaultValue={user.expired_at !== null && user.expired_at !== undefined ? moment(1000 * Number(user.expired_at)) : null} style={{ width: '100%' }} onChange={date => this.formChange('expired_at', date ? date.format('X') : null)} /></FormGroup>
      <FormGroup label="订阅计划"><Select placeholder="请选择用户订阅计划" style={{ width: '100%' }} defaultValue={user.plan_id || undefined} onChange={planId => this.formChange('plan_id', planId)}><Select.Option value={EMPTY_PLAN_VALUE}>无</Select.Option>{plans.map(plan => <Select.Option key={plan.id} value={plan.id}>{plan.name}</Select.Option>)}</Select></FormGroup>
      <FormGroup label="账户状态"><Select style={{ width: '100%' }} defaultValue={user.banned ? 1 : 0} onChange={banned => this.formChange('banned', banned)}><Select.Option value={1}>封禁</Select.Option><Select.Option value={0}>正常</Select.Option></Select></FormGroup>
      <FormGroup label="推荐返利类型"><Select style={{ width: '100%' }} defaultValue={parseInt(String(user.commission_type), 10)} onChange={type => this.formChange('commission_type', type)}><Select.Option value={0}>跟随系统设置</Select.Option><Select.Option value={1}>循环返利</Select.Option><Select.Option value={2}>首次返利</Select.Option></Select></FormGroup>
      <FormGroup label="推荐返利比例"><Input addonAfter="%" defaultValue={user.commission_rate as string | number | undefined} placeholder="请输入推荐返利比例(为空则跟随站点设置返利比例)" onChange={event => this.formChange('commission_rate', event.target.value)} /></FormGroup>
      <FormGroup label={<>专享折扣比例 <Tooltip placement="top" title="设置后该用户购买任何订阅将始终享受该折扣"><Icon type="question-circle" /></Tooltip></>}><Input addonAfter="%" defaultValue={user.discount as string | number | undefined} placeholder="请输入专享折扣比例" onChange={event => this.formChange('discount', event.target.value)} /></FormGroup>
      <FormGroup label="限速"><Input addonAfter="Mbps" defaultValue={user.speed_limit as string | number | undefined} placeholder="留空则不限制" onChange={event => this.formChange('speed_limit', event.target.value)} /></FormGroup>
      <FormGroup label="是否管理员"><Switch checked={Boolean(user.is_admin)} onChange={enabled => this.formChange('is_admin', enabled ? 1 : 0)} /></FormGroup>
      <FormGroup label="是否员工"><Switch checked={Boolean(user.is_staff)} onChange={enabled => this.formChange('is_staff', enabled ? 1 : 0)} /></FormGroup>
      <FormGroup label="备注"><Input.TextArea rows={4} placeholder="请在这里记录.." defaultValue={user.remarks} onChange={event => this.formChange('remarks', event.target.value)} /></FormGroup>
    </div>;
  }

  render(): React.ReactNode {
    const { user, updateLoading } = this.props.user;
    return <>{React.cloneElement(this.props.children, { onClick: () => this.show() })}<Drawer width="80%" title="用户管理" visible={this.state.visible} onClose={() => this.hide()}>{user.email ? <div>{this.renderForm(user)}<div className="v2board-drawer-action"><Button style={{ marginRight: 8 }} onClick={() => this.hide()}>取消</Button><Button disabled={updateLoading} loading={updateLoading} onClick={() => this.submit()} type="primary">提交</Button></div></div> : <Icon type="loading" style={{ fontSize: 24, color: '#415A94' }} />}</Drawer></>;
  }
}

export default connect((state: AdminRootState) => ({ user: state.user, plan: state.plan }))(UserEditor);
