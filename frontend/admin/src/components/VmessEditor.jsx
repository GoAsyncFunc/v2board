import React from 'react';
import { connect } from '../vendor/reactRedux.js';
import { Drawer } from '../vendor/ui.js';
import { Button } from '../vendor/ui.js';
import { Tooltip } from '../vendor/ui.js';
import { Select } from '../vendor/ui.js';
import { Input } from '../vendor/ui.js';
import { Icon } from '../vendor/Icon.js';
import { Divider } from '../vendor/Divider.js';
import { Switch } from '../vendor/ui.js';
import { notification } from '../vendor/notification.js';
import PermissionGroupEditor from './PermissionGroupEditor.jsx';
import JsonEditor from './JsonEditor.jsx';

import '../vendor/iconStyles.js';

const NETWORK_PRESETS = {
  tcp: JSON.stringify({ header: { type: 'http', request: { path: ['/'], headers: { Host: ['www.baidu.com', 'www.bing.com'] } }, response: {} } }, null, 4),
  ws: JSON.stringify({ path: '/', headers: { Host: 'v2ray.com' } }, null, 4),
  grpc: JSON.stringify({ serviceName: 'GunService' }, null, 4),
  kcp: JSON.stringify({ header: { type: 'none' }, seed: '' }, null, 4),
  httpupgrade: JSON.stringify({ path: '/', host: 'xtls.github.io' }, null, 4),
  xhttp: JSON.stringify({ path: '/', host: 'xtls.github.io' }, null, 4),
};

function prepareServer(record) {
  const server = record ? { ...record } : { tls: 0, rate: 1 };
  if (server.networkSettings && typeof server.networkSettings === 'object') {
    server.networkSettings = JSON.stringify(server.networkSettings, null, 2);
  }
  return server;
}

export class DnsSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { settings: props.settings || { servers: [], hosts: {} } };
  }

  commit(settings) {
    this.setState({ settings }, () => this.props.onChange(this.state.settings));
  }

  addServer() {
    this.commit({
      ...this.state.settings,
      servers: [...this.state.settings.servers, { address: '', port: 53, domains: [], expectIPs: [] }],
    });
  }

  dropServer(index) {
    this.commit({ ...this.state.settings, servers: this.state.settings.servers.filter((server, serverIndex) => serverIndex !== index) });
  }

  changeServer(index, field, value) {
    const servers = this.state.settings.servers.map((server, serverIndex) => serverIndex === index
      ? { ...server, [field]: field === 'domains' ? value.split('\n') : value }
      : server);
    this.commit({ ...this.state.settings, servers });
  }

  render() {
    return <div className="form-group">
      <label>DNS服务器表</label>
      {this.state.settings.servers.map((server, index) => <div key={`${server.address}-${index}`}>
        <div className="row">
          <Divider type="horizontal">{server.address || `服务器组${index + 1}`} <Icon type="delete" style={{ color: '#ff4d4f' }} onClick={() => this.dropServer(index)} /></Divider>
          <div className="form-group col-md-9 col-xs-12"><label>DNS服务器地址</label><Input placeholder="请输入DNS服务器地址" value={server.address} onChange={event => this.changeServer(index, 'address', event.target.value)} /></div>
          <div className="form-group col-md-3 col-xs-12"><label>端口</label><Input type="number" placeholder="端口" value={server.port} onChange={event => this.changeServer(index, 'port', parseInt(event.target.value, 10))} /></div>
        </div>
        <div className="form-group"><label>域名</label><Input.TextArea rows={5} value={server.domains?.join('\n')} placeholder="域名列表，此列表包含的域名，将优先使用此服务器进行查询。一行一条" onChange={event => this.changeServer(index, 'domains', event.target.value)} /></div>
      </div>)}
      <Button type="primary" style={{ width: '100%' }} onClick={() => this.addServer()}>添加</Button>
    </div>;
  }
}

export class RuleSettings extends React.Component {
  constructor(props) {
    super(props);
    const settings = props.settings && Object.keys(props.settings).length ? props.settings : { domain: [], protocol: [] };
    this.state = { settings };
  }

  change(field, value) {
    const settings = { ...this.state.settings, [field]: value.split('\n') };
    this.setState({ settings });
    this.props.onChange(settings);
  }

  render() {
    const { domain, protocol } = this.state.settings;
    return <>
      <div className="form-group"><label>域名过滤器</label><Input.TextArea value={domain?.join('\n')} onChange={event => this.change('domain', event.target.value)} rows={5} /></div>
      <div className="form-group"><label>协议过滤器</label><Input.TextArea value={protocol?.join('\n')} onChange={event => this.change('protocol', event.target.value)} rows={5} /></div>
    </>;
  }
}

export class TlsSettings extends React.Component {
  constructor(props) {
    super(props);
    const settings = props.settings && Object.keys(props.settings).length ? props.settings : { serverName: '', allowInsecure: 0 };
    this.state = { settings };
  }

  change(field, value) {
    const settings = { ...this.state.settings, [field]: value };
    this.setState({ settings });
    this.props.onChange(settings);
  }

  render() {
    const { serverName, allowInsecure } = this.state.settings;
    return <div>
      <div className="form-group"><label>Server Name</label><Input value={serverName} onChange={event => this.change('serverName', event.target.value)} placeholder="不使用请留空" /></div>
      <div className="form-group"><label>Allow Insecure</label><div><Switch checked={Boolean(parseInt(allowInsecure, 10))} onChange={enabled => this.change('allowInsecure', enabled ? '1' : '0')} /></div></div>
    </div>;
  }
}

export class VmessEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      server: prepareServer(props.record),
      visible: false,
      childDrawer: { visible: false, title: '', type: undefined },
    };
  }

  toggle() { this.setState({ visible: !this.state.visible }); }
  updateServer(field, value) { this.setState({ server: { ...this.state.server, [field]: value } }); }
  showChildDrawer(title, type) { this.setState({ childDrawer: { visible: true, title, type } }); }
  hideChildDrawer() { this.setState({ childDrawer: { ...this.state.childDrawer, visible: false } }); }

  save() {
    try {
      const { server } = this.state;
      const params = {
        ...server,
        networkSettings: server.networkSettings
          ? (typeof server.networkSettings === 'string' ? JSON.parse(server.networkSettings) : server.networkSettings)
          : null,
        dnsSettings: server.dnsSettings?.servers?.length ? server.dnsSettings : null,
      };
      this.props.dispatch({ type: 'serverVmess/save', params, callback: () => this.toggle() });
    } catch (error) {
      notification.error({ message: '请求失败', description: '传输协议配置格式有误' });
    }
  }

  renderChildDrawer() {
    const { server, childDrawer } = this.state;
    if (childDrawer.type === 'networkSettings') {
      return <div id="v2ray-protocol"><div className="form-group">
        <label>协议详细配置 <a href="https://www.v2ray.com/chapter_02/05_transport.html"><Icon type="link" />参考</a></label>
        <JsonEditor placeholder={NETWORK_PRESETS[server.network] || ''} mode="json" theme="github" fontSize={14} showPrintMargin showGutter highlightActiveLine value={server.networkSettings || ''} onChange={value => this.updateServer('networkSettings', value)} setOptions={{ enableBasicAutocompletion: false, enableLiveAutocompletion: false, enableSnippets: false, showLineNumbers: true, tabSize: 2 }} />
      </div></div>;
    }
    if (childDrawer.type === 'ruleSettings') return <RuleSettings settings={server.ruleSettings} onChange={settings => this.updateServer('ruleSettings', settings)} />;
    if (childDrawer.type === 'tlsSettings') return <TlsSettings settings={server.tlsSettings} onChange={settings => this.updateServer('tlsSettings', settings)} />;
    if (childDrawer.type === 'dnsSettings') return <DnsSettings settings={server.dnsSettings} onChange={settings => this.updateServer('dnsSettings', settings)} />;
    return null;
  }

  render() {
    const { server, visible, childDrawer } = this.state;
    const { groups } = this.props.serverGroup;
    const { servers } = this.props.serverManage;
    const { routes } = this.props.serverRoute;
    const saveLoading = this.props.serverVmess.saveLoading;

    return <>
      {React.cloneElement(this.props.children, { onClick: () => this.setState({ visible: true }) })}
      <Drawer id="server" maskClosable title={server.id ? '编辑节点' : '新建节点'} width="80%" visible={visible} onClose={() => this.toggle()}>
        <div>
          <div className="row">
            <div className="form-group col-8"><label>节点名称</label><Input placeholder="请输入节点名称" value={server.name} onChange={event => this.updateServer('name', event.target.value)} /></div>
            <div className="form-group col-4"><label>倍率</label><Input addonAfter="x" placeholder="请输入节点倍率" value={server.rate} onChange={event => this.updateServer('rate', event.target.value)} /></div>
          </div>
          <div className="form-group"><label>节点标签</label><Select mode="tags" value={server.tags || []} style={{ width: '100%' }} placeholder="输入后回车添加标签" onChange={tags => this.updateServer('tags', tags.length ? tags : null)} /></div>
          <div className="form-group"><label>权限组 <PermissionGroupEditor><a href="javascript:void(0);">添加权限组</a></PermissionGroupEditor></label><Select mode="multiple" value={server.group_id} placeholder="请选择权限组" style={{ width: '100%' }} onChange={groupIds => this.updateServer('group_id', groupIds)}>{groups.map(group => <Select.Option key={group.id} value={group.id}>{group.name}</Select.Option>)}</Select></div>
          <div className="row">
            <div className="form-group col-md-8 col-xs-12"><label>节点地址</label><Input placeholder="请输入连接地址" value={server.host} onChange={event => this.updateServer('host', event.target.value)} /></div>
            <div className="form-group col-md-4 col-xs-12"><label>TLS <a href="javascript:void(0);" onClick={() => this.showChildDrawer('编辑TLS配置', 'tlsSettings')}>编辑配置</a></label><Select value={parseInt(server.tls, 10) ? 1 : 0} placeholder="是否支持TLS" style={{ width: '100%' }} onChange={tls => this.updateServer('tls', tls)}><Select.Option value={0}>不支持</Select.Option><Select.Option value={1}>支持</Select.Option></Select></div>
          </div>
          <div className="row">
            <div className="form-group col-md-6 col-xs-12"><label>连接端口</label><Input placeholder="用户连接端口" value={server.port} onChange={event => this.updateServer('port', event.target.value)} /></div>
            <div className="form-group col-md-6 col-xs-12"><label>服务端口</label><Input placeholder="非NAT同连接端口" value={server.server_port} onChange={event => this.updateServer('server_port', event.target.value)} /></div>
          </div>
          <div className="form-group"><label>传输协议 <a href="javascript:void(0);" onClick={() => this.showChildDrawer('编辑协议配置', 'networkSettings')}>编辑配置</a></label><Select value={server.network} placeholder="选择传输协议" style={{ width: '100%' }} onChange={network => this.updateServer('network', network)}><Select.Option value="tcp">TCP</Select.Option><Select.Option value="ws">WebSocket</Select.Option><Select.Option value="grpc">gRPC</Select.Option><Select.Option value="kcp">mKCP</Select.Option><Select.Option value="httpupgrade">HTTPUpgrade</Select.Option><Select.Option value="xhttp">XHTTP</Select.Option></Select></div>
          <div className="form-group"><label><Tooltip placement="top">父节点 <a target="_blank" href="https://docs.v2board.com/use/node.html#父节点与子节点关系" rel="noreferrer"><Icon type="read" /></a></Tooltip></label><Select value={server.parent_id || ''} onChange={parentId => this.updateServer('parent_id', parentId)} style={{ width: '100%' }}><Select.Option value="">无</Select.Option>{servers.filter(option => option.type === 'vmess' && option.id !== server.id).map(option => <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>)}</Select></div>
          <div className="form-group"><label>路由组</label><Select mode="multiple" value={server.route_id || []} placeholder="请选择路由组" style={{ width: '100%' }} onChange={routeIds => this.updateServer('route_id', routeIds.length ? routeIds : null)}>{routes.map(route => <Select.Option key={route.id} value={route.id}>{route.remarks}</Select.Option>)}</Select></div>
        </div>
        <div className="v2board-drawer-action"><Button style={{ marginRight: 8 }} onClick={() => this.toggle()}>取消</Button><Button loading={saveLoading} onClick={() => this.save()} type="primary">提交</Button></div>
        <Drawer closable={false} id="server-child-settings" width="80%" title={childDrawer.title} visible={childDrawer.visible} onClose={() => this.hideChildDrawer()}>{this.renderChildDrawer()}</Drawer>
      </Drawer>
    </>;
  }
}

const ConnectedVmessEditor = connect(state => ({
  serverVmess: state.serverVmess,
  serverGroup: state.serverGroup,
  serverManage: state.serverManage,
  serverRoute: state.serverRoute,
}))(VmessEditor);

export default ConnectedVmessEditor;
