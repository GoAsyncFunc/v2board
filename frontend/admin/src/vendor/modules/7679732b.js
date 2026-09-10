let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = function (e, t, n, r) {
  var i,
    o,
    a,
    s,
    l,
    u,
    c,
    f = !1,
    d = e.bMarks[t] + e.tShift[t],
    h = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4) return !1;
  if (d + 3 > h) return !1;
  if (i = e.src.charCodeAt(d), 126 !== i && 96 !== i) return !1;
  if (l = d, d = e.skipChars(d, i), o = d - l, o < 3) return !1;
  if (c = e.src.slice(l, d), a = e.src.slice(d, h), 96 === i && a.indexOf(String.fromCharCode(i)) >= 0) return !1;
  if (r) return !0;
  for (s = t;;) {
    if (s++, s >= n) break;
    if (d = l = e.bMarks[s] + e.tShift[s], h = e.eMarks[s], d < h && e.sCount[s] < e.blkIndent) break;
    if (e.src.charCodeAt(d) === i && !(e.sCount[s] - e.blkIndent >= 4) && (d = e.skipChars(d, i), !(d - l < o) && (d = e.skipSpaces(d), !(d < h)))) {
      f = !0;
      break;
    }
  }
  return o = e.sCount[t], e.line = s + (f ? 1 : 0), u = e.push("fence", "code", 0), u.info = a, u.content = e.getLines(t + 1, s, o, !0), u.markup = c, u.map = [t, e.line], !0;
};
