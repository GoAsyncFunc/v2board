let legacyModule = module,
  legacyExports = exports;
var r = require("./6d725347.js"),
  i = require("./47657637.js"),
  o = require("./36477258.js"),
  a = require("./792b5674.js"),
  s = require("./62597459.js"),
  l = require("./636d3672.js"),
  c = Object(s["i"])({
    strokeFirst: !0,
    font: l["a"],
    x: 0,
    y: 0,
    textAlign: "left",
    textBaseline: "top",
    miterLimit: 2
  }, a["a"]),
  u = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }
    return Object(r["a"])(t, e), t.prototype.hasStroke = function () {
      var e = this.style,
        t = e.stroke;
      return null != t && "none" !== t && e.lineWidth > 0;
    }, t.prototype.hasFill = function () {
      var e = this.style,
        t = e.fill;
      return null != t && "none" !== t;
    }, t.prototype.createStyle = function (e) {
      return Object(s["g"])(c, e);
    }, t.prototype.setBoundingRect = function (e) {
      this._rect = e;
    }, t.prototype.getBoundingRect = function () {
      var e = this.style;
      if (!this._rect) {
        var t = e.text;
        null != t ? t += "" : t = "";
        var n = Object(o["d"])(t, e.font, e.textAlign, e.textBaseline);
        if (n.x += e.x || 0, n.y += e.y || 0, this.hasStroke()) {
          var r = e.lineWidth;
          n.x -= r / 2, n.y -= r / 2, n.width += r, n.height += r;
        }
        this._rect = n;
      }
      return this._rect;
    }, t.initDefaultProps = function () {
      var e = t.prototype;
      e.dirtyRectTolerance = 10;
    }(), t;
  }(i["c"]);
u.prototype.type = "tspan", legacyExports["a"] = u;
