import React from 'react';
import { connect } from 'react-redux';
import Input from 'antd/lib/input';
import Modal from 'antd/lib/modal';
import type { AdminDispatch } from '../types/store';

interface MailForm {
  subject?: string;
  content?: string;
}

interface UserMailState {
  sendMailLoading: boolean;
  filter: object[];
}

interface SendMailEditorOwnProps {
  children: React.ReactElement<{ onClick?: React.MouseEventHandler }>;
}

interface SendMailEditorProps extends SendMailEditorOwnProps {
  dispatch: AdminDispatch;
  user: UserMailState;
}

interface SendMailEditorState {
  visible: boolean;
  submit: MailForm;
}

interface SendMailRootState {
  user: UserMailState;
}

export class SendMailEditor extends React.Component<SendMailEditorProps, SendMailEditorState> {
  state: SendMailEditorState = { visible: false, submit: {} };

  show = () => this.setState({ visible: true });
  hide = () => this.setState({ visible: false });

  send = () => {
    this.props.dispatch({ type: 'user/sendMail', params: this.state.submit, callback: this.hide });
  };

  update = <Field extends keyof MailForm>(field: Field, value: MailForm[Field]): void => {
    this.setState(({ submit }) => ({ submit: { ...submit, [field]: value } }));
  };

  render() {
    const { children, user } = this.props;
    const { visible, submit } = this.state;
    return (
      <>
        {React.cloneElement(children, { onClick: this.show })}
        <Modal title="发送邮件" visible={visible} onOk={this.send} okButtonProps={{ loading: user.sendMailLoading }} onCancel={this.hide}>
          <div className="form-group">
            <label htmlFor="mail-recipient">收件人</label>
            <Input id="mail-recipient" disabled value={user.filter.length ? '过滤用户' : '全部用户'} />
          </div>
          <div className="form-group">
            <label htmlFor="mail-subject">主题</label>
            <Input id="mail-subject" placeholder="请输入邮件主题" value={submit.subject} onChange={event => this.update('subject', event.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="mail-content">发送内容</label>
            <Input.TextArea id="mail-content" rows={12} value={submit.content} placeholder="请输入邮件内容" onChange={event => this.update('content', event.target.value)} />
          </div>
        </Modal>
      </>
    );
  }
}

export default connect((state: SendMailRootState) => ({ user: state.user }))(SendMailEditor);
