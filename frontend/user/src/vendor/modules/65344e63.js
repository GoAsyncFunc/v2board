let legacyModule = module,
  legacyExports = exports;
var r = require("./66475433.js"),
  i = require("./mapCacheDelete.js"),
  a = require("./4a48674c.js"),
  o = require("./70535259.js"),
  u = require("./48386a34.js");
function l(e) {
  var t = -1,
    n = null == e ? 0 : e.length;
  this.clear();
  while (++t < n) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
l.prototype.clear = r, l.prototype["delete"] = i, l.prototype.get = a, l.prototype.has = o, l.prototype.set = u, legacyModule.exports = l;
