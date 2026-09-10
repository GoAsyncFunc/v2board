let legacyModule = module,
  legacyExports = exports;
var r = require("./6d725347.js"),
  i = require("./47657637.js"),
  o = require("./6d464469.js"),
  a = [],
  s = function (e) {
    function t() {
      var t = null !== e && e.apply(this, arguments) || this;
      return t.notClear = !0, t.incremental = !0, t._displayables = [], t._temporaryDisplayables = [], t._cursor = 0, t;
    }
    return Object(r["a"])(t, e), t.prototype.traverse = function (e, t) {
      e.call(t, this);
    }, t.prototype.useStyle = function () {
      this.style = {};
    }, t.prototype.getCursor = function () {
      return this._cursor;
    }, t.prototype.innerAfterBrush = function () {
      this._cursor = this._displayables.length;
    }, t.prototype.clearDisplaybles = function () {
      this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, this.markRedraw(), this.notClear = !1;
    }, t.prototype.clearTemporalDisplayables = function () {
      this._temporaryDisplayables = [];
    }, t.prototype.addDisplayable = function (e, t) {
      t ? this._temporaryDisplayables.push(e) : this._displayables.push(e), this.markRedraw();
    }, t.prototype.addDisplayables = function (e, t) {
      t = t || !1;
      for (var n = 0; n < e.length; n++) this.addDisplayable(e[n], t);
    }, t.prototype.getDisplayables = function () {
      return this._displayables;
    }, t.prototype.getTemporalDisplayables = function () {
      return this._temporaryDisplayables;
    }, t.prototype.eachPendingDisplayable = function (e) {
      for (var t = this._cursor; t < this._displayables.length; t++) e && e(this._displayables[t]);
      for (t = 0; t < this._temporaryDisplayables.length; t++) e && e(this._temporaryDisplayables[t]);
    }, t.prototype.update = function () {
      this.updateTransform();
      for (var e = this._cursor; e < this._displayables.length; e++) {
        var t = this._displayables[e];
        t.parent = this, t.update(), t.parent = null;
      }
      for (e = 0; e < this._temporaryDisplayables.length; e++) {
        t = this._temporaryDisplayables[e];
        t.parent = this, t.update(), t.parent = null;
      }
    }, t.prototype.getBoundingRect = function () {
      if (!this._rect) {
        for (var e = new o["a"](1 / 0, 1 / 0, -1 / 0, -1 / 0), t = 0; t < this._displayables.length; t++) {
          var n = this._displayables[t],
            r = n.getBoundingRect().clone();
          n.needLocalTransform() && r.applyTransform(n.getLocalTransform(a)), e.union(r);
        }
        this._rect = e;
      }
      return this._rect;
    }, t.prototype.contain = function (e, t) {
      var n = this.transformCoordToLocal(e, t),
        r = this.getBoundingRect();
      if (r.contain(n[0], n[1])) for (var i = 0; i < this._displayables.length; i++) {
        var o = this._displayables[i];
        if (o.contain(e, t)) return !0;
      }
      return !1;
    }, t;
  }(i["c"]);
legacyExports["a"] = s;
