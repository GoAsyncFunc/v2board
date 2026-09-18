let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var r = require("./intlMessageFormatEn.js"),
  i = require("./relativeTimeDifference.js"),
  o = require("./6f624455.js");
legacyExports.default = l;
var a = ["second", "second-short", "minute", "minute-short", "hour", "hour-short", "day", "day-short", "month", "month-short", "year", "year-short"],
  s = ["best fit", "numeric"];
function l(e, t) {
  t = t || {}, o.isArray(e) && (e = e.concat()), o.defineProperty(this, "_locale", {
    value: this._resolveLocale(e)
  }), o.defineProperty(this, "_options", {
    value: {
      style: this._resolveStyle(t.style),
      units: this._isValidUnits(t.units) && t.units
    }
  }), o.defineProperty(this, "_locales", {
    value: e
  }), o.defineProperty(this, "_fields", {
    value: this._findFields(this._locale)
  }), o.defineProperty(this, "_messages", {
    value: o.objCreate(null)
  });
  var n = this;
  this.format = function (e, t) {
    return n._format(e, t);
  };
}
o.defineProperty(l, "__localeData__", {
  value: o.objCreate(null)
}), o.defineProperty(l, "__addLocaleData", {
  value: function () {
    for (var e = 0; e < arguments.length; e++) {
      var t = arguments[e];
      if (!t || !t.locale) throw new Error("Locale data provided to IntlRelativeFormat is missing a `locale` property value");
      l.__localeData__[t.locale.toLowerCase()] = t, r.default.__addLocaleData(t);
    }
  }
}), o.defineProperty(l, "defaultLocale", {
  enumerable: !0,
  writable: !0,
  value: void 0
}), o.defineProperty(l, "thresholds", {
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
}), l.prototype.resolvedOptions = function () {
  return {
    locale: this._locale,
    style: this._options.style,
    units: this._options.units
  };
}, l.prototype._compileMessage = function (e) {
  var t,
    n = this._locales,
    i = (this._locale, this._fields[e]),
    o = i.relativeTime,
    a = "",
    s = "";
  for (t in o.future) o.future.hasOwnProperty(t) && (a += " " + t + " {" + o.future[t].replace("{0}", "#") + "}");
  for (t in o.past) o.past.hasOwnProperty(t) && (s += " " + t + " {" + o.past[t].replace("{0}", "#") + "}");
  var l = "{when, select, future {{0, plural, " + a + "}}past {{0, plural, " + s + "}}}";
  return new r.default(l, n);
}, l.prototype._getMessage = function (e) {
  var t = this._messages;
  return t[e] || (t[e] = this._compileMessage(e)), t[e];
}, l.prototype._getRelativeUnits = function (e, t) {
  var n = this._fields[t];
  if (n.relative) return n.relative[e];
}, l.prototype._findFields = function (e) {
  var t = l.__localeData__,
    n = t[e.toLowerCase()];
  while (n) {
    if (n.fields) return n.fields;
    n = n.parentLocale && t[n.parentLocale.toLowerCase()];
  }
  throw new Error("Locale data added to IntlRelativeFormat is missing `fields` for :" + e);
}, l.prototype._format = function (e, t) {
  var n = t && void 0 !== t.now ? t.now : o.dateNow();
  if (void 0 === e && (e = n), !isFinite(n)) throw new RangeError("The `now` option provided to IntlRelativeFormat#format() is not in valid range.");
  if (!isFinite(e)) throw new RangeError("The date value provided to IntlRelativeFormat#format() is not in valid range.");
  var r = i.default(n, e),
    a = this._options.units || this._selectUnits(r),
    s = r[a];
  if ("numeric" !== this._options.style) {
    var l = this._getRelativeUnits(s, a);
    if (l) return l;
  }
  return this._getMessage(a).format({
    0: Math.abs(s),
    when: s < 0 ? "past" : "future"
  });
}, l.prototype._isValidUnits = function (e) {
  if (!e || o.arrIndexOf.call(a, e) >= 0) return !0;
  if ("string" === typeof e) {
    var t = /s$/.test(e) && e.substr(0, e.length - 1);
    if (t && o.arrIndexOf.call(a, t) >= 0) throw new Error('"' + e + '" is not a valid IntlRelativeFormat `units` value, did you mean: ' + t);
  }
  throw new Error('"' + e + '" is not a valid IntlRelativeFormat `units` value, it must be one of: "' + a.join('", "') + '"');
}, l.prototype._resolveLocale = function (e) {
  "string" === typeof e && (e = [e]), e = (e || []).concat(l.defaultLocale);
  var t,
    n,
    r,
    i,
    o = l.__localeData__;
  for (t = 0, n = e.length; t < n; t += 1) {
    r = e[t].toLowerCase().split("-");
    while (r.length) {
      if (i = o[r.join("-")], i) return i.locale;
      r.pop();
    }
  }
  var a = e.pop();
  throw new Error("No locale data has been added to IntlRelativeFormat for: " + e.join(", ") + ", or the default locale: " + a);
}, l.prototype._resolveStyle = function (e) {
  if (!e) return s[0];
  if (o.arrIndexOf.call(s, e) >= 0) return e;
  throw new Error('"' + e + '" is not a valid IntlRelativeFormat `style` value, it must be one of: "' + s.join('", "') + '"');
}, l.prototype._selectUnits = function (e) {
  var t,
    n,
    r,
    i = a.filter(function (e) {
      return e.indexOf("-short") < 1;
    });
  for (t = 0, n = i.length; t < n; t += 1) if (r = i[t], Math.abs(e[r]) < l.thresholds[r]) break;
  return r;
};
