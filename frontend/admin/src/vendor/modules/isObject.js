let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = function isObject(value) {
  return "object" === typeof value ? null !== value : "function" === typeof value;
};
