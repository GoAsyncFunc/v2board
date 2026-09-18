let legacyModule = module,
  legacyExports = exports;
var r = require("./markdownUtils.js").normalizeReference,
  i = require("./markdownUtils.js").isSpace;
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
    h,
    p,
    g,
    m,
    v = "",
    y = e.pos,
    b = e.posMax;
  if (33 !== e.src.charCodeAt(e.pos)) return !1;
  if (91 !== e.src.charCodeAt(e.pos + 1)) return !1;
  if (u = e.pos + 2, l = e.md.helpers.parseLinkLabel(e, e.pos + 1, !1), l < 0) return !1;
  if (c = l + 1, c < b && 40 === e.src.charCodeAt(c)) {
    for (c++; c < b; c++) if (o = e.src.charCodeAt(c), !i(o) && 10 !== o) break;
    if (c >= b) return !1;
    for (m = c, d = e.md.helpers.parseLinkDestination(e.src, c, e.posMax), d.ok && (v = e.md.normalizeLink(d.str), e.md.validateLink(v) ? c = d.pos : v = ""), m = c; c < b; c++) if (o = e.src.charCodeAt(c), !i(o) && 10 !== o) break;
    if (d = e.md.helpers.parseLinkTitle(e.src, c, e.posMax), c < b && m !== c && d.ok) {
      for (h = d.str, c = d.pos; c < b; c++) if (o = e.src.charCodeAt(c), !i(o) && 10 !== o) break;
    } else h = "";
    if (c >= b || 41 !== e.src.charCodeAt(c)) return e.pos = y, !1;
    c++;
  } else {
    if ("undefined" === typeof e.env.references) return !1;
    if (c < b && 91 === e.src.charCodeAt(c) ? (m = c + 1, c = e.md.helpers.parseLinkLabel(e, c), c >= 0 ? s = e.src.slice(m, c++) : c = l + 1) : c = l + 1, s || (s = e.src.slice(u, l)), f = e.env.references[r(s)], !f) return e.pos = y, !1;
    v = f.href, h = f.title;
  }
  return t || (a = e.src.slice(u, l), e.md.inline.parse(a, e.md, e.env, g = []), p = e.push("image", "img", 0), p.attrs = n = [["src", v], ["alt", ""]], p.children = g, p.content = a, h && n.push(["title", h])), e.pos = c, e.posMax = b, !0;
};
