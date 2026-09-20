import React from 'react';
import { connect } from 'react-redux';
import Input from 'antd/lib/input';
import Modal from 'antd/lib/modal';
import message from 'antd/lib/message';
import type { AdminDispatch, AdminRootState } from '../../types/store';
import type { UserModuleState } from '../../types/user';

interface MailForm {
    subject?: string;
    content?: string;
}

interface SendMailEditorOwnProps {
    children: React.ReactElement<{ onClick?: React.MouseEventHandler }>;
}

interface SendMailEditorProps extends SendMailEditorOwnProps {
    dispatch: AdminDispatch;
    user: UserModuleState;
}

interface SendMailEditorState {
    visible: boolean;
    submit: MailForm;
}

export class SendMailEditor extends React.Component<SendMailEditorProps, SendMailEditorState> {
    state: SendMailEditorState = { visible: false, submit: {} };

    show = () => this.setState({ visible: true });
    hide = () => this.setState({ visible: false });

    send = () => {
        this.props.dispatch({
            type: 'user/sendMail',
            params: this.state.submit,
            complete: () => message.success('已加入队列执行'),
            callback: this.hide,
        });
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
                <Modal
                    title="发送邮件"
                    visible={visible}
                    onOk={this.send}
                    okButtonProps={{ loading: user.sendMailLoading }}
                    onCancel={this.hide}
                >
                    <div className="form-group">
                        <label htmlFor="mail-recipient">收件人</label>
                        <Input
                            id="mail-recipient"
                            disabled
                            value={user.filter.length ? '过滤用户' : '全部用户'}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mail-subject">主题</label>
                        <Input
                            id="mail-subject"
                            placeholder="请输入邮件主题"
                            value={submit.subject}
                            onChange={(event) => this.update('subject', event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mail-content">发送内容</label>
                        <Input.TextArea
                            id="mail-content"
                            rows={12}
                            value={submit.content}
                            placeholder="请输入邮件内容"
                            onChange={(event) => this.update('content', event.target.value)}
                        />
                    </div>
                </Modal>
            </>
        );
    }
}

export default connect((state: AdminRootState) => ({ user: state.user }))(SendMailEditor);
