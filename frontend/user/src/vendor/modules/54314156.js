let legacyModule = module,
  legacyExports = exports;
var r = require("./assignValue.js"),
  i = require("./35546730.js"),
  a = require("./cloneTypedArray.js"),
  o = require("./copyArray.js"),
  u = require("./baseGetPrototype.js"),
  l = require("./isArgumentsLegacy.js"),
  s = require("./isArray.js"),
  c = require("./isArrayLikeObject.js"),
  f = require("./isBufferCompat.js"),
  d = require("./6c534344.js"),
  h = require("./isObjectValue.js"),
  p = require("./594f3356.js"),
  m = require("./isTypedArray.js"),
  v = require("./getValue.js"),
  g = require("./baseGetAllKeys.js");
function y(e, t, n, y, b, _, w) {
  var k = v(e, n),
    S = v(t, n),
    x = w.get(S);
  if (x) r(e, n, x);else {
    var T = _ ? _(k, S, n + "", e, t, w) : void 0,
      E = void 0 === T;
    if (E) {
      var M = s(S),
        C = !M && f(S),
        O = !M && !C && m(S);
      T = S, M || C || O ? s(k) ? T = k : c(k) ? T = o(k) : C ? (E = !1, T = i(S, !0)) : O ? (E = !1, T = a(S, !0)) : T = [] : p(S) || l(S) ? (T = k, l(k) ? T = g(k) : h(k) && !d(k) || (T = u(S))) : E = !1;
    }
    E && (w.set(S, T), b(T, S, y, _, w), w["delete"](S)), r(e, n, T);
  }
}
legacyModule.exports = y;
