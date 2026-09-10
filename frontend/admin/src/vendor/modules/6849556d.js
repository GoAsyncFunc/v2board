let legacyModule = module,
  legacyExports = exports;
var r = require("./6f463132.js"),
  i = require("./3776594a.js"),
  o = require("./56657959.js"),
  a = require("./45545568.js"),
  s = require("./4f735664.js"),
  l = require("./62734472.js"),
  c = require("./33333070.js"),
  u = require("./77555779.js"),
  h = Math.min,
  f = [].push,
  d = "split",
  p = "length",
  m = "lastIndex",
  g = 4294967295,
  v = !u(function () {
    RegExp(g, "y");
  });
require("./68374769.js")("split", 2, function (e, t, n, u) {
  var y;
  return y = "c" == "abbc"[d](/(b)*/)[1] || 4 != "test"[d](/(?:)/, -1)[p] || 2 != "ab"[d](/(?:ab)*/)[p] || 4 != "."[d](/(.?)(.?)/)[p] || "."[d](/()()/)[p] > 1 || ""[d](/.?/)[p] ? function (e, t) {
    var i = String(this);
    if (void 0 === e && 0 === t) return [];
    if (!r(e)) return n.call(i, e, t);
    var o,
      a,
      s,
      l = [],
      u = (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.unicode ? "u" : "") + (e.sticky ? "y" : ""),
      h = 0,
      d = void 0 === t ? g : t >>> 0,
      v = new RegExp(e.source, u + "g");
    while (o = c.call(v, i)) {
      if (a = v[m], a > h && (l.push(i.slice(h, o.index)), o[p] > 1 && o.index < i[p] && f.apply(l, o.slice(1)), s = o[0][p], h = a, l[p] >= d)) break;
      v[m] === o.index && v[m]++;
    }
    return h === i[p] ? !s && v.test("") || l.push("") : l.push(i.slice(h)), l[p] > d ? l.slice(0, d) : l;
  } : "0"[d](void 0, 0)[p] ? function (e, t) {
    return void 0 === e && 0 === t ? [] : n.call(this, e, t);
  } : n, [function (n, r) {
    var i = e(this),
      o = void 0 == n ? void 0 : n[t];
    return void 0 !== o ? o.call(n, i, r) : y.call(String(i), n, r);
  }, function (e, t) {
    var r = u(y, e, this, t, y !== n);
    if (r.done) return r.value;
    var c = i(e),
      f = String(this),
      d = o(c, RegExp),
      p = c.unicode,
      m = (c.ignoreCase ? "i" : "") + (c.multiline ? "m" : "") + (c.unicode ? "u" : "") + (v ? "y" : "g"),
      b = new d(v ? c : "^(?:" + c.source + ")", m),
      w = void 0 === t ? g : t >>> 0;
    if (0 === w) return [];
    if (0 === f.length) return null === l(b, f) ? [f] : [];
    var x = 0,
      _ = 0,
      E = [];
    while (_ < f.length) {
      b.lastIndex = v ? _ : 0;
      var S,
        k = l(b, v ? f : f.slice(_));
      if (null === k || (S = h(s(b.lastIndex + (v ? 0 : _)), f.length)) === x) _ = a(f, _, p);else {
        if (E.push(f.slice(x, _)), E.length === w) return E;
        for (var C = 1; C <= k.length - 1; C++) if (E.push(k[C]), E.length === w) return E;
        _ = x = S;
      }
    }
    return E.push(f.slice(x)), E;
  }];
});
