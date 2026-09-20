import { formatMessage } from '../locales/i18n';

const translate = (id: string) => (): string => formatMessage({ id });

export const localeSettings = {
  periodText: {
    month_price: translate('月付'),
    quarter_price: translate('季付'),
    half_year_price: translate('半年付'),
    year_price: translate('年付'),
    two_year_price: translate('两年付'),
    three_year_price: translate('三年付'),
    onetime_price: translate('一次性'),
    reset_price: translate('流量重置包'),
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
    0: translate('待支付'),
    1: translate('开通中'),
    2: translate('已取消'),
    3: translate('已完成'),
    4: translate('已折抵'),
  },
  commissionStatusText: {
    0: translate('待确认'),
    1: translate('发放中'),
    2: translate('已发放'),
    3: translate('无效'),
  },
  i18nText: {
    'zh-CN': '简体中文',
    'zh-TW': '繁體中文',
    'en-US': 'English',
    'ja-JP': '日本語',
    'vi-VN': 'Tiếng Việt',
    'ko-KR': '한국어',
    'fa-IR': 'فارسی',
  },
} as const;

export default localeSettings;
