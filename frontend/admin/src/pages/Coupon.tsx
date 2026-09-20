import React from 'react';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import DatePicker from 'antd/lib/date-picker';
import Divider from 'antd/lib/divider';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import Select from 'antd/lib/select';
import Switch from 'antd/lib/switch';
import Table from 'antd/lib/table';
import Tag from 'antd/lib/tag';
import type { PaginationConfig } from 'antd/lib/pagination';
import type { ColumnProps, SorterResult } from 'antd/lib/table/interface';
import type { RangePickerValue } from 'antd/lib/date-picker/interface';
import copy from 'copy-to-clipboard';
import moment from 'moment';
import LoadingContainer from '../components/LoadingContainer';
import { createReadonlyCouponColumns, type CouponRecord } from '../components/CouponDisplayColumns';
import MainLayout from '../layouts/MainLayout';
import { settings } from '../config/adminSettings';
import type { PlanSummary } from '../types/config';
import type { AdminDispatch, AdminRootState } from '../types/store';
import type { CouponState } from '../types/promotion';

const defaultCoupon: CouponRecord = { type: 1 };
const readonlyColumns = createReadonlyCouponColumns();

function createValidityRange(startedAt?: number | string | null, endedAt?: number | string | null): RangePickerValue {
  const start = startedAt ? moment(1000 * Number(startedAt)) : null;
  const end = endedAt ? moment(1000 * Number(endedAt)) : null;
  if (start && end) return [start, end];
  if (start) return [start, null];
  if (end) return [null, end];
  return [];
}

interface CouponPageProps {
  dispatch: AdminDispatch;
  coupon: CouponState;
  plan: { plans: PlanSummary[] };
}

interface CouponPageState {
  visible: boolean;
  submit: CouponRecord;
}

export class CouponPage extends React.Component<CouponPageProps, CouponPageState> {
  state: CouponPageState = { visible: false, submit: { ...defaultCoupon } };

  componentDidMount(): void {
    this.props.dispatch({ type: 'coupon/fetch' });
    this.props.dispatch({ type: 'plan/fetch' });
  }

  updateSubmit(patch: Partial<CouponRecord>): void {
    this.setState(({ submit }) => ({ submit: { ...submit, ...patch } }));
  }

  toggleModal(): void {
    this.setState(({ visible }) => ({ visible: !visible }), () => {
      if (!this.state.visible) this.setState({ submit: { ...defaultCoupon } });
    });
  }

  generate(): void {
    this.props.dispatch({
      type: 'coupon/generate',
      params: { ...this.state.submit },
      callback: () => this.toggleModal(),
    });
  }

  drop(coupon: CouponRecord): void {
    this.props.dispatch({ type: 'coupon/drop', id: coupon.id });
  }

  tableOnChange(pagination: PaginationConfig, sorter: SorterResult<CouponRecord>): void {
    this.props.dispatch({
      type: 'coupon/changeTable',
      pagination,
      sort: { sort_type: sorter.order === 'ascend' ? 'ASC' : 'DESC', sort: sorter.columnKey },
    });
  }

  render() {
    const { coupon, plan } = this.props;
    const { submit, visible } = this.state;
    const validityRange = createValidityRange(submit.started_at, submit.ended_at);
    const columns: ColumnProps<CouponRecord>[] = [
      readonlyColumns.id,
      {
        title: '启用', dataIndex: 'show', key: 'show',
        render: (enabled: boolean, row) => (
          <Switch size="small" checked={enabled} onChange={() => this.props.dispatch({ type: 'coupon/show', id: row.id })} />
        ),
      },
      readonlyColumns.name,
      readonlyColumns.type,
      {
        title: '券码', dataIndex: 'code', key: 'code',
        render: (code: string) => (
          <Tag style={{ cursor: 'pointer' }} onClick={() => { copy(code); message.success('复制成功'); }}>{code}</Tag>
        ),
      },
      readonlyColumns.limit_use,
      readonlyColumns.started_at,
      {
        title: '操作', dataIndex: 'action', key: 'action', align: 'right', fixed: 'right',
        render: (_value, row) => <div>
          <a href="javascript:void(0);" onClick={() => this.setState({ submit: { ...row } }, () => this.toggleModal())}>编辑</a>
          <Divider type="vertical" />
          <a href="javascript:void(0);" onClick={() => Modal.confirm({ title: '警告', content: '确定要删除该条项目吗？', onOk: () => this.drop(row), okText: '确定', cancelText: '取消' })}>删除</a>
        </div>,
      },
    ];

    return <MainLayout {...this.props} title="优惠券管理">
      <LoadingContainer loading={coupon.fetchLoading}>
        <div className="block border-bottom"><div className="bg-white">
          <div style={{ padding: 15 }}><Button onClick={() => this.toggleModal()}><Icon type="plus" /> 添加优惠券</Button></div>
          <Table<CouponRecord> tableLayout="auto" dataSource={coupon.coupons} columns={columns} scroll={{ x: 1050 }} pagination={{ ...coupon.pagination, size: 'small', showSizeChanger: true, pageSizeOptions: ['10', '50', '100', '150'] }} onChange={(pagination, _filters, sorter) => this.tableOnChange(pagination, sorter)} />
        </div></div>
      </LoadingContainer>
      <Modal title={submit.id ? '编辑优惠券' : '新建优惠券'} visible={visible} onCancel={() => this.toggleModal()} onOk={() => this.generate()} okText="提交" cancelText="取消" okButtonProps={{ loading: coupon.saveLoading }}>
        <div>
          <div className="form-group"><label htmlFor="coupon-name">名称</label><Input id="coupon-name" placeholder="请输入优惠券名称" value={submit.name} onChange={event => this.updateSubmit({ name: event.target.value })} /></div>
          {!submit.generate_count && <div className="form-group"><label htmlFor="coupon-code">自定义优惠券码</label><Input id="coupon-code" placeholder="自定义优惠券码(留空随机生成)" value={submit.code} onChange={event => this.updateSubmit({ code: event.target.value, generate_count: undefined })} /></div>}
          <div className="form-group"><label htmlFor="coupon-value">优惠信息</label><Input id="coupon-value" type="number" addonBefore={<Select style={{ width: 120 }} value={submit.type} onChange={(type: 1 | 2) => this.updateSubmit({ type })}><Select.Option value={1}>按金额优惠</Select.Option><Select.Option value={2}>按比例优惠</Select.Option></Select>} addonAfter={submit.type === 1 ? '¥' : '%'} placeholder="请输入值" value={submit.value} onChange={event => this.updateSubmit({ value: event.target.value })} /></div>
          <div className="form-group"><label>优惠券有效期</label><DatePicker.RangePicker style={{ width: '100%' }} showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" placeholder={['Start Time', 'End Time']} value={validityRange} onChange={range => this.updateSubmit({ started_at: range[0] ? range[0].format('X') : null, ended_at: range[1] ? range[1].format('X') : null })} /></div>
          <div className="form-group"><label htmlFor="coupon-limit">最大使用次数</label><Input id="coupon-limit" placeholder="限制最大使用次数，用完则无法使用(为空则不限制)" value={submit.limit_use ?? undefined} onChange={event => this.updateSubmit({ limit_use: event.target.value })} /></div>
          <div className="form-group"><label htmlFor="coupon-user-limit">每个用户可使用次数</label><Input id="coupon-user-limit" placeholder="限制每个用户可使用次数(为空则不限制)" value={submit.limit_use_with_user ?? undefined} onChange={event => this.updateSubmit({ limit_use_with_user: event.target.value })} /></div>
          <div className="form-group"><label htmlFor="coupon-plans">指定订阅</label><Select id="coupon-plans" value={submit.limit_plan_ids || []} onChange={(ids: string[]) => this.updateSubmit({ limit_plan_ids: ids.length ? ids : null })} mode="multiple" placeholder="限制指定订阅可以使用优惠(为空则不限制)" style={{ width: '100%' }}>{plan.plans.map(item => <Select.Option key={item.id} value={`${item.id}`}>{item.name}</Select.Option>)}</Select></div>
          <div className="form-group"><label htmlFor="coupon-periods">指定周期</label><Select id="coupon-periods" value={submit.limit_period || []} onChange={(periods: string[]) => this.updateSubmit({ limit_period: periods.length ? periods : null })} mode="multiple" placeholder="限制指定周期可以使用优惠(为空则不限制)" style={{ width: '100%' }}>{Object.keys(settings.periodText).map(period => <Select.Option key={period} value={period}>{settings.periodText[period]}</Select.Option>)}</Select></div>
          {!submit.code && !submit.id && <div className="form-group"><label htmlFor="coupon-count">生成数量</label><Input id="coupon-count" placeholder="输入数量批量生成" value={submit.generate_count} onChange={event => this.updateSubmit({ generate_count: event.target.value, code: undefined })} /></div>}
        </div>
      </Modal>
    </MainLayout>;
  }
}

export default connect((state: AdminRootState) => ({ coupon: state.coupon, plan: state.plan }))(CouponPage);
