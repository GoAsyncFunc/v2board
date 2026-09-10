let legacyModule = module,
  legacyExports = exports;
function r(e, t) {
  var n,
    r,
    i,
    o,
    a,
    s,
    l,
    u,
    c = {},
    f = t.length;
  if (f) {
    var d = 0,
      h = -2,
      p = [];
    for (n = 0; n < f; n++) if (i = t[n], p.push(0), t[d].marker === i.marker && h === i.token - 1 || (d = n), h = i.token, i.length = i.length || 0, i.close) {
      for (c.hasOwnProperty(i.marker) || (c[i.marker] = [-1, -1, -1, -1, -1, -1]), a = c[i.marker][(i.open ? 3 : 0) + i.length % 3], r = d - p[d] - 1, s = r; r > a; r -= p[r] + 1) if (o = t[r], o.marker === i.marker && o.open && o.end < 0 && (l = !1, (o.close || i.open) && (o.length + i.length) % 3 === 0 && (o.length % 3 === 0 && i.length % 3 === 0 || (l = !0)), !l)) {
        u = r > 0 && !t[r - 1].open ? p[r - 1] + 1 : 0, p[n] = n - r + u, p[r] = u, i.open = !1, o.end = n, o.close = !1, s = -1, h = -2;
        break;
      }
      -1 !== s && (c[i.marker][(i.open ? 3 : 0) + (i.length || 0) % 3] = s);
    }
  }
}
legacyModule.exports = function (e) {
  var t,
    n = e.tokens_meta,
    i = e.tokens_meta.length;
  for (r(e, e.delimiters), t = 0; t < i; t++) n[t] && n[t].delimiters && r(e, n[t].delimiters);
};
