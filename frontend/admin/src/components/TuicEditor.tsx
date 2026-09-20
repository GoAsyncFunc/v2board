import React from 'react';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import CompatibleDrawer from './CompatibleDrawer';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Tooltip from 'antd/lib/tooltip';
import PermissionGroupEditor from './PermissionGroupEditor';
import type { Scalar, ServerEditorProps, ServerRecord, ServerSaveState } from '../types/server';


interface TuicEditorProps extends ServerEditorProps { serverTuic: ServerSaveState; }
interface TuicEditorState { server: ServerRecord; visible: boolean; }
interface TuicRootState extends Omit<TuicEditorProps, 'children' | 'dispatch' | 'record'> {}

export class TuicEditor extends React.Component<TuicEditorProps, TuicEditorState> {
  constructor(props: TuicEditorProps) {
    super(props);
    this.state = {
      server: props.record ? { ...props.record } : {
        insecure: 0, disable_sni: 0, udp_relay_mode: 'native',
        zero_rtt_handshake: 0, congestion_control: 'cubic', rate: 1,
      },
      visible: false,
    };
  }

  toggle(): void { this.setState({ visible: !this.state.visible }); }
  updateServer(field: string, value: unknown): void { this.setState({ server: { ...this.state.server, [field]: value } }); }
  save(): void { this.props.dispatch({ type: 'serverTuic/save', params: { ...this.state.server }, callback: () => this.toggle() }); }

  yesNoSelect(field: string, value: Scalar | undefined): React.ReactElement {
    return <Select value={parseInt(String(value), 10) ? 1 : 0} style={{ width: '100%' }} onChange={nextValue => this.updateServer(field, nextValue)}><Select.Option value={0}>否</Select.Option><Select.Option value={1}>是</Select.Option></Select>;
  }

  render(): React.ReactNode {
    const { server, visible } = this.state;
    const { groups } = this.props.serverGroup;
    const { servers } = this.props.serverManage;
    const { routes } = this.props.serverRoute;
    const saveLoading = this.props.serverTuic.saveLoading;
    return <>
      {React.cloneElement(this.props.children, { onClick: () => this.setState({ visible: true }) })}
      <CompatibleDrawer id="server" maskClosable title={server.id ? '编辑节点' : '新建节点'} width="80%" visible={visible} onClose={() => this.toggle()}>
        <div>
          <div className="row"><div className="form-group col-8"><label>节点名称</label><Input placeholder="请输入节点名称" value={server.name} onChange={event => this.updateServer('name', event.target.value)} /></div><div className="form-group col-4"><label>倍率</label><Input addonAfter="x" placeholder="请输入节点倍率" value={server.rate ?? undefined} onChange={event => this.updateServer('rate', event.target.value)} /></div></div>
          <div className="form-group"><label>节点标签</label><Select mode="tags" value={server.tags || []} style={{ width: '100%' }} placeholder="输入后回车添加标签" onChange={tags => this.updateServer('tags', tags.length ? tags : null)} /></div>
          <div className="form-group"><label>权限组 <PermissionGroupEditor><a href="javascript:void(0);">添加权限组</a></PermissionGroupEditor></label><Select mode="multiple" value={server.group_id} placeholder="请选择权限组" style={{ width: '100%' }} onChange={groupIds => this.updateServer('group_id', groupIds)}>{groups.map(group => <Select.Option key={group.id} value={group.id}>{group.name}</Select.Option>)}</Select></div>
          <div className="form-group"><label>节点地址</label><Input placeholder="地址或IP" value={server.host} onChange={event => this.updateServer('host', event.target.value)} /></div>
          <div className="row">
            <div className="form-group col-md-4 col-xs-12"><label>连接端口</label><Input placeholder="用户连接端口" value={server.port ?? undefined} onChange={event => this.updateServer('port', event.target.value)} /></div>
            <div className="form-group col-md-4 col-xs-12"><label>服务端口</label><Input placeholder="服务端开放端口" value={server.server_port ?? undefined} onChange={event => this.updateServer('server_port', event.target.value)} /></div>
            <div className="form-group col-md-4 col-xs-12"><label><Tooltip placement="top" title="使用自签名证书需要允许不安全，用户才可以连接">允许不安全 <Icon type="question-circle" /></Tooltip></label>{this.yesNoSelect('insecure', server.insecure)}</div>
          </div>
          <div className="row"><div className="form-group col-md-6 col-xs-12"><label>禁用SNI</label>{this.yesNoSelect('disable_sni', server.disable_sni)}</div><div className="form-group col-md-6 col-xs-12"><label>数据包中继模式</label><Select value={server.udp_relay_mode || 'native'} style={{ width: '100%' }} onChange={mode => this.updateServer('udp_relay_mode', mode)}><Select.Option value="native">native</Select.Option><Select.Option value="quic">quic</Select.Option></Select></div></div>
          {!parseInt(String(server.disable_sni), 10) && <div className="form-group"><label>服务器名称指示(sni)</label><Input placeholder="当节点地址与证书不一致时用于证书验证" value={server.server_name} onChange={event => this.updateServer('server_name', event.target.value)} /></div>}
          <div className="row"><div className="form-group col-md-6 col-xs-12"><label>拥塞控制算法</label><Select value={server.congestion_control || 'cubic'} style={{ width: '100%' }} onChange={algorithm => this.updateServer('congestion_control', algorithm)}><Select.Option value="cubic">cubic</Select.Option><Select.Option value="new_reno">new_reno</Select.Option><Select.Option value="bbr">bbr</Select.Option></Select></div><div className="form-group col-md-6 col-xs-12"><label>客户端启用 0-RTT</label>{this.yesNoSelect('zero_rtt_handshake', server.zero_rtt_handshake)}</div></div>
          <div className="form-group"><label><Tooltip placement="top" title="父节点说明">父节点 <a target="_blank" href="https://docs.v2board.com/use/node.html#父节点与子节点关系" rel="noreferrer">更多解答</a></Tooltip></label><Select value={server.parent_id || ''} onChange={parentId => this.updateServer('parent_id', parentId)} style={{ width: '100%' }}><Select.Option value="">无</Select.Option>{servers.filter(option => option.type === 'tuic' && option.id !== server.id).map(option => <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>)}</Select></div>
          <div className="form-group"><label>路由组</label><Select mode="multiple" value={server.route_id || []} placeholder="请选择路由组" style={{ width: '100%' }} onChange={routeIds => this.updateServer('route_id', routeIds.length ? routeIds : null)}>{routes.map(route => <Select.Option key={route.id} value={route.id}>{route.remarks}</Select.Option>)}</Select></div>
        </div>
        <div className="v2board-drawer-action"><Button style={{ marginRight: 8 }} onClick={() => this.toggle()}>取消</Button><Button loading={saveLoading} onClick={() => this.save()} type="primary">提交</Button></div>
      </CompatibleDrawer>
    </>;
  }
}

export default connect((state: TuicRootState) => ({ serverTuic: state.serverTuic, serverGroup: state.serverGroup, serverManage: state.serverManage, serverRoute: state.serverRoute }))(TuicEditor);
