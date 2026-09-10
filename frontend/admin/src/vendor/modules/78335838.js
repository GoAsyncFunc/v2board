let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "b", function () {
  return o;
}), defineExport(legacyExports, "a", function () {
  return a;
});
var r = require("./4b786641.js"),
  i = require("./62597459.js");
function o(e, t) {
  var n = e.mapDimensionsAll("defaultedLabel"),
    i = n.length;
  if (1 === i) {
    var o = Object(r["e"])(e, t, n[0]);
    return null != o ? o + "" : null;
  }
  if (i) {
    for (var a = [], s = 0; s < n.length; s++) a.push(Object(r["e"])(e, t, n[s]));
    return a.join(" ");
  }
}
function a(e, t) {
  var n = e.mapDimensionsAll("defaultedLabel");
  if (!Object(i["r"])(t)) return t + "";
  for (var r = [], o = 0; o < n.length; o++) {
    var a = e.getDimensionIndex(n[o]);
    a >= 0 && r.push(t[a]);
  }
  return r.join(" ");
}
