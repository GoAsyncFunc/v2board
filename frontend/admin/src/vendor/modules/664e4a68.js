let legacyModule = module,
  legacyExports = exports;
var r = require("./4a625758.js"),
  i = require("./61474a44.js"),
  o = require("./58556569.js"),
  a = require("./5a793533.js");
function s(e, t, n) {
  var r = "string" === typeof e ? s.__parse(e) : e;
  if (!r || "messageFormatPattern" !== r.type) throw new TypeError("A message must be provided as a String or AST.");
  n = this._mergeFormats(s.formats, n), i.defineProperty(this, "_locale", {
    value: this._resolveLocale(t)
  });
  var o = this._findPluralRuleFunction(this._locale),
    a = this._compilePattern(r, t, n, o),
    l = this;
  this.format = function (t) {
    try {
      return l._format(a, t);
    } catch (t) {
      throw t.variableId ? new Error("The intl string context variable '" + t.variableId + "' was not provided to the string '" + e + "'") : t;
    }
  };
}
legacyExports["default"] = s, i.defineProperty(s, "formats", {
  enumerable: !0,
  value: {
    number: {
      currency: {
        style: "currency"
      },
      percent: {
        style: "percent"
      }
    },
    date: {
      short: {
        month: "numeric",
        day: "numeric",
        year: "2-digit"
      },
      medium: {
        month: "short",
        day: "numeric",
        year: "numeric"
      },
      long: {
        month: "long",
        day: "numeric",
        year: "numeric"
      },
      full: {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      }
    },
    time: {
      short: {
        hour: "numeric",
        minute: "numeric"
      },
      medium: {
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      },
      long: {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short"
      },
      full: {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short"
      }
    }
  }
}), i.defineProperty(s, "__localeData__", {
  value: i.objCreate(null)
}), i.defineProperty(s, "__addLocaleData", {
  value: function (e) {
    if (!e || !e.locale) throw new Error("Locale data provided to IntlMessageFormat is missing a `locale` property");
    s.__localeData__[e.locale.toLowerCase()] = e;
  }
}), i.defineProperty(s, "__parse", {
  value: a["default"].parse
}), i.defineProperty(s, "defaultLocale", {
  enumerable: !0,
  writable: !0,
  value: void 0
}), s.prototype.resolvedOptions = function () {
  return {
    locale: this._locale
  };
}, s.prototype._compilePattern = function (e, t, n, r) {
  var i = new o["default"](t, n, r);
  return i.compile(e);
}, s.prototype._findPluralRuleFunction = function (e) {
  var t = s.__localeData__,
    n = t[e.toLowerCase()];
  while (n) {
    if (n.pluralRuleFunction) return n.pluralRuleFunction;
    n = n.parentLocale && t[n.parentLocale.toLowerCase()];
  }
  throw new Error("Locale data added to IntlMessageFormat is missing a `pluralRuleFunction` for :" + e);
}, s.prototype._format = function (e, t) {
  var n,
    i,
    o,
    a,
    s,
    l,
    c = "";
  for (n = 0, i = e.length; n < i; n += 1) if (o = e[n], "string" !== typeof o) {
    if (a = o.id, !t || !r.hop.call(t, a)) throw l = new Error("A value must be provided for: " + a), l.variableId = a, l;
    s = t[a], o.options ? c += this._format(o.getOption(s), t) : c += o.format(s);
  } else c += o;
  return c;
}, s.prototype._mergeFormats = function (e, t) {
  var n,
    o,
    a = {};
  for (n in e) r.hop.call(e, n) && (a[n] = o = i.objCreate(e[n]), t && r.hop.call(t, n) && r.extend(o, t[n]));
  return a;
}, s.prototype._resolveLocale = function (e) {
  "string" === typeof e && (e = [e]), e = (e || []).concat(s.defaultLocale);
  var t,
    n,
    r,
    i,
    o = s.__localeData__;
  for (t = 0, n = e.length; t < n; t += 1) {
    r = e[t].toLowerCase().split("-");
    while (r.length) {
      if (i = o[r.join("-")], i) return i.locale;
      r.pop();
    }
  }
  var a = e.pop();
  throw new Error("No locale data has been added to IntlMessageFormat for: " + e.join(", ") + ", or the default locale: " + a);
};
