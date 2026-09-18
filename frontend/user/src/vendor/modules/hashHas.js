let legacyModule = module,
  legacyExports = exports;
var r = require("./nativeObjectCreate.js"),
  i = Object.prototype,
  a = i.hasOwnProperty;
function o(e) {
  var t = this.__data__;
  return r ? void 0 !== t[e] : a.call(t, e);
}
legacyModule.exports = o;
