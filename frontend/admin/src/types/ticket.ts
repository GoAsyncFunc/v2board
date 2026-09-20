export type TicketId = string | number;
export type TicketTimestamp = number | string | null | undefined;
export type TicketLevel = string | number | null | undefined;

export interface TicketMessage {
    id?: TicketId;
    is_me?: boolean | number;
    created_at: TicketTimestamp;
    message?: string | number | null;
}

export interface TicketRecord {
    id?: TicketId;
    subject?: string;
    level?: TicketLevel;
    status?: boolean | number;
    reply_status?: boolean | number;
    created_at?: TicketTimestamp;
    updated_at?: TicketTimestamp;
    user_id?: TicketId;
    message?: TicketMessage[];
}

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
