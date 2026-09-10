let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = function (e, t, n) {
  var r, i, o;
  if (e.sCount[t] - e.blkIndent < 4) return !1;
  i = r = t + 1;
  while (r < n) if (e.isEmpty(r)) r++;else {
    if (!(e.sCount[r] - e.blkIndent >= 4)) break;
    r++, i = r;
  }
  return e.line = i, o = e.push("code_block", "code", 0), o.content = e.getLines(t, i, 4 + e.blkIndent, !1) + "\n", o.map = [t, e.line], !0;
};
