import React from 'react';
import type { Action, Location, UnregisterCallback } from 'history';
import ConfigProvider from 'antd/lib/config-provider';
import type { Locale as AntdLocale } from 'antd/lib/locale-provider';
import { routeRenderer, mergeConfig } from '../vendor/appRuntime.js';
import { routerBindings } from '../vendor/dva.js';
import {
  enAntd, enData, enMessages, faAntd, faData, faMessages,
  jaAntd, jaData, jaMessages, koAntd, koData, koMessages,
  twAntd, viAntd, viData, viMessages, zhAntd, zhData, zhMessages,
} from '../locales/catalog';
import {
  setIntlApi, setLocaleController, addLocaleData, injectIntl,
  IntlProvider, LangContext,
} from '../locales/i18n';
import type { IntlApi, LanguageContextValue } from '../locales/i18n';
import * as plugins from '../vendor/appRuntime.js';
import history from './history';
import appRoutes from './routes';
import type { UserStore } from '../types/store';
import type { PluginValue } from '../runtime/pluginRuntime';

const { ConnectedRouter } = routerBindings;

interface AppLocale {
  messages: Record<string, string>;
  locale: string;
  antd: AntdLocale;
  data?: unknown;
  momentLocale: string;
}

type SupportedLocale = 'en-US' | 'fa-IR' | 'ja-JP' | 'ko-KR' | 'vi-VN' | 'zh-CN' | 'zh-TW';
const localeData: Record<SupportedLocale, AppLocale> = {
  'en-US': { messages: enMessages, locale: 'en-US', antd: enAntd, data: enData, momentLocale: '' },
  'fa-IR': { messages: faMessages, locale: 'fa-IR', antd: faAntd, data: faData, momentLocale: 'fa' },
  'ja-JP': { messages: jaMessages, locale: 'ja-JP', antd: jaAntd, data: jaData, momentLocale: 'ja' },
  'ko-KR': { messages: koMessages, locale: 'ko-KR', antd: koAntd, data: koData, momentLocale: 'ko' },
  'vi-VN': { messages: viMessages, locale: 'vi-VN', antd: viAntd, data: viData, momentLocale: 'vi' },
  'zh-CN': { messages: zhMessages, locale: 'zh-CN', antd: zhAntd, data: zhData, momentLocale: 'zh-cn' },
  'zh-TW': { messages: zhMessages, locale: 'zh-TW', antd: twAntd, data: zhData, momentLocale: 'zh-tw' },
};

interface IntlApiBridgeProps { intl: IntlApi; children?: React.ReactNode; }
interface LocaleChildrenProps { children?: React.ReactNode; }
interface LocaleProviderState { locale: string; }
interface RouterProps { store?: UserStore; [key: string]: PluginValue; }

export const routes = appRoutes;
window.g_routes = routes;

export class IntlApiBridge extends React.Component<IntlApiBridgeProps> {
  render(): React.ReactNode {
    setIntlApi(this.props.intl);
    return this.props.children;
  }
}

const ConnectedIntlApiBridge = injectIntl(IntlApiBridge);

export class LocaleBridge extends React.Component<LocaleChildrenProps> {
  render(): React.ReactNode {
    return (
      <LangContext.Consumer>
        {(context: LanguageContextValue) => {
          setLocaleController(context);
          return this.props.children;
        }}
      </LangContext.Consumer>
    );
  }
}

export class LocaleProvider extends React.Component<LocaleChildrenProps, LocaleProviderState> {
  state: LocaleProviderState = { locale: 'zh-CN' };
  reloadAppLocale = (): void => this.setState({ locale: this.getAppLocale().locale });

  getAppLocale(): AppLocale {
    const fallback: AppLocale = { locale: 'zh-CN', messages: {}, data: zhData, antd: zhAntd, momentLocale: 'zh-cn' };
    const config = (mergeConfig('locale') || {}) as {
      default?: string | (() => string);
      messages?: Record<string, Record<string, string>> | (() => Record<string, Record<string, string>>);
    };
    const configuredLocale = typeof config.default === 'function' ? config.default() : config.default;
    const storedLocale = typeof localStorage !== 'undefined' ? localStorage.getItem('umi_locale') : null;
    const selected = (storedLocale && localeData[storedLocale as SupportedLocale])
      || (configuredLocale && localeData[configuredLocale as SupportedLocale])
      || localeData['zh-CN']
      || fallback;
    window.g_lang = selected.locale;
    window.g_langSeparator = '-';
    if (selected.data) addLocaleData(selected.data);
    const configuredMessages = typeof config.messages === 'function' ? config.messages() : config.messages;
    const extraMessages = configuredMessages?.[selected.locale] || {};
    return { ...selected, messages: { ...selected.messages, ...extraMessages } };
  }

  render(): React.ReactNode {
    const locale = this.getAppLocale();
    const normalizedLocale = locale.locale.replace('_', '-');
    const context: LanguageContextValue = { locale: normalizedLocale, reloadAppLocale: this.reloadAppLocale };
    return (
      <ConfigProvider locale={locale.antd || zhAntd}>
        <IntlProvider locale={normalizedLocale} messages={locale.messages}>
          <ConnectedIntlApiBridge>
            <LangContext.Provider value={context}>
              <LocaleBridge>{this.props.children}</LocaleBridge>
            </LangContext.Provider>
          </ConnectedIntlApiBridge>
        </IntlProvider>
      </ConfigProvider>
    );
  }
}

export default class Router extends React.Component<RouterProps> {
  private unlisten: UnregisterCallback;

  constructor(props: RouterProps) {
    super(props);
    plugins.applyForEach('patchRoutes', { initialValue: routes });
    const onRouteChange = (location: Location, action?: Action): void => {
      plugins.applyForEach('onRouteChange', { initialValue: { routes, location, action } });
    };
    this.unlisten = history.listen(onRouteChange);
    const invokesInitialCallback = history.listen.toString().includes('callback(history.location, history.action)');
    if (!invokesInitialCallback) onRouteChange(history.location, history.action);
  }

  componentWillUnmount(): void { this.unlisten(); }

  render(): React.ReactNode {
    if (!this.props.store) throw new Error('Router store was not initialized');
    return (
      <LocaleProvider>
        <ConnectedRouter history={history} store={this.props.store}>
          {routeRenderer(routes, this.props)}
        </ConnectedRouter>
      </LocaleProvider>
    );
  }
}
