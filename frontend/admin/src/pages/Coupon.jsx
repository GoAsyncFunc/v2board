import React from 'react';
import { connect } from '../vendor/reactRedux.js';
import { DatePicker } from '../vendor/ui.js';
import { Select } from '../vendor/ui.js';
import { Input } from '../vendor/ui.js';
import { Table } from '../vendor/ui.js';
import { Button } from '../vendor/ui.js';
import { Icon } from '../vendor/Icon.js';
import { Modal } from '../vendor/Modal.js';
import { Divider } from '../vendor/Divider.js';
import { Tag } from '../vendor/ui.js';
import { message } from '../vendor/ui.js';
import { Switch } from '../vendor/ui.js';
import { settings } from '../vendor/adminSettings.js';
import LoadingContainer from '../components/LoadingContainer.tsx';
import copy from '../vendor/clipboard.js';
import moment from '../vendor/dateTime.js';
import MainLayout from '../layouts/MainLayout.jsx';
import { createReadonlyCouponColumns } from '../components/CouponDisplayColumns.tsx';

import '../vendor/iconStyles.js';

const readonlyColumns = createReadonlyCouponColumns();

export class CouponPage extends React.Component {
  constructor(props) {
    super(props);
    this.defaultValue = { type: 1 };
    this.state = { visible: false, submit: { ...this.defaultValue } };
  }

  componentDidMount() {
    this.props.dispatch({ type: 'coupon/fetch' });
    this.props.dispatch({ type: 'plan/fetch' });
  }

  updateSubmit(patch) {
    this.setState({ submit: { ...this.state.submit, ...patch } });
  }

  toggleModal() {
    this.setState({ visible: !this.state.visible }, () => {
      if (!this.state.visible) this.setState({ submit: { ...this.defaultValue } });
    });
  }

  generate() {
    this.props.dispatch({
      type: 'coupon/generate',
      params: { ...this.state.submit },
      callback: () => this.toggleModal(),
    });
  }

  drop(coupon) {
    this.props.dispatch({ type: 'coupon/drop', id: coupon.id });
  }

  tableOnChange(pagination, sorter) {
    this.props.dispatch({
      type: 'coupon/changeTable',
      pagination,
      sort: { sort_type: sorter.order === 'ascend' ? 'ASC' : 'DESC', sort: sorter.columnKey },
    });
  }

  render() {
    const { coupon, plan } = this.props;
    const { submit, visible } = this.state;
    const columns = [
      readonlyColumns.id,
      {
        title: '启用', dataIndex: 'show', key: 'show',
        render: (enabled, row) => <Switch size="small" checked={enabled} onChange={() => this.props.dispatch({ type: 'coupon/show', id: row.id })} />,
      },
      readonlyColumns.name,
      readonlyColumns.type,
      {
        title: '券码', dataIndex: 'code', key: 'code',
        render: code => <Tag style={{ cursor: 'pointer' }} onClick={() => { copy(code); message.success('复制成功'); }}>{code}</Tag>,
      },
      readonlyColumns.limit_use,
      readonlyColumns.started_at,
      {
        title: '操作', dataIndex: 'action', key: 'action', align: 'right', fixed: 'right',
        render: (value, row) => <div>
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
          <Table tableLayout="auto" dataSource={coupon.coupons} columns={columns} scroll={{ x: 1050 }} pagination={{ ...coupon.pagination, size: 'small', showSizeChanger: true, pageSizeOptions: [10, 50, 100, 150] }} onChange={(pagination, filters, sorter) => this.tableOnChange(pagination, sorter)} />
        </div></div>
      </LoadingContainer>
      <Modal title={submit.id ? '编辑优惠券' : '新建优惠券'} visible={visible} onCancel={() => this.toggleModal()} onOk={() => this.generate()} okText="提交" cancelText="取消" okButtonProps={{ loading: coupon.saveLoading }}>
        <div>
          <div className="form-group"><label htmlFor="coupon-name">名称</label><Input id="coupon-name" placeholder="请输入优惠券名称" value={submit.name} onChange={event => this.updateSubmit({ name: event.target.value })} /></div>
          {!submit.generate_count && <div className="form-group"><label htmlFor="coupon-code">自定义优惠券码</label><Input id="coupon-code" placeholder="自定义优惠券码(留空随机生成)" value={submit.code} onChange={event => this.updateSubmit({ code: event.target.value, generate_count: undefined })} /></div>}
          <div className="form-group"><label htmlFor="coupon-value">优惠信息</label><Input id="coupon-value" type="number" addonBefore={<Select style={{ width: 120 }} value={submit.type} onChange={type => this.updateSubmit({ type })}><Select.Option value={1}>按金额优惠</Select.Option><Select.Option value={2}>按比例优惠</Select.Option></Select>} addonAfter={submit.type === 1 ? '¥' : '%'} placeholder="请输入值" value={submit.value} onChange={event => this.updateSubmit({ value: event.target.value })} /></div>
          <div className="form-group"><label>优惠券有效期</label><DatePicker.RangePicker style={{ width: '100%' }} showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" placeholder={['Start Time', 'End Time']} value={[submit.started_at ? moment(1000 * submit.started_at) : null, submit.ended_at ? moment(1000 * submit.ended_at) : null]} onChange={range => this.updateSubmit({ started_at: range[0] ? range[0].format('X') : null, ended_at: range[1] ? range[1].format('X') : null })} /></div>
          <div className="form-group"><label htmlFor="coupon-limit">最大使用次数</label><Input id="coupon-limit" placeholder="限制最大使用次数，用完则无法使用(为空则不限制)" value={submit.limit_use} onChange={event => this.updateSubmit({ limit_use: event.target.value })} /></div>
          <div className="form-group"><label htmlFor="coupon-user-limit">每个用户可使用次数</label><Input id="coupon-user-limit" placeholder="限制每个用户可使用次数(为空则不限制)" value={submit.limit_use_with_user} onChange={event => this.updateSubmit({ limit_use_with_user: event.target.value })} /></div>
          <div className="form-group"><label htmlFor="coupon-plans">指定订阅</label><Select id="coupon-plans" value={submit.limit_plan_ids || []} onChange={ids => this.updateSubmit({ limit_plan_ids: ids.length ? ids : null })} mode="multiple" placeholder="限制指定订阅可以使用优惠(为空则不限制)" style={{ width: '100%' }}>{plan.plans.map(item => <Select.Option key={item.id} value={`${item.id}`}>{item.name}</Select.Option>)}</Select></div>
          <div className="form-group"><label htmlFor="coupon-periods">指定周期</label><Select id="coupon-periods" value={submit.limit_period || []} onChange={periods => this.updateSubmit({ limit_period: periods.length ? periods : null })} mode="multiple" placeholder="限制指定周期可以使用优惠(为空则不限制)" style={{ width: '100%' }}>{Object.keys(settings.periodText).map(period => <Select.Option key={period} value={period}>{settings.periodText[period]}</Select.Option>)}</Select></div>
          {!submit.code && !submit.id && <div className="form-group"><label htmlFor="coupon-count">生成数量</label><Input id="coupon-count" placeholder="输入数量批量生成" value={submit.generate_count} onChange={event => this.updateSubmit({ generate_count: event.target.value, code: undefined })} /></div>}
        </div>
      </Modal>
    </MainLayout>;
  }
}

export default connect(state => ({ coupon: state.coupon, plan: state.plan }))(CouponPage);
