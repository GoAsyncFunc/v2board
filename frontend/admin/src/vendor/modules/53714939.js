let legacyModule = module,
  legacyExports = exports;
var r = require("./6d725347.js"),
  i = require("./792b5674.js"),
  o = require("./62597459.js"),
  a = Math.PI,
  s = 2 * a,
  l = Math.sin,
  c = Math.cos,
  u = Math.acos,
  h = Math.atan2,
  f = Math.abs,
  d = Math.sqrt,
  p = Math.max,
  m = Math.min,
  g = 1e-4;
function v(e, t, n, r, i, o, a, s) {
  var l = n - e,
    c = r - t,
    u = a - i,
    h = s - o,
    f = h * l - u * c;
  if (!(f * f < g)) return f = (u * (t - o) - h * (e - i)) / f, [e + f * l, t + f * c];
}
function y(e, t, n, r, i, o, a) {
  var s = e - n,
    l = t - r,
    c = (a ? o : -o) / d(s * s + l * l),
    u = c * l,
    h = -c * s,
    f = e + u,
    m = t + h,
    g = n + u,
    v = r + h,
    y = (f + g) / 2,
    b = (m + v) / 2,
    w = g - f,
    x = v - m,
    _ = w * w + x * x,
    E = i - o,
    S = f * v - g * m,
    k = (x < 0 ? -1 : 1) * d(p(0, E * E * _ - S * S)),
    C = (S * x - w * k) / _,
    O = (-S * w - x * k) / _,
    T = (S * x + w * k) / _,
    L = (-S * w + x * k) / _,
    A = C - y,
    P = O - b,
    j = T - y,
    M = L - b;
  return A * A + P * P > j * j + M * M && (C = T, O = L), {
    cx: C,
    cy: O,
    x0: -u,
    y0: -h,
    x1: C * (i / E - 1),
    y1: O * (i / E - 1)
  };
}
function b(e) {
  var t;
  if (Object(o["r"])(e)) {
    var n = e.length;
    if (!n) return e;
    t = 1 === n ? [e[0], e[0], 0, 0] : 2 === n ? [e[0], e[0], e[1], e[1]] : 3 === n ? e.concat(e[2]) : e;
  } else t = [e, e, e, e];
  return t;
}
function w(e, t) {
  var n,
    r = p(t.r, 0),
    i = p(t.r0 || 0, 0),
    o = r > 0,
    w = i > 0;
  if (o || w) {
    if (o || (r = i, i = 0), i > r) {
      var x = r;
      r = i, i = x;
    }
    var _ = t.startAngle,
      E = t.endAngle;
    if (!isNaN(_) && !isNaN(E)) {
      var S = t.cx,
        k = t.cy,
        C = !!t.clockwise,
        O = f(E - _),
        T = O > s && O % s;
      if (T > g && (O = T), r > g) {
        if (O > s - g) e.moveTo(S + r * c(_), k + r * l(_)), e.arc(S, k, r, _, E, !C), i > g && (e.moveTo(S + i * c(E), k + i * l(E)), e.arc(S, k, i, E, _, C));else {
          var L = void 0,
            A = void 0,
            P = void 0,
            j = void 0,
            M = void 0,
            R = void 0,
            N = void 0,
            D = void 0,
            I = void 0,
            $ = void 0,
            F = void 0,
            B = void 0,
            V = void 0,
            W = void 0,
            H = void 0,
            U = void 0,
            z = r * c(_),
            G = r * l(_),
            q = i * c(E),
            K = i * l(E),
            Y = O > g;
          if (Y) {
            var X = t.cornerRadius;
            X && (n = b(X), L = n[0], A = n[1], P = n[2], j = n[3]);
            var Q = f(r - i) / 2;
            if (M = m(Q, P), R = m(Q, j), N = m(Q, L), D = m(Q, A), F = I = p(M, R), B = $ = p(N, D), (I > g || $ > g) && (V = r * c(E), W = r * l(E), H = i * c(_), U = i * l(_), O < a)) {
              var Z = v(z, G, H, U, V, W, q, K);
              if (Z) {
                var J = z - Z[0],
                  ee = G - Z[1],
                  te = V - Z[0],
                  ne = W - Z[1],
                  re = 1 / l(u((J * te + ee * ne) / (d(J * J + ee * ee) * d(te * te + ne * ne))) / 2),
                  ie = d(Z[0] * Z[0] + Z[1] * Z[1]);
                F = m(I, (r - ie) / (re + 1)), B = m($, (i - ie) / (re - 1));
              }
            }
          }
          if (Y) {
            if (F > g) {
              var oe = m(P, F),
                ae = m(j, F),
                se = y(H, U, z, G, r, oe, C),
                le = y(V, W, q, K, r, ae, C);
              e.moveTo(S + se.cx + se.x0, k + se.cy + se.y0), F < I && oe === ae ? e.arc(S + se.cx, k + se.cy, F, h(se.y0, se.x0), h(le.y0, le.x0), !C) : (oe > 0 && e.arc(S + se.cx, k + se.cy, oe, h(se.y0, se.x0), h(se.y1, se.x1), !C), e.arc(S, k, r, h(se.cy + se.y1, se.cx + se.x1), h(le.cy + le.y1, le.cx + le.x1), !C), ae > 0 && e.arc(S + le.cx, k + le.cy, ae, h(le.y1, le.x1), h(le.y0, le.x0), !C));
            } else e.moveTo(S + z, k + G), e.arc(S, k, r, _, E, !C);
          } else e.moveTo(S + z, k + G);
          if (i > g && Y) {
            if (B > g) {
              oe = m(L, B), ae = m(A, B), se = y(q, K, V, W, i, -ae, C), le = y(z, G, H, U, i, -oe, C);
              e.lineTo(S + se.cx + se.x0, k + se.cy + se.y0), B < $ && oe === ae ? e.arc(S + se.cx, k + se.cy, B, h(se.y0, se.x0), h(le.y0, le.x0), !C) : (ae > 0 && e.arc(S + se.cx, k + se.cy, ae, h(se.y0, se.x0), h(se.y1, se.x1), !C), e.arc(S, k, i, h(se.cy + se.y1, se.cx + se.x1), h(le.cy + le.y1, le.cx + le.x1), C), oe > 0 && e.arc(S + le.cx, k + le.cy, oe, h(le.y1, le.x1), h(le.y0, le.x0), !C));
            } else e.lineTo(S + q, k + K), e.arc(S, k, i, E, _, C);
          } else e.lineTo(S + q, k + K);
        }
      } else e.moveTo(S, k);
      e.closePath();
    }
  }
}
var x = function () {
    function e() {
      this.cx = 0, this.cy = 0, this.r0 = 0, this.r = 0, this.startAngle = 0, this.endAngle = 2 * Math.PI, this.clockwise = !0, this.cornerRadius = 0;
    }
    return e;
  }(),
  _ = function (e) {
    function t(t) {
      return e.call(this, t) || this;
    }
    return Object(r["a"])(t, e), t.prototype.getDefaultShape = function () {
      return new x();
    }, t.prototype.buildPath = function (e, t) {
      w(e, t);
    }, t.prototype.isZeroArea = function () {
      return this.shape.startAngle === this.shape.endAngle || this.shape.r === this.shape.r0;
    }, t;
  }(i["b"]);
_.prototype.type = "sector";
legacyExports["a"] = _;
