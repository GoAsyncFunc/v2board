let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = function (e, t, n) {
  var r, o, i;
  if (e.sCount[t] - e.blkIndent < 4) return !1;
  o = r = t + 1;
  while (r < n) if (e.isEmpty(r)) r++;else {
    if (!(e.sCount[r] - e.blkIndent >= 4)) break;
    r++, o = r;
  }
  return e.line = o, i = e.push("code_block", "code", 0), i.content = e.getLines(t, o, 4 + e.blkIndent, !1) + "\n", i.map = [t, e.line], !0;
};
