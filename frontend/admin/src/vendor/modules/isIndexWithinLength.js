let legacyModule = module,
  legacyExports = exports;
var n = 9007199254740991,
  r = /^(?:0|[1-9]\d*)$/;
function i(e, t) {
  var i = typeof e;
  return t = null == t ? n : t, !!t && ("number" == i || "symbol" != i && r.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
legacyModule.exports = i;
