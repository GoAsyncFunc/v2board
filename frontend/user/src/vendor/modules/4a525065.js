let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  interopDefault,
  defineExport
} = require("../../app/moduleInterop.js");
markEsModule(legacyExports);
var r = require("./30.js"),
  o = interopDefault(r),
  i = require("./32554434.js"),
  a = interopDefault(i),
  s = require("./37496e62.js"),
  c = interopDefault(s),
  u = require("./31377839.js"),
  l = interopDefault(u),
  f = require("./71317449.js"),
  p = interopDefault(f),
  d = require("./35375441.js"),
  h = interopDefault(d),
  m = require("./514c6150.js"),
  v = interopDefault(m);
function y(e) {
  return JSON.stringify(e.map(function (e) {
    return e && "object" === typeof e ? g(e) : e;
  }));
}
function g(e) {
  return Object.keys(e).sort().map(function (t) {
    var n;
    return n = {}, n[t] = e[t], n;
  });
}
var b = function (e, t) {
    return void 0 === t && (t = {}), function () {
      for (var n, r = [], o = 0; o < arguments.length; o++) r[o] = arguments[o];
      var i = y(r),
        a = i && t[i];
      return a || (a = new ((n = e).bind.apply(n, [void 0].concat(r)))(), i && (t[i] = a)), a;
    };
  },
  w = b;
defineExport(legacyExports, "addLocaleData", function () {
  return O;
}), defineExport(legacyExports, "intlShape", function () {
  return Z;
}), defineExport(legacyExports, "injectIntl", function () {
  return fe;
}), defineExport(legacyExports, "defineMessages", function () {
  return pe;
}), defineExport(legacyExports, "IntlProvider", function () {
  return Ae;
}), defineExport(legacyExports, "FormattedDate", function () {
  return De;
}), defineExport(legacyExports, "FormattedTime", function () {
  return Ie;
}), defineExport(legacyExports, "FormattedRelative", function () {
  return He;
}), defineExport(legacyExports, "FormattedNumber", function () {
  return Ye;
}), defineExport(legacyExports, "FormattedPlural", function () {
  return Ge;
}), defineExport(legacyExports, "FormattedMessage", function () {
  return Ze;
}), defineExport(legacyExports, "FormattedHTMLMessage", function () {
  return Qe;
});
var x = {
  locale: "en",
  pluralRuleFunction: function (e, t) {
    var n = String(e).split("."),
      r = !n[1],
      o = Number(n[0]) == e,
      i = o && n[0].slice(-1),
      a = o && n[0].slice(-2);
    return t ? 1 == i && 11 != a ? "one" : 2 == i && 12 != a ? "two" : 3 == i && 13 != a ? "few" : "other" : 1 == e && r ? "one" : "other";
  },
  fields: {
    year: {
      displayName: "year",
      relative: {
        0: "this year",
        1: "next year",
        "-1": "last year"
      },
      relativeTime: {
        future: {
          one: "in {0} year",
          other: "in {0} years"
        },
        past: {
          one: "{0} year ago",
          other: "{0} years ago"
        }
      }
    },
    month: {
      displayName: "month",
      relative: {
        0: "this month",
        1: "next month",
        "-1": "last month"
      },
      relativeTime: {
        future: {
          one: "in {0} month",
          other: "in {0} months"
        },
        past: {
          one: "{0} month ago",
          other: "{0} months ago"
        }
      }
    },
    day: {
      displayName: "day",
      relative: {
        0: "today",
        1: "tomorrow",
        "-1": "yesterday"
      },
      relativeTime: {
        future: {
          one: "in {0} day",
          other: "in {0} days"
        },
        past: {
          one: "{0} day ago",
          other: "{0} days ago"
        }
      }
    },
    hour: {
      displayName: "hour",
      relative: {
        0: "this hour"
      },
      relativeTime: {
        future: {
          one: "in {0} hour",
          other: "in {0} hours"
        },
        past: {
          one: "{0} hour ago",
          other: "{0} hours ago"
        }
      }
    },
    minute: {
      displayName: "minute",
      relative: {
        0: "this minute"
      },
      relativeTime: {
        future: {
          one: "in {0} minute",
          other: "in {0} minutes"
        },
        past: {
          one: "{0} minute ago",
          other: "{0} minutes ago"
        }
      }
    },
    second: {
      displayName: "second",
      relative: {
        0: "now"
      },
      relativeTime: {
        future: {
          one: "in {0} second",
          other: "in {0} seconds"
        },
        past: {
          one: "{0} second ago",
          other: "{0} seconds ago"
        }
      }
    }
  }
};
function O() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
    t = Array.isArray(e) ? e : [e];
  t.forEach(function (e) {
    e && e.locale && (a.a.__addLocaleData(e), c.a.__addLocaleData(e));
  });
}
function E(e) {
  var t = (e || "").split("-");
  while (t.length > 0) {
    if (_(t.join("-"))) return !0;
    t.pop();
  }
  return !1;
}
function _(e) {
  var t = e && e.toLowerCase();
  return !(!a.a.__localeData__[t] || !c.a.__localeData__[t]);
}
var k = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  },
  S = (function () {
    function e(e) {
      this.value = e;
    }
    function t(t) {
      var n, r;
      function o(e, t) {
        return new Promise(function (o, a) {
          var s = {
            key: e,
            arg: t,
            resolve: o,
            reject: a,
            next: null
          };
          r ? r = r.next = s : (n = r = s, i(e, t));
        });
      }
      function i(n, r) {
        try {
          var o = t[n](r),
            s = o.value;
          s instanceof e ? Promise.resolve(s.value).then(function (e) {
            i("next", e);
          }, function (e) {
            i("throw", e);
          }) : a(o.done ? "return" : "normal", o.value);
        } catch (e) {
          a("throw", e);
        }
      }
      function a(e, t) {
        switch (e) {
          case "return":
            n.resolve({
              value: t,
              done: !0
            });
            break;
          case "throw":
            n.reject(t);
            break;
          default:
            n.resolve({
              value: t,
              done: !1
            });
            break;
        }
        n = n.next, n ? i(n.key, n.arg) : r = null;
      }
      this._invoke = o, "function" !== typeof t.return && (this.return = void 0);
    }
    "function" === typeof Symbol && Symbol.asyncIterator && (t.prototype[Symbol.asyncIterator] = function () {
      return this;
    }), t.prototype.next = function (e) {
      return this._invoke("next", e);
    }, t.prototype.throw = function (e) {
      return this._invoke("throw", e);
    }, t.prototype.return = function (e) {
      return this._invoke("return", e);
    };
  }(), function (e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
  }),
  C = function () {
    function e(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }
    return function (t, n, r) {
      return n && e(t.prototype, n), r && e(t, r), t;
    };
  }(),
  j = function (e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  },
  P = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  },
  T = function (e, t) {
    if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
      constructor: {
        value: e,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
  },
  L = function (e, t) {
    var n = {};
    for (var r in e) t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
    return n;
  },
  N = function (e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" !== typeof t && "function" !== typeof t ? e : t;
  },
  M = function (e) {
    if (Array.isArray(e)) {
      for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
      return n;
    }
    return Array.from(e);
  },
  A = l.a.bool,
  D = l.a.number,
  I = l.a.string,
  R = l.a.func,
  F = l.a.object,
  V = l.a.oneOf,
  z = l.a.shape,
  B = l.a.any,
  W = l.a.oneOfType,
  U = V(["best fit", "lookup"]),
  q = V(["narrow", "short", "long"]),
  H = V(["numeric", "2-digit"]),
  Y = R.isRequired,
  G = {
    locale: I,
    timeZone: I,
    formats: F,
    messages: F,
    textComponent: B,
    defaultLocale: I,
    defaultFormats: F,
    onError: R
  },
  K = {
    formatDate: Y,
    formatTime: Y,
    formatRelative: Y,
    formatNumber: Y,
    formatPlural: Y,
    formatMessage: Y,
    formatHTMLMessage: Y
  },
  Z = z(P({}, G, K, {
    formatters: F,
    now: Y
  })),
  Q = (I.isRequired, W([I, F]), {
    localeMatcher: U,
    formatMatcher: V(["basic", "best fit"]),
    timeZone: I,
    hour12: A,
    weekday: q,
    era: q,
    year: H,
    month: V(["numeric", "2-digit", "narrow", "short", "long"]),
    day: H,
    hour: H,
    minute: H,
    second: H,
    timeZoneName: V(["short", "long"])
  }),
  X = {
    localeMatcher: U,
    style: V(["decimal", "currency", "percent"]),
    currency: I,
    currencyDisplay: V(["symbol", "code", "name"]),
    useGrouping: A,
    minimumIntegerDigits: D,
    minimumFractionDigits: D,
    maximumFractionDigits: D,
    minimumSignificantDigits: D,
    maximumSignificantDigits: D
  },
  J = {
    style: V(["best fit", "numeric"]),
    units: V(["second", "minute", "hour", "day", "month", "year", "second-short", "minute-short", "hour-short", "day-short", "month-short", "year-short"])
  },
  $ = {
    style: V(["cardinal", "ordinal"])
  },
  ee = Object.keys(G),
  te = {
    "&": "&amp;",
    ">": "&gt;",
    "<": "&lt;",
    '"': "&quot;",
    "'": "&#x27;"
  },
  ne = /[&><"']/g;
function re(e) {
  return ("" + e).replace(ne, function (e) {
    return te[e];
  });
}
function oe(e, t) {
  var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
  return t.reduce(function (t, r) {
    return e.hasOwnProperty(r) ? t[r] = e[r] : n.hasOwnProperty(r) && (t[r] = n[r]), t;
  }, {});
}
function ie() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
    t = e.intl;
  v()(t, "[React Intl] Could not find required `intl` object. <IntlProvider> needs to exist in the component ancestry.");
}
function ae(e, t) {
  if (e === t) return !0;
  if ("object" !== ("undefined" === typeof e ? "undefined" : k(e)) || null === e || "object" !== ("undefined" === typeof t ? "undefined" : k(t)) || null === t) return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (var o = Object.prototype.hasOwnProperty.bind(t), i = 0; i < n.length; i++) if (!o(n[i]) || e[n[i]] !== t[n[i]]) return !1;
  return !0;
}
function se(e, t, n) {
  var r = e.props,
    o = e.state,
    i = e.context,
    a = void 0 === i ? {} : i,
    s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
    c = a.intl,
    u = void 0 === c ? {} : c,
    l = s.intl,
    f = void 0 === l ? {} : l;
  return !ae(t, r) || !ae(n, o) || !(f === u || ae(oe(f, ee), oe(u, ee)));
}
function ce(e, t) {
  var n = t ? "\n" + t : "";
  return "[React Intl] " + e + n;
}
function ue(e) {
  0;
}
function le(e) {
  return e.displayName || e.name || "Component";
}
function fe(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    n = t.intlPropName,
    r = void 0 === n ? "intl" : n,
    o = t.withRef,
    i = void 0 !== o && o,
    a = function (t) {
      function n(e, t) {
        S(this, n);
        var r = N(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e, t));
        return ie(t), r;
      }
      return T(n, t), C(n, [{
        key: "getWrappedInstance",
        value: function () {
          return v()(i, "[React Intl] To access the wrapped instance, the `{withRef: true}` option must be set when calling: `injectIntl()`"), this._wrappedInstance;
        }
      }, {
        key: "render",
        value: function () {
          var t = this;
          return p.a.createElement(e, P({}, this.props, j({}, r, this.context.intl), {
            ref: i ? function (e) {
              return t._wrappedInstance = e;
            } : null
          }));
        }
      }]), n;
    }(f["Component"]);
  return a.displayName = "InjectIntl(" + le(e) + ")", a.contextTypes = {
    intl: Z
  }, a.WrappedComponent = e, h()(a, e);
}
function pe(e) {
  return e;
}
function de(e) {
  return a.a.prototype._resolveLocale(e);
}
function he(e) {
  return a.a.prototype._findPluralRuleFunction(e);
}
var me = function e(t) {
    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    S(this, e);
    var r = "ordinal" === n.style,
      o = he(de(t));
    this.format = function (e) {
      return o(e, r);
    };
  },
  ve = Object.keys(Q),
  ye = Object.keys(X),
  ge = Object.keys(J),
  be = Object.keys($),
  we = {
    second: 60,
    minute: 60,
    hour: 24,
    day: 30,
    month: 12
  };
function xe(e) {
  var t = c.a.thresholds;
  t.second = e.second, t.minute = e.minute, t.hour = e.hour, t.day = e.day, t.month = e.month, t["second-short"] = e["second-short"], t["minute-short"] = e["minute-short"], t["hour-short"] = e["hour-short"], t["day-short"] = e["day-short"], t["month-short"] = e["month-short"];
}
function Oe(e, t, n, r) {
  var o = e && e[t] && e[t][n];
  if (o) return o;
  r(ce("No " + t + " format named: " + n));
}
function Ee(e, t, n) {
  var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
    o = e.locale,
    i = e.formats,
    a = e.timeZone,
    s = r.format,
    c = e.onError || ue,
    u = new Date(n),
    l = P({}, a && {
      timeZone: a
    }, s && Oe(i, "date", s, c)),
    f = oe(r, ve, l);
  try {
    return t.getDateTimeFormat(o, f).format(u);
  } catch (e) {
    c(ce("Error formatting date.", e));
  }
  return String(u);
}
function _e(e, t, n) {
  var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
    o = e.locale,
    i = e.formats,
    a = e.timeZone,
    s = r.format,
    c = e.onError || ue,
    u = new Date(n),
    l = P({}, a && {
      timeZone: a
    }, s && Oe(i, "time", s, c)),
    f = oe(r, ve, l);
  f.hour || f.minute || f.second || (f = P({}, f, {
    hour: "numeric",
    minute: "numeric"
  }));
  try {
    return t.getDateTimeFormat(o, f).format(u);
  } catch (e) {
    c(ce("Error formatting time.", e));
  }
  return String(u);
}
function ke(e, t, n) {
  var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
    o = e.locale,
    i = e.formats,
    a = r.format,
    s = e.onError || ue,
    u = new Date(n),
    l = new Date(r.now),
    f = a && Oe(i, "relative", a, s),
    p = oe(r, ge, f),
    d = P({}, c.a.thresholds);
  xe(we);
  try {
    return t.getRelativeFormat(o, p).format(u, {
      now: isFinite(l) ? l : t.now()
    });
  } catch (e) {
    s(ce("Error formatting relative time.", e));
  } finally {
    xe(d);
  }
  return String(u);
}
function Se(e, t, n) {
  var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
    o = e.locale,
    i = e.formats,
    a = r.format,
    s = e.onError || ue,
    c = a && Oe(i, "number", a, s),
    u = oe(r, ye, c);
  try {
    return t.getNumberFormat(o, u).format(n);
  } catch (e) {
    s(ce("Error formatting number.", e));
  }
  return String(n);
}
function Ce(e, t, n) {
  var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
    o = e.locale,
    i = oe(r, be),
    a = e.onError || ue;
  try {
    return t.getPluralFormat(o, i).format(n);
  } catch (e) {
    a(ce("Error formatting plural.", e));
  }
  return "other";
}
function je(e, t) {
  var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
    r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
    o = e.locale,
    i = e.formats,
    a = e.messages,
    s = e.defaultLocale,
    c = e.defaultFormats,
    u = n.id,
    l = n.defaultMessage;
  v()(u, "[React Intl] An `id` must be provided to format a message.");
  var f = a && a[u],
    p = Object.keys(r).length > 0;
  if (!p) return f || l || u;
  var d = void 0,
    h = e.onError || ue;
  if (f) try {
    var m = t.getMessageFormat(f, o, i);
    d = m.format(r);
  } catch (e) {
    h(ce('Error formatting message: "' + u + '" for locale: "' + o + '"' + (l ? ", using default message as fallback." : ""), e));
  } else (!l || o && o.toLowerCase() !== s.toLowerCase()) && h(ce('Missing message: "' + u + '" for locale: "' + o + '"' + (l ? ", using default message as fallback." : "")));
  if (!d && l) try {
    var y = t.getMessageFormat(l, s, c);
    d = y.format(r);
  } catch (e) {
    h(ce('Error formatting the default message for: "' + u + '"', e));
  }
  return d || h(ce('Cannot format message: "' + u + '", using message ' + (f || l ? "source" : "id") + " as fallback.")), d || f || l || u;
}
function Pe(e, t, n) {
  var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
    o = Object.keys(r).reduce(function (e, t) {
      var n = r[t];
      return e[t] = "string" === typeof n ? re(n) : n, e;
    }, {});
  return je(e, t, n, o);
}
var Te = Object.freeze({
    formatDate: Ee,
    formatTime: _e,
    formatRelative: ke,
    formatNumber: Se,
    formatPlural: Ce,
    formatMessage: je,
    formatHTMLMessage: Pe
  }),
  Le = Object.keys(G),
  Ne = Object.keys(K),
  Me = {
    formats: {},
    messages: {},
    timeZone: null,
    textComponent: "span",
    defaultLocale: "en",
    defaultFormats: {},
    onError: ue
  },
  Ae = function (e) {
    function t(e) {
      var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      S(this, t);
      var r = N(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n));
      v()("undefined" !== typeof Intl, "[React Intl] The `Intl` APIs must be available in the runtime, and do not appear to be built-in. An `Intl` polyfill should be loaded.\nSee: http://formatjs.io/guides/runtime-environments/");
      var o = n.intl,
        i = void 0;
      i = isFinite(e.initialNow) ? Number(e.initialNow) : o ? o.now() : Date.now();
      var s = o || {},
        u = s.formatters,
        l = void 0 === u ? {
          getDateTimeFormat: w(Intl.DateTimeFormat),
          getNumberFormat: w(Intl.NumberFormat),
          getMessageFormat: w(a.a),
          getRelativeFormat: w(c.a),
          getPluralFormat: w(me)
        } : u;
      return r.state = P({}, l, {
        now: function () {
          return r._didDisplay ? Date.now() : i;
        }
      }), r;
    }
    return T(t, e), C(t, [{
      key: "getConfig",
      value: function () {
        var e = this.context.intl,
          t = oe(this.props, Le, e);
        for (var n in Me) void 0 === t[n] && (t[n] = Me[n]);
        if (!E(t.locale)) {
          var r = t,
            o = r.locale,
            i = r.defaultLocale,
            a = r.defaultFormats,
            s = r.onError;
          s(ce('Missing locale data for locale: "' + o + '". Using default locale: "' + i + '" as fallback.')), t = P({}, t, {
            locale: i,
            formats: a,
            messages: Me.messages
          });
        }
        return t;
      }
    }, {
      key: "getBoundFormatFns",
      value: function (e, t) {
        return Ne.reduce(function (n, r) {
          return n[r] = Te[r].bind(null, e, t), n;
        }, {});
      }
    }, {
      key: "getChildContext",
      value: function () {
        var e = this.getConfig(),
          t = this.getBoundFormatFns(e, this.state),
          n = this.state,
          r = n.now,
          o = L(n, ["now"]);
        return {
          intl: P({}, e, t, {
            formatters: o,
            now: r
          })
        };
      }
    }, {
      key: "shouldComponentUpdate",
      value: function () {
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        return se.apply(void 0, [this].concat(t));
      }
    }, {
      key: "componentDidMount",
      value: function () {
        this._didDisplay = !0;
      }
    }, {
      key: "render",
      value: function () {
        return f["Children"].only(this.props.children);
      }
    }]), t;
  }(f["Component"]);
Ae.displayName = "IntlProvider", Ae.contextTypes = {
  intl: Z
}, Ae.childContextTypes = {
  intl: Z.isRequired
};
var De = function (e) {
  function t(e, n) {
    S(this, t);
    var r = N(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n));
    return ie(n), r;
  }
  return T(t, e), C(t, [{
    key: "shouldComponentUpdate",
    value: function () {
      for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
      return se.apply(void 0, [this].concat(t));
    }
  }, {
    key: "render",
    value: function () {
      var e = this.context.intl,
        t = e.formatDate,
        n = e.textComponent,
        r = this.props,
        o = r.value,
        i = r.children,
        a = t(o, this.props);
      return "function" === typeof i ? i(a) : p.a.createElement(n, null, a);
    }
  }]), t;
}(f["Component"]);
De.displayName = "FormattedDate", De.contextTypes = {
  intl: Z
};
var Ie = function (e) {
  function t(e, n) {
    S(this, t);
    var r = N(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n));
    return ie(n), r;
  }
  return T(t, e), C(t, [{
    key: "shouldComponentUpdate",
    value: function () {
      for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
      return se.apply(void 0, [this].concat(t));
    }
  }, {
    key: "render",
    value: function () {
      var e = this.context.intl,
        t = e.formatTime,
        n = e.textComponent,
        r = this.props,
        o = r.value,
        i = r.children,
        a = t(o, this.props);
      return "function" === typeof i ? i(a) : p.a.createElement(n, null, a);
    }
  }]), t;
}(f["Component"]);
Ie.displayName = "FormattedTime", Ie.contextTypes = {
  intl: Z
};
var Re = 1e3,
  Fe = 6e4,
  Ve = 36e5,
  ze = 864e5,
  Be = 2147483647;
function We(e) {
  var t = Math.abs(e);
  return t < Fe ? "second" : t < Ve ? "minute" : t < ze ? "hour" : "day";
}
function Ue(e) {
  switch (e) {
    case "second":
      return Re;
    case "minute":
      return Fe;
    case "hour":
      return Ve;
    case "day":
      return ze;
    default:
      return Be;
  }
}
function qe(e, t) {
  if (e === t) return !0;
  var n = new Date(e).getTime(),
    r = new Date(t).getTime();
  return isFinite(n) && isFinite(r) && n === r;
}
var He = function (e) {
  function t(e, n) {
    S(this, t);
    var r = N(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n));
    ie(n);
    var o = isFinite(e.initialNow) ? Number(e.initialNow) : n.intl.now();
    return r.state = {
      now: o
    }, r;
  }
  return T(t, e), C(t, [{
    key: "scheduleNextUpdate",
    value: function (e, t) {
      var n = this;
      clearTimeout(this._timer);
      var r = e.value,
        o = e.units,
        i = e.updateInterval,
        a = new Date(r).getTime();
      if (i && isFinite(a)) {
        var s = a - t.now,
          c = Ue(o || We(s)),
          u = Math.abs(s % c),
          l = s < 0 ? Math.max(i, c - u) : Math.max(i, u);
        this._timer = setTimeout(function () {
          n.setState({
            now: n.context.intl.now()
          });
        }, l);
      }
    }
  }, {
    key: "componentDidMount",
    value: function () {
      this.scheduleNextUpdate(this.props, this.state);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function (e) {
      var t = e.value;
      qe(t, this.props.value) || this.setState({
        now: this.context.intl.now()
      });
    }
  }, {
    key: "shouldComponentUpdate",
    value: function () {
      for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
      return se.apply(void 0, [this].concat(t));
    }
  }, {
    key: "componentWillUpdate",
    value: function (e, t) {
      this.scheduleNextUpdate(e, t);
    }
  }, {
    key: "componentWillUnmount",
    value: function () {
      clearTimeout(this._timer);
    }
  }, {
    key: "render",
    value: function () {
      var e = this.context.intl,
        t = e.formatRelative,
        n = e.textComponent,
        r = this.props,
        o = r.value,
        i = r.children,
        a = t(o, P({}, this.props, this.state));
      return "function" === typeof i ? i(a) : p.a.createElement(n, null, a);
    }
  }]), t;
}(f["Component"]);
He.displayName = "FormattedRelative", He.contextTypes = {
  intl: Z
}, He.defaultProps = {
  updateInterval: 1e4
};
var Ye = function (e) {
  function t(e, n) {
    S(this, t);
    var r = N(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n));
    return ie(n), r;
  }
  return T(t, e), C(t, [{
    key: "shouldComponentUpdate",
    value: function () {
      for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
      return se.apply(void 0, [this].concat(t));
    }
  }, {
    key: "render",
    value: function () {
      var e = this.context.intl,
        t = e.formatNumber,
        n = e.textComponent,
        r = this.props,
        o = r.value,
        i = r.children,
        a = t(o, this.props);
      return "function" === typeof i ? i(a) : p.a.createElement(n, null, a);
    }
  }]), t;
}(f["Component"]);
Ye.displayName = "FormattedNumber", Ye.contextTypes = {
  intl: Z
};
var Ge = function (e) {
  function t(e, n) {
    S(this, t);
    var r = N(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n));
    return ie(n), r;
  }
  return T(t, e), C(t, [{
    key: "shouldComponentUpdate",
    value: function () {
      for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
      return se.apply(void 0, [this].concat(t));
    }
  }, {
    key: "render",
    value: function () {
      var e = this.context.intl,
        t = e.formatPlural,
        n = e.textComponent,
        r = this.props,
        o = r.value,
        i = r.other,
        a = r.children,
        s = t(o, this.props),
        c = this.props[s] || i;
      return "function" === typeof a ? a(c) : p.a.createElement(n, null, c);
    }
  }]), t;
}(f["Component"]);
Ge.displayName = "FormattedPlural", Ge.contextTypes = {
  intl: Z
}, Ge.defaultProps = {
  style: "cardinal"
};
var Ke = function (e, t) {
    return je({}, {
      getMessageFormat: w(a.a)
    }, e, t);
  },
  Ze = function (e) {
    function t(e, n) {
      S(this, t);
      var r = N(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n));
      return e.defaultMessage || ie(n), r;
    }
    return T(t, e), C(t, [{
      key: "shouldComponentUpdate",
      value: function (e) {
        var t = this.props.values,
          n = e.values;
        if (!ae(n, t)) return !0;
        for (var r = P({}, e, {
            values: t
          }), o = arguments.length, i = Array(o > 1 ? o - 1 : 0), a = 1; a < o; a++) i[a - 1] = arguments[a];
        return se.apply(void 0, [this, r].concat(i));
      }
    }, {
      key: "render",
      value: function () {
        var e = this.context.intl || {},
          t = e.formatMessage,
          n = void 0 === t ? Ke : t,
          r = e.textComponent,
          o = void 0 === r ? "span" : r,
          i = this.props,
          a = i.id,
          s = i.description,
          c = i.defaultMessage,
          u = i.values,
          l = i.tagName,
          p = void 0 === l ? o : l,
          d = i.children,
          h = void 0,
          m = void 0,
          v = void 0,
          y = u && Object.keys(u).length > 0;
        if (y) {
          var g = Math.floor(1099511627776 * Math.random()).toString(16),
            b = function () {
              var e = 0;
              return function () {
                return "ELEMENT-" + g + "-" + (e += 1);
              };
            }();
          h = "@__" + g + "__@", m = {}, v = {}, Object.keys(u).forEach(function (e) {
            var t = u[e];
            if (Object(f["isValidElement"])(t)) {
              var n = b();
              m[e] = h + n + h, v[n] = t;
            } else m[e] = t;
          });
        }
        var w = {
            id: a,
            description: s,
            defaultMessage: c
          },
          x = n(w, m || u),
          O = void 0,
          E = v && Object.keys(v).length > 0;
        return O = E ? x.split(h).filter(function (e) {
          return !!e;
        }).map(function (e) {
          return v[e] || e;
        }) : [x], "function" === typeof d ? d.apply(void 0, M(O)) : f["createElement"].apply(void 0, [p, null].concat(M(O)));
      }
    }]), t;
  }(f["Component"]);
Ze.displayName = "FormattedMessage", Ze.contextTypes = {
  intl: Z
}, Ze.defaultProps = {
  values: {}
};
var Qe = function (e) {
  function t(e, n) {
    S(this, t);
    var r = N(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n));
    return ie(n), r;
  }
  return T(t, e), C(t, [{
    key: "shouldComponentUpdate",
    value: function (e) {
      var t = this.props.values,
        n = e.values;
      if (!ae(n, t)) return !0;
      for (var r = P({}, e, {
          values: t
        }), o = arguments.length, i = Array(o > 1 ? o - 1 : 0), a = 1; a < o; a++) i[a - 1] = arguments[a];
      return se.apply(void 0, [this, r].concat(i));
    }
  }, {
    key: "render",
    value: function () {
      var e = this.context.intl,
        t = e.formatHTMLMessage,
        n = e.textComponent,
        r = this.props,
        o = r.id,
        i = r.description,
        a = r.defaultMessage,
        s = r.values,
        c = r.tagName,
        u = void 0 === c ? n : c,
        l = r.children,
        f = {
          id: o,
          description: i,
          defaultMessage: a
        },
        d = t(f, s);
      if ("function" === typeof l) return l(d);
      var h = {
        __html: d
      };
      return p.a.createElement(u, {
        dangerouslySetInnerHTML: h
      });
    }
  }]), t;
}(f["Component"]);
Qe.displayName = "FormattedHTMLMessage", Qe.contextTypes = {
  intl: Z
}, Qe.defaultProps = {
  values: {}
}, O(x), O(o.a);
