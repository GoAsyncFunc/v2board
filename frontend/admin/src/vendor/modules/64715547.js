let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "c", function () {
  return w;
}), defineExport(legacyExports, "b", function () {
  return _;
});
var r = require("./6d725347.js"),
  i = require("./31416b4d.js"),
  o = require("./33553866.js"),
  a = require("./62597459.js"),
  s = require("./36477258.js"),
  l = require("./44616767.js"),
  c = require("./78364b74.js"),
  u = require("./6d464469.js"),
  h = require("./47657637.js"),
  f = require("./636d3672.js"),
  d = {
    fill: "#000"
  },
  p = 2,
  m = {
    style: Object(a["i"])({
      fill: !0,
      stroke: !0,
      fillOpacity: !0,
      strokeOpacity: !0,
      lineWidth: !0,
      fontSize: !0,
      lineHeight: !0,
      width: !0,
      height: !0,
      textShadowColor: !0,
      textShadowBlur: !0,
      textShadowOffsetX: !0,
      textShadowOffsetY: !0,
      backgroundColor: !0,
      padding: !0,
      borderColor: !0,
      borderWidth: !0,
      borderRadius: !0
    }, h["a"].style)
  },
  g = function (e) {
    function t(t) {
      var n = e.call(this) || this;
      return n.type = "text", n._children = [], n._defaultStyle = d, n.attr(t), n;
    }
    return Object(r["a"])(t, e), t.prototype.childrenRef = function () {
      return this._children;
    }, t.prototype.update = function () {
      e.prototype.update.call(this), this.styleChanged() && this._updateSubTexts();
      for (var t = 0; t < this._children.length; t++) {
        var n = this._children[t];
        n.zlevel = this.zlevel, n.z = this.z, n.z2 = this.z2, n.culling = this.culling, n.cursor = this.cursor, n.invisible = this.invisible;
      }
    }, t.prototype.updateTransform = function () {
      var t = this.innerTransformable;
      t ? (t.updateTransform(), t.transform && (this.transform = t.transform)) : e.prototype.updateTransform.call(this);
    }, t.prototype.getLocalTransform = function (t) {
      var n = this.innerTransformable;
      return n ? n.getLocalTransform(t) : e.prototype.getLocalTransform.call(this, t);
    }, t.prototype.getComputedTransform = function () {
      return this.__hostTarget && (this.__hostTarget.getComputedTransform(), this.__hostTarget.updateInnerText(!0)), e.prototype.getComputedTransform.call(this);
    }, t.prototype._updateSubTexts = function () {
      this._childCursor = 0, E(this.style), this.style.rich ? this._updateRichTexts() : this._updatePlainTexts(), this._children.length = this._childCursor, this.styleUpdated();
    }, t.prototype.addSelfToZr = function (t) {
      e.prototype.addSelfToZr.call(this, t);
      for (var n = 0; n < this._children.length; n++) this._children[n].__zr = t;
    }, t.prototype.removeSelfFromZr = function (t) {
      e.prototype.removeSelfFromZr.call(this, t);
      for (var n = 0; n < this._children.length; n++) this._children[n].__zr = null;
    }, t.prototype.getBoundingRect = function () {
      if (this.styleChanged() && this._updateSubTexts(), !this._rect) {
        for (var e = new u["a"](0, 0, 0, 0), t = this._children, n = [], r = null, i = 0; i < t.length; i++) {
          var o = t[i],
            a = o.getBoundingRect(),
            s = o.getLocalTransform(n);
          s ? (e.copy(a), e.applyTransform(s), r = r || e.clone(), r.union(e)) : (r = r || a.clone(), r.union(a));
        }
        this._rect = r || e;
      }
      return this._rect;
    }, t.prototype.setDefaultTextStyle = function (e) {
      this._defaultStyle = e || d;
    }, t.prototype.setTextContent = function (e) {
      0;
    }, t.prototype._mergeStyle = function (e, t) {
      if (!t) return e;
      var n = t.rich,
        r = e.rich || n && {};
      return Object(a["l"])(e, t), n && r ? (this._mergeRich(r, n), e.rich = r) : r && (e.rich = r), e;
    }, t.prototype._mergeRich = function (e, t) {
      for (var n = Object(a["B"])(t), r = 0; r < n.length; r++) {
        var i = n[r];
        e[i] = e[i] || {}, Object(a["l"])(e[i], t[i]);
      }
    }, t.prototype.getAnimationStyleProps = function () {
      return m;
    }, t.prototype._getOrCreateChild = function (e) {
      var t = this._children[this._childCursor];
      return t && t instanceof e || (t = new e()), this._children[this._childCursor++] = t, t.__zr = this.__zr, t.parent = this, t;
    }, t.prototype._updatePlainTexts = function () {
      var e = this.style,
        t = e.font || f["a"],
        n = e.padding,
        r = T(e),
        a = Object(i["a"])(r, e),
        l = L(e),
        c = !!e.backgroundColor,
        h = a.outerHeight,
        d = a.outerWidth,
        m = a.contentWidth,
        g = a.lines,
        v = a.lineHeight,
        y = this._defaultStyle,
        b = e.x || 0,
        w = e.y || 0,
        _ = e.align || y.align || "left",
        E = e.verticalAlign || y.verticalAlign || "top",
        S = b,
        A = Object(s["b"])(w, a.contentHeight, E);
      if (l || n) {
        var P = Object(s["a"])(b, d, _),
          j = Object(s["b"])(w, h, E);
        l && this._renderBackground(e, e, P, j, d, h);
      }
      A += v / 2, n && (S = O(b, _, n), "top" === E ? A += n[0] : "bottom" === E && (A -= n[2]));
      for (var M = 0, R = !1, N = C("fill" in e ? e.fill : (R = !0, y.fill)), D = k("stroke" in e ? e.stroke : c || y.autoStroke && !R ? null : (M = p, y.stroke)), I = e.textShadowBlur > 0, $ = null != e.width && ("truncate" === e.overflow || "break" === e.overflow || "breakAll" === e.overflow), F = a.calculatedLineHeight, B = 0; B < g.length; B++) {
        var V = this._getOrCreateChild(o["a"]),
          W = V.createStyle();
        V.useStyle(W), W.text = g[B], W.x = S, W.y = A, _ && (W.textAlign = _), W.textBaseline = "middle", W.opacity = e.opacity, W.strokeFirst = !0, I && (W.shadowBlur = e.textShadowBlur || 0, W.shadowColor = e.textShadowColor || "transparent", W.shadowOffsetX = e.textShadowOffsetX || 0, W.shadowOffsetY = e.textShadowOffsetY || 0), W.stroke = D, W.fill = N, D && (W.lineWidth = e.lineWidth || M, W.lineDash = e.lineDash, W.lineDashOffset = e.lineDashOffset || 0), W.font = t, x(W, e), A += v, $ && V.setBoundingRect(new u["a"](Object(s["a"])(W.x, e.width, W.textAlign), Object(s["b"])(W.y, F, W.textBaseline), m, F));
      }
    }, t.prototype._updateRichTexts = function () {
      var e = this.style,
        t = T(e),
        n = Object(i["b"])(t, e),
        r = n.width,
        o = n.outerWidth,
        a = n.outerHeight,
        l = e.padding,
        c = e.x || 0,
        u = e.y || 0,
        h = this._defaultStyle,
        f = e.align || h.align,
        d = e.verticalAlign || h.verticalAlign,
        p = Object(s["a"])(c, o, f),
        m = Object(s["b"])(u, a, d),
        g = p,
        v = m;
      l && (g += l[3], v += l[0]);
      var y = g + r;
      L(e) && this._renderBackground(e, e, p, m, o, a);
      for (var b = !!e.backgroundColor, w = 0; w < n.lines.length; w++) {
        var x = n.lines[w],
          _ = x.tokens,
          E = _.length,
          S = x.lineHeight,
          k = x.width,
          C = 0,
          O = g,
          A = y,
          P = E - 1,
          j = void 0;
        while (C < E && (j = _[C], !j.align || "left" === j.align)) this._placeToken(j, e, S, v, O, "left", b), k -= j.width, O += j.width, C++;
        while (P >= 0 && (j = _[P], "right" === j.align)) this._placeToken(j, e, S, v, A, "right", b), k -= j.width, A -= j.width, P--;
        O += (r - (O - g) - (y - A) - k) / 2;
        while (C <= P) j = _[C], this._placeToken(j, e, S, v, O + j.width / 2, "center", b), O += j.width, C++;
        v += S;
      }
    }, t.prototype._placeToken = function (e, t, n, r, i, l, c) {
      var h = t.rich[e.styleName] || {};
      h.text = e.text;
      var d = e.verticalAlign,
        m = r + n / 2;
      "top" === d ? m = r + e.height / 2 : "bottom" === d && (m = r + n - e.height / 2);
      var g = !e.isLineHolder && L(h);
      g && this._renderBackground(h, t, "right" === l ? i - e.width : "center" === l ? i - e.width / 2 : i, m - e.height / 2, e.width, e.height);
      var v = !!h.backgroundColor,
        y = e.textPadding;
      y && (i = O(i, l, y), m -= e.height / 2 - y[0] - e.innerHeight / 2);
      var b = this._getOrCreateChild(o["a"]),
        w = b.createStyle();
      b.useStyle(w);
      var _ = this._defaultStyle,
        E = !1,
        S = 0,
        T = C("fill" in h ? h.fill : "fill" in t ? t.fill : (E = !0, _.fill)),
        A = k("stroke" in h ? h.stroke : "stroke" in t ? t.stroke : v || c || _.autoStroke && !E ? null : (S = p, _.stroke)),
        P = h.textShadowBlur > 0 || t.textShadowBlur > 0;
      w.text = e.text, w.x = i, w.y = m, P && (w.shadowBlur = h.textShadowBlur || t.textShadowBlur || 0, w.shadowColor = h.textShadowColor || t.textShadowColor || "transparent", w.shadowOffsetX = h.textShadowOffsetX || t.textShadowOffsetX || 0, w.shadowOffsetY = h.textShadowOffsetY || t.textShadowOffsetY || 0), w.textAlign = l, w.textBaseline = "middle", w.font = e.font || f["a"], w.opacity = Object(a["L"])(h.opacity, t.opacity, 1), x(w, h), A && (w.lineWidth = Object(a["L"])(h.lineWidth, t.lineWidth, S), w.lineDash = Object(a["K"])(h.lineDash, t.lineDash), w.lineDashOffset = t.lineDashOffset || 0, w.stroke = A), T && (w.fill = T);
      var j = e.contentWidth,
        M = e.contentHeight;
      b.setBoundingRect(new u["a"](Object(s["a"])(w.x, j, w.textAlign), Object(s["b"])(w.y, M, w.textBaseline), j, M));
    }, t.prototype._renderBackground = function (e, t, n, r, i, o) {
      var s,
        u,
        h = e.backgroundColor,
        f = e.borderWidth,
        d = e.borderColor,
        p = h && h.image,
        m = h && !p,
        g = e.borderRadius,
        v = this;
      if (m || e.lineHeight || f && d) {
        s = this._getOrCreateChild(c["a"]), s.useStyle(s.createStyle()), s.style.fill = null;
        var y = s.shape;
        y.x = n, y.y = r, y.width = i, y.height = o, y.r = g, s.dirtyShape();
      }
      if (m) {
        var b = s.style;
        b.fill = h || null, b.fillOpacity = Object(a["K"])(e.fillOpacity, 1);
      } else if (p) {
        u = this._getOrCreateChild(l["a"]), u.onload = function () {
          v.dirtyStyle();
        };
        var w = u.style;
        w.image = h.image, w.x = n, w.y = r, w.width = i, w.height = o;
      }
      if (f && d) {
        b = s.style;
        b.lineWidth = f, b.stroke = d, b.strokeOpacity = Object(a["K"])(e.strokeOpacity, 1), b.lineDash = e.borderDash, b.lineDashOffset = e.borderDashOffset || 0, s.strokeContainThreshold = 0, s.hasFill() && s.hasStroke() && (b.strokeFirst = !0, b.lineWidth *= 2);
      }
      var x = (s || u).style;
      x.shadowBlur = e.shadowBlur || 0, x.shadowColor = e.shadowColor || "transparent", x.shadowOffsetX = e.shadowOffsetX || 0, x.shadowOffsetY = e.shadowOffsetY || 0, x.opacity = Object(a["L"])(e.opacity, t.opacity, 1);
    }, t.makeFont = function (e) {
      var t = "";
      return _(e) && (t = [e.fontStyle, e.fontWeight, w(e.fontSize), e.fontFamily || "sans-serif"].join(" ")), t && Object(a["O"])(t) || e.textFont || e.font;
    }, t;
  }(h["c"]),
  v = {
    left: !0,
    right: 1,
    center: 1
  },
  y = {
    top: 1,
    bottom: 1,
    middle: 1
  },
  b = ["fontStyle", "fontWeight", "fontSize", "fontFamily"];
function w(e) {
  return "string" !== typeof e || -1 === e.indexOf("px") && -1 === e.indexOf("rem") && -1 === e.indexOf("em") ? isNaN(+e) ? f["c"] + "px" : e + "px" : e;
}
function x(e, t) {
  for (var n = 0; n < b.length; n++) {
    var r = b[n],
      i = t[r];
    null != i && (e[r] = i);
  }
}
function _(e) {
  return null != e.fontSize || e.fontFamily || e.fontWeight;
}
function E(e) {
  return S(e), Object(a["j"])(e.rich, S), e;
}
function S(e) {
  if (e) {
    e.font = g.makeFont(e);
    var t = e.align;
    "middle" === t && (t = "center"), e.align = null == t || v[t] ? t : "left";
    var n = e.verticalAlign;
    "center" === n && (n = "middle"), e.verticalAlign = null == n || y[n] ? n : "top";
    var r = e.padding;
    r && (e.padding = Object(a["H"])(e.padding));
  }
}
function k(e, t) {
  return null == e || t <= 0 || "transparent" === e || "none" === e ? null : e.image || e.colorStops ? "#000" : e;
}
function C(e) {
  return null == e || "none" === e ? null : e.image || e.colorStops ? "#000" : e;
}
function O(e, t, n) {
  return "right" === t ? e - n[1] : "center" === t ? e + n[3] / 2 - n[1] / 2 : e + n[3];
}
function T(e) {
  var t = e.text;
  return null != t && (t += ""), t;
}
function L(e) {
  return !!(e.backgroundColor || e.lineHeight || e.borderWidth && e.borderColor);
}
legacyExports["a"] = g;
