let legacyModule = module,
  legacyExports = exports;
var r = require("./3776594a.js"),
  i = require("./696c3471.js"),
  o = require("./4f735664.js"),
  a = require("./41555777.js"),
  s = require("./45545568.js"),
  l = require("./62734472.js"),
  c = Math.max,
  u = Math.min,
  h = Math.floor,
  f = /\$([$&`']|\d\d?|<[^>]*>)/g,
  d = /\$([$&`']|\d\d?)/g,
  p = function (e) {
    return void 0 === e ? e : String(e);
  };
require("./68374769.js")("replace", 2, function (e, t, n, m) {
  return [function (r, i) {
    var o = e(this),
      a = void 0 == r ? void 0 : r[t];
    return void 0 !== a ? a.call(r, o, i) : n.call(String(o), r, i);
  }, function (e, t) {
    var i = m(n, e, this, t);
    if (i.done) return i.value;
    var h = r(e),
      f = String(this),
      d = "function" === typeof t;
    d || (t = String(t));
    var v = h.global;
    if (v) {
      var y = h.unicode;
      h.lastIndex = 0;
    }
    var b = [];
    while (1) {
      var w = l(h, f);
      if (null === w) break;
      if (b.push(w), !v) break;
      var x = String(w[0]);
      "" === x && (h.lastIndex = s(f, o(h.lastIndex), y));
    }
    for (var _ = "", E = 0, S = 0; S < b.length; S++) {
      w = b[S];
      for (var k = String(w[0]), C = c(u(a(w.index), f.length), 0), O = [], T = 1; T < w.length; T++) O.push(p(w[T]));
      var L = w.groups;
      if (d) {
        var A = [k].concat(O, C, f);
        void 0 !== L && A.push(L);
        var P = String(t.apply(void 0, A));
      } else P = g(k, f, C, O, L, t);
      C >= E && (_ += f.slice(E, C) + P, E = C + k.length);
    }
    return _ + f.slice(E);
  }];
  function g(e, t, r, o, a, s) {
    var l = r + e.length,
      c = o.length,
      u = d;
    return void 0 !== a && (a = i(a), u = f), n.call(s, u, function (n, i) {
      var s;
      switch (i.charAt(0)) {
        case "$":
          return "$";
        case "&":
          return e;
        case "`":
          return t.slice(0, r);
        case "'":
          return t.slice(l);
        case "<":
          s = a[i.slice(1, -1)];
          break;
        default:
          var u = +i;
          if (0 === u) return n;
          if (u > c) {
            var f = h(u / 10);
            return 0 === f ? n : f <= c ? void 0 === o[f - 1] ? i.charAt(1) : o[f - 1] + i.charAt(1) : n;
          }
          s = o[u - 1];
      }
      return void 0 === s ? "" : s;
    });
  }
});
