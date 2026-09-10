let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var r = Math.round;
function o(e) {
  return 400 * e / 146097;
}
var i = 6e4,
  a = 864e5;
function s(e) {
  var t = new Date(e);
  return t.setHours(0, 0, 0, 0), t;
}
function c(e, t) {
  var n = s(e),
    r = s(t),
    o = n.getTime() - n.getTimezoneOffset() * i,
    c = r.getTime() - r.getTimezoneOffset() * i;
  return Math.round((o - c) / a);
}
function u(e, t) {
  e = +e, t = +t;
  var n = r(t - e),
    i = r(n / 1e3),
    a = r(i / 60),
    s = r(a / 60),
    u = c(t, e),
    l = r(u / 7),
    f = o(u),
    p = r(12 * f),
    d = r(f);
  return {
    millisecond: n,
    second: i,
    "second-short": i,
    minute: a,
    "minute-short": a,
    hour: s,
    "hour-short": s,
    day: u,
    "day-short": u,
    week: l,
    "week-short": l,
    month: p,
    "month-short": p,
    year: d,
    "year-short": d
  };
}
legacyExports.default = u;
