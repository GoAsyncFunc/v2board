import React from 'react';

export interface NavigationHeading {
  title: string;
  type: 'heading';
}

export interface NavigationLink {
  title: string;
  type: 'item' | 'href';
  href: string;
  iconClass?: string;
}

export type NavigationDefinition = NavigationHeading | NavigationLink;
export type NavigationItem = NavigationDefinition & { icon?: React.ReactNode };

// Item order controls sidebar order. Routes are registered separately in routes/index.ts.
export const navigationItems: NavigationDefinition[] = [
  { title: '仪表盘', type: 'item', href: '/dashboard', iconClass: 'nav-main-link-icon si si-speedometer' },
  { title: '设置', type: 'heading' },
  { title: '系统配置', type: 'item', href: '/config/system', iconClass: 'nav-main-link-icon si si-equalizer' },
  { title: '支付配置', type: 'item', href: '/config/payment', iconClass: 'nav-main-link-icon si si-credit-card' },
  { title: '主题配置', type: 'item', href: '/config/theme', iconClass: 'nav-main-link-icon si si-magic-wand' },
  { title: '服务器', type: 'heading' },
  { title: '节点管理', type: 'item', href: '/server/manage', iconClass: 'nav-main-link-icon si si-layers' },
  { title: '权限组管理', type: 'item', href: '/server/group', iconClass: 'nav-main-link-icon si si-wrench' },
  { title: '路由管理', type: 'item', href: '/server/route', iconClass: 'nav-main-link-icon si si-shuffle' },
  { title: '财务', type: 'heading' },
  { title: '订阅管理', type: 'item', href: '/plan', iconClass: 'nav-main-link-icon si si-bag' },
  { title: '订单管理', type: 'item', href: '/order', iconClass: 'nav-main-link-icon si si-list' },
  { title: '优惠券管理', type: 'item', href: '/coupon', iconClass: 'nav-main-link-icon si si-present' },
  { title: '礼品卡管理', type: 'item', href: '/giftcard', iconClass: 'nav-main-link-icon si si-star' },
  { title: '用户', type: 'heading' },
  { title: '用户管理', type: 'item', href: '/user', iconClass: 'nav-main-link-icon si si-users' },
  { title: '公告管理', type: 'item', href: '/notice', iconClass: 'nav-main-link-icon si si-speech' },
  { title: '工单管理', type: 'item', href: '/ticket', iconClass: 'nav-main-link-icon si si-support' },
  { title: '知识库管理', type: 'item', href: '/knowledge', iconClass: 'nav-main-link-icon si si-bulb' },
  { title: '指标', type: 'heading' },
  { title: '队列监控', type: 'item', href: '/queue', iconClass: 'nav-main-link-icon si si-bar-chart' },
];

export function createNavigation(): NavigationItem[] {
  return navigationItems.map(item => {
    if (item.type === 'heading' || !item.iconClass) return { ...item };
    return { ...item, icon: <i className={item.iconClass} /> };
  });
}
