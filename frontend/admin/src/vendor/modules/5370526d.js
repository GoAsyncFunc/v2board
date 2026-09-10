let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = function (e, t) {
  var n,
    r,
    i,
    o,
    a,
    s,
    l,
    u,
    c = e.pos,
    f = e.src.charCodeAt(c);
  if (96 !== f) return !1;
  n = c, c++, r = e.posMax;
  while (c < r && 96 === e.src.charCodeAt(c)) c++;
  if (i = e.src.slice(n, c), l = i.length, e.backticksScanned && (e.backticks[l] || 0) <= n) return t || (e.pending += i), e.pos += l, !0;
  a = s = c;
  while (-1 !== (a = e.src.indexOf("`", s))) {
    s = a + 1;
    while (s < r && 96 === e.src.charCodeAt(s)) s++;
    if (u = s - a, u === l) return t || (o = e.push("code_inline", "code", 0), o.markup = i, o.content = e.src.slice(c, a).replace(/\n/g, " ").replace(/^ (.+) $/, "$1")), e.pos = s, !0;
    e.backticks[u] = a;
  }
  return e.backticksScanned = !0, t || (e.pending += i), e.pos += l, !0;
};
