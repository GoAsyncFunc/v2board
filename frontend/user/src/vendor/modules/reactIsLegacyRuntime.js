let legacyModule = module,
  legacyExports = exports;
var r = "function" === typeof Symbol && Symbol.for,
  o = r ? Symbol.for("react.element") : 60103,
  i = r ? Symbol.for("react.portal") : 60106,
  a = r ? Symbol.for("react.fragment") : 60107,
  s = r ? Symbol.for("react.strict_mode") : 60108,
  c = r ? Symbol.for("react.profiler") : 60114,
  u = r ? Symbol.for("react.provider") : 60109,
  l = r ? Symbol.for("react.context") : 60110,
  f = r ? Symbol.for("react.async_mode") : 60111,
  p = r ? Symbol.for("react.concurrent_mode") : 60111,
  d = r ? Symbol.for("react.forward_ref") : 60112,
  h = r ? Symbol.for("react.suspense") : 60113,
  m = r ? Symbol.for("react.suspense_list") : 60120,
  v = r ? Symbol.for("react.memo") : 60115,
  y = r ? Symbol.for("react.lazy") : 60116,
  g = r ? Symbol.for("react.block") : 60121,
  b = r ? Symbol.for("react.fundamental") : 60117,
  w = r ? Symbol.for("react.responder") : 60118,
  x = r ? Symbol.for("react.scope") : 60119;
function O(e) {
  if ("object" === typeof e && null !== e) {
    var t = e.$$typeof;
    switch (t) {
      case o:
        switch (e = e.type, e) {
          case f:
          case p:
          case a:
          case c:
          case s:
          case h:
            return e;
          default:
            switch (e = e && e.$$typeof, e) {
              case l:
              case d:
              case y:
              case v:
              case u:
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
function E(e) {
  return O(e) === p;
}
legacyExports.AsyncMode = f, legacyExports.ConcurrentMode = p, legacyExports.ContextConsumer = l, legacyExports.ContextProvider = u, legacyExports.Element = o, legacyExports.ForwardRef = d, legacyExports.Fragment = a, legacyExports.Lazy = y, legacyExports.Memo = v, legacyExports.Portal = i, legacyExports.Profiler = c, legacyExports.StrictMode = s, legacyExports.Suspense = h, legacyExports.isAsyncMode = function (e) {
  return E(e) || O(e) === f;
}, legacyExports.isConcurrentMode = E, legacyExports.isContextConsumer = function (e) {
  return O(e) === l;
}, legacyExports.isContextProvider = function (e) {
  return O(e) === u;
}, legacyExports.isElement = function (e) {
  return "object" === typeof e && null !== e && e.$$typeof === o;
}, legacyExports.isForwardRef = function (e) {
  return O(e) === d;
}, legacyExports.isFragment = function (e) {
  return O(e) === a;
}, legacyExports.isLazy = function (e) {
  return O(e) === y;
}, legacyExports.isMemo = function (e) {
  return O(e) === v;
}, legacyExports.isPortal = function (e) {
  return O(e) === i;
}, legacyExports.isProfiler = function (e) {
  return O(e) === c;
}, legacyExports.isStrictMode = function (e) {
  return O(e) === s;
}, legacyExports.isSuspense = function (e) {
  return O(e) === h;
}, legacyExports.isValidElementType = function (e) {
  return "string" === typeof e || "function" === typeof e || e === a || e === p || e === c || e === s || e === h || e === m || "object" === typeof e && null !== e && (e.$$typeof === y || e.$$typeof === v || e.$$typeof === u || e.$$typeof === l || e.$$typeof === d || e.$$typeof === b || e.$$typeof === w || e.$$typeof === x || e.$$typeof === g);
}, legacyExports.typeOf = O;
