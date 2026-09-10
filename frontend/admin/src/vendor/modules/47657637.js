let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "b", function () {
  return c;
}), defineExport(legacyExports, "a", function () {
  return u;
});
var r = require("./6d725347.js"),
  i = require("./31626454.js"),
  o = require("./6d464469.js"),
  a = require("./62597459.js"),
  s = require("./53385358.js"),
  l = "__zr_style_" + Math.round(10 * Math.random()),
  c = {
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowColor: "#000",
    opacity: 1,
    blend: "source-over"
  },
  u = {
    style: {
      shadowBlur: !0,
      shadowOffsetX: !0,
      shadowOffsetY: !0,
      shadowColor: !0,
      opacity: !0
    }
  };
c[l] = !0;
var h = ["z", "z2", "invisible"],
  f = ["invisible"],
  d = function (e) {
    function t(t) {
      return e.call(this, t) || this;
    }
    return Object(r["a"])(t, e), t.prototype._init = function (t) {
      for (var n = Object(a["B"])(t), r = 0; r < n.length; r++) {
        var i = n[r];
        "style" === i ? this.useStyle(t[i]) : e.prototype.attrKV.call(this, i, t[i]);
      }
      this.style || this.useStyle({});
    }, t.prototype.beforeBrush = function () {}, t.prototype.afterBrush = function () {}, t.prototype.innerBeforeBrush = function () {}, t.prototype.innerAfterBrush = function () {}, t.prototype.shouldBePainted = function (e, t, n, r) {
      var i = this.transform;
      if (this.ignore || this.invisible || 0 === this.style.opacity || this.culling && g(this, e, t) || i && !i[0] && !i[3]) return !1;
      if (n && this.__clipPaths) for (var o = 0; o < this.__clipPaths.length; ++o) if (this.__clipPaths[o].isZeroArea()) return !1;
      if (r && this.parent) {
        var a = this.parent;
        while (a) {
          if (a.ignore) return !1;
          a = a.parent;
        }
      }
      return !0;
    }, t.prototype.contain = function (e, t) {
      return this.rectContain(e, t);
    }, t.prototype.traverse = function (e, t) {
      e.call(t, this);
    }, t.prototype.rectContain = function (e, t) {
      var n = this.transformCoordToLocal(e, t),
        r = this.getBoundingRect();
      return r.contain(n[0], n[1]);
    }, t.prototype.getPaintRect = function () {
      var e = this._paintRect;
      if (!this._paintRect || this.__dirty) {
        var t = this.transform,
          n = this.getBoundingRect(),
          r = this.style,
          i = r.shadowBlur || 0,
          a = r.shadowOffsetX || 0,
          s = r.shadowOffsetY || 0;
        e = this._paintRect || (this._paintRect = new o["a"](0, 0, 0, 0)), t ? o["a"].applyTransform(e, n, t) : e.copy(n), (i || a || s) && (e.width += 2 * i + Math.abs(a), e.height += 2 * i + Math.abs(s), e.x = Math.min(e.x, e.x + a - i), e.y = Math.min(e.y, e.y + s - i));
        var l = this.dirtyRectTolerance;
        e.isZero() || (e.x = Math.floor(e.x - l), e.y = Math.floor(e.y - l), e.width = Math.ceil(e.width + 1 + 2 * l), e.height = Math.ceil(e.height + 1 + 2 * l));
      }
      return e;
    }, t.prototype.setPrevPaintRect = function (e) {
      e ? (this._prevPaintRect = this._prevPaintRect || new o["a"](0, 0, 0, 0), this._prevPaintRect.copy(e)) : this._prevPaintRect = null;
    }, t.prototype.getPrevPaintRect = function () {
      return this._prevPaintRect;
    }, t.prototype.animateStyle = function (e) {
      return this.animate("style", e);
    }, t.prototype.updateDuringAnimation = function (e) {
      "style" === e ? this.dirtyStyle() : this.markRedraw();
    }, t.prototype.attrKV = function (t, n) {
      "style" !== t ? e.prototype.attrKV.call(this, t, n) : this.style ? this.setStyle(n) : this.useStyle(n);
    }, t.prototype.setStyle = function (e, t) {
      return "string" === typeof e ? this.style[e] = t : Object(a["l"])(this.style, e), this.dirtyStyle(), this;
    }, t.prototype.dirtyStyle = function (e) {
      e || this.markRedraw(), this.__dirty |= s["c"], this._rect && (this._rect = null);
    }, t.prototype.dirty = function () {
      this.dirtyStyle();
    }, t.prototype.styleChanged = function () {
      return !!(this.__dirty & s["c"]);
    }, t.prototype.styleUpdated = function () {
      this.__dirty &= ~s["c"];
    }, t.prototype.createStyle = function (e) {
      return Object(a["g"])(c, e);
    }, t.prototype.useStyle = function (e) {
      e[l] || (e = this.createStyle(e)), this.__inHover ? this.__hoverStyle = e : this.style = e, this.dirtyStyle();
    }, t.prototype.isStyleObject = function (e) {
      return e[l];
    }, t.prototype._innerSaveToNormal = function (t) {
      e.prototype._innerSaveToNormal.call(this, t);
      var n = this._normalState;
      t.style && !n.style && (n.style = this._mergeStyle(this.createStyle(), this.style)), this._savePrimaryToNormal(t, n, h);
    }, t.prototype._applyStateObj = function (t, n, r, i, o, s) {
      e.prototype._applyStateObj.call(this, t, n, r, i, o, s);
      var l,
        c = !(n && i);
      if (n && n.style ? o ? i ? l = n.style : (l = this._mergeStyle(this.createStyle(), r.style), this._mergeStyle(l, n.style)) : (l = this._mergeStyle(this.createStyle(), i ? this.style : r.style), this._mergeStyle(l, n.style)) : c && (l = r.style), l) if (o) {
        var u = this.style;
        if (this.style = this.createStyle(c ? {} : u), c) for (var d = Object(a["B"])(u), p = 0; p < d.length; p++) {
          var m = d[p];
          m in l && (l[m] = l[m], this.style[m] = u[m]);
        }
        var g = Object(a["B"])(l);
        for (p = 0; p < g.length; p++) {
          m = g[p];
          this.style[m] = this.style[m];
        }
        this._transitionState(t, {
          style: l
        }, s, this.getAnimationStyleProps());
      } else this.useStyle(l);
      var v = this.__inHover ? f : h;
      for (p = 0; p < v.length; p++) {
        m = v[p];
        n && null != n[m] ? this[m] = n[m] : c && null != r[m] && (this[m] = r[m]);
      }
    }, t.prototype._mergeStates = function (t) {
      for (var n, r = e.prototype._mergeStates.call(this, t), i = 0; i < t.length; i++) {
        var o = t[i];
        o.style && (n = n || {}, this._mergeStyle(n, o.style));
      }
      return n && (r.style = n), r;
    }, t.prototype._mergeStyle = function (e, t) {
      return Object(a["l"])(e, t), e;
    }, t.prototype.getAnimationStyleProps = function () {
      return u;
    }, t.initDefaultProps = function () {
      var e = t.prototype;
      e.type = "displayable", e.invisible = !1, e.z = 0, e.z2 = 0, e.zlevel = 0, e.culling = !1, e.cursor = "pointer", e.rectHover = !1, e.incremental = !1, e._rect = null, e.dirtyRectTolerance = 0, e.__dirty = s["a"] | s["c"];
    }(), t;
  }(i["a"]),
  p = new o["a"](0, 0, 0, 0),
  m = new o["a"](0, 0, 0, 0);
function g(e, t, n) {
  return p.copy(e.getBoundingRect()), e.transform && p.applyTransform(e.transform), m.width = t, m.height = n, !p.intersect(m);
}
legacyExports["c"] = d;
