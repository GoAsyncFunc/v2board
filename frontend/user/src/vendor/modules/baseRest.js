let legacyModule = module,
  legacyExports = exports;
var identity = require("./identity.js"),
  overRest = require("./overRest.js"),
  setToString = require("./setToString.js");
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + "");
}
legacyModule.exports = baseRest;
