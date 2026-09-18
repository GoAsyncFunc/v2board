let legacyModule = module,
  legacyExports = exports;
function isObjectValue(value) {
  var valueType = typeof value;
  return null != value && ("object" == valueType || "function" == valueType);
}
legacyModule.exports = isObjectValue;
