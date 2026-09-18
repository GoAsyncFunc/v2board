let legacyModule = module,
  legacyExports = exports;
var r = require("./markdownUtils.js").isSpace;
function o(e, t) {
  var n = e.bMarks[t] + e.tShift[t],
    r = e.eMarks[t];
  return e.src.substr(n, r - n);
}
function i(e) {
  var t,
    n = [],
    r = 0,
    o = e.length,
    i = !1,
    a = 0,
    s = "";
  t = e.charCodeAt(r);
  while (r < o) 124 === t && (i ? (s += e.substring(a, r - 1), a = r) : (n.push(s + e.substring(a, r)), s = "", a = r + 1)), i = 92 === t, r++, t = e.charCodeAt(r);
  return n.push(s + e.substring(a)), n;
}
legacyModule.exports = function (e, t, n, a) {
  var s, c, u, l, f, p, d, h, m, v, y, g, b, w, x, O, E, _;
  if (t + 2 > n) return !1;
  if (p = t + 1, e.sCount[p] < e.blkIndent) return !1;
  if (e.sCount[p] - e.blkIndent >= 4) return !1;
  if (u = e.bMarks[p] + e.tShift[p], u >= e.eMarks[p]) return !1;
  if (E = e.src.charCodeAt(u++), 124 !== E && 45 !== E && 58 !== E) return !1;
  if (u >= e.eMarks[p]) return !1;
  if (_ = e.src.charCodeAt(u++), 124 !== _ && 45 !== _ && 58 !== _ && !r(_)) return !1;
  if (45 === E && r(_)) return !1;
  while (u < e.eMarks[p]) {
    if (s = e.src.charCodeAt(u), 124 !== s && 45 !== s && 58 !== s && !r(s)) return !1;
    u++;
  }
  for (c = o(e, t + 1), d = c.split("|"), v = [], l = 0; l < d.length; l++) {
    if (y = d[l].trim(), !y) {
      if (0 === l || l === d.length - 1) continue;
      return !1;
    }
    if (!/^:?-+:?$/.test(y)) return !1;
    58 === y.charCodeAt(y.length - 1) ? v.push(58 === y.charCodeAt(0) ? "center" : "right") : 58 === y.charCodeAt(0) ? v.push("left") : v.push("");
  }
  if (c = o(e, t).trim(), -1 === c.indexOf("|")) return !1;
  if (e.sCount[t] - e.blkIndent >= 4) return !1;
  if (d = i(c), d.length && "" === d[0] && d.shift(), d.length && "" === d[d.length - 1] && d.pop(), h = d.length, 0 === h || h !== v.length) return !1;
  if (a) return !0;
  for (w = e.parentType, e.parentType = "table", O = e.md.block.ruler.getRules("blockquote"), m = e.push("table_open", "table", 1), m.map = g = [t, 0], m = e.push("thead_open", "thead", 1), m.map = [t, t + 1], m = e.push("tr_open", "tr", 1), m.map = [t, t + 1], l = 0; l < d.length; l++) m = e.push("th_open", "th", 1), v[l] && (m.attrs = [["style", "text-align:" + v[l]]]), m = e.push("inline", "", 0), m.content = d[l].trim(), m.children = [], m = e.push("th_close", "th", -1);
  for (m = e.push("tr_close", "tr", -1), m = e.push("thead_close", "thead", -1), p = t + 2; p < n; p++) {
    if (e.sCount[p] < e.blkIndent) break;
    for (x = !1, l = 0, f = O.length; l < f; l++) if (O[l](e, p, n, !0)) {
      x = !0;
      break;
    }
    if (x) break;
    if (c = o(e, p).trim(), !c) break;
    if (e.sCount[p] - e.blkIndent >= 4) break;
    for (d = i(c), d.length && "" === d[0] && d.shift(), d.length && "" === d[d.length - 1] && d.pop(), p === t + 2 && (m = e.push("tbody_open", "tbody", 1), m.map = b = [t + 2, 0]), m = e.push("tr_open", "tr", 1), m.map = [p, p + 1], l = 0; l < h; l++) m = e.push("td_open", "td", 1), v[l] && (m.attrs = [["style", "text-align:" + v[l]]]), m = e.push("inline", "", 0), m.content = d[l] ? d[l].trim() : "", m.children = [], m = e.push("td_close", "td", -1);
    m = e.push("tr_close", "tr", -1);
  }
  return b && (m = e.push("tbody_close", "tbody", -1), b[1] = p), m = e.push("table_close", "table", -1), g[1] = p, e.parentType = w, e.line = p, !0;
};
