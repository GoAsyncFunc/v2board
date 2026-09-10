let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "d", function () {
  return s;
}), defineExport(legacyExports, "c", function () {
  return l;
}), defineExport(legacyExports, "b", function () {
  return u;
}), defineExport(legacyExports, "a", function () {
  return c;
}), defineExport(legacyExports, "e", function () {
  return f;
}), defineExport(legacyExports, "i", function () {
  return p;
}), defineExport(legacyExports, "B", function () {
  return m;
}), defineExport(legacyExports, "y", function () {
  return v;
}), defineExport(legacyExports, "m", function () {
  return y;
}), defineExport(legacyExports, "q", function () {
  return b;
}), defineExport(legacyExports, "l", function () {
  return x;
}), defineExport(legacyExports, "h", function () {
  return _;
}), defineExport(legacyExports, "r", function () {
  return w;
}), defineExport(legacyExports, "n", function () {
  return S;
}), defineExport(legacyExports, "j", function () {
  return k;
}), defineExport(legacyExports, "w", function () {
  return j;
}), defineExport(legacyExports, "f", function () {
  return M;
}), defineExport(legacyExports, "o", function () {
  return C;
}), defineExport(legacyExports, "u", function () {
  return T;
}), defineExport(legacyExports, "z", function () {
  return I;
}), defineExport(legacyExports, "s", function () {
  return D;
}), defineExport(legacyExports, "k", function () {
  return A;
}), defineExport(legacyExports, "x", function () {
  return E;
}), defineExport(legacyExports, "g", function () {
  return P;
}), defineExport(legacyExports, "p", function () {
  return L;
}), defineExport(legacyExports, "v", function () {
  return N;
}), defineExport(legacyExports, "A", function () {
  return R;
}), defineExport(legacyExports, "t", function () {
  return z;
});
var r = require("./62597459.js"),
  i = require("./4f454c42.js"),
  o = require("./37316b68.js"),
  a = require("./51786b74.js"),
  s = 1e3,
  l = 60 * s,
  u = 60 * l,
  c = 24 * u,
  f = 365 * c,
  d = {
    year: "{yyyy}",
    month: "{MMM}",
    day: "{d}",
    hour: "{HH}:{mm}",
    minute: "{HH}:{mm}",
    second: "{HH}:{mm}:{ss}",
    millisecond: "{HH}:{mm}:{ss} {SSS}",
    none: "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss} {SSS}"
  },
  h = "{yyyy}-{MM}-{dd}",
  p = {
    year: "{yyyy}",
    month: "{yyyy}-{MM}",
    day: h,
    hour: h + " " + d.hour,
    minute: h + " " + d.minute,
    second: h + " " + d.second,
    millisecond: d.none
  },
  g = ["year", "month", "day", "hour", "minute", "second", "millisecond"],
  m = ["year", "half-year", "quarter", "month", "week", "half-week", "day", "half-day", "quarter-day", "hour", "minute", "second", "millisecond"];
function v(e, t) {
  return e += "", "0000".substr(0, t - e.length) + e;
}
function y(e) {
  switch (e) {
    case "half-year":
    case "quarter":
      return "month";
    case "week":
    case "half-week":
      return "day";
    case "half-day":
    case "quarter-day":
      return "hour";
    default:
      return e;
  }
}
function b(e) {
  return e === y(e);
}
function x(e) {
  switch (e) {
    case "year":
    case "month":
      return "day";
    case "millisecond":
      return "millisecond";
    default:
      return "second";
  }
}
function _(e, t, n, r) {
  var s = i["l"](e),
    l = s[k(n)](),
    u = s[j(n)]() + 1,
    c = Math.floor((u - 1) / 3) + 1,
    f = s[M(n)](),
    d = s["get" + (n ? "UTC" : "") + "Day"](),
    h = s[C(n)](),
    p = (h - 1) % 12 + 1,
    g = s[T(n)](),
    m = s[I(n)](),
    y = s[D(n)](),
    b = r instanceof a["a"] ? r : Object(o["d"])(r || o["a"]) || Object(o["c"])(),
    x = b.getModel("time"),
    _ = x.get("month"),
    w = x.get("monthAbbr"),
    O = x.get("dayOfWeek"),
    S = x.get("dayOfWeekAbbr");
  return (t || "").replace(/{yyyy}/g, l + "").replace(/{yy}/g, l % 100 + "").replace(/{Q}/g, c + "").replace(/{MMMM}/g, _[u - 1]).replace(/{MMM}/g, w[u - 1]).replace(/{MM}/g, v(u, 2)).replace(/{M}/g, u + "").replace(/{dd}/g, v(f, 2)).replace(/{d}/g, f + "").replace(/{eeee}/g, O[d]).replace(/{ee}/g, S[d]).replace(/{e}/g, d + "").replace(/{HH}/g, v(h, 2)).replace(/{H}/g, h + "").replace(/{hh}/g, v(p + "", 2)).replace(/{h}/g, p + "").replace(/{mm}/g, v(g, 2)).replace(/{m}/g, g + "").replace(/{ss}/g, v(m, 2)).replace(/{s}/g, m + "").replace(/{SSS}/g, v(y, 3)).replace(/{S}/g, y + "");
}
function w(e, t, n, i, o) {
  var a = null;
  if (r["y"](n)) a = n;else if (r["u"](n)) a = n(e.value, t, {
    level: e.level
  });else {
    var s = r["l"]({}, d);
    if (e.level > 0) for (var l = 0; l < g.length; ++l) s[g[l]] = "{primary|" + s[g[l]] + "}";
    var u = n ? !1 === n.inherit ? n : r["i"](n, s) : s,
      c = O(e.value, o);
    if (u[c]) a = u[c];else if (u.inherit) {
      var f = m.indexOf(c);
      for (l = f - 1; l >= 0; --l) if (u[c]) {
        a = u[c];
        break;
      }
      a = a || s.none;
    }
    if (r["r"](a)) {
      var h = null == e.level ? 0 : e.level >= 0 ? e.level : a.length + e.level;
      h = Math.min(h, a.length - 1), a = a[h];
    }
  }
  return _(new Date(e.value), a, o, i);
}
function O(e, t) {
  var n = i["l"](e),
    r = n[j(t)]() + 1,
    o = n[M(t)](),
    a = n[C(t)](),
    s = n[T(t)](),
    l = n[I(t)](),
    u = n[D(t)](),
    c = 0 === u,
    f = c && 0 === l,
    d = f && 0 === s,
    h = d && 0 === a,
    p = h && 1 === o,
    g = p && 1 === r;
  return g ? "year" : p ? "month" : h ? "day" : d ? "hour" : f ? "minute" : c ? "second" : "millisecond";
}
function S(e, t, n) {
  var o = r["w"](e) ? i["l"](e) : e;
  switch (t = t || O(e, n), t) {
    case "year":
      return o[k(n)]();
    case "half-year":
      return o[j(n)]() >= 6 ? 1 : 0;
    case "quarter":
      return Math.floor((o[j(n)]() + 1) / 4);
    case "month":
      return o[j(n)]();
    case "day":
      return o[M(n)]();
    case "half-day":
      return o[C(n)]() / 24;
    case "hour":
      return o[C(n)]();
    case "minute":
      return o[T(n)]();
    case "second":
      return o[I(n)]();
    case "millisecond":
      return o[D(n)]();
  }
}
function k(e) {
  return e ? "getUTCFullYear" : "getFullYear";
}
function j(e) {
  return e ? "getUTCMonth" : "getMonth";
}
function M(e) {
  return e ? "getUTCDate" : "getDate";
}
function C(e) {
  return e ? "getUTCHours" : "getHours";
}
function T(e) {
  return e ? "getUTCMinutes" : "getMinutes";
}
function I(e) {
  return e ? "getUTCSeconds" : "getSeconds";
}
function D(e) {
  return e ? "getUTCMilliseconds" : "getMilliseconds";
}
function A(e) {
  return e ? "setUTCFullYear" : "setFullYear";
}
function E(e) {
  return e ? "setUTCMonth" : "setMonth";
}
function P(e) {
  return e ? "setUTCDate" : "setDate";
}
function L(e) {
  return e ? "setUTCHours" : "setHours";
}
function N(e) {
  return e ? "setUTCMinutes" : "setMinutes";
}
function R(e) {
  return e ? "setUTCSeconds" : "setSeconds";
}
function z(e) {
  return e ? "setUTCMilliseconds" : "setMilliseconds";
}
