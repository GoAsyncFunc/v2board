let legacyModule = module,
  legacyExports = exports;
var r = require("./nativeObjectCreate.js"),
  i = "__lodash_hash_undefined__";
function o(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = r && void 0 === t ? i : t, this;
}
legacyModule.exports = o;
