import type { AdminConfigState } from './configurationValues';
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
} from './serverContracts';
import type { AdministratorAuthenticationState, LayoutState, PassportState } from './session';
import type { ThemeState } from './theme';
import type { TicketState } from './ticket';
import type { UserModuleState } from './userContracts';

export interface AdminAction {
    type: string;
}

export type AdminDispatch = <Action extends AdminAction>(action: Action) => void;
export interface AdminRootState {
    auth: AdministratorAuthenticationState;
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
