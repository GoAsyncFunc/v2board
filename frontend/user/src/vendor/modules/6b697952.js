let legacyModule = module,
  legacyExports = exports;
function r(e, t) {
  var n,
    r,
    o,
    i,
    a,
    s = [],
    c = t.length;
  for (n = 0; n < c; n++) o = t[n], 126 === o.marker && -1 !== o.end && (i = t[o.end], a = e.tokens[o.token], a.type = "s_open", a.tag = "s", a.nesting = 1, a.markup = "~~", a.content = "", a = e.tokens[i.token], a.type = "s_close", a.tag = "s", a.nesting = -1, a.markup = "~~", a.content = "", "text" === e.tokens[i.token - 1].type && "~" === e.tokens[i.token - 1].content && s.push(i.token - 1));
  while (s.length) {
    n = s.pop(), r = n + 1;
    while (r < e.tokens.length && "s_close" === e.tokens[r].type) r++;
    r--, n !== r && (a = e.tokens[r], e.tokens[r] = e.tokens[n], e.tokens[n] = a);
  }
}
legacyModule.exports.tokenize = function (e, t) {
  var n,
    r,
    o,
    i,
    a,
    s = e.pos,
    c = e.src.charCodeAt(s);
  if (t) return !1;
  if (126 !== c) return !1;
  if (r = e.scanDelims(e.pos, !0), i = r.length, a = String.fromCharCode(c), i < 2) return !1;
  for (i % 2 && (o = e.push("text", "", 0), o.content = a, i--), n = 0; n < i; n += 2) o = e.push("text", "", 0), o.content = a + a, e.delimiters.push({
    marker: c,
    length: 0,
    token: e.tokens.length - 1,
    end: -1,
    open: r.can_open,
    close: r.can_close
  });
  return e.pos += r.length, !0;
}, legacyModule.exports.postProcess = function (e) {
  var t,
    n = e.tokens_meta,
    o = e.tokens_meta.length;
  for (r(e, e.delimiters), t = 0; t < o; t++) n[t] && n[t].delimiters && r(e, n[t].delimiters);
};
