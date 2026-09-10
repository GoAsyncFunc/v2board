let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
var r = require("./5a6e6b62.js"),
  i = require("./6d725347.js"),
  o = require("./62597459.js"),
  a = require("./4c63584c.js"),
  s = require("./49776253.js"),
  l = require("./64715547.js"),
  u = require("./33736f46.js"),
  c = require("./7a544d70.js"),
  f = require("./59483231.js"),
  d = require("./694c4e76.js"),
  h = require("./344e4f34.js"),
  p = Object(h["m"])(),
  g = o["d"],
  m = o["c"],
  v = function () {
    function e() {
      this._dragging = !1, this.animationThreshold = 15;
    }
    return e.prototype.render = function (e, t, n, r) {
      var i = t.get("value"),
        s = t.get("status");
      if (this._axisModel = e, this._axisPointerModel = t, this._api = n, r || this._lastValue !== i || this._lastStatus !== s) {
        this._lastValue = i, this._lastStatus = s;
        var l = this._group,
          u = this._handle;
        if (!s || "hide" === s) return l && l.hide(), void (u && u.hide());
        l && l.show(), u && u.show();
        var c = {};
        this.makeElOption(c, i, e, t, n);
        var f = c.graphicKey;
        f !== this._lastGraphicKey && this.clear(n), this._lastGraphicKey = f;
        var d = this._moveAnimation = this.determineAnimation(e, t);
        if (l) {
          var h = o["h"](y, t, d);
          this.updatePointerEl(l, c, h), this.updateLabelEl(l, c, h, t);
        } else l = this._group = new a["a"](), this.createPointerEl(l, c, e, t), this.createLabelEl(l, c, e, t), n.getZr().add(l);
        w(l, t, !0), this._renderHandle(i);
      }
    }, e.prototype.remove = function (e) {
      this.clear(e);
    }, e.prototype.dispose = function (e) {
      this.clear(e);
    }, e.prototype.determineAnimation = function (e, t) {
      var n = t.get("animation"),
        r = e.axis,
        i = "category" === r.type,
        o = t.get("snap");
      if (!o && !i) return !1;
      if ("auto" === n || null == n) {
        var a = this.animationThreshold;
        if (i && r.getBandWidth() > a) return !0;
        if (o) {
          var s = c["c"](e).seriesDataCount,
            l = r.getExtent();
          return Math.abs(l[0] - l[1]) / s > a;
        }
        return !1;
      }
      return !0 === n;
    }, e.prototype.makeElOption = function (e, t, n, r, i) {}, e.prototype.createPointerEl = function (e, t, n, r) {
      var i = t.pointer;
      if (i) {
        var o = p(e).pointerEl = new s[i.type](g(t.pointer));
        e.add(o);
      }
    }, e.prototype.createLabelEl = function (e, t, n, r) {
      if (t.label) {
        var i = p(e).labelEl = new l["a"](g(t.label));
        e.add(i), x(i, r);
      }
    }, e.prototype.updatePointerEl = function (e, t, n) {
      var r = p(e).pointerEl;
      r && t.pointer && (r.setStyle(t.pointer.style), n(r, {
        shape: t.pointer.shape
      }));
    }, e.prototype.updateLabelEl = function (e, t, n, r) {
      var i = p(e).labelEl;
      i && (i.setStyle(t.label.style), n(i, {
        x: t.label.x,
        y: t.label.y
      }), x(i, r));
    }, e.prototype._renderHandle = function (e) {
      if (!this._dragging && this.updateHandleTransform) {
        var t,
          n = this._axisPointerModel,
          r = this._api.getZr(),
          i = this._handle,
          a = n.getModel("handle"),
          l = n.get("status");
        if (!a.get("show") || !l || "hide" === l) return i && r.remove(i), void (this._handle = null);
        this._handle || (t = !0, i = this._handle = s["createIcon"](a.get("icon"), {
          cursor: "move",
          draggable: !0,
          onmousemove: function (e) {
            f["f"](e.event);
          },
          onmousedown: m(this._onHandleDragMove, this, 0, 0),
          drift: m(this._onHandleDragMove, this),
          ondragend: m(this._onHandleDragEnd, this)
        }), r.add(i)), w(i, n, !1), i.setStyle(a.getItemStyle(null, ["color", "borderColor", "borderWidth", "opacity", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"]));
        var u = a.get("size");
        o["r"](u) || (u = [u, u]), i.scaleX = u[0] / 2, i.scaleY = u[1] / 2, d["b"](this, "_doDispatchAxisPointer", a.get("throttle") || 0, "fixRate"), this._moveHandleToValue(e, t);
      }
    }, e.prototype._moveHandleToValue = function (e, t) {
      y(this._axisPointerModel, !t && this._moveAnimation, this._handle, _(this.getHandleTransform(e, this._axisModel, this._axisPointerModel)));
    }, e.prototype._onHandleDragMove = function (e, t) {
      var n = this._handle;
      if (n) {
        this._dragging = !0;
        var r = this.updateHandleTransform(_(n), [e, t], this._axisModel, this._axisPointerModel);
        this._payloadInfo = r, n.stopAnimation(), n.attr(_(r)), p(n).lastProp = null, this._doDispatchAxisPointer();
      }
    }, e.prototype._doDispatchAxisPointer = function () {
      var e = this._handle;
      if (e) {
        var t = this._payloadInfo,
          n = this._axisModel;
        this._api.dispatchAction({
          type: "updateAxisPointer",
          x: t.cursorPoint[0],
          y: t.cursorPoint[1],
          tooltipOption: t.tooltipOption,
          axesInfo: [{
            axisDim: n.axis.dim,
            axisIndex: n.componentIndex
          }]
        });
      }
    }, e.prototype._onHandleDragEnd = function () {
      this._dragging = !1;
      var e = this._handle;
      if (e) {
        var t = this._axisPointerModel.get("value");
        this._moveHandleToValue(t), this._api.dispatchAction({
          type: "hideTip"
        });
      }
    }, e.prototype.clear = function (e) {
      this._lastValue = null, this._lastStatus = null;
      var t = e.getZr(),
        n = this._group,
        r = this._handle;
      t && n && (this._lastGraphicKey = null, n && t.remove(n), r && t.remove(r), this._group = null, this._handle = null, this._payloadInfo = null), d["a"](this, "_doDispatchAxisPointer");
    }, e.prototype.doClear = function () {}, e.prototype.buildLabel = function (e, t, n) {
      return n = n || 0, {
        x: e[n],
        y: e[1 - n],
        width: t[n],
        height: t[1 - n]
      };
    }, e;
  }();
function y(e, t, n, r) {
  b(p(n).lastProp, r) || (p(n).lastProp = r, t ? u["h"](n, r, e) : (n.stopAnimation(), n.attr(r)));
}
function b(e, t) {
  if (o["x"](e) && o["x"](t)) {
    var n = !0;
    return o["j"](t, function (t, r) {
      n = n && b(e[r], t);
    }), !!n;
  }
  return e === t;
}
function x(e, t) {
  e[t.get(["label", "show"]) ? "show" : "hide"]();
}
function _(e) {
  return {
    x: e.x || 0,
    y: e.y || 0,
    rotation: e.rotation || 0
  };
}
function w(e, t, n) {
  var r = t.get("z"),
    i = t.get("zlevel");
  e && e.traverse(function (e) {
    "group" !== e.type && (null != r && (e.z = r), null != i && (e.zlevel = i), e.silent = n);
  });
}
var O = v,
  S = require("./2f79374e.js"),
  k = require("./41565a47.js"),
  j = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }
    return Object(i["a"])(t, e), t.prototype.makeElOption = function (e, t, n, r, i) {
      var o = n.axis,
        a = o.grid,
        s = r.get("type"),
        l = M(a, o).getOtherAxis(o).getGlobalExtent(),
        u = o.toGlobalCoord(o.dataToCoord(t, !0));
      if (s && "none" !== s) {
        var c = S["b"](r),
          f = C[s](o, u, l);
        f.style = c, e.graphicKey = f.type, e.pointer = f;
      }
      var d = k["c"](a.model, n);
      S["a"](t, e, d, n, r, i);
    }, t.prototype.getHandleTransform = function (e, t, n) {
      var r = k["c"](t.axis.grid.model, t, {
        labelInside: !1
      });
      r.labelMargin = n.get(["handle", "margin"]);
      var i = S["c"](t.axis, e, r);
      return {
        x: i[0],
        y: i[1],
        rotation: r.rotation + (r.labelDirection < 0 ? Math.PI : 0)
      };
    }, t.prototype.updateHandleTransform = function (e, t, n, r) {
      var i = n.axis,
        o = i.grid,
        a = i.getGlobalExtent(!0),
        s = M(o, i).getOtherAxis(i).getGlobalExtent(),
        l = "x" === i.dim ? 0 : 1,
        u = [e.x, e.y];
      u[l] += t[l], u[l] = Math.min(a[1], u[l]), u[l] = Math.max(a[0], u[l]);
      var c = (s[1] + s[0]) / 2,
        f = [c, c];
      f[l] = u[l];
      var d = [{
        verticalAlign: "middle"
      }, {
        align: "center"
      }];
      return {
        x: u[0],
        y: u[1],
        rotation: e.rotation,
        cursorPoint: f,
        tooltipOption: d[l]
      };
    }, t;
  }(O);
function M(e, t) {
  var n = {};
  return n[t.dim + "AxisIndex"] = t.index, e.getCartesian(n);
}
var C = {
  line: function (e, t, n) {
    var r = S["e"]([t, n[0]], [t, n[1]], T(e));
    return {
      type: "Line",
      subPixelOptimize: !0,
      shape: r
    };
  },
  shadow: function (e, t, n) {
    var r = Math.max(1, e.getBandWidth()),
      i = n[1] - n[0];
    return {
      type: "Rect",
      shape: S["f"]([t - r / 2, n[0]], [r, i], T(e))
    };
  }
};
function T(e) {
  return "x" === e.dim ? 0 : 1;
}
var I = j,
  D = require("./624c6677.js"),
  A = function (e) {
    function t() {
      var n = null !== e && e.apply(this, arguments) || this;
      return n.type = t.type, n;
    }
    return Object(i["a"])(t, e), t.type = "axisPointer", t.defaultOption = {
      show: "auto",
      z: 50,
      type: "line",
      snap: !1,
      triggerTooltip: !0,
      value: null,
      status: null,
      link: [],
      animation: null,
      animationDurationUpdate: 200,
      lineStyle: {
        color: "#B9BEC9",
        width: 1,
        type: "dashed"
      },
      shadowStyle: {
        color: "rgba(210,219,238,0.2)"
      },
      label: {
        show: !0,
        formatter: null,
        precision: "auto",
        margin: 3,
        color: "#fff",
        padding: [5, 7, 5, 7],
        backgroundColor: "auto",
        borderColor: null,
        borderWidth: 0,
        borderRadius: 3
      },
      handle: {
        show: !1,
        icon: "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z",
        size: 45,
        margin: 50,
        color: "#333",
        shadowBlur: 3,
        shadowColor: "#aaa",
        shadowOffsetX: 0,
        shadowOffsetY: 2,
        throttle: 40
      }
    }, t;
  }(D["a"]),
  E = A,
  P = require("./46396247.js"),
  L = require("./73532f72.js"),
  N = function (e) {
    function t() {
      var n = null !== e && e.apply(this, arguments) || this;
      return n.type = t.type, n;
    }
    return Object(i["a"])(t, e), t.prototype.render = function (e, t, n) {
      var r = t.getComponent("tooltip"),
        i = e.get("triggerOn") || r && r.get("triggerOn") || "mousemove|click";
      P["a"]("axisPointer", n, function (e, t, n) {
        "none" !== i && ("leave" === e || i.indexOf(e) >= 0) && n({
          type: "updateAxisPointer",
          currTrigger: e,
          x: t && t.offsetX,
          y: t && t.offsetY
        });
      });
    }, t.prototype.remove = function (e, t) {
      P["b"]("axisPointer", t);
    }, t.prototype.dispose = function (e, t) {
      P["b"]("axisPointer", t);
    }, t.type = "axisPointer", t;
  }(L["a"]),
  R = N,
  z = require("./457a3244.js"),
  F = Object(h["m"])();
function B(e, t, n) {
  var r = e.currTrigger,
    i = [e.x, e.y],
    a = e,
    s = e.dispatchAction || Object(o["c"])(n.dispatchAction, n),
    l = t.getComponent("axisPointer").coordSysAxesInfo;
  if (l) {
    X(i) && (i = Object(z["a"])({
      seriesIndex: a.seriesIndex,
      dataIndex: a.dataIndex
    }, t).point);
    var u = X(i),
      c = a.axesInfo,
      f = l.axesInfo,
      d = "leave" === r || X(i),
      h = {},
      p = {},
      g = {
        list: [],
        map: {}
      },
      m = {
        showPointer: Object(o["h"])(G, p),
        showTooltip: Object(o["h"])(W, g)
      };
    Object(o["j"])(l.coordSysMap, function (e, t) {
      var n = u || e.containPoint(i);
      Object(o["j"])(l.coordSysAxesInfo[t], function (e, t) {
        var r = e.axis,
          o = K(c, e);
        if (!d && n && (!c || o)) {
          var a = o && o.value;
          null != a || u || (a = r.pointToData(i)), null != a && Y(e, a, m, !1, h);
        }
      });
    });
    var v = {};
    return Object(o["j"])(f, function (e, t) {
      var n = e.linkGroup;
      n && !p[t] && Object(o["j"])(n.axesInfo, function (t, r) {
        var i = p[r];
        if (t !== e && i) {
          var o = i.value;
          n.mapper && (o = e.axis.scale.parse(n.mapper(o, Z(t), Z(e)))), v[e.key] = o;
        }
      });
    }), Object(o["j"])(v, function (e, t) {
      Y(f[t], e, m, !0, h);
    }), U(p, f, h), H(g, i, e, s), q(f, s, n), h;
  }
}
function Y(e, t, n, r, i) {
  var a = e.axis;
  if (!a.scale.isBlank() && a.containData(t)) if (e.involveSeries) {
    var s = V(t, e),
      l = s.payloadBatch,
      u = s.snapToValue;
    l[0] && null == i.seriesIndex && Object(o["l"])(i, l[0]), !r && e.snap && a.containData(u) && null != u && (t = u), n.showPointer(e, t, l), n.showTooltip(e, s, u);
  } else n.showPointer(e, t);
}
function V(e, t) {
  var n = t.axis,
    r = n.dim,
    i = e,
    a = [],
    s = Number.MAX_VALUE,
    l = -1;
  return Object(o["j"])(t.seriesModels, function (t, u) {
    var c,
      f,
      d = t.getData().mapDimensionsAll(r);
    if (t.getAxisTooltipData) {
      var h = t.getAxisTooltipData(d, e, n);
      f = h.dataIndices, c = h.nestestValue;
    } else {
      if (f = t.getData().indicesOfNearest(d[0], e, "category" === n.type ? .5 : null), !f.length) return;
      c = t.getData().get(d[0], f[0]);
    }
    if (null != c && isFinite(c)) {
      var p = e - c,
        g = Math.abs(p);
      g <= s && ((g < s || p >= 0 && l < 0) && (s = g, l = p, i = c, a.length = 0), Object(o["j"])(f, function (e) {
        a.push({
          seriesIndex: t.seriesIndex,
          dataIndexInside: e,
          dataIndex: t.getData().getRawIndex(e)
        });
      }));
    }
  }), {
    payloadBatch: a,
    snapToValue: i
  };
}
function G(e, t, n, r) {
  e[t.key] = {
    value: n,
    payloadBatch: r
  };
}
function W(e, t, n, r) {
  var i = n.payloadBatch,
    o = t.axis,
    a = o.model,
    s = t.axisPointerModel;
  if (t.triggerTooltip && i.length) {
    var l = t.coordSys.model,
      u = c["e"](l),
      f = e.map[u];
    f || (f = e.map[u] = {
      coordSysId: l.id,
      coordSysIndex: l.componentIndex,
      coordSysType: l.type,
      coordSysMainType: l.mainType,
      dataByAxis: []
    }, e.list.push(f)), f.dataByAxis.push({
      axisDim: o.dim,
      axisIndex: a.componentIndex,
      axisType: a.type,
      axisId: a.id,
      value: r,
      valueLabelOpt: {
        precision: s.get(["label", "precision"]),
        formatter: s.get(["label", "formatter"])
      },
      seriesDataIndices: i.slice()
    });
  }
}
function U(e, t, n) {
  var r = n.axesInfo = [];
  Object(o["j"])(t, function (t, n) {
    var i = t.axisPointerModel.option,
      o = e[n];
    o ? (!t.useHandle && (i.status = "show"), i.value = o.value, i.seriesDataIndices = (o.payloadBatch || []).slice()) : !t.useHandle && (i.status = "hide"), "show" === i.status && r.push({
      axisDim: t.axis.dim,
      axisIndex: t.axis.model.componentIndex,
      value: i.value
    });
  });
}
function H(e, t, n, r) {
  if (!X(t) && e.list.length) {
    var i = ((e.list[0].dataByAxis[0] || {}).seriesDataIndices || [])[0] || {};
    r({
      type: "showTip",
      escapeConnect: !0,
      x: t[0],
      y: t[1],
      tooltipOption: n.tooltipOption,
      position: n.position,
      dataIndexInside: i.dataIndexInside,
      dataIndex: i.dataIndex,
      seriesIndex: i.seriesIndex,
      dataByCoordSys: e.list
    });
  } else r({
    type: "hideTip"
  });
}
function q(e, t, n) {
  var r = n.getZr(),
    i = "axisPointerLastHighlights",
    a = F(r)[i] || {},
    s = F(r)[i] = {};
  Object(o["j"])(e, function (e, t) {
    var n = e.axisPointerModel.option;
    "show" === n.status && Object(o["j"])(n.seriesDataIndices, function (e) {
      var t = e.seriesIndex + " | " + e.dataIndex;
      s[t] = e;
    });
  });
  var l = [],
    u = [];
  Object(o["j"])(a, function (e, t) {
    !s[t] && u.push(e);
  }), Object(o["j"])(s, function (e, t) {
    !a[t] && l.push(e);
  }), u.length && n.dispatchAction({
    type: "downplay",
    escapeConnect: !0,
    notBlur: !0,
    batch: u
  }), l.length && n.dispatchAction({
    type: "highlight",
    escapeConnect: !0,
    notBlur: !0,
    batch: l
  });
}
function K(e, t) {
  for (var n = 0; n < (e || []).length; n++) {
    var r = e[n];
    if (t.axis.dim === r.axisDim && t.axis.model.componentIndex === r.axisIndex) return r;
  }
}
function Z(e) {
  var t = e.axis.model,
    n = {},
    r = n.axisDim = e.axis.dim;
  return n.axisIndex = n[r + "AxisIndex"] = t.componentIndex, n.axisName = n[r + "AxisName"] = t.name, n.axisId = n[r + "AxisId"] = t.id, n;
}
function X(e) {
  return !e || null == e[0] || isNaN(e[0]) || null == e[1] || isNaN(e[1]);
}
function Q(e) {
  r["a"].registerAxisPointerClass("CartesianAxisPointer", I), e.registerComponentModel(E), e.registerComponentView(R), e.registerPreprocessor(function (e) {
    if (e) {
      (!e.axisPointer || 0 === e.axisPointer.length) && (e.axisPointer = {});
      var t = e.axisPointer.link;
      t && !Object(o["r"])(t) && (e.axisPointer.link = [t]);
    }
  }), e.registerProcessor(e.PRIORITY.PROCESSOR.STATISTIC, function (e, t) {
    e.getComponent("axisPointer").coordSysAxesInfo = Object(c["a"])(e, t);
  }), e.registerAction({
    type: "updateAxisPointer",
    event: "updateAxisPointer",
    update: ":updateAxisPointer"
  }, B);
}
defineExport(legacyExports, "a", function () {
  return Q;
});
