let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = function (e, t) {
  var n,
    r,
    i,
    o,
    a,
    s,
    l = t + 1,
    u = e.md.block.ruler.getRules("paragraph"),
    c = e.lineMax;
  for (s = e.parentType, e.parentType = "paragraph"; l < c && !e.isEmpty(l); l++) if (!(e.sCount[l] - e.blkIndent > 3) && !(e.sCount[l] < 0)) {
    for (r = !1, i = 0, o = u.length; i < o; i++) if (u[i](e, l, c, !0)) {
      r = !0;
      break;
    }
    if (r) break;
  }
  return n = e.getLines(t, l, e.blkIndent, !1).trim(), e.line = l, a = e.push("paragraph_open", "p", 1), a.map = [t, e.line], a = e.push("inline", "", 0), a.content = n, a.map = [t, e.line], a.children = [], a = e.push("paragraph_close", "p", -1), e.parentType = s, !0;
};
