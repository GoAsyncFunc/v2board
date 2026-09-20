import React from 'react';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Col from 'antd/lib/col';
import Divider from 'antd/lib/divider';
import Drawer from 'antd/lib/drawer';
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Menu from 'antd/lib/menu';
import Row from 'antd/lib/row';
import Select from 'antd/lib/select';
import Switch from 'antd/lib/switch';
import Tooltip from 'antd/lib/tooltip';
import type { ColumnProps } from 'antd/lib/table/interface';
import Sortable from '../components/Sortable';
import PermissionGroupEditor from '../components/PermissionGroupEditor';
import LoadingContainer from '../components/LoadingContainer';
import MainLayout from '../layouts/MainLayout';
import ContextMenuTable from '../components/ContextMenuTable';
import { createPlanGroupColumn, type PlanGroup } from '../components/PlanGroupColumn';
import { createReadonlyPlanResourceColumns } from '../components/PlanResourceColumns';
import { createReadonlyPlanPriceColumns } from '../components/PlanPriceColumns';
import type { AdminDispatch } from '../types/store';
import type { PlanFieldValue, PlanRecord, PlanState } from '../types/plan';

interface ServerGroupState { groups: PlanGroup[]; }
interface ConfigState { site: { currency_symbol?: string }; }

interface PlanEditorProps {
  children: React.ReactElement;
  dispatch: AdminDispatch;
  record?: PlanRecord;
  plan: PlanState;
  serverGroup: ServerGroupState;
  config: ConfigState;
}

interface PlanEditorState { visible: boolean; record: PlanRecord; }
interface PlanPageProps { dispatch: AdminDispatch; plan: PlanState; serverGroup: ServerGroupState; }
interface PlanRootState { plan: PlanState; serverGroup: ServerGroupState; config: ConfigState; }

const resourceColumns = createReadonlyPlanResourceColumns();
const priceColumns = createReadonlyPlanPriceColumns();
const DEFAULT_RESET_METHOD_VALUE = null as never;
const PRICE_FIELDS: Array<[string, string]> = [
  ['month_price', '月付'], ['quarter_price', '季付'], ['half_year_price', '半年'],
  ['year_price', '年付'], ['two_year_price', '两年付'], ['three_year_price', '三年付'],
];

export function emptyPlan(): PlanRecord {
  return {
    show: 0, name: null, transfer_enable: null, group_id: undefined,
    month_price: null, quarter_price: null, half_year_price: null,
    year_price: null, two_year_price: null, three_year_price: null,
    onetime_price: null, reset_price: null,
  };
}

export class PlanEditor extends React.Component<PlanEditorProps, PlanEditorState> {
  constructor(props: PlanEditorProps) {
    super(props);
    this.state = { visible: false, record: props.record ? { ...props.record } : emptyPlan() };
  }

  componentDidMount(): void {
    this.props.dispatch({ type: 'config/fetch', key: 'site' });
    this.props.dispatch({ type: 'serverGroup/fetch' });
  }

  updateRecord(field: string, value: PlanFieldValue): void { this.setState({ record: { ...this.state.record, [field]: value } }); }
  updatePrice(field: string, value: string): void { this.updateRecord(field, value !== '' ? value : null); }

  save(): void {
    this.props.dispatch({ type: 'plan/save', params: { ...this.state.record }, callback: () => this.setState({ visible: false }) });
  }

  render(): React.ReactNode {
    const { record, visible } = this.state;
    const currencySymbol = this.props.config.site.currency_symbol;
    const groups = this.props.serverGroup.groups;
    const saveLoading = this.props.plan.saveLoading;
    return <>
      {React.cloneElement(this.props.children, { onClick: () => this.setState({ visible: true }) })}
      <Drawer maskClosable onClose={() => this.setState({ visible: false })} title={record.id ? '编辑订阅' : '新建订阅'} visible={visible} width="80%">
        <div>
          <div className="form-group"><label>套餐名称</label><Input placeholder="请输入套餐名称" value={record.name ?? undefined} onChange={event => this.updateRecord('name', event.target.value)} /></div>
          <div className="form-group"><label>套餐描述</label><Input.TextArea rows={4} value={record.content ?? undefined} placeholder="请输入套餐描述，支持HTML" onChange={event => this.updateRecord('content', event.target.value)} /></div>
          <Divider orientation="center">售价设置 <Tooltip placement="top" title="将金额留空则不会进行出售"><Icon type="info-circle" /></Tooltip></Divider>
          <Row gutter={10}>{PRICE_FIELDS.map(([field, label]) => <Col md={4} key={field}><div className="form-group"><label>{label}</label><Input value={record[field] !== null ? record[field] as string | number : undefined} onChange={event => this.updatePrice(field, event.target.value)} /></div></Col>)}</Row>
          <Row gutter={10}><Col md={12}><div className="form-group"><label>一次性</label><Input addonAfter={currencySymbol} value={record.onetime_price !== null ? record.onetime_price as string | number : undefined} onChange={event => this.updatePrice('onetime_price', event.target.value)} /></div></Col><Col md={12}><div className="form-group"><label>重置包</label><Input addonAfter={currencySymbol} value={record.reset_price !== null ? record.reset_price as string | number : undefined} onChange={event => this.updatePrice('reset_price', event.target.value)} /></div></Col></Row>
          <Divider />
          <div className="form-group"><label>套餐流量</label><Input addonAfter="GB" placeholder="请输入套餐流量" value={record.transfer_enable as string | number | undefined} onChange={event => this.updateRecord('transfer_enable', event.target.value)} /></div>
          <div className="form-group"><label>设备数限制</label><Input placeholder="留空则不限制" value={record.device_limit as string | number | undefined} onChange={event => this.updateRecord('device_limit', event.target.value)} /></div>
          <div className="form-group"><label>权限组 <PermissionGroupEditor><a href="javascript:void(0);">添加权限组</a></PermissionGroupEditor></label><Select placeholder="请选择权限组" style={{ width: '100%' }} value={record.group_id} onChange={groupId => this.updateRecord('group_id', groupId)}>{groups.map(group => <Select.Option key={group.id} value={group.id}>{group.name}</Select.Option>)}</Select></div>
          <div className="form-group"><label>流量重置方式</label><Select placeholder="请选择权限组" style={{ width: '100%' }} value={record.reset_traffic_method} onChange={method => this.updateRecord('reset_traffic_method', method)}><Select.Option value={DEFAULT_RESET_METHOD_VALUE}>跟随系统设置</Select.Option><Select.Option value={0}>每月1号</Select.Option><Select.Option value={1}>按月重置</Select.Option><Select.Option value={2}>不重置</Select.Option><Select.Option value={3}>每年1月1日</Select.Option><Select.Option value={4}>按年重置</Select.Option></Select></div>
        </div>
        <div className="form-group"><label>最大容纳用户量</label><Input placeholder="留空则不限制" value={record.capacity_limit as string | number | undefined} onChange={event => this.updateRecord('capacity_limit', event.target.value)} /></div>
        <div className="form-group"><label>限速</label><Input addonAfter="Mbps" placeholder="留空则不限制" value={record.speed_limit as string | number | undefined} onChange={event => this.updateRecord('speed_limit', event.target.value)} /></div>
        <div className="v2board-drawer-action"><div style={{ float: 'left', marginTop: 5 }}><Tooltip title="勾选后变更的流量、限速、权限组将应用到该套餐下的用户" placement="top"><Checkbox onChange={event => this.updateRecord('force_update', event.target.checked)}>强制更新到用户</Checkbox></Tooltip></div><Button style={{ marginRight: 8 }} onClick={() => this.setState({ visible: false })}>取消</Button><Button loading={saveLoading} onClick={() => !saveLoading && this.save()} type="primary">提交</Button></div>
      </Drawer>
    </>;
  }
}

const ConnectedPlanEditor = connect((state: PlanRootState) => ({ plan: state.plan, serverGroup: state.serverGroup, config: state.config }))(PlanEditor);

export class PlanPage extends React.Component<PlanPageProps> {
  contextPlan?: PlanRecord;
  componentDidMount(): void { this.props.dispatch({ type: 'plan/fetch' }); this.props.dispatch({ type: 'serverGroup/fetch' }); }
  drop(id: number | string | undefined): void { this.props.dispatch({ type: 'plan/drop', id }); }
  update(id: number | string | undefined, key: string, value: PlanFieldValue): void { this.props.dispatch({ type: 'plan/update', id, key, value }); }
  actionMenu(plan: PlanRecord): React.ReactElement { return <Menu><Menu.Item onContextMenu={event => event.stopPropagation()}><ConnectedPlanEditor record={plan} key={plan.id}><a><Icon type="edit" /> 编辑</a></ConnectedPlanEditor></Menu.Item><Menu.Item style={{ color: '#ff4d4f' }} onClick={() => this.drop(plan.id)}><Icon type="delete" /> 删除</Menu.Item></Menu>; }
  render(): React.ReactNode {
    const { plans, fetchLoading } = this.props.plan;
    const groups = this.props.serverGroup.groups;
    const columns: ColumnProps<PlanRecord>[] = [
      { title: '排序', dataIndex: 'sort', key: 'sort', render: () => <Icon type="menu" style={{ cursor: 'move' }} /> },
      { title: '销售状态', dataIndex: 'show', key: 'show', render: (shown: number | string, plan: PlanRecord) => <Switch size="small" checked={Boolean(parseInt(String(shown), 10))} onClick={() => this.update(plan.id, 'show', parseInt(String(shown), 10) ? 0 : 1)} /> },
      { title: <span>续费 <Tooltip placement="top" title="在订阅停止销售时，已购用户是否可以续费"><Icon type="question-circle" /></Tooltip></span>, dataIndex: 'renew', key: 'renew', render: (renew: number | string, plan: PlanRecord) => <Switch size="small" checked={Boolean(parseInt(String(renew), 10))} onClick={() => this.update(plan.id, 'renew', parseInt(String(renew), 10) ? 0 : 1)} /> },
      resourceColumns.name, resourceColumns.count, resourceColumns.transfer_enable, resourceColumns.device_limit,
      priceColumns.month_price, priceColumns.quarter_price, priceColumns.half_year_price, priceColumns.year_price, priceColumns.two_year_price, priceColumns.three_year_price, priceColumns.onetime_price, priceColumns.reset_price, createPlanGroupColumn(groups),
      { title: '操作', dataIndex: 'action', key: 'action', fixed: 'right', align: 'right', render: (_value: undefined, plan: PlanRecord) => <Dropdown trigger={['click']} overlay={this.actionMenu(plan)}><a href="javascript:void(0);">操作 <Icon type="caret-down" /></a></Dropdown> },
    ];
    return <MainLayout {...this.props} title="订阅管理"><div className="d-flex justify-content-between align-items-center" /><LoadingContainer loading={fetchLoading}><div className="block block-rounded"><div className="bg-white"><div style={{ padding: 15 }}><ConnectedPlanEditor><Button><Icon type="plus" /> 添加订阅</Button></ConnectedPlanEditor></div><Sortable onDragEnd={(fromIndex, toIndex) => this.props.dispatch({ type: 'plan/sort', fromIndex, toIndex })} nodeSelector="tr" handleSelector="i"><ContextMenuTable onContextMenu={plan => { this.contextPlan = plan; this.forceUpdate(); }} tableLayout="auto" dataSource={plans} columns={columns} pagination={false} scroll={{ x: 1300 }}><ul className="ant-dropdown-menu ant-dropdown-menu-light ant-dropdown-menu-root ant-dropdown-menu-vertical"><li className="ant-dropdown-menu-item"><ConnectedPlanEditor record={this.contextPlan} key={this.contextPlan?.id}><a><Icon type="edit" /> 编辑</a></ConnectedPlanEditor></li><li className="ant-dropdown-menu-item" onClick={() => this.drop(this.contextPlan?.id)}><a style={{ color: '#ff4d4f' }}><Icon type="delete" /> 删除</a></li></ul></ContextMenuTable></Sortable></div></div></LoadingContainer></MainLayout>;
  }
}

export default connect((state: PlanRootState) => ({ plan: state.plan, serverGroup: state.serverGroup }))(PlanPage);
