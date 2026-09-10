let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "b", function () {
  return l;
}), defineExport(legacyExports, "c", function () {
  return u;
}), defineExport(legacyExports, "a", function () {
  return c;
});
var r = require("./78364b74.js"),
  i = require("./33736f46.js"),
  o = require("./53714939.js"),
  a = require("./4f454c42.js"),
  s = require("./62597459.js");
function l(e, t, n, o, a) {
  var l = e.getArea(),
    u = l.x,
    c = l.y,
    f = l.width,
    d = l.height,
    h = n.get(["lineStyle", "width"]) || 2;
  u -= h / 2, c -= h / 2, f += h, d += h, u = Math.floor(u), f = Math.round(f);
  var p = new r["a"]({
    shape: {
      x: u,
      y: c,
      width: f,
      height: d
    }
  });
  if (t) {
    var g = e.getBaseAxis(),
      m = g.isHorizontal(),
      v = g.inverse;
    m ? (v && (p.shape.x += f), p.shape.width = 0) : (v || (p.shape.y += d), p.shape.height = 0);
    var y = Object(s["u"])(a) ? function (e) {
      a(e, p);
    } : null;
    i["c"](p, {
      shape: {
        width: f,
        height: d,
        x: u,
        y: c
      }
    }, n, null, o, y);
  }
  return p;
}
function u(e, t, n) {
  var r = e.getArea(),
    s = Object(a["q"])(r.r0, 1),
    l = Object(a["q"])(r.r, 1),
    u = new o["a"]({
      shape: {
        cx: Object(a["q"])(e.cx, 1),
        cy: Object(a["q"])(e.cy, 1),
        r0: s,
        r: l,
        startAngle: r.startAngle,
        endAngle: r.endAngle,
        clockwise: r.clockwise
      }
    });
  if (t) {
    var c = "angle" === e.getBaseAxis().dim;
    c ? u.shape.endAngle = r.startAngle : u.shape.r = s, i["c"](u, {
      shape: {
        endAngle: r.endAngle,
        r: l
      }
    }, n);
  }
  return u;
}
function c(e, t, n, r, i) {
  return e ? "polar" === e.type ? u(e, t, n) : "cartesian2d" === e.type ? l(e, t, n, r, i) : null : null;
}
