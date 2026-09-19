import React from 'react';
import { Button, Switch } from '../../vendor/ui.js';
import ConfigRow from './ConfigRow.jsx';

export default function TelegramConfigTab({ telegram, webhookLoading, onChange, onSetWebhook }) {
  return (
    <div>
      <ConfigRow title="机器人Token" description="请输入由Botfather提供的token。">
        <input
          type="text"
          className="form-control"
          placeholder="0000000000:xxxxxxxxx_xxxxxxxxxxxxxxx"
          defaultValue={telegram.telegram_bot_token}
          onChange={event => onChange('telegram_bot_token', event.target.value)}
        />
      </ConfigRow>
      {telegram.telegram_bot_token && (
        <ConfigRow title="设置Webhook" description="对机器人进行Webhook设置，不设置将无法收到Telegram通知。">
          <Button
            type="primary"
            onClick={onSetWebhook}
            loading={webhookLoading}
            disabled={webhookLoading}
          >
            一键设置
          </Button>
        </ConfigRow>
      )}
      <ConfigRow title="开启机器人通知" description="开启后bot将会对绑定了telegram的管理员和用户进行基础通知。">
        <Switch
          checked={parseInt(telegram.telegram_bot_enable)}
          onChange={enabled => onChange('telegram_bot_enable', enabled ? 1 : 0)}
        />
      </ConfigRow>
      <ConfigRow title="群组地址" description="填写后将会在用户端展示，或者被用于需要的地方。">
        <input
          type="text"
          className="form-control"
          placeholder="https://t.me/xxxxxx"
          defaultValue={telegram.telegram_discuss_link}
          onChange={event => onChange('telegram_discuss_link', event.target.value)}
        />
      </ConfigRow>
    </div>
  );
}
