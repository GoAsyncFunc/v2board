let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
var r = require("./6d725347.js"),
  i = require("./792b5674.js"),
  o = require("./494d6948.js"),
  a = require("./5142737a.js"),
  s = o["a"].CMD,
  l = [[], [], []],
  c = Math.sqrt,
  u = Math.atan2;
function h(e, t) {
  if (t) {
    var n,
      r,
      i,
      o,
      h,
      f,
      d = e.data,
      p = e.len(),
      m = s.M,
      g = s.C,
      v = s.L,
      y = s.R,
      b = s.A,
      w = s.Q;
    for (i = 0, o = 0; i < p;) {
      switch (n = d[i++], o = i, r = 0, n) {
        case m:
          r = 1;
          break;
        case v:
          r = 1;
          break;
        case g:
          r = 3;
          break;
        case w:
          r = 2;
          break;
        case b:
          var x = t[4],
            _ = t[5],
            E = c(t[0] * t[0] + t[1] * t[1]),
            S = c(t[2] * t[2] + t[3] * t[3]),
            k = u(-t[1] / S, t[0] / E);
          d[i] *= E, d[i++] += x, d[i] *= S, d[i++] += _, d[i++] *= E, d[i++] *= S, d[i++] += k, d[i++] += k, i += 2, o = i;
          break;
        case y:
          f[0] = d[i++], f[1] = d[i++], Object(a["b"])(f, f, t), d[o++] = f[0], d[o++] = f[1], f[0] += d[i++], f[1] += d[i++], Object(a["b"])(f, f, t), d[o++] = f[0], d[o++] = f[1];
      }
      for (h = 0; h < r; h++) {
        var C = l[h];
        C[0] = d[i++], C[1] = d[i++], Object(a["b"])(C, C, t), d[o++] = C[0], d[o++] = C[1];
      }
    }
    e.increaseVersion();
  }
}
var f = require("./62597459.js");
defineExport(legacyExports, "b", function () {
  return O;
}), defineExport(legacyExports, "c", function () {
  return T;
}), defineExport(legacyExports, "d", function () {
  return L;
}), defineExport(legacyExports, "a", function () {
  return A;
});
var d = Math.sqrt,
  p = Math.sin,
  m = Math.cos,
  g = Math.PI;
function v(e) {
  return Math.sqrt(e[0] * e[0] + e[1] * e[1]);
}
function y(e, t) {
  return (e[0] * t[0] + e[1] * t[1]) / (v(e) * v(t));
}
function b(e, t) {
  return (e[0] * t[1] < e[1] * t[0] ? -1 : 1) * Math.acos(y(e, t));
}
function w(e, t, n, r, i, o, a, s, l, c, u) {
  var h = l * (g / 180),
    f = m(h) * (e - n) / 2 + p(h) * (t - r) / 2,
    v = -1 * p(h) * (e - n) / 2 + m(h) * (t - r) / 2,
    w = f * f / (a * a) + v * v / (s * s);
  w > 1 && (a *= d(w), s *= d(w));
  var x = (i === o ? -1 : 1) * d((a * a * (s * s) - a * a * (v * v) - s * s * (f * f)) / (a * a * (v * v) + s * s * (f * f))) || 0,
    _ = x * a * v / s,
    E = x * -s * f / a,
    S = (e + n) / 2 + m(h) * _ - p(h) * E,
    k = (t + r) / 2 + p(h) * _ + m(h) * E,
    C = b([1, 0], [(f - _) / a, (v - E) / s]),
    O = [(f - _) / a, (v - E) / s],
    T = [(-1 * f - _) / a, (-1 * v - E) / s],
    L = b(O, T);
  if (y(O, T) <= -1 && (L = g), y(O, T) >= 1 && (L = 0), L < 0) {
    var A = Math.round(L / g * 1e6) / 1e6;
    L = 2 * g + A % 2 * g;
  }
  u.addData(c, S, k, a, s, C, L, h, o);
}
var x = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/gi,
  _ = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;
function E(e) {
  var t = new o["a"]();
  if (!e) return t;
  var n,
    r = 0,
    i = 0,
    a = r,
    s = i,
    l = o["a"].CMD,
    c = e.match(x);
  if (!c) return t;
  for (var u = 0; u < c.length; u++) {
    for (var h = c[u], f = h.charAt(0), d = void 0, p = h.match(_) || [], m = p.length, g = 0; g < m; g++) p[g] = parseFloat(p[g]);
    var v = 0;
    while (v < m) {
      var y = void 0,
        b = void 0,
        E = void 0,
        S = void 0,
        k = void 0,
        C = void 0,
        O = void 0,
        T = r,
        L = i,
        A = void 0,
        P = void 0;
      switch (f) {
        case "l":
          r += p[v++], i += p[v++], d = l.L, t.addData(d, r, i);
          break;
        case "L":
          r = p[v++], i = p[v++], d = l.L, t.addData(d, r, i);
          break;
        case "m":
          r += p[v++], i += p[v++], d = l.M, t.addData(d, r, i), a = r, s = i, f = "l";
          break;
        case "M":
          r = p[v++], i = p[v++], d = l.M, t.addData(d, r, i), a = r, s = i, f = "L";
          break;
        case "h":
          r += p[v++], d = l.L, t.addData(d, r, i);
          break;
        case "H":
          r = p[v++], d = l.L, t.addData(d, r, i);
          break;
        case "v":
          i += p[v++], d = l.L, t.addData(d, r, i);
          break;
        case "V":
          i = p[v++], d = l.L, t.addData(d, r, i);
          break;
        case "C":
          d = l.C, t.addData(d, p[v++], p[v++], p[v++], p[v++], p[v++], p[v++]), r = p[v - 2], i = p[v - 1];
          break;
        case "c":
          d = l.C, t.addData(d, p[v++] + r, p[v++] + i, p[v++] + r, p[v++] + i, p[v++] + r, p[v++] + i), r += p[v - 2], i += p[v - 1];
          break;
        case "S":
          y = r, b = i, A = t.len(), P = t.data, n === l.C && (y += r - P[A - 4], b += i - P[A - 3]), d = l.C, T = p[v++], L = p[v++], r = p[v++], i = p[v++], t.addData(d, y, b, T, L, r, i);
          break;
        case "s":
          y = r, b = i, A = t.len(), P = t.data, n === l.C && (y += r - P[A - 4], b += i - P[A - 3]), d = l.C, T = r + p[v++], L = i + p[v++], r += p[v++], i += p[v++], t.addData(d, y, b, T, L, r, i);
          break;
        case "Q":
          T = p[v++], L = p[v++], r = p[v++], i = p[v++], d = l.Q, t.addData(d, T, L, r, i);
          break;
        case "q":
          T = p[v++] + r, L = p[v++] + i, r += p[v++], i += p[v++], d = l.Q, t.addData(d, T, L, r, i);
          break;
        case "T":
          y = r, b = i, A = t.len(), P = t.data, n === l.Q && (y += r - P[A - 4], b += i - P[A - 3]), r = p[v++], i = p[v++], d = l.Q, t.addData(d, y, b, r, i);
          break;
        case "t":
          y = r, b = i, A = t.len(), P = t.data, n === l.Q && (y += r - P[A - 4], b += i - P[A - 3]), r += p[v++], i += p[v++], d = l.Q, t.addData(d, y, b, r, i);
          break;
        case "A":
          E = p[v++], S = p[v++], k = p[v++], C = p[v++], O = p[v++], T = r, L = i, r = p[v++], i = p[v++], d = l.A, w(T, L, r, i, C, O, E, S, k, d, t);
          break;
        case "a":
          E = p[v++], S = p[v++], k = p[v++], C = p[v++], O = p[v++], T = r, L = i, r += p[v++], i += p[v++], d = l.A, w(T, L, r, i, C, O, E, S, k, d, t);
          break;
      }
    }
    "z" !== f && "Z" !== f || (d = l.Z, t.addData(d), r = a, i = s), n = d;
  }
  return t.toStatic(), t;
}
var S = function (e) {
  function t() {
    return null !== e && e.apply(this, arguments) || this;
  }
  return Object(r["a"])(t, e), t.prototype.applyTransform = function (e) {}, t;
}(i["b"]);
function k(e) {
  return null != e.setData;
}
function C(e, t) {
  var n = E(e),
    r = Object(f["l"])({}, t);
  return r.buildPath = function (e) {
    if (k(e)) {
      e.setData(n.data);
      var t = e.getContext();
      t && e.rebuildPath(t, 1);
    } else {
      t = e;
      n.rebuildPath(t, 1);
    }
  }, r.applyTransform = function (e) {
    h(n, e), this.dirtyShape();
  }, r;
}
function O(e, t) {
  return new S(C(e, t));
}
function T(e, t) {
  var n = C(e, t),
    i = function (e) {
      function t(t) {
        var r = e.call(this, t) || this;
        return r.applyTransform = n.applyTransform, r.buildPath = n.buildPath, r;
      }
      return Object(r["a"])(t, e), t;
    }(S);
  return i;
}
function L(e, t) {
  for (var n = [], r = e.length, o = 0; o < r; o++) {
    var a = e[o];
    n.push(a.getUpdatedPathProxy(!0));
  }
  var s = new i["b"](t);
  return s.createPathProxy(), s.buildPath = function (e) {
    if (k(e)) {
      e.appendPath(n);
      var t = e.getContext();
      t && e.rebuildPath(t, 1);
    }
  }, s;
}
function A(e, t) {
  t = t || {};
  var n = new i["b"]();
  return e.shape && n.setShape(e.shape), n.setStyle(e.style), t.bakeTransform ? h(n.path, e.getComputedTransform()) : t.toLocal ? n.setLocalTransform(e.getComputedTransform()) : n.copyTransform(e), n.buildPath = e.buildPath, n.applyTransform = n.applyTransform, n.z = e.z, n.z2 = e.z2, n.zlevel = e.zlevel, n;
}
