import type { ColumnProps } from 'antd/lib/table/interface';
import type { PaymentRecord } from '../../../src/types/paymentContracts';

export function createReadonlyPaymentColumns(): Record<
    'name' | 'payment',
    ColumnProps<PaymentRecord>
> {
    return {
        name: { title: '显示名称', dataIndex: 'name', key: 'name' },
        payment: { title: '支付接口', dataIndex: 'payment', key: 'payment' },
    };
}
