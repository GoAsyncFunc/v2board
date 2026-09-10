let legacyModule = module,
  legacyExports = exports;
const {
  defineExport,
  interopDefault
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return o;
});
var r = require("./71317449.js"),
  i = interopDefault(r);
function o(e) {
  var t = e.prefixCls,
    n = e.locale,
    r = e.okDisabled,
    o = e.onOk,
    a = t + "-ok-btn";
  return r && (a += " " + t + "-ok-btn-disabled"), i.a.createElement("a", {
    className: a,
    role: "button",
    onClick: r ? null : o
  }, n.ok);
}
