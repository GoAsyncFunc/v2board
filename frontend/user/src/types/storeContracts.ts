import type { PassportState } from './auth';
import type { CommunicationState, GuestState, PlanState } from './userDomainContracts';
import type { CouponState, LayoutState, TutorialState } from './contentState';
import type { InviteState } from './invite';
import type { KnowledgeState } from './knowledgeContracts';
import type { OrderModelState } from './paymentContracts';
import type { NoticeState, ServerState, TelegramState, TrafficState } from './queryState';
import type { TicketState } from './ticketContracts';
import type { UserState } from './userContracts';
import type { RouterState } from './routerContracts';

export interface UserAction {
    type: string;
}

export type UserDispatch = <Action extends UserAction>(action: Action) => void;
export interface UserRootState {
    comm: CommunicationState;
    coupon: CouponState;
    guest: GuestState;
    invite: InviteState;
    knowledge: KnowledgeState;
    layout: LayoutState;
    notice: NoticeState;
    order: OrderModelState;
    passport: PassportState;
    plan: PlanState;
    router?: RouterState;
    server: ServerState;
    stat: TrafficState;
    telegram: TelegramState;
    ticket: TicketState;
    tutorial: TutorialState;
    user: UserState;
}

export interface UserStore {
    dispatch: UserDispatch;
    getState(): UserRootState;
}
