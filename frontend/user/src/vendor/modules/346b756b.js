let legacyModule = module,
  legacyExports = exports;
var r = require("./hashClear.js"),
  i = require("./hashDelete.js"),
  a = require("./75384474.js"),
  o = require("./hashHas.js"),
  u = require("./hashSet.js");
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
