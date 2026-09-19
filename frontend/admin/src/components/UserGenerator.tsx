import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import DatePicker from 'antd/lib/date-picker';
import Input from 'antd/lib/input';
import Modal from 'antd/lib/modal';
import Select from 'antd/lib/select';
import type { AdminDispatch } from '../types/store';

interface UserGenerationForm {
  email_prefix?: string;
  email_suffix?: string;
  password?: string;
  expired_at?: string | number | null;
  plan_id?: string | number | null;
  generate_count?: string | number;
}

interface PlanOption {
  id: string | number;
  name: string;
}

interface UserGeneratorOwnProps {
  children: React.ReactElement<{ onClick?: React.MouseEventHandler }>;
}

interface UserGeneratorProps extends UserGeneratorOwnProps {
  dispatch: AdminDispatch;
  user: { generateLoading: boolean };
  plan: { plans?: PlanOption[] };
}

interface UserGeneratorState {
  visible: boolean;
  submit: UserGenerationForm;
}

interface UserGeneratorRootState {
  user: UserGeneratorProps['user'];
  plan: UserGeneratorProps['plan'];
}

export class UserGenerator extends React.Component<UserGeneratorProps, UserGeneratorState> {
  state: UserGeneratorState = { visible: false, submit: {} };

  show = () => this.setState({ visible: true });
  hide = () => this.setState({ visible: false, submit: {} });
  update = <Field extends keyof UserGenerationForm>(field: Field, value: UserGenerationForm[Field]): void => {
    this.setState(({ submit }) => ({ submit: { ...submit, [field]: value } }));
  };

  submit = () => {
    this.props.dispatch({ type: 'user/generate', params: { ...this.state.submit }, callback: this.hide });
  };

  render() {
    const { children, user, plan } = this.props;
    const { visible, submit } = this.state;
    const showPrefix = !submit.generate_count;
    const isBatch = !showPrefix;
    return (
      <>
        {React.cloneElement(children, { onClick: this.show })}
        <Modal title="创建用户" visible={visible} onCancel={this.hide} onOk={this.submit} okButtonProps={{ loading: user.generateLoading }} okText="生成" cancelText="取消">
          <div className="form-group">
            <label htmlFor="user-email-prefix">邮箱</label>
            <Input.Group compact>
              {showPrefix && <Input id="user-email-prefix" style={{ width: '45%' }} value={submit.email_prefix} onChange={event => this.update('email_prefix', event.target.value)} />}
              <Input placeholder="@" disabled style={{ width: '10%', textAlign: 'center' }} />
              <Input placeholder="域" style={{ width: showPrefix ? '45%' : '90%' }} value={submit.email_suffix} onChange={event => this.update('email_suffix', event.target.value)} />
            </Input.Group>
          </div>
          <div className="form-group">
            <label htmlFor="user-password">密码</label>
            <Input id="user-password" value={submit.password} placeholder="留空则密码与邮箱相同" onChange={event => this.update('password', event.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="user-expired-at">到期时间</label>
            <DatePicker id="user-expired-at" style={{ width: '100%' }} placeholder="请选择用户到期日期，为空则不限制到期时间" defaultValue={submit.expired_at ? moment.unix(Number(submit.expired_at)) : undefined} onChange={value => this.update('expired_at', value ? value.format('X') : null)} />
          </div>
          <div className="form-group">
            <label htmlFor="user-plan">订阅计划</label>
            <Select id="user-plan" style={{ width: '100%' }} placeholder="请选择用户订阅计划" value={submit.plan_id || null} onChange={(value: string | number | null) => this.update('plan_id', value)}>
              <Select.Option value={null!}>无</Select.Option>
              {(plan.plans || []).map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
            </Select>
          </div>
          {isBatch && <div className="form-group"><label htmlFor="user-generate-count">生成数量</label><Input id="user-generate-count" value={submit.generate_count} placeholder="如果为批量生成请输入生成数量" onChange={event => this.update('generate_count', event.target.value)} /></div>}
        </Modal>
      </>
    );
  }
}

export default connect((state: UserGeneratorRootState) => ({ user: state.user, plan: state.plan }))(UserGenerator);
