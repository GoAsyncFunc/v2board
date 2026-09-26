import React from 'react';
import Radio from 'antd/lib/radio';
import type { PaymentMethod } from '@/types/commerceContracts';

interface PaymentMethodsProps {
    methods: PaymentMethod[];
    onSelect: (methodId: PaymentMethod['id']) => void;
    selectedMethod?: PaymentMethod['id'];
}

export default function PaymentMethods({ methods, selectedMethod, onSelect }: PaymentMethodsProps) {
    return (
        <div className="block-content p-0">
            {methods.map((method) => (
                <div
                    key={method.id}
                    onClick={() => onSelect(method.id)}
                    className={
                        'v2board-select ' +
                        (selectedMethod === method.id && 'active border-primary')
                    }
                >
                    <div style={{ flex: 1, paddingTop: 4 }}>
                        <Radio
                            className="v2board-select-radio"
                            checked={selectedMethod === method.id}
                        />
                        {method.name}
                    </div>
                    {method.icon && (
                        <div style={{ flex: 1, textAlign: 'right' }}>
                            <img height={30} src={method.icon} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
