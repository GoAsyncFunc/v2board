let legacyModule = module,
  legacyExports = exports;
function n(e) {
  var t = [];
  if (null != e) for (var n in Object(e)) t.push(n);
  return t;
}
legacyModule.exports = n;
