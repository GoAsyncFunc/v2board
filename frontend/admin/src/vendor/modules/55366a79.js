let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = r;
var n = Object.prototype.hasOwnProperty;
function r() {
  for (var e = {}, t = 0; t < arguments.length; t++) {
    var r = arguments[t];
    for (var i in r) n.call(r, i) && (e[i] = r[i]);
  }
  return e;
}
