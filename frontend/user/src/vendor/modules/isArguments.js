let legacyModule = module,
  legacyExports = exports;
var r = require("./getTag.js"),
  i = require("./isObjectLikeLegacy.js"),
  a = "[object Arguments]";
function o(e) {
  return i(e) && r(e) == a;
}
legacyModule.exports = o;
