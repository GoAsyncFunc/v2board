let legacyModule = module,
  legacyExports = exports;
var r = require("./4147676d.js").isSpace;
legacyModule.exports = function (e, t, n, o) {
  var i,
    a,
    s,
    c,
    u = e.bMarks[t] + e.tShift[t],
    l = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4) return !1;
  if (i = e.src.charCodeAt(u++), 42 !== i && 45 !== i && 95 !== i) return !1;
  a = 1;
  while (u < l) {
    if (s = e.src.charCodeAt(u++), s !== i && !r(s)) return !1;
    s === i && a++;
  }
  return !(a < 3) && (!!o || (e.line = t + 1, c = e.push("hr", "hr", 0), c.map = [t, e.line], c.markup = Array(a + 1).join(String.fromCharCode(i)), !0));
};
