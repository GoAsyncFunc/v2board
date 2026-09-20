import Dashboard from '../pages/Dashboard';
import Forgetpassword from '../pages/Forgetpassword';
import Index from '../pages/Index';
import Invite from '../pages/Invite';
import Knowledge from '../pages/Knowledge';
import Login from '../pages/Login';
import Node from '../pages/Node';
import OrderDetail from '../pages/OrderDetail';
import Order from '../pages/Order';
import PlanDetail from '../pages/PlanDetail';
import Plan from '../pages/Plan';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import TicketDetail from '../pages/TicketDetail';
import Ticket from '../pages/Ticket';
import Traffic from '../pages/Traffic';

type RouteComponent =
  | typeof Dashboard
  | typeof Forgetpassword
  | typeof Index
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

export interface AppRoute {
  path: string;
  exact: boolean;
  component: RouteComponent;
}

const routes: AppRoute[] = [
  { path: '/dashboard', exact: true, component: Dashboard },
  { path: '/forgetpassword', exact: true, component: Forgetpassword },
  { path: '/', exact: true, component: Index },
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
