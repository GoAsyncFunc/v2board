let legacyModule = module,
  legacyExports = exports;
var r = require("./listCache.js"),
  i = require("./nativeMap.js"),
  o = require("./65344e63.js"),
  a = 200;
function s(e, t) {
  var n = this.__data__;
  if (n instanceof r) {
    var s = n.__data__;
    if (!i || s.length < a - 1) return s.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new o(s);
  }
  return n.set(e, t), this.size = n.size, this;
}
legacyModule.exports = s;
