let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return o;
}), defineExport(legacyExports, "b", function () {
  return f;
}), defineExport(legacyExports, "c", function () {
  return d;
}), defineExport(legacyExports, "d", function () {
  return h;
}), defineExport(legacyExports, "e", function () {
  return g;
});
var r = require("./51786b74.js"),
  i = require("./62597459.js");
function o(e, t) {
  var n = {
    axesInfo: {},
    seriesInvolved: !1,
    coordSysAxesInfo: {},
    coordSysMap: {}
  };
  return a(n, e, t), n.seriesInvolved && l(n, e), n;
}
function a(e, t, n) {
  var r = t.getComponent("tooltip"),
    o = t.getComponent("axisPointer"),
    a = o.get("link", !0) || [],
    l = [];
  Object(i["j"])(n.getCoordinateSystems(), function (n) {
    if (n.axisPointerEnabled) {
      var c = g(n.model),
        f = e.coordSysAxesInfo[c] = {};
      e.coordSysMap[c] = n;
      var d = n.model,
        h = d.getModel("tooltip", r);
      if (Object(i["j"])(n.getAxes(), Object(i["h"])(b, !1, null)), n.getTooltipAxes && r && h.get("show")) {
        var m = "axis" === h.get("trigger"),
          v = "cross" === h.get(["axisPointer", "type"]),
          y = n.getTooltipAxes(h.get(["axisPointer", "axis"]));
        (m || v) && Object(i["j"])(y.baseAxes, Object(i["h"])(b, !v || "cross", m)), v && Object(i["j"])(y.otherAxes, Object(i["h"])(b, "cross", !1));
      }
    }
    function b(r, i, c) {
      var d = c.model.getModel("axisPointer", o),
        m = d.get("show");
      if (m && ("auto" !== m || r || p(d))) {
        null == i && (i = d.get("triggerTooltip")), d = r ? s(c, h, o, t, r, i) : d;
        var v = d.get("snap"),
          y = g(c.model),
          b = i || v || "category" === c.type,
          x = e.axesInfo[y] = {
            key: y,
            axis: c,
            coordSys: n,
            axisPointerModel: d,
            triggerTooltip: i,
            involveSeries: b,
            snap: v,
            useHandle: p(d),
            seriesModels: [],
            linkGroup: null
          };
        f[y] = x, e.seriesInvolved = e.seriesInvolved || b;
        var _ = u(a, c);
        if (null != _) {
          var w = l[_] || (l[_] = {
            axesInfo: {}
          });
          w.axesInfo[y] = x, w.mapper = a[_].mapper, x.linkGroup = w;
        }
      }
    }
  });
}
function s(e, t, n, o, a, s) {
  var l = t.getModel("axisPointer"),
    u = ["type", "snap", "lineStyle", "shadowStyle", "label", "animation", "animationDurationUpdate", "animationEasingUpdate", "z"],
    c = {};
  Object(i["j"])(u, function (e) {
    c[e] = Object(i["d"])(l.get(e));
  }), c.snap = "category" !== e.type && !!s, "cross" === l.get("type") && (c.type = "line");
  var f = c.label || (c.label = {});
  if (null == f.show && (f.show = !1), "cross" === a) {
    var d = l.get(["label", "show"]);
    if (f.show = null == d || d, !s) {
      var h = c.lineStyle = l.get("crossStyle");
      h && Object(i["i"])(f, h.textStyle);
    }
  }
  return e.model.getModel("axisPointer", new r["a"](c, n, o));
}
function l(e, t) {
  t.eachSeries(function (t) {
    var n = t.coordinateSystem,
      r = t.get(["tooltip", "trigger"], !0),
      o = t.get(["tooltip", "show"], !0);
    n && "none" !== r && !1 !== r && "item" !== r && !1 !== o && !1 !== t.get(["axisPointer", "show"], !0) && Object(i["j"])(e.coordSysAxesInfo[g(n.model)], function (e) {
      var r = e.axis;
      n.getAxis(r.dim) === r && (e.seriesModels.push(t), null == e.seriesDataCount && (e.seriesDataCount = 0), e.seriesDataCount += t.getData().count());
    });
  });
}
function u(e, t) {
  for (var n = t.model, r = t.dim, i = 0; i < e.length; i++) {
    var o = e[i] || {};
    if (c(o[r + "AxisId"], n.id) || c(o[r + "AxisIndex"], n.componentIndex) || c(o[r + "AxisName"], n.name)) return i;
  }
}
function c(e, t) {
  return "all" === e || Object(i["r"])(e) && Object(i["p"])(e, t) >= 0 || e === t;
}
function f(e) {
  var t = d(e);
  if (t) {
    var n = t.axisPointerModel,
      r = t.axis.scale,
      i = n.option,
      o = n.get("status"),
      a = n.get("value");
    null != a && (a = r.parse(a));
    var s = p(n);
    null == o && (i.status = s ? "show" : "hide");
    var l = r.getExtent().slice();
    l[0] > l[1] && l.reverse(), (null == a || a > l[1]) && (a = l[1]), a < l[0] && (a = l[0]), i.value = a, s && (i.status = t.axis.scale.isBlank() ? "hide" : "show");
  }
}
function d(e) {
  var t = (e.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;
  return t && t.axesInfo[g(e)];
}
function h(e) {
  var t = d(e);
  return t && t.axisPointerModel;
}
function p(e) {
  return !!e.get(["handle", "show"]);
}
function g(e) {
  return e.type + "||" + e.id;
}
