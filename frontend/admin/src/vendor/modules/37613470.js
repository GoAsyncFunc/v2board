let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "d", function () {
  return s;
}), defineExport(legacyExports, "b", function () {
  return l;
}), defineExport(legacyExports, "a", function () {
  return u;
}), defineExport(legacyExports, "c", function () {
  return c;
});
var r = "[ECharts] ",
  i = {},
  o = "undefined" !== typeof console && console.warn && console.log;
function a(e, t, n) {
  if (o) {
    if (n) {
      if (i[t]) return;
      i[t] = !0;
    }
    console[e](r + t);
  }
}
function s(e, t) {
  a("warn", e, t);
}
function l(e, t) {
  a("error", e, t);
}
function u(e) {
  0;
}
function c(e) {
  throw new Error(e);
}
