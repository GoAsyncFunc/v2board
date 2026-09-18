let legacyModule = module,
  legacyExports = exports;
var r = 60103,
  i = 60106,
  o = 60107,
  a = 60108,
  s = 60114,
  l = 60109,
  c = 60110,
  u = 60112,
  h = 60113,
  f = 60120,
  d = 60115,
  p = 60116,
  m = 60121,
  g = 60122,
  v = 60117,
  y = 60129,
  b = 60131;
if ("function" === typeof Symbol && Symbol.for) {
  var w = Symbol.for;
  r = w("react.element"), i = w("react.portal"), o = w("react.fragment"), a = w("react.strict_mode"), s = w("react.profiler"), l = w("react.provider"), c = w("react.context"), u = w("react.forward_ref"), h = w("react.suspense"), f = w("react.suspense_list"), d = w("react.memo"), p = w("react.lazy"), m = w("react.block"), g = w("react.server.block"), v = w("react.fundamental"), y = w("react.debug_trace_mode"), b = w("react.legacy_hidden");
}
function x(e) {
  if ("object" === typeof e && null !== e) {
    var t = e.$$typeof;
    switch (t) {
      case r:
        switch (e = e.type, e) {
          case o:
          case s:
          case a:
          case h:
          case f:
            return e;
          default:
            switch (e = e && e.$$typeof, e) {
              case c:
              case u:
              case p:
              case d:
              case l:
                return e;
              default:
                return t;
            }
        }
      case i:
        return t;
    }
  }
}
var _ = l,
  E = r,
  S = u,
  k = o,
  C = p,
  O = d,
  T = i,
  L = s,
  A = a,
  P = h;
legacyExports.ContextConsumer = c, legacyExports.ContextProvider = _, legacyExports.Element = E, legacyExports.ForwardRef = S, legacyExports.Fragment = k, legacyExports.Lazy = C, legacyExports.Memo = O, legacyExports.Portal = T, legacyExports.Profiler = L, legacyExports.StrictMode = A, legacyExports.Suspense = P, legacyExports.isAsyncMode = function () {
  return !1;
}, legacyExports.isConcurrentMode = function () {
  return !1;
}, legacyExports.isContextConsumer = function (e) {
  return x(e) === c;
}, legacyExports.isContextProvider = function (e) {
  return x(e) === l;
}, legacyExports.isElement = function (e) {
  return "object" === typeof e && null !== e && e.$$typeof === r;
}, legacyExports.isForwardRef = function (e) {
  return x(e) === u;
}, legacyExports.isFragment = function (e) {
  return x(e) === o;
}, legacyExports.isLazy = function (e) {
  return x(e) === p;
}, legacyExports.isMemo = function (e) {
  return x(e) === d;
}, legacyExports.isPortal = function (e) {
  return x(e) === i;
}, legacyExports.isProfiler = function (e) {
  return x(e) === s;
}, legacyExports.isStrictMode = function (e) {
  return x(e) === a;
}, legacyExports.isSuspense = function (e) {
  return x(e) === h;
}, legacyExports.isValidElementType = function (e) {
  return "string" === typeof e || "function" === typeof e || e === o || e === s || e === y || e === a || e === h || e === f || e === b || "object" === typeof e && null !== e && (e.$$typeof === p || e.$$typeof === d || e.$$typeof === l || e.$$typeof === c || e.$$typeof === u || e.$$typeof === v || e.$$typeof === m || e[0] === g);
}, legacyExports.typeOf = x;
