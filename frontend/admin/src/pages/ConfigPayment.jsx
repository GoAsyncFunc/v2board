import React from 'react';
import { connect } from '../vendor/reactRedux.js';
import { Table } from '../vendor/ui.js';
import { Button } from '../vendor/ui.js';
import { Modal } from '../vendor/Modal.js';
import { Divider } from '../vendor/Divider.js';
import { Switch } from '../vendor/ui.js';
import { Icon } from '../vendor/Icon.js';
import { Select } from '../vendor/ui.js';
import { Input } from '../vendor/ui.js';
import LoadingContainer from '../components/LoadingContainer.tsx';
import Sortable from '../components/Sortable.tsx';
import MainLayout from '../layouts/MainLayout.jsx';
import { createPaymentNotifyColumn } from '../components/PaymentNotifyColumn.tsx';
import { createReadonlyPaymentColumns } from '../components/PaymentDisplayColumns.ts';

import '../vendor/iconStyles.js';

const readonlyColumns = createReadonlyPaymentColumns();

export class PaymentEditor extends React.Component {
  constructor(props) {
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

  save() {
    const { config, selectedPaymentMethod, submit } = this.state;
    this.props.dispatch({
      type: 'payment/save',
      params: { ...submit, payment: selectedPaymentMethod, config },
      complete: () => this.setState({ visible: false }),
    });
  }

  show() {
    this.props.dispatch({
      type: 'payment/getPaymentMethods',
      complete: paymentMethods => {
        const selectedPaymentMethod = this.state.selectedPaymentMethod
          || this.state.submit.payment
          || paymentMethods[0];
        this.setState({ visible: true, paymentMethods, selectedPaymentMethod }, () => {
          this.selectPaymentMethod(selectedPaymentMethod);
        });
      },
    });
  }

  selectPaymentMethod(payment) {
    this.props.dispatch({
      type: 'payment/getPaymentForm',
      payment,
      id: this.state.submit.id,
      complete: form => this.setState({ form, selectedPaymentMethod: payment }),
    });
  }

  updateConfig(field, value) {
    this.setState({ config: { ...this.state.config, [field]: value } });
  }

  updateSubmit(field, value) {
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
            <div className="col-6"><div className="form-group"><label htmlFor="payment-fixed">固定手续费(选填)</label><Input id="payment-fixed" type="number" placeholder="在订单金额基础上附加手续费" defaultValue={submit.handling_fee_fixed / 100} onChange={event => this.updateSubmit('handling_fee_fixed', 100 * event.target.value)} /></div></div>
          </div>
          <div className="form-group"><label htmlFor="payment-method">接口文件</label><Select id="payment-method" style={{ width: '100%' }} value={selectedPaymentMethod} onChange={payment => this.selectPaymentMethod(payment)}>{paymentMethods.map(payment => <Select.Option key={payment} value={payment}>{payment}</Select.Option>)}</Select></div>
          {Object.keys(form).map(field => <div className="form-group" key={field}>
            <label htmlFor={`payment-config-${field}`}>{form[field].label}</label>
            {['input', 'text', 'string', undefined].includes(form[field].type) && <Input id={`payment-config-${field}`} placeholder={form[field].description} defaultValue={config[field] || form[field].value} onChange={event => this.updateConfig(field, event.target.value)} />}
          </div>)}
          {selectedPaymentMethod && selectedPaymentMethod.includes('Paytaro') && <div className="alert alert-warning mb-0" role="alert"><p className="mb-0">客服TG <a href="https://t.me/paytaro" target="_blank" rel="noopener noreferrer">@paytaro</a><br />机器人 <a href="https://t.me/paytarorobot" target="_blank" rel="noopener noreferrer">@paytarorobot</a><br />官方网站 <a href="https://v3.paytaro.com/#/docs" target="_blank" rel="noopener noreferrer">https://v3.paytaro.com</a></p></div>}
        </div>
      </Modal>
    </>;
  }
}

const ConnectedPaymentEditor = connect(state => ({ payment: state.payment }))(PaymentEditor);

export class PaymentPage extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'payment/fetch' });
  }

  render() {
    const { payment } = this.props;
    const columns = [
      { title: 'ID', dataIndex: 'id', key: 'id', render: id => <><Icon type="menu" style={{ cursor: 'move' }} /> {id}</> },
      { title: '启用', dataIndex: 'enable', key: 'enable', render: (enabled, record) => <Switch checked={Boolean(parseInt(enabled, 10))} size="small" onChange={() => this.props.dispatch({ type: 'payment/show', id: record.id })} /> },
      readonlyColumns.name,
      readonlyColumns.payment,
      createPaymentNotifyColumn(),
      {
        title: '操作', dataIndex: 'action', key: 'action', align: 'right', fixed: 'right',
        render: (value, record) => <>
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
            <Table tableLayout="auto" dataSource={payment.payments} columns={columns} pagination={false} scroll={{ x: 1300 }} />
          </Sortable>
        </div></div>
      </LoadingContainer>
    </MainLayout>;
  }
}

export default connect(state => ({ payment: state.payment }))(PaymentPage);
