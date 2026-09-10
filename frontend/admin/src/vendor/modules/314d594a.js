let legacyModule = module,
  legacyExports = exports;
var r = require("./6d725347.js"),
  i = require("./792b5674.js"),
  o = function (e) {
    function t() {
      var t = null !== e && e.apply(this, arguments) || this;
      return t.type = "compound", t;
    }
    return Object(r["a"])(t, e), t.prototype._updatePathDirty = function () {
      for (var e = this.shape.paths, t = this.shapeChanged(), n = 0; n < e.length; n++) t = t || e[n].shapeChanged();
      t && this.dirtyShape();
    }, t.prototype.beforeBrush = function () {
      this._updatePathDirty();
      for (var e = this.shape.paths || [], t = this.getGlobalScale(), n = 0; n < e.length; n++) e[n].path || e[n].createPathProxy(), e[n].path.setScale(t[0], t[1], e[n].segmentIgnoreThreshold);
    }, t.prototype.buildPath = function (e, t) {
      for (var n = t.paths || [], r = 0; r < n.length; r++) n[r].buildPath(e, n[r].shape, !0);
    }, t.prototype.afterBrush = function () {
      for (var e = this.shape.paths || [], t = 0; t < e.length; t++) e[t].pathUpdated();
    }, t.prototype.getBoundingRect = function () {
      return this._updatePathDirty.call(this), i["b"].prototype.getBoundingRect.call(this);
    }, t;
  }(i["b"]);
legacyExports["a"] = o;
