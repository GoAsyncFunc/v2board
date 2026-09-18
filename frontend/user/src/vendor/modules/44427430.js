let legacyModule = module,
  legacyExports = exports;
var r = require("./assertObject.js"),
  o = require("./696c3471.js"),
  i = require("./4f735664.js"),
  a = require("./41555777.js"),
  s = require("./45545568.js"),
  c = require("./62734472.js"),
  u = Math.max,
  l = Math.min,
  f = Math.floor,
  p = /\$([$&`']|\d\d?|<[^>]*>)/g,
  d = /\$([$&`']|\d\d?)/g,
  h = function (e) {
    return void 0 === e ? e : String(e);
  };
require("./68374769.js")("replace", 2, function (e, t, n, m) {
  return [function (r, o) {
    var i = e(this),
      a = void 0 == r ? void 0 : r[t];
    return void 0 !== a ? a.call(r, i, o) : n.call(String(i), r, o);
  }, function (e, t) {
    var o = m(n, e, this, t);
    if (o.done) return o.value;
    var f = r(e),
      p = String(this),
      d = "function" === typeof t;
    d || (t = String(t));
    var y = f.global;
    if (y) {
      var g = f.unicode;
      f.lastIndex = 0;
    }
    var b = [];
    while (1) {
      var w = c(f, p);
      if (null === w) break;
      if (b.push(w), !y) break;
      var x = String(w[0]);
      "" === x && (f.lastIndex = s(p, i(f.lastIndex), g));
    }
    for (var O = "", E = 0, _ = 0; _ < b.length; _++) {
      w = b[_];
      for (var k = String(w[0]), S = u(l(a(w.index), p.length), 0), C = [], j = 1; j < w.length; j++) C.push(h(w[j]));
      var P = w.groups;
      if (d) {
        var T = [k].concat(C, S, p);
        void 0 !== P && T.push(P);
        var L = String(t.apply(void 0, T));
      } else L = v(k, p, S, C, P, t);
      S >= E && (O += p.slice(E, S) + L, E = S + k.length);
    }
    return O + p.slice(E);
  }];
  function v(e, t, r, i, a, s) {
    var c = r + e.length,
      u = i.length,
      l = d;
    return void 0 !== a && (a = o(a), l = p), n.call(s, l, function (n, o) {
      var s;
      switch (o.charAt(0)) {
        case "$":
          return "$";
        case "&":
          return e;
        case "`":
          return t.slice(0, r);
        case "'":
          return t.slice(c);
        case "<":
          s = a[o.slice(1, -1)];
          break;
        default:
          var l = +o;
          if (0 === l) return n;
          if (l > u) {
            var p = f(l / 10);
            return 0 === p ? n : p <= u ? void 0 === i[p - 1] ? o.charAt(1) : i[p - 1] + o.charAt(1) : n;
          }
          s = i[l - 1];
      }
      return void 0 === s ? "" : s;
    });
  }
});
