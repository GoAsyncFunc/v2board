let legacyModule = module,
  legacyExports = exports;
var r = require("./79317049.js"),
  i = Array.prototype,
  o = i.splice;
function a(e) {
  var t = this.__data__,
    n = r(t, e);
  if (n < 0) return !1;
  var i = t.length - 1;
  return n == i ? t.pop() : o.call(t, n, 1), --this.size, !0;
}
legacyModule.exports = a;
