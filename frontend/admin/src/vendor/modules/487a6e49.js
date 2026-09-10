let legacyModule = module,
  legacyExports = exports;
var r = require("./62597459.js"),
  i = {},
  o = function () {
    function e() {
      this._coordinateSystems = [];
    }
    return e.prototype.create = function (e, t) {
      var n = [];
      r["j"](i, function (r, i) {
        var o = r.create(e, t);
        n = n.concat(o || []);
      }), this._coordinateSystems = n;
    }, e.prototype.update = function (e, t) {
      r["j"](this._coordinateSystems, function (n) {
        n.update && n.update(e, t);
      });
    }, e.prototype.getCoordinateSystems = function () {
      return this._coordinateSystems.slice();
    }, e.register = function (e, t) {
      i[e] = t;
    }, e.get = function (e) {
      return i[e];
    }, e;
  }();
legacyExports["a"] = o;
