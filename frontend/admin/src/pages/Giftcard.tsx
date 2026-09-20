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
import Table from 'antd/lib/table';
import Tag from 'antd/lib/tag';
import type { PaginationConfig } from 'antd/lib/pagination';
import type { ColumnProps, SorterResult } from 'antd/lib/table/interface';
import type { RangePickerValue } from 'antd/lib/date-picker/interface';
import copy from 'copy-to-clipboard';
import moment from 'moment';
import LoadingContainer from '../components/LoadingContainer';
import { createReadonlyGiftcardColumns, type GiftcardRecord } from '../components/GiftcardDisplayColumns';
import MainLayout from '../layouts/MainLayout';
import type { PlanSummary } from '../types/config';
import type { AdminDispatch } from '../types/store';
import type { GiftcardState } from '../types/promotion';

const defaultGiftcard: GiftcardRecord = { type: 1 };

function createValidityRange(startedAt?: number | string | null, endedAt?: number | string | null): RangePickerValue {
  const start = startedAt ? moment(1000 * Number(startedAt)) : null;
  const end = endedAt ? moment(1000 * Number(endedAt)) : null;
  if (start && end) return [start, end];
  if (start) return [start, null];
  if (end) return [null, end];
  return [];
}

interface GiftcardPageProps {
  dispatch: AdminDispatch;
  giftcard: GiftcardState;
  plan: { plans: PlanSummary[] };
  [key: string]: unknown;
}

interface GiftcardRootState {
  giftcard: GiftcardPageProps['giftcard'];
  plan: GiftcardPageProps['plan'];
}

interface GiftcardPageState {
  visible: boolean;
  submit: GiftcardRecord;
}

export class GiftcardPage extends React.Component<GiftcardPageProps, GiftcardPageState> {
  state: GiftcardPageState = { visible: false, submit: { ...defaultGiftcard } };

  componentDidMount(): void {
    this.props.dispatch({ type: 'giftcard/fetch' });
    this.props.dispatch({ type: 'plan/fetch' });
  }

  updateSubmit(patch: Partial<GiftcardRecord>): void {
    this.setState(({ submit }) => ({ submit: { ...submit, ...patch } }));
  }

  toggleModal(): void {
    this.setState(({ visible }) => ({ visible: !visible }), () => {
      if (!this.state.visible) this.setState({ submit: { ...defaultGiftcard } });
    });
  }

  generate(): void {
    this.props.dispatch({
      type: 'giftcard/generate',
      params: { ...this.state.submit },
      callback: () => this.toggleModal(),
    });
  }

  drop(card: GiftcardRecord): void {
    this.props.dispatch({ type: 'giftcard/drop', id: card.id });
  }

  tableOnChange(pagination: PaginationConfig, sorter: SorterResult<GiftcardRecord>): void {
    this.props.dispatch({
      type: 'giftcard/changeTable',
      pagination,
      sort: { sort_type: sorter.order === 'ascend' ? 'ASC' : 'DESC', sort: sorter.columnKey },
    });
  }

  render() {
    const { giftcard, plan } = this.props;
    const { submit, visible } = this.state;
    const validityRange = createValidityRange(submit.started_at, submit.ended_at);
    const readonlyColumns = createReadonlyGiftcardColumns(plan.plans);
    const columns: ColumnProps<GiftcardRecord>[] = [
      readonlyColumns.id,
      readonlyColumns.name,
      readonlyColumns.type,
      readonlyColumns.value,
      readonlyColumns.plan_id,
      {
        title: '卡密', dataIndex: 'code', key: 'code',
        render: (code: string) => <Tag style={{ cursor: 'pointer' }} onClick={() => { copy(code); message.success('复制成功'); }}>{code}</Tag>,
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
    const valueSuffix = { 1: '¥', 2: '天', 3: 'GB', 4: '', 5: '天' }[submit.type || 1] || '';

    return <MainLayout {...this.props} title="礼品卡管理">
      <LoadingContainer loading={giftcard.fetchLoading}>
        <div className="block border-bottom"><div className="bg-white">
          <div style={{ padding: 15 }}><Button onClick={() => this.toggleModal()}><Icon type="plus" /> 添加礼品卡</Button></div>
          <Table<GiftcardRecord> tableLayout="auto" dataSource={giftcard.giftcards} columns={columns} scroll={{ x: 1050 }} pagination={{ ...giftcard.pagination, size: 'small', showSizeChanger: true, pageSizeOptions: ['10', '50', '100', '150'] }} onChange={(pagination, _filters, sorter) => this.tableOnChange(pagination, sorter)} />
        </div></div>
      </LoadingContainer>
      <Modal title={submit.id ? '编辑礼品卡' : '新建礼品卡'} visible={visible} onCancel={() => this.toggleModal()} onOk={() => this.generate()} okText="提交" cancelText="取消" okButtonProps={{ loading: giftcard.saveLoading }}>
        <div>
          <div className="form-group"><label htmlFor="giftcard-name">名称</label><Input id="giftcard-name" placeholder="请输入礼品卡名称" value={submit.name} onChange={event => this.updateSubmit({ name: event.target.value })} /></div>
          {!submit.generate_count && <div className="form-group"><label htmlFor="giftcard-code">自定义礼品卡卡密</label><Input id="giftcard-code" placeholder="自定义礼品卡卡密(留空随机生成)" value={submit.code} onChange={event => this.updateSubmit({ code: event.target.value, generate_count: undefined })} /></div>}
          <div className="form-group"><label htmlFor="giftcard-value">礼品卡类型</label><Input id="giftcard-value" type="number" addonBefore={<Select style={{ width: 140 }} value={submit.type} onChange={(type: 1 | 2 | 3 | 4 | 5) => this.updateSubmit({ type })}><Select.Option value={1}>增加账户余额</Select.Option><Select.Option value={2}>增加订阅时长</Select.Option><Select.Option value={3}>增加套餐流量</Select.Option><Select.Option value={4}>重置套餐流量</Select.Option><Select.Option value={5}>兑换订阅套餐</Select.Option></Select>} addonAfter={valueSuffix} disabled={submit.type === 4} placeholder={submit.type === 5 ? '一次性套餐输入0' : '请输入值'} value={submit.type === 4 ? 0 : submit.value} onChange={event => this.updateSubmit({ value: event.target.value })} /></div>
          {submit.type === 5 && <div className="form-group"><label htmlFor="giftcard-plan">指定订阅</label><Select id="giftcard-plan" value={submit.plan_id === null || submit.plan_id === undefined ? undefined : String(submit.plan_id)} onChange={(planId: string) => this.updateSubmit({ plan_id: planId && planId.length ? planId : null })} placeholder="指定订阅" style={{ width: '100%' }}>{plan.plans.map(item => <Select.Option key={item.id} value={`${item.id}`}>{item.name}</Select.Option>)}</Select></div>}
          <div className="form-group"><label>礼品卡有效期</label><DatePicker.RangePicker style={{ width: '100%' }} showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" placeholder={['Start Time', 'End Time']} value={validityRange} onChange={range => this.updateSubmit({ started_at: range[0] ? range[0].format('X') : null, ended_at: range[1] ? range[1].format('X') : null })} /></div>
          <div className="form-group"><label htmlFor="giftcard-limit">最大使用次数</label><Input id="giftcard-limit" placeholder="限制最大使用次数，用完则无法使用(为空则不限制)" value={submit.limit_use ?? undefined} onChange={event => this.updateSubmit({ limit_use: event.target.value })} /></div>
          {!submit.code && !submit.id && <div className="form-group"><label htmlFor="giftcard-count">生成数量</label><Input id="giftcard-count" placeholder="输入数量批量生成" value={submit.generate_count} onChange={event => this.updateSubmit({ generate_count: event.target.value, code: undefined })} /></div>}
        </div>
      </Modal>
    </MainLayout>;
  }
}

export default connect((state: GiftcardRootState) => ({ giftcard: state.giftcard, plan: state.plan }))(GiftcardPage);
