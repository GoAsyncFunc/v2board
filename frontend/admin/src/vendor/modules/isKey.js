let legacyModule = module,
  legacyExports = exports;
function isKey(value) {
  var valueType = typeof value;
  return "string" == valueType || "number" == valueType || "symbol" == valueType || "boolean" == valueType ? "__proto__" !== value : null === value;
}
legacyModule.exports = isKey;
