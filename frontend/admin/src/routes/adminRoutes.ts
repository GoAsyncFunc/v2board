import AdminHomeRedirect from '../pages/dashboard/AdminHomeRedirect';
import Login from '../pages/login/LoginPage';
import Order from '../pages/order/OrderPage';
import Plan from '../pages/plan/PlanPage';
import ConfigPayment from '../pages/config/payment/PaymentConfigPage';
import ConfigSystem from '../pages/config/system/SystemConfigPage';
import ConfigTheme from '../pages/config/theme/ThemeConfigPage';
import Knowledge from '../pages/knowledge/KnowledgePage';
import Notice from '../pages/notice/NoticePage';
import Ticket from '../pages/ticket/TicketPage';
import TicketDetail from '../pages/ticket/TicketDetailPage';
import Dashboard from '../pages/dashboard/DashboardPage';
import Queue from '../pages/queue/QueuePage';
import Coupon from '../pages/coupon/CouponPage';
import Giftcard from '../pages/giftcard/GiftcardPage';
import ServerGroup from '../pages/server/group/ServerGroupPage';
import ServerManage from '../pages/server/manage/ServerManagePage';
import ServerRoute from '../pages/server/route/ServerRoutePage';
import User from '../pages/user/UserPage';
import type { AdminRouteConfig } from './routeConfig';

const adminRoutes: AdminRouteConfig[] = [
    { path: '/config/payment', exact: true, component: ConfigPayment },
    { path: '/config/system', exact: true, component: ConfigSystem },
    { path: '/config/theme', exact: true, component: ConfigTheme },
    { path: '/coupon', exact: true, component: Coupon },
    { path: '/giftcard', exact: true, component: Giftcard },
    { path: '/dashboard', exact: true, component: Dashboard },
    { path: '/', exact: true, component: AdminHomeRedirect },
    { path: '/knowledge', exact: true, component: Knowledge },
    { path: '/login', exact: true, component: Login },
    { path: '/notice', exact: true, component: Notice },
    { path: '/order', exact: true, component: Order },
    { path: '/plan', exact: true, component: Plan },
    { path: '/queue', exact: true, component: Queue },
    { path: '/server/group', exact: true, component: ServerGroup },
    { path: '/server/manage', exact: true, component: ServerManage },
    { path: '/server/route', exact: true, component: ServerRoute },
    { path: '/ticket/:ticket_id', exact: true, component: TicketDetail },
    { path: '/ticket', exact: true, component: Ticket },
    { path: '/user', exact: true, component: User },
];

export default adminRoutes;
