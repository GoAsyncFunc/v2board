let legacyModule = module,
  legacyExports = exports;
var r = require("./markdownUtils.js").arrayReplaceAt;
function i(e) {
  return /^<a[>\s]/i.test(e);
}
function o(e) {
  return /^<\/a\s*>/i.test(e);
}
legacyModule.exports = function (e) {
  var t,
    n,
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
    _ = e.tokens;
  if (e.md.options.linkify) for (n = 0, a = _.length; n < a; n++) if ("inline" === _[n].type && e.md.linkify.pretest(_[n].content)) for (s = _[n].children, m = 0, t = s.length - 1; t >= 0; t--) if (u = s[t], "link_close" !== u.type) {
    if ("html_inline" === u.type && (i(u.content) && m > 0 && m--, o(u.content) && m++), !(m > 0) && "text" === u.type && e.md.linkify.test(u.content)) {
      for (d = u.content, x = e.md.linkify.match(d), c = [], g = u.level, p = 0, f = 0; f < x.length; f++) v = x[f].url, y = e.md.normalizeLink(v), e.md.validateLink(y) && (b = x[f].text, b = x[f].schema ? "mailto:" !== x[f].schema || /^mailto:/i.test(b) ? e.md.normalizeLinkText(b) : e.md.normalizeLinkText("mailto:" + b).replace(/^mailto:/, "") : e.md.normalizeLinkText("http://" + b).replace(/^http:\/\//, ""), h = x[f].index, h > p && (l = new e.Token("text", "", 0), l.content = d.slice(p, h), l.level = g, c.push(l)), l = new e.Token("link_open", "a", 1), l.attrs = [["href", y]], l.level = g++, l.markup = "linkify", l.info = "auto", c.push(l), l = new e.Token("text", "", 0), l.content = b, l.level = g, c.push(l), l = new e.Token("link_close", "a", -1), l.level = --g, l.markup = "linkify", l.info = "auto", c.push(l), p = x[f].lastIndex);
      p < d.length && (l = new e.Token("text", "", 0), l.content = d.slice(p), l.level = g, c.push(l)), _[n].children = s = r(s, t, c);
    }
  } else {
    t--;
    while (s[t].level !== u.level && "link_open" !== s[t].type) t--;
  }
};
