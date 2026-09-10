let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = function (e) {
  return null != e && "object" === typeof e && !1 === Array.isArray(e);
};
