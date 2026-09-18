let legacyModule = module,
  legacyExports = exports;
var r = require("./nativeObjectCreate.js"),
  i = Object.prototype,
  o = i.hasOwnProperty;
function a(e) {
  var t = this.__data__;
  return r ? void 0 !== t[e] : o.call(t, e);
}
legacyModule.exports = a;
