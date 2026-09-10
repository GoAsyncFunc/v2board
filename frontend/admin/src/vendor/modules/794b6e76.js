let legacyModule = module,
  legacyExports = exports;
function r(e, t) {
  var n,
    r,
    i,
    o,
    a,
    s,
    l = t.length;
  for (n = l - 1; n >= 0; n--) r = t[n], 95 !== r.marker && 42 !== r.marker || -1 !== r.end && (i = t[r.end], s = n > 0 && t[n - 1].end === r.end + 1 && t[n - 1].marker === r.marker && t[n - 1].token === r.token - 1 && t[r.end + 1].token === i.token + 1, a = String.fromCharCode(r.marker), o = e.tokens[r.token], o.type = s ? "strong_open" : "em_open", o.tag = s ? "strong" : "em", o.nesting = 1, o.markup = s ? a + a : a, o.content = "", o = e.tokens[i.token], o.type = s ? "strong_close" : "em_close", o.tag = s ? "strong" : "em", o.nesting = -1, o.markup = s ? a + a : a, o.content = "", s && (e.tokens[t[n - 1].token].content = "", e.tokens[t[r.end + 1].token].content = "", n--));
}
legacyModule.exports.tokenize = function (e, t) {
  var n,
    r,
    i,
    o = e.pos,
    a = e.src.charCodeAt(o);
  if (t) return !1;
  if (95 !== a && 42 !== a) return !1;
  for (r = e.scanDelims(e.pos, 42 === a), n = 0; n < r.length; n++) i = e.push("text", "", 0), i.content = String.fromCharCode(a), e.delimiters.push({
    marker: a,
    length: r.length,
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
