let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
var r = require("./6d725347.js"),
  i = require("./47657637.js"),
  o = require("./494d6948.js");
function a(e, t, n, r, i, o, a) {
  if (0 === i) return !1;
  var s = i,
    l = 0,
    c = e;
  if (a > t + s && a > r + s || a < t - s && a < r - s || o > e + s && o > n + s || o < e - s && o < n - s) return !1;
  if (e === n) return Math.abs(o - e) <= s / 2;
  l = (t - r) / (e - n), c = (e * r - n * t) / (e - n);
  var u = l * o - a + c,
    h = u * u / (l * l + 1);
  return h <= s / 2 * s / 2;
}
var s = require("./536a3969.js");
function l(e, t, n, r, i, o, a, l, c, u, h) {
  if (0 === c) return !1;
  var f = c;
  if (h > t + f && h > r + f && h > o + f && h > l + f || h < t - f && h < r - f && h < o - f && h < l - f || u > e + f && u > n + f && u > i + f && u > a + f || u < e - f && u < n - f && u < i - f && u < a - f) return !1;
  var d = s["e"](e, t, n, r, i, o, a, l, u, h, null);
  return d <= f / 2;
}
function c(e, t, n, r, i, o, a, l, c) {
  if (0 === a) return !1;
  var u = a;
  if (c > t + u && c > r + u && c > o + u || c < t - u && c < r - u && c < o - u || l > e + u && l > n + u && l > i + u || l < e - u && l < n - u && l < i - u) return !1;
  var h = Object(s["l"])(e, t, n, r, i, o, l, c, null);
  return h <= u / 2;
}
var u = 2 * Math.PI;
function h(e) {
  return e %= u, e < 0 && (e += u), e;
}
var f = 2 * Math.PI;
function d(e, t, n, r, i, o, a, s, l) {
  if (0 === a) return !1;
  var c = a;
  s -= e, l -= t;
  var u = Math.sqrt(s * s + l * l);
  if (u - c > n || u + c < n) return !1;
  if (Math.abs(r - i) % f < 1e-4) return !0;
  if (o) {
    var d = r;
    r = h(i), i = h(d);
  } else r = h(r), i = h(i);
  r > i && (i += f);
  var p = Math.atan2(l, s);
  return p < 0 && (p += f), p >= r && p <= i || p + f >= r && p + f <= i;
}
function p(e, t, n, r, i, o) {
  if (o > t && o > r || o < t && o < r) return 0;
  if (r === t) return 0;
  var a = (o - t) / (r - t),
    s = r < t ? 1 : -1;
  1 !== a && 0 !== a || (s = r < t ? .5 : -.5);
  var l = a * (n - e) + e;
  return l === i ? 1 / 0 : l > i ? s : 0;
}
var m = o["a"].CMD,
  g = 2 * Math.PI,
  v = 1e-4;
function y(e, t) {
  return Math.abs(e - t) < v;
}
var b = [-1, -1, -1],
  w = [-1, -1];
function x() {
  var e = w[0];
  w[0] = w[1], w[1] = e;
}
function _(e, t, n, r, i, o, a, l, c, u) {
  if (u > t && u > r && u > o && u > l || u < t && u < r && u < o && u < l) return 0;
  var h = s["f"](t, r, o, l, u, b);
  if (0 === h) return 0;
  for (var f = 0, d = -1, p = void 0, m = void 0, g = 0; g < h; g++) {
    var v = b[g],
      y = 0 === v || 1 === v ? .5 : 1,
      _ = s["a"](e, n, i, a, v);
    _ < c || (d < 0 && (d = s["c"](t, r, o, l, w), w[1] < w[0] && d > 1 && x(), p = s["a"](t, r, o, l, w[0]), d > 1 && (m = s["a"](t, r, o, l, w[1]))), 2 === d ? v < w[0] ? f += p < t ? y : -y : v < w[1] ? f += m < p ? y : -y : f += l < m ? y : -y : v < w[0] ? f += p < t ? y : -y : f += l < p ? y : -y);
  }
  return f;
}
function E(e, t, n, r, i, o, a, l) {
  if (l > t && l > r && l > o || l < t && l < r && l < o) return 0;
  var c = s["m"](t, r, o, l, b);
  if (0 === c) return 0;
  var u = s["j"](t, r, o);
  if (u >= 0 && u <= 1) {
    for (var h = 0, f = s["h"](t, r, o, u), d = 0; d < c; d++) {
      var p = 0 === b[d] || 1 === b[d] ? .5 : 1,
        m = s["h"](e, n, i, b[d]);
      m < a || (b[d] < u ? h += f < t ? p : -p : h += o < f ? p : -p);
    }
    return h;
  }
  p = 0 === b[0] || 1 === b[0] ? .5 : 1, m = s["h"](e, n, i, b[0]);
  return m < a ? 0 : o < t ? p : -p;
}
function S(e, t, n, r, i, o, a, s) {
  if (s -= t, s > n || s < -n) return 0;
  var l = Math.sqrt(n * n - s * s);
  b[0] = -l, b[1] = l;
  var c = Math.abs(r - i);
  if (c < 1e-4) return 0;
  if (c >= g - 1e-4) {
    r = 0, i = g;
    var u = o ? 1 : -1;
    return a >= b[0] + e && a <= b[1] + e ? u : 0;
  }
  if (r > i) {
    var h = r;
    r = i, i = h;
  }
  r < 0 && (r += g, i += g);
  for (var f = 0, d = 0; d < 2; d++) {
    var p = b[d];
    if (p + e > a) {
      var m = Math.atan2(s, p);
      u = o ? 1 : -1;
      m < 0 && (m = g + m), (m >= r && m <= i || m + g >= r && m + g <= i) && (m > Math.PI / 2 && m < 1.5 * Math.PI && (u = -u), f += u);
    }
  }
  return f;
}
function k(e, t, n, r, i) {
  for (var o, s, u = e.data, h = e.len(), f = 0, g = 0, v = 0, b = 0, w = 0, x = 0; x < h;) {
    var k = u[x++],
      C = 1 === x;
    switch (k === m.M && x > 1 && (n || (f += p(g, v, b, w, r, i))), C && (g = u[x], v = u[x + 1], b = g, w = v), k) {
      case m.M:
        b = u[x++], w = u[x++], g = b, v = w;
        break;
      case m.L:
        if (n) {
          if (a(g, v, u[x], u[x + 1], t, r, i)) return !0;
        } else f += p(g, v, u[x], u[x + 1], r, i) || 0;
        g = u[x++], v = u[x++];
        break;
      case m.C:
        if (n) {
          if (l(g, v, u[x++], u[x++], u[x++], u[x++], u[x], u[x + 1], t, r, i)) return !0;
        } else f += _(g, v, u[x++], u[x++], u[x++], u[x++], u[x], u[x + 1], r, i) || 0;
        g = u[x++], v = u[x++];
        break;
      case m.Q:
        if (n) {
          if (c(g, v, u[x++], u[x++], u[x], u[x + 1], t, r, i)) return !0;
        } else f += E(g, v, u[x++], u[x++], u[x], u[x + 1], r, i) || 0;
        g = u[x++], v = u[x++];
        break;
      case m.A:
        var O = u[x++],
          T = u[x++],
          L = u[x++],
          A = u[x++],
          P = u[x++],
          j = u[x++];
        x += 1;
        var M = !!(1 - u[x++]);
        o = Math.cos(P) * L + O, s = Math.sin(P) * A + T, C ? (b = o, w = s) : f += p(g, v, o, s, r, i);
        var R = (r - O) * A / L + O;
        if (n) {
          if (d(O, T, A, P, P + j, M, t, R, i)) return !0;
        } else f += S(O, T, A, P, P + j, M, R, i);
        g = Math.cos(P + j) * L + O, v = Math.sin(P + j) * A + T;
        break;
      case m.R:
        b = g = u[x++], w = v = u[x++];
        var N = u[x++],
          D = u[x++];
        if (o = b + N, s = w + D, n) {
          if (a(b, w, o, w, t, r, i) || a(o, w, o, s, t, r, i) || a(o, s, b, s, t, r, i) || a(b, s, b, w, t, r, i)) return !0;
        } else f += p(o, w, o, s, r, i), f += p(b, s, b, w, r, i);
        break;
      case m.Z:
        if (n) {
          if (a(g, v, b, w, t, r, i)) return !0;
        } else f += p(g, v, b, w, r, i);
        g = b, v = w;
        break;
    }
  }
  return n || y(v, w) || (f += p(g, v, b, w, r, i) || 0), 0 !== f;
}
function C(e, t, n) {
  return k(e, 0, !1, t, n);
}
function O(e, t, n, r) {
  return k(e, t, !0, n, r);
}
var T = require("./62597459.js"),
  L = require("./51653970.js"),
  A = require("./4c505441.js"),
  P = require("./53385358.js"),
  j = require("./68594c6a.js");
defineExport(legacyExports, "a", function () {
  return M;
});
var M = Object(T["i"])({
    fill: "#000",
    stroke: null,
    strokePercent: 1,
    fillOpacity: 1,
    strokeOpacity: 1,
    lineDashOffset: 0,
    lineWidth: 1,
    lineCap: "butt",
    miterLimit: 10,
    strokeNoScale: !1,
    strokeFirst: !1
  }, i["b"]),
  R = {
    style: Object(T["i"])({
      fill: !0,
      stroke: !0,
      strokePercent: !0,
      fillOpacity: !0,
      strokeOpacity: !0,
      lineDashOffset: !0,
      lineWidth: !0,
      miterLimit: !0
    }, i["a"].style)
  },
  N = j["a"].concat(["invisible", "culling", "z", "z2", "zlevel", "parent"]),
  D = function (e) {
    function t(t) {
      return e.call(this, t) || this;
    }
    return Object(r["a"])(t, e), t.prototype.update = function () {
      var n = this;
      e.prototype.update.call(this);
      var r = this.style;
      if (r.decal) {
        var i = this._decalEl = this._decalEl || new t();
        i.buildPath === t.prototype.buildPath && (i.buildPath = function (e) {
          n.buildPath(e, n.shape);
        }), i.silent = !0;
        var o = i.style;
        for (var a in r) o[a] !== r[a] && (o[a] = r[a]);
        o.fill = r.fill ? r.decal : null, o.decal = null, o.shadowColor = null, r.strokeFirst && (o.stroke = null);
        for (var s = 0; s < N.length; ++s) i[N[s]] = this[N[s]];
        i.__dirty |= P["a"];
      } else this._decalEl && (this._decalEl = null);
    }, t.prototype.getDecalElement = function () {
      return this._decalEl;
    }, t.prototype._init = function (t) {
      var n = Object(T["B"])(t);
      this.shape = this.getDefaultShape();
      var r = this.getDefaultStyle();
      r && this.useStyle(r);
      for (var i = 0; i < n.length; i++) {
        var o = n[i],
          a = t[o];
        "style" === o ? this.style ? Object(T["l"])(this.style, a) : this.useStyle(a) : "shape" === o ? Object(T["l"])(this.shape, a) : e.prototype.attrKV.call(this, o, a);
      }
      this.style || this.useStyle({});
    }, t.prototype.getDefaultStyle = function () {
      return null;
    }, t.prototype.getDefaultShape = function () {
      return {};
    }, t.prototype.canBeInsideText = function () {
      return this.hasFill();
    }, t.prototype.getInsideTextFill = function () {
      var e = this.style.fill;
      if ("none" !== e) {
        if (Object(T["y"])(e)) {
          var t = Object(L["c"])(e, 0);
          return t > .5 ? A["a"] : t > .2 ? A["c"] : A["d"];
        }
        if (e) return A["d"];
      }
      return A["a"];
    }, t.prototype.getInsideTextStroke = function (e) {
      var t = this.style.fill;
      if (Object(T["y"])(t)) {
        var n = this.__zr,
          r = !(!n || !n.isDarkMode()),
          i = Object(L["c"])(e, 0) < A["b"];
        if (r === i) return t;
      }
    }, t.prototype.buildPath = function (e, t, n) {}, t.prototype.pathUpdated = function () {
      this.__dirty &= ~P["b"];
    }, t.prototype.getUpdatedPathProxy = function (e) {
      return !this.path && this.createPathProxy(), this.path.beginPath(), this.buildPath(this.path, this.shape, e), this.path;
    }, t.prototype.createPathProxy = function () {
      this.path = new o["a"](!1);
    }, t.prototype.hasStroke = function () {
      var e = this.style,
        t = e.stroke;
      return !(null == t || "none" === t || !(e.lineWidth > 0));
    }, t.prototype.hasFill = function () {
      var e = this.style,
        t = e.fill;
      return null != t && "none" !== t;
    }, t.prototype.getBoundingRect = function () {
      var e = this._rect,
        t = this.style,
        n = !e;
      if (n) {
        var r = !1;
        this.path || (r = !0, this.createPathProxy());
        var i = this.path;
        (r || this.__dirty & P["b"]) && (i.beginPath(), this.buildPath(i, this.shape, !1), this.pathUpdated()), e = i.getBoundingRect();
      }
      if (this._rect = e, this.hasStroke() && this.path && this.path.len() > 0) {
        var o = this._rectStroke || (this._rectStroke = e.clone());
        if (this.__dirty || n) {
          o.copy(e);
          var a = t.strokeNoScale ? this.getLineScale() : 1,
            s = t.lineWidth;
          if (!this.hasFill()) {
            var l = this.strokeContainThreshold;
            s = Math.max(s, null == l ? 4 : l);
          }
          a > 1e-10 && (o.width += s / a, o.height += s / a, o.x -= s / a / 2, o.y -= s / a / 2);
        }
        return o;
      }
      return e;
    }, t.prototype.contain = function (e, t) {
      var n = this.transformCoordToLocal(e, t),
        r = this.getBoundingRect(),
        i = this.style;
      if (e = n[0], t = n[1], r.contain(e, t)) {
        var o = this.path;
        if (this.hasStroke()) {
          var a = i.lineWidth,
            s = i.strokeNoScale ? this.getLineScale() : 1;
          if (s > 1e-10 && (this.hasFill() || (a = Math.max(a, this.strokeContainThreshold)), O(o, a / s, e, t))) return !0;
        }
        if (this.hasFill()) return C(o, e, t);
      }
      return !1;
    }, t.prototype.dirtyShape = function () {
      this.__dirty |= P["b"], this._rect && (this._rect = null), this._decalEl && this._decalEl.dirtyShape(), this.markRedraw();
    }, t.prototype.dirty = function () {
      this.dirtyStyle(), this.dirtyShape();
    }, t.prototype.animateShape = function (e) {
      return this.animate("shape", e);
    }, t.prototype.updateDuringAnimation = function (e) {
      "style" === e ? this.dirtyStyle() : "shape" === e ? this.dirtyShape() : this.markRedraw();
    }, t.prototype.attrKV = function (t, n) {
      "shape" === t ? this.setShape(n) : e.prototype.attrKV.call(this, t, n);
    }, t.prototype.setShape = function (e, t) {
      var n = this.shape;
      return n || (n = this.shape = {}), "string" === typeof e ? n[e] = t : Object(T["l"])(n, e), this.dirtyShape(), this;
    }, t.prototype.shapeChanged = function () {
      return !!(this.__dirty & P["b"]);
    }, t.prototype.createStyle = function (e) {
      return Object(T["g"])(M, e);
    }, t.prototype._innerSaveToNormal = function (t) {
      e.prototype._innerSaveToNormal.call(this, t);
      var n = this._normalState;
      t.shape && !n.shape && (n.shape = Object(T["l"])({}, this.shape));
    }, t.prototype._applyStateObj = function (t, n, r, i, o, a) {
      e.prototype._applyStateObj.call(this, t, n, r, i, o, a);
      var s,
        l = !(n && i);
      if (n && n.shape ? o ? i ? s = n.shape : (s = Object(T["l"])({}, r.shape), Object(T["l"])(s, n.shape)) : (s = Object(T["l"])({}, i ? this.shape : r.shape), Object(T["l"])(s, n.shape)) : l && (s = r.shape), s) if (o) {
        this.shape = Object(T["l"])({}, this.shape);
        for (var c = {}, u = Object(T["B"])(s), h = 0; h < u.length; h++) {
          var f = u[h];
          "object" === typeof s[f] ? this.shape[f] = s[f] : c[f] = s[f];
        }
        this._transitionState(t, {
          shape: c
        }, a);
      } else this.shape = s, this.dirtyShape();
    }, t.prototype._mergeStates = function (t) {
      for (var n, r = e.prototype._mergeStates.call(this, t), i = 0; i < t.length; i++) {
        var o = t[i];
        o.shape && (n = n || {}, this._mergeStyle(n, o.shape));
      }
      return n && (r.shape = n), r;
    }, t.prototype.getAnimationStyleProps = function () {
      return R;
    }, t.prototype.isZeroArea = function () {
      return !1;
    }, t.extend = function (e) {
      var n = function (t) {
        function n(n) {
          var r = t.call(this, n) || this;
          return e.init && e.init.call(r, n), r;
        }
        return Object(r["a"])(n, t), n.prototype.getDefaultStyle = function () {
          return Object(T["d"])(e.style);
        }, n.prototype.getDefaultShape = function () {
          return Object(T["d"])(e.shape);
        }, n;
      }(t);
      for (var i in e) "function" === typeof e[i] && (n.prototype[i] = e[i]);
      return n;
    }, t.initDefaultProps = function () {
      var e = t.prototype;
      e.type = "path", e.strokeContainThreshold = 5, e.segmentIgnoreThreshold = 0, e.subPixelOptimize = !1, e.autoBatch = !1, e.__dirty = P["a"] | P["c"] | P["b"];
    }(), t;
  }(i["c"]);
legacyExports["b"] = D;
