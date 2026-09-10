let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
function r() {
  var e = [].slice.call(arguments, 0);
  return 1 === e.length ? e[0] : function () {
    for (var t = 0; t < e.length; t++) e[t] && e[t].apply && e[t].apply(this, arguments);
  };
}
defineExport(legacyExports, "a", function () {
  return r;
});
