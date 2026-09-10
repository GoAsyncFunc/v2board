let legacyModule = module,
  legacyExports = exports;
var r = require("./4147676d.js").isSpace;
legacyModule.exports = function (e, t, n, i) {
  var o,
    a,
    s,
    l,
    u,
    c,
    f,
    d,
    h,
    p,
    g,
    m,
    v,
    y,
    b,
    x,
    _,
    w,
    O,
    S,
    k = e.lineMax,
    j = e.bMarks[t] + e.tShift[t],
    M = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4) return !1;
  if (62 !== e.src.charCodeAt(j++)) return !1;
  if (i) return !0;
  l = h = e.sCount[t] + 1, 32 === e.src.charCodeAt(j) ? (j++, l++, h++, o = !1, x = !0) : 9 === e.src.charCodeAt(j) ? (x = !0, (e.bsCount[t] + h) % 4 === 3 ? (j++, l++, h++, o = !1) : o = !0) : x = !1, p = [e.bMarks[t]], e.bMarks[t] = j;
  while (j < M) {
    if (a = e.src.charCodeAt(j), !r(a)) break;
    9 === a ? h += 4 - (h + e.bsCount[t] + (o ? 1 : 0)) % 4 : h++, j++;
  }
  for (g = [e.bsCount[t]], e.bsCount[t] = e.sCount[t] + 1 + (x ? 1 : 0), c = j >= M, y = [e.sCount[t]], e.sCount[t] = h - l, b = [e.tShift[t]], e.tShift[t] = j - e.bMarks[t], w = e.md.block.ruler.getRules("blockquote"), v = e.parentType, e.parentType = "blockquote", d = t + 1; d < n; d++) {
    if (S = e.sCount[d] < e.blkIndent, j = e.bMarks[d] + e.tShift[d], M = e.eMarks[d], j >= M) break;
    if (62 !== e.src.charCodeAt(j++) || S) {
      if (c) break;
      for (_ = !1, s = 0, u = w.length; s < u; s++) if (w[s](e, d, n, !0)) {
        _ = !0;
        break;
      }
      if (_) {
        e.lineMax = d, 0 !== e.blkIndent && (p.push(e.bMarks[d]), g.push(e.bsCount[d]), b.push(e.tShift[d]), y.push(e.sCount[d]), e.sCount[d] -= e.blkIndent);
        break;
      }
      p.push(e.bMarks[d]), g.push(e.bsCount[d]), b.push(e.tShift[d]), y.push(e.sCount[d]), e.sCount[d] = -1;
    } else {
      l = h = e.sCount[d] + 1, 32 === e.src.charCodeAt(j) ? (j++, l++, h++, o = !1, x = !0) : 9 === e.src.charCodeAt(j) ? (x = !0, (e.bsCount[d] + h) % 4 === 3 ? (j++, l++, h++, o = !1) : o = !0) : x = !1, p.push(e.bMarks[d]), e.bMarks[d] = j;
      while (j < M) {
        if (a = e.src.charCodeAt(j), !r(a)) break;
        9 === a ? h += 4 - (h + e.bsCount[d] + (o ? 1 : 0)) % 4 : h++, j++;
      }
      c = j >= M, g.push(e.bsCount[d]), e.bsCount[d] = e.sCount[d] + 1 + (x ? 1 : 0), y.push(e.sCount[d]), e.sCount[d] = h - l, b.push(e.tShift[d]), e.tShift[d] = j - e.bMarks[d];
    }
  }
  for (m = e.blkIndent, e.blkIndent = 0, O = e.push("blockquote_open", "blockquote", 1), O.markup = ">", O.map = f = [t, 0], e.md.block.tokenize(e, t, d), O = e.push("blockquote_close", "blockquote", -1), O.markup = ">", e.lineMax = k, e.parentType = v, f[1] = e.line, s = 0; s < b.length; s++) e.bMarks[s + t] = p[s], e.tShift[s + t] = b[s], e.sCount[s + t] = y[s], e.bsCount[s + t] = g[s];
  return e.blkIndent = m, !0;
};
