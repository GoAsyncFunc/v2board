let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return i;
});
var r = require("./7334416e.js");
function i(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Object(r["a"])(e, t);
}
