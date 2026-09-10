let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
require("./32717463.js");
var r = require("../Modal.js"),
  o = require("./71317449.js"),
  i = interopDefault(o),
  a = require("./6a65685a.js"),
  s = interopDefault(a),
  c = require("./592f6674.js"),
  u = interopDefault(c);
class l extends i.a.Component {
  constructor() {
    super(), this.handleExpired = this.handleExpired.bind(this), this.handleErrored = this.handleErrored.bind(this), this.handleChange = this.handleChange.bind(this), this.handleRecaptchaRef = this.handleRecaptchaRef.bind(this);
  }
  getValue() {
    return this.props.grecaptcha && void 0 !== this._widgetId ? this.props.grecaptcha.getResponse(this._widgetId) : null;
  }
  getWidgetId() {
    return this.props.grecaptcha && void 0 !== this._widgetId ? this._widgetId : null;
  }
  execute() {
    var e = this.props.grecaptcha;
    if (e && void 0 !== this._widgetId) return e.execute(this._widgetId);
    this._executeRequested = !0;
  }
  executeAsync() {
    return new Promise((e, t) => {
      this.executionResolve = e, this.executionReject = t, this.execute();
    });
  }
  reset() {
    this.props.grecaptcha && void 0 !== this._widgetId && this.props.grecaptcha.reset(this._widgetId);
  }
  handleExpired() {
    this.props.onExpired ? this.props.onExpired() : this.handleChange(null);
  }
  handleErrored() {
    this.props.onErrored && this.props.onErrored(), this.executionReject && (this.executionReject(), delete this.executionResolve, delete this.executionReject);
  }
  handleChange(e) {
    this.props.onChange && this.props.onChange(e), this.executionResolve && (this.executionResolve(e), delete this.executionReject, delete this.executionResolve);
  }
  explicitRender() {
    if (this.props.grecaptcha && this.props.grecaptcha.render && void 0 === this._widgetId) {
      var e = document.createElement("div");
      this._widgetId = this.props.grecaptcha.render(e, {
        sitekey: this.props.sitekey,
        callback: this.handleChange,
        theme: this.props.theme,
        type: this.props.type,
        tabindex: this.props.tabindex,
        "expired-callback": this.handleExpired,
        "error-callback": this.handleErrored,
        size: this.props.size,
        stoken: this.props.stoken,
        hl: this.props.hl,
        badge: this.props.badge
      }), this.captcha.appendChild(e);
    }
    this._executeRequested && this.props.grecaptcha && void 0 !== this._widgetId && (this._executeRequested = !1, this.execute());
  }
  componentDidMount() {
    this.explicitRender();
  }
  componentDidUpdate() {
    this.explicitRender();
  }
  componentWillUnmount() {
    void 0 !== this._widgetId && (this.delayOfCaptchaIframeRemoving(), this.reset());
  }
  delayOfCaptchaIframeRemoving() {
    var e = document.createElement("div");
    document.body.appendChild(e), e.style.display = "none";
    while (this.captcha.firstChild) e.appendChild(this.captcha.firstChild);
    setTimeout(() => {
      document.body.removeChild(e);
    }, 5e3);
  }
  handleRecaptchaRef(e) {
    this.captcha = e;
  }
  render() {
    var e = this.props,
      t = (e.sitekey, e.onChange, e.theme, e.type, e.tabindex, e.onExpired, e.onErrored, e.size, e.stoken, e.grecaptcha, e.badge, e.hl, u()(e, ["sitekey", "onChange", "theme", "type", "tabindex", "onExpired", "onErrored", "size", "stoken", "grecaptcha", "badge", "hl"]));
    return i.a.createElement("div", s()({}, t, {
      ref: this.handleRecaptchaRef
    }));
  }
}
l.displayName = "ReCAPTCHA", l.defaultProps = {
  onChange: () => {},
  theme: "light",
  type: "image",
  tabindex: 0,
  size: "normal",
  badge: "bottomright"
};
var f = require("./31377839.js"),
  p = interopDefault(f),
  d = require("./326d716c.js"),
  h = interopDefault(d);
function m() {
  return m = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, m.apply(this, arguments);
}
function v(e, t) {
  if (null == e) return {};
  var n,
    r,
    o = {},
    i = Object.keys(e);
  for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || (o[n] = e[n]);
  return o;
}
function y(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t;
}
var g = {},
  b = 0;
function w(e, t) {
  return t = t || {}, function (n) {
    var r = n.displayName || n.name || "Component",
      i = function (r) {
        function i(e, t) {
          var n;
          return n = r.call(this, e, t) || this, n.state = {}, n.__scriptURL = "", n;
        }
        y(i, r);
        var a = i.prototype;
        return a.asyncScriptLoaderGetScriptLoaderID = function () {
          return this.__scriptLoaderID || (this.__scriptLoaderID = "async-script-loader-" + b++), this.__scriptLoaderID;
        }, a.setupScriptURL = function () {
          return this.__scriptURL = "function" === typeof e ? e() : e, this.__scriptURL;
        }, a.asyncScriptLoaderHandleLoad = function (e) {
          var t = this;
          this.setState(e, function () {
            return t.props.asyncScriptOnLoad && t.props.asyncScriptOnLoad(t.state);
          });
        }, a.asyncScriptLoaderTriggerOnScriptLoaded = function () {
          var e = g[this.__scriptURL];
          if (!e || !e.loaded) throw new Error("Script is not loaded.");
          for (var n in e.observers) e.observers[n](e);
          delete window[t.callbackName];
        }, a.componentDidMount = function () {
          var e = this,
            n = this.setupScriptURL(),
            r = this.asyncScriptLoaderGetScriptLoaderID(),
            o = t,
            i = o.globalName,
            a = o.callbackName,
            s = o.scriptId;
          if (i && "undefined" !== typeof window[i] && (g[n] = {
            loaded: !0,
            observers: {}
          }), g[n]) {
            var c = g[n];
            return c && (c.loaded || c.errored) ? void this.asyncScriptLoaderHandleLoad(c) : void (c.observers[r] = function (t) {
              return e.asyncScriptLoaderHandleLoad(t);
            });
          }
          var u = {};
          u[r] = function (t) {
            return e.asyncScriptLoaderHandleLoad(t);
          }, g[n] = {
            loaded: !1,
            observers: u
          };
          var l = document.createElement("script");
          for (var f in l.src = n, l.async = !0, t.attributes) l.setAttribute(f, t.attributes[f]);
          s && (l.id = s);
          var p = function (e) {
            if (g[n]) {
              var t = g[n],
                r = t.observers;
              for (var o in r) e(r[o]) && delete r[o];
            }
          };
          a && "undefined" !== typeof window && (window[a] = function () {
            return e.asyncScriptLoaderTriggerOnScriptLoaded();
          }), l.onload = function () {
            var e = g[n];
            e && (e.loaded = !0, p(function (t) {
              return !a && (t(e), !0);
            }));
          }, l.onerror = function () {
            var e = g[n];
            e && (e.errored = !0, p(function (t) {
              return t(e), !0;
            }));
          }, document.body.appendChild(l);
        }, a.componentWillUnmount = function () {
          var e = this.__scriptURL;
          if (!0 === t.removeOnUnmount) for (var n = document.getElementsByTagName("script"), r = 0; r < n.length; r += 1) n[r].src.indexOf(e) > -1 && n[r].parentNode && n[r].parentNode.removeChild(n[r]);
          var o = g[e];
          o && (delete o.observers[this.asyncScriptLoaderGetScriptLoaderID()], !0 === t.removeOnUnmount && delete g[e]);
        }, a.render = function () {
          var e = t.globalName,
            r = this.props,
            i = (r.asyncScriptOnLoad, r.forwardedRef),
            a = v(r, ["asyncScriptOnLoad", "forwardedRef"]);
          return e && "undefined" !== typeof window && (a[e] = "undefined" !== typeof window[e] ? window[e] : void 0), a.ref = i, Object(o["createElement"])(n, a);
        }, i;
      }(o["Component"]),
      a = Object(o["forwardRef"])(function (e, t) {
        return Object(o["createElement"])(i, m({}, e, {
          forwardedRef: t
        }));
      });
    return a.displayName = "AsyncScriptLoader(" + r + ")", a.propTypes = {
      asyncScriptOnLoad: p.a.func
    }, h()(a, n);
  };
}
var x = "onloadcallback",
  O = "grecaptcha";
function E() {
  return "undefined" !== typeof window && window.recaptchaOptions || {};
}
function _() {
  E();
  return "https://www.recaptcha.net/recaptcha/api.js?onload=".concat(x, "&render=explicit");
}
var k = w(_, {
    callbackName: x,
    globalName: O
  })(l),
  S = k,
  C = require("../reactRedux.js");
class j extends i.a.Component {
  constructor(e) {
    super(e), this.state = {
      visible: !1
    };
  }
  show() {
    this.key = Math.random(), this.props.visible ? this.setState({
      visible: !0
    }) : "function" === typeof this.props.callback && this.props.callback();
  }
  handle(e) {
    setTimeout(() => {
      this.hide(), "function" === typeof this.props.callback && this.props.callback(e);
    }, 500);
  }
  hide() {
    this.setState({
      visible: !1
    });
  }
  render() {
    var e = this.props.guest.commConfig;
    return i.a.createElement(i.a.Fragment, null, i.a.cloneElement(this.props.children, {
      onClick: () => this.show()
    }), i.a.createElement(r["a"], {
      key: this.key,
      visible: this.state.visible,
      onCancel: () => this.hide(),
      footer: !1,
      closable: !1,
      centered: !0
    }, i.a.createElement(S, {
      sitekey: e.recaptcha_site_key,
      onChange: e => this.handle(e)
    })));
  }
}
legacyExports["a"] = Object(C["c"])(e => {
  var t = e.guest;
  return {
    guest: t
  };
})(j);
