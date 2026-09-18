let legacyModule = module,
  legacyExports = exports;
var r = require("./extend.js"),
  o = require("./messageFormatObjectUtils.js"),
  i = require("./messageFormatCompiler.js"),
  a = require("./messageFormatParser.js");
function s(e, t, n) {
  var r = "string" === typeof e ? s.__parse(e) : e;
  if (!r || "messageFormatPattern" !== r.type) throw new TypeError("A message must be provided as a String or AST.");
  n = this._mergeFormats(s.formats, n), o.defineProperty(this, "_locale", {
    value: this._resolveLocale(t)
  });
  var i = this._findPluralRuleFunction(this._locale),
    a = this._compilePattern(r, t, n, i),
    c = this;
  this.format = function (t) {
    try {
      return c._format(a, t);
    } catch (t) {
      throw t.variableId ? new Error("The intl string context variable '" + t.variableId + "' was not provided to the string '" + e + "'") : t;
    }
  };
}
legacyExports["default"] = s, o.defineProperty(s, "formats", {
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
}), o.defineProperty(s, "__localeData__", {
  value: o.objCreate(null)
}), o.defineProperty(s, "__addLocaleData", {
  value: function (e) {
    if (!e || !e.locale) throw new Error("Locale data provided to IntlMessageFormat is missing a `locale` property");
    s.__localeData__[e.locale.toLowerCase()] = e;
  }
}), o.defineProperty(s, "__parse", {
  value: a["default"].parse
}), o.defineProperty(s, "defaultLocale", {
  enumerable: !0,
  writable: !0,
  value: void 0
}), s.prototype.resolvedOptions = function () {
  return {
    locale: this._locale
  };
}, s.prototype._compilePattern = function (e, t, n, r) {
  var o = new i["default"](t, n, r);
  return o.compile(e);
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
    o,
    i,
    a,
    s,
    c,
    u = "";
  for (n = 0, o = e.length; n < o; n += 1) if (i = e[n], "string" !== typeof i) {
    if (a = i.id, !t || !r.hop.call(t, a)) throw c = new Error("A value must be provided for: " + a), c.variableId = a, c;
    s = t[a], i.options ? u += this._format(i.getOption(s), t) : u += i.format(s);
  } else u += i;
  return u;
}, s.prototype._mergeFormats = function (e, t) {
  var n,
    i,
    a = {};
  for (n in e) r.hop.call(e, n) && (a[n] = i = o.objCreate(e[n]), t && r.hop.call(t, n) && r.extend(i, t[n]));
  return a;
}, s.prototype._resolveLocale = function (e) {
  "string" === typeof e && (e = [e]), e = (e || []).concat(s.defaultLocale);
  var t,
    n,
    r,
    o,
    i = s.__localeData__;
  for (t = 0, n = e.length; t < n; t += 1) {
    r = e[t].toLowerCase().split("-");
    while (r.length) {
      if (o = i[r.join("-")], o) return o.locale;
      r.pop();
    }
  }
  var a = e.pop();
  throw new Error("No locale data has been added to IntlMessageFormat for: " + e.join(", ") + ", or the default locale: " + a);
};
