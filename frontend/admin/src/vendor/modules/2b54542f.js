let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return f;
}), defineExport(legacyExports, "d", function () {
  return d;
}), defineExport(legacyExports, "f", function () {
  return h;
}), defineExport(legacyExports, "b", function () {
  return p;
}), defineExport(legacyExports, "e", function () {
  return g;
}), defineExport(legacyExports, "c", function () {
  return m;
});
var r = require("./62597459.js"),
  i = require("./6d464469.js"),
  o = require("./4f454c42.js"),
  a = require("./37614b42.js"),
  s = r["j"],
  l = ["left", "right", "top", "bottom", "width", "height"],
  u = [["width", "left", "right"], ["height", "top", "bottom"]];
function c(e, t, n, r, i) {
  var o = 0,
    a = 0;
  null == r && (r = 1 / 0), null == i && (i = 1 / 0);
  var s = 0;
  t.eachChild(function (l, u) {
    var c,
      f,
      d = l.getBoundingRect(),
      h = t.childAt(u + 1),
      p = h && h.getBoundingRect();
    if ("horizontal" === e) {
      var g = d.width + (p ? -p.x + d.x : 0);
      c = o + g, c > r || l.newline ? (o = 0, c = g, a += s + n, s = d.height) : s = Math.max(s, d.height);
    } else {
      var m = d.height + (p ? -p.y + d.y : 0);
      f = a + m, f > i || l.newline ? (o += s + n, a = 0, f = m, s = d.width) : s = Math.max(s, d.width);
    }
    l.newline || (l.x = o, l.y = a, l.markRedraw(), "horizontal" === e ? o = c + n : a = f + n);
  });
}
var f = c;
r["h"](c, "vertical"), r["h"](c, "horizontal");
function d(e, t, n) {
  n = a["f"](n || 0);
  var r = t.width,
    s = t.height,
    l = Object(o["m"])(e.left, r),
    u = Object(o["m"])(e.top, s),
    c = Object(o["m"])(e.right, r),
    f = Object(o["m"])(e.bottom, s),
    d = Object(o["m"])(e.width, r),
    h = Object(o["m"])(e.height, s),
    p = n[2] + n[0],
    g = n[1] + n[3],
    m = e.aspect;
  switch (isNaN(d) && (d = r - c - g - l), isNaN(h) && (h = s - f - p - u), null != m && (isNaN(d) && isNaN(h) && (m > r / s ? d = .8 * r : h = .8 * s), isNaN(d) && (d = m * h), isNaN(h) && (h = d / m)), isNaN(l) && (l = r - c - d - g), isNaN(u) && (u = s - f - h - p), e.left || e.right) {
    case "center":
      l = r / 2 - d / 2 - n[3];
      break;
    case "right":
      l = r - d - g;
      break;
  }
  switch (e.top || e.bottom) {
    case "middle":
    case "center":
      u = s / 2 - h / 2 - n[0];
      break;
    case "bottom":
      u = s - h - p;
      break;
  }
  l = l || 0, u = u || 0, isNaN(d) && (d = r - g - l - (c || 0)), isNaN(h) && (h = s - p - u - (f || 0));
  var v = new i["a"](l + n[3], u + n[0], d, h);
  return v.margin = n, v;
}
function h(e, t, n, o, a, s) {
  var l,
    u = !a || !a.hv || a.hv[0],
    c = !a || !a.hv || a.hv[1],
    f = a && a.boundingMode || "all";
  if (s = s || e, s.x = e.x, s.y = e.y, !u && !c) return !1;
  if ("raw" === f) l = "group" === e.type ? new i["a"](0, 0, +t.width || 0, +t.height || 0) : e.getBoundingRect();else if (l = e.getBoundingRect(), e.needLocalTransform()) {
    var h = e.getLocalTransform();
    l = l.clone(), l.applyTransform(h);
  }
  var p = d(r["i"]({
      width: l.width,
      height: l.height
    }, t), n, o),
    g = u ? p.x - l.x : 0,
    m = c ? p.y - l.y : 0;
  return "raw" === f ? (s.x = g, s.y = m) : (s.x += g, s.y += m), s === e && e.markRedraw(), !0;
}
function p(e) {
  var t = e.layoutMode || e.constructor.layoutMode;
  return r["x"](t) ? t : t ? {
    type: t
  } : null;
}
function g(e, t, n) {
  var i = n && n.ignoreSize;
  !r["r"](i) && (i = [i, i]);
  var o = l(u[0], 0),
    a = l(u[1], 1);
  function l(n, r) {
    var o = {},
      a = 0,
      l = {},
      u = 0,
      d = 2;
    if (s(n, function (t) {
      l[t] = e[t];
    }), s(n, function (e) {
      c(t, e) && (o[e] = l[e] = t[e]), f(o, e) && a++, f(l, e) && u++;
    }), i[r]) return f(t, n[1]) ? l[n[2]] = null : f(t, n[2]) && (l[n[1]] = null), l;
    if (u !== d && a) {
      if (a >= d) return o;
      for (var h = 0; h < n.length; h++) {
        var p = n[h];
        if (!c(o, p) && c(e, p)) {
          o[p] = e[p];
          break;
        }
      }
      return o;
    }
    return l;
  }
  function c(e, t) {
    return e.hasOwnProperty(t);
  }
  function f(e, t) {
    return null != e[t] && "auto" !== e[t];
  }
  function d(e, t, n) {
    s(e, function (e) {
      t[e] = n[e];
    });
  }
  d(u[0], e, o), d(u[1], e, a);
}
function m(e) {
  return v({}, e);
}
function v(e, t) {
  return t && e && s(l, function (n) {
    t.hasOwnProperty(n) && (e[n] = t[n]);
  }), e;
}
