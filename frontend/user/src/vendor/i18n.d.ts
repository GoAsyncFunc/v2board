import type React from 'react';

export interface IntlApi {
  formatMessage(descriptor: { id: string }, values?: Record<string, unknown>): string;
  [key: string]: unknown;
}

export interface LocaleController {
  reloadAppLocale: () => void;
}

export interface LanguageContextValue {
  locale?: string;
  lang?: string;
  reloadAppLocale?: () => void;
}

export const LangContext: React.Context<LanguageContextValue>;
export const IntlProvider: React.ComponentType<{ locale: string; messages: Record<string, string>; children?: React.ReactNode }>;
export function injectIntl<T>(component: React.ComponentType<T>): React.ComponentType<Omit<T, 'intl'>>;
export function addLocaleData(data: unknown): void;
export function setIntlApi(value: IntlApi): void;
export function setLocaleController(value: LocaleController | LanguageContextValue): void;
export function setLocale(locale: string, reload?: boolean): void;
export function formatMessage(descriptor: { id: string }, values?: Record<string, unknown>): string;
