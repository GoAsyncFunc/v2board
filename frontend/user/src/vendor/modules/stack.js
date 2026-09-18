let legacyModule = module,
  legacyExports = exports;
var r = require("./listCache.js"),
  i = require("./stackClear.js"),
  a = require("./stackDelete.js"),
  o = require("./listCacheGet.js"),
  u = require("./listCacheHas.js"),
  l = require("./stackSet.js");
function s(e) {
  var t = this.__data__ = new r(e);
  this.size = t.size;
}
s.prototype.clear = i, s.prototype["delete"] = a, s.prototype.get = o, s.prototype.has = u, s.prototype.set = l, legacyModule.exports = s;
