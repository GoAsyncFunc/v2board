let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = function indexOfValue(arrayLike, value) {
  if (arrayLike.indexOf) return arrayLike.indexOf(value);
  for (var index = 0; index < arrayLike.length; ++index) if (arrayLike[index] === value) return index;
  return -1;
};
