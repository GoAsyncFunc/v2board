let legacyModule = module,
  legacyExports = exports;
var baseToString = require("./baseToString.js");
function toString(value) {
  return null == value ? "" : baseToString(value);
}
legacyModule.exports = toString;
