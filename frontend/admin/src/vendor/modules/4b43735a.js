let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return i;
});
var r = require("./62597459.js");
function i(e, t) {
  for (var n = 0; n < e.length; n++) e[n][1] || (e[n][1] = e[n][0]);
  return t = t || !1, function (n, i, o) {
    for (var a = {}, s = 0; s < e.length; s++) {
      var l = e[s][1];
      if (!(i && r["p"](i, l) >= 0 || o && r["p"](o, l) < 0)) {
        var u = n.getShallow(l, t);
        null != u && (a[e[s][0]] = u);
      }
    }
    return a;
  };
}
