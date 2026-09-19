import React from 'react';
import { connect } from '../vendor/reactRedux.js';
import { Drawer } from '../vendor/ui.js';
import { Button } from '../vendor/ui.js';
import { Tooltip } from '../vendor/ui.js';
import { Select } from '../vendor/ui.js';
import { Input } from '../vendor/ui.js';
import { Icon } from '../vendor/Icon.js';
import { PermissionGroupEditor } from '../vendor/ui.js';
import { JsonEditor } from '../vendor/ui.js';
import { TlsSettings, EncryptionSettings } from './ServerSecuritySettings.jsx';

import '../vendor/iconStyles.js';

const NETWORK_PRESETS = {
  tcp: JSON.stringify({ acceptProxyProtocol: false, header: { type: 'http', request: { path: ['/'], headers: { Host: ['www.baidu.com', 'www.bing.com'] } }, response: {} } }, null, 4),
  http: JSON.stringify({ acceptProxyProtocol: false, path: '/', Host: 'xtls.github.io' }, null, 4),
  ws: JSON.stringify({ acceptProxyProtocol: false, path: '/', headers: { Host: 'xtls.github.io' } }, null, 4),
  grpc: JSON.stringify({ serviceName: 'GunService' }, null, 4),
  httpupgrade: JSON.stringify({ acceptProxyProtocol: false, path: '/', host: 'xtls.github.io' }, null, 4),
  xhttp: JSON.stringify({ path: '/', host: 'xtls.github.io', mode: 'auto', extra: {} }, null, 4),
};

const DEFAULT_PADDING_SCHEME = JSON.stringify(['stop=8', '0=30-30', '1=100-400', '2=400-500,c,500-1000,c,500-1000,c,500-1000,c,500-1000', '3=9-9,500-1000', '4=500-1000', '5=500-1000', '6=500-1000', '7=500-1000'], null, 4);
const TLS_PROTOCOLS = ['anytls', 'hysteria2', 'trojan', 'tuic'];

export class V2NodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      server: props.record ? { ...props.record } : { tls: 0, rate: 1, network: 'tcp', disable_sni: 0, zero_rtt_handshake: 0, flow: null },
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

  updateServer(field, value) {
    if (field === 'protocol' && TLS_PROTOCOLS.includes(value)) this.setState({ server: { ...this.state.server, protocol: value, tls: 1 } });
    else this.setState({ server: { ...this.state.server, [field]: value } });
  }

  showChildDrawer(title, type) { this.setState({ childDrawer: { visible: true, title, type } }); }
  hideChildDrawer() { this.setState({ childDrawer: { ...this.state.childDrawer, visible: false } }); }

  save() {
    const payload = JSON.parse(JSON.stringify(this.state.server));
    payload.network_settings = payload.network_settings ? (typeof payload.network_settings === 'string' ? JSON.parse(payload.network_settings) : payload.network_settings) : null;
    delete payload.install_command;
    this.props.dispatch({ type: 'serverV2node/save', params: payload, callback: () => this.close() });
  }

  renderJsonEditor(value, placeholder, field, id) {
    return <div id={id}><div className="form-group"><JsonEditor placeholder={placeholder} mode="json" theme="github" fontSize={14} showPrintMargin showGutter highlightActiveLine value={value || ''} onChange={nextValue => this.updateServer(field, nextValue)} setOptions={{ enableBasicAutocompletion: false, enableLiveAutocompletion: false, enableSnippets: false, showLineNumbers: true, tabSize: 2 }} /></div></div>;
  }

  renderChildDrawer() {
    const { server, childDrawer } = this.state;
    if (childDrawer.type === 'network_settings') return this.renderJsonEditor(typeof server.network_settings === 'object' ? JSON.stringify(server.network_settings, null, 2) : server.network_settings, NETWORK_PRESETS[server.network] || '', 'network_settings', 'v2ray-protocol');
    if (childDrawer.type === 'tls_settings') return <TlsSettings settings={server.tls_settings} tls={server.tls} certApply onChange={settings => this.updateServer('tls_settings', settings)} />;
    if (childDrawer.type === 'encryption_settings') return <EncryptionSettings settings={server.encryption_settings} onChange={settings => this.updateServer('encryption_settings', settings)} />;
    if (childDrawer.type === 'padding_scheme') return this.renderJsonEditor(server.padding_scheme, DEFAULT_PADDING_SCHEME, 'padding_scheme', 'anytls-padding-scheme');
    return null;
  }

  yesNoSelect(field, value) {
    return <Select value={parseInt(value, 10) ? 1 : 0} style={{ width: '100%' }} onChange={nextValue => this.updateServer(field, nextValue)}><Select.Option value={0}>否</Select.Option><Select.Option value={1}>是</Select.Option></Select>;
  }

  render() {
    const { server, visible, childDrawer } = this.state;
    const { groups } = this.props.serverGroup;
    const { servers } = this.props.serverManage;
    const { routes } = this.props.serverRoute;
    const saveLoading = this.props.serverV2node.saveLoading;
    const protocol = server.protocol;
    const requiresTls = ['hysteria2', 'trojan', 'tuic'].includes(protocol);
    const supportsTransport = protocol && !['hysteria2', 'shadowsocks', 'tuic'].includes(protocol);

    return <>
      {React.cloneElement(this.props.children, { onClick: () => this.open() })}
      <Drawer id="server" maskClosable title={server.id ? '编辑节点' : '新建节点'} width="80%" visible={visible} onClose={() => this.close()}>
        <div>
          <div className="row"><div className="form-group col-8"><label>节点名称</label><Input placeholder="请输入节点名称" value={server.name} onChange={event => this.updateServer('name', event.target.value)} /></div><div className="form-group col-4"><label>倍率</label><Input addonAfter="x" placeholder="请输入节点倍率" value={server.rate} onChange={event => this.updateServer('rate', event.target.value)} /></div></div>
          <div className="form-group"><label>节点标签</label><Select mode="tags" value={server.tags || []} style={{ width: '100%' }} placeholder="输入后回车添加标签" onChange={tags => this.updateServer('tags', tags.length ? tags : null)} /></div>
          <div className="form-group"><label>权限组 <PermissionGroupEditor><a href="javascript:void(0);">添加权限组</a></PermissionGroupEditor></label><Select mode="multiple" value={server.group_id} placeholder="请选择权限组" style={{ width: '100%' }} onChange={groupIds => this.updateServer('group_id', groupIds)}>{groups.map(group => <Select.Option key={group.id} value={group.id}>{group.name}</Select.Option>)}</Select></div>
          <div className="row"><div className="form-group col-md-6 col-xs-12"><label>连接地址</label><Input placeholder="地址或IP" value={server.host} onChange={event => this.updateServer('host', event.target.value)} /></div><div className="form-group col-md-6 col-xs-12"><label>监听地址</label><Input placeholder="地址或IP默认为0.0.0.0" value={server.listen_ip} onChange={event => this.updateServer('listen_ip', event.target.value)} /></div></div>
          <div className="row"><div className="form-group col-md-6 col-xs-12"><label>连接端口</label><Input placeholder="用户连接端口" value={server.port} onChange={event => this.updateServer('port', event.target.value)} /></div><div className="form-group col-md-6 col-xs-12"><label>服务端口</label><Input placeholder="服务端开放端口" value={server.server_port} onChange={event => this.updateServer('server_port', event.target.value)} /></div></div>
          <div className="row">
            <div className="form-group col-md-6 col-xs-12"><label>节点协议</label><Select value={protocol} style={{ width: '100%' }} onChange={value => this.updateServer('protocol', value)}>{[['anytls', 'AnyTLS'], ['hysteria2', 'Hysteria2'], ['shadowsocks', 'Shadowsocks'], ['trojan', 'Trojan'], ['tuic', 'Tuic'], ['vless', 'VLess'], ['vmess', 'VMess']].map(([value, label]) => <Select.Option key={value} value={value}>{label}</Select.Option>)}</Select></div>
            {protocol && protocol !== 'shadowsocks' && <div className="form-group col-md-6 col-xs-12"><label>安全性 {(parseInt(server.tls, 10) !== 0 || requiresTls) && <a href="javascript:void(0);" onClick={() => this.showChildDrawer('编辑安全性配置', 'tls_settings')}>编辑配置</a>}</label><Select value={parseInt(server.tls, 10) || (requiresTls ? 1 : 0)} style={{ width: '100%' }} onChange={value => this.updateServer('tls', value)}>{['vless', 'vmess'].includes(protocol) && <Select.Option value={0}>无</Select.Option>}<Select.Option value={1}>TLS</Select.Option>{['vless', 'anytls'].includes(protocol) && <Select.Option value={2}>Reality</Select.Option>}</Select></div>}
          </div>
          {protocol === 'shadowsocks' && <div className="form-group"><label>传输协议 <a href="javascript:void(0);" onClick={() => this.showChildDrawer('编辑协议配置', 'network_settings')}>编辑配置</a></label><Select value={server.network ?? 'tcp'} style={{ width: '100%' }} onChange={value => this.updateServer('network', value)}><Select.Option value="tcp">TCP</Select.Option><Select.Option value="http">HTTP伪装</Select.Option></Select></div>}
          {supportsTransport && <div className="form-group"><label>传输协议 <a href="javascript:void(0);" onClick={() => this.showChildDrawer('编辑协议配置', 'network_settings')}>编辑配置</a></label><Select value={server.network ?? 'tcp'} style={{ width: '100%' }} onChange={value => this.updateServer('network', value)}><Select.Option value="tcp">TCP</Select.Option><Select.Option value="ws">WebSocket</Select.Option><Select.Option value="grpc">gRPC</Select.Option>{protocol !== 'trojan' && <Select.Option value="httpupgrade">HTTPUpgrade</Select.Option>}{protocol !== 'trojan' && <Select.Option value="xhttp">XHTTP</Select.Option>}</Select></div>}
          {['xhttp', 'ws', 'grpc'].includes(server.network) && <div className="form-group"><label>信任的XFF头部(获取真实IP)</label><Select mode="tags" value={server.trusted_x_forwarded_for || []} style={{ width: '100%' }} placeholder="常见头部:X-Forwarded-For CF-Connecting-IP X-Real-IP" onChange={headers => this.updateServer('trusted_x_forwarded_for', headers.length ? headers : null)} /></div>}
          {protocol === 'anytls' && <div className="form-group"><label><a href="javascript:void(0);" onClick={() => this.showChildDrawer('编辑填充方案', 'padding_scheme')}>编辑填充方案</a></label></div>}
          {protocol === 'hysteria2' && <><div className="row"><div className="form-group col-md-6 col-xs-12"><label>混淆方式obfs</label><Select value={server.obfs} style={{ width: '100%' }} onChange={value => this.updateServer('obfs', value)}><Select.Option value={null}>无</Select.Option><Select.Option value="salamander">salamander</Select.Option></Select></div>{server.obfs === 'salamander' && <div className="form-group col-md-6 col-xs-12"><label>混淆密码obfs_password</label><Input value={server.obfs_password} placeholder="留空自动生成" onChange={event => this.updateServer('obfs_password', event.target.value)} /></div>}</div><div className="form-group"><label>上行带宽</label><Input addonAfter="Mbps" placeholder="服务端发送带宽,留空或填0使用BBR" value={server.up_mbps} onChange={event => this.updateServer('up_mbps', event.target.value)} /></div><div className="form-group"><label>下行带宽</label><Input addonAfter="Mbps" placeholder="服务端接收带宽,留空或填0使用BBR" value={server.down_mbps} onChange={event => this.updateServer('down_mbps', event.target.value)} /></div></>}
          {protocol === 'tuic' && <><div className="row"><div className="form-group col-md-6 col-xs-12"><label>禁用SNI</label>{this.yesNoSelect('disable_sni', server.disable_sni)}</div><div className="form-group col-md-6 col-xs-12"><label>数据包中继模式</label><Select value={server.udp_relay_mode || 'native'} style={{ width: '100%' }} onChange={value => this.updateServer('udp_relay_mode', value)}><Select.Option value="native">native</Select.Option><Select.Option value="quic">quic</Select.Option></Select></div></div><div className="row"><div className="form-group col-md-6 col-xs-12"><label>拥塞控制算法</label><Select value={server.congestion_control || 'cubic'} style={{ width: '100%' }} onChange={value => this.updateServer('congestion_control', value)}><Select.Option value="cubic">cubic</Select.Option><Select.Option value="new_reno">new_reno</Select.Option><Select.Option value="bbr">bbr</Select.Option></Select></div><div className="form-group col-md-6 col-xs-12"><label>客户端启用 0-RTT</label>{this.yesNoSelect('zero_rtt_handshake', server.zero_rtt_handshake)}</div></div></>}
          {protocol === 'shadowsocks' && <div className="form-group"><label>加密算法</label><Select value={server.cipher ?? 'aes-128-gcm'} style={{ width: '100%' }} onChange={value => this.updateServer('cipher', value)}>{['aes-128-gcm', 'aes-192-gcm', 'aes-256-gcm', 'chacha20-ietf-poly1305', '2022-blake3-aes-128-gcm', '2022-blake3-aes-256-gcm'].map(value => <Select.Option key={value} value={value}>{value}</Select.Option>)}</Select></div>}
          {protocol === 'vless' && <><div className="form-group"><label>加密方式 {server.encryption && <a href="javascript:void(0);" onClick={() => this.showChildDrawer('编辑加密配置', 'encryption_settings')}>编辑配置</a>}</label><Select value={server.encryption} style={{ width: '100%' }} onChange={value => this.updateServer('encryption', value)}><Select.Option value={null}>无</Select.Option><Select.Option value="mlkem768x25519plus">MLKEM768X25519PLUS</Select.Option></Select></div><div className="form-group"><label>XTLS流控算法</label><Select value={server.flow} style={{ width: '100%' }} onChange={value => this.updateServer('flow', value)}><Select.Option value={null}>无</Select.Option><Select.Option value="xtls-rprx-vision">xtls-rprx-vision</Select.Option></Select></div></>}
          <div className="form-group"><label><Tooltip placement="top">父节点 <a target="_blank" href="https://docs.v2board.com/use/node.html#父节点与子节点关系" rel="noreferrer">更多解答</a></Tooltip></label><Select value={server.parent_id || ''} onChange={value => this.updateServer('parent_id', value)} style={{ width: '100%' }}><Select.Option value="">无</Select.Option>{servers.filter(option => option.type === 'v2node' && option.id !== server.id).map(option => <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>)}</Select></div>
          <div className="form-group"><label>路由组</label><Select mode="multiple" value={server.route_id || []} placeholder="请选择路由组" style={{ width: '100%' }} onChange={routeIds => this.updateServer('route_id', routeIds.length ? routeIds : null)}>{routes.map(route => <Select.Option key={route.id} value={route.id}>{route.remarks}</Select.Option>)}</Select></div>
          <div className="form-group"><label>一键安装指令</label><Input.TextArea value={server.install_command} rows={4} readOnly style={{ backgroundColor: '#f5f5f5a0', cursor: 'text' }} /></div>
        </div>
        <div className="v2board-drawer-action"><Button style={{ marginRight: 8 }} onClick={() => this.close()}>取消</Button><Button loading={saveLoading} onClick={() => this.save()} type="primary">提交</Button></div>
        <Drawer closable={false} id="server" width="80%" title={childDrawer.title} visible={childDrawer.visible} onClose={() => this.hideChildDrawer()}>{this.renderChildDrawer()}</Drawer>
      </Drawer>
    </>;
  }
}

export default connect(state => ({ serverV2node: state.serverV2node, serverGroup: state.serverGroup, serverManage: state.serverManage, serverRoute: state.serverRoute }))(V2NodeEditor);
