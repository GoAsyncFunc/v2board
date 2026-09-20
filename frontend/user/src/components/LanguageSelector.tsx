import React from 'react';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import { setLocale } from '../locales/i18n';
import { localeSettings } from '../config/localeSettings';
import { setCookie } from '../utils/siteHelpers';

interface LanguageSelectorProps {
  children: React.ReactElement;
}

export class LanguageSelector extends React.Component<LanguageSelectorProps> {
  setLocale(locale: string): void {
    setLocale(locale);
    setCookie('i18n', locale);
  }

  render(): React.ReactNode {
    const supportedLocales = [...window.settings.i18n].sort() as Array<keyof typeof localeSettings.i18nText>;
    const languageMenu = (
      <Menu>
        {supportedLocales.map(locale => (
          <Menu.Item key={locale} onClick={() => this.setLocale(locale)}>
            {localeSettings.i18nText[locale]}
          </Menu.Item>
        ))}
      </Menu>
    );

    return (
      <Dropdown trigger={['click']} placement="topCenter" overlay={languageMenu}>
        {this.props.children}
      </Dropdown>
    );
  }
}

export default LanguageSelector;
