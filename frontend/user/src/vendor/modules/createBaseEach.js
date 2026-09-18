let legacyModule = module,
  legacyExports = exports;
function createBaseEach(fromRight) {
  return function (collection, iteratee, getKeys) {
    var index = -1,
      object = Object(collection),
      keys = getKeys(collection),
      length = keys.length;
    while (length--) {
      var key = keys[fromRight ? length : ++index];
      if (!1 === iteratee(object[key], key, object)) break;
    }
    return collection;
  };
}
legacyModule.exports = createBaseEach;
