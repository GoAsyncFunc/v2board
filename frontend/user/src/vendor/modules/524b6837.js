let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = function (e, t) {
  var n,
    r,
    o,
    i,
    a,
    s,
    c = t + 1,
    u = e.md.block.ruler.getRules("paragraph"),
    l = e.lineMax;
  for (s = e.parentType, e.parentType = "paragraph"; c < l && !e.isEmpty(c); c++) if (!(e.sCount[c] - e.blkIndent > 3) && !(e.sCount[c] < 0)) {
    for (r = !1, o = 0, i = u.length; o < i; o++) if (u[o](e, c, l, !0)) {
      r = !0;
      break;
    }
    if (r) break;
  }
  return n = e.getLines(t, c, e.blkIndent, !1).trim(), e.line = c, a = e.push("paragraph_open", "p", 1), a.map = [t, e.line], a = e.push("inline", "", 0), a.content = n, a.map = [t, e.line], a.children = [], a = e.push("paragraph_close", "p", -1), e.parentType = s, !0;
};
