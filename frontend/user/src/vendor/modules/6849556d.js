let legacyModule = module,
  legacyExports = exports;
var r = require("./6f463132.js"),
  o = require("./assertObject.js"),
  i = require("./56657959.js"),
  a = require("./45545568.js"),
  s = require("./4f735664.js"),
  c = require("./62734472.js"),
  u = require("./33333070.js"),
  l = require("./77555779.js"),
  f = Math.min,
  p = [].push,
  d = "split",
  h = "length",
  m = "lastIndex",
  v = 4294967295,
  y = !l(function () {
    RegExp(v, "y");
  });
require("./68374769.js")("split", 2, function (e, t, n, l) {
  var g;
  return g = "c" == "abbc"[d](/(b)*/)[1] || 4 != "test"[d](/(?:)/, -1)[h] || 2 != "ab"[d](/(?:ab)*/)[h] || 4 != "."[d](/(.?)(.?)/)[h] || "."[d](/()()/)[h] > 1 || ""[d](/.?/)[h] ? function (e, t) {
    var o = String(this);
    if (void 0 === e && 0 === t) return [];
    if (!r(e)) return n.call(o, e, t);
    var i,
      a,
      s,
      c = [],
      l = (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.unicode ? "u" : "") + (e.sticky ? "y" : ""),
      f = 0,
      d = void 0 === t ? v : t >>> 0,
      y = new RegExp(e.source, l + "g");
    while (i = u.call(y, o)) {
      if (a = y[m], a > f && (c.push(o.slice(f, i.index)), i[h] > 1 && i.index < o[h] && p.apply(c, i.slice(1)), s = i[0][h], f = a, c[h] >= d)) break;
      y[m] === i.index && y[m]++;
    }
    return f === o[h] ? !s && y.test("") || c.push("") : c.push(o.slice(f)), c[h] > d ? c.slice(0, d) : c;
  } : "0"[d](void 0, 0)[h] ? function (e, t) {
    return void 0 === e && 0 === t ? [] : n.call(this, e, t);
  } : n, [function (n, r) {
    var o = e(this),
      i = void 0 == n ? void 0 : n[t];
    return void 0 !== i ? i.call(n, o, r) : g.call(String(o), n, r);
  }, function (e, t) {
    var r = l(g, e, this, t, g !== n);
    if (r.done) return r.value;
    var u = o(e),
      p = String(this),
      d = i(u, RegExp),
      h = u.unicode,
      m = (u.ignoreCase ? "i" : "") + (u.multiline ? "m" : "") + (u.unicode ? "u" : "") + (y ? "y" : "g"),
      b = new d(y ? u : "^(?:" + u.source + ")", m),
      w = void 0 === t ? v : t >>> 0;
    if (0 === w) return [];
    if (0 === p.length) return null === c(b, p) ? [p] : [];
    var x = 0,
      O = 0,
      E = [];
    while (O < p.length) {
      b.lastIndex = y ? O : 0;
      var _,
        k = c(b, y ? p : p.slice(O));
      if (null === k || (_ = f(s(b.lastIndex + (y ? 0 : O)), p.length)) === x) O = a(p, O, h);else {
        if (E.push(p.slice(x, O)), E.length === w) return E;
        for (var S = 1; S <= k.length - 1; S++) if (E.push(k[S]), E.length === w) return E;
        O = x = _;
      }
    }
    return E.push(p.slice(x)), E;
  }];
});
