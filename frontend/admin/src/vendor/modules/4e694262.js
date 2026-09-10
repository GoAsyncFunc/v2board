let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
var r = require("./6d725347.js"),
  i = require("./47444467.js"),
  o = require("./54345547.js"),
  a = require("./6f567045.js"),
  s = require("./4c63584c.js"),
  l = function (e) {
    function t() {
      var n = null !== e && e.apply(this, arguments) || this;
      return n.type = t.type, n.hasSymbolVisual = !0, n;
    }
    return Object(r["a"])(t, e), t.prototype.getInitialData = function (e) {
      return Object(i["a"])(null, this, {
        useEncodeDefaulter: !0
      });
    }, t.prototype.getLegendIcon = function (e) {
      var t = new s["a"](),
        n = Object(a["a"])("line", 0, e.itemHeight / 2, e.itemWidth, 0, e.lineStyle.stroke, !1);
      t.add(n), n.setStyle(e.lineStyle);
      var r = this.getData().getVisual("symbol"),
        i = this.getData().getVisual("symbolRotate"),
        o = "none" === r ? "circle" : r,
        l = .8 * e.itemHeight,
        u = Object(a["a"])(o, (e.itemWidth - l) / 2, (e.itemHeight - l) / 2, l, l, e.itemStyle.fill);
      t.add(u), u.setStyle(e.itemStyle);
      var c = "inherit" === e.iconRotate ? i : e.iconRotate || 0;
      return u.rotation = c * Math.PI / 180, u.setOrigin([e.itemWidth / 2, e.itemHeight / 2]), o.indexOf("empty") > -1 && (u.style.stroke = u.style.fill, u.style.fill = "#fff", u.style.lineWidth = 2), t;
    }, t.type = "series.line", t.dependencies = ["grid", "polar"], t.defaultOption = {
      z: 3,
      coordinateSystem: "cartesian2d",
      legendHoverLink: !0,
      clip: !0,
      label: {
        position: "top"
      },
      endLabel: {
        show: !1,
        valueAnimation: !0,
        distance: 8
      },
      lineStyle: {
        width: 2,
        type: "solid"
      },
      emphasis: {
        scale: !0
      },
      step: !1,
      smooth: !1,
      smoothMonotone: null,
      symbol: "emptyCircle",
      symbolSize: 4,
      symbolRotate: null,
      showSymbol: !0,
      showAllSymbol: "auto",
      connectNulls: !1,
      sampling: "none",
      animationEasing: "linear",
      progressive: 0,
      hoverLayerThreshold: 1 / 0,
      universalTransition: {
        divideShape: "clone"
      },
      triggerLineEvent: !1
    }, t;
  }(o["b"]),
  u = l,
  c = require("./62597459.js"),
  f = require("./33736f46.js"),
  d = require("./49776253.js"),
  h = require("./6868784b.js"),
  p = require("./66577761.js"),
  g = require("./78335838.js"),
  m = require("./65446668.js"),
  v = require("./44616767.js"),
  y = function (e) {
    function t(t, n, r, i) {
      var o = e.call(this) || this;
      return o.updateData(t, n, r, i), o;
    }
    return Object(r["a"])(t, e), t.prototype._createSymbol = function (e, t, n, r, i) {
      this.removeAll();
      var o = Object(a["a"])(e, -1, -1, 2, 2, null, i);
      o.attr({
        z2: 100,
        culling: !0,
        scaleX: r[0] / 2,
        scaleY: r[1] / 2
      }), o.drift = b, this._symbolType = e, this.add(o);
    }, t.prototype.stopSymbolAnimation = function (e) {
      this.childAt(0).stopAnimation(null, e);
    }, t.prototype.getSymbolType = function () {
      return this._symbolType;
    }, t.prototype.getSymbolPath = function () {
      return this.childAt(0);
    }, t.prototype.highlight = function () {
      Object(p["o"])(this.childAt(0));
    }, t.prototype.downplay = function () {
      Object(p["z"])(this.childAt(0));
    }, t.prototype.setZ = function (e, t) {
      var n = this.childAt(0);
      n.zlevel = e, n.z = t;
    }, t.prototype.setDraggable = function (e, t) {
      var n = this.childAt(0);
      n.draggable = e, n.cursor = !t && e ? "move" : n.cursor;
    }, t.prototype.updateData = function (e, n, r, i) {
      this.silent = !1;
      var o = e.getItemVisual(n, "symbol") || "circle",
        a = e.hostModel,
        s = t.getSymbolSize(e, n),
        l = o !== this._symbolType,
        u = i && i.disableAnimation;
      if (l) {
        var c = e.getItemVisual(n, "symbolKeepAspect");
        this._createSymbol(o, e, n, s, c);
      } else {
        var d = this.childAt(0);
        d.silent = !1;
        var h = {
          scaleX: s[0] / 2,
          scaleY: s[1] / 2
        };
        u ? d.attr(h) : f["h"](d, h, a, n), Object(f["g"])(d);
      }
      if (this._updateCommon(e, n, s, r, i), l) {
        d = this.childAt(0);
        if (!u) {
          h = {
            scaleX: this._sizeX,
            scaleY: this._sizeY,
            style: {
              opacity: d.style.opacity
            }
          };
          d.scaleX = d.scaleY = 0, d.style.opacity = 0, f["c"](d, h, a, n);
        }
      }
      u && this.childAt(0).stopAnimation("leave");
    }, t.prototype._updateCommon = function (e, t, n, r, i) {
      var o,
        s,
        l,
        u,
        f,
        d,
        h,
        y,
        b,
        x = this.childAt(0),
        _ = e.hostModel;
      if (r && (o = r.emphasisItemStyle, s = r.blurItemStyle, l = r.selectItemStyle, u = r.focus, f = r.blurScope, h = r.labelStatesModels, y = r.hoverScale, b = r.cursorStyle, d = r.emphasisDisabled), !r || e.hasItemOption) {
        var w = r && r.itemModel ? r.itemModel : e.getItemModel(t),
          O = w.getModel("emphasis");
        o = O.getModel("itemStyle").getItemStyle(), l = w.getModel(["select", "itemStyle"]).getItemStyle(), s = w.getModel(["blur", "itemStyle"]).getItemStyle(), u = O.get("focus"), f = O.get("blurScope"), d = O.get("disabled"), h = Object(m["c"])(w), y = O.getShallow("scale"), b = w.getShallow("cursor");
      }
      var S = e.getItemVisual(t, "symbolRotate");
      x.attr("rotation", (S || 0) * Math.PI / 180 || 0);
      var k = Object(a["b"])(e.getItemVisual(t, "symbolOffset"), n);
      k && (x.x = k[0], x.y = k[1]), b && x.attr("cursor", b);
      var j = e.getItemVisual(t, "style"),
        M = j.fill;
      if (x instanceof v["a"]) {
        var C = x.style;
        x.useStyle(Object(c["l"])({
          image: C.image,
          x: C.x,
          y: C.y,
          width: C.width,
          height: C.height
        }, j));
      } else x.__isEmptyBrush ? x.useStyle(Object(c["l"])({}, j)) : x.useStyle(j), x.style.decal = null, x.setColor(M, i && i.symbolInnerColor), x.style.strokeNoScale = !0;
      var T = e.getItemVisual(t, "liftZ"),
        I = this._z2;
      null != T ? null == I && (this._z2 = x.z2, x.z2 += T) : null != I && (x.z2 = I, this._z2 = null);
      var D = i && i.useNameLabel;
      function A(t) {
        return D ? e.getName(t) : Object(g["b"])(e, t);
      }
      Object(m["e"])(x, h, {
        labelFetcher: _,
        labelDataIndex: t,
        defaultText: A,
        inheritColor: M,
        defaultOpacity: j.opacity
      }), this._sizeX = n[0] / 2, this._sizeY = n[1] / 2;
      var E = x.ensureState("emphasis");
      E.style = o, x.ensureState("select").style = l, x.ensureState("blur").style = s;
      var P = null == y || !0 === y ? Math.max(1.1, 3 / this._sizeY) : isFinite(y) && y > 0 ? +y : 1;
      E.scaleX = this._sizeX * P, E.scaleY = this._sizeY * P, this.setSymbolScale(1), Object(p["E"])(this, u, f, d);
    }, t.prototype.setSymbolScale = function (e) {
      this.scaleX = this.scaleY = e;
    }, t.prototype.fadeOut = function (e, t, n) {
      var r = this.childAt(0),
        i = Object(h["a"])(this).dataIndex,
        o = n && n.animation;
      if (this.silent = r.silent = !0, n && n.fadeLabel) {
        var a = r.getTextContent();
        a && f["e"](a, {
          style: {
            opacity: 0
          }
        }, t, {
          dataIndex: i,
          removeOpt: o,
          cb: function () {
            r.removeTextContent();
          }
        });
      } else r.removeTextContent();
      f["e"](r, {
        style: {
          opacity: 0
        },
        scaleX: 0,
        scaleY: 0
      }, t, {
        dataIndex: i,
        cb: e,
        removeOpt: o
      });
    }, t.getSymbolSize = function (e, t) {
      return Object(a["c"])(e.getItemVisual(t, "symbolSize"));
    }, t;
  }(s["a"]);
function b(e, t) {
  this.parent.drift(e, t);
}
var x = y;
function _(e, t, n, r) {
  return t && !isNaN(t[0]) && !isNaN(t[1]) && !(r.isIgnore && r.isIgnore(n)) && !(r.clipShape && !r.clipShape.contain(t[0], t[1])) && "none" !== e.getItemVisual(n, "symbol");
}
function w(e) {
  return null == e || Object(c["x"])(e) || (e = {
    isIgnore: e
  }), e || {};
}
function O(e) {
  var t = e.hostModel,
    n = t.getModel("emphasis");
  return {
    emphasisItemStyle: n.getModel("itemStyle").getItemStyle(),
    blurItemStyle: t.getModel(["blur", "itemStyle"]).getItemStyle(),
    selectItemStyle: t.getModel(["select", "itemStyle"]).getItemStyle(),
    focus: n.get("focus"),
    blurScope: n.get("blurScope"),
    emphasisDisabled: n.get("disabled"),
    hoverScale: n.get("scale"),
    labelStatesModels: Object(m["c"])(t),
    cursorStyle: t.get("cursor")
  };
}
var S = function () {
    function e(e) {
      this.group = new s["a"](), this._SymbolCtor = e || x;
    }
    return e.prototype.updateData = function (e, t) {
      this._progressiveEls = null, t = w(t);
      var n = this.group,
        r = e.hostModel,
        i = this._data,
        o = this._SymbolCtor,
        a = t.disableAnimation,
        s = O(e),
        l = {
          disableAnimation: a
        },
        u = t.getSymbolPoint || function (t) {
          return e.getItemLayout(t);
        };
      i || n.removeAll(), e.diff(i).add(function (r) {
        var i = u(r);
        if (_(e, i, r, t)) {
          var a = new o(e, r, s, l);
          a.setPosition(i), e.setItemGraphicEl(r, a), n.add(a);
        }
      }).update(function (c, d) {
        var h = i.getItemGraphicEl(d),
          p = u(c);
        if (_(e, p, c, t)) {
          var g = e.getItemVisual(c, "symbol") || "circle",
            m = h && h.getSymbolType && h.getSymbolType();
          if (!h || m && m !== g) n.remove(h), h = new o(e, c, s, l), h.setPosition(p);else {
            h.updateData(e, c, s, l);
            var v = {
              x: p[0],
              y: p[1]
            };
            a ? h.attr(v) : f["h"](h, v, r);
          }
          n.add(h), e.setItemGraphicEl(c, h);
        } else n.remove(h);
      }).remove(function (e) {
        var t = i.getItemGraphicEl(e);
        t && t.fadeOut(function () {
          n.remove(t);
        }, r);
      }).execute(), this._getSymbolPoint = u, this._data = e;
    }, e.prototype.updateLayout = function () {
      var e = this,
        t = this._data;
      t && t.eachItemGraphicEl(function (t, n) {
        var r = e._getSymbolPoint(n);
        t.setPosition(r), t.markRedraw();
      });
    }, e.prototype.incrementalPrepareUpdate = function (e) {
      this._seriesScope = O(e), this._data = null, this.group.removeAll();
    }, e.prototype.incrementalUpdate = function (e, t, n) {
      function r(e) {
        e.isGroup || (e.incremental = !0, e.ensureState("emphasis").hoverLayer = !0);
      }
      this._progressiveEls = [], n = w(n);
      for (var i = e.start; i < e.end; i++) {
        var o = t.getItemLayout(i);
        if (_(t, o, i, n)) {
          var a = new this._SymbolCtor(t, i, this._seriesScope);
          a.traverse(r), a.setPosition(o), this.group.add(a), t.setItemGraphicEl(i, a), this._progressiveEls.push(a);
        }
      }
    }, e.prototype.eachRendered = function (e) {
      d["traverseElements"](this._progressiveEls || this.group, e);
    }, e.prototype.remove = function (e) {
      var t = this.group,
        n = this._data;
      n && e ? n.eachItemGraphicEl(function (e) {
        e.fadeOut(function () {
          t.remove(e);
        }, n.hostModel);
      }) : t.removeAll();
    }, e;
  }(),
  k = S,
  j = require("./37687172.js");
function M(e, t, n) {
  var r = e.getBaseAxis(),
    i = e.getOtherAxis(r),
    o = C(i, n),
    a = r.dim,
    s = i.dim,
    l = t.mapDimension(s),
    u = t.mapDimension(a),
    f = "x" === s || "radius" === s ? 1 : 0,
    d = Object(c["D"])(e.dimensions, function (e) {
      return t.mapDimension(e);
    }),
    h = !1,
    p = t.getCalculationInfo("stackResultDimension");
  return Object(j["c"])(t, d[0]) && (h = !0, d[0] = p), Object(j["c"])(t, d[1]) && (h = !0, d[1] = p), {
    dataDimsForPoint: d,
    valueStart: o,
    valueAxisDim: s,
    baseAxisDim: a,
    stacked: !!h,
    valueDim: l,
    baseDim: u,
    baseDataOffset: f,
    stackedOverDimension: t.getCalculationInfo("stackedOverDimension")
  };
}
function C(e, t) {
  var n = 0,
    r = e.scale.getExtent();
  return "start" === t ? n = r[0] : "end" === t ? n = r[1] : Object(c["w"])(t) && !isNaN(t) ? n = t : r[0] > 0 ? n = r[0] : r[1] < 0 && (n = r[1]), n;
}
function T(e, t, n, r) {
  var i = NaN;
  e.stacked && (i = n.get(n.getCalculationInfo("stackedOverDimension"), r)), isNaN(i) && (i = e.valueStart);
  var o = e.baseDataOffset,
    a = [];
  return a[o] = n.get(e.baseDim, r), a[1 - o] = i, t.dataToPoint(a);
}
var I = require("./396c6870.js");
function D(e, t) {
  var n = [];
  return t.diff(e).add(function (e) {
    n.push({
      cmd: "+",
      idx: e
    });
  }).update(function (e, t) {
    n.push({
      cmd: "=",
      idx: t,
      idx1: e
    });
  }).remove(function (e) {
    n.push({
      cmd: "-",
      idx: e
    });
  }).execute(), n;
}
function A(e, t, n, r, i, o, a, s) {
  for (var l = D(e, t), u = [], c = [], f = [], d = [], h = [], p = [], g = [], m = M(i, t, a), v = e.getLayout("points") || [], y = t.getLayout("points") || [], b = 0; b < l.length; b++) {
    var x = l[b],
      _ = !0,
      w = void 0,
      O = void 0;
    switch (x.cmd) {
      case "=":
        w = 2 * x.idx, O = 2 * x.idx1;
        var S = v[w],
          k = v[w + 1],
          j = y[O],
          C = y[O + 1];
        (isNaN(S) || isNaN(k)) && (S = j, k = C), u.push(S, k), c.push(j, C), f.push(n[w], n[w + 1]), d.push(r[O], r[O + 1]), g.push(t.getRawIndex(x.idx1));
        break;
      case "+":
        var A = x.idx,
          E = m.dataDimsForPoint,
          P = i.dataToPoint([t.get(E[0], A), t.get(E[1], A)]);
        O = 2 * A, u.push(P[0], P[1]), c.push(y[O], y[O + 1]);
        var L = T(m, i, t, A);
        f.push(L[0], L[1]), d.push(r[O], r[O + 1]), g.push(t.getRawIndex(A));
        break;
      case "-":
        _ = !1;
    }
    _ && (h.push(x), p.push(p.length));
  }
  p.sort(function (e, t) {
    return g[e] - g[t];
  });
  var N = u.length,
    R = Object(I["a"])(N),
    z = Object(I["a"])(N),
    F = Object(I["a"])(N),
    B = Object(I["a"])(N),
    Y = [];
  for (b = 0; b < p.length; b++) {
    var V = p[b],
      G = 2 * b,
      W = 2 * V;
    R[G] = u[W], R[G + 1] = u[W + 1], z[G] = c[W], z[G + 1] = c[W + 1], F[G] = f[W], F[G + 1] = f[W + 1], B[G] = d[W], B[G + 1] = d[W + 1], Y[b] = h[V];
  }
  return {
    current: R,
    next: z,
    stackedOnCurrent: F,
    stackedOnNext: B,
    status: Y
  };
}
var E = require("./534b6e63.js"),
  P = require("./64715547.js"),
  L = require("./344e4f34.js"),
  N = require("./792b5674.js"),
  R = require("./494d6948.js"),
  z = require("./536a3969.js"),
  F = Math.min,
  B = Math.max;
function Y(e, t) {
  return isNaN(e) || isNaN(t);
}
function V(e, t, n, r, i, o, a, s, l) {
  for (var u, c, f, d, h, p, g = n, m = 0; m < r; m++) {
    var v = t[2 * g],
      y = t[2 * g + 1];
    if (g >= i || g < 0) break;
    if (Y(v, y)) {
      if (l) {
        g += o;
        continue;
      }
      break;
    }
    if (g === n) e[o > 0 ? "moveTo" : "lineTo"](v, y), f = v, d = y;else {
      var b = v - u,
        x = y - c;
      if (b * b + x * x < .5) {
        g += o;
        continue;
      }
      if (a > 0) {
        var _ = g + o,
          w = t[2 * _],
          O = t[2 * _ + 1];
        while (w === v && O === y && m < r) m++, _ += o, g += o, w = t[2 * _], O = t[2 * _ + 1], v = t[2 * g], y = t[2 * g + 1], b = v - u, x = y - c;
        var S = m + 1;
        if (l) while (Y(w, O) && S < r) S++, _ += o, w = t[2 * _], O = t[2 * _ + 1];
        var k = .5,
          j = 0,
          M = 0,
          C = void 0,
          T = void 0;
        if (S >= r || Y(w, O)) h = v, p = y;else {
          j = w - u, M = O - c;
          var I = v - u,
            D = w - v,
            A = y - c,
            E = O - y,
            P = void 0,
            L = void 0;
          if ("x" === s) {
            P = Math.abs(I), L = Math.abs(D);
            var N = j > 0 ? 1 : -1;
            h = v - N * P * a, p = y, C = v + N * L * a, T = y;
          } else if ("y" === s) {
            P = Math.abs(A), L = Math.abs(E);
            var R = M > 0 ? 1 : -1;
            h = v, p = y - R * P * a, C = v, T = y + R * L * a;
          } else P = Math.sqrt(I * I + A * A), L = Math.sqrt(D * D + E * E), k = L / (L + P), h = v - j * a * (1 - k), p = y - M * a * (1 - k), C = v + j * a * k, T = y + M * a * k, C = F(C, B(w, v)), T = F(T, B(O, y)), C = B(C, F(w, v)), T = B(T, F(O, y)), j = C - v, M = T - y, h = v - j * P / L, p = y - M * P / L, h = F(h, B(u, v)), p = F(p, B(c, y)), h = B(h, F(u, v)), p = B(p, F(c, y)), j = v - h, M = y - p, C = v + j * L / P, T = y + M * L / P;
        }
        e.bezierCurveTo(f, d, h, p, v, y), f = C, d = T;
      } else e.lineTo(v, y);
    }
    u = v, c = y, g += o;
  }
  return m;
}
var G = function () {
    function e() {
      this.smooth = 0, this.smoothConstraint = !0;
    }
    return e;
  }(),
  W = function (e) {
    function t(t) {
      var n = e.call(this, t) || this;
      return n.type = "ec-polyline", n;
    }
    return Object(r["a"])(t, e), t.prototype.getDefaultStyle = function () {
      return {
        stroke: "#000",
        fill: null
      };
    }, t.prototype.getDefaultShape = function () {
      return new G();
    }, t.prototype.buildPath = function (e, t) {
      var n = t.points,
        r = 0,
        i = n.length / 2;
      if (t.connectNulls) {
        for (; i > 0; i--) if (!Y(n[2 * i - 2], n[2 * i - 1])) break;
        for (; r < i; r++) if (!Y(n[2 * r], n[2 * r + 1])) break;
      }
      while (r < i) r += V(e, n, r, i, i, 1, t.smooth, t.smoothMonotone, t.connectNulls) + 1;
    }, t.prototype.getPointOn = function (e, t) {
      this.path || (this.createPathProxy(), this.buildPath(this.path, this.shape));
      for (var n, r, i = this.path, o = i.data, a = R["a"].CMD, s = "x" === t, l = [], u = 0; u < o.length;) {
        var c = o[u++],
          f = void 0,
          d = void 0,
          h = void 0,
          p = void 0,
          g = void 0,
          m = void 0,
          v = void 0;
        switch (c) {
          case a.M:
            n = o[u++], r = o[u++];
            break;
          case a.L:
            if (f = o[u++], d = o[u++], v = s ? (e - n) / (f - n) : (e - r) / (d - r), v <= 1 && v >= 0) {
              var y = s ? (d - r) * v + r : (f - n) * v + n;
              return s ? [e, y] : [y, e];
            }
            n = f, r = d;
            break;
          case a.C:
            f = o[u++], d = o[u++], h = o[u++], p = o[u++], g = o[u++], m = o[u++];
            var b = s ? Object(z["f"])(n, f, h, g, e, l) : Object(z["f"])(r, d, p, m, e, l);
            if (b > 0) for (var x = 0; x < b; x++) {
              var _ = l[x];
              if (_ <= 1 && _ >= 0) {
                y = s ? Object(z["a"])(r, d, p, m, _) : Object(z["a"])(n, f, h, g, _);
                return s ? [e, y] : [y, e];
              }
            }
            n = g, r = m;
            break;
        }
      }
    }, t;
  }(N["b"]),
  U = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }
    return Object(r["a"])(t, e), t;
  }(G),
  H = function (e) {
    function t(t) {
      var n = e.call(this, t) || this;
      return n.type = "ec-polygon", n;
    }
    return Object(r["a"])(t, e), t.prototype.getDefaultShape = function () {
      return new U();
    }, t.prototype.buildPath = function (e, t) {
      var n = t.points,
        r = t.stackedOnPoints,
        i = 0,
        o = n.length / 2,
        a = t.smoothMonotone;
      if (t.connectNulls) {
        for (; o > 0; o--) if (!Y(n[2 * o - 2], n[2 * o - 1])) break;
        for (; i < o; i++) if (!Y(n[2 * i], n[2 * i + 1])) break;
      }
      while (i < o) {
        var s = V(e, n, i, o, o, 1, t.smooth, a, t.connectNulls);
        V(e, r, i + s - 1, s, o, -1, t.stackedOnSmooth, a, t.connectNulls), i += s + 1, e.closePath();
      }
    }, t;
  }(N["b"]),
  q = require("./36496336.js"),
  K = require("./734b2f44.js"),
  Z = require("./5643622b.js"),
  X = require("./37614b42.js"),
  Q = require("./51653970.js");
function $(e, t) {
  if (e.length === t.length) {
    for (var n = 0; n < e.length; n++) if (e[n] !== t[n]) return;
    return !0;
  }
}
function J(e) {
  for (var t = 1 / 0, n = 1 / 0, r = -1 / 0, i = -1 / 0, o = 0; o < e.length;) {
    var a = e[o++],
      s = e[o++];
    isNaN(a) || (t = Math.min(a, t), r = Math.max(a, r)), isNaN(s) || (n = Math.min(s, n), i = Math.max(s, i));
  }
  return [[t, n], [r, i]];
}
function ee(e, t) {
  var n = J(e),
    r = n[0],
    i = n[1],
    o = J(t),
    a = o[0],
    s = o[1];
  return Math.max(Math.abs(r[0] - a[0]), Math.abs(r[1] - a[1]), Math.abs(i[0] - s[0]), Math.abs(i[1] - s[1]));
}
function te(e) {
  return c["w"](e) ? e : e ? .5 : 0;
}
function ne(e, t, n) {
  if (!n.valueDim) return [];
  for (var r = t.count(), i = Object(I["a"])(2 * r), o = 0; o < r; o++) {
    var a = T(n, e, t, o);
    i[2 * o] = a[0], i[2 * o + 1] = a[1];
  }
  return i;
}
function re(e, t, n, r) {
  var i = t.getBaseAxis(),
    o = "x" === i.dim || "radius" === i.dim ? 0 : 1,
    a = [],
    s = 0,
    l = [],
    u = [],
    c = [],
    f = [];
  if (r) {
    for (s = 0; s < e.length; s += 2) isNaN(e[s]) || isNaN(e[s + 1]) || f.push(e[s], e[s + 1]);
    e = f;
  }
  for (s = 0; s < e.length - 2; s += 2) switch (c[0] = e[s + 2], c[1] = e[s + 3], u[0] = e[s], u[1] = e[s + 1], a.push(u[0], u[1]), n) {
    case "end":
      l[o] = c[o], l[1 - o] = u[1 - o], a.push(l[0], l[1]);
      break;
    case "middle":
      var d = (u[o] + c[o]) / 2,
        h = [];
      l[o] = h[o] = d, l[1 - o] = u[1 - o], h[1 - o] = c[1 - o], a.push(l[0], l[1]), a.push(h[0], h[1]);
      break;
    default:
      l[o] = u[o], l[1 - o] = c[1 - o], a.push(l[0], l[1]);
  }
  return a.push(e[s++], e[s++]), a;
}
function ie(e, t) {
  var n,
    r,
    i = [],
    o = e.length;
  function a(e, t, n) {
    var r = e.coord,
      i = (n - r) / (t.coord - r),
      o = Object(Q["a"])(i, [e.color, t.color]);
    return {
      coord: n,
      color: o
    };
  }
  for (var s = 0; s < o; s++) {
    var l = e[s],
      u = l.coord;
    if (u < 0) n = l;else {
      if (u > t) {
        r ? i.push(a(r, l, t)) : n && i.push(a(n, l, 0), a(n, l, t));
        break;
      }
      n && (i.push(a(n, l, 0)), n = null), i.push(l), r = l;
    }
  }
  return i;
}
function oe(e, t, n) {
  var r = e.getVisual("visualMeta");
  if (r && r.length && e.count() && "cartesian2d" === t.type) {
    for (var i, o, a = r.length - 1; a >= 0; a--) {
      var s = e.getDimensionInfo(r[a].dimension);
      if (i = s && s.coordDim, "x" === i || "y" === i) {
        o = r[a];
        break;
      }
    }
    if (o) {
      var l = t.getAxis(i),
        u = c["D"](o.stops, function (e) {
          return {
            coord: l.toGlobalCoord(l.dataToCoord(e.value)),
            color: e.color
          };
        }),
        f = u.length,
        d = o.outerColors.slice();
      f && u[0].coord > u[f - 1].coord && (u.reverse(), d.reverse());
      var h = ie(u, "x" === i ? n.getWidth() : n.getHeight()),
        p = h.length;
      if (!p && f) return u[0].coord < 0 ? d[1] ? d[1] : u[f - 1].color : d[0] ? d[0] : u[0].color;
      var g = 10,
        m = h[0].coord - g,
        v = h[p - 1].coord + g,
        y = v - m;
      if (y < .001) return "transparent";
      c["j"](h, function (e) {
        e.offset = (e.coord - m) / y;
      }), h.push({
        offset: p ? h[p - 1].offset : .5,
        color: d[1] || "transparent"
      }), h.unshift({
        offset: p ? h[0].offset : .5,
        color: d[0] || "transparent"
      });
      var b = new E["a"](0, 0, 0, 0, h, !0);
      return b[i] = m, b[i + "2"] = v, b;
    }
  }
}
function ae(e, t, n) {
  var r = e.get("showAllSymbol"),
    i = "auto" === r;
  if (!r || i) {
    var o = n.getAxesByScale("ordinal")[0];
    if (o && (!i || !se(o, t))) {
      var a = t.mapDimension(o.dim),
        s = {};
      return c["j"](o.getViewLabels(), function (e) {
        var t = o.scale.getRawOrdinalNumber(e.tickValue);
        s[t] = 1;
      }), function (e) {
        return !s.hasOwnProperty(t.get(a, e));
      };
    }
  }
}
function se(e, t) {
  var n = e.getExtent(),
    r = Math.abs(n[1] - n[0]) / e.scale.count();
  isNaN(r) && (r = 0);
  for (var i = t.count(), o = Math.max(1, Math.round(i / 5)), a = 0; a < i; a += o) if (1.5 * x.getSymbolSize(t, a)[e.isHorizontal() ? 1 : 0] > r) return !1;
  return !0;
}
function le(e, t) {
  return isNaN(e) || isNaN(t);
}
function ue(e) {
  for (var t = e.length / 2; t > 0; t--) if (!le(e[2 * t - 2], e[2 * t - 1])) break;
  return t - 1;
}
function ce(e, t) {
  return [e[2 * t], e[2 * t + 1]];
}
function fe(e, t, n) {
  for (var r, i, o = e.length / 2, a = "x" === n ? 0 : 1, s = 0, l = -1, u = 0; u < o; u++) if (i = e[2 * u + a], !isNaN(i) && !isNaN(e[2 * u + 1 - a])) if (0 !== u) {
    if (r <= t && i >= t || r >= t && i <= t) {
      l = u;
      break;
    }
    s = u, r = i;
  } else r = i;
  return {
    range: [s, l],
    t: (t - r) / (i - r)
  };
}
function de(e) {
  if (e.get(["endLabel", "show"])) return !0;
  for (var t = 0; t < p["g"].length; t++) if (e.get([p["g"][t], "endLabel", "show"])) return !0;
  return !1;
}
function he(e, t, n, r) {
  if (Object(Z["a"])(t, "cartesian2d")) {
    var i = r.getModel("endLabel"),
      o = i.get("valueAnimation"),
      a = r.getData(),
      s = {
        lastFrameIndex: 0
      },
      l = de(r) ? function (n, r) {
        e._endLabelOnDuring(n, r, a, s, o, i, t);
      } : null,
      u = t.getBaseAxis().isHorizontal(),
      c = Object(K["b"])(t, n, r, function () {
        var t = e._endLabel;
        t && n && null != s.originalX && t.attr({
          x: s.originalX,
          y: s.originalY
        });
      }, l);
    if (!r.get("clip", !0)) {
      var f = c.shape,
        d = Math.max(f.width, f.height);
      u ? (f.y -= d, f.height += 2 * d) : (f.x -= d, f.width += 2 * d);
    }
    return l && l(1, c), c;
  }
  return Object(K["c"])(t, n, r);
}
function pe(e, t) {
  var n = t.getBaseAxis(),
    r = n.isHorizontal(),
    i = n.inverse,
    o = r ? i ? "right" : "left" : "center",
    a = r ? "middle" : i ? "top" : "bottom";
  return {
    normal: {
      align: e.get("align") || o,
      verticalAlign: e.get("verticalAlign") || a
    }
  };
}
var ge = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }
    return Object(r["a"])(t, e), t.prototype.init = function () {
      var e = new s["a"](),
        t = new k();
      this.group.add(t.group), this._symbolDraw = t, this._lineGroup = e;
    }, t.prototype.render = function (e, t, n) {
      var r = this,
        i = e.coordinateSystem,
        o = this.group,
        a = e.getData(),
        s = e.getModel("lineStyle"),
        l = e.getModel("areaStyle"),
        u = a.getLayout("points") || [],
        d = "polar" === i.type,
        g = this._coordSys,
        m = this._symbolDraw,
        v = this._polyline,
        y = this._polygon,
        b = this._lineGroup,
        x = e.get("animation"),
        _ = !l.isEmpty(),
        w = l.get("origin"),
        O = M(i, a, w),
        S = _ && ne(i, a, O),
        k = e.get("showSymbol"),
        j = e.get("connectNulls"),
        C = k && !d && ae(e, a, i),
        T = this._data;
      T && T.eachItemGraphicEl(function (e, t) {
        e.__temp && (o.remove(e), T.setItemGraphicEl(t, null));
      }), k || m.remove(), o.add(b);
      var I,
        D = !d && e.get("step");
      i && i.getArea && e.get("clip", !0) && (I = i.getArea(), null != I.width ? (I.x -= .1, I.y -= .1, I.width += .2, I.height += .2) : I.r0 && (I.r0 -= .5, I.r += .5)), this._clipShapeForSymbol = I;
      var A = oe(a, i, n) || a.getVisual("style")[a.getVisual("drawType")];
      if (v && g.type === i.type && D === this._step) {
        _ && !y ? y = this._newPolygon(u, S) : y && !_ && (b.remove(y), y = this._polygon = null), d || this._initOrUpdateEndLabel(e, i, Object(X["b"])(A));
        var E = b.getClipPath();
        if (E) {
          var P = he(this, i, !1, e);
          f["c"](E, {
            shape: P.shape
          }, e);
        } else b.setClipPath(he(this, i, !0, e));
        k && m.updateData(a, {
          isIgnore: C,
          clipShape: I,
          disableAnimation: !0,
          getSymbolPoint: function (e) {
            return [u[2 * e], u[2 * e + 1]];
          }
        }), $(this._stackedOnPoints, S) && $(this._points, u) || (x ? this._doUpdateAnimation(a, S, i, n, D, w, j) : (D && (u = re(u, i, D, j), S && (S = re(S, i, D, j))), v.setShape({
          points: u
        }), y && y.setShape({
          points: u,
          stackedOnPoints: S
        })));
      } else k && m.updateData(a, {
        isIgnore: C,
        clipShape: I,
        disableAnimation: !0,
        getSymbolPoint: function (e) {
          return [u[2 * e], u[2 * e + 1]];
        }
      }), x && this._initSymbolLabelAnimation(a, i, I), D && (u = re(u, i, D, j), S && (S = re(S, i, D, j))), v = this._newPolyline(u), _ ? y = this._newPolygon(u, S) : y && (b.remove(y), y = this._polygon = null), d || this._initOrUpdateEndLabel(e, i, Object(X["b"])(A)), b.setClipPath(he(this, i, !0, e));
      var L = e.getModel("emphasis"),
        N = L.get("focus"),
        R = L.get("blurScope"),
        z = L.get("disabled");
      if (v.useStyle(c["i"](s.getLineStyle(), {
        fill: "none",
        stroke: A,
        lineJoin: "bevel"
      })), Object(p["D"])(v, e, "lineStyle"), v.style.lineWidth > 0 && "bolder" === e.get(["emphasis", "lineStyle", "width"])) {
        var F = v.getState("emphasis").style;
        F.lineWidth = +v.style.lineWidth + 1;
      }
      Object(h["a"])(v).seriesIndex = e.seriesIndex, Object(p["E"])(v, N, R, z);
      var B = te(e.get("smooth")),
        Y = e.get("smoothMonotone");
      if (v.setShape({
        smooth: B,
        smoothMonotone: Y,
        connectNulls: j
      }), y) {
        var V = a.getCalculationInfo("stackedOnSeries"),
          G = 0;
        y.useStyle(c["i"](l.getAreaStyle(), {
          fill: A,
          opacity: .7,
          lineJoin: "bevel",
          decal: a.getVisual("style").decal
        })), V && (G = te(V.get("smooth"))), y.setShape({
          smooth: B,
          stackedOnSmooth: G,
          smoothMonotone: Y,
          connectNulls: j
        }), Object(p["D"])(y, e, "areaStyle"), Object(h["a"])(y).seriesIndex = e.seriesIndex, Object(p["E"])(y, N, R, z);
      }
      var W = function (e) {
        r._changePolyState(e);
      };
      a.eachItemGraphicEl(function (e) {
        e && (e.onHoverStateChange = W);
      }), this._polyline.onHoverStateChange = W, this._data = a, this._coordSys = i, this._stackedOnPoints = S, this._points = u, this._step = D, this._valueOrigin = w, e.get("triggerLineEvent") && (this.packEventData(e, v), y && this.packEventData(e, y));
    }, t.prototype.packEventData = function (e, t) {
      Object(h["a"])(t).eventData = {
        componentType: "series",
        componentSubType: "line",
        componentIndex: e.componentIndex,
        seriesIndex: e.seriesIndex,
        seriesName: e.name,
        seriesType: "line"
      };
    }, t.prototype.highlight = function (e, t, n, r) {
      var i = e.getData(),
        o = L["s"](i, r);
      if (this._changePolyState("emphasis"), !(o instanceof Array) && null != o && o >= 0) {
        var a = i.getLayout("points"),
          s = i.getItemGraphicEl(o);
        if (!s) {
          var l = a[2 * o],
            u = a[2 * o + 1];
          if (isNaN(l) || isNaN(u)) return;
          if (this._clipShapeForSymbol && !this._clipShapeForSymbol.contain(l, u)) return;
          var c = e.get("zlevel") || 0,
            f = e.get("z") || 0;
          s = new x(i, o), s.x = l, s.y = u, s.setZ(c, f);
          var d = s.getSymbolPath().getTextContent();
          d && (d.zlevel = c, d.z = f, d.z2 = this._polyline.z2 + 1), s.__temp = !0, i.setItemGraphicEl(o, s), s.stopSymbolAnimation(!0), this.group.add(s);
        }
        s.highlight();
      } else q["a"].prototype.highlight.call(this, e, t, n, r);
    }, t.prototype.downplay = function (e, t, n, r) {
      var i = e.getData(),
        o = L["s"](i, r);
      if (this._changePolyState("normal"), null != o && o >= 0) {
        var a = i.getItemGraphicEl(o);
        a && (a.__temp ? (i.setItemGraphicEl(o, null), this.group.remove(a)) : a.downplay());
      } else q["a"].prototype.downplay.call(this, e, t, n, r);
    }, t.prototype._changePolyState = function (e) {
      var t = this._polygon;
      Object(p["C"])(this._polyline, e), t && Object(p["C"])(t, e);
    }, t.prototype._newPolyline = function (e) {
      var t = this._polyline;
      return t && this._lineGroup.remove(t), t = new W({
        shape: {
          points: e
        },
        segmentIgnoreThreshold: 2,
        z2: 10
      }), this._lineGroup.add(t), this._polyline = t, t;
    }, t.prototype._newPolygon = function (e, t) {
      var n = this._polygon;
      return n && this._lineGroup.remove(n), n = new H({
        shape: {
          points: e,
          stackedOnPoints: t
        },
        segmentIgnoreThreshold: 2
      }), this._lineGroup.add(n), this._polygon = n, n;
    }, t.prototype._initSymbolLabelAnimation = function (e, t, n) {
      var r,
        i,
        o = t.getBaseAxis(),
        a = o.inverse;
      "cartesian2d" === t.type ? (r = o.isHorizontal(), i = !1) : "polar" === t.type && (r = "angle" === o.dim, i = !0);
      var s = e.hostModel,
        l = s.get("animationDuration");
      c["u"](l) && (l = l(null));
      var u = s.get("animationDelay") || 0,
        f = c["u"](u) ? u(null) : u;
      e.eachItemGraphicEl(function (e, o) {
        var s = e;
        if (s) {
          var d = [e.x, e.y],
            h = void 0,
            p = void 0,
            g = void 0;
          if (n) if (i) {
            var m = n,
              v = t.pointToCoord(d);
            r ? (h = m.startAngle, p = m.endAngle, g = -v[1] / 180 * Math.PI) : (h = m.r0, p = m.r, g = v[0]);
          } else {
            var y = n;
            r ? (h = y.x, p = y.x + y.width, g = e.x) : (h = y.y + y.height, p = y.y, g = e.y);
          }
          var b = p === h ? 0 : (g - h) / (p - h);
          a && (b = 1 - b);
          var x = c["u"](u) ? u(o) : l * b + f,
            _ = s.getSymbolPath(),
            w = _.getTextContent();
          s.attr({
            scaleX: 0,
            scaleY: 0
          }), s.animateTo({
            scaleX: 1,
            scaleY: 1
          }, {
            duration: 200,
            setToFinal: !0,
            delay: x
          }), w && w.animateFrom({
            style: {
              opacity: 0
            }
          }, {
            duration: 300,
            delay: x
          }), _.disableLabelAnimation = !0;
        }
      });
    }, t.prototype._initOrUpdateEndLabel = function (e, t, n) {
      var r = e.getModel("endLabel");
      if (de(e)) {
        var i = e.getData(),
          o = this._polyline,
          a = i.getLayout("points");
        if (!a) return o.removeTextContent(), void (this._endLabel = null);
        var s = this._endLabel;
        s || (s = this._endLabel = new P["a"]({
          z2: 200
        }), s.ignoreClip = !0, o.setTextContent(this._endLabel), o.disableLabelAnimation = !0);
        var l = ue(a);
        l >= 0 && (Object(m["e"])(o, Object(m["c"])(e, "endLabel"), {
          inheritColor: n,
          labelFetcher: e,
          labelDataIndex: l,
          defaultText: function (e, t, n) {
            return null != n ? Object(g["a"])(i, n) : Object(g["b"])(i, e);
          },
          enableTextSetter: !0
        }, pe(r, t)), o.textConfig.position = null);
      } else this._endLabel && (this._polyline.removeTextContent(), this._endLabel = null);
    }, t.prototype._endLabelOnDuring = function (e, t, n, r, i, o, a) {
      var s = this._endLabel,
        l = this._polyline;
      if (s) {
        e < 1 && null == r.originalX && (r.originalX = s.x, r.originalY = s.y);
        var u = n.getLayout("points"),
          c = n.hostModel,
          f = c.get("connectNulls"),
          d = o.get("precision"),
          h = o.get("distance") || 0,
          p = a.getBaseAxis(),
          g = p.isHorizontal(),
          v = p.inverse,
          y = t.shape,
          b = v ? g ? y.x : y.y + y.height : g ? y.x + y.width : y.y,
          x = (g ? h : 0) * (v ? -1 : 1),
          _ = (g ? 0 : -h) * (v ? -1 : 1),
          w = g ? "x" : "y",
          O = fe(u, b, w),
          S = O.range,
          k = S[1] - S[0],
          j = void 0;
        if (k >= 1) {
          if (k > 1 && !f) {
            var M = ce(u, S[0]);
            s.attr({
              x: M[0] + x,
              y: M[1] + _
            }), i && (j = c.getRawValue(S[0]));
          } else {
            M = l.getPointOn(b, w);
            M && s.attr({
              x: M[0] + x,
              y: M[1] + _
            });
            var C = c.getRawValue(S[0]),
              T = c.getRawValue(S[1]);
            i && (j = L["i"](n, d, C, T, O.t));
          }
          r.lastFrameIndex = S[0];
        } else {
          var I = 1 === e || r.lastFrameIndex > 0 ? S[0] : 0;
          M = ce(u, I);
          i && (j = c.getRawValue(I)), s.attr({
            x: M[0] + x,
            y: M[1] + _
          });
        }
        i && Object(m["d"])(s).setLabelText(j);
      }
    }, t.prototype._doUpdateAnimation = function (e, t, n, r, i, o, a) {
      var s = this._polyline,
        l = this._polygon,
        u = e.hostModel,
        c = A(this._data, e, this._stackedOnPoints, t, this._coordSys, n, this._valueOrigin, o),
        d = c.current,
        h = c.stackedOnCurrent,
        p = c.next,
        g = c.stackedOnNext;
      if (i && (d = re(c.current, n, i, a), h = re(c.stackedOnCurrent, n, i, a), p = re(c.next, n, i, a), g = re(c.stackedOnNext, n, i, a)), ee(d, p) > 3e3 || l && ee(h, g) > 3e3) return s.stopAnimation(), s.setShape({
        points: p
      }), void (l && (l.stopAnimation(), l.setShape({
        points: p,
        stackedOnPoints: g
      })));
      s.shape.__points = c.current, s.shape.points = d;
      var m = {
        shape: {
          points: p
        }
      };
      c.current !== d && (m.shape.__points = c.next), s.stopAnimation(), f["h"](s, m, u), l && (l.setShape({
        points: d,
        stackedOnPoints: h
      }), l.stopAnimation(), f["h"](l, {
        shape: {
          stackedOnPoints: g
        }
      }, u), s.shape.points !== l.shape.points && (l.shape.points = s.shape.points));
      for (var v = [], y = c.status, b = 0; b < y.length; b++) {
        var x = y[b].cmd;
        if ("=" === x) {
          var _ = e.getItemGraphicEl(y[b].idx1);
          _ && v.push({
            el: _,
            ptIdx: b
          });
        }
      }
      s.animators && s.animators.length && s.animators[0].during(function () {
        l && l.dirtyShape();
        for (var e = s.shape.__points, t = 0; t < v.length; t++) {
          var n = v[t].el,
            r = 2 * v[t].ptIdx;
          n.x = e[r], n.y = e[r + 1], n.markRedraw();
        }
      });
    }, t.prototype.remove = function (e) {
      var t = this.group,
        n = this._data;
      this._lineGroup.removeAll(), this._symbolDraw.remove(!0), n && n.eachItemGraphicEl(function (e, r) {
        e.__temp && (t.remove(e), n.setItemGraphicEl(r, null));
      }), this._polyline = this._polygon = this._coordSys = this._points = this._stackedOnPoints = this._endLabel = this._data = null;
    }, t.type = "line", t;
  }(q["a"]),
  me = ge,
  ve = require("./7a4d3351.js");
function ye(e, t) {
  return {
    seriesType: e,
    plan: Object(ve["a"])(),
    reset: function (e) {
      var n = e.getData(),
        r = e.coordinateSystem,
        i = e.pipelineContext,
        o = t || i.large;
      if (r) {
        var a = Object(c["D"])(r.dimensions, function (e) {
            return n.mapDimension(e);
          }).slice(0, 2),
          s = a.length,
          l = n.getCalculationInfo("stackResultDimension");
        Object(j["c"])(n, a[0]) && (a[0] = l), Object(j["c"])(n, a[1]) && (a[1] = l);
        var u = n.getStore(),
          f = n.getDimensionIndex(a[0]),
          d = n.getDimensionIndex(a[1]);
        return s && {
          progress: function (e, t) {
            for (var n = e.end - e.start, i = o && Object(I["a"])(n * s), a = [], l = [], c = e.start, h = 0; c < e.end; c++) {
              var p = void 0;
              if (1 === s) {
                var g = u.get(f, c);
                p = r.dataToPoint(g, null, l);
              } else a[0] = u.get(f, c), a[1] = u.get(d, c), p = r.dataToPoint(a, null, l);
              o ? (i[h++] = p[0], i[h++] = p[1]) : t.setItemLayout(c, p.slice());
            }
            o && t.setLayout("points", i);
          }
        };
      }
    }
  };
}
var be = require("./2f643561.js");
function xe(e) {
  e.registerChartView(me), e.registerSeriesModel(u), e.registerLayout(ye("line", !0)), e.registerVisual({
    seriesType: "line",
    reset: function (e) {
      var t = e.getData(),
        n = e.getModel("lineStyle").getLineStyle();
      n && !n.stroke && (n.stroke = t.getVisual("style").fill), t.setVisual("legendLineStyle", n);
    }
  }), e.registerProcessor(e.PRIORITY.PROCESSOR.STATISTIC, Object(be["a"])("line"));
}
defineExport(legacyExports, "a", function () {
  return xe;
});
