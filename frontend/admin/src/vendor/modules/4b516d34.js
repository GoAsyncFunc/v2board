let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
var r = require("./6133574f.js");
function i(e) {
  if (Array.isArray(e)) return Object(r["a"])(e);
}
var o = require("./32354245.js"),
  a = require("./42735744.js");
function s() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function l(e) {
  return i(e) || Object(o["a"])(e) || Object(a["a"])(e) || s();
}
defineExport(legacyExports, "a", function () {
  return l;
});
