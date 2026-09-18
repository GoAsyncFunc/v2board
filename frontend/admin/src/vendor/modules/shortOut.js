let legacyModule = module,
  legacyExports = exports;
var n = 800,
  r = 16,
  i = Date.now;
function o(e) {
  var t = 0,
    o = 0;
  return function () {
    var a = i(),
      s = r - (a - o);
    if (o = a, s > 0) {
      if (++t >= n) return arguments[0];
    } else t = 0;
    return e.apply(void 0, arguments);
  };
}
legacyModule.exports = o;
