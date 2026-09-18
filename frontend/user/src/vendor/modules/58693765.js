let legacyModule = module,
  legacyExports = exports;
var r = require("./listCacheClear.js"),
  i = require("./61645534.js"),
  a = require("./744d4237.js"),
  o = require("./2b365858.js"),
  u = require("./5a386f43.js");
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
