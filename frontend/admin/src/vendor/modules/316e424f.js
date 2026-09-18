let legacyModule = module,
  legacyExports = exports;
var r = require("./markdownUtils.js").normalizeReference,
  i = require("./markdownUtils.js").isSpace;
legacyModule.exports = function (e, t, n, o) {
  var a,
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
    w = 0,
    O = e.bMarks[t] + e.tShift[t],
    S = e.eMarks[t],
    k = t + 1;
  if (e.sCount[t] - e.blkIndent >= 4) return !1;
  if (91 !== e.src.charCodeAt(O)) return !1;
  while (++O < S) if (93 === e.src.charCodeAt(O) && 92 !== e.src.charCodeAt(O - 1)) {
    if (O + 1 === S) return !1;
    if (58 !== e.src.charCodeAt(O + 1)) return !1;
    break;
  }
  for (u = e.lineMax, x = e.md.block.ruler.getRules("reference"), g = e.parentType, e.parentType = "reference"; k < u && !e.isEmpty(k); k++) if (!(e.sCount[k] - e.blkIndent > 3) && !(e.sCount[k] < 0)) {
    for (b = !1, f = 0, d = x.length; f < d; f++) if (x[f](e, k, u, !0)) {
      b = !0;
      break;
    }
    if (b) break;
  }
  for (y = e.getLines(t, k, e.blkIndent, !1).trim(), S = y.length, O = 1; O < S; O++) {
    if (a = y.charCodeAt(O), 91 === a) return !1;
    if (93 === a) {
      p = O;
      break;
    }
    10 === a ? w++ : 92 === a && (O++, O < S && 10 === y.charCodeAt(O) && w++);
  }
  if (p < 0 || 58 !== y.charCodeAt(p + 1)) return !1;
  for (O = p + 2; O < S; O++) if (a = y.charCodeAt(O), 10 === a) w++;else if (!i(a)) break;
  if (m = e.md.helpers.parseLinkDestination(y, O, S), !m.ok) return !1;
  if (c = e.md.normalizeLink(m.str), !e.md.validateLink(c)) return !1;
  for (O = m.pos, w += m.lines, s = O, l = w, v = O; O < S; O++) if (a = y.charCodeAt(O), 10 === a) w++;else if (!i(a)) break;
  m = e.md.helpers.parseLinkTitle(y, O, S), O < S && v !== O && m.ok ? (_ = m.str, O = m.pos, w += m.lines) : (_ = "", O = s, w = l);
  while (O < S) {
    if (a = y.charCodeAt(O), !i(a)) break;
    O++;
  }
  if (O < S && 10 !== y.charCodeAt(O) && _) {
    _ = "", O = s, w = l;
    while (O < S) {
      if (a = y.charCodeAt(O), !i(a)) break;
      O++;
    }
  }
  return !(O < S && 10 !== y.charCodeAt(O)) && (h = r(y.slice(1, p)), !!h && (!!o || ("undefined" === typeof e.env.references && (e.env.references = {}), "undefined" === typeof e.env.references[h] && (e.env.references[h] = {
    title: _,
    href: c
  }), e.parentType = g, e.line = t + w + 1, !0)));
};
