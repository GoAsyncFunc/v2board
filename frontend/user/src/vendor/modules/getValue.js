let legacyModule = module,
  legacyExports = exports;
function getValue(object, key) {
  if (("constructor" !== key || "function" !== typeof object[key]) && "__proto__" != key) return object[key];
}
legacyModule.exports = getValue;
