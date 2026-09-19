import React from 'react';
import { Button } from '../../vendor/ui.js';
import ConfigRow from './ConfigRow.jsx';

function TextSetting({ title, description, value, onChange }) {
  return (
    <ConfigRow title={title} description={description}>
      <input
        type="text"
        className="form-control"
        placeholder="请输入"
        defaultValue={value}
        onChange={event => onChange(event.target.value)}
      />
    </ConfigRow>
  );
}

export default function EmailConfigTab({ email, templates, testSendMailLoading, onChange, onTestSendMail }) {
  return (
    <>
      <div className="block-content">
        <div className="row">
          <div className="col-lg-12">
            <div className="alert alert-warning" role="alert">
              <p className="mb-0">
                如果你更改了本页配置，需要对队列服务进行重启。另外本页配置优先级高于.env中邮件配置。
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <TextSetting title="SMTP服务器地址" description="由邮件服务商提供的服务地址" value={email.email_host} onChange={value => onChange('email_host', value)} />
        <TextSetting title="SMTP服务端口" description="常见的端口有25, 465, 587" value={email.email_port} onChange={value => onChange('email_port', value)} />
        <TextSetting title="SMTP加密方式" description="465端口加密方式一般为SSL，587端口加密方式一般为TLS" value={email.email_encryption} onChange={value => onChange('email_encryption', value)} />
        <TextSetting title="SMTP账号" description="由邮件服务商提供的账号" value={email.email_username} onChange={value => onChange('email_username', value)} />
        <TextSetting title="SMTP密码" description="由邮件服务商提供的密码" value={email.email_password} onChange={value => onChange('email_password', value)} />
        <TextSetting title="发件地址" description="由邮件服务商提供的发件地址" value={email.email_from_address} onChange={value => onChange('email_from_address', value)} />
        <ConfigRow title="邮件模板" description="你可以在文档查看如何自定义邮件模板">
          <select className="form-control" value={email.email_template} onChange={event => onChange('email_template', event.target.value)}>
            {templates.map(template => <option key={template} value={template}>{template}</option>)}
          </select>
        </ConfigRow>
        <ConfigRow title="发送测试邮件" description="邮件将会发送到当前登陆用户邮箱">
          <Button loading={testSendMailLoading} type="primary" onClick={onTestSendMail}>发送测试邮件</Button>
        </ConfigRow>
      </div>
    </>
  );
}
