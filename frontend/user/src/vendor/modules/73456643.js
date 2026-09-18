let legacyModule = module,
  legacyExports = exports;
var r = require("./isObjectValue.js"),
  i = require("./dateNow.js"),
  a = require("./744c4233.js"),
  o = "Expected a function",
  u = Math.max,
  l = Math.min;
function s(e, t, n) {
  var s,
    c,
    f,
    d,
    h,
    p,
    m = 0,
    v = !1,
    g = !1,
    y = !0;
  if ("function" != typeof e) throw new TypeError(o);
  function b(t) {
    var n = s,
      r = c;
    return s = c = void 0, m = t, d = e.apply(r, n), d;
  }
  function _(e) {
    return m = e, h = setTimeout(S, t), v ? b(e) : d;
  }
  function w(e) {
    var n = e - p,
      r = e - m,
      i = t - n;
    return g ? l(i, f - r) : i;
  }
  function k(e) {
    var n = e - p,
      r = e - m;
    return void 0 === p || n >= t || n < 0 || g && r >= f;
  }
  function S() {
    var e = i();
    if (k(e)) return x(e);
    h = setTimeout(S, w(e));
  }
  function x(e) {
    return h = void 0, y && s ? b(e) : (s = c = void 0, d);
  }
  function T() {
    void 0 !== h && clearTimeout(h), m = 0, s = p = c = h = void 0;
  }
  function E() {
    return void 0 === h ? d : x(i());
  }
  function M() {
    var e = i(),
      n = k(e);
    if (s = arguments, c = this, p = e, n) {
      if (void 0 === h) return _(p);
      if (g) return clearTimeout(h), h = setTimeout(S, t), b(p);
    }
    return void 0 === h && (h = setTimeout(S, t)), d;
  }
  return t = a(t) || 0, r(n) && (v = !!n.leading, g = "maxWait" in n, f = g ? u(a(n.maxWait) || 0, t) : f, y = "trailing" in n ? !!n.trailing : y), M.cancel = T, M.flush = E, M;
}
legacyModule.exports = s;
