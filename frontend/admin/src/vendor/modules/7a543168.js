let legacyModule = module,
  legacyExports = exports;
const {
  defineExport,
  interopDefault
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return s;
});
var r = require("./4c494178.js"),
  i = interopDefault(r),
  o = require("./reactDomRuntime.js"),
  a = interopDefault(o);
function s(e, t, n, r) {
  var o = a.a.unstable_batchedUpdates ? function (e) {
    a.a.unstable_batchedUpdates(n, e);
  } : n;
  return i()(e, t, o, r);
}
