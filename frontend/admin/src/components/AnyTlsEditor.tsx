import React from 'react';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import CompatibleDrawer from './CompatibleDrawer';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Tooltip from 'antd/lib/tooltip';
import PermissionGroupEditor from './PermissionGroupEditor';
import JsonEditor from './JsonEditor';
import type { ServerEditorProps, ServerRecord, ServerSaveState } from '../types/server';


const DEFAULT_PADDING_SCHEME = JSON.stringify([
  'stop=8',
  '0=30-30',
  '1=100-400',
  '2=400-500,c,500-1000,c,500-1000,c,500-1000,c,500-1000',
  '3=9-9,500-1000',
  '4=500-1000',
  '5=500-1000',
  '6=500-1000',
  '7=500-1000',
], null, 4);

interface AnyTlsEditorProps extends ServerEditorProps { serverAnyTLS: ServerSaveState; }
interface AnyTlsEditorState { server: ServerRecord; visible: boolean; paddingEditorVisible: boolean; }
interface AnyTlsRootState extends Omit<AnyTlsEditorProps, 'children' | 'dispatch' | 'record'> {}

export class AnyTlsEditor extends React.Component<AnyTlsEditorProps, AnyTlsEditorState> {
  constructor(props: AnyTlsEditorProps) {
    super(props);
    this.state = {
      server: props.record ? { ...props.record } : { insecure: 0, rate: 1 },
      visible: false,
      paddingEditorVisible: false,
    };
  }

  toggle(): void {
    this.setState({ visible: !this.state.visible });
  }

  updateServer(field: string, value: unknown): void {
    this.setState({ server: { ...this.state.server, [field]: value } });
  }

  save(): void {
    this.props.dispatch({
      type: 'serverAnyTLS/save',
      params: { ...this.state.server },
      callback: () => this.toggle(),
    });
  }

  render(): React.ReactNode {
    const { server, visible, paddingEditorVisible } = this.state;
    const { groups } = this.props.serverGroup;
    const { servers } = this.props.serverManage;
    const { routes } = this.props.serverRoute;
    const saveLoading = this.props.serverAnyTLS.saveLoading;

    return <>
      {React.cloneElement(this.props.children, { onClick: () => this.setState({ visible: true }) })}
      <CompatibleDrawer id="server" maskClosable title={server.id ? '编辑节点' : '新建节点'} width="80%" visible={visible} onClose={() => this.toggle()}>
        <div>
          <div className="row">
            <div className="form-group col-8"><label>节点名称</label><Input placeholder="请输入节点名称" value={server.name} onChange={event => this.updateServer('name', event.target.value)} /></div>
            <div className="form-group col-4"><label>倍率</label><Input addonAfter="x" placeholder="请输入节点倍率" value={server.rate ?? undefined} onChange={event => this.updateServer('rate', event.target.value)} /></div>
          </div>
          <div className="form-group"><label>节点标签</label><Select mode="tags" value={server.tags || []} style={{ width: '100%' }} placeholder="输入后回车添加标签" onChange={tags => this.updateServer('tags', tags.length ? tags : null)} /></div>
          <div className="form-group"><label>权限组 <PermissionGroupEditor><a href="javascript:void(0);">添加权限组</a></PermissionGroupEditor></label><Select mode="multiple" value={server.group_id} placeholder="请选择权限组" style={{ width: '100%' }} onChange={groupIds => this.updateServer('group_id', groupIds)}>{groups.map(group => <Select.Option key={group.id} value={group.id}>{group.name}</Select.Option>)}</Select></div>
          <div className="form-group"><label>节点地址</label><Input placeholder="地址或IP" value={server.host} onChange={event => this.updateServer('host', event.target.value)} /></div>
          <div className="row">
            <div className="form-group col-md-4 col-xs-12"><label>连接端口</label><Input placeholder="用户连接端口" value={server.port ?? undefined} onChange={event => this.updateServer('port', event.target.value)} /></div>
            <div className="form-group col-md-4 col-xs-12"><label>服务端口</label><Input placeholder="服务端开放端口" value={server.server_port ?? undefined} onChange={event => this.updateServer('server_port', event.target.value)} /></div>
            <div className="form-group col-md-4 col-xs-12"><label><Tooltip placement="top" title="使用自签名证书需要允许不安全，用户才可以连接">允许不安全 <Icon type="question-circle" /></Tooltip></label><Select value={parseInt(String(server.insecure), 10) ? 1 : 0} style={{ width: '100%' }} onChange={insecure => this.updateServer('insecure', insecure)}><Select.Option value={0}>否</Select.Option><Select.Option value={1}>是</Select.Option></Select></div>
          </div>
          <div className="form-group"><label>服务器名称指示(sni)</label><Input placeholder="当节点地址与证书不一致时用于证书验证" value={server.server_name} onChange={event => this.updateServer('server_name', event.target.value)} /></div>
          <div className="form-group"><label><a href="javascript:void(0);" onClick={() => this.setState({ paddingEditorVisible: true })}>编辑填充方案</a></label></div>
          <div className="form-group"><label><Tooltip placement="top" title="父节点说明">父节点 <a target="_blank" href="https://docs.v2board.com/use/node.html#父节点与子节点关系" rel="noreferrer">更多解答</a></Tooltip></label><Select value={server.parent_id || ''} onChange={parentId => this.updateServer('parent_id', parentId)} style={{ width: '100%' }}><Select.Option value="">无</Select.Option>{servers.filter(option => option.type === 'anytls' && option.id !== server.id).map(option => <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>)}</Select></div>
          <div className="form-group"><label>路由组</label><Select mode="multiple" value={server.route_id || []} placeholder="请选择路由组" style={{ width: '100%' }} onChange={routeIds => this.updateServer('route_id', routeIds.length ? routeIds : null)}>{routes.map(route => <Select.Option key={route.id} value={route.id}>{route.remarks}</Select.Option>)}</Select></div>
        </div>
        <div className="v2board-drawer-action"><Button style={{ marginRight: 8 }} onClick={() => this.toggle()}>取消</Button><Button loading={saveLoading} onClick={() => this.save()} type="primary">提交</Button></div>
        <CompatibleDrawer closable={false} id="server" width="80%" title="编辑填充方案" visible={paddingEditorVisible} onClose={() => this.setState({ paddingEditorVisible: false })}>
          <div id="anytls-padding-scheme"><div className="form-group"><JsonEditor placeholder={DEFAULT_PADDING_SCHEME} mode="json" theme="github" fontSize={14} showPrintMargin showGutter highlightActiveLine value={server.padding_scheme || ''} onChange={value => this.updateServer('padding_scheme', value)} setOptions={{ enableBasicAutocompletion: false, enableLiveAutocompletion: false, enableSnippets: false, showLineNumbers: true, tabSize: 2 }} /></div></div>
        </CompatibleDrawer>
      </CompatibleDrawer>
    </>;
  }
}

export default connect((state: AnyTlsRootState) => ({
  serverAnyTLS: state.serverAnyTLS,
  serverGroup: state.serverGroup,
  serverManage: state.serverManage,
  serverRoute: state.serverRoute,
}))(AnyTlsEditor);
