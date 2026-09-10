let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return a;
}), defineExport(legacyExports, "b", function () {
  return l;
});
var n = require("./5a76705a.js");
function r() {
  return r = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, r.apply(this, arguments);
}
var o = r({}, n["a"].Modal);
function a(e) {
  o = e ? r(r({}, o), e) : r({}, n["a"].Modal);
}
function l() {
  return o;
}
