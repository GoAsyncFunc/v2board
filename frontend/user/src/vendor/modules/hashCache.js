let legacyModule = module,
  legacyExports = exports;
var clear = require("./hashClear.js"),
  deleteKey = require("./hashDelete.js"),
  get = require("./hashGet.js"),
  has = require("./hashHas.js"),
  set = require("./hashSet.js");
function HashCache(entries) {
  var index = -1,
    length = null == entries ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
HashCache.prototype.clear = clear, HashCache.prototype["delete"] = deleteKey, HashCache.prototype.get = get, HashCache.prototype.has = has, HashCache.prototype.set = set, legacyModule.exports = HashCache;
