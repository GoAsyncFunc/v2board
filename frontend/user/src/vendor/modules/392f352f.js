let legacyModule = module,
  legacyExports = exports;
(function (t) {
  var n = "Expected a function",
    r = NaN,
    o = "[object Symbol]",
    i = /^\s+|\s+$/g,
    a = /^[-+]0x[0-9a-f]+$/i,
    s = /^0b[01]+$/i,
    c = /^0o[0-7]+$/i,
    u = parseInt,
    l = "object" == typeof t && t && t.Object === Object && t,
    f = "object" == typeof self && self && self.Object === Object && self,
    p = l || f || Function("return this")(),
    d = Object.prototype,
    h = d.toString,
    m = Math.max,
    v = Math.min,
    y = function () {
      return p.Date.now();
    };
  function g(e, t, r) {
    var o,
      i,
      a,
      s,
      c,
      u,
      l = 0,
      f = !1,
      p = !1,
      d = !0;
    if ("function" != typeof e) throw new TypeError(n);
    function h(t) {
      var n = o,
        r = i;
      return o = i = void 0, l = t, s = e.apply(r, n), s;
    }
    function g(e) {
      return l = e, c = setTimeout(E, t), f ? h(e) : s;
    }
    function w(e) {
      var n = e - u,
        r = e - l,
        o = t - n;
      return p ? v(o, a - r) : o;
    }
    function x(e) {
      var n = e - u,
        r = e - l;
      return void 0 === u || n >= t || n < 0 || p && r >= a;
    }
    function E() {
      var e = y();
      if (x(e)) return _(e);
      c = setTimeout(E, w(e));
    }
    function _(e) {
      return c = void 0, d && o ? h(e) : (o = i = void 0, s);
    }
    function k() {
      void 0 !== c && clearTimeout(c), l = 0, o = u = i = c = void 0;
    }
    function S() {
      return void 0 === c ? s : _(y());
    }
    function C() {
      var e = y(),
        n = x(e);
      if (o = arguments, i = this, u = e, n) {
        if (void 0 === c) return g(u);
        if (p) return c = setTimeout(E, t), h(u);
      }
      return void 0 === c && (c = setTimeout(E, t)), s;
    }
    return t = O(t) || 0, b(r) && (f = !!r.leading, p = "maxWait" in r, a = p ? m(O(r.maxWait) || 0, t) : a, d = "trailing" in r ? !!r.trailing : d), C.cancel = k, C.flush = S, C;
  }
  function b(e) {
    var t = typeof e;
    return !!e && ("object" == t || "function" == t);
  }
  function w(e) {
    return !!e && "object" == typeof e;
  }
  function x(e) {
    return "symbol" == typeof e || w(e) && h.call(e) == o;
  }
  function O(e) {
    if ("number" == typeof e) return e;
    if (x(e)) return r;
    if (b(e)) {
      var t = "function" == typeof e.valueOf ? e.valueOf() : e;
      e = b(t) ? t + "" : t;
    }
    if ("string" != typeof e) return 0 === e ? e : +e;
    e = e.replace(i, "");
    var n = s.test(e);
    return n || c.test(e) ? u(e.slice(2), n ? 2 : 8) : a.test(e) ? r : +e;
  }
  legacyModule.exports = g;
}).call(this, require("./globalObjectLegacy.js"));
