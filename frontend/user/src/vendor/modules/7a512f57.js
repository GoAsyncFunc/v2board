let legacyModule = module,
  legacyExports = exports;
var r = require("./markdownUtils.js").normalizeReference,
  o = require("./markdownUtils.js").isSpace;
legacyModule.exports = function (e, t) {
  var n,
    i,
    a,
    s,
    c,
    u,
    l,
    f,
    p,
    d = "",
    h = "",
    m = e.pos,
    v = e.posMax,
    y = e.pos,
    g = !0;
  if (91 !== e.src.charCodeAt(e.pos)) return !1;
  if (c = e.pos + 1, s = e.md.helpers.parseLinkLabel(e, e.pos, !0), s < 0) return !1;
  if (u = s + 1, u < v && 40 === e.src.charCodeAt(u)) {
    for (g = !1, u++; u < v; u++) if (i = e.src.charCodeAt(u), !o(i) && 10 !== i) break;
    if (u >= v) return !1;
    if (y = u, l = e.md.helpers.parseLinkDestination(e.src, u, e.posMax), l.ok) {
      for (d = e.md.normalizeLink(l.str), e.md.validateLink(d) ? u = l.pos : d = "", y = u; u < v; u++) if (i = e.src.charCodeAt(u), !o(i) && 10 !== i) break;
      if (l = e.md.helpers.parseLinkTitle(e.src, u, e.posMax), u < v && y !== u && l.ok) for (h = l.str, u = l.pos; u < v; u++) if (i = e.src.charCodeAt(u), !o(i) && 10 !== i) break;
    }
    (u >= v || 41 !== e.src.charCodeAt(u)) && (g = !0), u++;
  }
  if (g) {
    if ("undefined" === typeof e.env.references) return !1;
    if (u < v && 91 === e.src.charCodeAt(u) ? (y = u + 1, u = e.md.helpers.parseLinkLabel(e, u), u >= 0 ? a = e.src.slice(y, u++) : u = s + 1) : u = s + 1, a || (a = e.src.slice(c, s)), f = e.env.references[r(a)], !f) return e.pos = m, !1;
    d = f.href, h = f.title;
  }
  return t || (e.pos = c, e.posMax = s, p = e.push("link_open", "a", 1), p.attrs = n = [["href", d]], h && n.push(["title", h]), e.md.inline.tokenize(e), p = e.push("link_close", "a", -1)), e.pos = u, e.posMax = v, !0;
};
