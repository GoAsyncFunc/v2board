let legacyModule = module,
  legacyExports = exports;
var r = require("./2b4b2b62.js");
function i(e, t) {
  var n = t ? r(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.length);
}
legacyModule.exports = i;
