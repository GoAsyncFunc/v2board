let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return a;
});
var r = require("./62597459.js"),
  i = "undefined" !== typeof Float32Array,
  o = i ? Float32Array : Array;
function a(e) {
  return Object(r["r"])(e) ? i ? new Float32Array(e) : e : new o(e);
}
