let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return n;
});
var n = function () {
  for (var e = arguments.length, t = new Array(e), c = 0; c < e; c++) t[c] = arguments[c];
  return t;
};
