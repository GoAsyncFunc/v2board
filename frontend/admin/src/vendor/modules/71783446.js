let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
var r;
function i(e) {
  if ("undefined" === typeof document) return 0;
  if (e || void 0 === r) {
    var t = document.createElement("div");
    t.style.width = "100%", t.style.height = "200px";
    var n = document.createElement("div"),
      i = n.style;
    i.position = "absolute", i.top = 0, i.left = 0, i.pointerEvents = "none", i.visibility = "hidden", i.width = "200px", i.height = "150px", i.overflow = "hidden", n.appendChild(t), document.body.appendChild(n);
    var o = t.offsetWidth;
    n.style.overflow = "scroll";
    var a = t.offsetWidth;
    o === a && (a = n.clientWidth), document.body.removeChild(n), r = o - a;
  }
  return r;
}
defineExport(legacyExports, "a", function () {
  return i;
});
