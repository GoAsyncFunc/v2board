import Index from '../pages/auth/Index';
import Login from '../pages/auth/Login';
import Order from '../pages/commerce/Order';
import Plan from '../pages/commerce/Plan';
import ConfigPayment from '../pages/config/Payment';
import ConfigSystem from '../pages/config/System';
import ConfigTheme from '../pages/config/Theme';
import Knowledge from '../pages/knowledge';
import Notice from '../pages/content/Notice';
import Ticket from '../pages/content/Ticket';
import TicketDetail from '../pages/content/TicketDetail';
import Dashboard from '../pages/dashboard/Dashboard';
import Queue from '../pages/monitoring/Queue';
import Coupon from '../pages/promotion/Coupon';
import Giftcard from '../pages/promotion/Giftcard';
import ServerGroup from '../pages/server/Group';
import ServerManage from '../pages/server/Manage';
import ServerRoute from '../pages/server/Route';
import User from '../pages/user/User';
import type { AdminRouteConfig } from './types';

const adminRoutes: AdminRouteConfig[] = [
    { path: '/config/payment', exact: true, component: ConfigPayment },
    { path: '/config/system', exact: true, component: ConfigSystem },
    { path: '/config/theme', exact: true, component: ConfigTheme },
    { path: '/coupon', exact: true, component: Coupon },
    { path: '/giftcard', exact: true, component: Giftcard },
    { path: '/dashboard', exact: true, component: Dashboard },
    { path: '/', exact: true, component: Index },
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
