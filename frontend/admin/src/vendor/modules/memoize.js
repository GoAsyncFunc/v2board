let legacyModule = module,
  legacyExports = exports;
var MapCache = require("./mapCache.js"),
  functionExpectedMessage = "Expected a function";
function memoize(func, resolver) {
  if ("function" != typeof func || null != resolver && "function" != typeof resolver) throw new TypeError(functionExpectedMessage);
  var memoized = function () {
    var args = arguments,
      key = resolver ? resolver.apply(this, args) : args[0],
      cache = memoized.cache;
    if (cache.has(key)) return cache.get(key);
    var result = func.apply(this, args);
    return memoized.cache = cache.set(key, result) || cache, result;
  };
  return memoized.cache = new (memoize.Cache || MapCache)(), memoized;
}
memoize.Cache = MapCache, legacyModule.exports = memoize;
