import type { TicketRecord } from '../components/TicketDisplayColumns';

export interface TicketPagination {
  pageSize: number;
  current: number;
  total?: number;
  [field: string]: string | number | boolean | undefined;
}

export interface TicketFilterState {
  status?: number;
  email?: string;
  reply_status?: string[];
  [field: string]: string | number | string[] | undefined;
}

export interface TicketState {
  tickets: TicketRecord[];
  fetchLoading: boolean;
  ticket: TicketRecord;
  pagination: TicketPagination;
  filter: TicketFilterState;
  replyLoading: boolean;
}
