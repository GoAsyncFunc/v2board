let legacyModule = module,
  legacyExports = exports;
var r = require("./listCache.js"),
  i = require("./stackClear.js"),
  o = require("./stackDelete.js"),
  a = require("./listCacheGet.js"),
  s = require("./listCacheHas.js"),
  l = require("./stackSet.js");
function u(e) {
  var t = this.__data__ = new r(e);
  this.size = t.size;
}
u.prototype.clear = i, u.prototype["delete"] = o, u.prototype.get = a, u.prototype.has = s, u.prototype.set = l, legacyModule.exports = u;
