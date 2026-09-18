let legacyModule = module,
  legacyExports = exports;
var clear = require("./listCacheClear.js"),
  deleteKey = require("./listCacheDelete.js"),
  get = require("./listCacheGet.js"),
  has = require("./listCacheHas.js"),
  set = require("./listCacheSet.js");
function ListCache(entries) {
  var index = -1,
    length = null == entries ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = clear, ListCache.prototype["delete"] = deleteKey, ListCache.prototype.get = get, ListCache.prototype.has = has, ListCache.prototype.set = set, legacyModule.exports = ListCache;
