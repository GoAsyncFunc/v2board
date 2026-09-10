let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
var r = require("./6d725347.js"),
  i = require("./73532f72.js"),
  o = require("./624c6677.js"),
  a = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }
    return Object(r["a"])(t, e), t.type = "grid", t.dependencies = ["xAxis", "yAxis"], t.layoutMode = "box", t.defaultOption = {
      show: !1,
      z: 0,
      left: "10%",
      top: 60,
      right: "10%",
      bottom: 70,
      containLabel: !1,
      backgroundColor: "rgba(0,0,0,0)",
      borderWidth: 1,
      borderColor: "#ccc"
    }, t;
  }(o["a"]),
  s = a,
  l = require("./78364b74.js"),
  u = require("./62597459.js"),
  c = function () {
    function e() {}
    return e.prototype.getNeedCrossZero = function () {
      var e = this.option;
      return !e.scale;
    }, e.prototype.getCoordSysModel = function () {}, e;
  }(),
  f = require("./344e4f34.js"),
  d = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }
    return Object(r["a"])(t, e), t.prototype.getCoordSysModel = function () {
      return this.getReferringComponents("grid", f["b"]).models[0];
    }, t.type = "cartesian2dAxis", t;
  }(o["a"]);
u["F"](d, c);
var h = {
    show: !0,
    z: 0,
    inverse: !1,
    name: "",
    nameLocation: "end",
    nameRotate: null,
    nameTruncate: {
      maxWidth: null,
      ellipsis: "...",
      placeholder: "."
    },
    nameTextStyle: {},
    nameGap: 15,
    silent: !1,
    triggerEvent: !1,
    tooltip: {
      show: !1
    },
    axisPointer: {},
    axisLine: {
      show: !0,
      onZero: !0,
      onZeroAxisIndex: null,
      lineStyle: {
        color: "#6E7079",
        width: 1,
        type: "solid"
      },
      symbol: ["none", "none"],
      symbolSize: [10, 15]
    },
    axisTick: {
      show: !0,
      inside: !1,
      length: 5,
      lineStyle: {
        width: 1
      }
    },
    axisLabel: {
      show: !0,
      inside: !1,
      rotate: 0,
      showMinLabel: null,
      showMaxLabel: null,
      margin: 8,
      fontSize: 12
    },
    splitLine: {
      show: !0,
      lineStyle: {
        color: ["#E0E6F1"],
        width: 1,
        type: "solid"
      }
    },
    splitArea: {
      show: !1,
      areaStyle: {
        color: ["rgba(250,250,250,0.2)", "rgba(210,219,238,0.2)"]
      }
    }
  },
  p = u["E"]({
    boundaryGap: !0,
    deduplication: null,
    splitLine: {
      show: !1
    },
    axisTick: {
      alignWithLabel: !1,
      interval: "auto"
    },
    axisLabel: {
      interval: "auto"
    }
  }, h),
  g = u["E"]({
    boundaryGap: [0, 0],
    axisLine: {
      show: "auto"
    },
    axisTick: {
      show: "auto"
    },
    splitNumber: 5,
    minorTick: {
      show: !1,
      splitNumber: 5,
      length: 3,
      lineStyle: {}
    },
    minorSplitLine: {
      show: !1,
      lineStyle: {
        color: "#F4F7FD",
        width: 1
      }
    }
  }, h),
  m = u["E"]({
    splitNumber: 6,
    axisLabel: {
      showMinLabel: !1,
      showMaxLabel: !1,
      rich: {
        primary: {
          fontWeight: "bold"
        }
      }
    },
    splitLine: {
      show: !1
    }
  }, g),
  v = u["i"]({
    logBase: 10
  }, g),
  y = {
    category: p,
    value: g,
    time: m,
    log: v
  },
  b = require("./2b54542f.js"),
  x = require("./6a6b5041.js"),
  _ = {
    value: 1,
    category: 1,
    time: 1,
    log: 1
  };
function w(e, t, n, i) {
  Object(u["j"])(_, function (o, a) {
    var s = Object(u["E"])(Object(u["E"])({}, y[a], !0), i, !0),
      l = function (e) {
        function n() {
          var n = null !== e && e.apply(this, arguments) || this;
          return n.type = t + "Axis." + a, n;
        }
        return Object(r["a"])(n, e), n.prototype.mergeDefaultAndTheme = function (e, t) {
          var n = Object(b["b"])(this),
            r = n ? Object(b["c"])(e) : {},
            i = t.getTheme();
          Object(u["E"])(e, i.get(a + "Axis")), Object(u["E"])(e, this.getDefaultOption()), e.type = O(e), n && Object(b["e"])(e, r, n);
        }, n.prototype.optionUpdated = function () {
          var e = this.option;
          "category" === e.type && (this.__ordinalMeta = x["a"].createByAxisModel(this));
        }, n.prototype.getCategories = function (e) {
          var t = this.option;
          if ("category" === t.type) return e ? t.data : this.__ordinalMeta.categories;
        }, n.prototype.getOrdinalMeta = function () {
          return this.__ordinalMeta;
        }, n.type = t + "Axis." + a, n.defaultOption = s, n;
      }(n);
    e.registerComponentModel(l);
  }), e.registerSubTypeDefaulter(t + "Axis", O);
}
function O(e) {
  return e.type || (e.data ? "category" : "value");
}
var S = require("./6158377a.js"),
  k = require("./6d464469.js"),
  j = function () {
    function e(e) {
      this.type = "cartesian", this._dimList = [], this._axes = {}, this.name = e || "";
    }
    return e.prototype.getAxis = function (e) {
      return this._axes[e];
    }, e.prototype.getAxes = function () {
      return u["D"](this._dimList, function (e) {
        return this._axes[e];
      }, this);
    }, e.prototype.getAxesByScale = function (e) {
      return e = e.toLowerCase(), u["m"](this.getAxes(), function (t) {
        return t.scale.type === e;
      });
    }, e.prototype.addAxis = function (e) {
      var t = e.dim;
      this._axes[t] = e, this._dimList.push(t);
    }, e;
  }(),
  M = j,
  C = require("./466f6678.js"),
  T = require("./5142737a.js"),
  I = ["x", "y"];
function D(e) {
  return "interval" === e.type || "time" === e.type;
}
var A = function (e) {
    function t() {
      var t = null !== e && e.apply(this, arguments) || this;
      return t.type = "cartesian2d", t.dimensions = I, t;
    }
    return Object(r["a"])(t, e), t.prototype.calcAffineTransform = function () {
      this._transform = this._invTransform = null;
      var e = this.getAxis("x").scale,
        t = this.getAxis("y").scale;
      if (D(e) && D(t)) {
        var n = e.getExtent(),
          r = t.getExtent(),
          i = this.dataToPoint([n[0], r[0]]),
          o = this.dataToPoint([n[1], r[1]]),
          a = n[1] - n[0],
          s = r[1] - r[0];
        if (a && s) {
          var l = (o[0] - i[0]) / a,
            u = (o[1] - i[1]) / s,
            c = i[0] - n[0] * l,
            f = i[1] - r[0] * u,
            d = this._transform = [l, 0, 0, u, c, f];
          this._invTransform = Object(C["d"])([], d);
        }
      }
    }, t.prototype.getBaseAxis = function () {
      return this.getAxesByScale("ordinal")[0] || this.getAxesByScale("time")[0] || this.getAxis("x");
    }, t.prototype.containPoint = function (e) {
      var t = this.getAxis("x"),
        n = this.getAxis("y");
      return t.contain(t.toLocalCoord(e[0])) && n.contain(n.toLocalCoord(e[1]));
    }, t.prototype.containData = function (e) {
      return this.getAxis("x").containData(e[0]) && this.getAxis("y").containData(e[1]);
    }, t.prototype.containZone = function (e, t) {
      var n = this.dataToPoint(e),
        r = this.dataToPoint(t),
        i = this.getArea(),
        o = new k["a"](n[0], n[1], r[0] - n[0], r[1] - n[1]);
      return i.intersect(o);
    }, t.prototype.dataToPoint = function (e, t, n) {
      n = n || [];
      var r = e[0],
        i = e[1];
      if (this._transform && null != r && isFinite(r) && null != i && isFinite(i)) return Object(T["b"])(n, e, this._transform);
      var o = this.getAxis("x"),
        a = this.getAxis("y");
      return n[0] = o.toGlobalCoord(o.dataToCoord(r, t)), n[1] = a.toGlobalCoord(a.dataToCoord(i, t)), n;
    }, t.prototype.clampData = function (e, t) {
      var n = this.getAxis("x").scale,
        r = this.getAxis("y").scale,
        i = n.getExtent(),
        o = r.getExtent(),
        a = n.parse(e[0]),
        s = r.parse(e[1]);
      return t = t || [], t[0] = Math.min(Math.max(Math.min(i[0], i[1]), a), Math.max(i[0], i[1])), t[1] = Math.min(Math.max(Math.min(o[0], o[1]), s), Math.max(o[0], o[1])), t;
    }, t.prototype.pointToData = function (e, t) {
      var n = [];
      if (this._invTransform) return Object(T["b"])(n, e, this._invTransform);
      var r = this.getAxis("x"),
        i = this.getAxis("y");
      return n[0] = r.coordToData(r.toLocalCoord(e[0]), t), n[1] = i.coordToData(i.toLocalCoord(e[1]), t), n;
    }, t.prototype.getOtherAxis = function (e) {
      return this.getAxis("x" === e.dim ? "y" : "x");
    }, t.prototype.getArea = function () {
      var e = this.getAxis("x").getGlobalExtent(),
        t = this.getAxis("y").getGlobalExtent(),
        n = Math.min(e[0], e[1]),
        r = Math.min(t[0], t[1]),
        i = Math.max(e[0], e[1]) - n,
        o = Math.max(t[0], t[1]) - r;
      return new k["a"](n, r, i, o);
    }, t;
  }(M),
  E = A,
  P = require("./4f454c42.js"),
  L = require("./36477258.js"),
  N = Object(f["m"])();
function R(e) {
  return "category" === e.type ? F(e) : V(e);
}
function z(e, t) {
  return "category" === e.type ? Y(e, t) : {
    ticks: u["D"](e.scale.getTicks(), function (e) {
      return e.value;
    })
  };
}
function F(e) {
  var t = e.getLabelModel(),
    n = B(e, t);
  return !t.get("show") || e.scale.isBlank() ? {
    labels: [],
    labelCategoryInterval: n.labelCategoryInterval
  } : n;
}
function B(e, t) {
  var n,
    r,
    i = G(e, "labels"),
    o = Object(S["e"])(t),
    a = W(i, o);
  return a || (u["u"](o) ? n = X(e, o) : (r = "auto" === o ? H(e) : o, n = Z(e, r)), U(i, o, {
    labels: n,
    labelCategoryInterval: r
  }));
}
function Y(e, t) {
  var n,
    r,
    i = G(e, "ticks"),
    o = Object(S["e"])(t),
    a = W(i, o);
  if (a) return a;
  if (t.get("show") && !e.scale.isBlank() || (n = []), u["u"](o)) n = X(e, o, !0);else if ("auto" === o) {
    var s = B(e, e.getLabelModel());
    r = s.labelCategoryInterval, n = u["D"](s.labels, function (e) {
      return e.tickValue;
    });
  } else r = o, n = Z(e, r, !0);
  return U(i, o, {
    ticks: n,
    tickCategoryInterval: r
  });
}
function V(e) {
  var t = e.scale.getTicks(),
    n = Object(S["h"])(e);
  return {
    labels: u["D"](t, function (t, r) {
      return {
        level: t.level,
        formattedLabel: n(t, r),
        rawLabel: e.scale.getLabel(t),
        tickValue: t.value
      };
    })
  };
}
function G(e, t) {
  return N(e)[t] || (N(e)[t] = []);
}
function W(e, t) {
  for (var n = 0; n < e.length; n++) if (e[n].key === t) return e[n].value;
}
function U(e, t, n) {
  return e.push({
    key: t,
    value: n
  }), n;
}
function H(e) {
  var t = N(e).autoInterval;
  return null != t ? t : N(e).autoInterval = e.calculateCategoryInterval();
}
function q(e) {
  var t = K(e),
    n = Object(S["h"])(e),
    r = (t.axisRotate - t.labelRotate) / 180 * Math.PI,
    i = e.scale,
    o = i.getExtent(),
    a = i.count();
  if (o[1] - o[0] < 1) return 0;
  var s = 1;
  a > 40 && (s = Math.max(1, Math.floor(a / 40)));
  for (var l = o[0], u = e.dataToCoord(l + 1) - e.dataToCoord(l), c = Math.abs(u * Math.cos(r)), f = Math.abs(u * Math.sin(r)), d = 0, h = 0; l <= o[1]; l += s) {
    var p = 0,
      g = 0,
      m = L["d"](n({
        value: l
      }), t.font, "center", "top");
    p = 1.3 * m.width, g = 1.3 * m.height, d = Math.max(d, p, 7), h = Math.max(h, g, 7);
  }
  var v = d / c,
    y = h / f;
  isNaN(v) && (v = 1 / 0), isNaN(y) && (y = 1 / 0);
  var b = Math.max(0, Math.floor(Math.min(v, y))),
    x = N(e.model),
    _ = e.getExtent(),
    w = x.lastAutoInterval,
    O = x.lastTickCount;
  return null != w && null != O && Math.abs(w - b) <= 1 && Math.abs(O - a) <= 1 && w > b && x.axisExtent0 === _[0] && x.axisExtent1 === _[1] ? b = w : (x.lastTickCount = a, x.lastAutoInterval = b, x.axisExtent0 = _[0], x.axisExtent1 = _[1]), b;
}
function K(e) {
  var t = e.getLabelModel();
  return {
    axisRotate: e.getRotate ? e.getRotate() : e.isHorizontal && !e.isHorizontal() ? 90 : 0,
    labelRotate: t.get("rotate") || 0,
    font: t.getFont()
  };
}
function Z(e, t, n) {
  var r = Object(S["h"])(e),
    i = e.scale,
    o = i.getExtent(),
    a = e.getLabelModel(),
    s = [],
    l = Math.max((t || 0) + 1, 1),
    u = o[0],
    c = i.count();
  0 !== u && l > 1 && c / l > 2 && (u = Math.round(Math.ceil(u / l) * l));
  var f = Object(S["j"])(e),
    d = a.get("showMinLabel") || f,
    h = a.get("showMaxLabel") || f;
  d && u !== o[0] && g(o[0]);
  for (var p = u; p <= o[1]; p += l) g(p);
  function g(e) {
    var t = {
      value: e
    };
    s.push(n ? e : {
      formattedLabel: r(t),
      rawLabel: i.getLabel(t),
      tickValue: e
    });
  }
  return h && p - l !== o[1] && g(o[1]), s;
}
function X(e, t, n) {
  var r = e.scale,
    i = Object(S["h"])(e),
    o = [];
  return u["j"](r.getTicks(), function (e) {
    var a = r.getLabel(e),
      s = e.value;
    t(e.value, a) && o.push(n ? s : {
      formattedLabel: i(e),
      rawLabel: a,
      tickValue: s
    });
  }), o;
}
var Q = [0, 1],
  $ = function () {
    function e(e, t, n) {
      this.onBand = !1, this.inverse = !1, this.dim = e, this.scale = t, this._extent = n || [0, 0];
    }
    return e.prototype.contain = function (e) {
      var t = this._extent,
        n = Math.min(t[0], t[1]),
        r = Math.max(t[0], t[1]);
      return e >= n && e <= r;
    }, e.prototype.containData = function (e) {
      return this.scale.contain(e);
    }, e.prototype.getExtent = function () {
      return this._extent.slice();
    }, e.prototype.getPixelPrecision = function (e) {
      return Object(P["d"])(e || this.scale.getExtent(), this._extent);
    }, e.prototype.setExtent = function (e, t) {
      var n = this._extent;
      n[0] = e, n[1] = t;
    }, e.prototype.dataToCoord = function (e, t) {
      var n = this._extent,
        r = this.scale;
      return e = r.normalize(e), this.onBand && "ordinal" === r.type && (n = n.slice(), J(n, r.count())), Object(P["i"])(e, Q, n, t);
    }, e.prototype.coordToData = function (e, t) {
      var n = this._extent,
        r = this.scale;
      this.onBand && "ordinal" === r.type && (n = n.slice(), J(n, r.count()));
      var i = Object(P["i"])(e, n, Q, t);
      return this.scale.scale(i);
    }, e.prototype.pointToData = function (e, t) {}, e.prototype.getTicksCoords = function (e) {
      e = e || {};
      var t = e.tickModel || this.getTickModel(),
        n = z(this, t),
        r = n.ticks,
        i = Object(u["D"])(r, function (e) {
          return {
            coord: this.dataToCoord("ordinal" === this.scale.type ? this.scale.getRawOrdinalNumber(e) : e),
            tickValue: e
          };
        }, this),
        o = t.get("alignWithLabel");
      return ee(this, i, o, e.clamp), i;
    }, e.prototype.getMinorTicksCoords = function () {
      if ("ordinal" === this.scale.type) return [];
      var e = this.model.getModel("minorTick"),
        t = e.get("splitNumber");
      t > 0 && t < 100 || (t = 5);
      var n = this.scale.getMinorTicks(t),
        r = Object(u["D"])(n, function (e) {
          return Object(u["D"])(e, function (e) {
            return {
              coord: this.dataToCoord(e),
              tickValue: e
            };
          }, this);
        }, this);
      return r;
    }, e.prototype.getViewLabels = function () {
      return R(this).labels;
    }, e.prototype.getLabelModel = function () {
      return this.model.getModel("axisLabel");
    }, e.prototype.getTickModel = function () {
      return this.model.getModel("axisTick");
    }, e.prototype.getBandWidth = function () {
      var e = this._extent,
        t = this.scale.getExtent(),
        n = t[1] - t[0] + (this.onBand ? 1 : 0);
      0 === n && (n = 1);
      var r = Math.abs(e[1] - e[0]);
      return Math.abs(r) / n;
    }, e.prototype.calculateCategoryInterval = function () {
      return q(this);
    }, e;
  }();
function J(e, t) {
  var n = e[1] - e[0],
    r = t,
    i = n / r / 2;
  e[0] += i, e[1] -= i;
}
function ee(e, t, n, r) {
  var i = t.length;
  if (e.onBand && !n && i) {
    var o,
      a,
      s = e.getExtent();
    if (1 === i) t[0].coord = s[0], o = t[1] = {
      coord: s[0]
    };else {
      var l = t[i - 1].tickValue - t[0].tickValue,
        c = (t[i - 1].coord - t[0].coord) / l;
      Object(u["j"])(t, function (e) {
        e.coord -= c / 2;
      });
      var f = e.scale.getExtent();
      a = 1 + f[1] - t[i - 1].tickValue, o = {
        coord: t[i - 1].coord + c * a
      }, t.push(o);
    }
    var d = s[0] > s[1];
    h(t[0].coord, s[0]) && (r ? t[0].coord = s[0] : t.shift()), r && h(s[0], t[0].coord) && t.unshift({
      coord: s[0]
    }), h(s[1], o.coord) && (r ? o.coord = s[1] : t.pop()), r && h(o.coord, s[1]) && t.push({
      coord: s[1]
    });
  }
  function h(e, t) {
    return e = Object(P["q"])(e), t = Object(P["q"])(t), d ? e > t : e < t;
  }
}
var te = $,
  ne = function (e) {
    function t(t, n, r, i, o) {
      var a = e.call(this, t, n, r) || this;
      return a.index = 0, a.type = i || "value", a.position = o || "bottom", a;
    }
    return Object(r["a"])(t, e), t.prototype.isHorizontal = function () {
      var e = this.position;
      return "top" === e || "bottom" === e;
    }, t.prototype.getGlobalExtent = function (e) {
      var t = this.getExtent();
      return t[0] = this.toGlobalCoord(t[0]), t[1] = this.toGlobalCoord(t[1]), e && t[0] > t[1] && t.reverse(), t;
    }, t.prototype.pointToData = function (e, t) {
      return this.coordToData(this.toLocalCoord(e["x" === this.dim ? 0 : 1]), t);
    }, t.prototype.setCategorySortInfo = function (e) {
      if ("category" !== this.type) return !1;
      this.model.option.categorySortInfo = e, this.scale.setSortInfo(e);
    }, t;
  }(te),
  re = ne,
  ie = require("./41565a47.js"),
  oe = require("./6c45374a.js"),
  ae = require("./69654d6a.js"),
  se = Math.log;
function le(e, t, n) {
  var r = ae["a"].prototype,
    i = r.getTicks.call(n),
    o = r.getTicks.call(n, !0),
    a = i.length - 1,
    s = r.getInterval.call(n),
    l = Object(S["f"])(e, t),
    u = l.extent,
    c = l.fixMin,
    f = l.fixMax;
  if ("log" === e.type) {
    var d = se(e.base);
    u = [se(u[0]) / d, se(u[1]) / d];
  }
  e.setExtent(u[0], u[1]), e.calcNiceExtent({
    splitNumber: a,
    fixMin: c,
    fixMax: f
  });
  var h = r.getExtent.call(e);
  c && (u[0] = h[0]), f && (u[1] = h[1]);
  var p = r.getInterval.call(e),
    g = u[0],
    m = u[1];
  if (c && f) p = (m - g) / a;else if (c) {
    m = u[0] + p * a;
    while (m < u[1] && isFinite(m) && isFinite(u[1])) p = Object(oe["c"])(p), m = u[0] + p * a;
  } else if (f) {
    g = u[1] - p * a;
    while (g > u[0] && isFinite(g) && isFinite(u[0])) p = Object(oe["c"])(p), g = u[1] - p * a;
  } else {
    var v = e.getTicks().length - 1;
    v > a && (p = Object(oe["c"])(p));
    var y = p * a;
    m = Math.ceil(u[1] / p) * p, g = Object(P["q"])(m - y), g < 0 && u[0] >= 0 ? (g = 0, m = Object(P["q"])(y)) : m > 0 && u[1] <= 0 && (m = 0, g = -Object(P["q"])(y));
  }
  var b = (i[0].value - o[0].value) / s,
    x = (i[a].value - o[a].value) / s;
  r.setExtent.call(e, g + p * b, m + p * x), r.setInterval.call(e, p), (b || x) && r.setNiceExtent.call(e, g + p, m - p);
}
var ue = function () {
  function e(e, t, n) {
    this.type = "grid", this._coordsMap = {}, this._coordsList = [], this._axesMap = {}, this._axesList = [], this.axisPointerEnabled = !0, this.dimensions = I, this._initCartesian(e, t, n), this.model = e;
  }
  return e.prototype.getRect = function () {
    return this._rect;
  }, e.prototype.update = function (e, t) {
    var n = this._axesMap;
    function r(e) {
      var t,
        n = Object(u["B"])(e),
        r = n.length;
      if (r) {
        for (var i = [], o = r - 1; o >= 0; o--) {
          var a = +n[o],
            s = e[a],
            l = s.model,
            c = s.scale;
          Object(oe["e"])(c) && l.get("alignTicks") && null == l.get("interval") ? i.push(s) : (Object(S["i"])(c, l), Object(oe["e"])(c) && (t = s));
        }
        i.length && (t || (t = i.pop(), Object(S["i"])(t.scale, t.model)), Object(u["j"])(i, function (e) {
          le(e.scale, e.model, t.scale);
        }));
      }
    }
    this._updateScale(e, this.model), r(n.x), r(n.y);
    var i = {};
    Object(u["j"])(n.x, function (e) {
      fe(n, "y", e, i);
    }), Object(u["j"])(n.y, function (e) {
      fe(n, "x", e, i);
    }), this.resize(this.model, t);
  }, e.prototype.resize = function (e, t, n) {
    var r = e.getBoxLayoutParams(),
      i = !n && e.get("containLabel"),
      o = Object(b["d"])(r, {
        width: t.getWidth(),
        height: t.getHeight()
      });
    this._rect = o;
    var a = this._axesList;
    function s() {
      Object(u["j"])(a, function (e) {
        var t = e.isHorizontal(),
          n = t ? [0, o.width] : [0, o.height],
          r = e.inverse ? 1 : 0;
        e.setExtent(n[r], n[1 - r]), he(e, t ? o.x : o.y);
      });
    }
    s(), i && (Object(u["j"])(a, function (e) {
      if (!e.model.get(["axisLabel", "inside"])) {
        var t = Object(S["b"])(e);
        if (t) {
          var n = e.isHorizontal() ? "height" : "width",
            r = e.model.get(["axisLabel", "margin"]);
          o[n] -= t[n] + r, "top" === e.position ? o.y += t.height + r : "left" === e.position && (o.x += t.width + r);
        }
      }
    }), s()), Object(u["j"])(this._coordsList, function (e) {
      e.calcAffineTransform();
    });
  }, e.prototype.getAxis = function (e, t) {
    var n = this._axesMap[e];
    if (null != n) return n[t || 0];
  }, e.prototype.getAxes = function () {
    return this._axesList.slice();
  }, e.prototype.getCartesian = function (e, t) {
    if (null != e && null != t) {
      var n = "x" + e + "y" + t;
      return this._coordsMap[n];
    }
    Object(u["x"])(e) && (t = e.yAxisIndex, e = e.xAxisIndex);
    for (var r = 0, i = this._coordsList; r < i.length; r++) if (i[r].getAxis("x").index === e || i[r].getAxis("y").index === t) return i[r];
  }, e.prototype.getCartesians = function () {
    return this._coordsList.slice();
  }, e.prototype.convertToPixel = function (e, t, n) {
    var r = this._findConvertTarget(t);
    return r.cartesian ? r.cartesian.dataToPoint(n) : r.axis ? r.axis.toGlobalCoord(r.axis.dataToCoord(n)) : null;
  }, e.prototype.convertFromPixel = function (e, t, n) {
    var r = this._findConvertTarget(t);
    return r.cartesian ? r.cartesian.pointToData(n) : r.axis ? r.axis.coordToData(r.axis.toLocalCoord(n)) : null;
  }, e.prototype._findConvertTarget = function (e) {
    var t,
      n,
      r = e.seriesModel,
      i = e.xAxisModel || r && r.getReferringComponents("xAxis", f["b"]).models[0],
      o = e.yAxisModel || r && r.getReferringComponents("yAxis", f["b"]).models[0],
      a = e.gridModel,
      s = this._coordsList;
    if (r) t = r.coordinateSystem, Object(u["p"])(s, t) < 0 && (t = null);else if (i && o) t = this.getCartesian(i.componentIndex, o.componentIndex);else if (i) n = this.getAxis("x", i.componentIndex);else if (o) n = this.getAxis("y", o.componentIndex);else if (a) {
      var l = a.coordinateSystem;
      l === this && (t = this._coordsList[0]);
    }
    return {
      cartesian: t,
      axis: n
    };
  }, e.prototype.containPoint = function (e) {
    var t = this._coordsList[0];
    if (t) return t.containPoint(e);
  }, e.prototype._initCartesian = function (e, t, n) {
    var r = this,
      i = this,
      o = {
        left: !1,
        right: !1,
        top: !1,
        bottom: !1
      },
      a = {
        x: {},
        y: {}
      },
      s = {
        x: 0,
        y: 0
      };
    if (t.eachComponent("xAxis", l("x"), this), t.eachComponent("yAxis", l("y"), this), !s.x || !s.y) return this._axesMap = {}, void (this._axesList = []);
    function l(t) {
      return function (n, r) {
        if (ce(n, e)) {
          var l = n.get("position");
          "x" === t ? "top" !== l && "bottom" !== l && (l = o.bottom ? "top" : "bottom") : "left" !== l && "right" !== l && (l = o.left ? "right" : "left"), o[l] = !0;
          var u = new re(t, Object(S["a"])(n), [0, 0], n.get("type"), l),
            c = "category" === u.type;
          u.onBand = c && n.get("boundaryGap"), u.inverse = n.get("inverse"), n.axis = u, u.model = n, u.grid = i, u.index = r, i._axesList.push(u), a[t][r] = u, s[t]++;
        }
      };
    }
    this._axesMap = a, Object(u["j"])(a.x, function (t, n) {
      Object(u["j"])(a.y, function (i, o) {
        var a = "x" + n + "y" + o,
          s = new E(a);
        s.master = r, s.model = e, r._coordsMap[a] = s, r._coordsList.push(s), s.addAxis(t), s.addAxis(i);
      });
    });
  }, e.prototype._updateScale = function (e, t) {
    function n(e, t) {
      Object(u["j"])(Object(S["d"])(e, t.dim), function (n) {
        t.scale.unionExtentFromData(e, n);
      });
    }
    Object(u["j"])(this._axesList, function (e) {
      if (e.scale.setExtent(1 / 0, -1 / 0), "category" === e.type) {
        var t = e.model.get("categorySortInfo");
        e.scale.setSortInfo(t);
      }
    }), e.eachSeries(function (e) {
      if (Object(ie["b"])(e)) {
        var r = Object(ie["a"])(e),
          i = r.xAxisModel,
          o = r.yAxisModel;
        if (!ce(i, t) || !ce(o, t)) return;
        var a = this.getCartesian(i.componentIndex, o.componentIndex),
          s = e.getData(),
          l = a.getAxis("x"),
          u = a.getAxis("y");
        n(s, l), n(s, u);
      }
    }, this);
  }, e.prototype.getTooltipAxes = function (e) {
    var t = [],
      n = [];
    return Object(u["j"])(this.getCartesians(), function (r) {
      var i = null != e && "auto" !== e ? r.getAxis(e) : r.getBaseAxis(),
        o = r.getOtherAxis(i);
      Object(u["p"])(t, i) < 0 && t.push(i), Object(u["p"])(n, o) < 0 && n.push(o);
    }), {
      baseAxes: t,
      otherAxes: n
    };
  }, e.create = function (t, n) {
    var r = [];
    return t.eachComponent("grid", function (i, o) {
      var a = new e(i, t, n);
      a.name = "grid_" + o, a.resize(i, n, !0), i.coordinateSystem = a, r.push(a);
    }), t.eachSeries(function (e) {
      if (Object(ie["b"])(e)) {
        var t = Object(ie["a"])(e),
          n = t.xAxisModel,
          r = t.yAxisModel,
          i = n.getCoordSysModel();
        0;
        var o = i.coordinateSystem;
        e.coordinateSystem = o.getCartesian(n.componentIndex, r.componentIndex);
      }
    }), r;
  }, e.dimensions = I, e;
}();
function ce(e, t) {
  return e.getCoordSysModel() === t;
}
function fe(e, t, n, r) {
  n.getAxesOnZeroOf = function () {
    return i ? [i] : [];
  };
  var i,
    o = e[t],
    a = n.model,
    s = a.get(["axisLine", "onZero"]),
    l = a.get(["axisLine", "onZeroAxisIndex"]);
  if (s) {
    if (null != l) de(o[l]) && (i = o[l]);else for (var u in o) if (o.hasOwnProperty(u) && de(o[u]) && !r[c(o[u])]) {
      i = o[u];
      break;
    }
    i && (r[c(i)] = !0);
  }
  function c(e) {
    return e.dim + "_" + e.index;
  }
}
function de(e) {
  return e && "category" !== e.type && "time" !== e.type && Object(S["g"])(e);
}
function he(e, t) {
  var n = e.getExtent(),
    r = n[0] + n[1];
  e.toGlobalCoord = "x" === e.dim ? function (e) {
    return e + t;
  } : function (e) {
    return r - e + t;
  }, e.toLocalCoord = "x" === e.dim ? function (e) {
    return e - t;
  } : function (e) {
    return r - e + t;
  };
}
var pe = ue,
  ge = require("./4c63584c.js"),
  me = require("./49776253.js"),
  ve = require("./79784652.js"),
  ye = require("./2b72496d.js"),
  be = require("./5a6e6b62.js"),
  xe = Object(f["m"])();
function _e(e, t, n, r) {
  var i = n.axis;
  if (!i.scale.isBlank()) {
    var o = n.getModel("splitArea"),
      a = o.getModel("areaStyle"),
      s = a.get("color"),
      c = r.coordinateSystem.getRect(),
      f = i.getTicksCoords({
        tickModel: o,
        clamp: !0
      });
    if (f.length) {
      var d = s.length,
        h = xe(e).splitAreaColors,
        p = u["f"](),
        g = 0;
      if (h) for (var m = 0; m < f.length; m++) {
        var v = h.get(f[m].tickValue);
        if (null != v) {
          g = (v + (d - 1) * m) % d;
          break;
        }
      }
      var y = i.toGlobalCoord(f[0].coord),
        b = a.getAreaStyle();
      s = u["r"](s) ? s : [s];
      for (m = 1; m < f.length; m++) {
        var x = i.toGlobalCoord(f[m].coord),
          _ = void 0,
          w = void 0,
          O = void 0,
          S = void 0;
        i.isHorizontal() ? (_ = y, w = c.y, O = x - _, S = c.height, y = _ + O) : (_ = c.x, w = y, O = c.width, S = x - w, y = w + S);
        var k = f[m - 1].tickValue;
        null != k && p.set(k, g), t.add(new l["a"]({
          anid: null != k ? "area_" + k : null,
          shape: {
            x: _,
            y: w,
            width: O,
            height: S
          },
          style: u["i"]({
            fill: s[g]
          }, b),
          autoBatch: !0,
          silent: !0
        })), g = (g + 1) % d;
      }
      xe(e).splitAreaColors = p;
    }
  }
}
function we(e) {
  xe(e).splitAreaColors = null;
}
var Oe = ["axisLine", "axisTickLabel", "axisName"],
  Se = ["splitArea", "splitLine", "minorSplitLine"],
  ke = function (e) {
    function t() {
      var n = null !== e && e.apply(this, arguments) || this;
      return n.type = t.type, n.axisPointerClass = "CartesianAxisPointer", n;
    }
    return Object(r["a"])(t, e), t.prototype.render = function (t, n, r, i) {
      this.group.removeAll();
      var o = this._axisGroup;
      if (this._axisGroup = new ge["a"](), this.group.add(this._axisGroup), t.get("show")) {
        var a = t.getCoordSysModel(),
          s = ie["c"](a, t),
          l = new ye["a"](t, u["l"]({
            handleAutoShown: function (e) {
              for (var n = a.coordinateSystem.getCartesians(), r = 0; r < n.length; r++) if (Object(oe["e"])(n[r].getOtherAxis(t.axis).scale)) return !0;
              return !1;
            }
          }, s));
        u["j"](Oe, l.add, l), this._axisGroup.add(l.getGroup()), u["j"](Se, function (e) {
          t.get([e, "show"]) && je[e](this, this._axisGroup, t, a);
        }, this);
        var c = i && "changeAxisOrder" === i.type && i.isInitSort;
        c || me["groupTransition"](o, this._axisGroup, t), e.prototype.render.call(this, t, n, r, i);
      }
    }, t.prototype.remove = function () {
      we(this);
    }, t.type = "cartesianAxis", t;
  }(be["a"]),
  je = {
    splitLine: function (e, t, n, r) {
      var i = n.axis;
      if (!i.scale.isBlank()) {
        var o = n.getModel("splitLine"),
          a = o.getModel("lineStyle"),
          s = a.get("color");
        s = u["r"](s) ? s : [s];
        for (var l = r.coordinateSystem.getRect(), c = i.isHorizontal(), f = 0, d = i.getTicksCoords({
            tickModel: o
          }), h = [], p = [], g = a.getLineStyle(), m = 0; m < d.length; m++) {
          var v = i.toGlobalCoord(d[m].coord);
          c ? (h[0] = v, h[1] = l.y, p[0] = v, p[1] = l.y + l.height) : (h[0] = l.x, h[1] = v, p[0] = l.x + l.width, p[1] = v);
          var y = f++ % s.length,
            b = d[m].tickValue,
            x = new ve["a"]({
              anid: null != b ? "line_" + d[m].tickValue : null,
              autoBatch: !0,
              shape: {
                x1: h[0],
                y1: h[1],
                x2: p[0],
                y2: p[1]
              },
              style: u["i"]({
                stroke: s[y]
              }, g),
              silent: !0
            });
          me["subPixelOptimizeLine"](x.shape, g.lineWidth), t.add(x);
        }
      }
    },
    minorSplitLine: function (e, t, n, r) {
      var i = n.axis,
        o = n.getModel("minorSplitLine"),
        a = o.getModel("lineStyle"),
        s = r.coordinateSystem.getRect(),
        l = i.isHorizontal(),
        u = i.getMinorTicksCoords();
      if (u.length) for (var c = [], f = [], d = a.getLineStyle(), h = 0; h < u.length; h++) for (var p = 0; p < u[h].length; p++) {
        var g = i.toGlobalCoord(u[h][p].coord);
        l ? (c[0] = g, c[1] = s.y, f[0] = g, f[1] = s.y + s.height) : (c[0] = s.x, c[1] = g, f[0] = s.x + s.width, f[1] = g);
        var m = new ve["a"]({
          anid: "minor_line_" + u[h][p].tickValue,
          autoBatch: !0,
          shape: {
            x1: c[0],
            y1: c[1],
            x2: f[0],
            y2: f[1]
          },
          style: d,
          silent: !0
        });
        me["subPixelOptimizeLine"](m.shape, d.lineWidth), t.add(m);
      }
    },
    splitArea: function (e, t, n, r) {
      _e(e, t, n, r);
    }
  },
  Me = function (e) {
    function t() {
      var n = null !== e && e.apply(this, arguments) || this;
      return n.type = t.type, n;
    }
    return Object(r["a"])(t, e), t.type = "xAxis", t;
  }(ke),
  Ce = function (e) {
    function t() {
      var t = null !== e && e.apply(this, arguments) || this;
      return t.type = Me.type, t;
    }
    return Object(r["a"])(t, e), t.type = "yAxis", t;
  }(ke),
  Te = function (e) {
    function t() {
      var t = null !== e && e.apply(this, arguments) || this;
      return t.type = "grid", t;
    }
    return Object(r["a"])(t, e), t.prototype.render = function (e, t) {
      this.group.removeAll(), e.get("show") && this.group.add(new l["a"]({
        shape: e.coordinateSystem.getRect(),
        style: Object(u["i"])({
          fill: e.get("backgroundColor")
        }, e.getItemStyle()),
        silent: !0,
        z2: -1
      }));
    }, t.type = "grid", t;
  }(i["a"]),
  Ie = {
    offset: 0
  };
function De(e) {
  e.registerComponentView(Te), e.registerComponentModel(s), e.registerCoordinateSystem("cartesian2d", pe), w(e, "x", d, Ie), w(e, "y", d, Ie), e.registerComponentView(Me), e.registerComponentView(Ce), e.registerPreprocessor(function (e) {
    e.xAxis && e.yAxis && !e.grid && (e.grid = {});
  });
}
var Ae = require("./7231774e.js"),
  Ee = require("./4972526e.js");
function Pe(e) {
  Object(Ee["a"])(De), Object(Ee["a"])(Ae["a"]);
}
defineExport(legacyExports, "a", function () {
  return Pe;
});
