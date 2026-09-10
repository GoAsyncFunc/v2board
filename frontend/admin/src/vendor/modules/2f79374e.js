let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "b", function () {
  return f;
}), defineExport(legacyExports, "d", function () {
  return p;
}), defineExport(legacyExports, "c", function () {
  return g;
}), defineExport(legacyExports, "a", function () {
  return m;
}), defineExport(legacyExports, "e", function () {
  return v;
}), defineExport(legacyExports, "f", function () {
  return y;
});
var r = require("./62597459.js"),
  i = require("./49776253.js"),
  o = require("./36477258.js"),
  a = require("./37614b42.js"),
  s = require("./466f6678.js"),
  l = require("./6158377a.js"),
  u = require("./2b72496d.js"),
  c = require("./65446668.js");
function f(e) {
  var t,
    n = e.get("type"),
    r = e.getModel(n + "Style");
  return "line" === n ? (t = r.getLineStyle(), t.fill = null) : "shadow" === n && (t = r.getAreaStyle(), t.stroke = null), t;
}
function d(e, t, n, r, i) {
  var s = n.get("value"),
    l = p(s, t.axis, t.ecModel, n.get("seriesDataIndices"), {
      precision: n.get(["label", "precision"]),
      formatter: n.get(["label", "formatter"])
    }),
    u = n.getModel("label"),
    f = a["f"](u.get("padding") || 0),
    d = u.getFont(),
    g = o["d"](l, d),
    m = i.position,
    v = g.width + f[1] + f[3],
    y = g.height + f[0] + f[2],
    b = i.align;
  "right" === b && (m[0] -= v), "center" === b && (m[0] -= v / 2);
  var x = i.verticalAlign;
  "bottom" === x && (m[1] -= y), "middle" === x && (m[1] -= y / 2), h(m, v, y, r);
  var _ = u.get("backgroundColor");
  _ && "auto" !== _ || (_ = t.get(["axisLine", "lineStyle", "color"])), e.label = {
    x: m[0],
    y: m[1],
    style: Object(c["a"])(u, {
      text: l,
      font: d,
      fill: u.getTextColor(),
      padding: f,
      backgroundColor: _
    }),
    z2: 10
  };
}
function h(e, t, n, r) {
  var i = r.getWidth(),
    o = r.getHeight();
  e[0] = Math.min(e[0] + t, i) - t, e[1] = Math.min(e[1] + n, o) - n, e[0] = Math.max(e[0], 0), e[1] = Math.max(e[1], 0);
}
function p(e, t, n, i, o) {
  e = t.scale.parse(e);
  var a = t.scale.getLabel({
      value: e
    }, {
      precision: o.precision
    }),
    s = o.formatter;
  if (s) {
    var u = {
      value: l["c"](t, {
        value: e
      }),
      axisDimension: t.dim,
      axisIndex: t.index,
      seriesData: []
    };
    r["j"](i, function (e) {
      var t = n.getSeriesByIndex(e.seriesIndex),
        r = e.dataIndexInside,
        i = t && t.getDataParams(r);
      i && u.seriesData.push(i);
    }), r["y"](s) ? a = s.replace("{value}", a) : r["u"](s) && (a = s(u));
  }
  return a;
}
function g(e, t, n) {
  var r = s["b"]();
  return s["f"](r, r, n.rotation), s["h"](r, r, n.position), i["applyTransform"]([e.dataToCoord(t), (n.labelOffset || 0) + (n.labelDirection || 1) * (n.labelMargin || 0)], r);
}
function m(e, t, n, r, i, o) {
  var a = u["a"].innerTextLayout(n.rotation, 0, n.labelDirection);
  n.labelMargin = i.get(["label", "margin"]), d(t, r, i, o, {
    position: g(r.axis, e, n),
    align: a.textAlign,
    verticalAlign: a.textVerticalAlign
  });
}
function v(e, t, n) {
  return n = n || 0, {
    x1: e[n],
    y1: e[1 - n],
    x2: t[n],
    y2: t[1 - n]
  };
}
function y(e, t, n) {
  return n = n || 0, {
    x: e[n],
    y: e[1 - n],
    width: t[n],
    height: t[1 - n]
  };
}
