let legacyModule = module,
  legacyExports = exports;
var r = require("./getMapData.js");
function i(e) {
  var t = r(this, e)["delete"](e);
  return this.size -= t ? 1 : 0, t;
}
legacyModule.exports = i;
