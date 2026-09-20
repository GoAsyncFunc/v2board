import React from 'react';
import * as reactIntl from 'react-intl';

export interface MessageDescriptor {
    id: string;
}

export type MessageValues = Record<string, string | number | boolean | Date | null | undefined>;

export interface IntlApi {
    formatMessage(descriptor: MessageDescriptor, values?: MessageValues): string;
    formatHTMLMessage(descriptor: MessageDescriptor, values?: MessageValues): string;
    formatDate(
        value: string | number | Date,
        options?: Record<string, string | number | boolean>,
    ): string;
    formatTime(
        value: string | number | Date,
        options?: Record<string, string | number | boolean>,
    ): string;
    formatRelative(value: number, options?: Record<string, string | number | boolean>): string;
    formatNumber(value: number, options?: Record<string, string | number | boolean>): string;
    formatPlural(value: number, options?: Record<string, string | number | boolean>): string;
    now(): number;
    onError(error: Error): void;
}

export interface LocaleController {
    reloadAppLocale: () => void;
}

export interface LanguageContextValue {
    locale?: string;
    lang?: string;
    reloadAppLocale?: () => void;
}

let intlApi: IntlApi | undefined;
let localeController: LocaleController | LanguageContextValue | undefined;

export function getLocale(): string {
    const separator = window.g_langSeparator || '-';
    const storedLocale =
        typeof localStorage !== 'undefined' ? window.localStorage.getItem('umi_locale') : '';
    const navigatorLocale =
        typeof navigator !== 'undefined' && typeof navigator.language === 'string'
            ? navigator.language.split('-').join(separator)
            : '';
    return storedLocale || window.g_lang || navigatorLocale;
}

export function setLocale(locale?: string, reload = true): void {
    const separator = window.g_langSeparator || '-';
    const localePattern = new RegExp(`^([a-z]{2})${separator}?([A-Z]{2})?$`);
    if (locale !== undefined && !localePattern.test(locale)) {
        throw new Error('setLocale lang format error');
    }
    if (getLocale() === locale) return;

    window.g_lang = locale;
    window.localStorage.setItem('umi_locale', locale || '');
    if (localeController?.reloadAppLocale && !reload) localeController.reloadAppLocale();
    if (reload) window.location.reload();
    if (window.dispatchEvent) window.dispatchEvent(new Event('languagechange'));
}

export const LangContext = React.createContext<LanguageContextValue>({ lang: getLocale() });

export function setIntlApi(value: IntlApi): void {
    intlApi = value;
}

export function setLocaleController(value: LocaleController | LanguageContextValue): void {
    localeController = value;
}

function warnUninitialized(methodName: keyof IntlApi): void {
    if (typeof console !== 'undefined' && console.warn) {
        console.warn(
            `[umi-plugin-locale] ${methodName} not initialized yet, you should use it after react app mounted.`,
        );
    }
}

function unavailableResult<Result>(methodName: keyof IntlApi): Result {
    warnUninitialized(methodName);
    // The recovered runtime historically returned null before IntlProvider mounted.
    return null as Result;
}

export function formatMessage(descriptor: MessageDescriptor, values?: MessageValues): string {
    return intlApi
        ? intlApi.formatMessage(descriptor, values)
        : unavailableResult<string>('formatMessage');
}

export function formatHTMLMessage(descriptor: MessageDescriptor, values?: MessageValues): string {
    return intlApi
        ? intlApi.formatHTMLMessage(descriptor, values)
        : unavailableResult<string>('formatHTMLMessage');
}

export function formatDate(
    value: string | number | Date,
    options?: Record<string, string | number | boolean>,
): string {
    return intlApi ? intlApi.formatDate(value, options) : unavailableResult<string>('formatDate');
}

export function formatTime(
    value: string | number | Date,
    options?: Record<string, string | number | boolean>,
): string {
    return intlApi ? intlApi.formatTime(value, options) : unavailableResult<string>('formatTime');
}

export function formatRelative(
    value: number,
    options?: Record<string, string | number | boolean>,
): string {
    return intlApi
        ? intlApi.formatRelative(value, options)
        : unavailableResult<string>('formatRelative');
}

export function formatNumber(
    value: number,
    options?: Record<string, string | number | boolean>,
): string {
    return intlApi
        ? intlApi.formatNumber(value, options)
        : unavailableResult<string>('formatNumber');
}

export function formatPlural(
    value: number,
    options?: Record<string, string | number | boolean>,
): string {
    return intlApi
        ? intlApi.formatPlural(value, options)
        : unavailableResult<string>('formatPlural');
}

export function now(): number {
    return intlApi ? intlApi.now() : unavailableResult<number>('now');
}

export function onError(error: Error): void {
    if (intlApi) intlApi.onError(error);
    else warnUninitialized('onError');
}

export const addLocaleData = reactIntl.addLocaleData;
export const IntlProvider = reactIntl.IntlProvider;
export const intlShape = reactIntl.intlShape;
export const injectIntl = reactIntl.injectIntl as <Props extends { intl: IntlApi }>(
    component: React.ComponentType<Props>,
) => React.ComponentType<Omit<Props, 'intl'>>;

const localeApi = {
    ...reactIntl,
    LangContext,
    setIntlApi,
    setLocaleController,
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
