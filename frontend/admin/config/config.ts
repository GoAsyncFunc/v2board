import { defineConfig } from 'umi';
import { resolve } from 'path';

// Route table inlined verbatim from the recovered bundle's route set
// (formerly src/routes/adminRoutes.ts). Static imports: umi 3 handles
// module resolution; dynamicImport stays off in phase A to mirror the
// previous single-bundle build.
export default defineConfig({
    history: { type: 'hash' },
    targets: { ie: 11 },
    alias: { '@': resolve(__dirname, '../src') },
    // Pages import antd/lib/* directly; the preset's antd-4 babel-import
    // plugin must stay off. antd.css remains a static blade asset.
    antd: false,
    // dva auto-registers src/models/* default exports and ships dva-loading
    // plus connected-router, replacing the hand-rolled runtime.
    dva: {},
    dynamicImport: false,
    hash: false,
    locale: false,
    ignoreMomentLocale: false,
    proxy: {
        '/api': {
            target: process.env.API_PROXY || 'http://127.0.0.1:7003',
            changeOrigin: true,
        },
    },
    publicPath: process.env.PUBLIC_PATH || '/',
    routes: [
        {
            path: '/config/payment',
            exact: true,
            component: '@/pages/config/payment/PaymentConfigPage',
        },
        {
            path: '/config/system',
            exact: true,
            component: '@/pages/config/system/SystemConfigPage',
        },
        { path: '/config/theme', exact: true, component: '@/pages/config/theme/ThemeConfigPage' },
        { path: '/coupon', exact: true, component: '@/pages/coupon/CouponPage' },
        { path: '/giftcard', exact: true, component: '@/pages/giftcard/GiftCardPage' },
        { path: '/dashboard', exact: true, component: '@/pages/dashboard/DashboardPage' },
        { path: '/', exact: true, component: '@/pages/dashboard/AdminHomeRedirect' },
        { path: '/knowledge', exact: true, component: '@/pages/knowledge/KnowledgePage' },
        { path: '/login', exact: true, component: '@/pages/login/LoginPage' },
        { path: '/notice', exact: true, component: '@/pages/notice/NoticePage' },
        { path: '/order', exact: true, component: '@/pages/order/OrderPage' },
        { path: '/plan', exact: true, component: '@/pages/plan/PlanPage' },
        { path: '/queue', exact: true, component: '@/pages/queue/QueuePage' },
        { path: '/server/group', exact: true, component: '@/pages/server/group/ServerGroupPage' },
        {
            path: '/server/manage',
            exact: true,
            component: '@/pages/server/manage/ServerManagePage',
        },
        { path: '/server/route', exact: true, component: '@/pages/server/route/ServerRoutePage' },
        { path: '/ticket/:ticket_id', exact: true, component: '@/pages/ticket/TicketDetailPage' },
        { path: '/ticket', exact: true, component: '@/pages/ticket/TicketPage' },
        { path: '/user', exact: true, component: '@/pages/user/UserPage' },
    ],
});
