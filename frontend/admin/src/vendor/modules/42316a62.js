let legacyModule = module,
  legacyExports = exports;
var r = require("./markdownUtils.js").isSpace;
legacyModule.exports = function (e, t, n, i) {
  var o,
    a,
    s,
    l,
    u = e.bMarks[t] + e.tShift[t],
    c = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4) return !1;
  if (o = e.src.charCodeAt(u), 35 !== o || u >= c) return !1;
  a = 1, o = e.src.charCodeAt(++u);
  while (35 === o && u < c && a <= 6) a++, o = e.src.charCodeAt(++u);
  return !(a > 6 || u < c && !r(o)) && (!!i || (c = e.skipSpacesBack(c, u), s = e.skipCharsBack(c, 35, u), s > u && r(e.src.charCodeAt(s - 1)) && (c = s), e.line = t + 1, l = e.push("heading_open", "h" + String(a), 1), l.markup = "########".slice(0, a), l.map = [t, e.line], l = e.push("inline", "", 0), l.content = e.src.slice(u, c).trim(), l.map = [t, e.line], l.children = [], l = e.push("heading_close", "h" + String(a), -1), l.markup = "########".slice(0, a), !0));
};
