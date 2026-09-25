import type { PropertyLabelMap } from '../types/propertyLookups';

export interface AdminSettings {
    i18nText: PropertyLabelMap;
    periodText: PropertyLabelMap;
    tutorialCategoryText: PropertyLabelMap;
    tutorialCategoryIcon: PropertyLabelMap;
    orderStatusText: PropertyLabelMap;
    commissionStatusText: PropertyLabelMap;
    ticketStatusText: PropertyLabelMap;
    routeActionText: PropertyLabelMap;
}

export const settings: AdminSettings = {
    i18nText: {
        'zh-CN': '简体中文',
        'zh-TW': '繁體中文',
        'en-US': 'English',
        'ja-JP': '日本語',
        'vi-VN': 'Tiếng Việt',
        'ko-KR': '한국어',
    },
    periodText: {
        month_price: '月付',
        quarter_price: '季付',
        half_year_price: '半年付',
        year_price: '年付',
        two_year_price: '两年付',
        three_year_price: '三年付',
        onetime_price: '一次性',
        reset_price: '流量重置包',
    },
    tutorialCategoryText: {
        1: 'Windows',
        2: 'macOS',
        3: 'iOS',
        4: 'Android',
        5: 'Linux',
        6: '路由器',
    },
    tutorialCategoryIcon: {
        1: 'fab fa-2x fa-windows',
        2: 'fab fa-2x fa-apple',
        3: 'fab fa-2x fa-apple',
        4: 'fab fa-2x fa-android',
        5: 'fab fa-2x fa-linux',
        6: 'fa fa-2x fa-wifi',
    },
    orderStatusText: {
        0: '待支付',
        1: '开通中',
        2: '已取消',
        3: '已完成',
        4: '已折抵',
    },
    commissionStatusText: {
        0: '待确认',
        1: '发放中',
        2: '已发放',
        3: '已驳回',
    },
    ticketStatusText: {
        0: '开启',
        1: '待回复',
        2: '待答复',
        3: '关闭',
    },
    routeActionText: {
        block: '禁止访问(域名目标)',
        block_ip: '禁止访问(IP目标)',
        block_port: '禁止访问(端口目标)',
        protocol: '禁止访问(协议)',
        dns: '指定DNS服务器进行解析',
        route: '指定出站服务器(域名目标)',
        route_ip: '指定出站服务器(IP目标)',
        default_out: '自定义默认出站',
    },
};

export default settings;
