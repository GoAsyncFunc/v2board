let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = function (e) {
  var t,
    n,
    r,
    i = e.tokens;
  for (n = 0, r = i.length; n < r; n++) t = i[n], "inline" === t.type && e.md.inline.parse(t.content, e.md, e.env, t.children);
};
