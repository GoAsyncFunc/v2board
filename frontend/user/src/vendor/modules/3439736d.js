let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = Array.isArray || function (e) {
  return "[object Array]" == Object.prototype.toString.call(e);
};
