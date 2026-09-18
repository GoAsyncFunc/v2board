let legacyModule = module,
  legacyExports = exports;
var uidCounter = 0,
  randomSeed = Math.random();
legacyModule.exports = function createUid(description) {
  return "Symbol(".concat(void 0 === description ? "" : description, ")_", (++uidCounter + randomSeed).toString(36));
};
