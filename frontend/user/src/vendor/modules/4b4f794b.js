let legacyModule = module,
  legacyExports = exports;
var r = /^([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,
  o = /^([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)$/;
legacyModule.exports = function (e, t) {
  var n,
    i,
    a,
    s,
    c,
    u,
    l = e.pos;
  if (60 !== e.src.charCodeAt(l)) return !1;
  for (c = e.pos, u = e.posMax;;) {
    if (++l >= u) return !1;
    if (s = e.src.charCodeAt(l), 60 === s) return !1;
    if (62 === s) break;
  }
  return n = e.src.slice(c + 1, l), o.test(n) ? (i = e.md.normalizeLink(n), !!e.md.validateLink(i) && (t || (a = e.push("link_open", "a", 1), a.attrs = [["href", i]], a.markup = "autolink", a.info = "auto", a = e.push("text", "", 0), a.content = e.md.normalizeLinkText(n), a = e.push("link_close", "a", -1), a.markup = "autolink", a.info = "auto"), e.pos += n.length + 2, !0)) : !!r.test(n) && (i = e.md.normalizeLink("mailto:" + n), !!e.md.validateLink(i) && (t || (a = e.push("link_open", "a", 1), a.attrs = [["href", i]], a.markup = "autolink", a.info = "auto", a = e.push("text", "", 0), a.content = e.md.normalizeLinkText(n), a = e.push("link_close", "a", -1), a.markup = "autolink", a.info = "auto"), e.pos += n.length + 2, !0));
};
