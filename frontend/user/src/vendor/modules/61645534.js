let legacyModule = module,
  legacyExports = exports;
var r = require("./79317049.js"),
  i = Array.prototype,
  a = i.splice;
function o(e) {
  var t = this.__data__,
    n = r(t, e);
  if (n < 0) return !1;
  var i = t.length - 1;
  return n == i ? t.pop() : a.call(t, n, 1), --this.size, !0;
}
legacyModule.exports = o;
