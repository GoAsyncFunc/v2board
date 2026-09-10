let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = function (e, t, n) {
  var r,
    o,
    i,
    a,
    s,
    c,
    u,
    l,
    f,
    p,
    d = t + 1,
    h = e.md.block.ruler.getRules("paragraph");
  if (e.sCount[t] - e.blkIndent >= 4) return !1;
  for (p = e.parentType, e.parentType = "paragraph"; d < n && !e.isEmpty(d); d++) if (!(e.sCount[d] - e.blkIndent > 3)) {
    if (e.sCount[d] >= e.blkIndent && (c = e.bMarks[d] + e.tShift[d], u = e.eMarks[d], c < u && (f = e.src.charCodeAt(c), (45 === f || 61 === f) && (c = e.skipChars(c, f), c = e.skipSpaces(c), c >= u)))) {
      l = 61 === f ? 1 : 2;
      break;
    }
    if (!(e.sCount[d] < 0)) {
      for (o = !1, i = 0, a = h.length; i < a; i++) if (h[i](e, d, n, !0)) {
        o = !0;
        break;
      }
      if (o) break;
    }
  }
  return !!l && (r = e.getLines(t, d, e.blkIndent, !1).trim(), e.line = d + 1, s = e.push("heading_open", "h" + String(l), 1), s.markup = String.fromCharCode(f), s.map = [t, e.line], s = e.push("inline", "", 0), s.content = r, s.map = [t, e.line - 1], s.children = [], s = e.push("heading_close", "h" + String(l), -1), s.markup = String.fromCharCode(f), e.parentType = p, !0);
};
