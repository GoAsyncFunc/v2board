let legacyModule = module,
  legacyExports = exports;
var r = require("./75382b75.js"),
  o = require("./globalObject.js").document,
  i = r(o) && r(o.createElement);
legacyModule.exports = function (e) {
  return i ? o.createElement(e) : {};
};
