let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
var r = require("./4972526e.js"),
  i = require("./6d725347.js"),
  o = require("./62597459.js"),
  a = require("./624c6677.js"),
  s = ["x", "y", "radius", "angle", "single"],
  l = ["cartesian2d", "polar", "singleAxis"];
function u(e) {
  var t = e.get("coordinateSystem");
  return Object(o["p"])(l, t) >= 0;
}
function c(e) {
  return e + "Axis";
}
function f(e, t) {
  var n,
    r = Object(o["f"])(),
    i = [],
    a = Object(o["f"])();
  e.eachComponent({
    mainType: "dataZoom",
    query: t
  }, function (e) {
    a.get(e.uid) || l(e);
  });
  do {
    n = !1, e.eachComponent("dataZoom", s);
  } while (n);
  function s(e) {
    !a.get(e.uid) && u(e) && (l(e), n = !0);
  }
  function l(e) {
    a.set(e.uid, !0), i.push(e), c(e);
  }
  function u(e) {
    var t = !1;
    return e.eachTargetAxis(function (e, n) {
      var i = r.get(e);
      i && i[n] && (t = !0);
    }), t;
  }
  function c(e) {
    e.eachTargetAxis(function (e, t) {
      (r.get(e) || r.set(e, []))[t] = !0;
    });
  }
  return i;
}
var d = require("./344e4f34.js"),
  h = function () {
    function e() {
      this.indexList = [], this.indexMap = [];
    }
    return e.prototype.add = function (e) {
      this.indexMap[e] || (this.indexList.push(e), this.indexMap[e] = !0);
    }, e;
  }(),
  p = function (e) {
    function t() {
      var n = null !== e && e.apply(this, arguments) || this;
      return n.type = t.type, n._autoThrottle = !0, n._noTarget = !0, n._rangePropMode = ["percent", "percent"], n;
    }
    return Object(i["a"])(t, e), t.prototype.init = function (e, t, n) {
      var r = g(e);
      this.settledOption = r, this.mergeDefaultAndTheme(e, n), this._doInit(r);
    }, t.prototype.mergeOption = function (e) {
      var t = g(e);
      Object(o["E"])(this.option, e, !0), Object(o["E"])(this.settledOption, t, !0), this._doInit(t);
    }, t.prototype._doInit = function (e) {
      var t = this.option;
      this._setDefaultThrottle(e), this._updateRangeUse(e);
      var n = this.settledOption;
      Object(o["j"])([["start", "startValue"], ["end", "endValue"]], function (e, r) {
        "value" === this._rangePropMode[r] && (t[e[0]] = n[e[0]] = null);
      }, this), this._resetTarget();
    }, t.prototype._resetTarget = function () {
      var e = this.get("orient", !0),
        t = this._targetAxisInfoMap = Object(o["f"])(),
        n = this._fillSpecifiedTargetAxis(t);
      n ? this._orient = e || this._makeAutoOrientByTargetAxis() : (this._orient = e || "horizontal", this._fillAutoTargetAxisByOrient(t, this._orient)), this._noTarget = !0, t.each(function (e) {
        e.indexList.length && (this._noTarget = !1);
      }, this);
    }, t.prototype._fillSpecifiedTargetAxis = function (e) {
      var t = !1;
      return Object(o["j"])(s, function (n) {
        var r = this.getReferringComponents(c(n), d["a"]);
        if (r.specified) {
          t = !0;
          var i = new h();
          Object(o["j"])(r.models, function (e) {
            i.add(e.componentIndex);
          }), e.set(n, i);
        }
      }, this), t;
    }, t.prototype._fillAutoTargetAxisByOrient = function (e, t) {
      var n = this.ecModel,
        r = !0;
      if (r) {
        var i = "vertical" === t ? "y" : "x",
          a = n.findComponents({
            mainType: i + "Axis"
          });
        l(a, i);
      }
      if (r) {
        a = n.findComponents({
          mainType: "singleAxis",
          filter: function (e) {
            return e.get("orient", !0) === t;
          }
        });
        l(a, "single");
      }
      function l(t, n) {
        var i = t[0];
        if (i) {
          var a = new h();
          if (a.add(i.componentIndex), e.set(n, a), r = !1, "x" === n || "y" === n) {
            var s = i.getReferringComponents("grid", d["b"]).models[0];
            s && Object(o["j"])(t, function (e) {
              i.componentIndex !== e.componentIndex && s === e.getReferringComponents("grid", d["b"]).models[0] && a.add(e.componentIndex);
            });
          }
        }
      }
      r && Object(o["j"])(s, function (t) {
        if (r) {
          var i = n.findComponents({
            mainType: c(t),
            filter: function (e) {
              return "category" === e.get("type", !0);
            }
          });
          if (i[0]) {
            var o = new h();
            o.add(i[0].componentIndex), e.set(t, o), r = !1;
          }
        }
      }, this);
    }, t.prototype._makeAutoOrientByTargetAxis = function () {
      var e;
      return this.eachTargetAxis(function (t) {
        !e && (e = t);
      }, this), "y" === e ? "vertical" : "horizontal";
    }, t.prototype._setDefaultThrottle = function (e) {
      if (e.hasOwnProperty("throttle") && (this._autoThrottle = !1), this._autoThrottle) {
        var t = this.ecModel.option;
        this.option.throttle = t.animation && t.animationDurationUpdate > 0 ? 100 : 20;
      }
    }, t.prototype._updateRangeUse = function (e) {
      var t = this._rangePropMode,
        n = this.get("rangeMode");
      Object(o["j"])([["start", "startValue"], ["end", "endValue"]], function (r, i) {
        var o = null != e[r[0]],
          a = null != e[r[1]];
        o && !a ? t[i] = "percent" : !o && a ? t[i] = "value" : n ? t[i] = n[i] : o && (t[i] = "percent");
      });
    }, t.prototype.noTarget = function () {
      return this._noTarget;
    }, t.prototype.getFirstTargetAxisModel = function () {
      var e;
      return this.eachTargetAxis(function (t, n) {
        null == e && (e = this.ecModel.getComponent(c(t), n));
      }, this), e;
    }, t.prototype.eachTargetAxis = function (e, t) {
      this._targetAxisInfoMap.each(function (n, r) {
        Object(o["j"])(n.indexList, function (n) {
          e.call(t, r, n);
        });
      });
    }, t.prototype.getAxisProxy = function (e, t) {
      var n = this.getAxisModel(e, t);
      if (n) return n.__dzAxisProxy;
    }, t.prototype.getAxisModel = function (e, t) {
      var n = this._targetAxisInfoMap.get(e);
      if (n && n.indexMap[t]) return this.ecModel.getComponent(c(e), t);
    }, t.prototype.setRawRange = function (e) {
      var t = this.option,
        n = this.settledOption;
      Object(o["j"])([["start", "startValue"], ["end", "endValue"]], function (r) {
        null == e[r[0]] && null == e[r[1]] || (t[r[0]] = n[r[0]] = e[r[0]], t[r[1]] = n[r[1]] = e[r[1]]);
      }, this), this._updateRangeUse(e);
    }, t.prototype.setCalculatedRange = function (e) {
      var t = this.option;
      Object(o["j"])(["start", "startValue", "end", "endValue"], function (n) {
        t[n] = e[n];
      });
    }, t.prototype.getPercentRange = function () {
      var e = this.findRepresentativeAxisProxy();
      if (e) return e.getDataPercentWindow();
    }, t.prototype.getValueRange = function (e, t) {
      if (null != e || null != t) return this.getAxisProxy(e, t).getDataValueWindow();
      var n = this.findRepresentativeAxisProxy();
      return n ? n.getDataValueWindow() : void 0;
    }, t.prototype.findRepresentativeAxisProxy = function (e) {
      if (e) return e.__dzAxisProxy;
      for (var t, n = this._targetAxisInfoMap.keys(), r = 0; r < n.length; r++) for (var i = n[r], o = this._targetAxisInfoMap.get(i), a = 0; a < o.indexList.length; a++) {
        var s = this.getAxisProxy(i, o.indexList[a]);
        if (s.hostedBy(this)) return s;
        t || (t = s);
      }
      return t;
    }, t.prototype.getRangePropMode = function () {
      return this._rangePropMode.slice();
    }, t.prototype.getOrient = function () {
      return this._orient;
    }, t.type = "dataZoom", t.dependencies = ["xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "series", "toolbox"], t.defaultOption = {
      z: 4,
      filterMode: "filter",
      start: 0,
      end: 100
    }, t;
  }(a["a"]);
function g(e) {
  var t = {};
  return Object(o["j"])(["start", "end", "startValue", "endValue", "throttle"], function (n) {
    e.hasOwnProperty(n) && (t[n] = e[n]);
  }), t;
}
var m = p,
  v = function (e) {
    function t() {
      var n = null !== e && e.apply(this, arguments) || this;
      return n.type = t.type, n;
    }
    return Object(i["a"])(t, e), t.type = "dataZoom.select", t;
  }(m),
  y = v,
  b = require("./73532f72.js"),
  x = function (e) {
    function t() {
      var n = null !== e && e.apply(this, arguments) || this;
      return n.type = t.type, n;
    }
    return Object(i["a"])(t, e), t.prototype.render = function (e, t, n, r) {
      this.dataZoomModel = e, this.ecModel = t, this.api = n;
    }, t.type = "dataZoom", t;
  }(b["a"]),
  _ = x,
  w = function (e) {
    function t() {
      var n = null !== e && e.apply(this, arguments) || this;
      return n.type = t.type, n;
    }
    return Object(i["a"])(t, e), t.type = "dataZoom.select", t;
  }(_),
  O = w,
  S = require("./4f454c42.js");
function k(e, t, n, r, i, o) {
  e = e || 0;
  var a = n[1] - n[0];
  if (null != i && (i = M(i, [0, a])), null != o && (o = Math.max(o, null != i ? i : 0)), "all" === r) {
    var s = Math.abs(t[1] - t[0]);
    s = M(s, [0, a]), i = o = M(s, [i, o]), r = 0;
  }
  t[0] = M(t[0], n), t[1] = M(t[1], n);
  var l = j(t, r);
  t[r] += e;
  var u,
    c = i || 0,
    f = n.slice();
  return l.sign < 0 ? f[0] += c : f[1] -= c, t[r] = M(t[r], f), u = j(t, r), null != i && (u.sign !== l.sign || u.span < i) && (t[1 - r] = t[r] + l.sign * i), u = j(t, r), null != o && u.span > o && (t[1 - r] = t[r] + u.sign * o), t;
}
function j(e, t) {
  var n = e[t] - e[1 - t];
  return {
    span: Math.abs(n),
    sign: n > 0 ? -1 : n < 0 ? 1 : t ? -1 : 1
  };
}
function M(e, t) {
  return Math.min(null != t[1] ? t[1] : 1 / 0, Math.max(null != t[0] ? t[0] : -1 / 0, e));
}
var C = require("./6158377a.js"),
  T = require("./55342f65.js"),
  I = o["j"],
  D = S["b"],
  A = function () {
    function e(e, t, n, r) {
      this._dimName = e, this._axisIndex = t, this.ecModel = r, this._dataZoomModel = n;
    }
    return e.prototype.hostedBy = function (e) {
      return this._dataZoomModel === e;
    }, e.prototype.getDataValueWindow = function () {
      return this._valueWindow.slice();
    }, e.prototype.getDataPercentWindow = function () {
      return this._percentWindow.slice();
    }, e.prototype.getTargetSeriesModels = function () {
      var e = [];
      return this.ecModel.eachSeries(function (t) {
        if (u(t)) {
          var n = c(this._dimName),
            r = t.getReferringComponents(n, d["b"]).models[0];
          r && this._axisIndex === r.componentIndex && e.push(t);
        }
      }, this), e;
    }, e.prototype.getAxisModel = function () {
      return this.ecModel.getComponent(this._dimName + "Axis", this._axisIndex);
    }, e.prototype.getMinMaxSpan = function () {
      return o["d"](this._minMaxSpan);
    }, e.prototype.calculateDataWindow = function (e) {
      var t,
        n = this._dataExtent,
        r = this.getAxisModel(),
        i = r.axis.scale,
        o = this._dataZoomModel.getRangePropMode(),
        a = [0, 100],
        s = [],
        l = [];
      I(["start", "end"], function (r, u) {
        var c = e[r],
          f = e[r + "Value"];
        "percent" === o[u] ? (null == c && (c = a[u]), f = i.parse(S["i"](c, a, n))) : (t = !0, f = null == f ? n[u] : i.parse(f), c = S["i"](f, n, a)), l[u] = f, s[u] = c;
      }), D(l), D(s);
      var u = this._minMaxSpan;
      function c(e, t, n, r, o) {
        var a = o ? "Span" : "ValueSpan";
        k(0, e, n, "all", u["min" + a], u["max" + a]);
        for (var s = 0; s < 2; s++) t[s] = S["i"](e[s], n, r, !0), o && (t[s] = i.parse(t[s]));
      }
      return t ? c(l, s, n, a, !1) : c(s, l, a, n, !0), {
        valueWindow: l,
        percentWindow: s
      };
    }, e.prototype.reset = function (e) {
      if (e === this._dataZoomModel) {
        var t = this.getTargetSeriesModels();
        this._dataExtent = E(this, this._dimName, t), this._updateMinMaxSpan();
        var n = this.calculateDataWindow(e.settledOption);
        this._valueWindow = n.valueWindow, this._percentWindow = n.percentWindow, this._setAxisModel();
      }
    }, e.prototype.filterData = function (e, t) {
      if (e === this._dataZoomModel) {
        var n = this._dimName,
          r = this.getTargetSeriesModels(),
          i = e.get("filterMode"),
          a = this._valueWindow;
        "none" !== i && I(r, function (e) {
          var t = e.getData(),
            r = t.mapDimensionsAll(n);
          if (r.length) {
            if ("weakFilter" === i) {
              var l = t.getStore(),
                u = o["D"](r, function (e) {
                  return t.getDimensionIndex(e);
                }, t);
              t.filterSelf(function (e) {
                for (var t, n, i, o = 0; o < r.length; o++) {
                  var s = l.get(u[o], e),
                    c = !isNaN(s),
                    f = s < a[0],
                    d = s > a[1];
                  if (c && !f && !d) return !0;
                  c && (i = !0), f && (t = !0), d && (n = !0);
                }
                return i && t && n;
              });
            } else I(r, function (n) {
              if ("empty" === i) e.setData(t = t.map(n, function (e) {
                return s(e) ? e : NaN;
              }));else {
                var r = {};
                r[n] = a, t.selectRange(r);
              }
            });
            I(r, function (e) {
              t.setApproximateExtent(a, e);
            });
          }
        });
      }
      function s(e) {
        return e >= a[0] && e <= a[1];
      }
    }, e.prototype._updateMinMaxSpan = function () {
      var e = this._minMaxSpan = {},
        t = this._dataZoomModel,
        n = this._dataExtent;
      I(["min", "max"], function (r) {
        var i = t.get(r + "Span"),
          o = t.get(r + "ValueSpan");
        null != o && (o = this.getAxisModel().axis.scale.parse(o)), null != o ? i = S["i"](n[0] + o, n, [0, 100], !0) : null != i && (o = S["i"](i, [0, 100], n, !0) - n[0]), e[r + "Span"] = i, e[r + "ValueSpan"] = o;
      }, this);
    }, e.prototype._setAxisModel = function () {
      var e = this.getAxisModel(),
        t = this._percentWindow,
        n = this._valueWindow;
      if (t) {
        var r = S["d"](n, [0, 500]);
        r = Math.min(r, 20);
        var i = e.axis.scale.rawExtentInfo;
        0 !== t[0] && i.setDeterminedMinMax("min", +n[0].toFixed(r)), 100 !== t[1] && i.setDeterminedMinMax("max", +n[1].toFixed(r)), i.freeze();
      }
    }, e;
  }();
function E(e, t, n) {
  var r = [1 / 0, -1 / 0];
  I(n, function (e) {
    Object(C["k"])(r, e.getData(), t);
  });
  var i = e.getAxisModel(),
    o = Object(T["a"])(i.axis.scale, i, r).calculate();
  return [o.min, o.max];
}
var P = A,
  L = {
    getTargetSeries: function (e) {
      function t(t) {
        e.eachComponent("dataZoom", function (n) {
          n.eachTargetAxis(function (r, i) {
            var o = e.getComponent(c(r), i);
            t(r, i, o, n);
          });
        });
      }
      t(function (e, t, n, r) {
        n.__dzAxisProxy = null;
      });
      var n = [];
      t(function (t, r, i, o) {
        i.__dzAxisProxy || (i.__dzAxisProxy = new P(t, r, o, e), n.push(i.__dzAxisProxy));
      });
      var r = Object(o["f"])();
      return Object(o["j"])(n, function (e) {
        Object(o["j"])(e.getTargetSeriesModels(), function (e) {
          r.set(e.uid, e);
        });
      }), r;
    },
    overallReset: function (e, t) {
      e.eachComponent("dataZoom", function (e) {
        e.eachTargetAxis(function (t, n) {
          e.getAxisProxy(t, n).reset(e);
        }), e.eachTargetAxis(function (n, r) {
          e.getAxisProxy(n, r).filterData(e, t);
        });
      }), e.eachComponent("dataZoom", function (e) {
        var t = e.findRepresentativeAxisProxy();
        if (t) {
          var n = t.getDataPercentWindow(),
            r = t.getDataValueWindow();
          e.setCalculatedRange({
            start: n[0],
            end: n[1],
            startValue: r[0],
            endValue: r[1]
          });
        }
      });
    }
  },
  N = L;
function R(e) {
  e.registerAction("dataZoom", function (e, t) {
    var n = f(t, e);
    Object(o["j"])(n, function (t) {
      t.setRawRange({
        start: e.start,
        end: e.end,
        startValue: e.startValue,
        endValue: e.endValue
      });
    });
  });
}
var z = !1;
function F(e) {
  z || (z = !0, e.registerProcessor(e.PRIORITY.PROCESSOR.FILTER, N), R(e), e.registerSubTypeDefaulter("dataZoom", function () {
    return "slider";
  }));
}
function B(e) {
  e.registerComponentModel(y), e.registerComponentView(O), F(e);
}
var Y = function () {
    function e() {}
    return e;
  }(),
  V = {};
function G(e, t) {
  V[e] = t;
}
function W(e) {
  return V[e];
}
var U = function (e) {
    function t() {
      var n = null !== e && e.apply(this, arguments) || this;
      return n.type = t.type, n;
    }
    return Object(i["a"])(t, e), t.prototype.optionUpdated = function () {
      e.prototype.optionUpdated.apply(this, arguments);
      var t = this.ecModel;
      o["j"](this.option.feature, function (e, n) {
        var r = W(n);
        r && (r.getDefaultOption && (r.defaultOption = r.getDefaultOption(t)), o["E"](e, r.defaultOption));
      });
    }, t.type = "toolbox", t.layoutMode = {
      type: "box",
      ignoreSize: !0
    }, t.defaultOption = {
      show: !0,
      z: 6,
      orient: "horizontal",
      left: "right",
      top: "top",
      backgroundColor: "transparent",
      borderColor: "#ccc",
      borderRadius: 0,
      borderWidth: 0,
      padding: 5,
      itemSize: 15,
      itemGap: 8,
      showTitle: !0,
      iconStyle: {
        borderColor: "#666",
        color: "none"
      },
      emphasis: {
        iconStyle: {
          borderColor: "#3E98C5"
        }
      },
      tooltip: {
        show: !1,
        position: "bottom"
      }
    }, t;
  }(a["a"]),
  H = U,
  q = require("./36477258.js"),
  K = require("./49776253.js"),
  Z = require("./66577761.js"),
  X = require("./51786b74.js"),
  Q = require("./6750416f.js"),
  $ = require("./65526b4f.js"),
  J = require("./69526a57.js"),
  ee = require("./64715547.js"),
  te = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }
    return Object(i["a"])(t, e), t.prototype.render = function (e, t, n, r) {
      var i = this.group;
      if (i.removeAll(), e.get("show")) {
        var a = +e.get("itemSize"),
          s = "vertical" === e.get("orient"),
          l = e.get("feature") || {},
          u = this._features || (this._features = {}),
          c = [];
        o["j"](l, function (e, t) {
          c.push(t);
        }), new Q["a"](this._featureNames || [], c).add(f).update(f).remove(o["h"](f, null)).execute(), this._featureNames = c, $["a"](i, e, n), i.add($["b"](i.getBoundingRect(), e)), s || i.eachChild(function (e) {
          var t = e.__title,
            r = e.ensureState("emphasis"),
            s = r.textConfig || (r.textConfig = {}),
            l = e.getTextContent(),
            u = l && l.ensureState("emphasis");
          if (u && !o["u"](u) && t) {
            var c = u.style || (u.style = {}),
              f = q["d"](t, ee["a"].makeFont(c)),
              d = e.x + i.x,
              h = e.y + i.y + a,
              p = !1;
            h + f.height > n.getHeight() && (s.position = "top", p = !0);
            var g = p ? -5 - f.height : a + 10;
            d + f.width / 2 > n.getWidth() ? (s.position = ["100%", g], c.align = "right") : d - f.width / 2 < 0 && (s.position = [0, g], c.align = "left");
          }
        });
      }
      function f(i, o) {
        var a,
          s = c[i],
          f = c[o],
          h = l[s],
          p = new X["a"](h, e, e.ecModel);
        if (r && null != r.newTitle && r.featureName === s && (h.title = r.newTitle), s && !f) {
          if (ne(s)) a = {
            onclick: p.option.onclick,
            featureName: s
          };else {
            var g = W(s);
            if (!g) return;
            a = new g();
          }
          u[s] = a;
        } else if (a = u[f], !a) return;
        a.uid = Object(J["c"])("toolbox-feature"), a.model = p, a.ecModel = t, a.api = n;
        var m = a instanceof Y;
        s || !f ? !p.get("show") || m && a.unusable ? m && a.remove && a.remove(t, n) : (d(p, a, s), p.setIconStatus = function (e, t) {
          var n = this.option,
            r = this.iconPaths;
          n.iconStatus = n.iconStatus || {}, n.iconStatus[e] = t, r[e] && ("emphasis" === t ? Z["o"] : Z["z"])(r[e]);
        }, a instanceof Y && a.render && a.render(p, t, n, r)) : m && a.dispose && a.dispose(t, n);
      }
      function d(r, l, u) {
        var c,
          f,
          d = r.getModel("iconStyle"),
          h = r.getModel(["emphasis", "iconStyle"]),
          p = l instanceof Y && l.getIcons ? l.getIcons() : r.get("icon"),
          g = r.get("title") || {};
        o["y"](p) ? (c = {}, c[u] = p) : c = p, o["y"](g) ? (f = {}, f[u] = g) : f = g;
        var m = r.iconPaths = {};
        o["j"](c, function (u, c) {
          var p = K["createIcon"](u, {}, {
            x: -a / 2,
            y: -a / 2,
            width: a,
            height: a
          });
          p.setStyle(d.getItemStyle());
          var g = p.ensureState("emphasis");
          g.style = h.getItemStyle();
          var v = new ee["a"]({
            style: {
              text: f[c],
              align: h.get("textAlign"),
              borderRadius: h.get("textBorderRadius"),
              padding: h.get("textPadding"),
              fill: null
            },
            ignore: !0
          });
          p.setTextContent(v), K["setTooltipConfig"]({
            el: p,
            componentModel: e,
            itemName: c,
            formatterParamsExtra: {
              title: f[c]
            }
          }), p.__title = f[c], p.on("mouseover", function () {
            var t = h.getItemStyle(),
              r = s ? null == e.get("right") && "right" !== e.get("left") ? "right" : "left" : null == e.get("bottom") && "bottom" !== e.get("top") ? "bottom" : "top";
            v.setStyle({
              fill: h.get("textFill") || t.fill || t.stroke || "#000",
              backgroundColor: h.get("textBackgroundColor")
            }), p.setTextConfig({
              position: h.get("textPosition") || r
            }), v.ignore = !e.get("showTitle"), n.enterEmphasis(this);
          }).on("mouseout", function () {
            "emphasis" !== r.get(["iconStatus", c]) && n.leaveEmphasis(this), v.hide();
          }), ("emphasis" === r.get(["iconStatus", c]) ? Z["o"] : Z["z"])(p), i.add(p), p.on("click", o["c"](l.onclick, l, t, n, c)), m[c] = p;
        });
      }
    }, t.prototype.updateView = function (e, t, n, r) {
      o["j"](this._features, function (e) {
        e instanceof Y && e.updateView && e.updateView(e.model, t, n, r);
      });
    }, t.prototype.remove = function (e, t) {
      o["j"](this._features, function (n) {
        n instanceof Y && n.remove && n.remove(e, t);
      }), this.group.removeAll();
    }, t.prototype.dispose = function (e, t) {
      o["j"](this._features, function (n) {
        n instanceof Y && n.dispose && n.dispose(e, t);
      });
    }, t.type = "toolbox", t;
  }(b["a"]);
function ne(e) {
  return 0 === e.indexOf("my");
}
var re = te,
  ie = require("./49744746.js"),
  oe = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }
    return Object(i["a"])(t, e), t.prototype.onclick = function (e, t) {
      var n = this.model,
        r = n.get("name") || e.get("title.0.text") || "echarts",
        i = "svg" === t.getZr().painter.getType(),
        a = i ? "svg" : n.get("type", !0) || "png",
        s = t.getConnectedDataURL({
          type: a,
          backgroundColor: n.get("backgroundColor", !0) || e.get("backgroundColor") || "#fff",
          connectedBackgroundColor: n.get("connectedBackgroundColor"),
          excludeComponents: n.get("excludeComponents"),
          pixelRatio: n.get("pixelRatio")
        }),
        l = ie["a"].browser;
      if (Object(o["u"])(MouseEvent) && (l.newEdge || !l.ie && !l.edge)) {
        var u = document.createElement("a");
        u.download = r + "." + a, u.target = "_blank", u.href = s;
        var c = new MouseEvent("click", {
          view: document.defaultView,
          bubbles: !0,
          cancelable: !1
        });
        u.dispatchEvent(c);
      } else if (window.navigator.msSaveOrOpenBlob || i) {
        var f = s.split(","),
          d = f[0].indexOf("base64") > -1,
          h = i ? decodeURIComponent(f[1]) : f[1];
        d && (h = window.atob(h));
        var p = r + "." + a;
        if (window.navigator.msSaveOrOpenBlob) {
          var g = h.length,
            m = new Uint8Array(g);
          while (g--) m[g] = h.charCodeAt(g);
          var v = new Blob([m]);
          window.navigator.msSaveOrOpenBlob(v, p);
        } else {
          var y = document.createElement("iframe");
          document.body.appendChild(y);
          var b = y.contentWindow,
            x = b.document;
          x.open("image/svg+xml", "replace"), x.write(h), x.close(), b.focus(), x.execCommand("SaveAs", !0, p), document.body.removeChild(y);
        }
      } else {
        var _ = n.get("lang"),
          w = '<body style="margin:0;"><img src="' + s + '" style="max-width:100%;" title="' + (_ && _[0] || "") + '" /></body>',
          O = window.open();
        O.document.write(w), O.document.title = r;
      }
    }, t.getDefaultOption = function (e) {
      var t = {
        show: !0,
        icon: "M4.7,22.9L29.3,45.5L54.7,23.4M4.6,43.6L4.6,58L53.8,58L53.8,43.6M29.2,45.1L29.2,0",
        title: e.getLocaleModel().get(["toolbox", "saveAsImage", "title"]),
        type: "png",
        connectedBackgroundColor: "#fff",
        name: "",
        excludeComponents: ["toolbox"],
        lang: e.getLocaleModel().get(["toolbox", "saveAsImage", "lang"])
      };
      return t;
    }, t;
  }(Y),
  ae = oe,
  se = require("./472b6553.js"),
  le = "__ec_magicType_stack__",
  ue = [["line", "bar"], ["stack"]],
  ce = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }
    return Object(i["a"])(t, e), t.prototype.getIcons = function () {
      var e = this.model,
        t = e.get("icon"),
        n = {};
      return o["j"](e.get("type"), function (e) {
        t[e] && (n[e] = t[e]);
      }), n;
    }, t.getDefaultOption = function (e) {
      var t = {
        show: !0,
        type: [],
        icon: {
          line: "M4.1,28.9h7.1l9.3-22l7.4,38l9.7-19.7l3,12.8h14.9M4.1,58h51.4",
          bar: "M6.7,22.9h10V48h-10V22.9zM24.9,13h10v35h-10V13zM43.2,2h10v46h-10V2zM3.1,58h53.7",
          stack: "M8.2,38.4l-8.4,4.1l30.6,15.3L60,42.5l-8.1-4.1l-21.5,11L8.2,38.4z M51.9,30l-8.1,4.2l-13.4,6.9l-13.9-6.9L8.2,30l-8.4,4.2l8.4,4.2l22.2,11l21.5-11l8.1-4.2L51.9,30z M51.9,21.7l-8.1,4.2L35.7,30l-5.3,2.8L24.9,30l-8.4-4.1l-8.3-4.2l-8.4,4.2L8.2,30l8.3,4.2l13.9,6.9l13.4-6.9l8.1-4.2l8.1-4.1L51.9,21.7zM30.4,2.2L-0.2,17.5l8.4,4.1l8.3,4.2l8.4,4.2l5.5,2.7l5.3-2.7l8.1-4.2l8.1-4.2l8.1-4.1L30.4,2.2z"
        },
        title: e.getLocaleModel().get(["toolbox", "magicType", "title"]),
        option: {},
        seriesIndex: {}
      };
      return t;
    }, t.prototype.onclick = function (e, t, n) {
      var r = this.model,
        i = r.get(["seriesIndex", n]);
      if (fe[n]) {
        var a,
          s = {
            series: []
          },
          l = function (e) {
            var t = e.subType,
              i = e.id,
              a = fe[n](t, i, e, r);
            a && (o["i"](a, e.option), s.series.push(a));
            var l = e.coordinateSystem;
            if (l && "cartesian2d" === l.type && ("line" === n || "bar" === n)) {
              var u = l.getAxesByScale("ordinal")[0];
              if (u) {
                var c = u.dim,
                  f = c + "Axis",
                  h = e.getReferringComponents(f, d["b"]).models[0],
                  p = h.componentIndex;
                s[f] = s[f] || [];
                for (var g = 0; g <= p; g++) s[f][p] = s[f][p] || {};
                s[f][p].boundaryGap = "bar" === n;
              }
            }
          };
        o["j"](ue, function (e) {
          o["p"](e, n) >= 0 && o["j"](e, function (e) {
            r.setIconStatus(e, "normal");
          });
        }), r.setIconStatus(n, "emphasis"), e.eachComponent({
          mainType: "series",
          query: null == i ? null : {
            seriesIndex: i
          }
        }, l);
        var u = n;
        "stack" === n && (a = o["E"]({
          stack: r.option.title.tiled,
          tiled: r.option.title.stack
        }, r.option.title), "emphasis" !== r.get(["iconStatus", n]) && (u = "tiled")), t.dispatchAction({
          type: "changeMagicType",
          currentType: u,
          newOption: s,
          newTitle: a,
          featureName: "magicType"
        });
      }
    }, t;
  }(Y),
  fe = {
    line: function (e, t, n, r) {
      if ("bar" === e) return o["E"]({
        id: t,
        type: "line",
        data: n.get("data"),
        stack: n.get("stack"),
        markPoint: n.get("markPoint"),
        markLine: n.get("markLine")
      }, r.get(["option", "line"]) || {}, !0);
    },
    bar: function (e, t, n, r) {
      if ("line" === e) return o["E"]({
        id: t,
        type: "bar",
        data: n.get("data"),
        stack: n.get("stack"),
        markPoint: n.get("markPoint"),
        markLine: n.get("markLine")
      }, r.get(["option", "bar"]) || {}, !0);
    },
    stack: function (e, t, n, r) {
      var i = n.get("stack") === le;
      if ("line" === e || "bar" === e) return r.setIconStatus("stack", i ? "normal" : "emphasis"), o["E"]({
        id: t,
        stack: i ? "" : le
      }, r.get(["option", "stack"]) || {}, !0);
    }
  };
se["c"]({
  type: "changeMagicType",
  event: "magicTypeChanged",
  update: "prepareAndUpdate"
}, function (e, t) {
  t.mergeOption(e.newOption);
});
var de = ce,
  he = require("./59483231.js"),
  pe = new Array(60).join("-"),
  ge = "\t";
function me(e) {
  var t = {},
    n = [],
    r = [];
  return e.eachRawSeries(function (e) {
    var i = e.coordinateSystem;
    if (!i || "cartesian2d" !== i.type && "polar" !== i.type) n.push(e);else {
      var o = i.getBaseAxis();
      if ("category" === o.type) {
        var a = o.dim + "_" + o.index;
        t[a] || (t[a] = {
          categoryAxis: o,
          valueAxis: i.getOtherAxis(o),
          series: []
        }, r.push({
          axisDim: o.dim,
          axisIndex: o.index
        })), t[a].series.push(e);
      } else n.push(e);
    }
  }), {
    seriesGroupByCategoryAxis: t,
    other: n,
    meta: r
  };
}
function ve(e) {
  var t = [];
  return o["j"](e, function (e, n) {
    var r = e.categoryAxis,
      i = e.valueAxis,
      a = i.dim,
      s = [" "].concat(o["D"](e.series, function (e) {
        return e.name;
      })),
      l = [r.model.getCategories()];
    o["j"](e.series, function (e) {
      var t = e.getRawData();
      l.push(e.getRawData().mapArray(t.mapDimension(a), function (e) {
        return e;
      }));
    });
    for (var u = [s.join(ge)], c = 0; c < l[0].length; c++) {
      for (var f = [], d = 0; d < l.length; d++) f.push(l[d][c]);
      u.push(f.join(ge));
    }
    t.push(u.join("\n"));
  }), t.join("\n\n" + pe + "\n\n");
}
function ye(e) {
  return o["D"](e, function (e) {
    var t = e.getRawData(),
      n = [e.name],
      r = [];
    return t.each(t.dimensions, function () {
      for (var e = arguments.length, i = arguments[e - 1], o = t.getName(i), a = 0; a < e - 1; a++) r[a] = arguments[a];
      n.push((o ? o + ge : "") + r.join(ge));
    }), n.join("\n");
  }).join("\n\n" + pe + "\n\n");
}
function be(e) {
  var t = me(e);
  return {
    value: o["m"]([ve(t.seriesGroupByCategoryAxis), ye(t.other)], function (e) {
      return !!e.replace(/[\n\t\s]/g, "");
    }).join("\n\n" + pe + "\n\n"),
    meta: t.meta
  };
}
function xe(e) {
  return e.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function _e(e) {
  var t = e.slice(0, e.indexOf("\n"));
  if (t.indexOf(ge) >= 0) return !0;
}
var we = new RegExp("[" + ge + "]+", "g");
function Oe(e) {
  for (var t = e.split(/\n+/g), n = xe(t.shift()).split(we), r = [], i = o["D"](n, function (e) {
      return {
        name: e,
        data: []
      };
    }), a = 0; a < t.length; a++) {
    var s = xe(t[a]).split(we);
    r.push(s.shift());
    for (var l = 0; l < s.length; l++) i[l] && (i[l].data[a] = s[l]);
  }
  return {
    series: i,
    categories: r
  };
}
function Se(e) {
  for (var t = e.split(/\n+/g), n = xe(t.shift()), r = [], i = 0; i < t.length; i++) {
    var o = xe(t[i]);
    if (o) {
      var a = o.split(we),
        s = "",
        l = void 0,
        u = !1;
      isNaN(a[0]) ? (u = !0, s = a[0], a = a.slice(1), r[i] = {
        name: s,
        value: []
      }, l = r[i].value) : l = r[i] = [];
      for (var c = 0; c < a.length; c++) l.push(+a[c]);
      1 === l.length && (u ? r[i].value = l[0] : r[i] = l[0]);
    }
  }
  return {
    name: n,
    data: r
  };
}
function ke(e, t) {
  var n = e.split(new RegExp("\n*" + pe + "\n*", "g")),
    r = {
      series: []
    };
  return o["j"](n, function (e, n) {
    if (_e(e)) {
      var i = Oe(e),
        o = t[n],
        a = o.axisDim + "Axis";
      o && (r[a] = r[a] || [], r[a][o.axisIndex] = {
        data: i.categories
      }, r.series = r.series.concat(i.series));
    } else {
      i = Se(e);
      r.series.push(i);
    }
  }), r;
}
var je = function (e) {
  function t() {
    return null !== e && e.apply(this, arguments) || this;
  }
  return Object(i["a"])(t, e), t.prototype.onclick = function (e, t) {
    setTimeout(function () {
      t.dispatchAction({
        type: "hideTip"
      });
    });
    var n = t.getDom(),
      r = this.model;
    this._dom && n.removeChild(this._dom);
    var i = document.createElement("div");
    i.style.cssText = "position:absolute;top:0;bottom:0;left:0;right:0;padding:5px", i.style.backgroundColor = r.get("backgroundColor") || "#fff";
    var a = document.createElement("h4"),
      s = r.get("lang") || [];
    a.innerHTML = s[0] || r.get("title"), a.style.cssText = "margin:10px 20px", a.style.color = r.get("textColor");
    var l = document.createElement("div"),
      u = document.createElement("textarea");
    l.style.cssText = "overflow:auto";
    var c = r.get("optionToContent"),
      f = r.get("contentToOption"),
      d = be(e);
    if (o["u"](c)) {
      var h = c(t.getOption());
      o["y"](h) ? l.innerHTML = h : o["t"](h) && l.appendChild(h);
    } else {
      u.readOnly = r.get("readOnly");
      var p = u.style;
      p.cssText = "display:block;width:100%;height:100%;font-family:monospace;font-size:14px;line-height:1.6rem;resize:none;box-sizing:border-box;outline:none", p.color = r.get("textColor"), p.borderColor = r.get("textareaBorderColor"), p.backgroundColor = r.get("textareaColor"), u.value = d.value, l.appendChild(u);
    }
    var g = d.meta,
      m = document.createElement("div");
    m.style.cssText = "position:absolute;bottom:5px;left:0;right:0";
    var v = "float:right;margin-right:20px;border:none;cursor:pointer;padding:2px 5px;font-size:12px;border-radius:3px",
      y = document.createElement("div"),
      b = document.createElement("div");
    v += ";background-color:" + r.get("buttonColor"), v += ";color:" + r.get("buttonTextColor");
    var x = this;
    function _() {
      n.removeChild(i), x._dom = null;
    }
    Object(he["a"])(y, "click", _), Object(he["a"])(b, "click", function () {
      if (null == f && null != c || null != f && null == c) _();else {
        var e;
        try {
          e = o["u"](f) ? f(l, t.getOption()) : ke(u.value, g);
        } catch (e) {
          throw _(), new Error("Data view format error " + e);
        }
        e && t.dispatchAction({
          type: "changeDataView",
          newOption: e
        }), _();
      }
    }), y.innerHTML = s[1], b.innerHTML = s[2], b.style.cssText = y.style.cssText = v, !r.get("readOnly") && m.appendChild(b), m.appendChild(y), i.appendChild(a), i.appendChild(l), i.appendChild(m), l.style.height = n.clientHeight - 80 + "px", n.appendChild(i), this._dom = i;
  }, t.prototype.remove = function (e, t) {
    this._dom && t.getDom().removeChild(this._dom);
  }, t.prototype.dispose = function (e, t) {
    this.remove(e, t);
  }, t.getDefaultOption = function (e) {
    var t = {
      show: !0,
      readOnly: !1,
      optionToContent: null,
      contentToOption: null,
      icon: "M17.5,17.3H33 M17.5,17.3H33 M45.4,29.5h-28 M11.5,2v56H51V14.8L38.4,2H11.5z M38.4,2.2v12.7H51 M45.4,41.7h-28",
      title: e.getLocaleModel().get(["toolbox", "dataView", "title"]),
      lang: e.getLocaleModel().get(["toolbox", "dataView", "lang"]),
      backgroundColor: "#fff",
      textColor: "#000",
      textareaColor: "#fff",
      textareaBorderColor: "#333",
      buttonColor: "#c23531",
      buttonTextColor: "#fff"
    };
    return t;
  }, t;
}(Y);
function Me(e, t) {
  return o["D"](e, function (e, n) {
    var r = t && t[n];
    if (o["x"](r) && !o["r"](r)) {
      var i = o["x"](e) && !o["r"](e);
      i || (e = {
        value: e
      });
      var a = null != r.name && null == e.name;
      return e = o["i"](e, r), a && delete e.name, e;
    }
    return e;
  });
}
se["c"]({
  type: "changeDataView",
  event: "dataViewChanged",
  update: "prepareAndUpdate"
}, function (e, t) {
  var n = [];
  o["j"](e.newOption.series, function (e) {
    var r = t.getSeriesByName(e.name)[0];
    if (r) {
      var i = r.get("data");
      n.push({
        name: e.name,
        data: Me(e.data, i)
      });
    } else n.push(o["l"]({
      type: "scatter"
    }, e));
  }), t.mergeOption(o["i"]({
    series: n
  }, e.newOption));
});
var Ce = je,
  Te = o["j"],
  Ie = Object(d["m"])();
function De(e, t) {
  var n = Le(e);
  Te(t, function (t, r) {
    for (var i = n.length - 1; i >= 0; i--) {
      var o = n[i];
      if (o[r]) break;
    }
    if (i < 0) {
      var a = e.queryComponents({
        mainType: "dataZoom",
        subType: "select",
        id: r
      })[0];
      if (a) {
        var s = a.getPercentRange();
        n[0][r] = {
          dataZoomId: r,
          start: s[0],
          end: s[1]
        };
      }
    }
  }), n.push(t);
}
function Ae(e) {
  var t = Le(e),
    n = t[t.length - 1];
  t.length > 1 && t.pop();
  var r = {};
  return Te(n, function (e, n) {
    for (var i = t.length - 1; i >= 0; i--) if (e = t[i][n], e) {
      r[n] = e;
      break;
    }
  }), r;
}
function Ee(e) {
  Ie(e).snapshots = null;
}
function Pe(e) {
  return Le(e).length;
}
function Le(e) {
  var t = Ie(e);
  return t.snapshots || (t.snapshots = [{}]), t.snapshots;
}
var Ne = function (e) {
  function t() {
    return null !== e && e.apply(this, arguments) || this;
  }
  return Object(i["a"])(t, e), t.prototype.onclick = function (e, t) {
    Ee(e), t.dispatchAction({
      type: "restore",
      from: this.uid
    });
  }, t.getDefaultOption = function (e) {
    var t = {
      show: !0,
      icon: "M3.8,33.4 M47,18.9h9.8V8.7 M56.3,20.1 C52.1,9,40.5,0.6,26.8,2.1C12.6,3.7,1.6,16.2,2.1,30.6 M13,41.1H3.1v10.2 M3.7,39.9c4.2,11.1,15.8,19.5,29.5,18 c14.2-1.6,25.2-14.1,24.7-28.5",
      title: e.getLocaleModel().get(["toolbox", "restore", "title"])
    };
    return t;
  }, t;
}(Y);
se["c"]({
  type: "restore",
  event: "restore",
  update: "prepareAndUpdate"
}, function (e, t) {
  t.resetOption("recreate");
});
var Re = Ne,
  ze = require("./62394f74.js"),
  Fe = require("./4c63584c.js"),
  Be = require("./78364b74.js"),
  Ye = require("./314a6837.js"),
  Ve = require("./68374851.js"),
  Ge = "\0_ec_interaction_mutex";
function We(e, t, n) {
  var r = He(e);
  r[t] = n;
}
function Ue(e, t, n) {
  var r = He(e),
    i = r[t];
  i === n && (r[t] = null);
}
function He(e) {
  return e[Ge] || (e[Ge] = {});
}
se["c"]({
  type: "takeGlobalCursor",
  event: "globalCursorTaken",
  update: "update"
}, o["G"]);
var qe = !0,
  Ke = Math.min,
  Ze = Math.max,
  Xe = Math.pow,
  Qe = 1e4,
  $e = 6,
  Je = 6,
  et = "globalPan",
  tt = {
    w: [0, 0],
    e: [0, 1],
    n: [1, 0],
    s: [1, 1]
  },
  nt = {
    w: "ew",
    e: "ew",
    n: "ns",
    s: "ns",
    ne: "nesw",
    sw: "nesw",
    nw: "nwse",
    se: "nwse"
  },
  rt = {
    brushStyle: {
      lineWidth: 2,
      stroke: "rgba(210,219,238,0.3)",
      fill: "#D2DBEE"
    },
    transformable: !0,
    brushMode: "single",
    removeOnClick: !1
  },
  it = 0,
  ot = function (e) {
    function t(t) {
      var n = e.call(this) || this;
      return n._track = [], n._covers = [], n._handlers = {}, n._zr = t, n.group = new Fe["a"](), n._uid = "brushController_" + it++, Object(o["j"])(Rt, function (e, t) {
        this._handlers[t] = Object(o["c"])(e, this);
      }, n), n;
    }
    return Object(i["a"])(t, e), t.prototype.enableBrush = function (e) {
      return this._brushType && this._doDisableBrush(), e.brushType && this._doEnableBrush(e), this;
    }, t.prototype._doEnableBrush = function (e) {
      var t = this._zr;
      this._enableGlobalPan || We(t, et, this._uid), Object(o["j"])(this._handlers, function (e, n) {
        t.on(n, e);
      }), this._brushType = e.brushType, this._brushOption = Object(o["E"])(Object(o["d"])(rt), e, !0);
    }, t.prototype._doDisableBrush = function () {
      var e = this._zr;
      Ue(e, et, this._uid), Object(o["j"])(this._handlers, function (t, n) {
        e.off(n, t);
      }), this._brushType = this._brushOption = null;
    }, t.prototype.setPanels = function (e) {
      if (e && e.length) {
        var t = this._panels = {};
        Object(o["j"])(e, function (e) {
          t[e.panelId] = Object(o["d"])(e);
        });
      } else this._panels = null;
      return this;
    }, t.prototype.mount = function (e) {
      e = e || {}, this._enableGlobalPan = e.enableGlobalPan;
      var t = this.group;
      return this._zr.add(t), t.attr({
        x: e.x || 0,
        y: e.y || 0,
        rotation: e.rotation || 0,
        scaleX: e.scaleX || 1,
        scaleY: e.scaleY || 1
      }), this._transform = t.getLocalTransform(), this;
    }, t.prototype.updateCovers = function (e) {
      e = Object(o["D"])(e, function (e) {
        return Object(o["E"])(Object(o["d"])(rt), e, !0);
      });
      var t = "\0-brush-index-",
        n = this._covers,
        r = this._covers = [],
        i = this,
        a = this._creatingCover;
      return new Q["a"](n, e, l, s).add(u).update(u).remove(c).execute(), this;
      function s(e, n) {
        return (null != e.id ? e.id : t + n) + "-" + e.brushType;
      }
      function l(e, t) {
        return s(e.__brushOption, t);
      }
      function u(t, o) {
        var s = e[t];
        if (null != o && n[o] === a) r[t] = n[o];else {
          var l = r[t] = null != o ? (n[o].__brushOption = s, n[o]) : st(i, at(i, s));
          ct(i, l);
        }
      }
      function c(e) {
        n[e] !== a && i.group.remove(n[e]);
      }
    }, t.prototype.unmount = function () {
      return this.enableBrush(!1), pt(this), this._zr.remove(this.group), this;
    }, t.prototype.dispose = function () {
      this.unmount(), this.off();
    }, t;
  }(ze["a"]);
function at(e, t) {
  var n = Bt[t.brushType].createCover(e, t);
  return n.__brushOption = t, ut(n, t), e.group.add(n), n;
}
function st(e, t) {
  var n = ft(t);
  return n.endCreating && (n.endCreating(e, t), ut(t, t.__brushOption)), t;
}
function lt(e, t) {
  var n = t.__brushOption;
  ft(t).updateCoverShape(e, t, n.range, n);
}
function ut(e, t) {
  var n = t.z;
  null == n && (n = Qe), e.traverse(function (e) {
    e.z = n, e.z2 = n;
  });
}
function ct(e, t) {
  ft(t).updateCommon(e, t), lt(e, t);
}
function ft(e) {
  return Bt[e.__brushOption.brushType];
}
function dt(e, t, n) {
  var r,
    i = e._panels;
  if (!i) return qe;
  var a = e._transform;
  return Object(o["j"])(i, function (e) {
    e.isTargetByCursor(t, n, a) && (r = e);
  }), r;
}
function ht(e, t) {
  var n = e._panels;
  if (!n) return qe;
  var r = t.__brushOption.panelId;
  return null != r ? n[r] : qe;
}
function pt(e) {
  var t = e._covers,
    n = t.length;
  return Object(o["j"])(t, function (t) {
    e.group.remove(t);
  }, e), t.length = 0, !!n;
}
function gt(e, t) {
  var n = Object(o["D"])(e._covers, function (e) {
    var t = e.__brushOption,
      n = Object(o["d"])(t.range);
    return {
      brushType: t.brushType,
      panelId: t.panelId,
      range: n
    };
  });
  e.trigger("brush", {
    areas: n,
    isEnd: !!t.isEnd,
    removeOnClick: !!t.removeOnClick
  });
}
function mt(e) {
  var t = e._track;
  if (!t.length) return !1;
  var n = t[t.length - 1],
    r = t[0],
    i = n[0] - r[0],
    o = n[1] - r[1],
    a = Xe(i * i + o * o, .5);
  return a > $e;
}
function vt(e) {
  var t = e.length - 1;
  return t < 0 && (t = 0), [e[0], e[t]];
}
function yt(e, t, n, r) {
  var i = new Fe["a"]();
  return i.add(new Be["a"]({
    name: "main",
    style: wt(n),
    silent: !0,
    draggable: !0,
    cursor: "move",
    drift: Object(o["h"])(Mt, e, t, i, ["n", "s", "w", "e"]),
    ondragend: Object(o["h"])(gt, t, {
      isEnd: !0
    })
  })), Object(o["j"])(r, function (n) {
    i.add(new Be["a"]({
      name: n.join(""),
      style: {
        opacity: 0
      },
      draggable: !0,
      silent: !0,
      invisible: !0,
      drift: Object(o["h"])(Mt, e, t, i, n),
      ondragend: Object(o["h"])(gt, t, {
        isEnd: !0
      })
    }));
  }), i;
}
function bt(e, t, n, r) {
  var i = r.brushStyle.lineWidth || 0,
    o = Ze(i, Je),
    a = n[0][0],
    s = n[1][0],
    l = a - i / 2,
    u = s - i / 2,
    c = n[0][1],
    f = n[1][1],
    d = c - o + i / 2,
    h = f - o + i / 2,
    p = c - a,
    g = f - s,
    m = p + i,
    v = g + i;
  _t(e, t, "main", a, s, p, g), r.transformable && (_t(e, t, "w", l, u, o, v), _t(e, t, "e", d, u, o, v), _t(e, t, "n", l, u, m, o), _t(e, t, "s", l, h, m, o), _t(e, t, "nw", l, u, o, o), _t(e, t, "ne", d, u, o, o), _t(e, t, "sw", l, h, o, o), _t(e, t, "se", d, h, o, o));
}
function xt(e, t) {
  var n = t.__brushOption,
    r = n.transformable,
    i = t.childAt(0);
  i.useStyle(wt(n)), i.attr({
    silent: !r,
    cursor: r ? "move" : "default"
  }), Object(o["j"])([["w"], ["e"], ["n"], ["s"], ["s", "e"], ["s", "w"], ["n", "e"], ["n", "w"]], function (n) {
    var i = t.childOfName(n.join("")),
      o = 1 === n.length ? kt(e, n[0]) : jt(e, n);
    i && i.attr({
      silent: !r,
      invisible: !r,
      cursor: r ? nt[o] + "-resize" : null
    });
  });
}
function _t(e, t, n, r, i, o, a) {
  var s = t.childOfName(n);
  s && s.setShape(Dt(It(e, t, [[r, i], [r + o, i + a]])));
}
function wt(e) {
  return Object(o["i"])({
    strokeNoScale: !0
  }, e.brushStyle);
}
function Ot(e, t, n, r) {
  var i = [Ke(e, n), Ke(t, r)],
    o = [Ze(e, n), Ze(t, r)];
  return [[i[0], o[0]], [i[1], o[1]]];
}
function St(e) {
  return K["getTransform"](e.group);
}
function kt(e, t) {
  var n = {
      w: "left",
      e: "right",
      n: "top",
      s: "bottom"
    },
    r = {
      left: "w",
      right: "e",
      top: "n",
      bottom: "s"
    },
    i = K["transformDirection"](n[t], St(e));
  return r[i];
}
function jt(e, t) {
  var n = [kt(e, t[0]), kt(e, t[1])];
  return ("e" === n[0] || "w" === n[0]) && n.reverse(), n.join("");
}
function Mt(e, t, n, r, i, a) {
  var s = n.__brushOption,
    l = e.toRectRange(s.range),
    u = Tt(t, i, a);
  Object(o["j"])(r, function (e) {
    var t = tt[e];
    l[t[0]][t[1]] += u[t[0]];
  }), s.range = e.fromRectRange(Ot(l[0][0], l[1][0], l[0][1], l[1][1])), ct(t, n), gt(t, {
    isEnd: !1
  });
}
function Ct(e, t, n, r) {
  var i = t.__brushOption.range,
    a = Tt(e, n, r);
  Object(o["j"])(i, function (e) {
    e[0] += a[0], e[1] += a[1];
  }), ct(e, t), gt(e, {
    isEnd: !1
  });
}
function Tt(e, t, n) {
  var r = e.group,
    i = r.transformCoordToLocal(t, n),
    o = r.transformCoordToLocal(0, 0);
  return [i[0] - o[0], i[1] - o[1]];
}
function It(e, t, n) {
  var r = ht(e, t);
  return r && r !== qe ? r.clipPath(n, e._transform) : Object(o["d"])(n);
}
function Dt(e) {
  var t = Ke(e[0][0], e[1][0]),
    n = Ke(e[0][1], e[1][1]),
    r = Ze(e[0][0], e[1][0]),
    i = Ze(e[0][1], e[1][1]);
  return {
    x: t,
    y: n,
    width: r - t,
    height: i - n
  };
}
function At(e, t, n) {
  if (e._brushType && !Ft(e, t.offsetX, t.offsetY)) {
    var r = e._zr,
      i = e._covers,
      o = dt(e, t, n);
    if (!e._dragging) for (var a = 0; a < i.length; a++) {
      var s = i[a].__brushOption;
      if (o && (o === qe || s.panelId === o.panelId) && Bt[s.brushType].contain(i[a], n[0], n[1])) return;
    }
    o && r.setCursorStyle("crosshair");
  }
}
function Et(e) {
  var t = e.event;
  t.preventDefault && t.preventDefault();
}
function Pt(e, t, n) {
  return e.childOfName("main").contain(t, n);
}
function Lt(e, t, n, r) {
  var i,
    a = e._creatingCover,
    s = e._creatingPanel,
    l = e._brushOption;
  if (e._track.push(n.slice()), mt(e) || a) {
    if (s && !a) {
      "single" === l.brushMode && pt(e);
      var u = Object(o["d"])(l);
      u.brushType = Nt(u.brushType, s), u.panelId = s === qe ? null : s.panelId, a = e._creatingCover = at(e, u), e._covers.push(a);
    }
    if (a) {
      var c = Bt[Nt(e._brushType, s)],
        f = a.__brushOption;
      f.range = c.getCreatingRange(It(e, a, e._track)), r && (st(e, a), c.updateCommon(e, a)), lt(e, a), i = {
        isEnd: r
      };
    }
  } else r && "single" === l.brushMode && l.removeOnClick && dt(e, t, n) && pt(e) && (i = {
    isEnd: r,
    removeOnClick: !0
  });
  return i;
}
function Nt(e, t) {
  return "auto" === e ? t.defaultBrushType : e;
}
var Rt = {
  mousedown: function (e) {
    if (this._dragging) zt(this, e);else if (!e.target || !e.target.draggable) {
      Et(e);
      var t = this.group.transformCoordToLocal(e.offsetX, e.offsetY);
      this._creatingCover = null;
      var n = this._creatingPanel = dt(this, e, t);
      n && (this._dragging = !0, this._track = [t.slice()]);
    }
  },
  mousemove: function (e) {
    var t = e.offsetX,
      n = e.offsetY,
      r = this.group.transformCoordToLocal(t, n);
    if (At(this, e, r), this._dragging) {
      Et(e);
      var i = Lt(this, e, r, !1);
      i && gt(this, i);
    }
  },
  mouseup: function (e) {
    zt(this, e);
  }
};
function zt(e, t) {
  if (e._dragging) {
    Et(t);
    var n = t.offsetX,
      r = t.offsetY,
      i = e.group.transformCoordToLocal(n, r),
      o = Lt(e, t, i, !0);
    e._dragging = !1, e._track = [], e._creatingCover = null, o && gt(e, o);
  }
}
function Ft(e, t, n) {
  var r = e._zr;
  return t < 0 || t > r.getWidth() || n < 0 || n > r.getHeight();
}
var Bt = {
  lineX: Yt(0),
  lineY: Yt(1),
  rect: {
    createCover: function (e, t) {
      function n(e) {
        return e;
      }
      return yt({
        toRectRange: n,
        fromRectRange: n
      }, e, t, [["w"], ["e"], ["n"], ["s"], ["s", "e"], ["s", "w"], ["n", "e"], ["n", "w"]]);
    },
    getCreatingRange: function (e) {
      var t = vt(e);
      return Ot(t[1][0], t[1][1], t[0][0], t[0][1]);
    },
    updateCoverShape: function (e, t, n, r) {
      bt(e, t, n, r);
    },
    updateCommon: xt,
    contain: Pt
  },
  polygon: {
    createCover: function (e, t) {
      var n = new Fe["a"]();
      return n.add(new Ye["a"]({
        name: "main",
        style: wt(t),
        silent: !0
      })), n;
    },
    getCreatingRange: function (e) {
      return e;
    },
    endCreating: function (e, t) {
      t.remove(t.childAt(0)), t.add(new Ve["a"]({
        name: "main",
        draggable: !0,
        drift: Object(o["h"])(Ct, e, t),
        ondragend: Object(o["h"])(gt, e, {
          isEnd: !0
        })
      }));
    },
    updateCoverShape: function (e, t, n, r) {
      t.childAt(0).setShape({
        points: It(e, t, n)
      });
    },
    updateCommon: xt,
    contain: Pt
  }
};
function Yt(e) {
  return {
    createCover: function (t, n) {
      return yt({
        toRectRange: function (t) {
          var n = [t, [0, 100]];
          return e && n.reverse(), n;
        },
        fromRectRange: function (t) {
          return t[e];
        }
      }, t, n, [[["w"], ["e"]], [["n"], ["s"]]][e]);
    },
    getCreatingRange: function (t) {
      var n = vt(t),
        r = Ke(n[0][e], n[1][e]),
        i = Ze(n[0][e], n[1][e]);
      return [r, i];
    },
    updateCoverShape: function (t, n, r, i) {
      var o,
        a = ht(t, n);
      if (a !== qe && a.getLinearBrushOtherExtent) o = a.getLinearBrushOtherExtent(e);else {
        var s = t._zr;
        o = [0, [s.getWidth(), s.getHeight()][1 - e]];
      }
      var l = [r, o];
      e && l.reverse(), bt(t, n, l, i);
    },
    updateCommon: xt,
    contain: Pt
  };
}
var Vt = ot,
  Gt = require("./6d464469.js"),
  Wt = {
    axisPointer: 1,
    tooltip: 1,
    brush: 1
  };
function Ut(e, t, n) {
  var r = t.getComponentByElement(e.topTarget),
    i = r && r.coordinateSystem;
  return r && r !== n && !Wt.hasOwnProperty(r.mainType) && i && i.model !== n;
}
function Ht(e) {
  return e = Zt(e), function (t) {
    return K["clipPointsByRect"](t, e);
  };
}
function qt(e, t) {
  return e = Zt(e), function (n) {
    var r = null != t ? t : n,
      i = r ? e.width : e.height,
      o = r ? e.x : e.y;
    return [o, o + (i || 0)];
  };
}
function Kt(e, t, n) {
  var r = Zt(e);
  return function (e, i) {
    return r.contain(i[0], i[1]) && !Ut(e, t, n);
  };
}
function Zt(e) {
  return Gt["a"].create(e);
}
var Xt = ["grid", "xAxis", "yAxis", "geo", "graph", "polar", "radiusAxis", "angleAxis", "bmap"],
  Qt = function () {
    function e(e, t, n) {
      var r = this;
      this._targetInfoList = [];
      var i = Jt(t, e);
      Object(o["j"])(en, function (e, t) {
        (!n || !n.include || Object(o["p"])(n.include, t) >= 0) && e(i, r._targetInfoList);
      });
    }
    return e.prototype.setOutputRanges = function (e, t) {
      return this.matchOutputRanges(e, t, function (e, t, n) {
        if ((e.coordRanges || (e.coordRanges = [])).push(t), !e.coordRange) {
          e.coordRange = t;
          var r = rn[e.brushType](0, n, t);
          e.__rangeOffset = {
            offset: an[e.brushType](r.values, e.range, [1, 1]),
            xyMinMax: r.xyMinMax
          };
        }
      }), e;
    }, e.prototype.matchOutputRanges = function (e, t, n) {
      Object(o["j"])(e, function (e) {
        var r = this.findTargetInfo(e, t);
        r && !0 !== r && Object(o["j"])(r.coordSyses, function (r) {
          var i = rn[e.brushType](1, r, e.range, !0);
          n(e, i.values, r, t);
        });
      }, this);
    }, e.prototype.setInputRanges = function (e, t) {
      Object(o["j"])(e, function (e) {
        var n = this.findTargetInfo(e, t);
        if (e.range = e.range || [], n && !0 !== n) {
          e.panelId = n.panelId;
          var r = rn[e.brushType](0, n.coordSys, e.coordRange),
            i = e.__rangeOffset;
          e.range = i ? an[e.brushType](r.values, i.offset, ln(r.xyMinMax, i.xyMinMax)) : r.values;
        }
      }, this);
    }, e.prototype.makePanelOpts = function (e, t) {
      return Object(o["D"])(this._targetInfoList, function (n) {
        var r = n.getPanelRect();
        return {
          panelId: n.panelId,
          defaultBrushType: t ? t(n) : null,
          clipPath: Ht(r),
          isTargetByCursor: Kt(r, e, n.coordSysModel),
          getLinearBrushOtherExtent: qt(r)
        };
      });
    }, e.prototype.controlSeries = function (e, t, n) {
      var r = this.findTargetInfo(e, n);
      return !0 === r || r && Object(o["p"])(r.coordSyses, t.coordinateSystem) >= 0;
    }, e.prototype.findTargetInfo = function (e, t) {
      for (var n = this._targetInfoList, r = Jt(t, e), i = 0; i < n.length; i++) {
        var o = n[i],
          a = e.panelId;
        if (a) {
          if (o.panelId === a) return o;
        } else for (var s = 0; s < tn.length; s++) if (tn[s](r, o)) return o;
      }
      return !0;
    }, e;
  }();
function $t(e) {
  return e[0] > e[1] && e.reverse(), e;
}
function Jt(e, t) {
  return Object(d["q"])(e, t, {
    includeMainTypes: Xt
  });
}
var en = {
    grid: function (e, t) {
      var n = e.xAxisModels,
        r = e.yAxisModels,
        i = e.gridModels,
        a = Object(o["f"])(),
        s = {},
        l = {};
      (n || r || i) && (Object(o["j"])(n, function (e) {
        var t = e.axis.grid.model;
        a.set(t.id, t), s[t.id] = !0;
      }), Object(o["j"])(r, function (e) {
        var t = e.axis.grid.model;
        a.set(t.id, t), l[t.id] = !0;
      }), Object(o["j"])(i, function (e) {
        a.set(e.id, e), s[e.id] = !0, l[e.id] = !0;
      }), a.each(function (e) {
        var i = e.coordinateSystem,
          a = [];
        Object(o["j"])(i.getCartesians(), function (e, t) {
          (Object(o["p"])(n, e.getAxis("x").model) >= 0 || Object(o["p"])(r, e.getAxis("y").model) >= 0) && a.push(e);
        }), t.push({
          panelId: "grid--" + e.id,
          gridModel: e,
          coordSysModel: e,
          coordSys: a[0],
          coordSyses: a,
          getPanelRect: nn.grid,
          xAxisDeclared: s[e.id],
          yAxisDeclared: l[e.id]
        });
      }));
    },
    geo: function (e, t) {
      Object(o["j"])(e.geoModels, function (e) {
        var n = e.coordinateSystem;
        t.push({
          panelId: "geo--" + e.id,
          geoModel: e,
          coordSysModel: e,
          coordSys: n,
          coordSyses: [n],
          getPanelRect: nn.geo
        });
      });
    }
  },
  tn = [function (e, t) {
    var n = e.xAxisModel,
      r = e.yAxisModel,
      i = e.gridModel;
    return !i && n && (i = n.axis.grid.model), !i && r && (i = r.axis.grid.model), i && i === t.gridModel;
  }, function (e, t) {
    var n = e.geoModel;
    return n && n === t.geoModel;
  }],
  nn = {
    grid: function () {
      return this.coordSys.master.getRect().clone();
    },
    geo: function () {
      var e = this.coordSys,
        t = e.getBoundingRect().clone();
      return t.applyTransform(K["getTransform"](e)), t;
    }
  },
  rn = {
    lineX: Object(o["h"])(on, 0),
    lineY: Object(o["h"])(on, 1),
    rect: function (e, t, n, r) {
      var i = e ? t.pointToData([n[0][0], n[1][0]], r) : t.dataToPoint([n[0][0], n[1][0]], r),
        o = e ? t.pointToData([n[0][1], n[1][1]], r) : t.dataToPoint([n[0][1], n[1][1]], r),
        a = [$t([i[0], o[0]]), $t([i[1], o[1]])];
      return {
        values: a,
        xyMinMax: a
      };
    },
    polygon: function (e, t, n, r) {
      var i = [[1 / 0, -1 / 0], [1 / 0, -1 / 0]],
        a = Object(o["D"])(n, function (n) {
          var o = e ? t.pointToData(n, r) : t.dataToPoint(n, r);
          return i[0][0] = Math.min(i[0][0], o[0]), i[1][0] = Math.min(i[1][0], o[1]), i[0][1] = Math.max(i[0][1], o[0]), i[1][1] = Math.max(i[1][1], o[1]), o;
        });
      return {
        values: a,
        xyMinMax: i
      };
    }
  };
function on(e, t, n, r) {
  var i = n.getAxis(["x", "y"][e]),
    a = $t(Object(o["D"])([0, 1], function (e) {
      return t ? i.coordToData(i.toLocalCoord(r[e]), !0) : i.toGlobalCoord(i.dataToCoord(r[e]));
    })),
    s = [];
  return s[e] = a, s[1 - e] = [NaN, NaN], {
    values: a,
    xyMinMax: s
  };
}
var an = {
  lineX: Object(o["h"])(sn, 0),
  lineY: Object(o["h"])(sn, 1),
  rect: function (e, t, n) {
    return [[e[0][0] - n[0] * t[0][0], e[0][1] - n[0] * t[0][1]], [e[1][0] - n[1] * t[1][0], e[1][1] - n[1] * t[1][1]]];
  },
  polygon: function (e, t, n) {
    return Object(o["D"])(e, function (e, r) {
      return [e[0] - n[0] * t[r][0], e[1] - n[1] * t[r][1]];
    });
  }
};
function sn(e, t, n, r) {
  return [t[0] - r[e] * n[0], t[1] - r[e] * n[1]];
}
function ln(e, t) {
  var n = un(e),
    r = un(t),
    i = [n[0] / r[0], n[1] / r[1]];
  return isNaN(i[0]) && (i[0] = 1), isNaN(i[1]) && (i[1] = 1), i;
}
function un(e) {
  return e ? [e[0][1] - e[0][0], e[1][1] - e[1][0]] : [NaN, NaN];
}
var cn = Qt,
  fn = require("./4c783943.js"),
  dn = o["j"],
  hn = Object(d["n"])("toolbox-dataZoom_"),
  pn = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }
    return Object(i["a"])(t, e), t.prototype.render = function (e, t, n, r) {
      this._brushController || (this._brushController = new Vt(n.getZr()), this._brushController.on("brush", o["c"](this._onBrush, this)).mount()), yn(e, t, this, r, n), vn(e, t);
    }, t.prototype.onclick = function (e, t, n) {
      gn[n].call(this);
    }, t.prototype.remove = function (e, t) {
      this._brushController && this._brushController.unmount();
    }, t.prototype.dispose = function (e, t) {
      this._brushController && this._brushController.dispose();
    }, t.prototype._onBrush = function (e) {
      var t = e.areas;
      if (e.isEnd && t.length) {
        var n = {},
          r = this.ecModel;
        this._brushController.updateCovers([]);
        var i = new cn(mn(this.model), r, {
          include: ["grid"]
        });
        i.matchOutputRanges(t, r, function (e, t, n) {
          if ("cartesian2d" === n.type) {
            var r = e.brushType;
            "rect" === r ? (o("x", n, t[0]), o("y", n, t[1])) : o({
              lineX: "x",
              lineY: "y"
            }[r], n, t);
          }
        }), De(r, n), this._dispatchZoomAction(n);
      }
      function o(e, t, i) {
        var o = t.getAxis(e),
          s = o.model,
          l = a(e, s, r),
          u = l.findRepresentativeAxisProxy(s).getMinMaxSpan();
        null == u.minValueSpan && null == u.maxValueSpan || (i = k(0, i.slice(), o.scale.getExtent(), 0, u.minValueSpan, u.maxValueSpan)), l && (n[l.id] = {
          dataZoomId: l.id,
          startValue: i[0],
          endValue: i[1]
        });
      }
      function a(e, t, n) {
        var r;
        return n.eachComponent({
          mainType: "dataZoom",
          subType: "select"
        }, function (n) {
          var i = n.getAxisModel(e, t.componentIndex);
          i && (r = n);
        }), r;
      }
    }, t.prototype._dispatchZoomAction = function (e) {
      var t = [];
      dn(e, function (e, n) {
        t.push(o["d"](e));
      }), t.length && this.api.dispatchAction({
        type: "dataZoom",
        from: this.uid,
        batch: t
      });
    }, t.getDefaultOption = function (e) {
      var t = {
        show: !0,
        filterMode: "filter",
        icon: {
          zoom: "M0,13.5h26.9 M13.5,26.9V0 M32.1,13.5H58V58H13.5 V32.1",
          back: "M22,1.4L9.9,13.5l12.3,12.3 M10.3,13.5H54.9v44.6 H10.3v-26"
        },
        title: e.getLocaleModel().get(["toolbox", "dataZoom", "title"]),
        brushStyle: {
          borderWidth: 0,
          color: "rgba(210,219,238,0.2)"
        }
      };
      return t;
    }, t;
  }(Y),
  gn = {
    zoom: function () {
      var e = !this._isZoomActive;
      this.api.dispatchAction({
        type: "takeGlobalCursor",
        key: "dataZoomSelect",
        dataZoomSelectActive: e
      });
    },
    back: function () {
      this._dispatchZoomAction(Ae(this.ecModel));
    }
  };
function mn(e) {
  var t = {
    xAxisIndex: e.get("xAxisIndex", !0),
    yAxisIndex: e.get("yAxisIndex", !0),
    xAxisId: e.get("xAxisId", !0),
    yAxisId: e.get("yAxisId", !0)
  };
  return null == t.xAxisIndex && null == t.xAxisId && (t.xAxisIndex = "all"), null == t.yAxisIndex && null == t.yAxisId && (t.yAxisIndex = "all"), t;
}
function vn(e, t) {
  e.setIconStatus("back", Pe(t) > 1 ? "emphasis" : "normal");
}
function yn(e, t, n, r, i) {
  var o = n._isZoomActive;
  r && "takeGlobalCursor" === r.type && (o = "dataZoomSelect" === r.key && r.dataZoomSelectActive), n._isZoomActive = o, e.setIconStatus("zoom", o ? "emphasis" : "normal");
  var a = new cn(mn(e), t, {
      include: ["grid"]
    }),
    s = a.makePanelOpts(i, function (e) {
      return e.xAxisDeclared && !e.yAxisDeclared ? "lineX" : !e.xAxisDeclared && e.yAxisDeclared ? "lineY" : "rect";
    });
  n._brushController.setPanels(s).enableBrush(!(!o || !s.length) && {
    brushType: "auto",
    brushStyle: e.getModel("brushStyle").getItemStyle()
  });
}
Object(fn["b"])("dataZoom", function (e) {
  var t = e.getComponent("toolbox", 0),
    n = ["feature", "dataZoom"];
  if (t && null != t.get(n)) {
    var r = t.getModel(n),
      i = [],
      o = mn(r),
      a = Object(d["q"])(e, o);
    return dn(a.xAxisModels, function (e) {
      return s(e, "xAxis", "xAxisIndex");
    }), dn(a.yAxisModels, function (e) {
      return s(e, "yAxis", "yAxisIndex");
    }), i;
  }
  function s(e, t, n) {
    var o = e.componentIndex,
      a = {
        type: "select",
        $fromToolbox: !0,
        filterMode: r.get("filterMode", !0) || "filter",
        id: hn + t + o
      };
    a[n] = o, i.push(a);
  }
});
var bn = pn;
function xn(e) {
  e.registerComponentModel(H), e.registerComponentView(re), G("saveAsImage", ae), G("magicType", de), G("dataView", Ce), G("dataZoom", bn), G("restore", Re), Object(r["a"])(B);
}
defineExport(legacyExports, "a", function () {
  return xn;
});
