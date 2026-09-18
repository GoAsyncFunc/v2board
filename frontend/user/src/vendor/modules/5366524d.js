let legacyModule = module,
  legacyExports = exports;
var r = require("./nativeObjectCreate.js");
function i() {
  this.__data__ = r ? r(null) : {}, this.size = 0;
}
legacyModule.exports = i;
