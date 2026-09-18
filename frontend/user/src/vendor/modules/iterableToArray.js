let legacyModule = module,
  legacyExports = exports;
var r = require("./arrayWithHoles.js"),
  o = require("./iterableToArrayLimit.js"),
  i = require("./nonIterableRest.js");
function a(e, t) {
  return r(e) || o(e, t) || i();
}
legacyModule.exports = a;
