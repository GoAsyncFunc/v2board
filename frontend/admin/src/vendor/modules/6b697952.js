let legacyModule = module,
  legacyExports = exports;
function r(e, t) {
  var n,
    r,
    i,
    o,
    a,
    s = [],
    l = t.length;
  for (n = 0; n < l; n++) i = t[n], 126 === i.marker && -1 !== i.end && (o = t[i.end], a = e.tokens[i.token], a.type = "s_open", a.tag = "s", a.nesting = 1, a.markup = "~~", a.content = "", a = e.tokens[o.token], a.type = "s_close", a.tag = "s", a.nesting = -1, a.markup = "~~", a.content = "", "text" === e.tokens[o.token - 1].type && "~" === e.tokens[o.token - 1].content && s.push(o.token - 1));
  while (s.length) {
    n = s.pop(), r = n + 1;
    while (r < e.tokens.length && "s_close" === e.tokens[r].type) r++;
    r--, n !== r && (a = e.tokens[r], e.tokens[r] = e.tokens[n], e.tokens[n] = a);
  }
}
legacyModule.exports.tokenize = function (e, t) {
  var n,
    r,
    i,
    o,
    a,
    s = e.pos,
    l = e.src.charCodeAt(s);
  if (t) return !1;
  if (126 !== l) return !1;
  if (r = e.scanDelims(e.pos, !0), o = r.length, a = String.fromCharCode(l), o < 2) return !1;
  for (o % 2 && (i = e.push("text", "", 0), i.content = a, o--), n = 0; n < o; n += 2) i = e.push("text", "", 0), i.content = a + a, e.delimiters.push({
    marker: l,
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
    i = e.tokens_meta.length;
  for (r(e, e.delimiters), t = 0; t < i; t++) n[t] && n[t].delimiters && r(e, n[t].delimiters);
};
