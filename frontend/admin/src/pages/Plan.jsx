import React from 'react';
import { connect } from '../vendor/reactRedux.js';
import { Button } from '../vendor/ui.js';
import { Dropdown } from '../vendor/ui.js';
import { Menu } from '../vendor/ui.js';
import { Tooltip } from '../vendor/ui.js';
import { Switch } from '../vendor/ui.js';
import { Icon } from '../vendor/Icon.js';
import { Sortable } from '../vendor/ui.js';
import { Drawer } from '../vendor/ui.js';
import { Checkbox } from '../vendor/ui.js';
import { Select } from '../vendor/ui.js';
import { Row } from '../vendor/ui.js';
import { Col } from '../vendor/ui.js';
import { Divider } from '../vendor/Divider.js';
import { Input } from '../vendor/ui.js';
import PermissionGroupEditor from '../components/PermissionGroupEditor.jsx';
import { LoadingContainer } from '../vendor/ui.js';
import MainLayout from '../layouts/MainLayout.jsx';
import ContextMenuTable from '../components/ContextMenuTable.jsx';
import { createPlanGroupColumn } from '../components/PlanGroupColumn.tsx';
import { createReadonlyPlanResourceColumns } from '../components/PlanResourceColumns.tsx';
import { createReadonlyPlanPriceColumns } from '../components/PlanPriceColumns.ts';

import '../vendor/iconStyles.js';

const resourceColumns = createReadonlyPlanResourceColumns();
const priceColumns = createReadonlyPlanPriceColumns();
const PRICE_FIELDS = [
  ['month_price', '月付'], ['quarter_price', '季付'], ['half_year_price', '半年'],
  ['year_price', '年付'], ['two_year_price', '两年付'], ['three_year_price', '三年付'],
];

function emptyPlan() {
  return {
    show: 0, name: null, transfer_enable: null, group_id: undefined,
    month_price: null, quarter_price: null, half_year_price: null,
    year_price: null, two_year_price: null, three_year_price: null,
    onetime_price: null, reset_price: null,
  };
}

export class PlanEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, record: props.record ? { ...props.record } : emptyPlan() };
  }

  componentDidMount() {
    this.props.dispatch({ type: 'config/fetch', key: 'site' });
    this.props.dispatch({ type: 'serverGroup/fetch' });
  }

  updateRecord(field, value) {
    this.setState({ record: { ...this.state.record, [field]: value } });
  }

  updatePrice(field, value) {
    this.updateRecord(field, value !== '' ? value : null);
  }

  save() {
    this.props.dispatch({
      type: 'plan/save',
      params: { ...this.state.record },
      callback: () => this.setState({ visible: false }),
    });
  }

  render() {
    const { record, visible } = this.state;
    const { groups } = this.props.serverGroup;
    const currencySymbol = this.props.config.site.currency_symbol;
    const saveLoading = this.props.plan.saveLoading;

    return <>
      {React.cloneElement(this.props.children, { onClick: () => this.setState({ visible: true }) })}
      <Drawer id="plan" maskClosable onClose={() => this.setState({ visible: false })} title={record.id ? '编辑订阅' : '新建订阅'} visible={visible} width="80%">
        <div>
          <div className="form-group"><label>套餐名称</label><Input placeholder="请输入套餐名称" value={record.name} onChange={event => this.updateRecord('name', event.target.value)} /></div>
          <div className="form-group"><label>套餐描述</label><Input.TextArea rows={4} value={record.content} placeholder="请输入套餐描述，支持HTML" onChange={event => this.updateRecord('content', event.target.value)} /></div>
          <Divider orientation="center">售价设置 <Tooltip placement="top" title="将金额留空则不会进行出售"><Icon type="info-circle" /></Tooltip></Divider>
          <Row gutter={10}>{PRICE_FIELDS.map(([field, label]) => <Col md={4} key={field}><div className="form-group"><label>{label}</label><Input value={record[field] !== null ? record[field] : undefined} onChange={event => this.updatePrice(field, event.target.value)} /></div></Col>)}</Row>
          <Row gutter={10}>
            <Col md={12}><div className="form-group"><label>一次性</label><Input addonAfter={currencySymbol} value={record.onetime_price !== null ? record.onetime_price : undefined} onChange={event => this.updatePrice('onetime_price', event.target.value)} /></div></Col>
            <Col md={12}><div className="form-group"><label>重置包</label><Input addonAfter={currencySymbol} value={record.reset_price !== null ? record.reset_price : undefined} onChange={event => this.updatePrice('reset_price', event.target.value)} /></div></Col>
          </Row>
          <Divider />
          <div className="form-group"><label>套餐流量</label><Input addonAfter="GB" placeholder="请输入套餐流量" value={record.transfer_enable} onChange={event => this.updateRecord('transfer_enable', event.target.value)} /></div>
          <div className="form-group"><label>设备数限制</label><Input placeholder="留空则不限制" value={record.device_limit} onChange={event => this.updateRecord('device_limit', event.target.value)} /></div>
          <div className="form-group"><label>权限组 <PermissionGroupEditor><a href="javascript:void(0);">添加权限组</a></PermissionGroupEditor></label><Select placeholder="请选择权限组" style={{ width: '100%' }} value={record.group_id} onChange={groupId => this.updateRecord('group_id', groupId)}>{groups.map(group => <Select.Option key={group.id} value={group.id}>{group.name}</Select.Option>)}</Select></div>
          <div className="form-group"><label>流量重置方式</label><Select placeholder="请选择权限组" style={{ width: '100%' }} value={record.reset_traffic_method} onChange={method => this.updateRecord('reset_traffic_method', method)}><Select.Option value={null}>跟随系统设置</Select.Option><Select.Option value={0}>每月1号</Select.Option><Select.Option value={1}>按月重置</Select.Option><Select.Option value={2}>不重置</Select.Option><Select.Option value={3}>每年1月1日</Select.Option><Select.Option value={4}>按年重置</Select.Option></Select></div>
        </div>
        <div className="form-group"><label>最大容纳用户量</label><Input placeholder="留空则不限制" value={record.capacity_limit} onChange={event => this.updateRecord('capacity_limit', event.target.value)} /></div>
        <div className="form-group"><label>限速</label><Input addonAfter="Mbps" placeholder="留空则不限制" value={record.speed_limit} onChange={event => this.updateRecord('speed_limit', event.target.value)} /></div>
        <div className="v2board-drawer-action">
          <div style={{ float: 'left', marginTop: 5 }}><Tooltip title="勾选后变更的流量、限速、权限组将应用到该套餐下的用户" placement="top"><Checkbox onChange={event => this.updateRecord('force_update', event.target.checked)}>强制更新到用户</Checkbox></Tooltip></div>
          <Button style={{ marginRight: 8 }} onClick={() => this.setState({ visible: false })}>取消</Button>
          <Button loading={saveLoading} onClick={() => !saveLoading && this.save()} type="primary">提交</Button>
        </div>
      </Drawer>
    </>;
  }
}

const ConnectedPlanEditor = connect(state => ({ plan: state.plan, serverGroup: state.serverGroup, config: state.config }))(PlanEditor);

export class PlanPage extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'plan/fetch' });
    this.props.dispatch({ type: 'serverGroup/fetch' });
  }

  drop(id) { this.props.dispatch({ type: 'plan/drop', id }); }
  update(id, key, value) { this.props.dispatch({ type: 'plan/update', id, key, value }); }

  actionMenu(plan) {
    return <Menu>
      <Menu.Item onContextMenu={event => event.stopPropagation()}><ConnectedPlanEditor record={plan} key={plan?.id}><a><Icon type="edit" /> 编辑</a></ConnectedPlanEditor></Menu.Item>
      <Menu.Item style={{ color: '#ff4d4f' }} onClick={() => this.drop(plan.id)}><Icon type="delete" /> 删除</Menu.Item>
    </Menu>;
  }

  render() {
    const { plans, fetchLoading } = this.props.plan;
    const groups = this.props.serverGroup.groups;
    const columns = [
      { title: '排序', dataIndex: 'sort', key: 'sort', render: () => <Icon type="menu" style={{ cursor: 'move' }} /> },
      { title: '销售状态', dataIndex: 'show', key: 'show', render: (shown, plan) => <Switch size="small" checked={Boolean(parseInt(shown, 10))} onClick={() => this.update(plan.id, 'show', parseInt(shown, 10) ? 0 : 1)} /> },
      { title: <span>续费 <Tooltip placement="top" title="在订阅停止销售时，已购用户是否可以续费"><Icon type="question-circle" /></Tooltip></span>, dataIndex: 'renew', key: 'renew', render: (renew, plan) => <Switch size="small" checked={Boolean(parseInt(renew, 10))} onClick={() => this.update(plan.id, 'renew', parseInt(renew, 10) ? 0 : 1)} /> },
      resourceColumns.name, resourceColumns.count, resourceColumns.transfer_enable, resourceColumns.device_limit,
      priceColumns.month_price, priceColumns.quarter_price, priceColumns.half_year_price, priceColumns.year_price,
      priceColumns.two_year_price, priceColumns.three_year_price, priceColumns.onetime_price, priceColumns.reset_price,
      createPlanGroupColumn(groups),
      { title: '操作', dataIndex: 'action', key: 'action', fixed: 'right', align: 'right', render: (value, plan) => <Dropdown trigger="click" overlay={this.actionMenu(plan)}><a href="javascript:void(0);">操作 <Icon type="caret-down" /></a></Dropdown> },
    ];

    return <MainLayout {...this.props} title="订阅管理">
      <div className="d-flex justify-content-between align-items-center" />
      <LoadingContainer loading={fetchLoading}>
        <div className="block block-rounded"><div className="bg-white">
          <div style={{ padding: 15 }}><ConnectedPlanEditor><Button><Icon type="plus" /> 添加订阅</Button></ConnectedPlanEditor></div>
          <Sortable onDragEnd={(fromIndex, toIndex) => this.props.dispatch({ type: 'plan/sort', fromIndex, toIndex })} nodeSelector="tr" handleSelector="i">
            <ContextMenuTable onContextMenu={plan => { this.contextPlan = plan; this.forceUpdate(); }} tableLayout="auto" dataSource={plans} columns={columns} pagination={false} scroll={{ x: 1300 }}>
              <ul className="ant-dropdown-menu ant-dropdown-menu-light ant-dropdown-menu-root ant-dropdown-menu-vertical">
                <li className="ant-dropdown-menu-item"><ConnectedPlanEditor record={this.contextPlan} key={this.contextPlan?.id}><a><Icon type="edit" /> 编辑</a></ConnectedPlanEditor></li>
                <li className="ant-dropdown-menu-item" onClick={() => this.drop(this.contextPlan?.id)}><a style={{ color: '#ff4d4f' }}><Icon type="delete" /> 删除</a></li>
              </ul>
            </ContextMenuTable>
          </Sortable>
        </div></div>
      </LoadingContainer>
    </MainLayout>;
  }
}

export default connect(state => ({ plan: state.plan, serverGroup: state.serverGroup }))(PlanPage);
