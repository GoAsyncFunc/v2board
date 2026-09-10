let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = function (e) {
  var t,
    n,
    r = 0,
    o = e.tokens,
    i = e.tokens.length;
  for (t = n = 0; t < i; t++) o[t].nesting < 0 && r--, o[t].level = r, o[t].nesting > 0 && r++, "text" === o[t].type && t + 1 < i && "text" === o[t + 1].type ? o[t + 1].content = o[t].content + o[t + 1].content : (t !== n && (o[n] = o[t]), n++);
  t !== n && (o.length = n);
};
