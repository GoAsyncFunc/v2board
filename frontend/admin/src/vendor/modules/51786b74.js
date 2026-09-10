let legacyModule = module,
  legacyExports = exports;
var r = require("./49744746.js"),
  i = require("./596c3763.js"),
  o = require("./4b43735a.js"),
  a = [["fill", "color"], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["opacity"], ["shadowColor"]],
  s = Object(o["a"])(a),
  l = function () {
    function e() {}
    return e.prototype.getAreaStyle = function (e, t) {
      return s(this, e, t);
    }, e;
  }(),
  u = require("./65446668.js"),
  c = require("./64715547.js"),
  f = ["textStyle", "color"],
  d = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "padding", "lineHeight", "rich", "width", "height", "overflow"],
  h = new c["a"](),
  p = function () {
    function e() {}
    return e.prototype.getTextColor = function (e) {
      var t = this.ecModel;
      return this.getShallow("color") || (!e && t ? t.get(f) : null);
    }, e.prototype.getFont = function () {
      return Object(u["b"])({
        fontStyle: this.getShallow("fontStyle"),
        fontWeight: this.getShallow("fontWeight"),
        fontSize: this.getShallow("fontSize"),
        fontFamily: this.getShallow("fontFamily")
      }, this.ecModel);
    }, e.prototype.getTextRect = function (e) {
      for (var t = {
          text: e,
          verticalAlign: this.getShallow("verticalAlign") || this.getShallow("baseline")
        }, n = 0; n < d.length; n++) t[d[n]] = this.getShallow(d[n]);
      return h.useStyle(t), h.update(), h.getBoundingRect();
    }, e;
  }(),
  g = p,
  m = require("./4f514673.js"),
  v = require("./5652396c.js"),
  y = require("./62597459.js"),
  b = function () {
    function e(e, t, n) {
      this.parentModel = t, this.ecModel = n, this.option = e;
    }
    return e.prototype.init = function (e, t, n) {
      for (var r = [], i = 3; i < arguments.length; i++) r[i - 3] = arguments[i];
    }, e.prototype.mergeOption = function (e, t) {
      Object(y["E"])(this.option, e, !0);
    }, e.prototype.get = function (e, t) {
      return null == e ? this.option : this._doGet(this.parsePath(e), !t && this.parentModel);
    }, e.prototype.getShallow = function (e, t) {
      var n = this.option,
        r = null == n ? n : n[e];
      if (null == r && !t) {
        var i = this.parentModel;
        i && (r = i.getShallow(e));
      }
      return r;
    }, e.prototype.getModel = function (t, n) {
      var r = null != t,
        i = r ? this.parsePath(t) : null,
        o = r ? this._doGet(i) : this.option;
      return n = n || this.parentModel && this.parentModel.getModel(this.resolveParentPath(i)), new e(o, n, this.ecModel);
    }, e.prototype.isEmpty = function () {
      return null == this.option;
    }, e.prototype.restoreData = function () {}, e.prototype.clone = function () {
      var e = this.constructor;
      return new e(Object(y["d"])(this.option));
    }, e.prototype.parsePath = function (e) {
      return "string" === typeof e ? e.split(".") : e;
    }, e.prototype.resolveParentPath = function (e) {
      return e;
    }, e.prototype.isAnimationEnabled = function () {
      if (!r["a"].node && this.option) {
        if (null != this.option.animation) return !!this.option.animation;
        if (this.parentModel) return this.parentModel.isAnimationEnabled();
      }
    }, e.prototype._doGet = function (e, t) {
      var n = this.option;
      if (!e) return n;
      for (var r = 0; r < e.length; r++) if (e[r] && (n = n && "object" === typeof n ? n[e[r]] : null, null == n)) break;
      return null == n && t && (n = t._doGet(this.resolveParentPath(e), t.parentModel)), n;
    }, e;
  }();
Object(i["b"])(b), Object(i["a"])(b), Object(y["F"])(b, m["b"]), Object(y["F"])(b, v["b"]), Object(y["F"])(b, l), Object(y["F"])(b, g);
legacyExports["a"] = b;
