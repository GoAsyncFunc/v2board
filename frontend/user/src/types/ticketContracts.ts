import type { TicketRecord } from './commerceContracts';

export interface TicketDraft {
    subject?: string;
    level?: number;
    message?: string;
}

export interface TicketMessage {
    id?: number;
    created_at: number;
    is_me: boolean | number;
    message: string;
}

export interface TicketConversation {
    subject?: string;
    message: TicketMessage[];
}

export interface TicketState {
    tickets: TicketRecord[];
    ticket: TicketConversation;
    fetchLoading: boolean;
    saveLoading: boolean;
    replyLoading: boolean;
    newTicketModalVisible: boolean;
    saveData: TicketDraft;
    replyData: { message?: string };
}

export type TicketId = number | string;

export interface TicketReplyAction {
    id: TicketId;
    start?: () => void;
    finish?: () => void;
    succeed?: () => void;
    complete: () => void;
}

export interface TicketWithdrawAction {
    withdrawAccount?: string;
    withdrawMethod?: string;
    callback?: () => void;
}
