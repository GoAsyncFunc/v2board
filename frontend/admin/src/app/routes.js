import ConfigPayment from '../pages/ConfigPayment.jsx';
import ConfigSystem from '../pages/ConfigSystem.tsx';
import ConfigTheme from '../pages/ConfigTheme.jsx';
import Coupon from '../pages/Coupon.tsx';
import Giftcard from '../pages/Giftcard.tsx';
import Dashboard from '../pages/Dashboard.jsx';
import Index from '../pages/Index.jsx';
import Knowledge from '../pages/Knowledge.tsx';
import Login from '../pages/Login.jsx';
import Notice from '../pages/Notice.tsx';
import Order from '../pages/Order.jsx';
import Plan from '../pages/Plan.jsx';
import Queue from '../pages/Queue.tsx';
import ServerGroup from '../pages/ServerGroup.tsx';
import ServerManage from '../pages/ServerManage.jsx';
import ServerRoute from '../pages/ServerRoute.jsx';
import TicketDetail from '../pages/TicketDetail.tsx';
import Ticket from '../pages/Ticket.tsx';
import User from '../pages/User.jsx';

// Add or edit routes here. Every component is a source file, not a module ID.
const routes = [
    {
        path: "/config/payment",
        exact: true,
        component: ConfigPayment,
    },
    {
        path: "/config/system",
        exact: true,
        component: ConfigSystem,
    },
    {
        path: "/config/theme",
        exact: true,
        component: ConfigTheme,
    },
    {
        path: "/coupon",
        exact: true,
        component: Coupon,
    },
    {
        path: "/giftcard",
        exact: true,
        component: Giftcard,
    },
    {
        path: "/dashboard",
        exact: true,
        component: Dashboard,
    },
    {
        path: "/",
        exact: true,
        component: Index,
    },
    {
        path: "/knowledge",
        exact: true,
        component: Knowledge,
    },
    {
        path: "/login",
        exact: true,
        component: Login,
    },
    {
        path: "/notice",
        exact: true,
        component: Notice,
    },
    {
        path: "/order",
        exact: true,
        component: Order,
    },
    {
        path: "/plan",
        exact: true,
        component: Plan,
    },
    {
        path: "/queue",
        exact: true,
        component: Queue,
    },
    {
        path: "/server/group",
        exact: true,
        component: ServerGroup,
    },
    {
        path: "/server/manage",
        exact: true,
        component: ServerManage,
    },
    {
        path: "/server/route",
        exact: true,
        component: ServerRoute,
    },
    {
        path: "/ticket/:ticket_id",
        exact: true,
        component: TicketDetail,
    },
    {
        path: "/ticket",
        exact: true,
        component: Ticket,
    },
    {
        path: "/user",
        exact: true,
        component: User,
    },
];

export default routes;
