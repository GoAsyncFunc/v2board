import React from 'react';
import { connect } from 'react-redux';
import Input from 'antd/lib/input';
import Modal from 'antd/lib/modal';
import Select from 'antd/lib/select';
import type { AdminDispatch, AdminRootState } from '../../../../types/store';
import type {
    PaymentConfigValue,
    PaymentForm,
    PaymentRecord,
    PaymentState,
} from '../../../../types/payment';

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
                const selectedPaymentMethod =
                    this.state.selectedPaymentMethod ||
                    this.state.submit.payment ||
                    paymentMethods[0];
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
            complete: (form: PaymentForm) =>
                this.setState({ form, selectedPaymentMethod: payment }),
        });
    }

    updateConfig(field: string, value: PaymentConfigValue): void {
        this.setState({ config: { ...this.state.config, [field]: value } });
    }

    updateSubmit<Field extends keyof PaymentRecord>(
        field: Field,
        value: PaymentRecord[Field],
    ): void {
        this.setState({ submit: { ...this.state.submit, [field]: value } });
    }

    render() {
        const { paymentMethods, selectedPaymentMethod, form, config, submit, visible } = this.state;
        return (
            <>
                {React.cloneElement(this.props.children, { onClick: () => this.show() })}
                <Modal
                    title={submit.id ? '编辑支付方式' : '添加支付方式'}
                    visible={visible}
                    onCancel={() => this.setState({ visible: false })}
                    onOk={() => this.save()}
                    okText={submit.id ? '保存' : '添加'}
                    okButtonProps={{ loading: this.props.payment.fetchLoading }}
                    cancelText="取消"
                >
                    <div>
                        <div className="form-group">
                            <label htmlFor="payment-name">显示名称</label>
                            <Input
                                id="payment-name"
                                placeholder="用于前端显示使用"
                                defaultValue={submit.name}
                                onChange={(event) => this.updateSubmit('name', event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="payment-icon">图标URL(选填)</label>
                            <Input
                                id="payment-icon"
                                placeholder="用于前端显示使用(https://x.com/icon.svg)"
                                defaultValue={submit.icon}
                                onChange={(event) => this.updateSubmit('icon', event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="payment-domain">自定义通知域名(选填)</label>
                            <Input
                                id="payment-domain"
                                placeholder="网关的通知将会发送到该域名(https://x.com)"
                                defaultValue={submit.notify_domain}
                                onChange={(event) =>
                                    this.updateSubmit('notify_domain', event.target.value)
                                }
                            />
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="payment-percent">百分比手续费(选填)</label>
                                    <Input
                                        id="payment-percent"
                                        suffix="%"
                                        type="number"
                                        placeholder="在订单金额基础上附加手续费"
                                        defaultValue={submit.handling_fee_percent}
                                        onChange={(event) =>
                                            this.updateSubmit(
                                                'handling_fee_percent',
                                                event.target.value,
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="payment-fixed">固定手续费(选填)</label>
                                    <Input
                                        id="payment-fixed"
                                        type="number"
                                        placeholder="在订单金额基础上附加手续费"
                                        defaultValue={(submit.handling_fee_fixed || 0) / 100}
                                        onChange={(event) =>
                                            this.updateSubmit(
                                                'handling_fee_fixed',
                                                100 * Number(event.target.value),
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="payment-method">接口文件</label>
                            <Select
                                id="payment-method"
                                style={{ width: '100%' }}
                                value={selectedPaymentMethod}
                                onChange={(payment) => this.selectPaymentMethod(payment)}
                            >
                                {paymentMethods.map((payment) => (
                                    <Select.Option key={payment} value={payment}>
                                        {payment}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>
                        {Object.keys(form).map((field) => (
                            <div className="form-group" key={field}>
                                <label htmlFor={`payment-config-${field}`}>
                                    {form[field].label}
                                </label>
                                {['input', 'text', 'string', undefined].includes(
                                    form[field].type,
                                ) && (
                                    <Input
                                        id={`payment-config-${field}`}
                                        placeholder={form[field].description}
                                        defaultValue={toInputValue(
                                            config[field] || form[field].value,
                                        )}
                                        onChange={(event) =>
                                            this.updateConfig(field, event.target.value)
                                        }
                                    />
                                )}
                            </div>
                        ))}
                        {selectedPaymentMethod && selectedPaymentMethod.includes('Paytaro') && (
                            <div className="alert alert-warning mb-0" role="alert">
                                <p className="mb-0">
                                    客服TG{' '}
                                    <a
                                        href="https://t.me/paytaro"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        @paytaro
                                    </a>
                                    <br />
                                    机器人{' '}
                                    <a
                                        href="https://t.me/paytarorobot"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        @paytarorobot
                                    </a>
                                    <br />
                                    官方网站{' '}
                                    <a
                                        href="https://v3.paytaro.com/#/docs"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://v3.paytaro.com
                                    </a>
                                </p>
                            </div>
                        )}
                    </div>
                </Modal>
            </>
        );
    }
}

export default connect((state: AdminRootState) => ({ payment: state.payment }))(PaymentEditor);
