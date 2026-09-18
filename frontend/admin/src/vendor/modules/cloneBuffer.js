let legacyModule = module,
  legacyExports = exports;
var r = require("./nativeUint8Array.js");
function i(e) {
  var t = new e.constructor(e.byteLength);
  return new r(t).set(new r(e)), t;
}
legacyModule.exports = i;
