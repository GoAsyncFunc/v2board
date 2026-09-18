let legacyModule = module,
  legacyExports = exports;
var r = require("./476f7951.js"),
  i = require("./dateNow.js"),
  o = require("./744c4233.js"),
  a = "Expected a function",
  s = Math.max,
  l = Math.min;
function u(e, t, n) {
  var u,
    c,
    f,
    d,
    h,
    p,
    g = 0,
    m = !1,
    v = !1,
    y = !0;
  if ("function" != typeof e) throw new TypeError(a);
  function b(t) {
    var n = u,
      r = c;
    return u = c = void 0, g = t, d = e.apply(r, n), d;
  }
  function x(e) {
    return g = e, h = setTimeout(O, t), m ? b(e) : d;
  }
  function _(e) {
    var n = e - p,
      r = e - g,
      i = t - n;
    return v ? l(i, f - r) : i;
  }
  function w(e) {
    var n = e - p,
      r = e - g;
    return void 0 === p || n >= t || n < 0 || v && r >= f;
  }
  function O() {
    var e = i();
    if (w(e)) return S(e);
    h = setTimeout(O, _(e));
  }
  function S(e) {
    return h = void 0, y && u ? b(e) : (u = c = void 0, d);
  }
  function k() {
    void 0 !== h && clearTimeout(h), g = 0, u = p = c = h = void 0;
  }
  function j() {
    return void 0 === h ? d : S(i());
  }
  function M() {
    var e = i(),
      n = w(e);
    if (u = arguments, c = this, p = e, n) {
      if (void 0 === h) return x(p);
      if (v) return clearTimeout(h), h = setTimeout(O, t), b(p);
    }
    return void 0 === h && (h = setTimeout(O, t)), d;
  }
  return t = o(t) || 0, r(n) && (m = !!n.leading, v = "maxWait" in n, f = v ? s(o(n.maxWait) || 0, t) : f, y = "trailing" in n ? !!n.trailing : y), M.cancel = k, M.flush = j, M;
}
legacyModule.exports = u;
