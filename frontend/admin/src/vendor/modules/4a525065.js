let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  interopDefault,
  defineExport
} = require("../../app/moduleInterop.js");
markEsModule(legacyExports);
var r = require("./emptyModule.js"),
  i = interopDefault(r),
  o = require("./32554434.js"),
  a = interopDefault(o),
  s = require("./37496e62.js"),
  l = interopDefault(s),
  c = require("./propTypesRuntime.js"),
  u = interopDefault(c),
  h = require("./reactRuntime.js"),
  f = interopDefault(h),
  d = require("./copyProperties.js"),
  p = interopDefault(d),
  m = require("./514c6150.js"),
  g = interopDefault(m);
function v(e) {
  return JSON.stringify(e.map(function (e) {
    return e && "object" === typeof e ? y(e) : e;
  }));
}
function y(e) {
  return Object.keys(e).sort().map(function (t) {
    var n;
    return n = {}, n[t] = e[t], n;
  });
}
var b = function (e, t) {
    return void 0 === t && (t = {}), function () {
      for (var n, r = [], i = 0; i < arguments.length; i++) r[i] = arguments[i];
      var o = v(r),
        a = o && t[o];
      return a || (a = new ((n = e).bind.apply(n, [void 0].concat(r)))(), o && (t[o] = a)), a;
    };
  },
  w = b;
defineExport(legacyExports, "addLocaleData", function () {
  return _;
}), defineExport(legacyExports, "intlShape", function () {
  return Y;
}), defineExport(legacyExports, "injectIntl", function () {
  return he;
}), defineExport(legacyExports, "defineMessages", function () {
  return fe;
}), defineExport(legacyExports, "IntlProvider", function () {
  return Re;
}), defineExport(legacyExports, "FormattedDate", function () {
  return Ne;
}), defineExport(legacyExports, "FormattedTime", function () {
  return De;
}), defineExport(legacyExports, "FormattedRelative", function () {
  return ze;
}), defineExport(legacyExports, "FormattedNumber", function () {
  return Ge;
}), defineExport(legacyExports, "FormattedPlural", function () {
  return qe;
}), defineExport(legacyExports, "FormattedMessage", function () {
  return Ye;
}), defineExport(legacyExports, "FormattedHTMLMessage", function () {
  return Xe;
});
var x = {
  locale: "en",
  pluralRuleFunction: function (e, t) {
    var n = String(e).split("."),
      r = !n[1],
      i = Number(n[0]) == e,
      o = i && n[0].slice(-1),
      a = i && n[0].slice(-2);
    return t ? 1 == o && 11 != a ? "one" : 2 == o && 12 != a ? "two" : 3 == o && 13 != a ? "few" : "other" : 1 == e && r ? "one" : "other";
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
function _() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
    t = Array.isArray(e) ? e : [e];
  t.forEach(function (e) {
    e && e.locale && (a.a.__addLocaleData(e), l.a.__addLocaleData(e));
  });
}
function E(e) {
  var t = (e || "").split("-");
  while (t.length > 0) {
    if (S(t.join("-"))) return !0;
    t.pop();
  }
  return !1;
}
function S(e) {
  var t = e && e.toLowerCase();
  return !(!a.a.__localeData__[t] || !l.a.__localeData__[t]);
}
var k = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  },
  C = (function () {
    function e(e) {
      this.value = e;
    }
    function t(t) {
      var n, r;
      function i(e, t) {
        return new Promise(function (i, a) {
          var s = {
            key: e,
            arg: t,
            resolve: i,
            reject: a,
            next: null
          };
          r ? r = r.next = s : (n = r = s, o(e, t));
        });
      }
      function o(n, r) {
        try {
          var i = t[n](r),
            s = i.value;
          s instanceof e ? Promise.resolve(s.value).then(function (e) {
            o("next", e);
          }, function (e) {
            o("throw", e);
          }) : a(i.done ? "return" : "normal", i.value);
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
        n = n.next, n ? o(n.key, n.arg) : r = null;
      }
      this._invoke = i, "function" !== typeof t.return && (this.return = void 0);
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
  O = function () {
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
  T = function (e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  },
  L = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  },
  A = function (e, t) {
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
  P = function (e, t) {
    var n = {};
    for (var r in e) t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
    return n;
  },
  j = function (e, t) {
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
  R = u.a.bool,
  N = u.a.number,
  D = u.a.string,
  I = u.a.func,
  $ = u.a.object,
  F = u.a.oneOf,
  B = u.a.shape,
  V = u.a.any,
  W = u.a.oneOfType,
  H = F(["best fit", "lookup"]),
  U = F(["narrow", "short", "long"]),
  z = F(["numeric", "2-digit"]),
  G = I.isRequired,
  q = {
    locale: D,
    timeZone: D,
    formats: $,
    messages: $,
    textComponent: V,
    defaultLocale: D,
    defaultFormats: $,
    onError: I
  },
  K = {
    formatDate: G,
    formatTime: G,
    formatRelative: G,
    formatNumber: G,
    formatPlural: G,
    formatMessage: G,
    formatHTMLMessage: G
  },
  Y = B(L({}, q, K, {
    formatters: $,
    now: G
  })),
  X = (D.isRequired, W([D, $]), {
    localeMatcher: H,
    formatMatcher: F(["basic", "best fit"]),
    timeZone: D,
    hour12: R,
    weekday: U,
    era: U,
    year: z,
    month: F(["numeric", "2-digit", "narrow", "short", "long"]),
    day: z,
    hour: z,
    minute: z,
    second: z,
    timeZoneName: F(["short", "long"])
  }),
  Q = {
    localeMatcher: H,
    style: F(["decimal", "currency", "percent"]),
    currency: D,
    currencyDisplay: F(["symbol", "code", "name"]),
    useGrouping: R,
    minimumIntegerDigits: N,
    minimumFractionDigits: N,
    maximumFractionDigits: N,
    minimumSignificantDigits: N,
    maximumSignificantDigits: N
  },
  Z = {
    style: F(["best fit", "numeric"]),
    units: F(["second", "minute", "hour", "day", "month", "year", "second-short", "minute-short", "hour-short", "day-short", "month-short", "year-short"])
  },
  J = {
    style: F(["cardinal", "ordinal"])
  },
  ee = Object.keys(q),
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
function ie(e, t) {
  var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
  return t.reduce(function (t, r) {
    return e.hasOwnProperty(r) ? t[r] = e[r] : n.hasOwnProperty(r) && (t[r] = n[r]), t;
  }, {});
}
function oe() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
    t = e.intl;
  g()(t, "[React Intl] Could not find required `intl` object. <IntlProvider> needs to exist in the component ancestry.");
}
function ae(e, t) {
  if (e === t) return !0;
  if ("object" !== ("undefined" === typeof e ? "undefined" : k(e)) || null === e || "object" !== ("undefined" === typeof t ? "undefined" : k(t)) || null === t) return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (var i = Object.prototype.hasOwnProperty.bind(t), o = 0; o < n.length; o++) if (!i(n[o]) || e[n[o]] !== t[n[o]]) return !1;
  return !0;
}
function se(e, t, n) {
  var r = e.props,
    i = e.state,
    o = e.context,
    a = void 0 === o ? {} : o,
    s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
    l = a.intl,
    c = void 0 === l ? {} : l,
    u = s.intl,
    h = void 0 === u ? {} : u;
  return !ae(t, r) || !ae(n, i) || !(h === c || ae(ie(h, ee), ie(c, ee)));
}
function le(e, t) {
  var n = t ? "\n" + t : "";
  return "[React Intl] " + e + n;
}
function ce(e) {
  0;
}
function ue(e) {
  return e.displayName || e.name || "Component";
}
function he(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    n = t.intlPropName,
    r = void 0 === n ? "intl" : n,
    i = t.withRef,
    o = void 0 !== i && i,
    a = function (t) {
      function n(e, t) {
        C(this, n);
        var r = j(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e, t));
        return oe(t), r;
      }
      return A(n, t), O(n, [{
        key: "getWrappedInstance",
        value: function () {
          return g()(o, "[React Intl] To access the wrapped instance, the `{withRef: true}` option must be set when calling: `injectIntl()`"), this._wrappedInstance;
        }
      }, {
        key: "render",
        value: function () {
          var t = this;
          return f.a.createElement(e, L({}, this.props, T({}, r, this.context.intl), {
            ref: o ? function (e) {
              return t._wrappedInstance = e;
            } : null
          }));
        }
      }]), n;
    }(h["Component"]);
  return a.displayName = "InjectIntl(" + ue(e) + ")", a.contextTypes = {
    intl: Y
  }, a.WrappedComponent = e, p()(a, e);
}
function fe(e) {
  return e;
}
function de(e) {
  return a.a.prototype._resolveLocale(e);
}
function pe(e) {
  return a.a.prototype._findPluralRuleFunction(e);
}
var me = function e(t) {
    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    C(this, e);
    var r = "ordinal" === n.style,
      i = pe(de(t));
    this.format = function (e) {
      return i(e, r);
    };
  },
  ge = Object.keys(X),
  ve = Object.keys(Q),
  ye = Object.keys(Z),
  be = Object.keys(J),
  we = {
    second: 60,
    minute: 60,
    hour: 24,
    day: 30,
    month: 12
  };
function xe(e) {
  var t = l.a.thresholds;
  t.second = e.second, t.minute = e.minute, t.hour = e.hour, t.day = e.day, t.month = e.month, t["second-short"] = e["second-short"], t["minute-short"] = e["minute-short"], t["hour-short"] = e["hour-short"], t["day-short"] = e["day-short"], t["month-short"] = e["month-short"];
}
function _e(e, t, n, r) {
  var i = e && e[t] && e[t][n];
  if (i) return i;
  r(le("No " + t + " format named: " + n));
}
function Ee(e, t, n) {
  var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
    i = e.locale,
    o = e.formats,
    a = e.timeZone,
    s = r.format,
    l = e.onError || ce,
    c = new Date(n),
    u = L({}, a && {
      timeZone: a
    }, s && _e(o, "date", s, l)),
    h = ie(r, ge, u);
  try {
    return t.getDateTimeFormat(i, h).format(c);
  } catch (e) {
    l(le("Error formatting date.", e));
  }
  return String(c);
}
function Se(e, t, n) {
  var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
    i = e.locale,
    o = e.formats,
    a = e.timeZone,
    s = r.format,
    l = e.onError || ce,
    c = new Date(n),
    u = L({}, a && {
      timeZone: a
    }, s && _e(o, "time", s, l)),
    h = ie(r, ge, u);
  h.hour || h.minute || h.second || (h = L({}, h, {
    hour: "numeric",
    minute: "numeric"
  }));
  try {
    return t.getDateTimeFormat(i, h).format(c);
  } catch (e) {
    l(le("Error formatting time.", e));
  }
  return String(c);
}
function ke(e, t, n) {
  var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
    i = e.locale,
    o = e.formats,
    a = r.format,
    s = e.onError || ce,
    c = new Date(n),
    u = new Date(r.now),
    h = a && _e(o, "relative", a, s),
    f = ie(r, ye, h),
    d = L({}, l.a.thresholds);
  xe(we);
  try {
    return t.getRelativeFormat(i, f).format(c, {
      now: isFinite(u) ? u : t.now()
    });
  } catch (e) {
    s(le("Error formatting relative time.", e));
  } finally {
    xe(d);
  }
  return String(c);
}
function Ce(e, t, n) {
  var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
    i = e.locale,
    o = e.formats,
    a = r.format,
    s = e.onError || ce,
    l = a && _e(o, "number", a, s),
    c = ie(r, ve, l);
  try {
    return t.getNumberFormat(i, c).format(n);
  } catch (e) {
    s(le("Error formatting number.", e));
  }
  return String(n);
}
function Oe(e, t, n) {
  var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
    i = e.locale,
    o = ie(r, be),
    a = e.onError || ce;
  try {
    return t.getPluralFormat(i, o).format(n);
  } catch (e) {
    a(le("Error formatting plural.", e));
  }
  return "other";
}
function Te(e, t) {
  var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
    r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
    i = e.locale,
    o = e.formats,
    a = e.messages,
    s = e.defaultLocale,
    l = e.defaultFormats,
    c = n.id,
    u = n.defaultMessage;
  g()(c, "[React Intl] An `id` must be provided to format a message.");
  var h = a && a[c],
    f = Object.keys(r).length > 0;
  if (!f) return h || u || c;
  var d = void 0,
    p = e.onError || ce;
  if (h) try {
    var m = t.getMessageFormat(h, i, o);
    d = m.format(r);
  } catch (e) {
    p(le('Error formatting message: "' + c + '" for locale: "' + i + '"' + (u ? ", using default message as fallback." : ""), e));
  } else (!u || i && i.toLowerCase() !== s.toLowerCase()) && p(le('Missing message: "' + c + '" for locale: "' + i + '"' + (u ? ", using default message as fallback." : "")));
  if (!d && u) try {
    var v = t.getMessageFormat(u, s, l);
    d = v.format(r);
  } catch (e) {
    p(le('Error formatting the default message for: "' + c + '"', e));
  }
  return d || p(le('Cannot format message: "' + c + '", using message ' + (h || u ? "source" : "id") + " as fallback.")), d || h || u || c;
}
function Le(e, t, n) {
  var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
    i = Object.keys(r).reduce(function (e, t) {
      var n = r[t];
      return e[t] = "string" === typeof n ? re(n) : n, e;
    }, {});
  return Te(e, t, n, i);
}
var Ae = Object.freeze({
    formatDate: Ee,
    formatTime: Se,
    formatRelative: ke,
    formatNumber: Ce,
    formatPlural: Oe,
    formatMessage: Te,
    formatHTMLMessage: Le
  }),
  Pe = Object.keys(q),
  je = Object.keys(K),
  Me = {
    formats: {},
    messages: {},
    timeZone: null,
    textComponent: "span",
    defaultLocale: "en",
    defaultFormats: {},
    onError: ce
  },
  Re = function (e) {
    function t(e) {
      var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      C(this, t);
      var r = j(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n));
      g()("undefined" !== typeof Intl, "[React Intl] The `Intl` APIs must be available in the runtime, and do not appear to be built-in. An `Intl` polyfill should be loaded.\nSee: http://formatjs.io/guides/runtime-environments/");
      var i = n.intl,
        o = void 0;
      o = isFinite(e.initialNow) ? Number(e.initialNow) : i ? i.now() : Date.now();
      var s = i || {},
        c = s.formatters,
        u = void 0 === c ? {
          getDateTimeFormat: w(Intl.DateTimeFormat),
          getNumberFormat: w(Intl.NumberFormat),
          getMessageFormat: w(a.a),
          getRelativeFormat: w(l.a),
          getPluralFormat: w(me)
        } : c;
      return r.state = L({}, u, {
        now: function () {
          return r._didDisplay ? Date.now() : o;
        }
      }), r;
    }
    return A(t, e), O(t, [{
      key: "getConfig",
      value: function () {
        var e = this.context.intl,
          t = ie(this.props, Pe, e);
        for (var n in Me) void 0 === t[n] && (t[n] = Me[n]);
        if (!E(t.locale)) {
          var r = t,
            i = r.locale,
            o = r.defaultLocale,
            a = r.defaultFormats,
            s = r.onError;
          s(le('Missing locale data for locale: "' + i + '". Using default locale: "' + o + '" as fallback.')), t = L({}, t, {
            locale: o,
            formats: a,
            messages: Me.messages
          });
        }
        return t;
      }
    }, {
      key: "getBoundFormatFns",
      value: function (e, t) {
        return je.reduce(function (n, r) {
          return n[r] = Ae[r].bind(null, e, t), n;
        }, {});
      }
    }, {
      key: "getChildContext",
      value: function () {
        var e = this.getConfig(),
          t = this.getBoundFormatFns(e, this.state),
          n = this.state,
          r = n.now,
          i = P(n, ["now"]);
        return {
          intl: L({}, e, t, {
            formatters: i,
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
        return h["Children"].only(this.props.children);
      }
    }]), t;
  }(h["Component"]);
Re.displayName = "IntlProvider", Re.contextTypes = {
  intl: Y
}, Re.childContextTypes = {
  intl: Y.isRequired
};
var Ne = function (e) {
  function t(e, n) {
    C(this, t);
    var r = j(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n));
    return oe(n), r;
  }
  return A(t, e), O(t, [{
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
        i = r.value,
        o = r.children,
        a = t(i, this.props);
      return "function" === typeof o ? o(a) : f.a.createElement(n, null, a);
    }
  }]), t;
}(h["Component"]);
Ne.displayName = "FormattedDate", Ne.contextTypes = {
  intl: Y
};
var De = function (e) {
  function t(e, n) {
    C(this, t);
    var r = j(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n));
    return oe(n), r;
  }
  return A(t, e), O(t, [{
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
        i = r.value,
        o = r.children,
        a = t(i, this.props);
      return "function" === typeof o ? o(a) : f.a.createElement(n, null, a);
    }
  }]), t;
}(h["Component"]);
De.displayName = "FormattedTime", De.contextTypes = {
  intl: Y
};
var Ie = 1e3,
  $e = 6e4,
  Fe = 36e5,
  Be = 864e5,
  Ve = 2147483647;
function We(e) {
  var t = Math.abs(e);
  return t < $e ? "second" : t < Fe ? "minute" : t < Be ? "hour" : "day";
}
function He(e) {
  switch (e) {
    case "second":
      return Ie;
    case "minute":
      return $e;
    case "hour":
      return Fe;
    case "day":
      return Be;
    default:
      return Ve;
  }
}
function Ue(e, t) {
  if (e === t) return !0;
  var n = new Date(e).getTime(),
    r = new Date(t).getTime();
  return isFinite(n) && isFinite(r) && n === r;
}
var ze = function (e) {
  function t(e, n) {
    C(this, t);
    var r = j(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n));
    oe(n);
    var i = isFinite(e.initialNow) ? Number(e.initialNow) : n.intl.now();
    return r.state = {
      now: i
    }, r;
  }
  return A(t, e), O(t, [{
    key: "scheduleNextUpdate",
    value: function (e, t) {
      var n = this;
      clearTimeout(this._timer);
      var r = e.value,
        i = e.units,
        o = e.updateInterval,
        a = new Date(r).getTime();
      if (o && isFinite(a)) {
        var s = a - t.now,
          l = He(i || We(s)),
          c = Math.abs(s % l),
          u = s < 0 ? Math.max(o, l - c) : Math.max(o, c);
        this._timer = setTimeout(function () {
          n.setState({
            now: n.context.intl.now()
          });
        }, u);
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
      Ue(t, this.props.value) || this.setState({
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
        i = r.value,
        o = r.children,
        a = t(i, L({}, this.props, this.state));
      return "function" === typeof o ? o(a) : f.a.createElement(n, null, a);
    }
  }]), t;
}(h["Component"]);
ze.displayName = "FormattedRelative", ze.contextTypes = {
  intl: Y
}, ze.defaultProps = {
  updateInterval: 1e4
};
var Ge = function (e) {
  function t(e, n) {
    C(this, t);
    var r = j(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n));
    return oe(n), r;
  }
  return A(t, e), O(t, [{
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
        i = r.value,
        o = r.children,
        a = t(i, this.props);
      return "function" === typeof o ? o(a) : f.a.createElement(n, null, a);
    }
  }]), t;
}(h["Component"]);
Ge.displayName = "FormattedNumber", Ge.contextTypes = {
  intl: Y
};
var qe = function (e) {
  function t(e, n) {
    C(this, t);
    var r = j(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n));
    return oe(n), r;
  }
  return A(t, e), O(t, [{
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
        i = r.value,
        o = r.other,
        a = r.children,
        s = t(i, this.props),
        l = this.props[s] || o;
      return "function" === typeof a ? a(l) : f.a.createElement(n, null, l);
    }
  }]), t;
}(h["Component"]);
qe.displayName = "FormattedPlural", qe.contextTypes = {
  intl: Y
}, qe.defaultProps = {
  style: "cardinal"
};
var Ke = function (e, t) {
    return Te({}, {
      getMessageFormat: w(a.a)
    }, e, t);
  },
  Ye = function (e) {
    function t(e, n) {
      C(this, t);
      var r = j(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n));
      return e.defaultMessage || oe(n), r;
    }
    return A(t, e), O(t, [{
      key: "shouldComponentUpdate",
      value: function (e) {
        var t = this.props.values,
          n = e.values;
        if (!ae(n, t)) return !0;
        for (var r = L({}, e, {
            values: t
          }), i = arguments.length, o = Array(i > 1 ? i - 1 : 0), a = 1; a < i; a++) o[a - 1] = arguments[a];
        return se.apply(void 0, [this, r].concat(o));
      }
    }, {
      key: "render",
      value: function () {
        var e = this.context.intl || {},
          t = e.formatMessage,
          n = void 0 === t ? Ke : t,
          r = e.textComponent,
          i = void 0 === r ? "span" : r,
          o = this.props,
          a = o.id,
          s = o.description,
          l = o.defaultMessage,
          c = o.values,
          u = o.tagName,
          f = void 0 === u ? i : u,
          d = o.children,
          p = void 0,
          m = void 0,
          g = void 0,
          v = c && Object.keys(c).length > 0;
        if (v) {
          var y = Math.floor(1099511627776 * Math.random()).toString(16),
            b = function () {
              var e = 0;
              return function () {
                return "ELEMENT-" + y + "-" + (e += 1);
              };
            }();
          p = "@__" + y + "__@", m = {}, g = {}, Object.keys(c).forEach(function (e) {
            var t = c[e];
            if (Object(h["isValidElement"])(t)) {
              var n = b();
              m[e] = p + n + p, g[n] = t;
            } else m[e] = t;
          });
        }
        var w = {
            id: a,
            description: s,
            defaultMessage: l
          },
          x = n(w, m || c),
          _ = void 0,
          E = g && Object.keys(g).length > 0;
        return _ = E ? x.split(p).filter(function (e) {
          return !!e;
        }).map(function (e) {
          return g[e] || e;
        }) : [x], "function" === typeof d ? d.apply(void 0, M(_)) : h["createElement"].apply(void 0, [f, null].concat(M(_)));
      }
    }]), t;
  }(h["Component"]);
Ye.displayName = "FormattedMessage", Ye.contextTypes = {
  intl: Y
}, Ye.defaultProps = {
  values: {}
};
var Xe = function (e) {
  function t(e, n) {
    C(this, t);
    var r = j(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n));
    return oe(n), r;
  }
  return A(t, e), O(t, [{
    key: "shouldComponentUpdate",
    value: function (e) {
      var t = this.props.values,
        n = e.values;
      if (!ae(n, t)) return !0;
      for (var r = L({}, e, {
          values: t
        }), i = arguments.length, o = Array(i > 1 ? i - 1 : 0), a = 1; a < i; a++) o[a - 1] = arguments[a];
      return se.apply(void 0, [this, r].concat(o));
    }
  }, {
    key: "render",
    value: function () {
      var e = this.context.intl,
        t = e.formatHTMLMessage,
        n = e.textComponent,
        r = this.props,
        i = r.id,
        o = r.description,
        a = r.defaultMessage,
        s = r.values,
        l = r.tagName,
        c = void 0 === l ? n : l,
        u = r.children,
        h = {
          id: i,
          description: o,
          defaultMessage: a
        },
        d = t(h, s);
      if ("function" === typeof u) return u(d);
      var p = {
        __html: d
      };
      return f.a.createElement(c, {
        dangerouslySetInnerHTML: p
      });
    }
  }]), t;
}(h["Component"]);
Xe.displayName = "FormattedHTMLMessage", Xe.contextTypes = {
  intl: Y
}, Xe.defaultProps = {
  values: {}
}, _(x), _(i.a);
