import React from 'react';
import { formatMessage } from '../locales/i18n';

export interface NavigationHeading {
  title: string;
  type: 'heading';
}

export interface NavigationLink {
  title: string;
  type: 'item';
  href: string;
  iconClass: string;
}

export type NavigationDefinition = NavigationHeading | NavigationLink;
export type NavigationItem =
  | { title: React.ReactNode; type: 'heading'; icon?: React.ReactNode }
  | { title: React.ReactNode; type: 'item'; href: string; icon?: React.ReactNode };

// Item order controls sidebar order. Routes are registered separately in app/routes.ts.
export const navigationItems: NavigationDefinition[] = [
  { title: '仪表盘', type: 'item', href: '/dashboard', iconClass: 'nav-main-link-icon si si-speedometer' },
  { title: '使用文档', type: 'item', href: '/knowledge', iconClass: 'nav-main-link-icon si si-book-open' },
  { title: '订阅', type: 'heading' },
  { title: '购买订阅', type: 'item', href: '/plan', iconClass: 'nav-main-link-icon si si-bag' },
  { title: '节点状态', type: 'item', href: '/node', iconClass: 'nav-main-link-icon si si-check' },
  { title: '财务', type: 'heading' },
  { title: '我的订单', type: 'item', href: '/order', iconClass: 'nav-main-link-icon si si-list' },
  { title: '我的邀请', type: 'item', href: '/invite', iconClass: 'nav-main-link-icon si si-users' },
  { title: '用户', type: 'heading' },
  { title: '个人中心', type: 'item', href: '/profile', iconClass: 'nav-main-link-icon si si-user' },
  { title: '我的工单', type: 'item', href: '/ticket', iconClass: 'nav-main-link-icon si si-support' },
  { title: '流量明细', type: 'item', href: '/traffic', iconClass: 'nav-main-link-icon si si-bar-chart' },
];

export function createNavigation(): NavigationItem[] {
  return navigationItems.map(item => {
    const title = formatMessage({ id: item.title });
    if (item.type === 'heading') return { ...item, title };
    return { ...item, title, icon: <i className={item.iconClass} /> };
  });
}
