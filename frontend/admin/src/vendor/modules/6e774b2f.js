let legacyModule = module,
  legacyExports = exports;
var r = require("./definePropertyHelper.js").f,
  i = Function.prototype,
  o = /^\s*function ([^ (]*)/,
  a = "name";
a in i || require("./descriptorsLegacySupport.js") && r(i, a, {
  configurable: !0,
  get: function () {
    try {
      return ("" + this).match(o)[1];
    } catch (e) {
      return "";
    }
  }
});
