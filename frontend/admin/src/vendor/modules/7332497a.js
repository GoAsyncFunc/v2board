let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return a;
});
var r = require("./536a3969.js"),
  i = require("./62597459.js"),
  o = /cubic-bezier\(([0-9,\.e ]+)\)/;
function a(e) {
  var t = e && o.exec(e);
  if (t) {
    var n = t[1].split(","),
      a = +Object(i["O"])(n[0]),
      s = +Object(i["O"])(n[1]),
      l = +Object(i["O"])(n[2]),
      c = +Object(i["O"])(n[3]);
    if (isNaN(a + s + l + c)) return;
    var u = [];
    return function (e) {
      return e <= 0 ? 0 : e >= 1 ? 1 : Object(r["f"])(0, a, l, 1, e, u) && Object(r["a"])(0, s, c, 1, u[0]);
    };
  }
}
