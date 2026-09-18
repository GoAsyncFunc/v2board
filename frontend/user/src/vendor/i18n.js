import localeApi from './modules/intlRuntime.js';

export default localeApi;
export const LangContext = localeApi.LangContext;
export const _setIntlObject = (...args) => localeApi._setIntlObject(...args);
export const _setLocaleContext = (...args) => localeApi._setLocaleContext(...args);
export const formatDate = (...args) => localeApi.formatDate(...args);
export const formatHTMLMessage = (...args) => localeApi.formatHTMLMessage(...args);
export const formatMessage = (...args) => localeApi.formatMessage(...args);
export const formatNumber = (...args) => localeApi.formatNumber(...args);
export const formatPlural = (...args) => localeApi.formatPlural(...args);
export const formatRelative = (...args) => localeApi.formatRelative(...args);
export const formatTime = (...args) => localeApi.formatTime(...args);
export const getLocale = (...args) => localeApi.getLocale(...args);
export const now = (...args) => localeApi.now(...args);
export const onError = (...args) => localeApi.onError(...args);
export const setLocale = (...args) => localeApi.setLocale(...args);
