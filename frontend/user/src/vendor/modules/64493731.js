let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return o;
});
var r = require("./setPrototypeOfNamedExport.js");
function o(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Object(r["a"])(e, t);
}
