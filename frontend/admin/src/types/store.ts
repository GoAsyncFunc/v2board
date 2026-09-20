import type { AdminConfigState } from './config';
import type { KnowledgeState } from './knowledge';
import type { DashboardStats, SystemMonitoringState } from './monitoring';
import type { NoticeState } from './notice';
import type { OrderState } from './order';
import type { PaymentState } from './payment';
import type { PlanState } from './plan';
import type { CouponState, GiftcardState } from './promotion';
import type { RouterState } from './router';
import type {
    ServerGroupState,
    ServerManageState,
    ServerProtocolState,
    ServerRouteState,
} from './server';
import type { AuthState, LayoutState, PassportState } from './session';
import type { ThemeState } from './theme';
import type { TicketState } from './ticket';
import type { UserModuleState } from './user';

export type AdminValue = object | string | number | boolean | symbol | bigint | null | undefined;

export interface AdminAction {
    type: string;
    params?: object;
    callback?: () => void;
    [key: string]: AdminValue;
}

export type AdminDispatchResult = AdminAction | Promise<AdminAction>;
export type AdminDispatch = (action: AdminAction) => AdminDispatchResult;
export interface AdminRootState {
    auth: AuthState;
    config: AdminConfigState;
    coupon: CouponState;
    giftcard: GiftcardState;
    knowledge: KnowledgeState;
    layout: LayoutState;
    notice: NoticeState;
    order: OrderState;
    passport: PassportState;
    payment: PaymentState;
    plan: PlanState;
    serverAnyTLS: ServerProtocolState;
    serverGroup: ServerGroupState;
    serverHysteria: ServerProtocolState;
    serverManage: ServerManageState;
    serverRoute: ServerRouteState;
    serverShadowsocks: ServerProtocolState;
    serverTrojan: ServerProtocolState;
    serverTuic: ServerProtocolState;
    serverV2node: ServerProtocolState;
    serverVless: ServerProtocolState;
    serverVmess: ServerProtocolState;
    stat: DashboardStats;
    system: SystemMonitoringState;
    theme: ThemeState;
    ticket: TicketState;
    user: UserModuleState;
    router?: RouterState;
}

export interface AdminStore {
    dispatch: AdminDispatch;
    getState(): AdminRootState;
}
