let legacyModule = module,
  legacyExports = exports;
var n = this && this.__importDefault || function (e) {
  return e && e.__esModule ? e : {
    default: e
  };
};
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var r = n(require("./5a737337.js")),
  o = 2,
  l = 16,
  a = 5,
  i = 5,
  u = 15,
  s = 5,
  h = 4;
function f(e, t, c) {
  var n;
  return n = Math.round(e.h) >= 60 && Math.round(e.h) <= 240 ? c ? Math.round(e.h) - o * t : Math.round(e.h) + o * t : c ? Math.round(e.h) + o * t : Math.round(e.h) - o * t, n < 0 ? n += 360 : n >= 360 && (n -= 360), n;
}
function v(e, t, c) {
  return 0 === e.h && 0 === e.s ? e.s : (n = c ? Math.round(100 * e.s) - l * t : t === h ? Math.round(100 * e.s) + l : Math.round(100 * e.s) + a * t, n > 100 && (n = 100), c && t === s && n > 10 && (n = 10), n < 6 && (n = 6), n);
  var n;
}
function p(e, t, c) {
  return c ? Math.round(100 * e.v) + i * t : Math.round(100 * e.v) - u * t;
}
function m(e) {
  for (var t = [], c = r.default(e), n = s; n > 0; n -= 1) {
    var o = c.toHsv(),
      l = r.default({
        h: f(o, n, !0),
        s: v(o, n, !0),
        v: p(o, n, !0)
      }).toHexString();
    t.push(l);
  }
  t.push(c.toHexString());
  for (n = 1; n <= h; n += 1) {
    o = c.toHsv(), l = r.default({
      h: f(o, n),
      s: v(o, n),
      v: p(o, n)
    }).toHexString();
    t.push(l);
  }
  return t;
}
legacyExports.default = m;
