let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = function (e) {
  var t,
    n,
    r,
    o = e.tokens;
  for (n = 0, r = o.length; n < r; n++) t = o[n], "inline" === t.type && e.md.inline.parse(t.content, e.md, e.env, t.children);
};
