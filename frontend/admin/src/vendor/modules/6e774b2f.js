let legacyModule = module,
  legacyExports = exports;
var r = require("./56352f31.js").f,
  i = Function.prototype,
  o = /^\s*function ([^ (]*)/,
  a = "name";
a in i || require("./385a2f56.js") && r(i, a, {
  configurable: !0,
  get: function () {
    try {
      return ("" + this).match(o)[1];
    } catch (e) {
      return "";
    }
  }
});
