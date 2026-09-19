import React from 'react';
import { c as connect } from '../vendor/reactRedux.js';
import { List } from '../vendor/ui.js';
import { a as Divider } from '../vendor/Divider.js';
import { Input } from '../vendor/ui.js';
import { Button } from '../vendor/ui.js';
import { message } from '../vendor/ui.js';
import { Tooltip } from '../vendor/ui.js';
import { Badge } from '../vendor/ui.js';
import { Switch } from '../vendor/ui.js';
import { Dropdown } from '../vendor/ui.js';
import { Menu } from '../vendor/ui.js';
import { a as Icon } from '../vendor/Icon.js';
import { Tag } from '../vendor/ui.js';
import { Sortable } from '../vendor/ui.js';
import { LoadingContainer } from '../vendor/ui.js';
import { Prompt } from '../vendor/appRuntime.js';
import copyText from '../vendor/clipboard.js';
import { e as getPreference, f as isMobile, j as setPreference } from '../vendor/siteHelpers.js';
import MainLayout from '../layouts/MainLayout.jsx';
import ContextMenuTable from '../components/ContextMenuTable.jsx';
import ShadowsocksEditor from '../components/ShadowsocksEditor.jsx';
import VmessEditor from '../components/VmessEditor.jsx';
import TrojanEditor from '../components/TrojanEditor.jsx';
import HysteriaEditor from '../components/HysteriaEditor.jsx';
import TuicEditor from '../components/TuicEditor.jsx';
import VlessEditor from '../components/VlessEditor.jsx';
import AnyTlsEditor from '../components/AnyTlsEditor.jsx';
import V2NodeEditor from '../components/V2NodeEditor.jsx';
import { renderServerTypeTag } from '../components/ServerTypeTag.jsx';
import { createServerNameColumn } from '../components/ServerNameColumn.jsx';
import { createServerRateColumn } from '../components/ServerRateColumn.jsx';

import '../vendor/iconStyles.js';

import '../vendor/componentStyles.js';
const STATUS_BADGE = { 0: 'error', 1: 'warning', 2: 'processing' };
const SERVER_TYPES = ['V2node', 'Shadowsocks', 'Vmess', 'Trojan', 'Hysteria', 'Tuic', 'Vless', 'AnyTLS'];
const MODEL_BY_TYPE = {
  shadowsocks: 'serverShadowsocks',
  vmess: 'serverVmess',
  trojan: 'serverTrojan',
  hysteria: 'serverHysteria',
  tuic: 'serverTuic',
  vless: 'serverVless',
  anytls: 'serverAnyTLS',
  v2node: 'serverV2node',
};

function editorFor(server, trigger, key = server?.id) {
  const props = server ? { record: server } : {};
  switch (server?.type) {
    case 'shadowsocks': return <ShadowsocksEditor key={key} {...props}>{trigger}</ShadowsocksEditor>;
    case 'vmess': return <VmessEditor key={key} {...props}>{trigger}</VmessEditor>;
    case 'trojan': return <TrojanEditor key={key} {...props}>{trigger}</TrojanEditor>;
    case 'hysteria': return <HysteriaEditor key={key} {...props}>{trigger}</HysteriaEditor>;
    case 'tuic': return <TuicEditor key={key} {...props}>{trigger}</TuicEditor>;
    case 'vless': return <VlessEditor key={key} {...props}>{trigger}</VlessEditor>;
    case 'anytls': return <AnyTlsEditor key={key} {...props}>{trigger}</AnyTlsEditor>;
    case 'v2node': return <V2NodeEditor key={key} {...props}>{trigger}</V2NodeEditor>;
    default: return null;
  }
}

function newServerMenu(renderTypeTag) {
  const entries = [
    ['v2node', 'V2node', V2NodeEditor],
    ['shadowsocks', 'Shadowsocks', ShadowsocksEditor],
    ['vmess', 'VMess', VmessEditor],
    ['trojan', 'Trojan', TrojanEditor],
    ['hysteria', 'Hysteria', HysteriaEditor],
    ['tuic', 'Tuic', TuicEditor],
    ['vless', 'VLess', VlessEditor],
    ['anytls', 'AnyTLS', AnyTlsEditor],
  ];
  return <Menu>{entries.map(([type, label, Editor]) => <Menu.Item key={type}><Editor><a>{renderTypeTag(type, label)}</a></Editor></Menu.Item>)}</Menu>;
}

export class ServerManagePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: undefined,
      pageSize: getPreference('server_manage_page_size') || 10,
    };
    this.contextServer = null;
  }

  componentDidMount() {
    this.props.dispatch({ type: 'serverManage/getNodes' });
    this.props.dispatch({ type: 'serverGroup/fetch' });
    this.props.dispatch({ type: 'serverRoute/fetch' });
  }

  dispatchServerAction(server, action, extra = {}) {
    const model = MODEL_BY_TYPE[server.type];
    if (model) this.props.dispatch({ type: `${model}/${action}`, id: server.id, ...extra });
  }

  copy(server) { this.dispatchServerAction(server, 'copy'); }
  drop(server) { this.dispatchServerAction(server, 'drop'); }
  update(server, key, value) { this.dispatchServerAction(server, 'update', { key, value }); }

  actionMenu(server) {
    return <Menu>
      <Menu.Item onContextMenu={event => event.stopPropagation()}>{editorFor(server, <a><Icon type="edit" /> 编辑</a>)}</Menu.Item>
      <Menu.Item onClick={() => this.copy(server)}><Icon type="copy" /> 复制</Menu.Item>
      <Menu.Item style={{ color: '#ff4d4f' }} onClick={() => this.drop(server)}><Icon type="delete" /> 删除</Menu.Item>
    </Menu>;
  }

  actionDropdown(server, trigger) {
    return <Dropdown trigger="click" overlay={this.actionMenu(server)}>{trigger || <a href="javascript:void(0);">操作 <Icon type="caret-down" /></a>}</Dropdown>;
  }

  filteredServers() {
    const { servers } = this.props.serverManage;
    const { searchKey } = this.state;
    return searchKey ? servers.filter(server => JSON.stringify(server).includes(searchKey)) : servers;
  }

  columns(groups) {
    return [
      {
        title: '节点ID', dataIndex: 'id', key: 'id', width: 150,
        filters: SERVER_TYPES.map(type => ({ text: type, value: type })),
        onFilter: (type, server) => server.type === type.toLowerCase(),
        render: (id, server) => <span>{renderServerTypeTag(server.type, server.parent_id ? `${id} => ${server.parent_id}` : id)}</span>,
      },
      {
        title: '显隐', dataIndex: 'show', key: 'show',
        render: (shown, server) => <Switch size="small" checked={Boolean(parseInt(shown, 10))} onClick={() => this.update(server, 'show', parseInt(shown, 10) ? 0 : 1)} />,
      },
      createServerNameColumn(STATUS_BADGE),
      {
        title: '地址', dataIndex: 'host', key: 'host',
        render: (host, server) => <span style={{ cursor: 'pointer' }} onClick={() => { copyText(server.host); message.success('复制成功'); }}>{server.host}:{server.port}</span>,
      },
      {
        title: <span><Tooltip placement="top" title="根据服务端上报频率而定">人数 <Icon type="question-circle" /></Tooltip></span>,
        dataIndex: 'online', key: 'online', align: 'left', width: 130,
        sorter: (left, right) => left.online - right.online,
        render: online => <><Icon type="user" /> {online || 0}</>,
      },
      createServerRateColumn(),
      {
        title: '权限组', dataIndex: 'group_id', key: 'group_id',
        filters: groups.map(group => ({ text: group.name, value: group.id })),
        onFilter: (groupId, server) => (server.group_id || []).includes(String(groupId)),
        render: (groupIds = []) => <>{groupIds.map(groupId => {
          const group = groups.find(item => item.id === parseInt(groupId, 10));
          return group ? <Tag key={groupId}>{group.name}</Tag> : null;
        })}</>,
      },
      {
        title: '操作', dataIndex: 'action', key: 'action', align: 'right', fixed: 'right', width: 100,
        render: (value, server) => <div>{this.actionDropdown(server)}</div>,
      },
    ];
  }

  sortColumns() {
    return [
      { title: '排序', dataIndex: 'sort', key: 'sort', align: 'left', width: 100, render: () => <Icon type="menu" style={{ cursor: 'move' }} title="拖动排序" /> },
      { title: '节点ID', dataIndex: 'id', key: 'id', width: 150, render: (id, server) => <span>{renderServerTypeTag(server.type, server.parent_id ? `${id} => ${server.parent_id}` : id)}</span> },
      { title: '节点', dataIndex: 'name', key: 'name' },
    ];
  }

  renderMobileList(servers) {
    return <List className="v2board-table" itemLayout="vertical" dataSource={servers} renderItem={server => <List.Item
      className={`v2board_node_mobile ${server.parent_id ? 'child_node' : ''}`}
      actions={[<React.Fragment key="summary">{renderServerTypeTag(server.type, server.parent_id ? `${server.id} => ${server.parent_id}` : server.id)} <Tag><Icon type="user" /> {server.online || 0}</Tag> <Tag>{server.rate} x</Tag></React.Fragment>]}
      extra={<><Switch size="small" checked={Boolean(parseInt(server.show, 10))} onClick={() => this.update(server, 'show', parseInt(server.show, 10) ? 0 : 1)} /><Divider type="vertical" /><span>{this.actionDropdown(server)}</span></>}
    ><List.Item.Meta title={<><Badge status={STATUS_BADGE[server.available_status]} />{server.name}</>} description={`${server.host}:${server.port}`} /></List.Item>} />;
  }

  renderContextMenu() {
    const server = this.contextServer;
    return <ul className="ant-dropdown-menu ant-dropdown-menu-light ant-dropdown-menu-root ant-dropdown-menu-vertical">
      <li className="ant-dropdown-menu-item">{server && editorFor(server, <a><Icon type="form" /> 编辑</a>, `context-${server.id}`)}</li>
      <li className="ant-dropdown-menu-item" onClick={() => server && this.copy(server)}><a><Icon type="copy" /> 复制</a></li>
      <li className="ant-dropdown-menu-item" onClick={() => server && this.drop(server)}><a style={{ color: '#ff4d4f' }}><Icon type="delete" /> 删除</a></li>
    </ul>;
  }

  renderDesktopTable(servers, groups, sortMode) {
    return <Sortable onDragEnd={(fromIndex, toIndex) => this.props.dispatch({ type: 'serverManage/sort', fromIndex, toIndex })} nodeSelector="tr" handleSelector="i">
      <ContextMenuTable
        onContextMenu={server => { this.contextServer = server; this.forceUpdate(); }}
        disableRightClick={sortMode}
        tableLayout="auto"
        dataSource={servers}
        columns={sortMode ? this.sortColumns() : this.columns(groups)}
        pagination={!sortMode && {
          pageSize: this.state.pageSize,
          pageSizeOptions: ['10', '50', '100', '500'],
          showSizeChanger: true,
          onShowSizeChange: (current, pageSize) => this.setState({ pageSize }, () => setPreference('server_manage_page_size', pageSize)),
        }}
        scroll={{ x: 1300 }}
        rowClassName={server => server.parent_id ? 'child_node' : ''}
      >{this.renderContextMenu()}</ContextMenuTable>
    </Sortable>;
  }

  render() {
    const { servers, fetchLoading, sortMode } = this.props.serverManage;
    const groups = this.props.serverGroup.groups;
    const filteredServers = this.filteredServers();
    return <MainLayout {...this.props} title="节点管理">
      <Prompt when={sortMode} message={() => window.confirm('节点排序还没有保存，是否离开')} />
      <LoadingContainer loading={fetchLoading}>
        <div className="block block-bottom"><div className="bg-white">
          <div className="v2board-table-action" style={{ padding: 15 }}>
            <Dropdown overlay={newServerMenu(renderServerTypeTag)}><Button><Icon type="plus" /></Button></Dropdown>
            <Input placeholder="输入任意关键字搜索" style={{ width: 200 }} className="ml-2" onChange={event => this.setState({ searchKey: event.target.value })} />
            {!isMobile() && <Button style={{ float: 'right' }} type="primary" onClick={() => sortMode
              ? this.props.dispatch({ type: 'serverManage/saveSort' })
              : this.props.dispatch({ type: 'serverManage/setState', payload: { sortMode: true } })
            }>{sortMode ? '保存排序' : '编辑排序'}</Button>}
          </div>
          {isMobile() ? this.renderMobileList(filteredServers) : this.renderDesktopTable(filteredServers, groups, sortMode)}
        </div></div>
      </LoadingContainer>
    </MainLayout>;
  }
}

export default connect(state => ({ serverManage: state.serverManage, serverGroup: state.serverGroup }))(ServerManagePage);
