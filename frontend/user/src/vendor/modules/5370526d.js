let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = function (e, t) {
  var n,
    r,
    o,
    i,
    a,
    s,
    c,
    u,
    l = e.pos,
    f = e.src.charCodeAt(l);
  if (96 !== f) return !1;
  n = l, l++, r = e.posMax;
  while (l < r && 96 === e.src.charCodeAt(l)) l++;
  if (o = e.src.slice(n, l), c = o.length, e.backticksScanned && (e.backticks[c] || 0) <= n) return t || (e.pending += o), e.pos += c, !0;
  a = s = l;
  while (-1 !== (a = e.src.indexOf("`", s))) {
    s = a + 1;
    while (s < r && 96 === e.src.charCodeAt(s)) s++;
    if (u = s - a, u === c) return t || (i = e.push("code_inline", "code", 0), i.markup = o, i.content = e.src.slice(l, a).replace(/\n/g, " ").replace(/^ (.+) $/, "$1")), e.pos = s, !0;
    e.backticks[u] = a;
  }
  return e.backticksScanned = !0, t || (e.pending += o), e.pos += c, !0;
};
