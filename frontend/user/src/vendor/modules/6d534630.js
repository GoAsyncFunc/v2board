let legacyModule = module,
  legacyExports = exports;
var r = require("./markdownUtils.js").arrayReplaceAt;
function o(e) {
  return /^<a[>\s]/i.test(e);
}
function i(e) {
  return /^<\/a\s*>/i.test(e);
}
legacyModule.exports = function (e) {
  var t,
    n,
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
    x = e.tokens;
  if (e.md.options.linkify) for (n = 0, a = x.length; n < a; n++) if ("inline" === x[n].type && e.md.linkify.pretest(x[n].content)) for (s = x[n].children, v = 0, t = s.length - 1; t >= 0; t--) if (u = s[t], "link_close" !== u.type) {
    if ("html_inline" === u.type && (o(u.content) && v > 0 && v--, i(u.content) && v++), !(v > 0) && "text" === u.type && e.md.linkify.test(u.content)) {
      for (p = u.content, w = e.md.linkify.match(p), l = [], m = u.level, h = 0, f = 0; f < w.length; f++) y = w[f].url, g = e.md.normalizeLink(y), e.md.validateLink(g) && (b = w[f].text, b = w[f].schema ? "mailto:" !== w[f].schema || /^mailto:/i.test(b) ? e.md.normalizeLinkText(b) : e.md.normalizeLinkText("mailto:" + b).replace(/^mailto:/, "") : e.md.normalizeLinkText("http://" + b).replace(/^http:\/\//, ""), d = w[f].index, d > h && (c = new e.Token("text", "", 0), c.content = p.slice(h, d), c.level = m, l.push(c)), c = new e.Token("link_open", "a", 1), c.attrs = [["href", g]], c.level = m++, c.markup = "linkify", c.info = "auto", l.push(c), c = new e.Token("text", "", 0), c.content = b, c.level = m, l.push(c), c = new e.Token("link_close", "a", -1), c.level = --m, c.markup = "linkify", c.info = "auto", l.push(c), h = w[f].lastIndex);
      h < p.length && (c = new e.Token("text", "", 0), c.content = p.slice(h), c.level = m, l.push(c)), x[n].children = s = r(s, t, l);
    }
  } else {
    t--;
    while (s[t].level !== u.level && "link_open" !== s[t].type) t--;
  }
};
