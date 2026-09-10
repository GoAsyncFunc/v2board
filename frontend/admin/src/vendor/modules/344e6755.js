let legacyModule = module,
  legacyExports = exports;
var r = require("./596c3763.js"),
  i = function () {
    function e(e) {
      this._setting = e || {}, this._extent = [1 / 0, -1 / 0];
    }
    return e.prototype.getSetting = function (e) {
      return this._setting[e];
    }, e.prototype.unionExtent = function (e) {
      var t = this._extent;
      e[0] < t[0] && (t[0] = e[0]), e[1] > t[1] && (t[1] = e[1]);
    }, e.prototype.unionExtentFromData = function (e, t) {
      this.unionExtent(e.getApproximateExtent(t));
    }, e.prototype.getExtent = function () {
      return this._extent.slice();
    }, e.prototype.setExtent = function (e, t) {
      var n = this._extent;
      isNaN(e) || (n[0] = e), isNaN(t) || (n[1] = t);
    }, e.prototype.isInExtentRange = function (e) {
      return this._extent[0] <= e && this._extent[1] >= e;
    }, e.prototype.isBlank = function () {
      return this._isBlank;
    }, e.prototype.setBlank = function (e) {
      this._isBlank = e;
    }, e;
  }();
r["c"](i), legacyExports["a"] = i;
