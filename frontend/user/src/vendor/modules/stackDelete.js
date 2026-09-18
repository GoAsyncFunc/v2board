let legacyModule = module,
  legacyExports = exports;
function n(e) {
  var t = this.__data__,
    n = t["delete"](e);
  return this.size = t.size, n;
}
legacyModule.exports = n;
