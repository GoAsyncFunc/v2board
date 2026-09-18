let legacyModule = module,
  legacyExports = exports;
function assertThisInitialized(self) {
  if (void 0 === self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return self;
}
legacyModule.exports = assertThisInitialized, legacyModule.exports.__esModule = !0, legacyModule.exports["default"] = legacyModule.exports;
