let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return F;
});
var r = require("./47657637.js"),
  i = require("./494d6948.js"),
  o = require("./586e6237.js"),
  a = require("./4e44632f.js"),
  s = require("./792b5674.js"),
  l = require("./44616767.js"),
  c = require("./33553866.js"),
  u = require("./62597459.js"),
  h = require("./6a523278.js"),
  f = require("./53385358.js"),
  d = require("./636d3672.js"),
  p = new i["a"](!0);
function m(e) {
  var t = e.stroke;
  return !(null == t || "none" === t || !(e.lineWidth > 0));
}
function g(e) {
  return "string" === typeof e && "none" !== e;
}
function v(e) {
  var t = e.fill;
  return null != t && "none" !== t;
}
function y(e, t) {
  if (null != t.fillOpacity && 1 !== t.fillOpacity) {
    var n = e.globalAlpha;
    e.globalAlpha = t.fillOpacity * t.opacity, e.fill(), e.globalAlpha = n;
  } else e.fill();
}
function b(e, t) {
  if (null != t.strokeOpacity && 1 !== t.strokeOpacity) {
    var n = e.globalAlpha;
    e.globalAlpha = t.strokeOpacity * t.opacity, e.stroke(), e.globalAlpha = n;
  } else e.stroke();
}
function w(e, t, n) {
  var r = Object(o["a"])(t.image, t.__image, n);
  if (Object(o["c"])(r)) {
    var i = e.createPattern(r, t.repeat || "repeat");
    if ("function" === typeof DOMMatrix && i && i.setTransform) {
      var a = new DOMMatrix();
      a.translateSelf(t.x || 0, t.y || 0), a.rotateSelf(0, 0, (t.rotation || 0) * u["a"]), a.scaleSelf(t.scaleX || 1, t.scaleY || 1), i.setTransform(a);
    }
    return i;
  }
}
function x(e, t, n, r) {
  var i,
    o = m(n),
    s = v(n),
    l = n.strokePercent,
    c = l < 1,
    u = !t.path;
  t.silent && !c || !u || t.createPathProxy();
  var d = t.path || p,
    g = t.__dirty;
  if (!r) {
    var x = n.fill,
      _ = n.stroke,
      E = s && !!x.colorStops,
      S = o && !!_.colorStops,
      k = s && !!x.image,
      C = o && !!_.image,
      O = void 0,
      T = void 0,
      L = void 0,
      A = void 0,
      P = void 0;
    (E || S) && (P = t.getBoundingRect()), E && (O = g ? Object(a["a"])(e, x, P) : t.__canvasFillGradient, t.__canvasFillGradient = O), S && (T = g ? Object(a["a"])(e, _, P) : t.__canvasStrokeGradient, t.__canvasStrokeGradient = T), k && (L = g || !t.__canvasFillPattern ? w(e, x, t) : t.__canvasFillPattern, t.__canvasFillPattern = L), C && (A = g || !t.__canvasStrokePattern ? w(e, _, t) : t.__canvasStrokePattern, t.__canvasStrokePattern = L), E ? e.fillStyle = O : k && (L ? e.fillStyle = L : s = !1), S ? e.strokeStyle = T : C && (A ? e.strokeStyle = A : o = !1);
  }
  var j,
    M,
    R = t.getGlobalScale();
  d.setScale(R[0], R[1], t.segmentIgnoreThreshold), e.setLineDash && n.lineDash && (i = Object(h["a"])(t), j = i[0], M = i[1]);
  var N = !0;
  (u || g & f["b"]) && (d.setDPR(e.dpr), c ? d.setContext(null) : (d.setContext(e), N = !1), d.reset(), t.buildPath(d, t.shape, r), d.toStatic(), t.pathUpdated()), N && d.rebuildPath(e, c ? l : 1), j && (e.setLineDash(j), e.lineDashOffset = M), r || (n.strokeFirst ? (o && b(e, n), s && y(e, n)) : (s && y(e, n), o && b(e, n))), j && e.setLineDash([]);
}
function _(e, t, n) {
  var r = t.__image = Object(o["a"])(n.image, t.__image, t, t.onload);
  if (r && Object(o["c"])(r)) {
    var i = n.x || 0,
      a = n.y || 0,
      s = t.getWidth(),
      l = t.getHeight(),
      c = r.width / r.height;
    if (null == s && null != l ? s = l * c : null == l && null != s ? l = s / c : null == s && null == l && (s = r.width, l = r.height), n.sWidth && n.sHeight) {
      var u = n.sx || 0,
        h = n.sy || 0;
      e.drawImage(r, u, h, n.sWidth, n.sHeight, i, a, s, l);
    } else if (n.sx && n.sy) {
      u = n.sx, h = n.sy;
      var f = s - u,
        d = l - h;
      e.drawImage(r, u, h, f, d, i, a, s, l);
    } else e.drawImage(r, i, a, s, l);
  }
}
function E(e, t, n) {
  var r,
    i = n.text;
  if (null != i && (i += ""), i) {
    e.font = n.font || d["a"], e.textAlign = n.textAlign, e.textBaseline = n.textBaseline;
    var o = void 0,
      a = void 0;
    e.setLineDash && n.lineDash && (r = Object(h["a"])(t), o = r[0], a = r[1]), o && (e.setLineDash(o), e.lineDashOffset = a), n.strokeFirst ? (m(n) && e.strokeText(i, n.x, n.y), v(n) && e.fillText(i, n.x, n.y)) : (v(n) && e.fillText(i, n.x, n.y), m(n) && e.strokeText(i, n.x, n.y)), o && e.setLineDash([]);
  }
}
var S = ["shadowBlur", "shadowOffsetX", "shadowOffsetY"],
  k = [["lineCap", "butt"], ["lineJoin", "miter"], ["miterLimit", 10]];
function C(e, t, n, i, o) {
  var a = !1;
  if (!i && (n = n || {}, t === n)) return !1;
  if (i || t.opacity !== n.opacity) {
    I(e, o), a = !0;
    var s = Math.max(Math.min(t.opacity, 1), 0);
    e.globalAlpha = isNaN(s) ? r["b"].opacity : s;
  }
  (i || t.blend !== n.blend) && (a || (I(e, o), a = !0), e.globalCompositeOperation = t.blend || r["b"].blend);
  for (var l = 0; l < S.length; l++) {
    var c = S[l];
    (i || t[c] !== n[c]) && (a || (I(e, o), a = !0), e[c] = e.dpr * (t[c] || 0));
  }
  return (i || t.shadowColor !== n.shadowColor) && (a || (I(e, o), a = !0), e.shadowColor = t.shadowColor || r["b"].shadowColor), a;
}
function O(e, t, n, r, i) {
  var o = $(t, i.inHover),
    a = r ? null : n && $(n, i.inHover) || {};
  if (o === a) return !1;
  var s = C(e, o, a, r, i);
  if ((r || o.fill !== a.fill) && (s || (I(e, i), s = !0), g(o.fill) && (e.fillStyle = o.fill)), (r || o.stroke !== a.stroke) && (s || (I(e, i), s = !0), g(o.stroke) && (e.strokeStyle = o.stroke)), (r || o.opacity !== a.opacity) && (s || (I(e, i), s = !0), e.globalAlpha = null == o.opacity ? 1 : o.opacity), t.hasStroke()) {
    var l = o.lineWidth,
      c = l / (o.strokeNoScale && t.getLineScale ? t.getLineScale() : 1);
    e.lineWidth !== c && (s || (I(e, i), s = !0), e.lineWidth = c);
  }
  for (var u = 0; u < k.length; u++) {
    var h = k[u],
      f = h[0];
    (r || o[f] !== a[f]) && (s || (I(e, i), s = !0), e[f] = o[f] || h[1]);
  }
  return s;
}
function T(e, t, n, r, i) {
  return C(e, $(t, i.inHover), n && $(n, i.inHover), r, i);
}
function L(e, t) {
  var n = t.transform,
    r = e.dpr || 1;
  n ? e.setTransform(r * n[0], r * n[1], r * n[2], r * n[3], r * n[4], r * n[5]) : e.setTransform(r, 0, 0, r, 0, 0);
}
function A(e, t, n) {
  for (var r = !1, i = 0; i < e.length; i++) {
    var o = e[i];
    r = r || o.isZeroArea(), L(t, o), t.beginPath(), o.buildPath(t, o.shape), t.clip();
  }
  n.allClipped = r;
}
function P(e, t) {
  return e && t ? e[0] !== t[0] || e[1] !== t[1] || e[2] !== t[2] || e[3] !== t[3] || e[4] !== t[4] || e[5] !== t[5] : !(!e && !t);
}
var j = 1,
  M = 2,
  R = 3,
  N = 4;
function D(e) {
  var t = v(e),
    n = m(e);
  return !(e.lineDash || !(+t ^ +n) || t && "string" !== typeof e.fill || n && "string" !== typeof e.stroke || e.strokePercent < 1 || e.strokeOpacity < 1 || e.fillOpacity < 1);
}
function I(e, t) {
  t.batchFill && e.fill(), t.batchStroke && e.stroke(), t.batchFill = "", t.batchStroke = "";
}
function $(e, t) {
  return t && e.__hoverStyle || e.style;
}
function F(e, t) {
  B(e, t, {
    inHover: !1,
    viewWidth: 0,
    viewHeight: 0
  }, !0);
}
function B(e, t, n, r) {
  var i = t.transform;
  if (!t.shouldBePainted(n.viewWidth, n.viewHeight, !1, !1)) return t.__dirty &= ~f["a"], void (t.__isRendered = !1);
  var o = t.__clipPaths,
    u = n.prevElClipPaths,
    h = !1,
    d = !1;
  if (u && !Object(a["c"])(o, u) || (u && u.length && (I(e, n), e.restore(), d = h = !0, n.prevElClipPaths = null, n.allClipped = !1, n.prevEl = null), o && o.length && (I(e, n), e.save(), A(o, e, n), h = !0), n.prevElClipPaths = o), n.allClipped) t.__isRendered = !1;else {
    t.beforeBrush && t.beforeBrush(), t.innerBeforeBrush();
    var p = n.prevEl;
    p || (d = h = !0);
    var m = t instanceof s["b"] && t.autoBatch && D(t.style);
    h || P(i, p.transform) ? (I(e, n), L(e, t)) : m || I(e, n);
    var g = $(t, n.inHover);
    t instanceof s["b"] ? (n.lastDrawType !== j && (d = !0, n.lastDrawType = j), O(e, t, p, d, n), m && (n.batchFill || n.batchStroke) || e.beginPath(), x(e, t, g, m), m && (n.batchFill = g.fill || "", n.batchStroke = g.stroke || "")) : t instanceof c["a"] ? (n.lastDrawType !== R && (d = !0, n.lastDrawType = R), O(e, t, p, d, n), E(e, t, g)) : t instanceof l["a"] ? (n.lastDrawType !== M && (d = !0, n.lastDrawType = M), T(e, t, p, d, n), _(e, t, g)) : t.getTemporalDisplayables && (n.lastDrawType !== N && (d = !0, n.lastDrawType = N), V(e, t, n)), m && r && I(e, n), t.innerAfterBrush(), t.afterBrush && t.afterBrush(), n.prevEl = t, t.__dirty = 0, t.__isRendered = !0;
  }
}
function V(e, t, n) {
  var r = t.getDisplayables(),
    i = t.getTemporalDisplayables();
  e.save();
  var o,
    a,
    s = {
      prevElClipPaths: null,
      prevEl: null,
      allClipped: !1,
      viewWidth: n.viewWidth,
      viewHeight: n.viewHeight,
      inHover: n.inHover
    };
  for (o = t.getCursor(), a = r.length; o < a; o++) {
    var l = r[o];
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), B(e, l, s, o === a - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), s.prevEl = l;
  }
  for (var c = 0, u = i.length; c < u; c++) {
    l = i[c];
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), B(e, l, s, c === u - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), s.prevEl = l;
  }
  t.clearTemporalDisplayables(), t.notClear = !0, e.restore();
}
