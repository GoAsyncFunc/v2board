let legacyModule = module,
  legacyExports = exports;
var n = Object.prototype;
function r(e) {
  var t = e && e.constructor,
    r = "function" == typeof t && t.prototype || n;
  return e === r;
}
legacyModule.exports = r;
