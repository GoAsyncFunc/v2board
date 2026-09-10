let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
var r = require("./536a3969.js"),
  i = require("./792b5674.js"),
  o = require("./62597459.js"),
  a = require("./5142737a.js"),
  s = require("./4e433138.js"),
  l = require("./68594c6a.js"),
  c = require("./346d4e37.js"),
  u = require("./6d464469.js"),
  h = require("./334f6a37.js"),
  f = require("./68374851.js"),
  d = require("./78364b74.js"),
  p = require("./53714939.js"),
  m = require("./494d6948.js"),
  g = m["a"].CMD;
function v(e, t) {
  return Math.abs(e - t) < 1e-5;
}
function y(e) {
  var t,
    n,
    r,
    i,
    o,
    a = e.data,
    s = e.len(),
    l = [],
    c = 0,
    u = 0,
    h = 0,
    f = 0;
  function d(e, n) {
    t && t.length > 2 && l.push(t), t = [e, n];
  }
  function p(e, n, r, i) {
    v(e, r) && v(n, i) || t.push(e, n, r, i, r, i);
  }
  function m(e, n, r, i, o, a) {
    var s = Math.abs(n - e),
      l = 4 * Math.tan(s / 4) / 3,
      c = n < e ? -1 : 1,
      u = Math.cos(e),
      h = Math.sin(e),
      f = Math.cos(n),
      d = Math.sin(n),
      p = u * o + r,
      m = h * a + i,
      g = f * o + r,
      v = d * a + i,
      y = o * l * c,
      b = a * l * c;
    t.push(p - y * h, m + b * u, g + y * d, v - b * f, g, v);
  }
  for (var y = 0; y < s;) {
    var b = a[y++],
      w = 1 === y;
    switch (w && (c = a[y], u = a[y + 1], h = c, f = u, b !== g.L && b !== g.C && b !== g.Q || (t = [h, f])), b) {
      case g.M:
        c = h = a[y++], u = f = a[y++], d(h, f);
        break;
      case g.L:
        n = a[y++], r = a[y++], p(c, u, n, r), c = n, u = r;
        break;
      case g.C:
        t.push(a[y++], a[y++], a[y++], a[y++], c = a[y++], u = a[y++]);
        break;
      case g.Q:
        n = a[y++], r = a[y++], i = a[y++], o = a[y++], t.push(c + 2 / 3 * (n - c), u + 2 / 3 * (r - u), i + 2 / 3 * (n - i), o + 2 / 3 * (r - o), i, o), c = i, u = o;
        break;
      case g.A:
        var x = a[y++],
          _ = a[y++],
          E = a[y++],
          S = a[y++],
          k = a[y++],
          C = a[y++] + k;
        y += 1;
        var O = !a[y++];
        n = Math.cos(k) * E + x, r = Math.sin(k) * S + _, w ? (h = n, f = r, d(h, f)) : p(c, u, n, r), c = Math.cos(C) * E + x, u = Math.sin(C) * S + _;
        for (var T = (O ? -1 : 1) * Math.PI / 2, L = k; O ? L > C : L < C; L += T) {
          var A = O ? Math.max(L + T, C) : Math.min(L + T, C);
          m(L, A, x, _, E, S);
        }
        break;
      case g.R:
        h = c = a[y++], f = u = a[y++], n = h + a[y++], r = f + a[y++], d(n, f), p(n, f, n, r), p(n, r, h, r), p(h, r, h, f), p(h, f, n, f);
        break;
      case g.Z:
        t && p(c, u, h, f), c = h, u = f;
        break;
    }
  }
  return t && t.length > 2 && l.push(t), l;
}
function b(e, t, n, i, o, a, s, l, c, u) {
  if (v(e, n) && v(t, i) && v(o, s) && v(a, l)) c.push(s, l);else {
    var h = 2 / u,
      f = h * h,
      d = s - e,
      p = l - t,
      m = Math.sqrt(d * d + p * p);
    d /= m, p /= m;
    var g = n - e,
      y = i - t,
      w = o - s,
      x = a - l,
      _ = g * g + y * y,
      E = w * w + x * x;
    if (_ < f && E < f) c.push(s, l);else {
      var S = d * g + p * y,
        k = -d * w - p * x,
        C = _ - S * S,
        O = E - k * k;
      if (C < f && S >= 0 && O < f && k >= 0) c.push(s, l);else {
        var T = [],
          L = [];
        Object(r["g"])(e, n, o, s, .5, T), Object(r["g"])(t, i, a, l, .5, L), b(T[0], L[0], T[1], L[1], T[2], L[2], T[3], L[3], c, u), b(T[4], L[4], T[5], L[5], T[6], L[6], T[7], L[7], c, u);
      }
    }
  }
}
function w(e, t) {
  var n = y(e),
    r = [];
  t = t || 1;
  for (var i = 0; i < n.length; i++) {
    var o = n[i],
      a = [],
      s = o[0],
      l = o[1];
    a.push(s, l);
    for (var c = 2; c < o.length;) {
      var u = o[c++],
        h = o[c++],
        f = o[c++],
        d = o[c++],
        p = o[c++],
        m = o[c++];
      b(s, l, u, h, f, d, p, m, a, t), s = p, l = m;
    }
    r.push(a);
  }
  return r;
}
function x(e, t, n) {
  var r = e[t],
    i = e[1 - t],
    o = Math.abs(r / i),
    a = Math.ceil(Math.sqrt(o * n)),
    s = Math.floor(n / a);
  0 === s && (s = 1, a = n);
  for (var l = [], c = 0; c < a; c++) l.push(s);
  var u = a * s,
    h = n - u;
  if (h > 0) for (c = 0; c < h; c++) l[c % a] += 1;
  return l;
}
function _(e, t, n) {
  for (var r = e.r0, i = e.r, o = e.startAngle, a = e.endAngle, s = Math.abs(a - o), l = s * i, c = i - r, u = l > Math.abs(c), h = x([l, c], u ? 0 : 1, t), f = (u ? s : c) / h.length, d = 0; d < h.length; d++) for (var p = (u ? c : s) / h[d], m = 0; m < h[d]; m++) {
    var g = {};
    u ? (g.startAngle = o + f * d, g.endAngle = o + f * (d + 1), g.r0 = r + p * m, g.r = r + p * (m + 1)) : (g.startAngle = o + p * m, g.endAngle = o + p * (m + 1), g.r0 = r + f * d, g.r = r + f * (d + 1)), g.clockwise = e.clockwise, g.cx = e.cx, g.cy = e.cy, n.push(g);
  }
}
function E(e, t, n) {
  for (var r = e.width, i = e.height, o = r > i, a = x([r, i], o ? 0 : 1, t), s = o ? "width" : "height", l = o ? "height" : "width", c = o ? "x" : "y", u = o ? "y" : "x", h = e[s] / a.length, f = 0; f < a.length; f++) for (var d = e[l] / a[f], p = 0; p < a[f]; p++) {
    var m = {};
    m[c] = f * h, m[u] = p * d, m[s] = h, m[l] = d, m.x += e.x, m.y += e.y, n.push(m);
  }
}
function S(e, t, n, r) {
  return e * r - n * t;
}
function k(e, t, n, r, i, o, a, s) {
  var l = n - e,
    c = r - t,
    u = a - i,
    f = s - o,
    d = S(u, f, l, c);
  if (Math.abs(d) < 1e-6) return null;
  var p = e - i,
    m = t - o,
    g = S(p, m, u, f) / d;
  return g < 0 || g > 1 ? null : new h["a"](g * l + e, g * c + t);
}
function C(e, t, n) {
  var r = new h["a"]();
  h["a"].sub(r, n, t), r.normalize();
  var i = new h["a"]();
  h["a"].sub(i, e, t);
  var o = i.dot(r);
  return o;
}
function O(e, t) {
  var n = e[e.length - 1];
  n && n[0] === t[0] && n[1] === t[1] || e.push(t);
}
function T(e, t, n) {
  for (var r = e.length, i = [], o = 0; o < r; o++) {
    var a = e[o],
      s = e[(o + 1) % r],
      l = k(a[0], a[1], s[0], s[1], t.x, t.y, n.x, n.y);
    l && i.push({
      projPt: C(l, t, n),
      pt: l,
      idx: o
    });
  }
  if (i.length < 2) return [{
    points: e
  }, {
    points: e
  }];
  i.sort(function (e, t) {
    return e.projPt - t.projPt;
  });
  var c = i[0],
    u = i[i.length - 1];
  if (u.idx < c.idx) {
    var h = c;
    c = u, u = h;
  }
  var f = [c.pt.x, c.pt.y],
    d = [u.pt.x, u.pt.y],
    p = [f],
    m = [d];
  for (o = c.idx + 1; o <= u.idx; o++) O(p, e[o].slice());
  O(p, d), O(p, f);
  for (o = u.idx + 1; o <= c.idx + r; o++) O(m, e[o % r].slice());
  return O(m, f), O(m, d), [{
    points: p
  }, {
    points: m
  }];
}
function L(e) {
  var t = e.points,
    n = [],
    r = [];
  Object(c["d"])(t, n, r);
  var i = new u["a"](n[0], n[1], r[0] - n[0], r[1] - n[1]),
    o = i.width,
    a = i.height,
    s = i.x,
    l = i.y,
    f = new h["a"](),
    d = new h["a"]();
  return o > a ? (f.x = d.x = s + o / 2, f.y = l, d.y = l + a) : (f.y = d.y = l + a / 2, f.x = s, d.x = s + o), T(t, f, d);
}
function A(e, t, n, r) {
  if (1 === n) r.push(t);else {
    var i = Math.floor(n / 2),
      o = e(t);
    A(e, o[0], i, r), A(e, o[1], n - i, r);
  }
  return r;
}
function P(e, t) {
  for (var n = [], r = 0; r < t; r++) n.push(Object(s["a"])(e));
  return n;
}
function j(e, t) {
  t.setStyle(e.style), t.z = e.z, t.z2 = e.z2, t.zlevel = e.zlevel;
}
function M(e) {
  for (var t = [], n = 0; n < e.length;) t.push([e[n++], e[n++]]);
  return t;
}
function R(e, t) {
  var n,
    r = [],
    i = e.shape;
  switch (e.type) {
    case "rect":
      E(i, t, r), n = d["a"];
      break;
    case "sector":
      _(i, t, r), n = p["a"];
      break;
    case "circle":
      _({
        r0: 0,
        r: i.r,
        startAngle: 0,
        endAngle: 2 * Math.PI,
        cx: i.cx,
        cy: i.cy
      }, t, r), n = p["a"];
      break;
    default:
      var a = e.getComputedTransform(),
        s = a ? Math.sqrt(Math.max(a[0] * a[0] + a[1] * a[1], a[2] * a[2] + a[3] * a[3])) : 1,
        l = Object(o["D"])(w(e.getUpdatedPathProxy(), s), function (e) {
          return M(e);
        }),
        u = l.length;
      if (0 === u) A(L, {
        points: l[0]
      }, t, r);else if (u === t) for (var h = 0; h < u; h++) r.push({
        points: l[h]
      });else {
        var m = 0,
          g = Object(o["D"])(l, function (e) {
            var t = [],
              n = [];
            Object(c["d"])(e, t, n);
            var r = (n[1] - t[1]) * (n[0] - t[0]);
            return m += r, {
              poly: e,
              area: r
            };
          });
        g.sort(function (e, t) {
          return t.area - e.area;
        });
        var v = t;
        for (h = 0; h < u; h++) {
          var y = g[h];
          if (v <= 0) break;
          var b = h === u - 1 ? v : Math.ceil(y.area / m * t);
          b < 0 || (A(L, {
            points: y.poly
          }, b, r), v -= b);
        }
      }
      n = f["a"];
      break;
  }
  if (!n) return P(e, t);
  var x = [];
  for (h = 0; h < r.length; h++) {
    var S = new n();
    S.setShape(r[h]), j(e, S), x.push(S);
  }
  return x;
}
function N(e, t) {
  var n = e.length,
    i = t.length;
  if (n === i) return [e, t];
  for (var o = [], a = [], s = n < i ? e : t, l = Math.min(n, i), c = Math.abs(i - n) / 6, u = (l - 2) / 6, h = Math.ceil(c / u) + 1, f = [s[0], s[1]], d = c, p = 2; p < l;) {
    var m = s[p - 2],
      g = s[p - 1],
      v = s[p++],
      y = s[p++],
      b = s[p++],
      w = s[p++],
      x = s[p++],
      _ = s[p++];
    if (d <= 0) f.push(v, y, b, w, x, _);else {
      for (var E = Math.min(d, h - 1) + 1, S = 1; S <= E; S++) {
        var k = S / E;
        Object(r["g"])(m, v, b, x, k, o), Object(r["g"])(g, y, w, _, k, a), m = o[3], g = a[3], f.push(o[1], a[1], o[2], a[2], m, g), v = o[5], y = a[5], b = o[6], w = a[6];
      }
      d -= E - 1;
    }
  }
  return s === e ? [f, t] : [e, f];
}
function D(e, t) {
  for (var n = e.length, r = e[n - 2], i = e[n - 1], o = [], a = 0; a < t.length;) o[a++] = r, o[a++] = i;
  return o;
}
function I(e, t) {
  for (var n, r, i, o = [], a = [], s = 0; s < Math.max(e.length, t.length); s++) {
    var l = e[s],
      c = t[s],
      u = void 0,
      h = void 0;
    l ? c ? (n = N(l, c), u = n[0], h = n[1], r = u, i = h) : (h = D(i || l, l), u = l) : (u = D(r || c, c), h = c), o.push(u), a.push(h);
  }
  return [o, a];
}
function $(e) {
  for (var t = 0, n = 0, r = 0, i = e.length, o = 0, a = i - 2; o < i; a = o, o += 2) {
    var s = e[a],
      l = e[a + 1],
      c = e[o],
      u = e[o + 1],
      h = s * u - c * l;
    t += h, n += (s + c) * h, r += (l + u) * h;
  }
  return 0 === t ? [e[0] || 0, e[1] || 0] : [n / t / 3, r / t / 3, t];
}
function F(e, t, n, r) {
  for (var i = (e.length - 2) / 6, o = 1 / 0, a = 0, s = e.length, l = s - 2, c = 0; c < i; c++) {
    for (var u = 6 * c, h = 0, f = 0; f < s; f += 2) {
      var d = 0 === f ? u : (u + f - 2) % l + 2,
        p = e[d] - n[0],
        m = e[d + 1] - n[1],
        g = t[f] - r[0],
        v = t[f + 1] - r[1],
        y = g - p,
        b = v - m;
      h += y * y + b * b;
    }
    h < o && (o = h, a = c);
  }
  return a;
}
function B(e) {
  for (var t = [], n = e.length, r = 0; r < n; r += 2) t[r] = e[n - r - 2], t[r + 1] = e[n - r - 1];
  return t;
}
function V(e, t, n, r) {
  for (var i, o = [], a = 0; a < e.length; a++) {
    var s = e[a],
      l = t[a],
      c = $(s),
      u = $(l);
    null == i && (i = c[2] < 0 !== u[2] < 0);
    var h = [],
      f = [],
      d = 0,
      p = 1 / 0,
      m = [],
      g = s.length;
    i && (s = B(s));
    for (var v = 6 * F(s, l, c, u), y = g - 2, b = 0; b < y; b += 2) {
      var w = (v + b) % y + 2;
      h[b + 2] = s[w] - c[0], h[b + 3] = s[w + 1] - c[1];
    }
    if (h[0] = s[v] - c[0], h[1] = s[v + 1] - c[1], n > 0) for (var x = r / n, _ = -r / 2; _ <= r / 2; _ += x) {
      var E = Math.sin(_),
        S = Math.cos(_),
        k = 0;
      for (b = 0; b < s.length; b += 2) {
        var C = h[b],
          O = h[b + 1],
          T = l[b] - u[0],
          L = l[b + 1] - u[1],
          A = T * S - L * E,
          P = T * E + L * S;
        m[b] = A, m[b + 1] = P;
        var j = A - C,
          M = P - O;
        k += j * j + M * M;
      }
      if (k < p) {
        p = k, d = _;
        for (var R = 0; R < m.length; R++) f[R] = m[R];
      }
    } else for (var N = 0; N < g; N += 2) f[N] = l[N] - u[0], f[N + 1] = l[N + 1] - u[1];
    o.push({
      from: h,
      to: f,
      fromCp: c,
      toCp: u,
      rotation: -d
    });
  }
  return o;
}
function W(e) {
  return e.__isCombineMorphing;
}
defineExport(legacyExports, "b", function () {
  return W;
}), defineExport(legacyExports, "c", function () {
  return K;
}), defineExport(legacyExports, "a", function () {
  return J;
}), defineExport(legacyExports, "d", function () {
  return ee;
});
var H = "__mOriginal_";
function U(e, t, n) {
  var r = H + t,
    i = e[r] || e[t];
  e[r] || (e[r] = e[t]);
  var o = n.replace,
    a = n.after,
    s = n.before;
  e[t] = function () {
    var e,
      t = arguments;
    return s && s.apply(this, t), e = o ? o.apply(this, t) : i.apply(this, t), a && a.apply(this, t), e;
  };
}
function z(e, t) {
  var n = H + t;
  e[n] && (e[t] = e[n], e[n] = null);
}
function G(e, t) {
  for (var n = 0; n < e.length; n++) for (var r = e[n], i = 0; i < r.length;) {
    var o = r[i],
      a = r[i + 1];
    r[i++] = t[0] * o + t[2] * a + t[4], r[i++] = t[1] * o + t[3] * a + t[5];
  }
}
function q(e, t) {
  var n = e.getUpdatedPathProxy(),
    r = t.getUpdatedPathProxy(),
    i = I(y(n), y(r)),
    o = i[0],
    s = i[1],
    l = e.getComputedTransform(),
    c = t.getComputedTransform();
  function u() {
    this.transform = null;
  }
  l && G(o, l), c && G(s, c), U(t, "updateTransform", {
    replace: u
  }), t.transform = null;
  var h = V(o, s, 10, Math.PI),
    f = [];
  U(t, "buildPath", {
    replace: function (e) {
      for (var n = t.__morphT, r = 1 - n, i = [], o = 0; o < h.length; o++) {
        var s = h[o],
          l = s.from,
          c = s.to,
          u = s.rotation * n,
          d = s.fromCp,
          p = s.toCp,
          m = Math.sin(u),
          g = Math.cos(u);
        Object(a["h"])(i, d, p, n);
        for (var v = 0; v < l.length; v += 2) {
          var y = l[v],
            b = l[v + 1],
            w = c[v],
            x = c[v + 1],
            _ = y * r + w * n,
            E = b * r + x * n;
          f[v] = _ * g - E * m + i[0], f[v + 1] = _ * m + E * g + i[1];
        }
        var S = f[0],
          k = f[1];
        e.moveTo(S, k);
        for (v = 2; v < l.length;) {
          w = f[v++], x = f[v++];
          var C = f[v++],
            O = f[v++],
            T = f[v++],
            L = f[v++];
          S === w && k === x && C === T && O === L ? e.lineTo(T, L) : e.bezierCurveTo(w, x, C, O, T, L), S = T, k = L;
        }
      }
    }
  });
}
function K(e, t, n) {
  if (!e || !t) return t;
  var r = n.done,
    i = n.during;
  function a() {
    z(t, "buildPath"), z(t, "updateTransform"), t.__morphT = -1, t.createPathProxy(), t.dirtyShape();
  }
  return q(e, t), t.__morphT = 0, t.animateTo({
    __morphT: 1
  }, Object(o["i"])({
    during: function (e) {
      t.dirtyShape(), i && i(e);
    },
    done: function () {
      a(), r && r();
    }
  }, n)), t;
}
function Y(e, t, n, r, i, o) {
  var a = 16;
  e = i === n ? 0 : Math.round(32767 * (e - n) / (i - n)), t = o === r ? 0 : Math.round(32767 * (t - r) / (o - r));
  for (var s, l = 0, c = (1 << a) / 2; c > 0; c /= 2) {
    var u = 0,
      h = 0;
    (e & c) > 0 && (u = 1), (t & c) > 0 && (h = 1), l += c * c * (3 * u ^ h), 0 === h && (1 === u && (e = c - 1 - e, t = c - 1 - t), s = e, e = t, t = s);
  }
  return l;
}
function X(e) {
  var t = 1 / 0,
    n = 1 / 0,
    r = -1 / 0,
    i = -1 / 0,
    a = Object(o["D"])(e, function (e) {
      var o = e.getBoundingRect(),
        a = e.getComputedTransform(),
        s = o.x + o.width / 2 + (a ? a[4] : 0),
        l = o.y + o.height / 2 + (a ? a[5] : 0);
      return t = Math.min(s, t), n = Math.min(l, n), r = Math.max(s, r), i = Math.max(l, i), [s, l];
    }),
    s = Object(o["D"])(a, function (o, a) {
      return {
        cp: o,
        z: Y(o[0], o[1], t, n, r, i),
        path: e[a]
      };
    });
  return s.sort(function (e, t) {
    return e.z - t.z;
  }).map(function (e) {
    return e.path;
  });
}
function Q(e) {
  return R(e.path, e.count);
}
function Z() {
  return {
    fromIndividuals: [],
    toIndividuals: [],
    count: 0
  };
}
function J(e, t, n) {
  var r = [];
  function a(e) {
    for (var t = 0; t < e.length; t++) {
      var n = e[t];
      W(n) ? a(n.childrenRef()) : n instanceof i["b"] && r.push(n);
    }
  }
  a(e);
  var s = r.length;
  if (!s) return Z();
  var c = n.dividePath || Q,
    u = c({
      path: t,
      count: s
    });
  if (u.length !== s) return console.error("Invalid morphing: unmatched splitted path"), Z();
  r = X(r), u = X(u);
  for (var h = n.done, f = n.during, d = n.individualDelay, p = new l["c"](), m = 0; m < s; m++) {
    var g = r[m],
      v = u[m];
    v.parent = t, v.copyTransform(p), d || q(g, v);
  }
  function y(e) {
    for (var t = 0; t < u.length; t++) u[t].addSelfToZr(e);
  }
  function b() {
    t.__isCombineMorphing = !1, t.__morphT = -1, t.childrenRef = null, z(t, "addSelfToZr"), z(t, "removeSelfFromZr");
  }
  t.__isCombineMorphing = !0, t.childrenRef = function () {
    return u;
  }, U(t, "addSelfToZr", {
    after: function (e) {
      y(e);
    }
  }), U(t, "removeSelfFromZr", {
    after: function (e) {
      for (var t = 0; t < u.length; t++) u[t].removeSelfFromZr(e);
    }
  });
  var w = u.length;
  if (d) {
    var x = w,
      _ = function () {
        x--, 0 === x && (b(), h && h());
      };
    for (m = 0; m < w; m++) {
      var E = d ? Object(o["i"])({
        delay: (n.delay || 0) + d(m, w, r[m], u[m]),
        done: _
      }, n) : n;
      K(r[m], u[m], E);
    }
  } else t.__morphT = 0, t.animateTo({
    __morphT: 1
  }, Object(o["i"])({
    during: function (e) {
      for (var n = 0; n < w; n++) {
        var r = u[n];
        r.__morphT = t.__morphT, r.dirtyShape();
      }
      f && f(e);
    },
    done: function () {
      b();
      for (var t = 0; t < e.length; t++) z(e[t], "updateTransform");
      h && h();
    }
  }, n));
  return t.__zr && y(t.__zr), {
    fromIndividuals: r,
    toIndividuals: u,
    count: w
  };
}
function ee(e, t, n) {
  var r = t.length,
    a = [],
    l = n.dividePath || Q;
  function c(e) {
    for (var t = 0; t < e.length; t++) {
      var n = e[t];
      W(n) ? c(n.childrenRef()) : n instanceof i["b"] && a.push(n);
    }
  }
  if (W(e)) {
    c(e.childrenRef());
    var u = a.length;
    if (u < r) for (var h = 0, f = u; f < r; f++) a.push(Object(s["a"])(a[h++ % u]));
    a.length = r;
  } else {
    a = l({
      path: e,
      count: r
    });
    var d = e.getComputedTransform();
    for (f = 0; f < a.length; f++) a[f].setLocalTransform(d);
    if (a.length !== r) return console.error("Invalid morphing: unmatched splitted path"), Z();
  }
  a = X(a), t = X(t);
  var p = n.individualDelay;
  for (f = 0; f < r; f++) {
    var m = p ? Object(o["i"])({
      delay: (n.delay || 0) + p(f, r, a[f], t[f])
    }, n) : n;
    K(a[f], t[f], m);
  }
  return {
    fromIndividuals: a,
    toIndividuals: t,
    count: t.length
  };
}
