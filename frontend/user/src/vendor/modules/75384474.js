let legacyModule = module,
  legacyExports = exports;
var r = require("./nativeObjectCreate.js"),
  i = "__lodash_hash_undefined__",
  a = Object.prototype,
  o = a.hasOwnProperty;
function u(e) {
  var t = this.__data__;
  if (r) {
    var n = t[e];
    return n === i ? void 0 : n;
  }
  return o.call(t, e) ? t[e] : void 0;
}
legacyModule.exports = u;
