let legacyModule = module,
  legacyExports = exports;
const {
  defineExport,
  interopDefault
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "e", function () {
  return l;
}), defineExport(legacyExports, "d", function () {
  return c;
}), defineExport(legacyExports, "f", function () {
  return u;
}), defineExport(legacyExports, "b", function () {
  return h;
}), defineExport(legacyExports, "h", function () {
  return f;
}), defineExport(legacyExports, "c", function () {
  return d;
}), defineExport(legacyExports, "g", function () {
  return g;
}), defineExport(legacyExports, "a", function () {
  return v;
});
var r = require("./51624c5a.js"),
  i = interopDefault(r),
  o = require("./momentRuntime.js"),
  a = interopDefault(o),
  s = {
    disabledHours: function () {
      return [];
    },
    disabledMinutes: function () {
      return [];
    },
    disabledSeconds: function () {
      return [];
    }
  };
function l(e) {
  var t = a()();
  return t.locale(e.locale()).utcOffset(e.utcOffset()), t;
}
function c(e) {
  return e.format("LL");
}
function u(e) {
  var t = l(e);
  return c(t);
}
function h(e) {
  var t = e.locale(),
    n = e.localeData();
  return n["zh-cn" === t ? "months" : "monthsShort"](e);
}
function f(e, t) {
  a.a.isMoment(e) && a.a.isMoment(t) && (t.hour(e.hour()), t.minute(e.minute()), t.second(e.second()), t.millisecond(e.millisecond()));
}
function d(e, t) {
  var n = t ? t(e) : {};
  return n = i()({}, s, n), n;
}
function p(e, t) {
  var n = !1;
  if (e) {
    var r = e.hour(),
      i = e.minute(),
      o = e.second(),
      a = t.disabledHours();
    if (-1 === a.indexOf(r)) {
      var s = t.disabledMinutes(r);
      if (-1 === s.indexOf(i)) {
        var l = t.disabledSeconds(r, i);
        n = -1 !== l.indexOf(o);
      } else n = !0;
    } else n = !0;
  }
  return !n;
}
function m(e, t) {
  var n = d(e, t);
  return p(e, n);
}
function g(e, t, n) {
  return (!t || !t(e)) && !(n && !m(e, n));
}
function v(e, t) {
  return e ? (Array.isArray(t) && (t = t[0]), e.format(t)) : "";
}
