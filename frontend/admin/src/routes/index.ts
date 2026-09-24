import AdminHomeRedirect from '../pages/AdminHomeRedirect';
import Login from '../pages/login';
import Order from '../pages/order';
import Plan from '../pages/plan';
import ConfigPayment from '../pages/config/payment';
import ConfigSystem from '../pages/config/system';
import ConfigTheme from '../pages/config/theme';
import Knowledge from '../pages/knowledge';
import Notice from '../pages/notice';
import Ticket from '../pages/ticket';
import TicketDetail from '../pages/ticket/[id]';
import Dashboard from '../pages/dashboard';
import Queue from '../pages/queue';
import Coupon from '../pages/coupon';
import Giftcard from '../pages/giftcard';
import ServerGroup from '../pages/server/group';
import ServerManage from '../pages/server/manage';
import ServerRoute from '../pages/server/route';
import User from '../pages/user';
import type { AdminRouteConfig } from './types';

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
