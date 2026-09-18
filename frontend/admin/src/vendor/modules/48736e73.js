let legacyModule = module,
  legacyExports = exports;
var r = require("./isObjectLegacy.js"),
  i = require("./globalObject.js").document,
  o = r(i) && r(i.createElement);
legacyModule.exports = function (e) {
  return o ? i.createElement(e) : {};
};
