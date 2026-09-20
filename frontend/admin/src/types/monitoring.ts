import type { DisplayScalar } from '../components/MoneyDisplay';
import type { QueueWorkload } from '../components/QueueDisplayColumns';

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
