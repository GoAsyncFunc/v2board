let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  interopDefault,
  defineExport
} = require("./moduleInterop.js");
markEsModule(legacyExports);
var r = require("../vendor/modules/reactRuntime.js"),
  o = interopDefault(r),
  i = require("../vendor/modules/43727734.js"),
  a = interopDefault(i),
  s = require("./history.js"),
  c = (require("../vendor/modules/62593767.js"), require("../vendor/modules/41324646.js")),
  u = require("../vendor/modules/iterableToArray.js"),
  l = interopDefault(u),
  f = (require("../vendor/modules/4b73726e.js"), require("../vendor/modules/4d522f38.js")),
  p = require("../vendor/modules/70307045.js"),
  d = interopDefault(p),
  h = require("../vendor/modules/4c4c584e.js"),
  m = (require("../vendor/modules/6a665343.js"), require("../vendor/modules/4235354e.js"), require("../vendor/modules/4976692b.js"), require("../vendor/modules/4b534638.js"), require("../vendor/modules/58447067.js"), require("../vendor/modules/6b4f704e.js"), require("../vendor/modules/77642f52.js"), (() => {
    var e = (e, t) => {
      return Object(h["_setIntlObject"])(t.intl), e.children;
    };
    return e.contextTypes = {
      intl: h["intlShape"]
    }, e;
  })()),
  v = !1,
  y = "-",
  g = !0,
  b = require("../vendor/modules/46636653.js");
b = b.default || b;
var w = {
  "en-US": {
    messages: d()({}, (e => e.__esModule ? e.default : e)(require("../vendor/modules/4b57344c.js"))),
    locale: "en-US",
    antd: require("../vendor/modules/624d456b.js"),
    data: require("../vendor/modules/50547431.js"),
    momentLocale: ""
  },
  "fa-IR": {
    messages: d()({}, (e => e.__esModule ? e.default : e)(require("../vendor/modules/4c466a76.js"))),
    locale: "fa-IR",
    antd: require("../vendor/modules/34757779.js"),
    data: require("../vendor/modules/43553454.js"),
    momentLocale: "fa"
  },
  "ja-JP": {
    messages: d()({}, (e => e.__esModule ? e.default : e)(require("../vendor/modules/46575433.js"))),
    locale: "ja-JP",
    antd: require("../vendor/modules/46635649.js"),
    data: require("../vendor/modules/76534f6d.js"),
    momentLocale: "ja"
  },
  "ko-KR": {
    messages: d()({}, (e => e.__esModule ? e.default : e)(require("../vendor/modules/6e6d6e38.js"))),
    locale: "ko-KR",
    antd: require("../vendor/modules/7736764a.js"),
    data: require("../vendor/modules/4b41676f.js"),
    momentLocale: "ko"
  },
  "vi-VN": {
    messages: d()({}, (e => e.__esModule ? e.default : e)(require("../vendor/modules/45507844.js"))),
    locale: "vi-VN",
    antd: require("../vendor/modules/57734b44.js"),
    data: require("../vendor/modules/6b456479.js"),
    momentLocale: "vi"
  },
  "zh-CN": {
    messages: d()({}, (e => e.__esModule ? e.default : e)(require("../vendor/modules/4c323765.js"))),
    locale: "zh-CN",
    antd: require("../vendor/modules/46636653.js"),
    data: require("../vendor/modules/64564876.js"),
    momentLocale: "zh-cn"
  },
  "zh-TW": {
    messages: d()({}, (e => e.__esModule ? e.default : e)(require("../vendor/modules/46457a35.js"))),
    locale: "zh-TW",
    antd: require("../vendor/modules/34707638.js"),
    data: require("../vendor/modules/64564876.js"),
    momentLocale: "zh-tw"
  }
};
class x extends o.a.Component {
  constructor() {
    super(...arguments), this.state = {
      locale: "zh-CN"
    }, this.reloadAppLocale = () => {
      var e = this.getAppLocale();
      this.setState({
        locale: e.locale
      });
    };
  }
  getAppLocale() {
    var e = {
        locale: "zh-CN",
        messages: {},
        data: require("../vendor/modules/64564876.js"),
        momentLocale: "zh-cn"
      },
      t = require("../vendor/modules/50737a47.js").mergeConfig("locale") || {},
      r = "function" === typeof t.default ? t.default() : t.default;
    e = g && "undefined" !== typeof localStorage && localStorage.getItem("umi_locale") && w[localStorage.getItem("umi_locale")] ? w[localStorage.getItem("umi_locale")] : "undefined" !== typeof navigator && w[navigator.language] && v ? w[navigator.language] : w[r] ? w[r] : w["zh-CN"] || e, window.g_lang = e.locale, window.g_langSeparator = y || "-", e.data && Object(h["addLocaleData"])(e.data);
    var o = typeof t.messages;
    if ("object" === o || "function" === o) {
      var i = "object" === o ? t.messages[e.locale] : t.messages()[e.locale];
      Object.assign(e.messages, i || {});
    }
    return e;
  }
  render() {
    var e = this.getAppLocale(),
      t = e.locale.split(y).join("-"),
      r = {
        locale: t,
        reloadAppLocale: this.reloadAppLocale
      },
      i = this.props.children;
    i = o.a.createElement(h["IntlProvider"], {
      locale: t,
      messages: e.messages
    }, o.a.createElement(m, null, o.a.createElement(h["LangContext"].Provider, {
      value: r
    }, o.a.createElement(h["LangContext"].Consumer, null, e => {
      return Object(h["_setLocaleContext"])(e), this.props.children;
    }))));
    var a = f["b"],
      s = "".concat(c["a"] || "").split("."),
      u = l()(s, 2),
      p = u[0],
      d = u[1],
      v = Number(p) > 3 || Number(p) >= 3 && Number(d) >= 21;
    if (v) try {
      a = require("../vendor/modules/antdConfigProvider.js").default;
    } catch (e) {}
    return o.a.createElement(a, {
      locale: e.antd ? e.antd.default || e.antd : b
    }, i);
  }
}
var O = x,
  E = require("../vendor/dva.js");
defineExport(legacyExports, "routes", function () {
  return k;
}), defineExport(legacyExports, "default", function () {
  return C;
});
var _ = E["c"].ConnectedRouter,
  k = require("./routes.js").default;
window.g_routes = k;
var S = require("../vendor/modules/50737a47.js");
S.applyForEach("patchRoutes", {
  initialValue: k
});
class C extends o.a.Component {
  unListen() {}
  constructor(e) {
    function t(e, t) {
      S.applyForEach("onRouteChange", {
        initialValue: {
          routes: k,
          location: e,
          action: t
        }
      });
    }
    super(e), this.unListen = s["default"].listen(t);
    var n = s["default"].listen.toString().indexOf("callback(history.location, history.action)") > -1;
    n || t(s["default"].location);
  }
  componentWillUnmount() {
    this.unListen();
  }
  render() {
    var e = this.props || {};
    return o.a.createElement(O, null, o.a.createElement(_, {
      history: s["default"]
    }, a()(k, e)));
  }
}
