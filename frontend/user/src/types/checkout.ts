import type { PlanData } from './commerce';

export interface CheckoutPlan extends PlanData {
    id: number;
    content: string;
    renew?: number;
    transfer_enable?: number;
}

export interface CheckoutOrder {
    plan: CheckoutPlan;
    period: string;
    status: number;
    trade_no: string;
    created_at?: number;
    total_amount: number;
    discount_amount?: number;
    surplus_amount?: number;
    refund_amount?: number;
    balance_amount?: number;
    pre_handling_amount?: number;
    bounus?: number;
    get_amount?: number;
}
