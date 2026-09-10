let legacyModule = module,
  legacyExports = exports;
const {
  defineExport,
  interopDefault
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return a;
});
var n = require("./78456b55.js"),
  r = interopDefault(n),
  o = 0,
  l = {};
function a(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
    c = o++,
    n = t;
  function a() {
    n -= 1, n <= 0 ? (e(), delete l[c]) : l[c] = r()(a);
  }
  return l[c] = r()(a), c;
}
a.cancel = function (e) {
  void 0 !== e && (r.a.cancel(l[e]), delete l[e]);
}, a.ids = l;
