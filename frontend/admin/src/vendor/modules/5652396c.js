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
  i = [["fill", "color"], ["stroke", "borderColor"], ["lineWidth", "borderWidth"], ["opacity"], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["shadowColor"], ["lineDash", "borderType"], ["lineDashOffset", "borderDashOffset"], ["lineCap", "borderCap"], ["lineJoin", "borderJoin"], ["miterLimit", "borderMiterLimit"]],
  o = Object(r["a"])(i),
  a = function () {
    function e() {}
    return e.prototype.getItemStyle = function (e, t) {
      return o(this, e, t);
    }, e;
  }();
