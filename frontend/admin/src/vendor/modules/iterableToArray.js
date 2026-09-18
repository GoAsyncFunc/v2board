let legacyModule = module,
  legacyExports = exports;
var r = require("./arrayWithHoles.js"),
  i = require("./iterableToArrayLimit.js"),
  o = require("./nonIterableRest.js");
function a(e, t) {
  return r(e) || i(e, t) || o();
}
legacyModule.exports = a;
