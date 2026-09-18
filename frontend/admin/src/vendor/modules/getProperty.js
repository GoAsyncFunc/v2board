let legacyModule = module,
  legacyExports = exports;
function getProperty(object, key) {
  return null == object ? void 0 : object[key];
}
legacyModule.exports = getProperty;
