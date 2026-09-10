let legacyModule = module,
  legacyExports = exports;
var r = require("./56352f31.js").f,
  o = Function.prototype,
  i = /^\s*function ([^ (]*)/,
  a = "name";
a in o || require("./385a2f56.js") && r(o, a, {
  configurable: !0,
  get: function () {
    try {
      return ("" + this).match(i)[1];
    } catch (e) {
      return "";
    }
  }
});
