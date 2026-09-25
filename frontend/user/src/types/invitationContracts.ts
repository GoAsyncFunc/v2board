import type { NumericValue } from './commerceContracts';

export interface InviteCode {
    code: string;
    created_at?: NumericValue;
}

export interface CommissionRecord {
    id?: number;
    created_at?: NumericValue;
    get_amount?: NumericValue;
}

export interface InviteState {
    stat: [
        registeredUsers?: number,
        totalCommission?: number,
        pendingCommission?: number,
        commissionRate?: number,
    ];
    codes: InviteCode[];
    invites: CommissionRecord[];
    detailsLoading: boolean;
    fetchLoading: boolean;
    saveLoading: boolean;
    detailsPagination: { total?: number; current?: number; page_size?: number };
}

export interface InviteConfig {
    currency?: string;
    currency_symbol?: string;
    commission_distribution_enable?: boolean | number;
    commission_distribution_l1?: number;
    commission_distribution_l2?: number;
    commission_distribution_l3?: number;
    withdraw_close?: boolean | number;
}
