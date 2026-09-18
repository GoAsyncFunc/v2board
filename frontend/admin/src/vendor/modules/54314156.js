let legacyModule = module,
  legacyExports = exports;
var r = require("./assignValue.js"),
  i = require("./35546730.js"),
  o = require("./cloneTypedArray.js"),
  a = require("./copyArray.js"),
  s = require("./2b69464f.js"),
  l = require("./3033412b.js"),
  u = require("./isArray.js"),
  c = require("./isArrayLikeObject.js"),
  f = require("./44535245.js"),
  d = require("./6c534344.js"),
  h = require("./isObjectValue.js"),
  p = require("./594f3356.js"),
  g = require("./63367747.js"),
  m = require("./6974736a.js"),
  v = require("./6a654c6f.js");
function y(e, t, n, y, b, x, _) {
  var w = m(e, n),
    O = m(t, n),
    S = _.get(O);
  if (S) r(e, n, S);else {
    var k = x ? x(w, O, n + "", e, t, _) : void 0,
      j = void 0 === k;
    if (j) {
      var M = u(O),
        C = !M && f(O),
        T = !M && !C && g(O);
      k = O, M || C || T ? u(w) ? k = w : c(w) ? k = a(w) : C ? (j = !1, k = i(O, !0)) : T ? (j = !1, k = o(O, !0)) : k = [] : p(O) || l(O) ? (k = w, l(w) ? k = v(w) : h(w) && !d(w) || (k = s(O))) : j = !1;
    }
    j && (_.set(O, k), b(k, O, y, x, _), _["delete"](O)), r(e, n, k);
  }
}
legacyModule.exports = y;
