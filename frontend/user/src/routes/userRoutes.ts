import Invite from '@/pages/account/Invite';
import Profile from '@/pages/account/Profile';
import Traffic from '@/pages/account/Traffic';
import ForgetPassword from '@/pages/auth/ForgetPassword';
import HomePage from '@/pages/auth/HomePage';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import Order from '@/pages/commerce/Order';
import OrderDetail from '@/pages/commerce/OrderDetail';
import Dashboard from '@/pages/dashboard/Dashboard';
import Node from '@/pages/subscription/Node';
import Plan from '@/pages/subscription/Plan';
import PlanDetail from '@/pages/subscription/PlanDetail';
import Knowledge from '@/pages/support/Knowledge';
import Ticket from '@/pages/support/Ticket';
import TicketDetail from '@/pages/support/TicketDetail';

type UserRouteComponent =
    | typeof Dashboard
    | typeof ForgetPassword
    | typeof HomePage
    | typeof Invite
    | typeof Knowledge
    | typeof Login
    | typeof Node
    | typeof OrderDetail
    | typeof Order
    | typeof PlanDetail
    | typeof Plan
    | typeof Profile
    | typeof Register
    | typeof TicketDetail
    | typeof Ticket
    | typeof Traffic;

export interface UserRoute {
    path: string;
    exact: boolean;
    component: UserRouteComponent;
}

const routes: UserRoute[] = [
    { path: '/dashboard', exact: true, component: Dashboard },
    { path: '/forgetpassword', exact: true, component: ForgetPassword },
    { path: '/', exact: true, component: HomePage },
    { path: '/invite', exact: true, component: Invite },
    { path: '/knowledge', exact: true, component: Knowledge },
    { path: '/login', exact: true, component: Login },
    { path: '/node', exact: true, component: Node },
    { path: '/order/:trade_no', exact: true, component: OrderDetail },
    { path: '/order', exact: true, component: Order },
    { path: '/plan/:plan_id', exact: true, component: PlanDetail },
    { path: '/plan', exact: true, component: Plan },
    { path: '/profile', exact: true, component: Profile },
    { path: '/register', exact: true, component: Register },
    { path: '/ticket/:ticket_id', exact: true, component: TicketDetail },
    { path: '/ticket', exact: true, component: Ticket },
    { path: '/traffic', exact: true, component: Traffic },
];

export default routes;
