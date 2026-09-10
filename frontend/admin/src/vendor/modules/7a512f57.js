let legacyModule = module,
  legacyExports = exports;
var r = require("./4147676d.js").normalizeReference,
  i = require("./4147676d.js").isSpace;
legacyModule.exports = function (e, t) {
  var n,
    o,
    a,
    s,
    l,
    u,
    c,
    f,
    d,
    h = "",
    p = "",
    g = e.pos,
    m = e.posMax,
    v = e.pos,
    y = !0;
  if (91 !== e.src.charCodeAt(e.pos)) return !1;
  if (l = e.pos + 1, s = e.md.helpers.parseLinkLabel(e, e.pos, !0), s < 0) return !1;
  if (u = s + 1, u < m && 40 === e.src.charCodeAt(u)) {
    for (y = !1, u++; u < m; u++) if (o = e.src.charCodeAt(u), !i(o) && 10 !== o) break;
    if (u >= m) return !1;
    if (v = u, c = e.md.helpers.parseLinkDestination(e.src, u, e.posMax), c.ok) {
      for (h = e.md.normalizeLink(c.str), e.md.validateLink(h) ? u = c.pos : h = "", v = u; u < m; u++) if (o = e.src.charCodeAt(u), !i(o) && 10 !== o) break;
      if (c = e.md.helpers.parseLinkTitle(e.src, u, e.posMax), u < m && v !== u && c.ok) for (p = c.str, u = c.pos; u < m; u++) if (o = e.src.charCodeAt(u), !i(o) && 10 !== o) break;
    }
    (u >= m || 41 !== e.src.charCodeAt(u)) && (y = !0), u++;
  }
  if (y) {
    if ("undefined" === typeof e.env.references) return !1;
    if (u < m && 91 === e.src.charCodeAt(u) ? (v = u + 1, u = e.md.helpers.parseLinkLabel(e, u), u >= 0 ? a = e.src.slice(v, u++) : u = s + 1) : u = s + 1, a || (a = e.src.slice(l, s)), f = e.env.references[r(a)], !f) return e.pos = g, !1;
    h = f.href, p = f.title;
  }
  return t || (e.pos = l, e.posMax = s, d = e.push("link_open", "a", 1), d.attrs = n = [["href", h]], p && n.push(["title", p]), e.md.inline.tokenize(e), d = e.push("link_close", "a", -1)), e.pos = u, e.posMax = m, !0;
};
