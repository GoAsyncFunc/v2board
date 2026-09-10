let legacyModule = module,
  legacyExports = exports;
const {
  defineExport,
  interopDefault
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return a;
});
var r = require("./71317449.js"),
  i = interopDefault(r);
function o(e) {
  return e;
}
function a(e) {
  return i.a.Children.map(e, o);
}
