import type React from 'react';
import type { FilterItem } from './filterContracts';

export interface OrderDetailRecord {
    trade_no: React.ReactNode;
    period: PropertyKey;
    status: number;
    plan_id: string | number;
    callback_no?: React.ReactNode;
    total_amount: number;
    balance_amount: number;
    discount_amount: number;
    refund_amount: number;
    surplus_amount: number;
    created_at: number;
    updated_at: number;
    invite_user_id?: string | number;
    commission_balance: number;
    actual_commission_balance?: number;
    commission_status: number;
    user_id?: string | number;
}

export interface OrderDetailUser {
    email: string;
}

export interface OrderDetailPlan {
    id: string | number;
    name?: React.ReactNode;
}

export interface OrderRecord extends OrderDetailRecord {
    id: number | string;
    type: PropertyKey;
    plan_name?: React.ReactNode;
}

export interface OrderPagination {
    pageSize: number;
    current: number;
    total?: number;
}

export interface OrderState {
    orders: OrderRecord[];
    fetchLoading: boolean;
    assignLoading: boolean;
    pagination: OrderPagination;
    filter: FilterItem[];
}

export interface AssignOrderParams {
    total_amount: number;
    [key: string]: string | number | boolean | null | undefined;
}
