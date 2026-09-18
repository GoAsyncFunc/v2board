let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
var r = require("./typeofNamedExport.js");
function i(e, t) {
  if ("object" !== Object(r["a"])(e) || null === e) return e;
  var n = e[Symbol.toPrimitive];
  if (void 0 !== n) {
    var i = n.call(e, t || "default");
    if ("object" !== Object(r["a"])(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === t ? String : Number)(e);
}
function o(e) {
  var t = i(e, "string");
  return "symbol" === Object(r["a"])(t) ? t : String(t);
}
defineExport(legacyExports, "a", function () {
  return o;
});
