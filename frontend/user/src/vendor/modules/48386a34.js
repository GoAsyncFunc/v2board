let legacyModule = module,
  legacyExports = exports;
var r = require("./getMapData.js");
function i(e, t) {
  var n = r(this, e),
    i = n.size;
  return n.set(e, t), this.size += n.size == i ? 0 : 1, this;
}
legacyModule.exports = i;
