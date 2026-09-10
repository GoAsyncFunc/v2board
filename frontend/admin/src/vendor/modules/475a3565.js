let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = function (e, t, n) {
  var r,
    i,
    o,
    a,
    s,
    l,
    u,
    c,
    f,
    d,
    h = t + 1,
    p = e.md.block.ruler.getRules("paragraph");
  if (e.sCount[t] - e.blkIndent >= 4) return !1;
  for (d = e.parentType, e.parentType = "paragraph"; h < n && !e.isEmpty(h); h++) if (!(e.sCount[h] - e.blkIndent > 3)) {
    if (e.sCount[h] >= e.blkIndent && (l = e.bMarks[h] + e.tShift[h], u = e.eMarks[h], l < u && (f = e.src.charCodeAt(l), (45 === f || 61 === f) && (l = e.skipChars(l, f), l = e.skipSpaces(l), l >= u)))) {
      c = 61 === f ? 1 : 2;
      break;
    }
    if (!(e.sCount[h] < 0)) {
      for (i = !1, o = 0, a = p.length; o < a; o++) if (p[o](e, h, n, !0)) {
        i = !0;
        break;
      }
      if (i) break;
    }
  }
  return !!c && (r = e.getLines(t, h, e.blkIndent, !1).trim(), e.line = h + 1, s = e.push("heading_open", "h" + String(c), 1), s.markup = String.fromCharCode(f), s.map = [t, e.line], s = e.push("inline", "", 0), s.content = r, s.map = [t, e.line - 1], s.children = [], s = e.push("heading_close", "h" + String(c), -1), s.markup = String.fromCharCode(f), e.parentType = d, !0);
};
