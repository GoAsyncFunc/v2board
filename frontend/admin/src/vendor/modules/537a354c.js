let legacyModule = module,
  legacyExports = exports;
var r = require("./markdownUtils.js").isSpace;
function i(e, t) {
  var n, i, o, a;
  return i = e.bMarks[t] + e.tShift[t], o = e.eMarks[t], n = e.src.charCodeAt(i++), 42 !== n && 45 !== n && 43 !== n ? -1 : i < o && (a = e.src.charCodeAt(i), !r(a)) ? -1 : i;
}
function o(e, t) {
  var n,
    i = e.bMarks[t] + e.tShift[t],
    o = i,
    a = e.eMarks[t];
  if (o + 1 >= a) return -1;
  if (n = e.src.charCodeAt(o++), n < 48 || n > 57) return -1;
  for (;;) {
    if (o >= a) return -1;
    if (n = e.src.charCodeAt(o++), !(n >= 48 && n <= 57)) {
      if (41 === n || 46 === n) break;
      return -1;
    }
    if (o - i >= 10) return -1;
  }
  return o < a && (n = e.src.charCodeAt(o), !r(n)) ? -1 : o;
}
function a(e, t) {
  var n,
    r,
    i = e.level + 2;
  for (n = t + 2, r = e.tokens.length - 2; n < r; n++) e.tokens[n].level === i && "paragraph_open" === e.tokens[n].type && (e.tokens[n + 2].hidden = !0, e.tokens[n].hidden = !0, n += 2);
}
legacyModule.exports = function (e, t, n, r) {
  var s,
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
    k,
    j,
    M,
    C,
    T,
    I,
    D,
    A,
    E,
    P,
    L = !1,
    N = !0;
  if (e.sCount[t] - e.blkIndent >= 4) return !1;
  if (e.listIndent >= 0 && e.sCount[t] - e.listIndent >= 4 && e.sCount[t] < e.blkIndent) return !1;
  if (r && "paragraph" === e.parentType && e.sCount[t] >= e.blkIndent && (L = !0), (T = o(e, t)) >= 0) {
    if (h = !0, D = e.bMarks[t] + e.tShift[t], b = Number(e.src.slice(D, T - 1)), L && 1 !== b) return !1;
  } else {
    if (!((T = i(e, t)) >= 0)) return !1;
    h = !1;
  }
  if (L && e.skipSpaces(T) >= e.eMarks[t]) return !1;
  if (y = e.src.charCodeAt(T - 1), r) return !0;
  v = e.tokens.length, h ? (P = e.push("ordered_list_open", "ol", 1), 1 !== b && (P.attrs = [["start", b]])) : P = e.push("bullet_list_open", "ul", 1), P.map = m = [t, 0], P.markup = String.fromCharCode(y), _ = t, I = !1, E = e.md.block.ruler.getRules("list"), S = e.parentType, e.parentType = "list";
  while (_ < n) {
    C = T, x = e.eMarks[_], d = w = e.sCount[_] + T - (e.bMarks[t] + e.tShift[t]);
    while (C < x) {
      if (s = e.src.charCodeAt(C), 9 === s) w += 4 - (w + e.bsCount[_]) % 4;else {
        if (32 !== s) break;
        w++;
      }
      C++;
    }
    if (l = C, f = l >= x ? 1 : w - d, f > 4 && (f = 1), c = d + f, P = e.push("list_item_open", "li", 1), P.markup = String.fromCharCode(y), P.map = p = [t, 0], h && (P.info = e.src.slice(D, T - 1)), M = e.tight, j = e.tShift[t], k = e.sCount[t], O = e.listIndent, e.listIndent = e.blkIndent, e.blkIndent = c, e.tight = !0, e.tShift[t] = l - e.bMarks[t], e.sCount[t] = w, l >= x && e.isEmpty(t + 1) ? e.line = Math.min(e.line + 2, n) : e.md.block.tokenize(e, t, n, !0), e.tight && !I || (N = !1), I = e.line - t > 1 && e.isEmpty(e.line - 1), e.blkIndent = e.listIndent, e.listIndent = O, e.tShift[t] = j, e.sCount[t] = k, e.tight = M, P = e.push("list_item_close", "li", -1), P.markup = String.fromCharCode(y), _ = t = e.line, p[1] = _, l = e.bMarks[t], _ >= n) break;
    if (e.sCount[_] < e.blkIndent) break;
    if (e.sCount[t] - e.blkIndent >= 4) break;
    for (A = !1, u = 0, g = E.length; u < g; u++) if (E[u](e, _, n, !0)) {
      A = !0;
      break;
    }
    if (A) break;
    if (h) {
      if (T = o(e, _), T < 0) break;
      D = e.bMarks[_] + e.tShift[_];
    } else if (T = i(e, _), T < 0) break;
    if (y !== e.src.charCodeAt(T - 1)) break;
  }
  return P = h ? e.push("ordered_list_close", "ol", -1) : e.push("bullet_list_close", "ul", -1), P.markup = String.fromCharCode(y), m[1] = _, e.line = _, e.parentType = S, N && a(e, v), !0;
};
