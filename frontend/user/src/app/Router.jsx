import React from 'react';
import { routeRenderer } from '../vendor/appRuntime.js';
import { routerBindings } from '../vendor/dva.js';
import { ConfigProvider } from '../vendor/ui.js';
import {
  enAntd, enData, enMessages, faAntd, faData, faMessages,
  jaAntd, jaData, jaMessages, koAntd, koData, koMessages,
  twAntd, viAntd, viData, viMessages, zhAntd, zhData, zhMessages,
} from '../vendor/locales.js';
import {
  setIntlApi,
  setLocaleController,
  addLocaleData,
  injectIntl,
  IntlProvider,
  LangContext,
} from '../vendor/i18n.js';
import { mergeConfig } from '../vendor/appRuntime.js';
import * as plugins from '../vendor/appRuntime.js';
import history from './history.js';
import appRoutes from './routes.js';

import '../vendor/dateTime.js';

const { ConnectedRouter } = routerBindings;
const localeData = {
  'en-US': { messages: enMessages, locale: 'en-US', antd: enAntd, data: enData, momentLocale: '' },
  'fa-IR': { messages: faMessages, locale: 'fa-IR', antd: faAntd, data: faData, momentLocale: 'fa' },
  'ja-JP': { messages: jaMessages, locale: 'ja-JP', antd: jaAntd, data: jaData, momentLocale: 'ja' },
  'ko-KR': { messages: koMessages, locale: 'ko-KR', antd: koAntd, data: koData, momentLocale: 'ko' },
  'vi-VN': { messages: viMessages, locale: 'vi-VN', antd: viAntd, data: viData, momentLocale: 'vi' },
  'zh-CN': { messages: zhMessages, locale: 'zh-CN', antd: zhAntd, data: zhData, momentLocale: 'zh-cn' },
  'zh-TW': { messages: zhMessages, locale: 'zh-TW', antd: twAntd, data: zhData, momentLocale: 'zh-tw' },
};

export const routes = appRoutes;
window.g_routes = routes;

export class IntlApiBridge extends React.Component {
  render() {
    setIntlApi(this.props.intl);
    return this.props.children;
  }
}

const ConnectedIntlApiBridge = injectIntl(IntlApiBridge);

export class LocaleBridge extends React.Component {
  render() {
    return (
      <LangContext.Consumer>
        {context => {
    setLocaleController(context);
          return this.props.children;
        }}
      </LangContext.Consumer>
    );
  }
}

export class LocaleProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { locale: 'zh-CN' };
    this.reloadAppLocale = () => this.setState({ locale: this.getAppLocale().locale });
  }

  getAppLocale() {
    const fallback = {
      locale: 'zh-CN', messages: {}, data: zhData, momentLocale: 'zh-cn',
    };
    const config = mergeConfig('locale') || {};
    const configuredLocale = typeof config.default === 'function' ? config.default() : config.default;
    const selected = typeof localStorage !== 'undefined' && localeData[localStorage.getItem('umi_locale')]
      ? localeData[localStorage.getItem('umi_locale')]
      : localeData[configuredLocale] || localeData['zh-CN'] || fallback;
    window.g_lang = selected.locale;
    window.g_langSeparator = '-';
    if (selected.data) addLocaleData(selected.data);
    const configuredMessages = config.messages;
    const extraMessages = typeof configuredMessages === 'function'
      ? configuredMessages()[selected.locale]
      : configuredMessages && configuredMessages[selected.locale];
    return { ...selected, messages: { ...selected.messages, ...(extraMessages || {}) } };
  }

  render() {
    const locale = this.getAppLocale();
    const normalizedLocale = locale.locale.replace('_', '-');
    const context = { locale: normalizedLocale, reloadAppLocale: this.reloadAppLocale };
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

export default class Router extends React.Component {
  constructor(props) {
    super(props);
    plugins.applyForEach('patchRoutes', { initialValue: routes });
    const onRouteChange = (location, action) => {
      plugins.applyForEach('onRouteChange', {
        initialValue: { routes, location, action },
      });
    };
    this.unListen = history.listen(onRouteChange);
    const invokesInitialCallback = history.listen
      .toString()
      .includes('callback(history.location, history.action)');
    if (!invokesInitialCallback) onRouteChange(history.location);
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    return (
      <LocaleProvider>
        <ConnectedRouter history={history} store={this.props.store}>
          {routeRenderer(routes, this.props || {})}
        </ConnectedRouter>
      </LocaleProvider>
    );
  }
}
