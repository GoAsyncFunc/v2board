import React from 'react';
import { Dropdown } from '../vendor/ui.js';
import { Menu } from '../vendor/ui.js';
import { setLocale } from '../vendor/i18n.js';
import { setCookie } from '../vendor/siteHelpers.js';
import { localeSettings } from '../vendor/localeSettings.js';

import '../vendor/componentStyles.js';
export class LanguageSelector extends React.Component {
  set(locale) {
    setLocale(locale);
    setCookie('i18n', locale);
  }

  render() {
    const languageMenu = (
      <Menu>
        {window.settings.i18n.sort().map(locale => (
          <Menu.Item key={locale} onClick={() => this.set(locale)}>
            {localeSettings.i18nText[locale]}
          </Menu.Item>
        ))}
      </Menu>
    );

    return (
      <Dropdown trigger="click" placement="topCenter" overlay={languageMenu}>
        {this.props.children}
      </Dropdown>
    );
  }
}

export default LanguageSelector;
