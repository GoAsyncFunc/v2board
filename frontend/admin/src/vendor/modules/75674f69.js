let legacyModule = module,
  legacyExports = exports;
var r = require("./globalObjectFromLegacy.js"),
  i = "object" == typeof self && self && self.Object === Object && self,
  o = r || i || Function("return this")();
legacyModule.exports = o;
