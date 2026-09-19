import React from 'react';
import { connect } from '../vendor/reactRedux.js';
import { Drawer } from '../vendor/ui.js';
import { Button } from '../vendor/ui.js';
import { Tooltip } from '../vendor/ui.js';
import { Select } from '../vendor/ui.js';
import { Input } from '../vendor/ui.js';
import { Icon } from '../vendor/Icon.js';
import { notification } from '../vendor/notification.js';
import { PermissionGroupEditor } from '../vendor/ui.js';
import { JsonEditor } from '../vendor/ui.js';
import { TlsSettings, EncryptionSettings } from './ServerSecuritySettings.jsx';

import '../vendor/iconStyles.js';

const NETWORK_PRESETS = {
  tcp: JSON.stringify({ header: { type: 'http', request: { path: ['/'], headers: { Host: ['www.baidu.com', 'www.bing.com'] } }, response: {} } }, null, 4),
  ws: JSON.stringify({ security: 'auto', path: '/', headers: { Host: 'xtls.github.io' } }, null, 4),
  grpc: JSON.stringify({ serviceName: 'GunService' }, null, 4),
  kcp: JSON.stringify({ header: { type: 'none' }, seed: '' }, null, 4),
  httpupgrade: JSON.stringify({ path: '/', host: 'xtls.github.io' }, null, 4),
  xhttp: JSON.stringify({ path: '/', host: 'xtls.github.io', mode: 'auto', extra: {} }, null, 4),
};

export class VlessEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      server: props.record ? { ...props.record } : { tls: 0, rate: 1, flow: null },
      visible: false,
      childDrawer: { visible: false, title: '', type: null },
    };
  }

  open() {
    const server = { ...this.state.server };
    if (server.network_settings && typeof server.network_settings === 'object') server.network_settings = JSON.stringify(server.network_settings, null, 2);
    this.setState({ visible: true, server });
  }

  close() { this.setState({ visible: false }); }
  updateServer(field, value) { this.setState({ server: { ...this.state.server, [field]: value } }); }
  showChildDrawer(title, type) { this.setState({ childDrawer: { visible: true, title, type } }); }
  hideChildDrawer() { this.setState({ childDrawer: { ...this.state.childDrawer, visible: false } }); }

  save() {
    try {
      const payload = { ...this.state.server };
      payload.network_settings = payload.network_settings ? (typeof payload.network_settings === 'string' ? JSON.parse(payload.network_settings) : payload.network_settings) : null;
      this.props.dispatch({ type: 'serverVless/save', params: payload, callback: () => this.close() });
    } catch (error) {
      notification.error({ message: '请求失败', description: '传输协议配置格式有误' });
    }
  }

  renderChildDrawer() {
    const { server, childDrawer } = this.state;
    if (childDrawer.type === 'network_settings') return <div id="v2ray-protocol"><div className="form-group"><label>协议详细配置 <a href="https://www.v2ray.com/chapter_02/05_transport.html"><Icon type="link" />参考</a></label><JsonEditor placeholder={NETWORK_PRESETS[server.network] || ''} mode="json" theme="github" fontSize={14} showPrintMargin showGutter highlightActiveLine value={server.network_settings || ''} onChange={value => this.updateServer('network_settings', value)} setOptions={{ enableBasicAutocompletion: false, enableLiveAutocompletion: false, enableSnippets: false, showLineNumbers: true, tabSize: 2 }} /></div></div>;
    if (childDrawer.type === 'tls_settings') return <TlsSettings settings={server.tls_settings} tls={server.tls} onChange={settings => this.updateServer('tls_settings', settings)} />;
    if (childDrawer.type === 'encryption_settings') return <EncryptionSettings settings={server.encryption_settings} onChange={settings => this.updateServer('encryption_settings', settings)} />;
    return null;
  }

  render() {
    const { server, visible, childDrawer } = this.state;
    const { servers } = this.props.serverManage;
    const { groups } = this.props.serverGroup;
    const { routes } = this.props.serverRoute;
    const saveLoading = this.props.serverVless.saveLoading;
    return <>
      {React.cloneElement(this.props.children, { onClick: () => this.open() })}
      <Drawer id="server" maskClosable title={server.id ? '编辑节点' : '新建节点'} width="80%" visible={visible} onClose={() => this.close()}>
        <div>
          <div className="row"><div className="form-group col-8"><label>节点名称</label><Input placeholder="请输入节点名称" value={server.name} onChange={event => this.updateServer('name', event.target.value)} /></div><div className="form-group col-4"><label>倍率</label><Input addonAfter="x" placeholder="请输入节点倍率" value={server.rate} onChange={event => this.updateServer('rate', event.target.value)} /></div></div>
          <div className="form-group"><label>节点标签</label><Select mode="tags" value={server.tags || []} style={{ width: '100%' }} placeholder="输入后回车添加标签" onChange={tags => this.updateServer('tags', tags.length ? tags : null)} /></div>
          <div className="form-group"><label>权限组 <PermissionGroupEditor><a href="javascript:void(0);">添加权限组</a></PermissionGroupEditor></label><Select mode="multiple" value={server.group_id} placeholder="请选择权限组" style={{ width: '100%' }} onChange={groupIds => this.updateServer('group_id', groupIds)}>{groups.map(group => <Select.Option key={group.id} value={group.id}>{group.name}</Select.Option>)}</Select></div>
          <div className="row"><div className="form-group col-md-8 col-xs-12"><label>节点地址</label><Input placeholder="请输入连接地址" value={server.host} onChange={event => this.updateServer('host', event.target.value)} /></div><div className="form-group col-md-4 col-xs-12"><label>安全性 {parseInt(server.tls, 10) !== 0 && <a href="javascript:void(0);" onClick={() => this.showChildDrawer('编辑安全性配置', 'tls_settings')}>编辑配置</a>}</label><Select value={parseInt(server.tls, 10) || 0} style={{ width: '100%' }} onChange={value => this.updateServer('tls', value)}><Select.Option value={0}>无</Select.Option><Select.Option value={1}>TLS</Select.Option><Select.Option value={2}>Reality</Select.Option></Select></div></div>
          <div className="row"><div className="form-group col-md-6 col-xs-12"><label>连接端口</label><Input placeholder="用户连接端口" value={server.port} onChange={event => this.updateServer('port', event.target.value)} /></div><div className="form-group col-md-6 col-xs-12"><label>服务端口</label><Input placeholder="非NAT同连接端口" value={server.server_port} onChange={event => this.updateServer('server_port', event.target.value)} /></div></div>
          <div className="form-group"><label>传输协议 <a href="javascript:void(0);" onClick={() => this.showChildDrawer('编辑协议配置', 'network_settings')}>编辑配置</a></label><Select value={server.network} placeholder="选择传输协议" style={{ width: '100%' }} onChange={value => this.updateServer('network', value)}>{[['tcp', 'TCP'], ['ws', 'WebSocket'], ['grpc', 'gRPC'], ['kcp', 'mKCP'], ['httpupgrade', 'HTTPUpgrade'], ['xhttp', 'XHTTP']].map(([value, label]) => <Select.Option key={value} value={value}>{label}</Select.Option>)}</Select></div>
          <div className="form-group"><label>加密方式 {server.encryption && <a href="javascript:void(0);" onClick={() => this.showChildDrawer('编辑加密配置', 'encryption_settings')}>编辑配置</a>}</label><Select value={server.encryption} placeholder="选择加密方式" style={{ width: '100%' }} onChange={value => this.updateServer('encryption', value)}><Select.Option value={null}>无</Select.Option><Select.Option value="mlkem768x25519plus">MLKEM768X25519PLUS</Select.Option></Select></div>
          <div className="form-group"><label>XTLS流控算法</label><Select value={server.flow} placeholder="选择XTLS流控算法" style={{ width: '100%' }} onChange={value => this.updateServer('flow', value)}><Select.Option value={null}>无</Select.Option>{server.network === 'tcp' && <Select.Option value="xtls-rprx-vision">xtls-rprx-vision</Select.Option>}</Select></div>
          <div className="form-group"><label><Tooltip placement="top">父节点 <a target="_blank" href="https://docs.v2board.com/use/node.html#父节点与子节点关系" rel="noreferrer"><Icon type="read" /></a></Tooltip></label><Select value={server.parent_id || ''} onChange={value => this.updateServer('parent_id', value)} style={{ width: '100%' }}><Select.Option value="">无</Select.Option>{servers.filter(option => option.type === 'vless' && option.id !== server.id).map(option => <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>)}</Select></div>
          <div className="form-group"><label>路由组</label><Select mode="multiple" value={server.route_id || []} placeholder="请选择路由组" style={{ width: '100%' }} onChange={routeIds => this.updateServer('route_id', routeIds.length ? routeIds : null)}>{routes.map(route => <Select.Option key={route.id} value={route.id}>{route.remarks}</Select.Option>)}</Select></div>
        </div>
        <div className="v2board-drawer-action"><Button style={{ marginRight: 8 }} onClick={() => this.close()}>取消</Button><Button loading={saveLoading} onClick={() => this.save()} type="primary">提交</Button></div>
        <Drawer closable={false} id="server" width="80%" title={childDrawer.title} visible={childDrawer.visible} onClose={() => this.hideChildDrawer()}>{this.renderChildDrawer()}</Drawer>
      </Drawer>
    </>;
  }
}

export default connect(state => ({ serverVless: state.serverVless, serverGroup: state.serverGroup, serverManage: state.serverManage, serverRoute: state.serverRoute }))(VlessEditor);
