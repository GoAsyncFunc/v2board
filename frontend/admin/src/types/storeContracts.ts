import type { AdminConfigState } from './systemConfigurationContracts';
import type { KnowledgeState } from './knowledgeContracts';
import type { DashboardStats, SystemMonitoringState } from './monitoringContracts';
import type { NoticeState } from './noticeContracts';
import type { OrderState } from './orderContracts';
import type { PaymentState } from './paymentContracts';
import type { PlanState } from './planContracts';
import type { CouponState, GiftCardState } from './promotionContracts';
import type { RouterState } from './routerContracts';
import type {
    ServerGroupState,
    ServerManageState,
    ServerProtocolState,
    ServerRouteState,
} from './serverContracts';
import type {
    AdministratorAuthenticationState,
    LayoutState,
    PassportState,
} from './authenticationContracts';
import type { ThemeState } from './themeContracts';
import type { TicketState } from './ticketContracts';
import type { UserModuleState } from './userContracts';

export interface AdminAction {
    type: string;
}

export type AdminDispatch = <Action extends AdminAction>(action: Action) => void;
export interface AdminRootState {
    auth: AdministratorAuthenticationState;
    config: AdminConfigState;
    coupon: CouponState;
    giftcard: GiftCardState;
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
