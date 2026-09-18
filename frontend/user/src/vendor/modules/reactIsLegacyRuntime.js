let legacyModule = module,
  legacyExports = exports;
var getReactSymbol = "function" === typeof Symbol && Symbol.for,
  reactElementType = getReactSymbol ? Symbol.for("react.element") : 60103,
  reactPortalType = getReactSymbol ? Symbol.for("react.portal") : 60106,
  reactFragmentType = getReactSymbol ? Symbol.for("react.fragment") : 60107,
  reactStrictModeType = getReactSymbol ? Symbol.for("react.strict_mode") : 60108,
  reactProfilerType = getReactSymbol ? Symbol.for("react.profiler") : 60114,
  reactProviderType = getReactSymbol ? Symbol.for("react.provider") : 60109,
  reactContextType = getReactSymbol ? Symbol.for("react.context") : 60110,
  reactAsyncModeType = getReactSymbol ? Symbol.for("react.async_mode") : 60111,
  reactConcurrentModeType = getReactSymbol ? Symbol.for("react.concurrent_mode") : 60111,
  reactForwardRefType = getReactSymbol ? Symbol.for("react.forward_ref") : 60112,
  reactSuspenseType = getReactSymbol ? Symbol.for("react.suspense") : 60113,
  reactSuspenseListType = getReactSymbol ? Symbol.for("react.suspense_list") : 60120,
  reactMemoType = getReactSymbol ? Symbol.for("react.memo") : 60115,
  reactLazyType = getReactSymbol ? Symbol.for("react.lazy") : 60116,
  reactBlockType = getReactSymbol ? Symbol.for("react.block") : 60121,
  reactFundamentalType = getReactSymbol ? Symbol.for("react.fundamental") : 60117,
  reactResponderType = getReactSymbol ? Symbol.for("react.responder") : 60118,
  reactScopeType = getReactSymbol ? Symbol.for("react.scope") : 60119;
function typeOf(value) {
  if ("object" === typeof value && null !== value) {
    var reactType = value.$$typeof;
    switch (reactType) {
      case reactElementType:
        switch (value = value.type, value) {
          case reactAsyncModeType:
          case reactConcurrentModeType:
          case reactFragmentType:
          case reactProfilerType:
          case reactStrictModeType:
          case reactSuspenseType:
            return value;
          default:
            switch (value = value && value.$$typeof, value) {
              case reactContextType:
              case reactForwardRefType:
              case reactLazyType:
              case reactMemoType:
              case reactProviderType:
                return value;
              default:
                return reactType;
            }
        }
      case reactPortalType:
        return reactType;
    }
  }
}
function isConcurrentMode(value) {
  return typeOf(value) === reactConcurrentModeType;
}
legacyExports.AsyncMode = reactAsyncModeType, legacyExports.ConcurrentMode = reactConcurrentModeType, legacyExports.ContextConsumer = reactContextType, legacyExports.ContextProvider = reactProviderType, legacyExports.Element = reactElementType, legacyExports.ForwardRef = reactForwardRefType, legacyExports.Fragment = reactFragmentType, legacyExports.Lazy = reactLazyType, legacyExports.Memo = reactMemoType, legacyExports.Portal = reactPortalType, legacyExports.Profiler = reactProfilerType, legacyExports.StrictMode = reactStrictModeType, legacyExports.Suspense = reactSuspenseType, legacyExports.isAsyncMode = function (value) {
  return isConcurrentMode(value) || typeOf(value) === reactAsyncModeType;
}, legacyExports.isConcurrentMode = isConcurrentMode, legacyExports.isContextConsumer = function (value) {
  return typeOf(value) === reactContextType;
}, legacyExports.isContextProvider = function (value) {
  return typeOf(value) === reactProviderType;
}, legacyExports.isElement = function (value) {
  return "object" === typeof value && null !== value && value.$$typeof === reactElementType;
}, legacyExports.isForwardRef = function (value) {
  return typeOf(value) === reactForwardRefType;
}, legacyExports.isFragment = function (value) {
  return typeOf(value) === reactFragmentType;
}, legacyExports.isLazy = function (value) {
  return typeOf(value) === reactLazyType;
}, legacyExports.isMemo = function (value) {
  return typeOf(value) === reactMemoType;
}, legacyExports.isPortal = function (value) {
  return typeOf(value) === reactPortalType;
}, legacyExports.isProfiler = function (value) {
  return typeOf(value) === reactProfilerType;
}, legacyExports.isStrictMode = function (value) {
  return typeOf(value) === reactStrictModeType;
}, legacyExports.isSuspense = function (value) {
  return typeOf(value) === reactSuspenseType;
}, legacyExports.isValidElementType = function (value) {
  return "string" === typeof value || "function" === typeof value || value === reactFragmentType || value === reactConcurrentModeType || value === reactProfilerType || value === reactStrictModeType || value === reactSuspenseType || value === reactSuspenseListType || "object" === typeof value && null !== value && (value.$$typeof === reactLazyType || value.$$typeof === reactMemoType || value.$$typeof === reactProviderType || value.$$typeof === reactContextType || value.$$typeof === reactForwardRefType || value.$$typeof === reactFundamentalType || value.$$typeof === reactResponderType || value.$$typeof === reactScopeType || value.$$typeof === reactBlockType);
}, legacyExports.typeOf = typeOf;
