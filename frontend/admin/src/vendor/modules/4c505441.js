let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "e", function () {
  return o;
}), defineExport(legacyExports, "b", function () {
  return a;
}), defineExport(legacyExports, "a", function () {
  return s;
}), defineExport(legacyExports, "d", function () {
  return l;
}), defineExport(legacyExports, "c", function () {
  return c;
});
var r = require("./49744746.js"),
  i = 1;
r["a"].hasGlobalWindow && (i = Math.max(window.devicePixelRatio || window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI || 1, 1));
var o = i,
  a = .4,
  s = "#333",
  l = "#ccc",
  c = "#eee";
