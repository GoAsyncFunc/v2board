let legacyModule = module,
  legacyExports = exports;
var r = require("./assocIndexOf.js");
function i(e, t) {
  var n = this.__data__,
    i = r(n, e);
  return i < 0 ? (++this.size, n.push([e, t])) : n[i][1] = t, this;
}
legacyModule.exports = i;
