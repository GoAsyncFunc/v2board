let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return _;
}), defineExport(legacyExports, "c", function () {
  return w;
}), defineExport(legacyExports, "b", function () {
  return O;
});
var r = require("./62597459.js"),
  i = require("./792b5674.js"),
  o = require("./79784652.js"),
  a = require("./78364b74.js"),
  s = require("./32667736.js"),
  l = require("./49776253.js"),
  u = require("./6d464469.js"),
  c = require("./36477258.js"),
  f = require("./4f454c42.js"),
  d = i["b"].extend({
    type: "triangle",
    shape: {
      cx: 0,
      cy: 0,
      width: 0,
      height: 0
    },
    buildPath: function (e, t) {
      var n = t.cx,
        r = t.cy,
        i = t.width / 2,
        o = t.height / 2;
      e.moveTo(n, r - o), e.lineTo(n + i, r + o), e.lineTo(n - i, r + o), e.closePath();
    }
  }),
  h = i["b"].extend({
    type: "diamond",
    shape: {
      cx: 0,
      cy: 0,
      width: 0,
      height: 0
    },
    buildPath: function (e, t) {
      var n = t.cx,
        r = t.cy,
        i = t.width / 2,
        o = t.height / 2;
      e.moveTo(n, r - o), e.lineTo(n + i, r), e.lineTo(n, r + o), e.lineTo(n - i, r), e.closePath();
    }
  }),
  p = i["b"].extend({
    type: "pin",
    shape: {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    },
    buildPath: function (e, t) {
      var n = t.x,
        r = t.y,
        i = t.width / 5 * 3,
        o = Math.max(i, t.height),
        a = i / 2,
        s = a * a / (o - a),
        l = r - o + a + s,
        u = Math.asin(s / a),
        c = Math.cos(u) * a,
        f = Math.sin(u),
        d = Math.cos(u),
        h = .6 * a,
        p = .7 * a;
      e.moveTo(n - c, l + s), e.arc(n, l, a, Math.PI - u, 2 * Math.PI + u), e.bezierCurveTo(n + c - f * h, l + s + d * h, n, r - p, n, r), e.bezierCurveTo(n, r - p, n - c + f * h, l + s + d * h, n - c, l + s), e.closePath();
    }
  }),
  g = i["b"].extend({
    type: "arrow",
    shape: {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    },
    buildPath: function (e, t) {
      var n = t.height,
        r = t.width,
        i = t.x,
        o = t.y,
        a = r / 3 * 2;
      e.moveTo(i, o), e.lineTo(i + a, o + n), e.lineTo(i, o + n / 4 * 3), e.lineTo(i - a, o + n), e.lineTo(i, o), e.closePath();
    }
  }),
  m = {
    line: o["a"],
    rect: a["a"],
    roundRect: a["a"],
    square: a["a"],
    circle: s["a"],
    diamond: h,
    pin: p,
    arrow: g,
    triangle: d
  },
  v = {
    line: function (e, t, n, r, i) {
      i.x1 = e, i.y1 = t + r / 2, i.x2 = e + n, i.y2 = t + r / 2;
    },
    rect: function (e, t, n, r, i) {
      i.x = e, i.y = t, i.width = n, i.height = r;
    },
    roundRect: function (e, t, n, r, i) {
      i.x = e, i.y = t, i.width = n, i.height = r, i.r = Math.min(n, r) / 4;
    },
    square: function (e, t, n, r, i) {
      var o = Math.min(n, r);
      i.x = e, i.y = t, i.width = o, i.height = o;
    },
    circle: function (e, t, n, r, i) {
      i.cx = e + n / 2, i.cy = t + r / 2, i.r = Math.min(n, r) / 2;
    },
    diamond: function (e, t, n, r, i) {
      i.cx = e + n / 2, i.cy = t + r / 2, i.width = n, i.height = r;
    },
    pin: function (e, t, n, r, i) {
      i.x = e + n / 2, i.y = t + r / 2, i.width = n, i.height = r;
    },
    arrow: function (e, t, n, r, i) {
      i.x = e + n / 2, i.y = t + r / 2, i.width = n, i.height = r;
    },
    triangle: function (e, t, n, r, i) {
      i.cx = e + n / 2, i.cy = t + r / 2, i.width = n, i.height = r;
    }
  },
  y = {};
Object(r["j"])(m, function (e, t) {
  y[t] = new e();
});
var b = i["b"].extend({
  type: "symbol",
  shape: {
    symbolType: "",
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  calculateTextPosition: function (e, t, n) {
    var r = Object(c["c"])(e, t, n),
      i = this.shape;
    return i && "pin" === i.symbolType && "inside" === t.position && (r.y = n.y + .4 * n.height), r;
  },
  buildPath: function (e, t, n) {
    var r = t.symbolType;
    if ("none" !== r) {
      var i = y[r];
      i || (r = "rect", i = y[r]), v[r](t.x, t.y, t.width, t.height, i.shape), i.buildPath(e, i.shape, n);
    }
  }
});
function x(e, t) {
  if ("image" !== this.type) {
    var n = this.style;
    this.__isEmptyBrush ? (n.stroke = e, n.fill = t || "#fff", n.lineWidth = 2) : "line" === this.shape.symbolType ? n.stroke = e : n.fill = e, this.markRedraw();
  }
}
function _(e, t, n, r, i, o, a) {
  var s,
    c = 0 === e.indexOf("empty");
  return c && (e = e.substr(5, 1).toLowerCase() + e.substr(6)), s = 0 === e.indexOf("image://") ? l["makeImage"](e.slice(8), new u["a"](t, n, r, i), a ? "center" : "cover") : 0 === e.indexOf("path://") ? l["makePath"](e.slice(7), {}, new u["a"](t, n, r, i), a ? "center" : "cover") : new b({
    shape: {
      symbolType: e,
      x: t,
      y: n,
      width: r,
      height: i
    }
  }), s.__isEmptyBrush = c, s.setColor = x, o && s.setColor(o), s;
}
function w(e) {
  return Object(r["r"])(e) || (e = [+e, +e]), [e[0] || 0, e[1] || 0];
}
function O(e, t) {
  if (null != e) return Object(r["r"])(e) || (e = [e, e]), [Object(f["m"])(e[0], t[0]) || 0, Object(f["m"])(Object(r["K"])(e[1], e[0]), t[1]) || 0];
}
