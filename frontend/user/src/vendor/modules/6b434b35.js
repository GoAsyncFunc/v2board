let legacyModule = module,
  legacyExports = exports;
var n = 0,
  r = Math.random();
legacyModule.exports = function (e) {
  return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++n + r).toString(36));
};
