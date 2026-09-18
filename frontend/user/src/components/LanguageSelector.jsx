let legacyModule = module,
  legacyExports = exports;
const {
  defineExport,
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/reactRuntime.js");
defineExport(legacyExports, "a", function () {
  return LanguageSelector;
});
require("../vendor/modules/71566450.js");
var dropdown = require("../vendor/modules/antdDropdown.js"),
  menu = (require("../vendor/modules/6c55544b.js"), require("../vendor/modules/antdMenu.js")),
  reactModule = require("../vendor/modules/reactRuntime.js"),
  ReactComponent = interopDefault(reactModule),
  i18n = require("../vendor/i18n.js"),
  siteHelpers = require("../vendor/siteHelpers.js"),
  localeSettings = require("../vendor/localeSettings.js");
class LanguageSelector extends ReactComponent.a.Component {
  constructor(props) {
    super(props), this.state = {
      showLangMenu: !1
    };
  }
  showDropmenu(menuKey) {
    var selector = this;
    this.setState({
      [menuKey]: !this.state[menuKey]
    }, () => {
      document.onclick = function (event) {
        selector.state[menuKey] && selector.setState({
          [menuKey]: !1
        }), document.onclick = void 0;
      };
    });
  }
  set(locale) {
    Object(i18n["setLocale"])(locale), Object(siteHelpers["q"])("i18n", locale);
  }
  render() {
    return ReactComponent.a.createElement(dropdown["a"], {
      trigger: "click",
      placement: "topCenter",
      overlay: ReactComponent.a.createElement(menu["a"], null, window.settings.i18n.sort().map(locale => {
        return ReactComponent.a.createElement(menu["a"].Item, {
          onClick: () => this.set(locale)
        }, localeSettings["a"].i18nText[locale]);
      }))
    }, this.props.children);
  }
}
