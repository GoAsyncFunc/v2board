let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "i", function () {
  return i;
}), defineExport(legacyExports, "f", function () {
  return o;
}), defineExport(legacyExports, "c", function () {
  return a;
}), defineExport(legacyExports, "e", function () {
  return s;
}), defineExport(legacyExports, "d", function () {
  return l;
}), defineExport(legacyExports, "g", function () {
  return u;
}), defineExport(legacyExports, "h", function () {
  return c;
}), defineExport(legacyExports, "a", function () {
  return f;
}), defineExport(legacyExports, "b", function () {
  return d;
});
var r = require("./62597459.js"),
  i = Object(r["f"])(["tooltip", "label", "itemName", "itemId", "itemGroupId", "seriesName"]),
  o = "original",
  a = "arrayRows",
  s = "objectRows",
  l = "keyedColumns",
  u = "typedArray",
  c = "unknown",
  f = "column",
  d = "row";
