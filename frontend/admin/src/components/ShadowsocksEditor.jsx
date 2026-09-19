import React from 'react';
import { connect } from '../vendor/reactRedux.js';
import { Drawer } from '../vendor/ui.js';
import { Button } from '../vendor/ui.js';
import { Tooltip } from '../vendor/ui.js';
import { Select } from '../vendor/ui.js';
import { Input } from '../vendor/ui.js';
import { PermissionGroupEditor } from '../vendor/ui.js';

import '../vendor/featureRuntime.js';
const CIPHERS = [
  'aes-128-gcm',
  'aes-192-gcm',
  'aes-256-gcm',
  'chacha20-ietf-poly1305',
  '2022-blake3-aes-128-gcm',
  '2022-blake3-aes-256-gcm',
];

export class ShadowsocksEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      server: props.record || { cipher: 'chacha20-ietf-poly1305', rate: 1 },
      visible: false,
    };
  }

  toggle() {
    this.setState({ visible: !this.state.visible });
  }

  updateServer(field, value) {
    this.setState({ server: { ...this.state.server, [field]: value } });
  }

  updateObfs(field, value) {
    this.setState({
      server: {
        ...this.state.server,
        obfs_settings: { ...(this.state.server.obfs_settings || {}), [field]: value },
      },
    });
  }

  save() {
    this.props.dispatch({
      type: 'serverShadowsocks/save',
      params: { ...this.state.server },
      callback: () => this.toggle(),
    });
  }

  renderObfs() {
    const { server } = this.state;
    if (server.obfs !== 'http') return null;
    return <div className="row mt-2">
      <div className="form-group col-4 mb-0"><Input placeholder="路径" value={server.obfs_settings?.path} onChange={event => this.updateObfs('path', event.target.value)} /></div>
      <div className="form-group col-8 mb-0"><Input placeholder="Host" value={server.obfs_settings?.host} onChange={event => this.updateObfs('host', event.target.value)} /></div>
    </div>;
  }

  render() {
    const { server, visible } = this.state;
    const { groups } = this.props.serverGroup;
    const { servers } = this.props.serverManage;
    const { routes } = this.props.serverRoute;
    const saveLoading = this.props.serverShadowsocks.saveLoading;

    return <>
      {React.cloneElement(this.props.children, { onClick: () => this.setState({ visible: true }) })}
      <Drawer id="server" maskClosable title={server.id ? '编辑节点' : '新建节点'} width="80%" visible={visible} onClose={() => this.toggle()}>
        <div>
          <div className="row">
            <div className="form-group col-8"><label>节点名称</label><Input placeholder="请输入节点名称" value={server.name} onChange={event => this.updateServer('name', event.target.value)} /></div>
            <div className="form-group col-4"><label>倍率</label><Input addonAfter="x" placeholder="请输入节点倍率" value={server.rate} onChange={event => this.updateServer('rate', event.target.value)} /></div>
          </div>
          <div className="form-group"><label>节点标签</label><Select mode="tags" value={server.tags || []} style={{ width: '100%' }} placeholder="输入后回车添加标签" onChange={tags => this.updateServer('tags', tags.length ? tags : null)} /></div>
          <div className="form-group">
            <label>权限组 <PermissionGroupEditor><a href="javascript:void(0);">添加权限组</a></PermissionGroupEditor></label>
            <Select mode="multiple" value={server.group_id} placeholder="请选择权限组" style={{ width: '100%' }} onChange={groupIds => this.updateServer('group_id', groupIds)}>{groups.map(group => <Select.Option key={group.id} value={group.id}>{group.name}</Select.Option>)}</Select>
          </div>
          <div className="form-group"><label>节点地址</label><Input placeholder="地址或IP" value={server.host} onChange={event => this.updateServer('host', event.target.value)} /></div>
          <div className="row">
            <div className="form-group col-md-6 col-xs-12"><label>连接端口</label><Input placeholder="用户连接端口" value={server.port} onChange={event => this.updateServer('port', event.target.value)} /></div>
            <div className="form-group col-md-6 col-xs-12"><label>服务端口</label><Input placeholder="服务端开放端口" value={server.server_port} onChange={event => this.updateServer('server_port', event.target.value)} /></div>
          </div>
          <div className="form-group"><label>加密算法</label><Select value={server.cipher} onChange={cipher => this.updateServer('cipher', cipher)} style={{ width: '100%' }}>{CIPHERS.map(cipher => <Select.Option key={cipher} value={cipher}>{cipher}</Select.Option>)}</Select></div>
          <div className="form-group"><label>混淆</label><Select value={server.obfs || ''} onChange={obfs => this.updateServer('obfs', obfs)} style={{ width: '100%' }}><Select.Option value="">无</Select.Option><Select.Option value="http">HTTP</Select.Option></Select>{this.renderObfs()}</div>
          <div className="form-group">
            <label><Tooltip placement="top">父节点 <a target="_blank" href="https://docs.v2board.com/use/node.html#父节点与子节点关系" rel="noreferrer">更多解答</a></Tooltip></label>
            <Select value={server.parent_id || ''} onChange={parentId => this.updateServer('parent_id', parentId)} style={{ width: '100%' }}><Select.Option value="">无</Select.Option>{servers.filter(option => option.type === 'shadowsocks' && option.id !== server.id).map(option => <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>)}</Select>
          </div>
          <div className="form-group"><label>路由组</label><Select mode="multiple" value={server.route_id || []} placeholder="请选择路由组" style={{ width: '100%' }} onChange={routeIds => this.updateServer('route_id', routeIds.length ? routeIds : null)}>{routes.map(route => <Select.Option key={route.id} value={route.id}>{route.remarks}</Select.Option>)}</Select></div>
        </div>
        <div className="v2board-drawer-action"><Button style={{ marginRight: 8 }} onClick={() => this.toggle()}>取消</Button><Button loading={saveLoading} onClick={() => this.save()} type="primary">提交</Button></div>
      </Drawer>
    </>;
  }
}

const ConnectedShadowsocksEditor = connect(state => ({
  serverShadowsocks: state.serverShadowsocks,
  serverGroup: state.serverGroup,
  serverManage: state.serverManage,
  serverRoute: state.serverRoute,
}))(ShadowsocksEditor);

export default ConnectedShadowsocksEditor;
