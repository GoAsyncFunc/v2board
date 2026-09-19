import React from 'react';
import * as reactIntl from 'react-intl';

let intlApi;
let localeController;

export function getLocale() {
  const separator = window.g_langSeparator || '-';
  const storedLocale = typeof localStorage !== 'undefined'
    ? window.localStorage.getItem('umi_locale')
    : '';
  const navigatorLocale = typeof navigator !== 'undefined' && typeof navigator.language === 'string'
    ? navigator.language.split('-').join(separator)
    : '';
  return storedLocale || window.g_lang || navigatorLocale;
}

export function setLocale(locale, reload = true) {
  const separator = window.g_langSeparator || '-';
  const localePattern = new RegExp(`^([a-z]{2})${separator}?([A-Z]{2})?$`);
  if (locale !== undefined && !localePattern.test(locale)) {
    throw new Error('setLocale lang format error');
  }
  if (getLocale() === locale) return;

  window.g_lang = locale;
  window.localStorage.setItem('umi_locale', locale || '');
  if (localeController && !reload) localeController.reloadAppLocale();
  if (reload) window.location.reload();
  if (window.dispatchEvent) window.dispatchEvent(new Event('languagechange'));
}

export const LangContext = React.createContext({ lang: getLocale() });

export function _setIntlObject(value) {
  intlApi = value;
}

export function _setLocaleContext(value) {
  localeController = value;
}

function callIntlMethod(methodName, args) {
  if (intlApi && intlApi[methodName]) return intlApi[methodName](...args);
  if (typeof console !== 'undefined' && console.warn) {
    console.warn(`[umi-plugin-locale] ${methodName} not initialized yet, you should use it after react app mounted.`);
  }
  return null;
}

export const formatMessage = (...args) => callIntlMethod('formatMessage', args);
export const formatHTMLMessage = (...args) => callIntlMethod('formatHTMLMessage', args);
export const formatDate = (...args) => callIntlMethod('formatDate', args);
export const formatTime = (...args) => callIntlMethod('formatTime', args);
export const formatRelative = (...args) => callIntlMethod('formatRelative', args);
export const formatNumber = (...args) => callIntlMethod('formatNumber', args);
export const formatPlural = (...args) => callIntlMethod('formatPlural', args);
export const now = (...args) => callIntlMethod('now', args);
export const onError = (...args) => callIntlMethod('onError', args);

export const { addLocaleData, injectIntl, IntlProvider, intlShape } = reactIntl;

const localeApi = {
  ...reactIntl,
  LangContext,
  _setIntlObject,
  _setLocaleContext,
  formatDate,
  formatHTMLMessage,
  formatMessage,
  formatNumber,
  formatPlural,
  formatRelative,
  formatTime,
  getLocale,
  now,
  onError,
  setLocale,
};

export default localeApi;
