let legacyModule = module,
  legacyExports = exports;
var r = /^([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,
  i = /^([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)$/;
legacyModule.exports = function (e, t) {
  var n,
    o,
    a,
    s,
    l,
    u,
    c = e.pos;
  if (60 !== e.src.charCodeAt(c)) return !1;
  for (l = e.pos, u = e.posMax;;) {
    if (++c >= u) return !1;
    if (s = e.src.charCodeAt(c), 60 === s) return !1;
    if (62 === s) break;
  }
  return n = e.src.slice(l + 1, c), i.test(n) ? (o = e.md.normalizeLink(n), !!e.md.validateLink(o) && (t || (a = e.push("link_open", "a", 1), a.attrs = [["href", o]], a.markup = "autolink", a.info = "auto", a = e.push("text", "", 0), a.content = e.md.normalizeLinkText(n), a = e.push("link_close", "a", -1), a.markup = "autolink", a.info = "auto"), e.pos += n.length + 2, !0)) : !!r.test(n) && (o = e.md.normalizeLink("mailto:" + n), !!e.md.validateLink(o) && (t || (a = e.push("link_open", "a", 1), a.attrs = [["href", o]], a.markup = "autolink", a.info = "auto", a = e.push("text", "", 0), a.content = e.md.normalizeLinkText(n), a = e.push("link_close", "a", -1), a.markup = "autolink", a.info = "auto"), e.pos += n.length + 2, !0));
};
