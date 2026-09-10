let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var r = Math.round;
function i(e) {
  return 400 * e / 146097;
}
var o = 6e4,
  a = 864e5;
function s(e) {
  var t = new Date(e);
  return t.setHours(0, 0, 0, 0), t;
}
function l(e, t) {
  var n = s(e),
    r = s(t),
    i = n.getTime() - n.getTimezoneOffset() * o,
    l = r.getTime() - r.getTimezoneOffset() * o;
  return Math.round((i - l) / a);
}
function c(e, t) {
  e = +e, t = +t;
  var n = r(t - e),
    o = r(n / 1e3),
    a = r(o / 60),
    s = r(a / 60),
    c = l(t, e),
    u = r(c / 7),
    h = i(c),
    f = r(12 * h),
    d = r(h);
  return {
    millisecond: n,
    second: o,
    "second-short": o,
    minute: a,
    "minute-short": a,
    hour: s,
    "hour-short": s,
    day: c,
    "day-short": c,
    week: u,
    "week-short": u,
    month: f,
    "month-short": f,
    year: d,
    "year-short": d
  };
}
legacyExports.default = c;
