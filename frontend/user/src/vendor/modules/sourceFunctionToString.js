let legacyModule = module,
  legacyExports = exports;
var n = Function.prototype,
  r = n.toString;
function i(e) {
  if (null != e) {
    try {
      return r.call(e);
    } catch (e) {}
    try {
      return e + "";
    } catch (e) {}
  }
  return "";
}
legacyModule.exports = i;
