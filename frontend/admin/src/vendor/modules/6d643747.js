let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
var r = require("./55387055.js");
function i(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function o(e, t) {
  if (t && ("object" === Object(r["a"])(t) || "function" === typeof t)) return t;
  if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
  return i(e);
}
defineExport(legacyExports, "a", function () {
  return o;
});
