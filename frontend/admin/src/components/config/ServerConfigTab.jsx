import React from 'react';
import { Input, Switch } from '../../vendor/ui.js';
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

function NumberSetting({ title, description, value, unit, onChange }) {
  return (
    <ConfigRow title={title} description={description}>
      <Input
        addonAfter={unit}
        size="large"
        type="number"
        placeholder="请输入"
        defaultValue={value}
        onChange={event => onChange(event.target.value)}
      />
    </ConfigRow>
  );
}

export default function ServerConfigTab({ server, onChange }) {
  return (
    <div>
      <TextSetting
        title="节点对接API地址"
        description="v2node节点一键对接专用地址。"
        value={server.server_api_url}
        onChange={value => onChange('server_api_url', value)}
      />
      <TextSetting
        title="通讯密钥"
        description="V2board与节点通讯的密钥，以便数据不会被他人获取。"
        value={server.server_token}
        onChange={value => onChange('server_token', value)}
      />
      <NumberSetting
        title="节点拉取动作轮询间隔"
        description="节点从面板获取数据的间隔频率。"
        unit="秒"
        value={server.server_pull_interval}
        onChange={value => onChange('server_pull_interval', value)}
      />
      <NumberSetting
        title="节点推送动作轮询间隔"
        description="节点推送数据到面板的间隔频率。"
        unit="秒"
        value={server.server_push_interval}
        onChange={value => onChange('server_push_interval', value)}
      />
      <NumberSetting
        title="节点用户流量上报最低阈值"
        description="每次推送动作仅累计使用流量高于阈值的用户信息会被上报，未上报流量会累计"
        unit="Kb"
        value={server.server_node_report_min_traffic}
        onChange={value => onChange('server_node_report_min_traffic', value)}
      />
      <NumberSetting
        title="节点用户设备数统计最低阈值"
        description="每次推送动作仅上报流量高于阈值的在线设备IP地址会被节点统计"
        unit="Kb"
        value={server.server_device_online_min_traffic}
        onChange={value => onChange('server_device_online_min_traffic', value)}
      />
      <ConfigRow title="全局设备数限制采用宽松模式" description="开启后同一IP地址使用多个节点只统计为一个设备">
        <Switch checked={parseInt(server.device_limit_mode)} onChange={enabled => onChange('device_limit_mode', enabled ? 1 : 0)} />
      </ConfigRow>
    </div>
  );
}
