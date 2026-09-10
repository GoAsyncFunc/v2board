let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return a;
}), defineExport(legacyExports, "b", function () {
  return s;
});
var r = require("./2b54542f.js"),
  i = require("./37614b42.js"),
  o = require("./78364b74.js");
function a(e, t, n) {
  var i = t.getBoxLayoutParams(),
    o = t.get("padding"),
    a = {
      width: n.getWidth(),
      height: n.getHeight()
    },
    s = Object(r["d"])(i, a, o);
  Object(r["a"])(t.get("orient"), e, t.get("itemGap"), s.width, s.height), Object(r["f"])(e, i, a, o);
}
function s(e, t) {
  var n = i["f"](t.get("padding")),
    r = t.getItemStyle(["color", "opacity"]);
  return r.fill = t.get("backgroundColor"), e = new o["a"]({
    shape: {
      x: e.x - n[3],
      y: e.y - n[0],
      width: e.width + n[1] + n[3],
      height: e.height + n[0] + n[2],
      r: t.get("borderRadius")
    },
    style: r,
    silent: !0,
    z2: -1
  }), e;
}
