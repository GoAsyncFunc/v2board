let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "c", function () {
  return o;
}), defineExport(legacyExports, "b", function () {
  return a;
}), defineExport(legacyExports, "a", function () {
  return s;
});
var r = require("./62597459.js"),
  i = require("./344e4f34.js");
function o(e, t, n) {
  n = n || {};
  var i = e.coordinateSystem,
    o = t.axis,
    a = {},
    s = o.getAxesOnZeroOf()[0],
    l = o.position,
    u = s ? "onZero" : l,
    c = o.dim,
    f = i.getRect(),
    d = [f.x, f.x + f.width, f.y, f.y + f.height],
    h = {
      left: 0,
      right: 1,
      top: 0,
      bottom: 1,
      onZero: 2
    },
    p = t.get("offset") || 0,
    g = "x" === c ? [d[2] - p, d[3] + p] : [d[0] - p, d[1] + p];
  if (s) {
    var m = s.toGlobalCoord(s.dataToCoord(0));
    g[h.onZero] = Math.max(Math.min(m, g[1]), g[0]);
  }
  a.position = ["y" === c ? g[h[u]] : d[0], "x" === c ? g[h[u]] : d[3]], a.rotation = Math.PI / 2 * ("x" === c ? 0 : 1);
  var v = {
    top: -1,
    bottom: 1,
    left: -1,
    right: 1
  };
  a.labelDirection = a.tickDirection = a.nameDirection = v[l], a.labelOffset = s ? g[h[l]] - g[h.onZero] : 0, t.get(["axisTick", "inside"]) && (a.tickDirection = -a.tickDirection), r["J"](n.labelInside, t.get(["axisLabel", "inside"])) && (a.labelDirection = -a.labelDirection);
  var y = t.get(["axisLabel", "rotate"]);
  return a.labelRotate = "top" === u ? -y : y, a.z2 = 1, a;
}
function a(e) {
  return "cartesian2d" === e.get("coordinateSystem");
}
function s(e) {
  var t = {
    xAxisModel: null,
    yAxisModel: null
  };
  return r["j"](t, function (n, r) {
    var o = r.replace(/Model$/, ""),
      a = e.getReferringComponents(o, i["b"]).models[0];
    t[r] = a;
  }), t;
}
