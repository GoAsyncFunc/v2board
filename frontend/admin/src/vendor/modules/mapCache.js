let legacyModule = module,
  legacyExports = exports;
var clear = require("./mapCacheClear.js"),
  deleteKey = require("./mapCacheDelete.js"),
  get = require("./mapCacheGet.js"),
  has = require("./mapCacheHas.js"),
  set = require("./mapCacheSet.js");
function MapCache(entries) {
  var index = -1,
    length = null == entries ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = clear, MapCache.prototype["delete"] = deleteKey, MapCache.prototype.get = get, MapCache.prototype.has = has, MapCache.prototype.set = set, legacyModule.exports = MapCache;
