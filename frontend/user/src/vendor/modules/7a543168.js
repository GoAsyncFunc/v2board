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
  o = interopDefault(r),
  i = require("./69386934.js"),
  a = interopDefault(i);
function s(e, t, n, r) {
  var i = a.a.unstable_batchedUpdates ? function (e) {
    a.a.unstable_batchedUpdates(n, e);
  } : n;
  return o()(e, t, i, r);
}
