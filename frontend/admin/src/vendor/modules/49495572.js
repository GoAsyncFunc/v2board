let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = function (e) {
  var t,
    n,
    r = 0,
    i = e.tokens,
    o = e.tokens.length;
  for (t = n = 0; t < o; t++) i[t].nesting < 0 && r--, i[t].level = r, i[t].nesting > 0 && r++, "text" === i[t].type && t + 1 < o && "text" === i[t + 1].type ? i[t + 1].content = i[t].content + i[t + 1].content : (t !== n && (i[n] = i[t]), n++);
  t !== n && (i.length = n);
};
