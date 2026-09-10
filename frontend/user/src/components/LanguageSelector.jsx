let legacyModule = module,
  legacyExports = exports;
const {
  defineExport,
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/71317449.js");
defineExport(legacyExports, "a", function () {
  return l;
});
require("../vendor/modules/71566450.js");
var r = require("../vendor/modules/6a73432b.js"),
  o = (require("../vendor/modules/6c55544b.js"), require("../vendor/modules/42764b73.js")),
  i = require("../vendor/modules/71317449.js"),
  a = interopDefault(i),
  s = require("../vendor/i18n.js"),
  c = require("../vendor/siteHelpers.js"),
  u = require("../vendor/localeSettings.js");
class l extends a.a.Component {
  constructor(e) {
    super(e), this.state = {
      showLangMenu: !1
    };
  }
  showDropmenu(e) {
    var t = this;
    this.setState({
      [e]: !this.state[e]
    }, () => {
      document.onclick = function (n) {
        t.state[e] && t.setState({
          [e]: !1
        }), document.onclick = void 0;
      };
    });
  }
  set(e) {
    Object(s["setLocale"])(e), Object(c["q"])("i18n", e);
  }
  render() {
    return a.a.createElement(r["a"], {
      trigger: "click",
      placement: "topCenter",
      overlay: a.a.createElement(o["a"], null, window.settings.i18n.sort().map(e => {
        return a.a.createElement(o["a"].Item, {
          onClick: () => this.set(e)
        }, u["a"].i18nText[e]);
      }))
    }, this.props.children);
  }
}
