let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = function (e, t, n, r) {
  var o,
    i,
    a,
    s,
    c,
    u,
    l,
    f = !1,
    p = e.bMarks[t] + e.tShift[t],
    d = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4) return !1;
  if (p + 3 > d) return !1;
  if (o = e.src.charCodeAt(p), 126 !== o && 96 !== o) return !1;
  if (c = p, p = e.skipChars(p, o), i = p - c, i < 3) return !1;
  if (l = e.src.slice(c, p), a = e.src.slice(p, d), 96 === o && a.indexOf(String.fromCharCode(o)) >= 0) return !1;
  if (r) return !0;
  for (s = t;;) {
    if (s++, s >= n) break;
    if (p = c = e.bMarks[s] + e.tShift[s], d = e.eMarks[s], p < d && e.sCount[s] < e.blkIndent) break;
    if (e.src.charCodeAt(p) === o && !(e.sCount[s] - e.blkIndent >= 4) && (p = e.skipChars(p, o), !(p - c < i) && (p = e.skipSpaces(p), !(p < d)))) {
      f = !0;
      break;
    }
  }
  return i = e.sCount[t], e.line = s + (f ? 1 : 0), u = e.push("fence", "code", 0), u.info = a, u.content = e.getLines(t + 1, s, i, !0), u.markup = l, u.map = [t, e.line], !0;
};
