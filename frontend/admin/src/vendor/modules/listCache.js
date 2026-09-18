let legacyModule = module,
  legacyExports = exports;
var r = require("./listCacheClear.js"),
  i = require("./listCacheDelete.js"),
  o = require("./listCacheGet.js"),
  a = require("./listCacheHas.js"),
  s = require("./listCacheSet.js");
function l(e) {
  var t = -1,
    n = null == e ? 0 : e.length;
  this.clear();
  while (++t < n) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
l.prototype.clear = r, l.prototype["delete"] = i, l.prototype.get = o, l.prototype.has = a, l.prototype.set = s, legacyModule.exports = l;
