let legacyModule = module,
  legacyExports = exports;
var r = require("./markdownUtils.js").isSpace;
function o(e, t) {
  var n, o, i, a;
  return o = e.bMarks[t] + e.tShift[t], i = e.eMarks[t], n = e.src.charCodeAt(o++), 42 !== n && 45 !== n && 43 !== n ? -1 : o < i && (a = e.src.charCodeAt(o), !r(a)) ? -1 : o;
}
function i(e, t) {
  var n,
    o = e.bMarks[t] + e.tShift[t],
    i = o,
    a = e.eMarks[t];
  if (i + 1 >= a) return -1;
  if (n = e.src.charCodeAt(i++), n < 48 || n > 57) return -1;
  for (;;) {
    if (i >= a) return -1;
    if (n = e.src.charCodeAt(i++), !(n >= 48 && n <= 57)) {
      if (41 === n || 46 === n) break;
      return -1;
    }
    if (i - o >= 10) return -1;
  }
  return i < a && (n = e.src.charCodeAt(i), !r(n)) ? -1 : i;
}
function a(e, t) {
  var n,
    r,
    o = e.level + 2;
  for (n = t + 2, r = e.tokens.length - 2; n < r; n++) e.tokens[n].level === o && "paragraph_open" === e.tokens[n].type && (e.tokens[n + 2].hidden = !0, e.tokens[n].hidden = !0, n += 2);
}
legacyModule.exports = function (e, t, n, r) {
  var s,
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
    k,
    S,
    C,
    j,
    P,
    T,
    L,
    N,
    M,
    A,
    D = !1,
    I = !0;
  if (e.sCount[t] - e.blkIndent >= 4) return !1;
  if (e.listIndent >= 0 && e.sCount[t] - e.listIndent >= 4 && e.sCount[t] < e.blkIndent) return !1;
  if (r && "paragraph" === e.parentType && e.sCount[t] >= e.blkIndent && (D = !0), (P = i(e, t)) >= 0) {
    if (d = !0, L = e.bMarks[t] + e.tShift[t], b = Number(e.src.slice(L, P - 1)), D && 1 !== b) return !1;
  } else {
    if (!((P = o(e, t)) >= 0)) return !1;
    d = !1;
  }
  if (D && e.skipSpaces(P) >= e.eMarks[t]) return !1;
  if (g = e.src.charCodeAt(P - 1), r) return !0;
  y = e.tokens.length, d ? (A = e.push("ordered_list_open", "ol", 1), 1 !== b && (A.attrs = [["start", b]])) : A = e.push("bullet_list_open", "ul", 1), A.map = v = [t, 0], A.markup = String.fromCharCode(g), x = t, T = !1, M = e.md.block.ruler.getRules("list"), _ = e.parentType, e.parentType = "list";
  while (x < n) {
    j = P, w = e.eMarks[x], p = O = e.sCount[x] + P - (e.bMarks[t] + e.tShift[t]);
    while (j < w) {
      if (s = e.src.charCodeAt(j), 9 === s) O += 4 - (O + e.bsCount[x]) % 4;else {
        if (32 !== s) break;
        O++;
      }
      j++;
    }
    if (c = j, f = c >= w ? 1 : O - p, f > 4 && (f = 1), l = p + f, A = e.push("list_item_open", "li", 1), A.markup = String.fromCharCode(g), A.map = h = [t, 0], d && (A.info = e.src.slice(L, P - 1)), C = e.tight, S = e.tShift[t], k = e.sCount[t], E = e.listIndent, e.listIndent = e.blkIndent, e.blkIndent = l, e.tight = !0, e.tShift[t] = c - e.bMarks[t], e.sCount[t] = O, c >= w && e.isEmpty(t + 1) ? e.line = Math.min(e.line + 2, n) : e.md.block.tokenize(e, t, n, !0), e.tight && !T || (I = !1), T = e.line - t > 1 && e.isEmpty(e.line - 1), e.blkIndent = e.listIndent, e.listIndent = E, e.tShift[t] = S, e.sCount[t] = k, e.tight = C, A = e.push("list_item_close", "li", -1), A.markup = String.fromCharCode(g), x = t = e.line, h[1] = x, c = e.bMarks[t], x >= n) break;
    if (e.sCount[x] < e.blkIndent) break;
    if (e.sCount[t] - e.blkIndent >= 4) break;
    for (N = !1, u = 0, m = M.length; u < m; u++) if (M[u](e, x, n, !0)) {
      N = !0;
      break;
    }
    if (N) break;
    if (d) {
      if (P = i(e, x), P < 0) break;
      L = e.bMarks[x] + e.tShift[x];
    } else if (P = o(e, x), P < 0) break;
    if (g !== e.src.charCodeAt(P - 1)) break;
  }
  return A = d ? e.push("ordered_list_close", "ol", -1) : e.push("bullet_list_close", "ul", -1), A.markup = String.fromCharCode(g), v[1] = x, e.line = x, e.parentType = _, I && a(e, y), !0;
};
