let legacyModule = module,
  legacyExports = exports;
var r = require("./58693765.js"),
  i = require("./nativeMap.js"),
  a = require("./65344e63.js"),
  o = 200;
function u(e, t) {
  var n = this.__data__;
  if (n instanceof r) {
    var u = n.__data__;
    if (!i || u.length < o - 1) return u.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new a(u);
  }
  return n.set(e, t), this.size = n.size, this;
}
legacyModule.exports = u;
