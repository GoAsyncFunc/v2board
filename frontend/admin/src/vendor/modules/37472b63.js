let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "e", function () {
  return l;
}), defineExport(legacyExports, "b", function () {
  return u;
}), defineExport(legacyExports, "c", function () {
  return c;
}), defineExport(legacyExports, "a", function () {
  return f;
}), defineExport(legacyExports, "d", function () {
  return d;
}), defineExport(legacyExports, "f", function () {
  return v;
});
var r = require("./62597459.js"),
  i = require("./422f3347.js"),
  o = require("./344e4f34.js"),
  a = require("./44356e59.js"),
  s = function () {
    function e(e) {
      this.data = e.data || (e.sourceFormat === i["d"] ? {} : []), this.sourceFormat = e.sourceFormat || i["h"], this.seriesLayoutBy = e.seriesLayoutBy || i["a"], this.startIndex = e.startIndex || 0, this.dimensionsDetectedCount = e.dimensionsDetectedCount, this.metaRawOption = e.metaRawOption;
      var t = this.dimensionsDefine = e.dimensionsDefine;
      if (t) for (var n = 0; n < t.length; n++) {
        var r = t[n];
        null == r.type && Object(a["b"])(this, n) === a["a"].Must && (r.type = "ordinal");
      }
    }
    return e;
  }();
function l(e) {
  return e instanceof s;
}
function u(e, t, n) {
  n = n || d(e);
  var i = t.seriesLayoutBy,
    o = h(e, n, i, t.sourceHeader, t.dimensions),
    a = new s({
      data: e,
      sourceFormat: n,
      seriesLayoutBy: i,
      dimensionsDefine: o.dimensionsDefine,
      startIndex: o.startIndex,
      dimensionsDetectedCount: o.dimensionsDetectedCount,
      metaRawOption: Object(r["d"])(t)
    });
  return a;
}
function c(e) {
  return new s({
    data: e,
    sourceFormat: Object(r["A"])(e) ? i["g"] : i["f"]
  });
}
function f(e) {
  return new s({
    data: e.data,
    sourceFormat: e.sourceFormat,
    seriesLayoutBy: e.seriesLayoutBy,
    dimensionsDefine: Object(r["d"])(e.dimensionsDefine),
    startIndex: e.startIndex,
    dimensionsDetectedCount: e.dimensionsDetectedCount
  });
}
function d(e) {
  var t = i["h"];
  if (Object(r["A"])(e)) t = i["g"];else if (Object(r["r"])(e)) {
    0 === e.length && (t = i["c"]);
    for (var n = 0, o = e.length; n < o; n++) {
      var a = e[n];
      if (null != a) {
        if (Object(r["r"])(a)) {
          t = i["c"];
          break;
        }
        if (Object(r["x"])(a)) {
          t = i["e"];
          break;
        }
      }
    }
  } else if (Object(r["x"])(e)) for (var s in e) if (Object(r["o"])(e, s) && Object(r["s"])(e[s])) {
    t = i["d"];
    break;
  }
  return t;
}
function h(e, t, n, a, s) {
  var l, u;
  if (!e) return {
    dimensionsDefine: g(s),
    startIndex: u,
    dimensionsDetectedCount: l
  };
  if (t === i["c"]) {
    var c = e;
    "auto" === a || null == a ? m(function (e) {
      null != e && "-" !== e && (Object(r["y"])(e) ? null == u && (u = 1) : u = 0);
    }, n, c, 10) : u = Object(r["w"])(a) ? a : a ? 1 : 0, s || 1 !== u || (s = [], m(function (e, t) {
      s[t] = null != e ? e + "" : "";
    }, n, c, 1 / 0)), l = s ? s.length : n === i["b"] ? c.length : c[0] ? c[0].length : null;
  } else if (t === i["e"]) s || (s = p(e));else if (t === i["d"]) s || (s = [], Object(r["j"])(e, function (e, t) {
    s.push(t);
  }));else if (t === i["f"]) {
    var f = Object(o["g"])(e[0]);
    l = Object(r["r"])(f) && f.length || 1;
  } else i["g"];
  return {
    startIndex: u,
    dimensionsDefine: g(s),
    dimensionsDetectedCount: l
  };
}
function p(e) {
  var t,
    n = 0;
  while (n < e.length && !(t = e[n++]));
  if (t) {
    var i = [];
    return Object(r["j"])(t, function (e, t) {
      i.push(t);
    }), i;
  }
}
function g(e) {
  if (e) {
    var t = Object(r["f"])();
    return Object(r["D"])(e, function (e, n) {
      e = Object(r["x"])(e) ? e : {
        name: e
      };
      var i = {
        name: e.name,
        displayName: e.displayName,
        type: e.type
      };
      if (null == i.name) return i;
      i.name += "", null == i.displayName && (i.displayName = i.name);
      var o = t.get(i.name);
      return o ? i.name += "-" + o.count++ : t.set(i.name, {
        count: 1
      }), i;
    });
  }
}
function m(e, t, n, r) {
  if (t === i["b"]) for (var o = 0; o < n.length && o < r; o++) e(n[o] ? n[o][0] : null, o);else {
    var a = n[0] || [];
    for (o = 0; o < a.length && o < r; o++) e(a[o], o);
  }
}
function v(e) {
  var t = e.sourceFormat;
  return t === i["e"] || t === i["d"];
}
