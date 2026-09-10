let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "d", function () {
  return f;
}), defineExport(legacyExports, "c", function () {
  return h;
}), defineExport(legacyExports, "e", function () {
  return g;
}), defineExport(legacyExports, "b", function () {
  return m;
}), defineExport(legacyExports, "a", function () {
  return v;
});
var r = require("./62597459.js"),
  i = require("./4f454c42.js"),
  o = require("./37687172.js"),
  a = require("./7a4d3351.js"),
  s = require("./396c6870.js"),
  l = "__ec_stack_";
function u(e) {
  return e.get("stack") || l + e.seriesIndex;
}
function c(e) {
  return e.dim + e.index;
}
function f(e, t) {
  var n = [];
  return t.eachSeriesByType(e, function (e) {
    y(e) && n.push(e);
  }), n;
}
function d(e) {
  var t = {};
  Object(r["j"])(e, function (e) {
    var n = e.coordinateSystem,
      r = n.getBaseAxis();
    if ("time" === r.type || "value" === r.type) for (var i = e.getData(), o = r.dim + "_" + r.index, a = i.getDimensionIndex(i.mapDimension(r.dim)), s = i.getStore(), l = 0, u = s.count(); l < u; ++l) {
      var c = s.get(a, l);
      t[o] ? t[o].push(c) : t[o] = [c];
    }
  });
  var n = {};
  for (var i in t) if (t.hasOwnProperty(i)) {
    var o = t[i];
    if (o) {
      o.sort(function (e, t) {
        return e - t;
      });
      for (var a = null, s = 1; s < o.length; ++s) {
        var l = o[s] - o[s - 1];
        l > 0 && (a = null === a ? l : Math.min(a, l));
      }
      n[i] = a;
    }
  }
  return n;
}
function h(e) {
  var t = d(e),
    n = [];
  return Object(r["j"])(e, function (e) {
    var r,
      o = e.coordinateSystem,
      a = o.getBaseAxis(),
      s = a.getExtent();
    if ("category" === a.type) r = a.getBandWidth();else if ("value" === a.type || "time" === a.type) {
      var l = a.dim + "_" + a.index,
        f = t[l],
        d = Math.abs(s[1] - s[0]),
        h = a.scale.getExtent(),
        p = Math.abs(h[1] - h[0]);
      r = f ? d / p * f : d;
    } else {
      var g = e.getData();
      r = Math.abs(s[1] - s[0]) / g.count();
    }
    var m = Object(i["m"])(e.get("barWidth"), r),
      v = Object(i["m"])(e.get("barMaxWidth"), r),
      y = Object(i["m"])(e.get("barMinWidth") || (b(e) ? .5 : 1), r),
      x = e.get("barGap"),
      _ = e.get("barCategoryGap");
    n.push({
      bandWidth: r,
      barWidth: m,
      barMaxWidth: v,
      barMinWidth: y,
      barGap: x,
      barCategoryGap: _,
      axisKey: c(a),
      stackId: u(e)
    });
  }), p(n);
}
function p(e) {
  var t = {};
  Object(r["j"])(e, function (e, n) {
    var r = e.axisKey,
      i = e.bandWidth,
      o = t[r] || {
        bandWidth: i,
        remainedWidth: i,
        autoWidthCount: 0,
        categoryGap: null,
        gap: "20%",
        stacks: {}
      },
      a = o.stacks;
    t[r] = o;
    var s = e.stackId;
    a[s] || o.autoWidthCount++, a[s] = a[s] || {
      width: 0,
      maxWidth: 0
    };
    var l = e.barWidth;
    l && !a[s].width && (a[s].width = l, l = Math.min(o.remainedWidth, l), o.remainedWidth -= l);
    var u = e.barMaxWidth;
    u && (a[s].maxWidth = u);
    var c = e.barMinWidth;
    c && (a[s].minWidth = c);
    var f = e.barGap;
    null != f && (o.gap = f);
    var d = e.barCategoryGap;
    null != d && (o.categoryGap = d);
  });
  var n = {};
  return Object(r["j"])(t, function (e, t) {
    n[t] = {};
    var o = e.stacks,
      a = e.bandWidth,
      s = e.categoryGap;
    if (null == s) {
      var l = Object(r["B"])(o).length;
      s = Math.max(35 - 4 * l, 15) + "%";
    }
    var u = Object(i["m"])(s, a),
      c = Object(i["m"])(e.gap, 1),
      f = e.remainedWidth,
      d = e.autoWidthCount,
      h = (f - u) / (d + (d - 1) * c);
    h = Math.max(h, 0), Object(r["j"])(o, function (e) {
      var t = e.maxWidth,
        n = e.minWidth;
      if (e.width) {
        r = e.width;
        t && (r = Math.min(r, t)), n && (r = Math.max(r, n)), e.width = r, f -= r + c * r, d--;
      } else {
        var r = h;
        t && t < r && (r = Math.min(t, f)), n && n > r && (r = n), r !== h && (e.width = r, f -= r + c * r, d--);
      }
    }), h = (f - u) / (d + (d - 1) * c), h = Math.max(h, 0);
    var p,
      g = 0;
    Object(r["j"])(o, function (e, t) {
      e.width || (e.width = h), p = e, g += e.width * (1 + c);
    }), p && (g -= p.width * c);
    var m = -g / 2;
    Object(r["j"])(o, function (e, r) {
      n[t][r] = n[t][r] || {
        bandWidth: a,
        offset: m,
        width: e.width
      }, m += e.width * (1 + c);
    });
  }), n;
}
function g(e, t, n) {
  if (e && t) {
    var r = e[c(t)];
    return null != r && null != n ? r[u(n)] : r;
  }
}
function m(e, t) {
  var n = f(e, t),
    i = h(n);
  Object(r["j"])(n, function (e) {
    var t = e.getData(),
      n = e.coordinateSystem,
      r = n.getBaseAxis(),
      o = u(e),
      a = i[c(r)][o],
      s = a.offset,
      l = a.width;
    t.setLayout({
      bandWidth: a.bandWidth,
      offset: s,
      size: l
    });
  });
}
function v(e) {
  return {
    seriesType: e,
    plan: Object(a["a"])(),
    reset: function (e) {
      if (y(e)) {
        var t = e.getData(),
          n = e.coordinateSystem,
          r = n.getBaseAxis(),
          i = n.getOtherAxis(r),
          a = t.getDimensionIndex(t.mapDimension(i.dim)),
          l = t.getDimensionIndex(t.mapDimension(r.dim)),
          u = e.get("showBackground", !0),
          c = t.mapDimension(i.dim),
          f = t.getCalculationInfo("stackResultDimension"),
          d = Object(o["c"])(t, c) && !!t.getCalculationInfo("stackedOnSeries"),
          h = i.isHorizontal(),
          p = x(r, i),
          g = b(e),
          m = e.get("barMinHeight") || 0,
          v = f && t.getDimensionIndex(f),
          _ = t.getLayout("size"),
          w = t.getLayout("offset");
        return {
          progress: function (e, t) {
            var r,
              i = e.count,
              o = g && Object(s["a"])(3 * i),
              c = g && u && Object(s["a"])(3 * i),
              f = g && Object(s["a"])(i),
              y = n.master.getRect(),
              b = h ? y.width : y.height,
              x = t.getStore(),
              O = 0;
            while (null != (r = e.next())) {
              var S = x.get(d ? v : a, r),
                k = x.get(l, r),
                j = p,
                M = void 0;
              d && (M = +S - x.get(a, r));
              var C = void 0,
                T = void 0,
                I = void 0,
                D = void 0;
              if (h) {
                var A = n.dataToPoint([S, k]);
                if (d) {
                  var E = n.dataToPoint([M, k]);
                  j = E[0];
                }
                C = j, T = A[1] + w, I = A[0] - j, D = _, Math.abs(I) < m && (I = (I < 0 ? -1 : 1) * m);
              } else {
                A = n.dataToPoint([k, S]);
                if (d) {
                  E = n.dataToPoint([k, M]);
                  j = E[1];
                }
                C = A[0] + w, T = j, I = _, D = A[1] - j, Math.abs(D) < m && (D = (D <= 0 ? -1 : 1) * m);
              }
              g ? (o[O] = C, o[O + 1] = T, o[O + 2] = h ? I : D, c && (c[O] = h ? y.x : C, c[O + 1] = h ? T : y.y, c[O + 2] = b), f[r] = r) : t.setItemLayout(r, {
                x: C,
                y: T,
                width: I,
                height: D
              }), O += 3;
            }
            g && t.setLayout({
              largePoints: o,
              largeDataIndices: f,
              largeBackgroundPoints: c,
              valueAxisHorizontal: h
            });
          }
        };
      }
    }
  };
}
function y(e) {
  return e.coordinateSystem && "cartesian2d" === e.coordinateSystem.type;
}
function b(e) {
  return e.pipelineContext && e.pipelineContext.large;
}
function x(e, t) {
  return t.toGlobalCoord(t.dataToCoord("log" === t.type ? 1 : 0));
}
