let legacyModule = module,
  legacyExports = exports;
const {
  defineExport,
  interopDefault
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return l;
});
var n = require("./animationFrameRuntime.js"),
  r = interopDefault(n),
  o = 0,
  a = {};
function l(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
    c = o++,
    n = t;
  function l() {
    n -= 1, n <= 0 ? (e(), delete a[c]) : a[c] = r()(l);
  }
  return a[c] = r()(l), c;
}
l.cancel = function (e) {
  void 0 !== e && (r.a.cancel(a[e]), delete a[e]);
}, l.ids = a;
