let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return a;
});
var r = require("./62597459.js"),
  i = {
    average: function (e) {
      for (var t = 0, n = 0, r = 0; r < e.length; r++) isNaN(e[r]) || (t += e[r], n++);
      return 0 === n ? NaN : t / n;
    },
    sum: function (e) {
      for (var t = 0, n = 0; n < e.length; n++) t += e[n] || 0;
      return t;
    },
    max: function (e) {
      for (var t = -1 / 0, n = 0; n < e.length; n++) e[n] > t && (t = e[n]);
      return isFinite(t) ? t : NaN;
    },
    min: function (e) {
      for (var t = 1 / 0, n = 0; n < e.length; n++) e[n] < t && (t = e[n]);
      return isFinite(t) ? t : NaN;
    },
    nearest: function (e) {
      return e[0];
    }
  },
  o = function (e) {
    return Math.round(e.length / 2);
  };
function a(e) {
  return {
    seriesType: e,
    reset: function (e, t, n) {
      var a = e.getData(),
        s = e.get("sampling"),
        l = e.coordinateSystem,
        u = a.count();
      if (u > 10 && "cartesian2d" === l.type && s) {
        var c = l.getBaseAxis(),
          f = l.getOtherAxis(c),
          d = c.getExtent(),
          h = n.getDevicePixelRatio(),
          p = Math.abs(d[1] - d[0]) * (h || 1),
          g = Math.round(u / p);
        if (isFinite(g) && g > 1) {
          "lttb" === s && e.setData(a.lttbDownSample(a.mapDimension(f.dim), 1 / g));
          var m = void 0;
          Object(r["y"])(s) ? m = i[s] : Object(r["u"])(s) && (m = s), m && e.setData(a.downSample(a.mapDimension(f.dim), 1 / g, m, o));
        }
      }
    }
  };
}
