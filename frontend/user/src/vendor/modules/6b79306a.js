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
    d,
    h,
    m,
    v,
    y = "",
    g = e.pos,
    b = e.posMax;
  if (33 !== e.src.charCodeAt(e.pos)) return !1;
  if (91 !== e.src.charCodeAt(e.pos + 1)) return !1;
  if (u = e.pos + 2, c = e.md.helpers.parseLinkLabel(e, e.pos + 1, !1), c < 0) return !1;
  if (l = c + 1, l < b && 40 === e.src.charCodeAt(l)) {
    for (l++; l < b; l++) if (i = e.src.charCodeAt(l), !o(i) && 10 !== i) break;
    if (l >= b) return !1;
    for (v = l, p = e.md.helpers.parseLinkDestination(e.src, l, e.posMax), p.ok && (y = e.md.normalizeLink(p.str), e.md.validateLink(y) ? l = p.pos : y = ""), v = l; l < b; l++) if (i = e.src.charCodeAt(l), !o(i) && 10 !== i) break;
    if (p = e.md.helpers.parseLinkTitle(e.src, l, e.posMax), l < b && v !== l && p.ok) {
      for (d = p.str, l = p.pos; l < b; l++) if (i = e.src.charCodeAt(l), !o(i) && 10 !== i) break;
    } else d = "";
    if (l >= b || 41 !== e.src.charCodeAt(l)) return e.pos = g, !1;
    l++;
  } else {
    if ("undefined" === typeof e.env.references) return !1;
    if (l < b && 91 === e.src.charCodeAt(l) ? (v = l + 1, l = e.md.helpers.parseLinkLabel(e, l), l >= 0 ? s = e.src.slice(v, l++) : l = c + 1) : l = c + 1, s || (s = e.src.slice(u, c)), f = e.env.references[r(s)], !f) return e.pos = g, !1;
    y = f.href, d = f.title;
  }
  return t || (a = e.src.slice(u, c), e.md.inline.parse(a, e.md, e.env, m = []), h = e.push("image", "img", 0), h.attrs = n = [["src", y], ["alt", ""]], h.children = m, h.content = a, d && n.push(["title", d])), e.pos = l, e.posMax = b, !0;
};
