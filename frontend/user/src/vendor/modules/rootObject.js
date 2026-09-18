let legacyModule = module,
  legacyExports = exports;
var r = require("./globalObjectFromLegacy.js"),
  i = "object" == typeof self && self && self.Object === Object && self,
  a = r || i || Function("return this")();
legacyModule.exports = a;
