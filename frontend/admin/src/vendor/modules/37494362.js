let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
function r(e) {
  return e.clone().startOf("month");
}
function i(e) {
  return e.clone().endOf("month");
}
function o(e, t, n) {
  return e.clone().add(t, n);
}
function a() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
    t = arguments[1],
    n = arguments[2];
  return e.some(function (e) {
    return e.isSame(t, n);
  });
}
defineExport(legacyExports, "b", function () {
  return r;
}), defineExport(legacyExports, "a", function () {
  return i;
}), defineExport(legacyExports, "c", function () {
  return o;
}), defineExport(legacyExports, "d", function () {
  return a;
});
