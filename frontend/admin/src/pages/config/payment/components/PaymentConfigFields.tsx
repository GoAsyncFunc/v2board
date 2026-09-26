import React from 'react';
import Input from 'antd/lib/input';
import type { PaymentConfigValue, PaymentForm } from '@/types/paymentContracts';

function toInputValue(value: PaymentConfigValue): string | number | undefined {
    if (value === null || value === undefined) return undefined;
    return typeof value === 'boolean' ? String(value) : value;
}

export interface PaymentConfigFieldsProps {
    form: PaymentForm;
    config: Record<string, PaymentConfigValue>;
    onChange: (field: string, value: PaymentConfigValue) => void;
}

export function PaymentConfigFields({
    form,
    config,
    onChange,
}: PaymentConfigFieldsProps): React.ReactElement {
    return (
        <>
            {Object.keys(form).map((field) => (
                <div className="form-group" key={field}>
                    <label htmlFor={`payment-config-${field}`}>{form[field].label}</label>
                    {['input', 'text', 'string', undefined].includes(form[field].type) && (
                        <Input
                            id={`payment-config-${field}`}
                            placeholder={form[field].description}
                            defaultValue={toInputValue(config[field] || form[field].value)}
                            onChange={(event) => onChange(field, event.target.value)}
                        />
                    )}
                </div>
            ))}
        </>
    );
}
