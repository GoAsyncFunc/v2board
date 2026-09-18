let legacyModule = module,
  legacyExports = exports;
var r = require("./346b756b.js"),
  i = require("./listCache.js"),
  o = require("./nativeMap.js");
function a() {
  this.size = 0, this.__data__ = {
    hash: new r(),
    map: new (o || i)(),
    string: new r()
  };
}
legacyModule.exports = a;
