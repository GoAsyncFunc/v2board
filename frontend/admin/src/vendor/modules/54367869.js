let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
var r = require("./5142737a.js");
function i(e, t, n, i) {
  var o,
    a,
    s,
    l,
    c = [],
    u = [],
    h = [],
    f = [];
  if (i) {
    s = [1 / 0, 1 / 0], l = [-1 / 0, -1 / 0];
    for (var d = 0, p = e.length; d < p; d++) Object(r["j"])(s, s, e[d]), Object(r["i"])(l, l, e[d]);
    Object(r["j"])(s, s, i[0]), Object(r["i"])(l, l, i[1]);
  }
  for (d = 0, p = e.length; d < p; d++) {
    var m = e[d];
    if (n) o = e[d ? d - 1 : p - 1], a = e[(d + 1) % p];else {
      if (0 === d || d === p - 1) {
        c.push(Object(r["c"])(e[d]));
        continue;
      }
      o = e[d - 1], a = e[d + 1];
    }
    Object(r["m"])(u, a, o), Object(r["l"])(u, u, t);
    var g = Object(r["g"])(m, o),
      v = Object(r["g"])(m, a),
      y = g + v;
    0 !== y && (g /= y, v /= y), Object(r["l"])(h, u, -g), Object(r["l"])(f, u, v);
    var b = Object(r["a"])([], m, h),
      w = Object(r["a"])([], m, f);
    i && (Object(r["i"])(b, b, s), Object(r["j"])(b, b, l), Object(r["i"])(w, w, s), Object(r["j"])(w, w, l)), c.push(b), c.push(w);
  }
  return n && c.push(c.shift()), c;
}
function o(e, t, n) {
  var r = t.smooth,
    o = t.points;
  if (o && o.length >= 2) {
    if (r) {
      var a = i(o, r, n, t.smoothConstraint);
      e.moveTo(o[0][0], o[0][1]);
      for (var s = o.length, l = 0; l < (n ? s : s - 1); l++) {
        var c = a[2 * l],
          u = a[2 * l + 1],
          h = o[(l + 1) % s];
        e.bezierCurveTo(c[0], c[1], u[0], u[1], h[0], h[1]);
      }
    } else {
      e.moveTo(o[0][0], o[0][1]);
      l = 1;
      for (var f = o.length; l < f; l++) e.lineTo(o[l][0], o[l][1]);
    }
    n && e.closePath();
  }
}
defineExport(legacyExports, "a", function () {
  return o;
});
