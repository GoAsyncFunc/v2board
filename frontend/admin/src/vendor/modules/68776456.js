let legacyModule = module,
  legacyExports = exports;
var r = require("./746a6c41.js"),
  i = r.Buffer;
function o(e, t) {
  for (var n in e) t[n] = e[n];
}
function a(e, t, n) {
  return i(e, t, n);
}
i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow ? legacyModule.exports = r : (o(r, legacyExports), legacyExports.Buffer = a), o(i, a), a.from = function (e, t, n) {
  if ("number" === typeof e) throw new TypeError("Argument must not be a number");
  return i(e, t, n);
}, a.alloc = function (e, t, n) {
  if ("number" !== typeof e) throw new TypeError("Argument must be a number");
  var r = i(e);
  return void 0 !== t ? "string" === typeof n ? r.fill(t, n) : r.fill(t) : r.fill(0), r;
}, a.allocUnsafe = function (e) {
  if ("number" !== typeof e) throw new TypeError("Argument must be a number");
  return i(e);
}, a.allocUnsafeSlow = function (e) {
  if ("number" !== typeof e) throw new TypeError("Argument must be a number");
  return r.SlowBuffer(e);
};
