let legacyModule = module,
  legacyExports = exports;
var r = require("./4147676d.js").isSpace;
legacyModule.exports = function (e, t, n, i) {
  var o,
    a,
    s,
    l,
    u = e.bMarks[t] + e.tShift[t],
    c = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4) return !1;
  if (o = e.src.charCodeAt(u++), 42 !== o && 45 !== o && 95 !== o) return !1;
  a = 1;
  while (u < c) {
    if (s = e.src.charCodeAt(u++), s !== o && !r(s)) return !1;
    s === o && a++;
  }
  return !(a < 3) && (!!i || (e.line = t + 1, l = e.push("hr", "hr", 0), l.map = [t, e.line], l.markup = Array(a + 1).join(String.fromCharCode(o)), !0));
};
