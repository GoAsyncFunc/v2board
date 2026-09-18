let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var r = require("./intlMessageFormatEn.js"),
  o = require("./relativeTimeDifference.js"),
  i = require("./intlRelativeFormatObjectUtils.js");
legacyExports.default = c;
var a = ["second", "second-short", "minute", "minute-short", "hour", "hour-short", "day", "day-short", "month", "month-short", "year", "year-short"],
  s = ["best fit", "numeric"];
function c(e, t) {
  t = t || {}, i.isArray(e) && (e = e.concat()), i.defineProperty(this, "_locale", {
    value: this._resolveLocale(e)
  }), i.defineProperty(this, "_options", {
    value: {
      style: this._resolveStyle(t.style),
      units: this._isValidUnits(t.units) && t.units
    }
  }), i.defineProperty(this, "_locales", {
    value: e
  }), i.defineProperty(this, "_fields", {
    value: this._findFields(this._locale)
  }), i.defineProperty(this, "_messages", {
    value: i.objCreate(null)
  });
  var n = this;
  this.format = function (e, t) {
    return n._format(e, t);
  };
}
i.defineProperty(c, "__localeData__", {
  value: i.objCreate(null)
}), i.defineProperty(c, "__addLocaleData", {
  value: function () {
    for (var e = 0; e < arguments.length; e++) {
      var t = arguments[e];
      if (!t || !t.locale) throw new Error("Locale data provided to IntlRelativeFormat is missing a `locale` property value");
      c.__localeData__[t.locale.toLowerCase()] = t, r.default.__addLocaleData(t);
    }
  }
}), i.defineProperty(c, "defaultLocale", {
  enumerable: !0,
  writable: !0,
  value: void 0
}), i.defineProperty(c, "thresholds", {
  enumerable: !0,
  value: {
    second: 45,
    "second-short": 45,
    minute: 45,
    "minute-short": 45,
    hour: 22,
    "hour-short": 22,
    day: 26,
    "day-short": 26,
    month: 11,
    "month-short": 11
  }
}), c.prototype.resolvedOptions = function () {
  return {
    locale: this._locale,
    style: this._options.style,
    units: this._options.units
  };
}, c.prototype._compileMessage = function (e) {
  var t,
    n = this._locales,
    o = (this._locale, this._fields[e]),
    i = o.relativeTime,
    a = "",
    s = "";
  for (t in i.future) i.future.hasOwnProperty(t) && (a += " " + t + " {" + i.future[t].replace("{0}", "#") + "}");
  for (t in i.past) i.past.hasOwnProperty(t) && (s += " " + t + " {" + i.past[t].replace("{0}", "#") + "}");
  var c = "{when, select, future {{0, plural, " + a + "}}past {{0, plural, " + s + "}}}";
  return new r.default(c, n);
}, c.prototype._getMessage = function (e) {
  var t = this._messages;
  return t[e] || (t[e] = this._compileMessage(e)), t[e];
}, c.prototype._getRelativeUnits = function (e, t) {
  var n = this._fields[t];
  if (n.relative) return n.relative[e];
}, c.prototype._findFields = function (e) {
  var t = c.__localeData__,
    n = t[e.toLowerCase()];
  while (n) {
    if (n.fields) return n.fields;
    n = n.parentLocale && t[n.parentLocale.toLowerCase()];
  }
  throw new Error("Locale data added to IntlRelativeFormat is missing `fields` for :" + e);
}, c.prototype._format = function (e, t) {
  var n = t && void 0 !== t.now ? t.now : i.dateNow();
  if (void 0 === e && (e = n), !isFinite(n)) throw new RangeError("The `now` option provided to IntlRelativeFormat#format() is not in valid range.");
  if (!isFinite(e)) throw new RangeError("The date value provided to IntlRelativeFormat#format() is not in valid range.");
  var r = o.default(n, e),
    a = this._options.units || this._selectUnits(r),
    s = r[a];
  if ("numeric" !== this._options.style) {
    var c = this._getRelativeUnits(s, a);
    if (c) return c;
  }
  return this._getMessage(a).format({
    0: Math.abs(s),
    when: s < 0 ? "past" : "future"
  });
}, c.prototype._isValidUnits = function (e) {
  if (!e || i.arrIndexOf.call(a, e) >= 0) return !0;
  if ("string" === typeof e) {
    var t = /s$/.test(e) && e.substr(0, e.length - 1);
    if (t && i.arrIndexOf.call(a, t) >= 0) throw new Error('"' + e + '" is not a valid IntlRelativeFormat `units` value, did you mean: ' + t);
  }
  throw new Error('"' + e + '" is not a valid IntlRelativeFormat `units` value, it must be one of: "' + a.join('", "') + '"');
}, c.prototype._resolveLocale = function (e) {
  "string" === typeof e && (e = [e]), e = (e || []).concat(c.defaultLocale);
  var t,
    n,
    r,
    o,
    i = c.__localeData__;
  for (t = 0, n = e.length; t < n; t += 1) {
    r = e[t].toLowerCase().split("-");
    while (r.length) {
      if (o = i[r.join("-")], o) return o.locale;
      r.pop();
    }
  }
  var a = e.pop();
  throw new Error("No locale data has been added to IntlRelativeFormat for: " + e.join(", ") + ", or the default locale: " + a);
}, c.prototype._resolveStyle = function (e) {
  if (!e) return s[0];
  if (i.arrIndexOf.call(s, e) >= 0) return e;
  throw new Error('"' + e + '" is not a valid IntlRelativeFormat `style` value, it must be one of: "' + s.join('", "') + '"');
}, c.prototype._selectUnits = function (e) {
  var t,
    n,
    r,
    o = a.filter(function (e) {
      return e.indexOf("-short") < 1;
    });
  for (t = 0, n = o.length; t < n; t += 1) if (r = o[t], Math.abs(e[r]) < c.thresholds[r]) break;
  return r;
};
