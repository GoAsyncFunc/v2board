let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
var r = require("./49744746.js"),
  i = Math.log(2);
function o(e, t, n, r, a, s) {
  var l = r + "-" + a,
    c = e.length;
  if (s.hasOwnProperty(l)) return s[l];
  if (1 === t) {
    var u = Math.round(Math.log((1 << c) - 1 & ~a) / i);
    return e[n][u];
  }
  var h = r | 1 << n,
    f = n + 1;
  while (r & 1 << f) f++;
  for (var d = 0, p = 0, m = 0; p < c; p++) {
    var g = 1 << p;
    g & a || (d += (m % 2 ? -1 : 1) * e[n][p] * o(e, t - 1, f, h, a | g, s), m++);
  }
  return s[l] = d, d;
}
function a(e, t) {
  var n = [[e[0], e[1], 1, 0, 0, 0, -t[0] * e[0], -t[0] * e[1]], [0, 0, 0, e[0], e[1], 1, -t[1] * e[0], -t[1] * e[1]], [e[2], e[3], 1, 0, 0, 0, -t[2] * e[2], -t[2] * e[3]], [0, 0, 0, e[2], e[3], 1, -t[3] * e[2], -t[3] * e[3]], [e[4], e[5], 1, 0, 0, 0, -t[4] * e[4], -t[4] * e[5]], [0, 0, 0, e[4], e[5], 1, -t[5] * e[4], -t[5] * e[5]], [e[6], e[7], 1, 0, 0, 0, -t[6] * e[6], -t[6] * e[7]], [0, 0, 0, e[6], e[7], 1, -t[7] * e[6], -t[7] * e[7]]],
    r = {},
    i = o(n, 8, 0, 0, 0, r);
  if (0 !== i) {
    for (var a = [], s = 0; s < 8; s++) for (var l = 0; l < 8; l++) null == a[l] && (a[l] = 0), a[l] += ((s + l) % 2 ? -1 : 1) * o(n, 7, 0 === s ? 1 : 0, 1 << s, 1 << l, r) / i * t[s];
    return function (e, t, n) {
      var r = t * a[6] + n * a[7] + 1;
      e[0] = (t * a[0] + n * a[1] + a[2]) / r, e[1] = (t * a[3] + n * a[4] + a[5]) / r;
    };
  }
}
defineExport(legacyExports, "d", function () {
  return c;
}), defineExport(legacyExports, "c", function () {
  return u;
}), defineExport(legacyExports, "b", function () {
  return d;
}), defineExport(legacyExports, "a", function () {
  return g;
});
var s = "___zrEVENTSAVED",
  l = [];
function c(e, t, n, r, i) {
  return u(l, t, r, i, !0) && u(e, n, l[0], l[1]);
}
function u(e, t, n, i, o) {
  if (t.getBoundingClientRect && r["a"].domSupported && !d(t)) {
    var a = t[s] || (t[s] = {}),
      l = h(t, a),
      c = f(l, a, o);
    if (c) return c(e, n, i), !0;
  }
  return !1;
}
function h(e, t) {
  var n = t.markers;
  if (n) return n;
  n = t.markers = [];
  for (var r = ["left", "right"], i = ["top", "bottom"], o = 0; o < 4; o++) {
    var a = document.createElement("div"),
      s = a.style,
      l = o % 2,
      c = (o >> 1) % 2;
    s.cssText = ["position: absolute", "visibility: hidden", "padding: 0", "margin: 0", "border-width: 0", "user-select: none", "width:0", "height:0", r[l] + ":0", i[c] + ":0", r[1 - l] + ":auto", i[1 - c] + ":auto", ""].join("!important;"), e.appendChild(a), n.push(a);
  }
  return n;
}
function f(e, t, n) {
  for (var r = n ? "invTrans" : "trans", i = t[r], o = t.srcCoords, s = [], l = [], c = !0, u = 0; u < 4; u++) {
    var h = e[u].getBoundingClientRect(),
      f = 2 * u,
      d = h.left,
      p = h.top;
    s.push(d, p), c = c && o && d === o[f] && p === o[f + 1], l.push(e[u].offsetLeft, e[u].offsetTop);
  }
  return c && i ? i : (t.srcCoords = s, t[r] = n ? a(l, s) : a(s, l));
}
function d(e) {
  return "CANVAS" === e.nodeName.toUpperCase();
}
var p = /([&<>"'])/g,
  m = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };
function g(e) {
  return null == e ? "" : (e + "").replace(p, function (e, t) {
    return m[t];
  });
}
