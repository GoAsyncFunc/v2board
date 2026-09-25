export type DisplayScalar = string | number | boolean | null | undefined;
export type QueueName = string | number | symbol | null | undefined;
export interface CoercibleQueueWait {
    [Symbol.toPrimitive]?(hint: 'default' | 'number' | 'string'): string | number;
    toString(): string;
    valueOf(): CoercibleQueueWait | string | number;
}
export type QueueWait = string | number | CoercibleQueueWait | null | undefined;
export type QueueMetric = string | number | null | undefined;

export interface QueueWorkload {
    name: QueueName;
    processes?: QueueMetric;
    length?: QueueMetric;
    wait?: QueueWait;
}

export interface OrderChartRecord {
    type: string;
    date: string;
    value: number;
}

export interface RankChartRecord {
    total: number;
    server_name?: string;
    email?: string;
}

export interface DashboardStats {
    online_user?: DisplayScalar;
    day_income?: DisplayScalar;
    day_register_total?: DisplayScalar;
    month_income?: DisplayScalar;
    last_month_income?: DisplayScalar;
    commission_last_month_payout?: DisplayScalar;
    month_register_total?: DisplayScalar;
    ticket_pending_total?: DisplayScalar;
    commission_pending_total?: DisplayScalar;
}

export type DashboardIncomeKey =
    'month_income' | 'last_month_income' | 'commission_last_month_payout';

export interface QueueStats {
    jobsPerMinute?: number;
    recentJobs?: number;
    failedJobs?: number;
    status?: boolean;
}

export interface SystemMonitoringState {
    queueStats?: QueueStats | null;
    queueWorkload?: QueueWorkload[] | null;
    getQueueStatsLoading?: boolean;
    getQueueWorkloadLoading?: boolean;
}
