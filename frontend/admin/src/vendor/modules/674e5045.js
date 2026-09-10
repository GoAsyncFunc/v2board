let legacyModule = module,
  legacyExports = exports;
var r = require("./4147676d.js").isSpace;
function i(e, t) {
  var n = e.bMarks[t] + e.tShift[t],
    r = e.eMarks[t];
  return e.src.substr(n, r - n);
}
function o(e) {
  var t,
    n = [],
    r = 0,
    i = e.length,
    o = !1,
    a = 0,
    s = "";
  t = e.charCodeAt(r);
  while (r < i) 124 === t && (o ? (s += e.substring(a, r - 1), a = r) : (n.push(s + e.substring(a, r)), s = "", a = r + 1)), o = 92 === t, r++, t = e.charCodeAt(r);
  return n.push(s + e.substring(a)), n;
}
legacyModule.exports = function (e, t, n, a) {
  var s, l, u, c, f, d, h, p, g, m, v, y, b, x, _, w, O, S;
  if (t + 2 > n) return !1;
  if (d = t + 1, e.sCount[d] < e.blkIndent) return !1;
  if (e.sCount[d] - e.blkIndent >= 4) return !1;
  if (u = e.bMarks[d] + e.tShift[d], u >= e.eMarks[d]) return !1;
  if (O = e.src.charCodeAt(u++), 124 !== O && 45 !== O && 58 !== O) return !1;
  if (u >= e.eMarks[d]) return !1;
  if (S = e.src.charCodeAt(u++), 124 !== S && 45 !== S && 58 !== S && !r(S)) return !1;
  if (45 === O && r(S)) return !1;
  while (u < e.eMarks[d]) {
    if (s = e.src.charCodeAt(u), 124 !== s && 45 !== s && 58 !== s && !r(s)) return !1;
    u++;
  }
  for (l = i(e, t + 1), h = l.split("|"), m = [], c = 0; c < h.length; c++) {
    if (v = h[c].trim(), !v) {
      if (0 === c || c === h.length - 1) continue;
      return !1;
    }
    if (!/^:?-+:?$/.test(v)) return !1;
    58 === v.charCodeAt(v.length - 1) ? m.push(58 === v.charCodeAt(0) ? "center" : "right") : 58 === v.charCodeAt(0) ? m.push("left") : m.push("");
  }
  if (l = i(e, t).trim(), -1 === l.indexOf("|")) return !1;
  if (e.sCount[t] - e.blkIndent >= 4) return !1;
  if (h = o(l), h.length && "" === h[0] && h.shift(), h.length && "" === h[h.length - 1] && h.pop(), p = h.length, 0 === p || p !== m.length) return !1;
  if (a) return !0;
  for (x = e.parentType, e.parentType = "table", w = e.md.block.ruler.getRules("blockquote"), g = e.push("table_open", "table", 1), g.map = y = [t, 0], g = e.push("thead_open", "thead", 1), g.map = [t, t + 1], g = e.push("tr_open", "tr", 1), g.map = [t, t + 1], c = 0; c < h.length; c++) g = e.push("th_open", "th", 1), m[c] && (g.attrs = [["style", "text-align:" + m[c]]]), g = e.push("inline", "", 0), g.content = h[c].trim(), g.children = [], g = e.push("th_close", "th", -1);
  for (g = e.push("tr_close", "tr", -1), g = e.push("thead_close", "thead", -1), d = t + 2; d < n; d++) {
    if (e.sCount[d] < e.blkIndent) break;
    for (_ = !1, c = 0, f = w.length; c < f; c++) if (w[c](e, d, n, !0)) {
      _ = !0;
      break;
    }
    if (_) break;
    if (l = i(e, d).trim(), !l) break;
    if (e.sCount[d] - e.blkIndent >= 4) break;
    for (h = o(l), h.length && "" === h[0] && h.shift(), h.length && "" === h[h.length - 1] && h.pop(), d === t + 2 && (g = e.push("tbody_open", "tbody", 1), g.map = b = [t + 2, 0]), g = e.push("tr_open", "tr", 1), g.map = [d, d + 1], c = 0; c < p; c++) g = e.push("td_open", "td", 1), m[c] && (g.attrs = [["style", "text-align:" + m[c]]]), g = e.push("inline", "", 0), g.content = h[c] ? h[c].trim() : "", g.children = [], g = e.push("td_close", "td", -1);
    g = e.push("tr_close", "tr", -1);
  }
  return b && (g = e.push("tbody_close", "tbody", -1), b[1] = d), g = e.push("table_close", "table", -1), y[1] = d, e.parentType = x, e.line = d, !0;
};
