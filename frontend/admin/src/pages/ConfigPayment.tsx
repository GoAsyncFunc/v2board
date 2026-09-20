import React from 'react';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Modal from 'antd/lib/modal';
import Select from 'antd/lib/select';
import Switch from 'antd/lib/switch';
import Table from 'antd/lib/table';
import type { ColumnProps } from 'antd/lib/table/interface';
import LoadingContainer from '../components/LoadingContainer';
import Sortable from '../components/Sortable';
import MainLayout from '../layouts/MainLayout';
import { createPaymentNotifyColumn } from '../components/PaymentNotifyColumn';
import { createReadonlyPaymentColumns, type PaymentConfigValue, type PaymentRecord } from '../components/PaymentDisplayColumns';
import type { AdminDispatch } from '../types/store';
import type { PaymentForm, PaymentState } from '../types/payment';


const readonlyColumns = createReadonlyPaymentColumns();

function toInputValue(value: PaymentConfigValue): string | number | undefined {
  if (value === null || value === undefined) return undefined;
  return typeof value === 'boolean' ? String(value) : value;
}

interface PaymentEditorProps {
  children: React.ReactElement;
  dispatch: AdminDispatch;
  payment: PaymentState;
  record?: PaymentRecord;
}

interface PaymentEditorState {
  visible: boolean;
  submit: PaymentRecord;
  config: Record<string, PaymentConfigValue>;
  paymentMethods: string[];
  selectedPaymentMethod?: string;
  form: PaymentForm;
}

interface PaymentRootState {
  payment: PaymentState;
}

export class PaymentEditor extends React.Component<PaymentEditorProps, PaymentEditorState> {
  constructor(props: PaymentEditorProps) {
    super(props);
    const record = props.record || {};
    this.state = {
      visible: false,
      submit: { ...record },
      config: { ...(record.config || {}) },
      paymentMethods: [],
      selectedPaymentMethod: undefined,
      form: {},
    };
  }

  save(): void {
    const { config, selectedPaymentMethod, submit } = this.state;
    this.props.dispatch({
      type: 'payment/save',
      params: { ...submit, payment: selectedPaymentMethod, config },
      complete: () => this.setState({ visible: false }),
    });
  }

  show(): void {
    this.props.dispatch({
      type: 'payment/getPaymentMethods',
      complete: (paymentMethods: string[]) => {
        const selectedPaymentMethod = this.state.selectedPaymentMethod
          || this.state.submit.payment
          || paymentMethods[0];
        this.setState({ visible: true, paymentMethods, selectedPaymentMethod }, () => {
          this.selectPaymentMethod(selectedPaymentMethod);
        });
      },
    });
  }

  selectPaymentMethod(payment: string): void {
    this.props.dispatch({
      type: 'payment/getPaymentForm',
      payment,
      id: this.state.submit.id,
      complete: (form: PaymentForm) => this.setState({ form, selectedPaymentMethod: payment }),
    });
  }

  updateConfig(field: string, value: PaymentConfigValue): void {
    this.setState({ config: { ...this.state.config, [field]: value } });
  }

  updateSubmit<Field extends keyof PaymentRecord>(field: Field, value: PaymentRecord[Field]): void {
    this.setState({ submit: { ...this.state.submit, [field]: value } });
  }

  render() {
    const { paymentMethods, selectedPaymentMethod, form, config, submit, visible } = this.state;
    return <>
      {React.cloneElement(this.props.children, { onClick: () => this.show() })}
      <Modal title={submit.id ? '编辑支付方式' : '添加支付方式'} visible={visible} onCancel={() => this.setState({ visible: false })} onOk={() => this.save()} okText={submit.id ? '保存' : '添加'} okButtonProps={{ loading: this.props.payment.fetchLoading }} cancelText="取消">
        <div>
          <div className="form-group"><label htmlFor="payment-name">显示名称</label><Input id="payment-name" placeholder="用于前端显示使用" defaultValue={submit.name} onChange={event => this.updateSubmit('name', event.target.value)} /></div>
          <div className="form-group"><label htmlFor="payment-icon">图标URL(选填)</label><Input id="payment-icon" placeholder="用于前端显示使用(https://x.com/icon.svg)" defaultValue={submit.icon} onChange={event => this.updateSubmit('icon', event.target.value)} /></div>
          <div className="form-group"><label htmlFor="payment-domain">自定义通知域名(选填)</label><Input id="payment-domain" placeholder="网关的通知将会发送到该域名(https://x.com)" defaultValue={submit.notify_domain} onChange={event => this.updateSubmit('notify_domain', event.target.value)} /></div>
          <div className="row">
            <div className="col-6"><div className="form-group"><label htmlFor="payment-percent">百分比手续费(选填)</label><Input id="payment-percent" suffix="%" type="number" placeholder="在订单金额基础上附加手续费" defaultValue={submit.handling_fee_percent} onChange={event => this.updateSubmit('handling_fee_percent', event.target.value)} /></div></div>
            <div className="col-6"><div className="form-group"><label htmlFor="payment-fixed">固定手续费(选填)</label><Input id="payment-fixed" type="number" placeholder="在订单金额基础上附加手续费" defaultValue={(submit.handling_fee_fixed || 0) / 100} onChange={event => this.updateSubmit('handling_fee_fixed', 100 * Number(event.target.value))} /></div></div>
          </div>
          <div className="form-group"><label htmlFor="payment-method">接口文件</label><Select id="payment-method" style={{ width: '100%' }} value={selectedPaymentMethod} onChange={payment => this.selectPaymentMethod(payment)}>{paymentMethods.map(payment => <Select.Option key={payment} value={payment}>{payment}</Select.Option>)}</Select></div>
          {Object.keys(form).map(field => <div className="form-group" key={field}>
            <label htmlFor={`payment-config-${field}`}>{form[field].label}</label>
            {['input', 'text', 'string', undefined].includes(form[field].type) && <Input id={`payment-config-${field}`} placeholder={form[field].description} defaultValue={toInputValue(config[field] || form[field].value)} onChange={event => this.updateConfig(field, event.target.value)} />}
          </div>)}
          {selectedPaymentMethod && selectedPaymentMethod.includes('Paytaro') && <div className="alert alert-warning mb-0" role="alert"><p className="mb-0">客服TG <a href="https://t.me/paytaro" target="_blank" rel="noopener noreferrer">@paytaro</a><br />机器人 <a href="https://t.me/paytarorobot" target="_blank" rel="noopener noreferrer">@paytarorobot</a><br />官方网站 <a href="https://v3.paytaro.com/#/docs" target="_blank" rel="noopener noreferrer">https://v3.paytaro.com</a></p></div>}
        </div>
      </Modal>
    </>;
  }
}

const ConnectedPaymentEditor = connect((state: PaymentRootState) => ({ payment: state.payment }))(PaymentEditor);

interface PaymentPageProps {
  dispatch: AdminDispatch;
  payment: PaymentState;
}

export class PaymentPage extends React.Component<PaymentPageProps> {
  componentDidMount() {
    this.props.dispatch({ type: 'payment/fetch' });
  }

  render() {
    const { payment } = this.props;
    const columns: ColumnProps<PaymentRecord>[] = [
      { title: 'ID', dataIndex: 'id', key: 'id', render: (id: PaymentRecord['id']) => <><Icon type="menu" style={{ cursor: 'move' }} /> {id}</> },
      { title: '启用', dataIndex: 'enable', key: 'enable', render: (enabled: PaymentRecord['enable'], record) => <Switch checked={Boolean(parseInt(String(enabled), 10))} size="small" onChange={() => this.props.dispatch({ type: 'payment/show', id: record.id })} /> },
      readonlyColumns.name,
      readonlyColumns.payment,
      createPaymentNotifyColumn(),
      {
        title: '操作', dataIndex: 'action', key: 'action', align: 'right', fixed: 'right',
        render: (_value, record) => <>
          <ConnectedPaymentEditor key={record.id} record={record}><a href="javascript:void(0);">编辑</a></ConnectedPaymentEditor>
          <Divider type="vertical" />
          <a href="javascript:void(0);" onClick={() => Modal.confirm({ title: '警告', content: '确定要删除该条项目吗？', onOk: () => this.props.dispatch({ type: 'payment/drop', id: record.id }), okText: '确定', cancelText: '取消' })}>删除</a>
        </>,
      },
    ];

    return <MainLayout {...this.props} title="支付配置">
      <div className="d-flex justify-content-between align-items-center" />
      <LoadingContainer loading={payment.fetchLoading}>
        <div className="block block-rounded"><div className="bg-white">
          <div style={{ padding: 15 }}><ConnectedPaymentEditor key={0}><Button><Icon type="plus" /> 添加支付方式</Button></ConnectedPaymentEditor></div>
          <Sortable onDragEnd={(fromIndex, toIndex) => this.props.dispatch({ type: 'payment/sort', fromIndex, toIndex })} nodeSelector="tr" handleSelector="i">
            <Table<PaymentRecord> tableLayout="auto" dataSource={payment.payments} columns={columns} pagination={false} scroll={{ x: 1300 }} />
          </Sortable>
        </div></div>
      </LoadingContainer>
    </MainLayout>;
  }
}

export default connect((state: PaymentRootState) => ({ payment: state.payment }))(PaymentPage);
