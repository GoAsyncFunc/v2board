let legacyModule = module,
  legacyExports = exports;
var r = require("./getMapData.js");
function i(e) {
  return r(this, e).has(e);
}
legacyModule.exports = i;
