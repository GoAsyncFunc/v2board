let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "f", function () {
  return s;
}), defineExport(legacyExports, "d", function () {
  return c;
}), defineExport(legacyExports, "a", function () {
  return u;
}), defineExport(legacyExports, "b", function () {
  return h;
}), defineExport(legacyExports, "e", function () {
  return f;
}), defineExport(legacyExports, "g", function () {
  return d;
}), defineExport(legacyExports, "c", function () {
  return p;
});
var r = require("./6d464469.js"),
  i = require("./3152764e.js"),
  o = require("./636d3672.js"),
  a = {};
function s(e, t) {
  t = t || o["a"];
  var n = a[t];
  n || (n = a[t] = new i["a"](500));
  var r = n.get(e);
  return null == r && (r = o["d"].measureText(e, t).width, n.put(e, r)), r;
}
function l(e, t, n, i) {
  var o = s(e, t),
    a = f(t),
    l = u(0, o, n),
    c = h(0, a, i),
    d = new r["a"](l, c, o, a);
  return d;
}
function c(e, t, n, i) {
  var o = ((e || "") + "").split("\n"),
    a = o.length;
  if (1 === a) return l(o[0], t, n, i);
  for (var s = new r["a"](0, 0, 0, 0), c = 0; c < o.length; c++) {
    var u = l(o[c], t, n, i);
    0 === c ? s.copy(u) : s.union(u);
  }
  return s;
}
function u(e, t, n) {
  return "right" === n ? e -= t : "center" === n && (e -= t / 2), e;
}
function h(e, t, n) {
  return "middle" === n ? e -= t / 2 : "bottom" === n && (e -= t), e;
}
function f(e) {
  return s("\u56fd", e);
}
function d(e, t) {
  return "string" === typeof e ? e.lastIndexOf("%") >= 0 ? parseFloat(e) / 100 * t : parseFloat(e) : e;
}
function p(e, t, n) {
  var r = t.position || "inside",
    i = null != t.distance ? t.distance : 5,
    o = n.height,
    a = n.width,
    s = o / 2,
    l = n.x,
    c = n.y,
    u = "left",
    h = "top";
  if (r instanceof Array) l += d(r[0], n.width), c += d(r[1], n.height), u = null, h = null;else switch (r) {
    case "left":
      l -= i, c += s, u = "right", h = "middle";
      break;
    case "right":
      l += i + a, c += s, h = "middle";
      break;
    case "top":
      l += a / 2, c -= i, u = "center", h = "bottom";
      break;
    case "bottom":
      l += a / 2, c += o + i, u = "center";
      break;
    case "inside":
      l += a / 2, c += s, u = "center", h = "middle";
      break;
    case "insideLeft":
      l += i, c += s, h = "middle";
      break;
    case "insideRight":
      l += a - i, c += s, u = "right", h = "middle";
      break;
    case "insideTop":
      l += a / 2, c += i, u = "center";
      break;
    case "insideBottom":
      l += a / 2, c += o - i, u = "center", h = "bottom";
      break;
    case "insideTopLeft":
      l += i, c += i;
      break;
    case "insideTopRight":
      l += a - i, c += i, u = "right";
      break;
    case "insideBottomLeft":
      l += i, c += o - i, h = "bottom";
      break;
    case "insideBottomRight":
      l += a - i, c += o - i, u = "right", h = "bottom";
      break;
  }
  return e = e || {}, e.x = l, e.y = c, e.align = u, e.verticalAlign = h, e;
}
