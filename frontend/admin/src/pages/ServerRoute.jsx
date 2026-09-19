import React from 'react';
import { c as connect } from '../vendor/reactRedux.js';
import { Table } from '../vendor/ui.js';
import { Button } from '../vendor/ui.js';
import { a as Icon } from '../vendor/Icon.js';
import { a as Divider } from '../vendor/Divider.js';
import { LoadingContainer } from '../vendor/ui.js';
import { a as Modal } from '../vendor/Modal.js';
import { Select } from '../vendor/ui.js';
import { Input } from '../vendor/ui.js';
import { settings } from '../vendor/adminSettings.js';
import MainLayout from '../layouts/MainLayout.jsx';
import { createRouteActionColumn } from '../components/RouteActionColumn.jsx';
import { createReadonlyServerRouteColumns } from '../components/ServerRouteDisplayColumns.jsx';

import '../vendor/iconStyles.js';

import '../vendor/componentStyles.js';
import '../vendor/featureRuntime.js';
const readonlyColumns = createReadonlyServerRouteColumns();

export class RouteEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { route: props.route || {}, visible: false };
  }

  updateRoute(patch) {
    this.setState({ route: { ...this.state.route, ...patch } });
  }

  save() {
    const route = { ...this.state.route };
    if (Array.isArray(route.match)) {
      route.match = route.match.filter(Boolean);
    } else if (route.match && typeof route.match === 'string') {
      route.match = route.match.split(',').filter(Boolean);
    } else {
      route.match = [];
    }
    this.props.dispatch({
      type: 'serverRoute/save',
      params: route,
      callback: () => this.setState({ visible: false }),
    });
  }

  matchPlaceholder() {
    const { action } = this.state.route;
    if (action === 'protocol') return 'http\ntls\nquic\nbittorrent';
    if (action === 'block_port') return '53\n443\n1000-2000';
    if (['route_ip', 'block_ip'].includes(action)) {
      return '127.0.0.1(单一匹配)\n10.0.0.0/8(范围匹配)\ngeoip:cn(预定义列表匹配)';
    }
    return 'example.com(关键字匹配)\ndomain:example.com(子域名匹配)\ngeosite:netflix(预定义域名列表)';
  }

  render() {
    const { route, visible } = this.state;
    const routeLoading = this.props.serverRoute.fetchLoading;
    const matchValue = Array.isArray(route.match)
      ? route.match.join('\n')
      : route.match?.split(',')?.join('\n');
    const usesOutbound = ['route', 'route_ip', 'default_out'].includes(route.action);

    return (
      <>
        {React.cloneElement(this.props.children, { onClick: () => this.setState({ visible: true }) })}
        <Modal
          title={route.id ? '编辑路由' : '创建路由'}
          visible={visible}
          onCancel={() => this.setState({ visible: false })}
          onOk={() => routeLoading || this.save()}
          okText={routeLoading ? <Icon type="loading" /> : '提交'}
          cancelText="取消"
        >
          <div>
            <div className="form-group">
              <label htmlFor="route-remarks">备注</label>
              <Input id="route-remarks" placeholder="请输入备注" value={route.remarks} onChange={event => this.updateRoute({ remarks: event.target.value })} />
            </div>
            {route.action !== 'default_out' && (
              <div className="form-group">
                <label htmlFor="route-match">
                  匹配值
                  <a href="https://xtls.github.io/config/routing.html#ruleobject"><Button type="link" />填写参考</a>
                </label>
                <Input.TextArea
                  id="route-match"
                  rows={5}
                  placeholder={this.matchPlaceholder()}
                  value={matchValue}
                  onChange={event => this.updateRoute({ match: event.target.value?.split('\n') })}
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="route-action">动作</label>
              <Select id="route-action" value={route.action} placeholder="请选择动作" style={{ width: '100%' }} onChange={action => this.updateRoute({ action })}>
                {['block', 'block_ip', 'block_port', 'protocol', 'dns', 'route', 'route_ip', 'default_out'].map(action => (
                  <Select.Option key={action} value={action}>{settings.routeActionText[action]}</Select.Option>
                ))}
              </Select>
            </div>
            {route.action === 'dns' && (
              <div className="form-group">
                <label htmlFor="route-dns">DNS服务器</label>
                <Input id="route-dns" placeholder="请输入用于解析的DNS服务器地址" value={route.action_value} onChange={event => this.updateRoute({ action_value: event.target.value })} />
              </div>
            )}
            {usesOutbound && (
              <div className="form-group">
                <label htmlFor="route-outbound">
                  Xray出站配置
                  <a href="https://xtls.github.io/config/outbound.html"><Button type="link" />填写参考</a>
                </label>
                <Input.TextArea
                  id="route-outbound"
                  rows={8}
                  placeholder={JSON.stringify({
                    tag: 'ss_out', sendThrough: '0.0.0.0', protocol: 'shadowsocks',
                    settings: { email: 'love@xray.com', address: '8.8.8.8', port: 5555, method: 'chacha20-ietf-poly1305', password: 'abcdefghijklmnopqrstuvwxyz', level: 0 },
                  }, null, 4)}
                  value={route.action_value}
                  onChange={event => this.updateRoute({ action_value: event.target.value })}
                />
              </div>
            )}
          </div>
        </Modal>
      </>
    );
  }
}

const ConnectedRouteEditor = connect(state => ({ serverRoute: state.serverRoute }))(RouteEditor);

export class ServerRoutePage extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'serverRoute/fetch' });
  }

  drop(id) {
    this.props.dispatch({ type: 'serverRoute/drop', id });
  }

  render() {
    const { routes, fetchLoading } = this.props.serverRoute;
    const columns = [
      readonlyColumns.id,
      readonlyColumns.remarks,
      readonlyColumns.match,
      createRouteActionColumn(settings.routeActionText),
      {
        title: '操作', dataIndex: 'action2', key: 'action2', align: 'right',
        render: (_, record) => (
          <div>
            <ConnectedRouteEditor route={record} key={record.id}><a href="javascript:void(0);">编辑</a></ConnectedRouteEditor>
            <Divider type="vertical" />
            <a href="javascript:void(0);" onClick={() => this.drop(record.id)}>删除</a>
          </div>
        ),
      },
    ];

    return (
      <MainLayout {...this.props} title="路由管理">
        <div className="d-flex justify-content-between align-items-center" />
        <LoadingContainer loading={fetchLoading}>
          <div className="block block-rounded">
            <div className="bg-white">
              <div style={{ padding: 15 }}>
                <ConnectedRouteEditor><Button><Icon type="plus" /> 添加路由</Button></ConnectedRouteEditor>
              </div>
              <Table tableLayout="auto" columns={columns} dataSource={routes} pagination={false} />
            </div>
          </div>
        </LoadingContainer>
      </MainLayout>
    );
  }
}

export default connect(state => ({ serverRoute: state.serverRoute }))(ServerRoutePage);
