import React from 'react';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import type { PaymentRecord } from '@/types/paymentContracts';

export interface PaymentBasicFieldsProps {
    submit: PaymentRecord;
    paymentMethods: string[];
    selectedPaymentMethod?: string;
    onSubmitChange: <Field extends keyof PaymentRecord>(
        field: Field,
        value: PaymentRecord[Field],
    ) => void;
    onPaymentMethodChange: (payment: string) => void;
}

export function PaymentBasicFields({
    submit,
    paymentMethods,
    selectedPaymentMethod,
    onSubmitChange,
    onPaymentMethodChange,
}: PaymentBasicFieldsProps): React.ReactElement {
    return (
        <>
            <div className="form-group">
                <label htmlFor="payment-name">显示名称</label>
                <Input
                    id="payment-name"
                    placeholder="用于前端显示使用"
                    defaultValue={submit.name}
                    onChange={(event) => onSubmitChange('name', event.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="payment-icon">图标URL(选填)</label>
                <Input
                    id="payment-icon"
                    placeholder="用于前端显示使用(https://x.com/icon.svg)"
                    defaultValue={submit.icon}
                    onChange={(event) => onSubmitChange('icon', event.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="payment-domain">自定义通知域名(选填)</label>
                <Input
                    id="payment-domain"
                    placeholder="网关的通知将会发送到该域名(https://x.com)"
                    defaultValue={submit.notify_domain}
                    onChange={(event) => onSubmitChange('notify_domain', event.target.value)}
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
                                onSubmitChange('handling_fee_percent', event.target.value)
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
                                onSubmitChange(
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
                    onChange={onPaymentMethodChange}
                >
                    {paymentMethods.map((payment) => (
                        <Select.Option key={payment} value={payment}>
                            {payment}
                        </Select.Option>
                    ))}
                </Select>
            </div>
        </>
    );
}
