let legacyModule = module,
  legacyExports = exports;
var r = 60103,
  o = 60106,
  i = 60107,
  a = 60108,
  s = 60114,
  c = 60109,
  u = 60110,
  l = 60112,
  f = 60113,
  p = 60120,
  d = 60115,
  h = 60116,
  m = 60121,
  v = 60122,
  y = 60117,
  g = 60129,
  b = 60131;
if ("function" === typeof Symbol && Symbol.for) {
  var w = Symbol.for;
  r = w("react.element"), o = w("react.portal"), i = w("react.fragment"), a = w("react.strict_mode"), s = w("react.profiler"), c = w("react.provider"), u = w("react.context"), l = w("react.forward_ref"), f = w("react.suspense"), p = w("react.suspense_list"), d = w("react.memo"), h = w("react.lazy"), m = w("react.block"), v = w("react.server.block"), y = w("react.fundamental"), g = w("react.debug_trace_mode"), b = w("react.legacy_hidden");
}
function x(e) {
  if ("object" === typeof e && null !== e) {
    var t = e.$$typeof;
    switch (t) {
      case r:
        switch (e = e.type, e) {
          case i:
          case s:
          case a:
          case f:
          case p:
            return e;
          default:
            switch (e = e && e.$$typeof, e) {
              case u:
              case l:
              case h:
              case d:
              case c:
                return e;
              default:
                return t;
            }
        }
      case o:
        return t;
    }
  }
}
var O = c,
  E = r,
  _ = l,
  k = i,
  S = h,
  C = d,
  j = o,
  P = s,
  T = a,
  L = f;
legacyExports.ContextConsumer = u, legacyExports.ContextProvider = O, legacyExports.Element = E, legacyExports.ForwardRef = _, legacyExports.Fragment = k, legacyExports.Lazy = S, legacyExports.Memo = C, legacyExports.Portal = j, legacyExports.Profiler = P, legacyExports.StrictMode = T, legacyExports.Suspense = L, legacyExports.isAsyncMode = function () {
  return !1;
}, legacyExports.isConcurrentMode = function () {
  return !1;
}, legacyExports.isContextConsumer = function (e) {
  return x(e) === u;
}, legacyExports.isContextProvider = function (e) {
  return x(e) === c;
}, legacyExports.isElement = function (e) {
  return "object" === typeof e && null !== e && e.$$typeof === r;
}, legacyExports.isForwardRef = function (e) {
  return x(e) === l;
}, legacyExports.isFragment = function (e) {
  return x(e) === i;
}, legacyExports.isLazy = function (e) {
  return x(e) === h;
}, legacyExports.isMemo = function (e) {
  return x(e) === d;
}, legacyExports.isPortal = function (e) {
  return x(e) === o;
}, legacyExports.isProfiler = function (e) {
  return x(e) === s;
}, legacyExports.isStrictMode = function (e) {
  return x(e) === a;
}, legacyExports.isSuspense = function (e) {
  return x(e) === f;
}, legacyExports.isValidElementType = function (e) {
  return "string" === typeof e || "function" === typeof e || e === i || e === s || e === g || e === a || e === f || e === p || e === b || "object" === typeof e && null !== e && (e.$$typeof === h || e.$$typeof === d || e.$$typeof === c || e.$$typeof === u || e.$$typeof === l || e.$$typeof === y || e.$$typeof === m || e[0] === v);
}, legacyExports.typeOf = x;
