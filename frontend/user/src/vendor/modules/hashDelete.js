let legacyModule = module,
  legacyExports = exports;
function n(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
legacyModule.exports = n;
