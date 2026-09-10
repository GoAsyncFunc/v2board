let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "b", function () {
  return o;
}), defineExport(legacyExports, "a", function () {
  return a;
});
var r = require("./62597459.js"),
  i = Object(r["f"])();
function o(e, t) {
  Object(r["b"])(null == i.get(e) && t), i.set(e, t);
}
function a(e, t, n) {
  var r = i.get(t);
  if (!r) return n;
  var o = r(e);
  return o ? n.concat(o) : n;
}
