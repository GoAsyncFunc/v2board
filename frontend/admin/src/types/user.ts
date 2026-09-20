import type { FilterItem } from './filter';

export interface UserRecord {
    id: string | number;
    email: string;
    subscribe_url?: string;
    plan_id?: string | number | null;
    plan_name?: string | null;
    group_id?: string | number | null;
    banned?: number | boolean;
    transfer_enable?: string | number | null;
    total_used?: string | number;
    u?: string | number;
    d?: string | number;
    alive_ip?: number | null;
    device_limit?: number | string | null;
    ips?: string | null;
    expired_at?: string | number | null;
    balance?: string | number;
    commission_balance?: string | number;
    commission_type?: string | number;
    commission_rate?: string | number | null;
    discount?: string | number | null;
    speed_limit?: string | number | null;
    created_at?: number;
    updated_at?: number;
    t?: number | string | null;
    password?: string;
    invite_user_email?: string;
    invite_user?: object;
    is_admin?: number | boolean;
    is_staff?: number | boolean;
    remarks?: string;
}

export interface UserPlanOption {
    id: string | number;
    name: string;
}
export interface UserGroupOption {
    id: string | number;
    name?: string;
}

export interface UserPagination {
    pageSize?: number;
    current?: number;
    total?: number;
    [field: string]: string | number | boolean | undefined;
}

export interface UserSort {
    sort?: string | number;
    sort_type?: 'ASC' | 'DESC';
    [field: string]: string | number | undefined;
}

export interface UserModuleState {
    userInfo: Partial<UserRecord>;
    getUserInfoLoading: boolean;
    users: UserRecord[];
    user: Partial<UserRecord>;
    fetchLoading: boolean;
    updateLoading?: boolean;
    generateLoading?: boolean;
    sendMailLoading?: boolean;
    pagination: UserPagination;
    filter: FilterItem[];
    sort?: UserSort;
}
