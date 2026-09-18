let legacyModule = module,
  legacyExports = exports;
var r = require("./assocIndexOf.js");
function i(e) {
  return r(this.__data__, e) > -1;
}
legacyModule.exports = i;
