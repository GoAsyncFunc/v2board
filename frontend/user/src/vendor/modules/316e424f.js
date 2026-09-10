let legacyModule = module,
  legacyExports = exports;
var r = require("./4147676d.js").normalizeReference,
  o = require("./4147676d.js").isSpace;
legacyModule.exports = function (e, t, n, i) {
  var a,
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
    O = 0,
    E = e.bMarks[t] + e.tShift[t],
    _ = e.eMarks[t],
    k = t + 1;
  if (e.sCount[t] - e.blkIndent >= 4) return !1;
  if (91 !== e.src.charCodeAt(E)) return !1;
  while (++E < _) if (93 === e.src.charCodeAt(E) && 92 !== e.src.charCodeAt(E - 1)) {
    if (E + 1 === _) return !1;
    if (58 !== e.src.charCodeAt(E + 1)) return !1;
    break;
  }
  for (u = e.lineMax, w = e.md.block.ruler.getRules("reference"), m = e.parentType, e.parentType = "reference"; k < u && !e.isEmpty(k); k++) if (!(e.sCount[k] - e.blkIndent > 3) && !(e.sCount[k] < 0)) {
    for (b = !1, f = 0, p = w.length; f < p; f++) if (w[f](e, k, u, !0)) {
      b = !0;
      break;
    }
    if (b) break;
  }
  for (g = e.getLines(t, k, e.blkIndent, !1).trim(), _ = g.length, E = 1; E < _; E++) {
    if (a = g.charCodeAt(E), 91 === a) return !1;
    if (93 === a) {
      h = E;
      break;
    }
    10 === a ? O++ : 92 === a && (E++, E < _ && 10 === g.charCodeAt(E) && O++);
  }
  if (h < 0 || 58 !== g.charCodeAt(h + 1)) return !1;
  for (E = h + 2; E < _; E++) if (a = g.charCodeAt(E), 10 === a) O++;else if (!o(a)) break;
  if (v = e.md.helpers.parseLinkDestination(g, E, _), !v.ok) return !1;
  if (l = e.md.normalizeLink(v.str), !e.md.validateLink(l)) return !1;
  for (E = v.pos, O += v.lines, s = E, c = O, y = E; E < _; E++) if (a = g.charCodeAt(E), 10 === a) O++;else if (!o(a)) break;
  v = e.md.helpers.parseLinkTitle(g, E, _), E < _ && y !== E && v.ok ? (x = v.str, E = v.pos, O += v.lines) : (x = "", E = s, O = c);
  while (E < _) {
    if (a = g.charCodeAt(E), !o(a)) break;
    E++;
  }
  if (E < _ && 10 !== g.charCodeAt(E) && x) {
    x = "", E = s, O = c;
    while (E < _) {
      if (a = g.charCodeAt(E), !o(a)) break;
      E++;
    }
  }
  return !(E < _ && 10 !== g.charCodeAt(E)) && (d = r(g.slice(1, h)), !!d && (!!i || ("undefined" === typeof e.env.references && (e.env.references = {}), "undefined" === typeof e.env.references[d] && (e.env.references[d] = {
    title: x,
    href: l
  }), e.parentType = m, e.line = t + O + 1, !0)));
};
