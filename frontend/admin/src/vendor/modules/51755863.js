let legacyModule = module,
  legacyExports = exports;
var r = function () {
  function e(e) {
    this.colorStops = e || [];
  }
  return e.prototype.addColorStop = function (e, t) {
    this.colorStops.push({
      offset: e,
      color: t
    });
  }, e;
}();
legacyExports["a"] = r;
