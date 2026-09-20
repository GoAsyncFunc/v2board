import ConfigPayment from '../pages/ConfigPayment';
import ConfigSystem from '../pages/ConfigSystem';
import ConfigTheme from '../pages/ConfigTheme';
import Coupon from '../pages/Coupon';
import Dashboard from '../pages/Dashboard';
import Giftcard from '../pages/Giftcard';
import Index from '../pages/Index';
import Knowledge from '../pages/Knowledge';
import Login from '../pages/Login';
import Notice from '../pages/Notice';
import Order from '../pages/Order';
import Plan from '../pages/Plan';
import Queue from '../pages/Queue';
import ServerGroup from '../pages/ServerGroup';
import ServerManage from '../pages/ServerManage';
import ServerRoute from '../pages/ServerRoute';
import Ticket from '../pages/Ticket';
import TicketDetail from '../pages/TicketDetail';
import User from '../pages/User';
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
