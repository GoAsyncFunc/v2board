let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
var r = require("./62597459.js"),
  i = require("./6e566655.js"),
  o = require("./2f643561.js"),
  a = require("./6d725347.js"),
  s = require("./54345547.js"),
  l = require("./47444467.js"),
  u = function (e) {
    function t() {
      var n = null !== e && e.apply(this, arguments) || this;
      return n.type = t.type, n;
    }
    return Object(a["a"])(t, e), t.prototype.getInitialData = function (e, t) {
      return Object(l["a"])(null, this, {
        useEncodeDefaulter: !0
      });
    }, t.prototype.getMarkerPosition = function (e) {
      var t = this.coordinateSystem;
      if (t && t.clampData) {
        var n = t.dataToPoint(t.clampData(e)),
          r = this.getData(),
          i = r.getLayout("offset"),
          o = r.getLayout("size"),
          a = t.getBaseAxis().isHorizontal() ? 0 : 1;
        return n[a] += i + o / 2, n;
      }
      return [NaN, NaN];
    }, t.type = "series.__base_bar__", t.defaultOption = {
      z: 2,
      coordinateSystem: "cartesian2d",
      legendHoverLink: !0,
      barMinHeight: 0,
      barMinAngle: 0,
      large: !1,
      largeThreshold: 400,
      progressive: 3e3,
      progressiveChunkMode: "mod"
    }, t;
  }(s["b"]);
s["b"].registerClass(u);
var c = u,
  f = require("./69526a57.js"),
  d = function (e) {
    function t() {
      var n = null !== e && e.apply(this, arguments) || this;
      return n.type = t.type, n;
    }
    return Object(a["a"])(t, e), t.prototype.getInitialData = function () {
      return Object(l["a"])(null, this, {
        useEncodeDefaulter: !0,
        createInvertedIndices: !!this.get("realtimeSort", !0) || null
      });
    }, t.prototype.getProgressive = function () {
      return !!this.get("large") && this.get("progressive");
    }, t.prototype.getProgressiveThreshold = function () {
      var e = this.get("progressiveThreshold"),
        t = this.get("largeThreshold");
      return t > e && (e = t), e;
    }, t.prototype.brushSelector = function (e, t, n) {
      return n.rect(t.getItemLayout(e));
    }, t.type = "series.bar", t.dependencies = ["grid", "polar"], t.defaultOption = Object(f["d"])(c.defaultOption, {
      clip: !0,
      roundCap: !1,
      showBackground: !1,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.2)",
        borderColor: null,
        borderWidth: 0,
        borderType: "solid",
        borderRadius: 0,
        shadowBlur: 0,
        shadowColor: null,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        opacity: 1
      },
      select: {
        itemStyle: {
          borderColor: "#212121"
        }
      },
      realtimeSort: !1
    }), t;
  }(c),
  h = d,
  p = require("./792b5674.js"),
  g = require("./4c63584c.js"),
  m = require("./49776253.js"),
  v = require("./33736f46.js"),
  y = require("./78364b74.js"),
  b = require("./53714939.js"),
  x = require("./6868784b.js"),
  _ = require("./66577761.js"),
  w = require("./65446668.js"),
  O = require("./694c4e76.js"),
  S = require("./734b2f44.js"),
  k = function () {
    function e() {
      this.cx = 0, this.cy = 0, this.r0 = 0, this.r = 0, this.startAngle = 0, this.endAngle = 2 * Math.PI, this.clockwise = !0;
    }
    return e;
  }(),
  j = function (e) {
    function t(t) {
      var n = e.call(this, t) || this;
      return n.type = "sausage", n;
    }
    return Object(a["a"])(t, e), t.prototype.getDefaultShape = function () {
      return new k();
    }, t.prototype.buildPath = function (e, t) {
      var n = t.cx,
        r = t.cy,
        i = Math.max(t.r0 || 0, 0),
        o = Math.max(t.r, 0),
        a = .5 * (o - i),
        s = i + a,
        l = t.startAngle,
        u = t.endAngle,
        c = t.clockwise,
        f = 2 * Math.PI,
        d = c ? u - l < f : l - u < f;
      d || (l = u - (c ? f : -f));
      var h = Math.cos(l),
        p = Math.sin(l),
        g = Math.cos(u),
        m = Math.sin(u);
      d ? (e.moveTo(h * i + n, p * i + r), e.arc(h * s + n, p * s + r, a, -Math.PI + l, l, !c)) : e.moveTo(h * o + n, p * o + r), e.arc(n, r, o, l, u, !c), e.arc(g * s + n, m * s + r, a, u - 2 * Math.PI, u - Math.PI, !c), 0 !== i && e.arc(n, r, i, u, l, c);
    }, t;
  }(p["b"]),
  M = j,
  C = require("./36496336.js"),
  T = require("./5643622b.js"),
  I = require("./78335838.js"),
  D = require("./36477258.js");
function A(e, t) {
  t = t || {};
  var n = t.isRoundCap;
  return function (t, r, i) {
    var o = r.position;
    if (!o || o instanceof Array) return Object(D["c"])(t, r, i);
    var a = e(o),
      s = null != r.distance ? r.distance : 5,
      l = this.shape,
      u = l.cx,
      c = l.cy,
      f = l.r,
      d = l.r0,
      h = (f + d) / 2,
      p = l.startAngle,
      g = l.endAngle,
      m = (p + g) / 2,
      v = n ? Math.abs(f - d) / 2 : 0,
      y = Math.cos,
      b = Math.sin,
      x = u + f * y(p),
      _ = c + f * b(p),
      w = "left",
      O = "top";
    switch (a) {
      case "startArc":
        x = u + (d - s) * y(m), _ = c + (d - s) * b(m), w = "center", O = "top";
        break;
      case "insideStartArc":
        x = u + (d + s) * y(m), _ = c + (d + s) * b(m), w = "center", O = "bottom";
        break;
      case "startAngle":
        x = u + h * y(p) + P(p, s + v, !1), _ = c + h * b(p) + L(p, s + v, !1), w = "right", O = "middle";
        break;
      case "insideStartAngle":
        x = u + h * y(p) + P(p, -s + v, !1), _ = c + h * b(p) + L(p, -s + v, !1), w = "left", O = "middle";
        break;
      case "middle":
        x = u + h * y(m), _ = c + h * b(m), w = "center", O = "middle";
        break;
      case "endArc":
        x = u + (f + s) * y(m), _ = c + (f + s) * b(m), w = "center", O = "bottom";
        break;
      case "insideEndArc":
        x = u + (f - s) * y(m), _ = c + (f - s) * b(m), w = "center", O = "top";
        break;
      case "endAngle":
        x = u + h * y(g) + P(g, s + v, !0), _ = c + h * b(g) + L(g, s + v, !0), w = "left", O = "middle";
        break;
      case "insideEndAngle":
        x = u + h * y(g) + P(g, -s + v, !0), _ = c + h * b(g) + L(g, -s + v, !0), w = "right", O = "middle";
        break;
      default:
        return Object(D["c"])(t, r, i);
    }
    return t = t || {}, t.x = x, t.y = _, t.align = w, t.verticalAlign = O, t;
  };
}
function E(e, t, n, i) {
  if (Object(r["w"])(i)) e.setTextConfig({
    rotation: i
  });else if (Object(r["r"])(t)) e.setTextConfig({
    rotation: 0
  });else {
    var o,
      a = e.shape,
      s = a.clockwise ? a.startAngle : a.endAngle,
      l = a.clockwise ? a.endAngle : a.startAngle,
      u = (s + l) / 2,
      c = n(t);
    switch (c) {
      case "startArc":
      case "insideStartArc":
      case "middle":
      case "insideEndArc":
      case "endArc":
        o = u;
        break;
      case "startAngle":
      case "insideStartAngle":
        o = s;
        break;
      case "endAngle":
      case "insideEndAngle":
        o = l;
        break;
      default:
        return void e.setTextConfig({
          rotation: 0
        });
    }
    var f = 1.5 * Math.PI - o;
    "middle" === c && f > Math.PI / 2 && f < 1.5 * Math.PI && (f -= Math.PI), e.setTextConfig({
      rotation: f
    });
  }
}
function P(e, t, n) {
  return t * Math.sin(e) * (n ? -1 : 1);
}
function L(e, t, n) {
  return t * Math.cos(e) * (n ? 1 : -1);
}
var N = Math.max,
  R = Math.min;
function z(e, t) {
  var n = e.getArea && e.getArea();
  if (Object(T["a"])(e, "cartesian2d")) {
    var r = e.getBaseAxis();
    if ("category" !== r.type || !r.onBand) {
      var i = t.getLayout("bandWidth");
      r.isHorizontal() ? (n.x -= i, n.width += 2 * i) : (n.y -= i, n.height += 2 * i);
    }
  }
  return n;
}
var F = function (e) {
    function t() {
      var n = e.call(this) || this;
      return n.type = t.type, n._isFirstFrame = !0, n;
    }
    return Object(a["a"])(t, e), t.prototype.render = function (e, t, n, r) {
      this._model = e, this._removeOnRenderedListener(n), this._updateDrawMode(e);
      var i = e.get("coordinateSystem");
      ("cartesian2d" === i || "polar" === i) && (this._progressiveEls = null, this._isLargeDraw ? this._renderLarge(e, t, n) : this._renderNormal(e, t, n, r));
    }, t.prototype.incrementalPrepareRender = function (e) {
      this._clear(), this._updateDrawMode(e), this._updateLargeClip(e);
    }, t.prototype.incrementalRender = function (e, t) {
      this._progressiveEls = [], this._incrementalRenderLarge(e, t);
    }, t.prototype.eachRendered = function (e) {
      Object(m["traverseElements"])(this._progressiveEls || this.group, e);
    }, t.prototype._updateDrawMode = function (e) {
      var t = e.pipelineContext.large;
      null != this._isLargeDraw && t === this._isLargeDraw || (this._isLargeDraw = t, this._clear());
    }, t.prototype._renderNormal = function (e, t, n, r) {
      var i,
        o = this.group,
        a = e.getData(),
        s = this._data,
        l = e.coordinateSystem,
        u = l.getBaseAxis();
      "cartesian2d" === l.type ? i = u.isHorizontal() : "polar" === l.type && (i = "angle" === u.dim);
      var c = e.isAnimationEnabled() ? e : null,
        f = V(e, l);
      f && this._enableRealtimeSort(f, a, n);
      var d = e.get("clip", !0) || f,
        h = z(l, a);
      o.removeClipPath();
      var p = e.get("roundCap", !0),
        m = e.get("showBackground", !0),
        y = e.getModel("backgroundStyle"),
        b = y.get("borderRadius") || 0,
        x = [],
        _ = this._backgroundEls,
        O = r && r.isInitSort,
        S = r && "changeAxisOrder" === r.type;
      function k(e) {
        var t = K[l.type](a, e),
          n = oe(l, i, t);
        return n.useStyle(y.getItemStyle()), "cartesian2d" === l.type && n.setShape("r", b), x[e] = n, n;
      }
      a.diff(s).add(function (t) {
        var n = a.getItemModel(t),
          r = K[l.type](a, t, n);
        if (m && k(t), a.hasValue(t) && q[l.type](r)) {
          var s = !1;
          d && (s = B[l.type](h, r));
          var g = Y[l.type](e, a, t, r, i, c, u.model, !1, p);
          f && (g.forceLabelAnimation = !0), Q(g, a, t, n, r, e, i, "polar" === l.type), O ? g.attr({
            shape: r
          }) : f ? G(f, c, g, r, t, i, !1, !1) : Object(v["c"])(g, {
            shape: r
          }, e, t), a.setItemGraphicEl(t, g), o.add(g), g.ignore = s;
        }
      }).update(function (t, n) {
        var r = a.getItemModel(t),
          g = K[l.type](a, t, r);
        if (m) {
          var j = void 0;
          0 === _.length ? j = k(n) : (j = _[n], j.useStyle(y.getItemStyle()), "cartesian2d" === l.type && j.setShape("r", b), x[t] = j);
          var M = K[l.type](a, t),
            C = ie(i, M, l);
          Object(v["h"])(j, {
            shape: C
          }, c, t);
        }
        var T = s.getItemGraphicEl(n);
        if (a.hasValue(t) && q[l.type](g)) {
          var I = !1;
          if (d && (I = B[l.type](h, g), I && o.remove(T)), T ? Object(v["g"])(T) : T = Y[l.type](e, a, t, g, i, c, u.model, !!T, p), f && (T.forceLabelAnimation = !0), S) {
            var D = T.getTextContent();
            if (D) {
              var A = Object(w["d"])(D);
              null != A.prevValue && (A.prevValue = A.value);
            }
          } else Q(T, a, t, r, g, e, i, "polar" === l.type);
          O ? T.attr({
            shape: g
          }) : f ? G(f, c, T, g, t, i, !0, S) : Object(v["h"])(T, {
            shape: g
          }, e, t, null), a.setItemGraphicEl(t, T), T.ignore = I, o.add(T);
        } else o.remove(T);
      }).remove(function (t) {
        var n = s.getItemGraphicEl(t);
        n && Object(v["f"])(n, e, t);
      }).execute();
      var j = this._backgroundGroup || (this._backgroundGroup = new g["a"]());
      j.removeAll();
      for (var M = 0; M < x.length; ++M) j.add(x[M]);
      o.add(j), this._backgroundEls = x, this._data = a;
    }, t.prototype._renderLarge = function (e, t, n) {
      this._clear(), te(e, this.group), this._updateLargeClip(e);
    }, t.prototype._incrementalRenderLarge = function (e, t) {
      this._removeBackground(), te(t, this.group, this._progressiveEls, !0);
    }, t.prototype._updateLargeClip = function (e) {
      var t = e.get("clip", !0) && Object(S["a"])(e.coordinateSystem, !1, e),
        n = this.group;
      t ? n.setClipPath(t) : n.removeClipPath();
    }, t.prototype._enableRealtimeSort = function (e, t, n) {
      var r = this;
      if (t.count()) {
        var i = e.baseAxis;
        if (this._isFirstFrame) this._dispatchInitSort(t, e, n), this._isFirstFrame = !1;else {
          var o = function (e) {
            var n = t.getItemGraphicEl(e),
              r = n && n.shape;
            return r && Math.abs(i.isHorizontal() ? r.height : r.width) || 0;
          };
          this._onRendered = function () {
            r._updateSortWithinSameData(t, o, i, n);
          }, n.getZr().on("rendered", this._onRendered);
        }
      }
    }, t.prototype._dataSort = function (e, t, n) {
      var i = [];
      return e.each(e.mapDimension(t.dim), function (e, t) {
        var r = n(t);
        r = null == r ? NaN : r, i.push({
          dataIndex: t,
          mappedValue: r,
          ordinalNumber: e
        });
      }), i.sort(function (e, t) {
        return t.mappedValue - e.mappedValue;
      }), {
        ordinalNumbers: Object(r["D"])(i, function (e) {
          return e.ordinalNumber;
        })
      };
    }, t.prototype._isOrderChangedWithinSameData = function (e, t, n) {
      for (var r = n.scale, i = e.mapDimension(n.dim), o = Number.MAX_VALUE, a = 0, s = r.getOrdinalMeta().categories.length; a < s; ++a) {
        var l = e.rawIndexOf(i, r.getRawOrdinalNumber(a)),
          u = l < 0 ? Number.MIN_VALUE : t(e.indexOfRawIndex(l));
        if (u > o) return !0;
        o = u;
      }
      return !1;
    }, t.prototype._isOrderDifferentInView = function (e, t) {
      for (var n = t.scale, r = n.getExtent(), i = Math.max(0, r[0]), o = Math.min(r[1], n.getOrdinalMeta().categories.length - 1); i <= o; ++i) if (e.ordinalNumbers[i] !== n.getRawOrdinalNumber(i)) return !0;
    }, t.prototype._updateSortWithinSameData = function (e, t, n, r) {
      if (this._isOrderChangedWithinSameData(e, t, n)) {
        var i = this._dataSort(e, n, t);
        this._isOrderDifferentInView(i, n) && (this._removeOnRenderedListener(r), r.dispatchAction({
          type: "changeAxisOrder",
          componentType: n.dim + "Axis",
          axisId: n.index,
          sortInfo: i
        }));
      }
    }, t.prototype._dispatchInitSort = function (e, t, n) {
      var r = t.baseAxis,
        i = this._dataSort(e, r, function (n) {
          return e.get(e.mapDimension(t.otherAxis.dim), n);
        });
      n.dispatchAction({
        type: "changeAxisOrder",
        componentType: r.dim + "Axis",
        isInitSort: !0,
        axisId: r.index,
        sortInfo: i
      });
    }, t.prototype.remove = function (e, t) {
      this._clear(this._model), this._removeOnRenderedListener(t);
    }, t.prototype.dispose = function (e, t) {
      this._removeOnRenderedListener(t);
    }, t.prototype._removeOnRenderedListener = function (e) {
      this._onRendered && (e.getZr().off("rendered", this._onRendered), this._onRendered = null);
    }, t.prototype._clear = function (e) {
      var t = this.group,
        n = this._data;
      e && e.isAnimationEnabled() && n && !this._isLargeDraw ? (this._removeBackground(), this._backgroundEls = [], n.eachItemGraphicEl(function (t) {
        Object(v["f"])(t, e, Object(x["a"])(t).dataIndex);
      })) : t.removeAll(), this._data = null, this._isFirstFrame = !0;
    }, t.prototype._removeBackground = function () {
      this.group.remove(this._backgroundGroup), this._backgroundGroup = null;
    }, t.type = "bar", t;
  }(C["a"]),
  B = {
    cartesian2d: function (e, t) {
      var n = t.width < 0 ? -1 : 1,
        r = t.height < 0 ? -1 : 1;
      n < 0 && (t.x += t.width, t.width = -t.width), r < 0 && (t.y += t.height, t.height = -t.height);
      var i = e.x + e.width,
        o = e.y + e.height,
        a = N(t.x, e.x),
        s = R(t.x + t.width, i),
        l = N(t.y, e.y),
        u = R(t.y + t.height, o),
        c = s < a,
        f = u < l;
      return t.x = c && a > i ? s : a, t.y = f && l > o ? u : l, t.width = c ? 0 : s - a, t.height = f ? 0 : u - l, n < 0 && (t.x += t.width, t.width = -t.width), r < 0 && (t.y += t.height, t.height = -t.height), c || f;
    },
    polar: function (e, t) {
      var n = t.r0 <= t.r ? 1 : -1;
      if (n < 0) {
        var r = t.r;
        t.r = t.r0, t.r0 = r;
      }
      var i = R(t.r, e.r),
        o = N(t.r0, e.r0);
      t.r = i, t.r0 = o;
      var a = i - o < 0;
      if (n < 0) {
        r = t.r;
        t.r = t.r0, t.r0 = r;
      }
      return a;
    }
  },
  Y = {
    cartesian2d: function (e, t, n, i, o, a, s, l, u) {
      var c = new y["a"]({
        shape: Object(r["l"])({}, i),
        z2: 1
      });
      if (c.__dataIndex = n, c.name = "item", a) {
        var f = c.shape,
          d = o ? "height" : "width";
        f[d] = 0;
      }
      return c;
    },
    polar: function (e, t, n, r, i, o, a, s, l) {
      var u = !i && l ? M : b["a"],
        c = new u({
          shape: r,
          z2: 1
        });
      c.name = "item";
      var f = X(i);
      if (c.calculateTextPosition = A(f, {
        isRoundCap: u === M
      }), o) {
        var d = c.shape,
          h = i ? "r" : "endAngle",
          p = {};
        d[h] = i ? 0 : r.startAngle, p[h] = r[h], (s ? v["h"] : v["c"])(c, {
          shape: p
        }, o);
      }
      return c;
    }
  };
function V(e, t) {
  var n = e.get("realtimeSort", !0),
    r = t.getBaseAxis();
  if (n && "category" === r.type && "cartesian2d" === t.type) return {
    baseAxis: r,
    otherAxis: t.getOtherAxis(r)
  };
}
function G(e, t, n, r, i, o, a, s) {
  var l, u;
  o ? (u = {
    x: r.x,
    width: r.width
  }, l = {
    y: r.y,
    height: r.height
  }) : (u = {
    y: r.y,
    height: r.height
  }, l = {
    x: r.x,
    width: r.width
  }), s || (a ? v["h"] : v["c"])(n, {
    shape: l
  }, t, i, null);
  var c = t ? e.baseAxis.model : null;
  (a ? v["h"] : v["c"])(n, {
    shape: u
  }, c, i);
}
function W(e, t) {
  for (var n = 0; n < t.length; n++) if (!isFinite(e[t[n]])) return !0;
  return !1;
}
var U = ["x", "y", "width", "height"],
  H = ["cx", "cy", "r", "startAngle", "endAngle"],
  q = {
    cartesian2d: function (e) {
      return !W(e, U);
    },
    polar: function (e) {
      return !W(e, H);
    }
  },
  K = {
    cartesian2d: function (e, t, n) {
      var r = e.getItemLayout(t),
        i = n ? $(n, r) : 0,
        o = r.width > 0 ? 1 : -1,
        a = r.height > 0 ? 1 : -1;
      return {
        x: r.x + o * i / 2,
        y: r.y + a * i / 2,
        width: r.width - o * i,
        height: r.height - a * i
      };
    },
    polar: function (e, t, n) {
      var r = e.getItemLayout(t);
      return {
        cx: r.cx,
        cy: r.cy,
        r0: r.r0,
        r: r.r,
        startAngle: r.startAngle,
        endAngle: r.endAngle,
        clockwise: r.clockwise
      };
    }
  };
function Z(e) {
  return null != e.startAngle && null != e.endAngle && e.startAngle === e.endAngle;
}
function X(e) {
  return function (e) {
    var t = e ? "Arc" : "Angle";
    return function (e) {
      switch (e) {
        case "start":
        case "insideStart":
        case "end":
        case "insideEnd":
          return e + t;
        default:
          return e;
      }
    };
  }(e);
}
function Q(e, t, n, i, o, a, s, l) {
  var u = t.getItemVisual(n, "style");
  l || e.setShape("r", i.get(["itemStyle", "borderRadius"]) || 0), e.useStyle(u);
  var c = i.getShallow("cursor");
  c && e.attr("cursor", c);
  var f = l ? s ? o.r >= o.r0 ? "endArc" : "startArc" : o.endAngle >= o.startAngle ? "endAngle" : "startAngle" : s ? o.height >= 0 ? "bottom" : "top" : o.width >= 0 ? "right" : "left",
    d = Object(w["c"])(i);
  Object(w["e"])(e, d, {
    labelFetcher: a,
    labelDataIndex: n,
    defaultText: Object(I["b"])(a.getData(), n),
    inheritColor: u.fill,
    defaultOpacity: u.opacity,
    defaultOutsidePosition: f
  });
  var h = e.getTextContent();
  if (l && h) {
    var p = i.get(["label", "position"]);
    e.textConfig.inside = "middle" === p || null, E(e, "outside" === p ? f : p, X(s), i.get(["label", "rotate"]));
  }
  Object(w["f"])(h, d, a.getRawValue(n), function (e) {
    return Object(I["a"])(t, e);
  });
  var g = i.getModel(["emphasis"]);
  Object(_["E"])(e, g.get("focus"), g.get("blurScope"), g.get("disabled")), Object(_["D"])(e, i), Z(o) && (e.style.fill = "none", e.style.stroke = "none", Object(r["j"])(e.states, function (e) {
    e.style && (e.style.fill = e.style.stroke = "none");
  }));
}
function $(e, t) {
  var n = e.get(["itemStyle", "borderColor"]);
  if (!n || "none" === n) return 0;
  var r = e.get(["itemStyle", "borderWidth"]) || 0,
    i = isNaN(t.width) ? Number.MAX_VALUE : Math.abs(t.width),
    o = isNaN(t.height) ? Number.MAX_VALUE : Math.abs(t.height);
  return Math.min(r, i, o);
}
var J = function () {
    function e() {}
    return e;
  }(),
  ee = function (e) {
    function t(t) {
      var n = e.call(this, t) || this;
      return n.type = "largeBar", n;
    }
    return Object(a["a"])(t, e), t.prototype.getDefaultShape = function () {
      return new J();
    }, t.prototype.buildPath = function (e, t) {
      for (var n = t.points, r = this.baseDimIdx, i = 1 - this.baseDimIdx, o = [], a = [], s = this.barWidth, l = 0; l < n.length; l += 3) a[r] = s, a[i] = n[l + 2], o[r] = n[l + r], o[i] = n[l + i], e.rect(o[0], o[1], a[0], a[1]);
    }, t;
  }(p["b"]);
function te(e, t, n, r) {
  var i = e.getData(),
    o = i.getLayout("valueAxisHorizontal") ? 1 : 0,
    a = i.getLayout("largeDataIndices"),
    s = i.getLayout("size"),
    l = e.getModel("backgroundStyle"),
    u = i.getLayout("largeBackgroundPoints");
  if (u) {
    var c = new ee({
      shape: {
        points: u
      },
      incremental: !!r,
      silent: !0,
      z2: 0
    });
    c.baseDimIdx = o, c.largeDataIndices = a, c.barWidth = s, c.useStyle(l.getItemStyle()), t.add(c), n && n.push(c);
  }
  var f = new ee({
    shape: {
      points: i.getLayout("largePoints")
    },
    incremental: !!r,
    ignoreCoarsePointer: !0,
    z2: 1
  });
  f.baseDimIdx = o, f.largeDataIndices = a, f.barWidth = s, t.add(f), f.useStyle(i.getVisual("style")), Object(x["a"])(f).seriesIndex = e.seriesIndex, e.get("silent") || (f.on("mousedown", ne), f.on("mousemove", ne)), n && n.push(f);
}
var ne = Object(O["c"])(function (e) {
  var t = this,
    n = re(t, e.offsetX, e.offsetY);
  Object(x["a"])(t).dataIndex = n >= 0 ? n : null;
}, 30, !1);
function re(e, t, n) {
  for (var r = e.baseDimIdx, i = 1 - r, o = e.shape.points, a = e.largeDataIndices, s = [], l = [], u = e.barWidth, c = 0, f = o.length / 3; c < f; c++) {
    var d = 3 * c;
    if (l[r] = u, l[i] = o[d + 2], s[r] = o[d + r], s[i] = o[d + i], l[i] < 0 && (s[i] += l[i], l[i] = -l[i]), t >= s[0] && t <= s[0] + l[0] && n >= s[1] && n <= s[1] + l[1]) return a[c];
  }
  return -1;
}
function ie(e, t, n) {
  if (Object(T["a"])(n, "cartesian2d")) {
    var r = t,
      i = n.getArea();
    return {
      x: e ? r.x : i.x,
      y: e ? i.y : r.y,
      width: e ? r.width : i.width,
      height: e ? i.height : r.height
    };
  }
  i = n.getArea();
  var o = t;
  return {
    cx: i.cx,
    cy: i.cy,
    r0: e ? i.r0 : o.r0,
    r: e ? i.r : o.r,
    startAngle: e ? o.startAngle : 0,
    endAngle: e ? o.endAngle : 2 * Math.PI
  };
}
function oe(e, t, n) {
  var r = "polar" === e.type ? b["a"] : y["a"];
  return new r({
    shape: ie(t, n, e),
    silent: !0,
    z2: 0
  });
}
var ae = F;
function se(e) {
  e.registerChartView(ae), e.registerSeriesModel(h), e.registerLayout(e.PRIORITY.VISUAL.LAYOUT, r["h"](i["b"], "bar")), e.registerLayout(e.PRIORITY.VISUAL.PROGRESSIVE_LAYOUT, Object(i["a"])("bar")), e.registerProcessor(e.PRIORITY.PROCESSOR.STATISTIC, Object(o["a"])("bar")), e.registerAction({
    type: "changeAxisOrder",
    event: "changeAxisOrder",
    update: "update"
  }, function (e, t) {
    var n = e.componentType || "series";
    t.eachComponent({
      mainType: n,
      query: e
    }, function (t) {
      e.sortInfo && t.axis.setCategorySortInfo(e.sortInfo);
    });
  });
}
defineExport(legacyExports, "a", function () {
  return se;
});
