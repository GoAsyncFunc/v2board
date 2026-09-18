let legacyModule = module,
  legacyExports = exports;
var r = "function" === typeof Symbol && Symbol.for,
  i = r ? Symbol.for("react.element") : 60103,
  o = r ? Symbol.for("react.portal") : 60106,
  a = r ? Symbol.for("react.fragment") : 60107,
  s = r ? Symbol.for("react.strict_mode") : 60108,
  l = r ? Symbol.for("react.profiler") : 60114,
  c = r ? Symbol.for("react.provider") : 60109,
  u = r ? Symbol.for("react.context") : 60110,
  h = r ? Symbol.for("react.async_mode") : 60111,
  f = r ? Symbol.for("react.concurrent_mode") : 60111,
  d = r ? Symbol.for("react.forward_ref") : 60112,
  p = r ? Symbol.for("react.suspense") : 60113,
  m = r ? Symbol.for("react.suspense_list") : 60120,
  g = r ? Symbol.for("react.memo") : 60115,
  v = r ? Symbol.for("react.lazy") : 60116,
  y = r ? Symbol.for("react.block") : 60121,
  b = r ? Symbol.for("react.fundamental") : 60117,
  w = r ? Symbol.for("react.responder") : 60118,
  x = r ? Symbol.for("react.scope") : 60119;
function _(e) {
  if ("object" === typeof e && null !== e) {
    var t = e.$$typeof;
    switch (t) {
      case i:
        switch (e = e.type, e) {
          case h:
          case f:
          case a:
          case l:
          case s:
          case p:
            return e;
          default:
            switch (e = e && e.$$typeof, e) {
              case u:
              case d:
              case v:
              case g:
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
function E(e) {
  return _(e) === f;
}
legacyExports.AsyncMode = h, legacyExports.ConcurrentMode = f, legacyExports.ContextConsumer = u, legacyExports.ContextProvider = c, legacyExports.Element = i, legacyExports.ForwardRef = d, legacyExports.Fragment = a, legacyExports.Lazy = v, legacyExports.Memo = g, legacyExports.Portal = o, legacyExports.Profiler = l, legacyExports.StrictMode = s, legacyExports.Suspense = p, legacyExports.isAsyncMode = function (e) {
  return E(e) || _(e) === h;
}, legacyExports.isConcurrentMode = E, legacyExports.isContextConsumer = function (e) {
  return _(e) === u;
}, legacyExports.isContextProvider = function (e) {
  return _(e) === c;
}, legacyExports.isElement = function (e) {
  return "object" === typeof e && null !== e && e.$$typeof === i;
}, legacyExports.isForwardRef = function (e) {
  return _(e) === d;
}, legacyExports.isFragment = function (e) {
  return _(e) === a;
}, legacyExports.isLazy = function (e) {
  return _(e) === v;
}, legacyExports.isMemo = function (e) {
  return _(e) === g;
}, legacyExports.isPortal = function (e) {
  return _(e) === o;
}, legacyExports.isProfiler = function (e) {
  return _(e) === l;
}, legacyExports.isStrictMode = function (e) {
  return _(e) === s;
}, legacyExports.isSuspense = function (e) {
  return _(e) === p;
}, legacyExports.isValidElementType = function (e) {
  return "string" === typeof e || "function" === typeof e || e === a || e === f || e === l || e === s || e === p || e === m || "object" === typeof e && null !== e && (e.$$typeof === v || e.$$typeof === g || e.$$typeof === c || e.$$typeof === u || e.$$typeof === d || e.$$typeof === b || e.$$typeof === w || e.$$typeof === x || e.$$typeof === y);
}, legacyExports.typeOf = _;
