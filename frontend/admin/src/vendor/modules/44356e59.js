let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return a;
}), defineExport(legacyExports, "f", function () {
  return l;
}), defineExport(legacyExports, "c", function () {
  return u;
}), defineExport(legacyExports, "e", function () {
  return c;
}), defineExport(legacyExports, "d", function () {
  return f;
}), defineExport(legacyExports, "b", function () {
  return d;
});
var r = require("./344e4f34.js"),
  i = require("./62597459.js"),
  o = require("./422f3347.js"),
  a = {
    Must: 1,
    Might: 2,
    Not: 3
  },
  s = Object(r["m"])();
function l(e) {
  s(e).datasetMap = Object(i["f"])();
}
function u(e, t, n) {
  var r = {},
    o = c(t);
  if (!o || !e) return r;
  var a,
    l,
    u = [],
    f = [],
    d = t.ecModel,
    h = s(d).datasetMap,
    p = o.uid + "_" + n.seriesLayoutBy;
  e = e.slice(), Object(i["j"])(e, function (t, n) {
    var o = Object(i["x"])(t) ? t : e[n] = {
      name: t
    };
    "ordinal" === o.type && null == a && (a = n, l = v(o)), r[o.name] = [];
  });
  var g = h.get(p) || h.set(p, {
    categoryWayDim: l,
    valueWayDim: 0
  });
  function m(e, t, n) {
    for (var r = 0; r < n; r++) e.push(t + r);
  }
  function v(e) {
    var t = e.dimsDef;
    return t ? t.length : 1;
  }
  return Object(i["j"])(e, function (e, t) {
    var n = e.name,
      i = v(e);
    if (null == a) {
      var o = g.valueWayDim;
      m(r[n], o, i), m(f, o, i), g.valueWayDim += i;
    } else if (a === t) m(r[n], 0, i), m(u, 0, i);else {
      o = g.categoryWayDim;
      m(r[n], o, i), m(f, o, i), g.categoryWayDim += i;
    }
  }), u.length && (r.itemName = u), f.length && (r.seriesName = f), r;
}
function c(e) {
  var t = e.get("data", !0);
  if (!t) return Object(r["t"])(e.ecModel, "dataset", {
    index: e.get("datasetIndex", !0),
    id: e.get("datasetId", !0)
  }, r["b"]).models[0];
}
function f(e) {
  return e.get("transform", !0) || e.get("fromTransformResult", !0) ? Object(r["t"])(e.ecModel, "dataset", {
    index: e.get("fromDatasetIndex", !0),
    id: e.get("fromDatasetId", !0)
  }, r["b"]).models : [];
}
function d(e, t) {
  return h(e.data, e.sourceFormat, e.seriesLayoutBy, e.dimensionsDefine, e.startIndex, t);
}
function h(e, t, n, s, l, u) {
  var c,
    f,
    d,
    h = 5;
  if (Object(i["A"])(e)) return a.Not;
  if (s) {
    var p = s[u];
    Object(i["x"])(p) ? (f = p.name, d = p.type) : Object(i["y"])(p) && (f = p);
  }
  if (null != d) return "ordinal" === d ? a.Must : a.Not;
  if (t === o["c"]) {
    var g = e;
    if (n === o["b"]) {
      for (var m = g[u], v = 0; v < (m || []).length && v < h; v++) if (null != (c = S(m[l + v]))) return c;
    } else for (v = 0; v < g.length && v < h; v++) {
      var y = g[l + v];
      if (y && null != (c = S(y[u]))) return c;
    }
  } else if (t === o["e"]) {
    var b = e;
    if (!f) return a.Not;
    for (v = 0; v < b.length && v < h; v++) {
      var x = b[v];
      if (x && null != (c = S(x[f]))) return c;
    }
  } else if (t === o["d"]) {
    var _ = e;
    if (!f) return a.Not;
    m = _[f];
    if (!m || Object(i["A"])(m)) return a.Not;
    for (v = 0; v < m.length && v < h; v++) if (null != (c = S(m[v]))) return c;
  } else if (t === o["f"]) {
    var w = e;
    for (v = 0; v < w.length && v < h; v++) {
      x = w[v];
      var O = Object(r["g"])(x);
      if (!Object(i["r"])(O)) return a.Not;
      if (null != (c = S(O[u]))) return c;
    }
  }
  function S(e) {
    var t = Object(i["y"])(e);
    return null != e && isFinite(e) && "" !== e ? t ? a.Might : a.Not : t && "-" !== e ? a.Must : void 0;
  }
  return a.Not;
}
