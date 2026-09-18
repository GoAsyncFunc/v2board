let legacyModule = module,
  legacyExports = exports;
var r = require("./nativeObjectCreate.js"),
  i = "__lodash_hash_undefined__",
  o = Object.prototype,
  a = o.hasOwnProperty;
function s(e) {
  var t = this.__data__;
  if (r) {
    var n = t[e];
    return n === i ? void 0 : n;
  }
  return a.call(t, e) ? t[e] : void 0;
}
legacyModule.exports = s;
