let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
var r;
function o(e) {
  if ("undefined" === typeof document) return 0;
  if (e || void 0 === r) {
    var t = document.createElement("div");
    t.style.width = "100%", t.style.height = "200px";
    var n = document.createElement("div"),
      o = n.style;
    o.position = "absolute", o.top = 0, o.left = 0, o.pointerEvents = "none", o.visibility = "hidden", o.width = "200px", o.height = "150px", o.overflow = "hidden", n.appendChild(t), document.body.appendChild(n);
    var i = t.offsetWidth;
    n.style.overflow = "scroll";
    var a = t.offsetWidth;
    i === a && (a = n.clientWidth), document.body.removeChild(n), r = i - a;
  }
  return r;
}
defineExport(legacyExports, "a", function () {
  return o;
});
