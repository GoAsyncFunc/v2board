let legacyModule = module,
  legacyExports = exports;
var r = require("./baseToString.js");
function i(e) {
  return null == e ? "" : r(e);
}
legacyModule.exports = i;
