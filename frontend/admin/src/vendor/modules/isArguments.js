let legacyModule = module,
  legacyExports = exports;
var r = require("./getTag.js"),
  i = require("./isObjectLikeLegacy.js"),
  o = "[object Arguments]";
function a(e) {
  return i(e) && r(e) == o;
}
legacyModule.exports = a;
