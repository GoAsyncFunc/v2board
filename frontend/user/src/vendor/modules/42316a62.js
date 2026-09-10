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
  if (i = e.src.charCodeAt(u), 35 !== i || u >= l) return !1;
  a = 1, i = e.src.charCodeAt(++u);
  while (35 === i && u < l && a <= 6) a++, i = e.src.charCodeAt(++u);
  return !(a > 6 || u < l && !r(i)) && (!!o || (l = e.skipSpacesBack(l, u), s = e.skipCharsBack(l, 35, u), s > u && r(e.src.charCodeAt(s - 1)) && (l = s), e.line = t + 1, c = e.push("heading_open", "h" + String(a), 1), c.markup = "########".slice(0, a), c.map = [t, e.line], c = e.push("inline", "", 0), c.content = e.src.slice(u, l).trim(), c.map = [t, e.line], c.children = [], c = e.push("heading_close", "h" + String(a), -1), c.markup = "########".slice(0, a), !0));
};
