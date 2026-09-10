let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return i;
}), defineExport(legacyExports, "b", function () {
  return a;
});
var r = require("./4b43735a.js"),
  i = [["lineWidth", "width"], ["stroke", "color"], ["opacity"], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["shadowColor"], ["lineDash", "type"], ["lineDashOffset", "dashOffset"], ["lineCap", "cap"], ["lineJoin", "join"], ["miterLimit"]],
  o = Object(r["a"])(i),
  a = function () {
    function e() {}
    return e.prototype.getLineStyle = function (e) {
      return o(this, e);
    }, e;
  }();
