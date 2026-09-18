let legacyModule = module,
  legacyExports = exports;
var ListCache = require("./listCache.js"),
  clear = require("./stackClear.js"),
  deleteKey = require("./stackDelete.js"),
  get = require("./listCacheGet.js"),
  has = require("./listCacheHas.js"),
  set = require("./stackSet.js");
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}
Stack.prototype.clear = clear, Stack.prototype["delete"] = deleteKey, Stack.prototype.get = get, Stack.prototype.has = has, Stack.prototype.set = set, legacyModule.exports = Stack;
