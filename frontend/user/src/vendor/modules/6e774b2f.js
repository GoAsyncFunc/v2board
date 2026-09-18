let legacyModule = module,
  legacyExports = exports;
var r = require("./definePropertyHelper.js").f,
  o = Function.prototype,
  i = /^\s*function ([^ (]*)/,
  a = "name";
a in o || require("./descriptorsLegacySupport.js") && r(o, a, {
  configurable: !0,
  get: function () {
    try {
      return ("" + this).match(i)[1];
    } catch (e) {
      return "";
    }
  }
});
