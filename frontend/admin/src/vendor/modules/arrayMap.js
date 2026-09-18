let legacyModule = module,
  legacyExports = exports;
function arrayMap(collection, iteratee) {
  var index = -1,
    length = null == collection ? 0 : collection.length,
    result = Array(length);
  while (++index < length) result[index] = iteratee(collection[index], index, collection);
  return result;
}
legacyModule.exports = arrayMap;
