let legacyModule = module,
  legacyExports = exports;
var r = require("./4147676d.js").isSpace;
legacyModule.exports = function (e, t, n, o) {
  var i,
    a,
    s,
    c,
    u,
    l,
    f,
    p,
    d,
    h,
    m,
    v,
    y,
    g,
    b,
    w,
    x,
    O,
    E,
    _,
    k = e.lineMax,
    S = e.bMarks[t] + e.tShift[t],
    C = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4) return !1;
  if (62 !== e.src.charCodeAt(S++)) return !1;
  if (o) return !0;
  c = d = e.sCount[t] + 1, 32 === e.src.charCodeAt(S) ? (S++, c++, d++, i = !1, w = !0) : 9 === e.src.charCodeAt(S) ? (w = !0, (e.bsCount[t] + d) % 4 === 3 ? (S++, c++, d++, i = !1) : i = !0) : w = !1, h = [e.bMarks[t]], e.bMarks[t] = S;
  while (S < C) {
    if (a = e.src.charCodeAt(S), !r(a)) break;
    9 === a ? d += 4 - (d + e.bsCount[t] + (i ? 1 : 0)) % 4 : d++, S++;
  }
  for (m = [e.bsCount[t]], e.bsCount[t] = e.sCount[t] + 1 + (w ? 1 : 0), l = S >= C, g = [e.sCount[t]], e.sCount[t] = d - c, b = [e.tShift[t]], e.tShift[t] = S - e.bMarks[t], O = e.md.block.ruler.getRules("blockquote"), y = e.parentType, e.parentType = "blockquote", p = t + 1; p < n; p++) {
    if (_ = e.sCount[p] < e.blkIndent, S = e.bMarks[p] + e.tShift[p], C = e.eMarks[p], S >= C) break;
    if (62 !== e.src.charCodeAt(S++) || _) {
      if (l) break;
      for (x = !1, s = 0, u = O.length; s < u; s++) if (O[s](e, p, n, !0)) {
        x = !0;
        break;
      }
      if (x) {
        e.lineMax = p, 0 !== e.blkIndent && (h.push(e.bMarks[p]), m.push(e.bsCount[p]), b.push(e.tShift[p]), g.push(e.sCount[p]), e.sCount[p] -= e.blkIndent);
        break;
      }
      h.push(e.bMarks[p]), m.push(e.bsCount[p]), b.push(e.tShift[p]), g.push(e.sCount[p]), e.sCount[p] = -1;
    } else {
      c = d = e.sCount[p] + 1, 32 === e.src.charCodeAt(S) ? (S++, c++, d++, i = !1, w = !0) : 9 === e.src.charCodeAt(S) ? (w = !0, (e.bsCount[p] + d) % 4 === 3 ? (S++, c++, d++, i = !1) : i = !0) : w = !1, h.push(e.bMarks[p]), e.bMarks[p] = S;
      while (S < C) {
        if (a = e.src.charCodeAt(S), !r(a)) break;
        9 === a ? d += 4 - (d + e.bsCount[p] + (i ? 1 : 0)) % 4 : d++, S++;
      }
      l = S >= C, m.push(e.bsCount[p]), e.bsCount[p] = e.sCount[p] + 1 + (w ? 1 : 0), g.push(e.sCount[p]), e.sCount[p] = d - c, b.push(e.tShift[p]), e.tShift[p] = S - e.bMarks[p];
    }
  }
  for (v = e.blkIndent, e.blkIndent = 0, E = e.push("blockquote_open", "blockquote", 1), E.markup = ">", E.map = f = [t, 0], e.md.block.tokenize(e, t, p), E = e.push("blockquote_close", "blockquote", -1), E.markup = ">", e.lineMax = k, e.parentType = y, f[1] = e.line, s = 0; s < b.length; s++) e.bMarks[s + t] = h[s], e.tShift[s + t] = b[s], e.sCount[s + t] = g[s], e.bsCount[s + t] = m[s];
  return e.blkIndent = v, !0;
};
