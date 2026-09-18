let legacyModule = module,
  legacyExports = exports;
var memoize = require("./memoize.js"),
  maxMemoizeSize = 500;
function memoizeCapped(func) {
  var result = memoize(func, function (key) {
      return cache.size === maxMemoizeSize && cache.clear(), key;
    }),
    cache = result.cache;
  return result;
}
legacyModule.exports = memoizeCapped;
