import { formatMessage } from './i18n.js';

const translate = id => () => formatMessage({ id });

export const localeSettings = {
  periodText: {
    month_price: translate('\u6708\u4ed8'),
    quarter_price: translate('\u5b63\u4ed8'),
    half_year_price: translate('\u534a\u5e74\u4ed8'),
    year_price: translate('\u5e74\u4ed8'),
    two_year_price: translate('\u4e24\u5e74\u4ed8'),
    three_year_price: translate('\u4e09\u5e74\u4ed8'),
    onetime_price: translate('\u4e00\u6b21\u6027'),
    reset_price: translate('\u6d41\u91cf\u91cd\u7f6e\u5305'),
  },
  tutorialCategoryText: {
    1: 'Windows',
    2: 'macOS',
    3: 'iOS',
    4: 'Android',
    5: 'Linux',
    6: '\u8def\u7531\u5668',
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
    0: translate('\u5f85\u652f\u4ed8'),
    1: translate('\u5f00\u901a\u4e2d'),
    2: translate('\u5df2\u53d6\u6d88'),
    3: translate('\u5df2\u5b8c\u6210'),
    4: translate('\u5df2\u6298\u62b5'),
  },
  commissionStatusText: {
    0: translate('\u5f85\u786e\u8ba4'),
    1: translate('\u53d1\u653e\u4e2d'),
    2: translate('\u5df2\u53d1\u653e'),
    3: translate('\u65e0\u6548'),
  },
  i18nText: {
    'zh-CN': '\u7b80\u4f53\u4e2d\u6587',
    'zh-TW': '\u7e41\u9ad4\u4e2d\u6587',
    'en-US': 'English',
    'ja-JP': '\u65e5\u672c\u8a9e',
    'vi-VN': 'Ti\u1ebfng Vi\u1ec7t',
    'ko-KR': '\ud55c\uad6d\uc5b4',
    'fa-IR': '\u0641\u0627\u0631\u0633\u06cc',
  },
};

export default localeSettings;
