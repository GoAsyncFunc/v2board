let legacyModule = module,
  legacyExports = exports;
var HashCache = require("./hashCache.js"),
  ListCache = require("./listCache.js"),
  Map = require("./nativeMap.js");
function clearMapCache() {
  this.size = 0, this.__data__ = {
    hash: new HashCache(),
    map: new (Map || ListCache)(),
    string: new HashCache()
  };
}
legacyModule.exports = clearMapCache;
