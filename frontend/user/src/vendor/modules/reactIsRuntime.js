let legacyModule = module,
  legacyExports = exports;
var reactElementType = 60103,
  reactPortalType = 60106,
  reactFragmentType = 60107,
  reactStrictModeType = 60108,
  reactProfilerType = 60114,
  reactProviderType = 60109,
  reactContextType = 60110,
  reactForwardRefType = 60112,
  reactSuspenseType = 60113,
  reactSuspenseListType = 60120,
  reactMemoType = 60115,
  reactLazyType = 60116,
  reactBlockType = 60121,
  reactServerBlockType = 60122,
  reactFundamentalType = 60117,
  reactDebugTraceModeType = 60129,
  reactLegacyHiddenType = 60131;
if ("function" === typeof Symbol && Symbol.for) {
  var getReactSymbol = Symbol.for;
  reactElementType = getReactSymbol("react.element"), reactPortalType = getReactSymbol("react.portal"), reactFragmentType = getReactSymbol("react.fragment"), reactStrictModeType = getReactSymbol("react.strict_mode"), reactProfilerType = getReactSymbol("react.profiler"), reactProviderType = getReactSymbol("react.provider"), reactContextType = getReactSymbol("react.context"), reactForwardRefType = getReactSymbol("react.forward_ref"), reactSuspenseType = getReactSymbol("react.suspense"), reactSuspenseListType = getReactSymbol("react.suspense_list"), reactMemoType = getReactSymbol("react.memo"), reactLazyType = getReactSymbol("react.lazy"), reactBlockType = getReactSymbol("react.block"), reactServerBlockType = getReactSymbol("react.server.block"), reactFundamentalType = getReactSymbol("react.fundamental"), reactDebugTraceModeType = getReactSymbol("react.debug_trace_mode"), reactLegacyHiddenType = getReactSymbol("react.legacy_hidden");
}
function typeOf(value) {
  if ("object" === typeof value && null !== value) {
    var reactType = value.$$typeof;
    switch (reactType) {
      case reactElementType:
        switch (value = value.type, value) {
          case reactFragmentType:
          case reactProfilerType:
          case reactStrictModeType:
          case reactSuspenseType:
          case reactSuspenseListType:
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
legacyExports.ContextConsumer = reactContextType, legacyExports.ContextProvider = reactProviderType, legacyExports.Element = reactElementType, legacyExports.ForwardRef = reactForwardRefType, legacyExports.Fragment = reactFragmentType, legacyExports.Lazy = reactLazyType, legacyExports.Memo = reactMemoType, legacyExports.Portal = reactPortalType, legacyExports.Profiler = reactProfilerType, legacyExports.StrictMode = reactStrictModeType, legacyExports.Suspense = reactSuspenseType, legacyExports.isAsyncMode = function () {
  return !1;
}, legacyExports.isConcurrentMode = function () {
  return !1;
}, legacyExports.isContextConsumer = function (value) {
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
  return "string" === typeof value || "function" === typeof value || value === reactFragmentType || value === reactProfilerType || value === reactDebugTraceModeType || value === reactStrictModeType || value === reactSuspenseType || value === reactSuspenseListType || value === reactLegacyHiddenType || "object" === typeof value && null !== value && (value.$$typeof === reactLazyType || value.$$typeof === reactMemoType || value.$$typeof === reactProviderType || value.$$typeof === reactContextType || value.$$typeof === reactForwardRefType || value.$$typeof === reactFundamentalType || value.$$typeof === reactBlockType || value[0] === reactServerBlockType);
}, legacyExports.typeOf = typeOf;
