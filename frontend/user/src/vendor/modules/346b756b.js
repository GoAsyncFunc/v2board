let legacyModule = module,
  legacyExports = exports;
var r = require("./5366524d.js"),
  i = require("./hashDelete.js"),
  a = require("./75384474.js"),
  o = require("./656b6749.js"),
  u = require("./4a535155.js");
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
