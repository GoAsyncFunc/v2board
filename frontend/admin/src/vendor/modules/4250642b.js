let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "b", function () {
  return v;
}), defineExport(legacyExports, "a", function () {
  return y;
});
var r = require("./422f3347.js"),
  i = require("./344e4f34.js"),
  o = require("./62597459.js"),
  a = require("./4b786641.js"),
  s = require("./74396d68.js"),
  l = require("./37613470.js"),
  u = require("./37472b63.js"),
  c = function () {
    function e() {}
    return e.prototype.getRawData = function () {
      throw new Error("not supported");
    }, e.prototype.getRawDataItem = function (e) {
      throw new Error("not supported");
    }, e.prototype.cloneRawData = function () {}, e.prototype.getDimensionInfo = function (e) {}, e.prototype.cloneAllDimensionInfo = function () {}, e.prototype.count = function () {}, e.prototype.retrieveValue = function (e, t) {}, e.prototype.retrieveValueFromItem = function (e, t) {}, e.prototype.convertValue = function (e, t) {
      return Object(s["b"])(e, t);
    }, e;
  }();
function f(e, t) {
  var n = new c(),
    i = e.data,
    s = n.sourceFormat = e.sourceFormat,
    u = e.startIndex,
    f = "";
  e.seriesLayoutBy !== r["a"] && Object(l["c"])(f);
  var m = [],
    v = {},
    y = e.dimensionsDefine;
  if (y) Object(o["j"])(y, function (e, t) {
    var n = e.name,
      r = {
        index: t,
        name: n,
        displayName: e.displayName
      };
    if (m.push(r), null != n) {
      var i = "";
      Object(o["o"])(v, n) && Object(l["c"])(i), v[n] = r;
    }
  });else for (var b = 0; b < e.dimensionsDetectedCount; b++) m.push({
    index: b
  });
  var x = Object(a["c"])(s, r["a"]);
  t.__isBuiltIn && (n.getRawDataItem = function (e) {
    return x(i, u, m, e);
  }, n.getRawData = Object(o["c"])(d, null, e)), n.cloneRawData = Object(o["c"])(h, null, e);
  var _ = Object(a["b"])(s, r["a"]);
  n.count = Object(o["c"])(_, null, i, u, m);
  var w = Object(a["d"])(s);
  n.retrieveValue = function (e, t) {
    var n = x(i, u, m, e);
    return O(n, t);
  };
  var O = n.retrieveValueFromItem = function (e, t) {
    if (null != e) {
      var n = m[t];
      return n ? w(e, t, n.name) : void 0;
    }
  };
  return n.getDimensionInfo = Object(o["c"])(p, null, m, v), n.cloneAllDimensionInfo = Object(o["c"])(g, null, m), n;
}
function d(e) {
  var t = e.sourceFormat;
  if (!x(t)) {
    var n = "";
    0, Object(l["c"])(n);
  }
  return e.data;
}
function h(e) {
  var t = e.sourceFormat,
    n = e.data;
  if (!x(t)) {
    var i = "";
    0, Object(l["c"])(i);
  }
  if (t === r["c"]) {
    for (var a = [], s = 0, u = n.length; s < u; s++) a.push(n[s].slice());
    return a;
  }
  if (t === r["e"]) {
    for (a = [], s = 0, u = n.length; s < u; s++) a.push(Object(o["l"])({}, n[s]));
    return a;
  }
}
function p(e, t, n) {
  if (null != n) return Object(o["w"])(n) || !isNaN(n) && !Object(o["o"])(t, n) ? e[n] : Object(o["o"])(t, n) ? t[n] : void 0;
}
function g(e) {
  return Object(o["d"])(e);
}
var m = Object(o["f"])();
function v(e) {
  e = Object(o["d"])(e);
  var t = e.type,
    n = "";
  t || Object(l["c"])(n);
  var r = t.split(":");
  2 !== r.length && Object(l["c"])(n);
  var i = !1;
  "echarts" === r[0] && (t = r[1], i = !0), e.__isBuiltIn = i, m.set(t, e);
}
function y(e, t, n) {
  var r = Object(i["p"])(e),
    o = r.length,
    a = "";
  o || Object(l["c"])(a);
  for (var s = 0, u = o; s < u; s++) {
    var c = r[s];
    t = b(c, t, n, 1 === o ? null : s), s !== u - 1 && (t.length = Math.max(t.length, 1));
  }
  return t;
}
function b(e, t, n, a) {
  var s = "";
  t.length || Object(l["c"])(s), Object(o["x"])(e) || Object(l["c"])(s);
  var c = e.type,
    d = m.get(c);
  d || Object(l["c"])(s);
  var h = Object(o["D"])(t, function (e) {
      return f(e, d);
    }),
    p = Object(i["p"])(d.transform({
      upstream: h[0],
      upstreamList: h,
      config: Object(o["d"])(e.config)
    }));
  return Object(o["D"])(p, function (e, n) {
    var i = "";
    Object(o["x"])(e) || Object(l["c"])(i), e.data || Object(l["c"])(i);
    var a,
      s = Object(u["d"])(e.data);
    x(s) || Object(l["c"])(i);
    var c = t[0];
    if (c && 0 === n && !e.dimensions) {
      var f = c.startIndex;
      f && (e.data = c.data.slice(0, f).concat(e.data)), a = {
        seriesLayoutBy: r["a"],
        sourceHeader: f,
        dimensions: c.metaRawOption.dimensions
      };
    } else a = {
      seriesLayoutBy: r["a"],
      sourceHeader: 0,
      dimensions: e.dimensions
    };
    return Object(u["b"])(e.data, a, null);
  });
}
function x(e) {
  return e === r["c"] || e === r["e"];
}
