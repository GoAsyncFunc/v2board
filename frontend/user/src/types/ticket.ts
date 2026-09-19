import type { TicketRecord } from './commerce';

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
