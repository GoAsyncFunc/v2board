let legacyModule = module,
  legacyExports = exports;
function r(e, t) {
  var n,
    r,
    o,
    i,
    a,
    s,
    c,
    u,
    l = {},
    f = t.length;
  if (f) {
    var p = 0,
      d = -2,
      h = [];
    for (n = 0; n < f; n++) if (o = t[n], h.push(0), t[p].marker === o.marker && d === o.token - 1 || (p = n), d = o.token, o.length = o.length || 0, o.close) {
      for (l.hasOwnProperty(o.marker) || (l[o.marker] = [-1, -1, -1, -1, -1, -1]), a = l[o.marker][(o.open ? 3 : 0) + o.length % 3], r = p - h[p] - 1, s = r; r > a; r -= h[r] + 1) if (i = t[r], i.marker === o.marker && i.open && i.end < 0 && (c = !1, (i.close || o.open) && (i.length + o.length) % 3 === 0 && (i.length % 3 === 0 && o.length % 3 === 0 || (c = !0)), !c)) {
        u = r > 0 && !t[r - 1].open ? h[r - 1] + 1 : 0, h[n] = n - r + u, h[r] = u, o.open = !1, i.end = n, i.close = !1, s = -1, d = -2;
        break;
      }
      -1 !== s && (l[o.marker][(o.open ? 3 : 0) + (o.length || 0) % 3] = s);
    }
  }
}
legacyModule.exports = function (e) {
  var t,
    n = e.tokens_meta,
    o = e.tokens_meta.length;
  for (r(e, e.delimiters), t = 0; t < o; t++) n[t] && n[t].delimiters && r(e, n[t].delimiters);
};
