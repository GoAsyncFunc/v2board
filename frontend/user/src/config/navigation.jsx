import React from 'react';
import { formatMessage } from '../vendor/i18n.js';

// Item order controls sidebar order. Routes are registered separately in app/routes.js.
export const navigationItems = [
  {
    "title": "仪表盘",
    "type": "item",
    "href": "/dashboard",
    "iconClass": "nav-main-link-icon si si-speedometer"
  },
  {
    "title": "使用文档",
    "type": "item",
    "href": "/knowledge",
    "iconClass": "nav-main-link-icon si si-book-open"
  },
  {
    "title": "订阅",
    "type": "heading"
  },
  {
    "title": "购买订阅",
    "type": "item",
    "href": "/plan",
    "iconClass": "nav-main-link-icon si si-bag"
  },
  {
    "title": "节点状态",
    "type": "item",
    "href": "/node",
    "iconClass": "nav-main-link-icon si si-check"
  },
  {
    "title": "财务",
    "type": "heading"
  },
  {
    "title": "我的订单",
    "type": "item",
    "href": "/order",
    "iconClass": "nav-main-link-icon si si-list"
  },
  {
    "title": "我的邀请",
    "type": "item",
    "href": "/invite",
    "iconClass": "nav-main-link-icon si si-users"
  },
  {
    "title": "用户",
    "type": "heading"
  },
  {
    "title": "个人中心",
    "type": "item",
    "href": "/profile",
    "iconClass": "nav-main-link-icon si si-user"
  },
  {
    "title": "我的工单",
    "type": "item",
    "href": "/ticket",
    "iconClass": "nav-main-link-icon si si-support"
  },
  {
    "title": "流量明细",
    "type": "item",
    "href": "/traffic",
    "iconClass": "nav-main-link-icon si si-bar-chart"
  }
];

export function createNavigation() {
  return navigationItems.map(({ iconClass, ...item }) => ({
    ...item,
    title: formatMessage({ id: item.title }),
    ...(iconClass ? { icon: <i className={iconClass}></i> } : {}),
  }));
}
