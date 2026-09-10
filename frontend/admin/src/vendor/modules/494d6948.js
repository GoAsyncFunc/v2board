let legacyModule = module,
  legacyExports = exports;
var r = require("./5142737a.js"),
  i = require("./6d464469.js"),
  o = require("./4c505441.js"),
  a = require("./346d4e37.js"),
  s = require("./536a3969.js"),
  l = {
    M: 1,
    L: 2,
    C: 3,
    Q: 4,
    A: 5,
    Z: 6,
    R: 7
  },
  c = [],
  u = [],
  h = [],
  f = [],
  d = [],
  p = [],
  m = Math.min,
  g = Math.max,
  v = Math.cos,
  y = Math.sin,
  b = Math.abs,
  w = Math.PI,
  x = 2 * w,
  _ = "undefined" !== typeof Float32Array,
  E = [];
function S(e) {
  var t = Math.round(e / w * 1e8) / 1e8;
  return t % 2 * w;
}
function k(e, t) {
  var n = S(e[0]);
  n < 0 && (n += x);
  var r = n - e[0],
    i = e[1];
  i += r, !t && i - n >= x ? i = n + x : t && n - i >= x ? i = n - x : !t && n > i ? i = n + (x - S(n - i)) : t && n < i && (i = n - (x - S(i - n))), e[0] = n, e[1] = i;
}
var C = function () {
  function e(e) {
    this.dpr = 1, this._xi = 0, this._yi = 0, this._x0 = 0, this._y0 = 0, this._len = 0, e && (this._saveData = !1), this._saveData && (this.data = []);
  }
  return e.prototype.increaseVersion = function () {
    this._version++;
  }, e.prototype.getVersion = function () {
    return this._version;
  }, e.prototype.setScale = function (e, t, n) {
    n = n || 0, n > 0 && (this._ux = b(n / o["e"] / e) || 0, this._uy = b(n / o["e"] / t) || 0);
  }, e.prototype.setDPR = function (e) {
    this.dpr = e;
  }, e.prototype.setContext = function (e) {
    this._ctx = e;
  }, e.prototype.getContext = function () {
    return this._ctx;
  }, e.prototype.beginPath = function () {
    return this._ctx && this._ctx.beginPath(), this.reset(), this;
  }, e.prototype.reset = function () {
    this._saveData && (this._len = 0), this._pathSegLen && (this._pathSegLen = null, this._pathLen = 0), this._version++;
  }, e.prototype.moveTo = function (e, t) {
    return this._drawPendingPt(), this.addData(l.M, e, t), this._ctx && this._ctx.moveTo(e, t), this._x0 = e, this._y0 = t, this._xi = e, this._yi = t, this;
  }, e.prototype.lineTo = function (e, t) {
    var n = b(e - this._xi),
      r = b(t - this._yi),
      i = n > this._ux || r > this._uy;
    if (this.addData(l.L, e, t), this._ctx && i && this._ctx.lineTo(e, t), i) this._xi = e, this._yi = t, this._pendingPtDist = 0;else {
      var o = n * n + r * r;
      o > this._pendingPtDist && (this._pendingPtX = e, this._pendingPtY = t, this._pendingPtDist = o);
    }
    return this;
  }, e.prototype.bezierCurveTo = function (e, t, n, r, i, o) {
    return this._drawPendingPt(), this.addData(l.C, e, t, n, r, i, o), this._ctx && this._ctx.bezierCurveTo(e, t, n, r, i, o), this._xi = i, this._yi = o, this;
  }, e.prototype.quadraticCurveTo = function (e, t, n, r) {
    return this._drawPendingPt(), this.addData(l.Q, e, t, n, r), this._ctx && this._ctx.quadraticCurveTo(e, t, n, r), this._xi = n, this._yi = r, this;
  }, e.prototype.arc = function (e, t, n, r, i, o) {
    this._drawPendingPt(), E[0] = r, E[1] = i, k(E, o), r = E[0], i = E[1];
    var a = i - r;
    return this.addData(l.A, e, t, n, n, r, a, 0, o ? 0 : 1), this._ctx && this._ctx.arc(e, t, n, r, i, o), this._xi = v(i) * n + e, this._yi = y(i) * n + t, this;
  }, e.prototype.arcTo = function (e, t, n, r, i) {
    return this._drawPendingPt(), this._ctx && this._ctx.arcTo(e, t, n, r, i), this;
  }, e.prototype.rect = function (e, t, n, r) {
    return this._drawPendingPt(), this._ctx && this._ctx.rect(e, t, n, r), this.addData(l.R, e, t, n, r), this;
  }, e.prototype.closePath = function () {
    this._drawPendingPt(), this.addData(l.Z);
    var e = this._ctx,
      t = this._x0,
      n = this._y0;
    return e && e.closePath(), this._xi = t, this._yi = n, this;
  }, e.prototype.fill = function (e) {
    e && e.fill(), this.toStatic();
  }, e.prototype.stroke = function (e) {
    e && e.stroke(), this.toStatic();
  }, e.prototype.len = function () {
    return this._len;
  }, e.prototype.setData = function (e) {
    var t = e.length;
    this.data && this.data.length === t || !_ || (this.data = new Float32Array(t));
    for (var n = 0; n < t; n++) this.data[n] = e[n];
    this._len = t;
  }, e.prototype.appendPath = function (e) {
    e instanceof Array || (e = [e]);
    for (var t = e.length, n = 0, r = this._len, i = 0; i < t; i++) n += e[i].len();
    _ && this.data instanceof Float32Array && (this.data = new Float32Array(r + n));
    for (i = 0; i < t; i++) for (var o = e[i].data, a = 0; a < o.length; a++) this.data[r++] = o[a];
    this._len = r;
  }, e.prototype.addData = function (e, t, n, r, i, o, a, s, l) {
    if (this._saveData) {
      var c = this.data;
      this._len + arguments.length > c.length && (this._expandData(), c = this.data);
      for (var u = 0; u < arguments.length; u++) c[this._len++] = arguments[u];
    }
  }, e.prototype._drawPendingPt = function () {
    this._pendingPtDist > 0 && (this._ctx && this._ctx.lineTo(this._pendingPtX, this._pendingPtY), this._pendingPtDist = 0);
  }, e.prototype._expandData = function () {
    if (!(this.data instanceof Array)) {
      for (var e = [], t = 0; t < this._len; t++) e[t] = this.data[t];
      this.data = e;
    }
  }, e.prototype.toStatic = function () {
    if (this._saveData) {
      this._drawPendingPt();
      var e = this.data;
      e instanceof Array && (e.length = this._len, _ && this._len > 11 && (this.data = new Float32Array(e)));
    }
  }, e.prototype.getBoundingRect = function () {
    h[0] = h[1] = d[0] = d[1] = Number.MAX_VALUE, f[0] = f[1] = p[0] = p[1] = -Number.MAX_VALUE;
    var e,
      t = this.data,
      n = 0,
      o = 0,
      s = 0,
      c = 0;
    for (e = 0; e < this._len;) {
      var u = t[e++],
        m = 1 === e;
      switch (m && (n = t[e], o = t[e + 1], s = n, c = o), u) {
        case l.M:
          n = s = t[e++], o = c = t[e++], d[0] = s, d[1] = c, p[0] = s, p[1] = c;
          break;
        case l.L:
          Object(a["c"])(n, o, t[e], t[e + 1], d, p), n = t[e++], o = t[e++];
          break;
        case l.C:
          Object(a["b"])(n, o, t[e++], t[e++], t[e++], t[e++], t[e], t[e + 1], d, p), n = t[e++], o = t[e++];
          break;
        case l.Q:
          Object(a["e"])(n, o, t[e++], t[e++], t[e], t[e + 1], d, p), n = t[e++], o = t[e++];
          break;
        case l.A:
          var g = t[e++],
            b = t[e++],
            w = t[e++],
            x = t[e++],
            _ = t[e++],
            E = t[e++] + _;
          e += 1;
          var S = !t[e++];
          m && (s = v(_) * w + g, c = y(_) * x + b), Object(a["a"])(g, b, w, x, _, E, S, d, p), n = v(E) * w + g, o = y(E) * x + b;
          break;
        case l.R:
          s = n = t[e++], c = o = t[e++];
          var k = t[e++],
            C = t[e++];
          Object(a["c"])(s, c, s + k, c + C, d, p);
          break;
        case l.Z:
          n = s, o = c;
          break;
      }
      r["j"](h, h, d), r["i"](f, f, p);
    }
    return 0 === e && (h[0] = h[1] = f[0] = f[1] = 0), new i["a"](h[0], h[1], f[0] - h[0], f[1] - h[1]);
  }, e.prototype._calculateLength = function () {
    var e = this.data,
      t = this._len,
      n = this._ux,
      r = this._uy,
      i = 0,
      o = 0,
      a = 0,
      c = 0;
    this._pathSegLen || (this._pathSegLen = []);
    for (var u = this._pathSegLen, h = 0, f = 0, d = 0; d < t;) {
      var p = e[d++],
        w = 1 === d;
      w && (i = e[d], o = e[d + 1], a = i, c = o);
      var _ = -1;
      switch (p) {
        case l.M:
          i = a = e[d++], o = c = e[d++];
          break;
        case l.L:
          var E = e[d++],
            S = e[d++],
            k = E - i,
            C = S - o;
          (b(k) > n || b(C) > r || d === t - 1) && (_ = Math.sqrt(k * k + C * C), i = E, o = S);
          break;
        case l.C:
          var O = e[d++],
            T = e[d++],
            L = (E = e[d++], S = e[d++], e[d++]),
            A = e[d++];
          _ = Object(s["d"])(i, o, O, T, E, S, L, A, 10), i = L, o = A;
          break;
        case l.Q:
          O = e[d++], T = e[d++], E = e[d++], S = e[d++];
          _ = Object(s["k"])(i, o, O, T, E, S, 10), i = E, o = S;
          break;
        case l.A:
          var P = e[d++],
            j = e[d++],
            M = e[d++],
            R = e[d++],
            N = e[d++],
            D = e[d++],
            I = D + N;
          d += 1;
          e[d++];
          w && (a = v(N) * M + P, c = y(N) * R + j), _ = g(M, R) * m(x, Math.abs(D)), i = v(I) * M + P, o = y(I) * R + j;
          break;
        case l.R:
          a = i = e[d++], c = o = e[d++];
          var $ = e[d++],
            F = e[d++];
          _ = 2 * $ + 2 * F;
          break;
        case l.Z:
          k = a - i, C = c - o;
          _ = Math.sqrt(k * k + C * C), i = a, o = c;
          break;
      }
      _ >= 0 && (u[f++] = _, h += _);
    }
    return this._pathLen = h, h;
  }, e.prototype.rebuildPath = function (e, t) {
    var n,
      r,
      i,
      o,
      a,
      h,
      f,
      d,
      p,
      w,
      x,
      _ = this.data,
      E = this._ux,
      S = this._uy,
      k = this._len,
      C = t < 1,
      O = 0,
      T = 0,
      L = 0;
    if (!C || (this._pathSegLen || this._calculateLength(), f = this._pathSegLen, d = this._pathLen, p = t * d, p)) e: for (var A = 0; A < k;) {
      var P = _[A++],
        j = 1 === A;
      switch (j && (i = _[A], o = _[A + 1], n = i, r = o), P !== l.L && L > 0 && (e.lineTo(w, x), L = 0), P) {
        case l.M:
          n = i = _[A++], r = o = _[A++], e.moveTo(i, o);
          break;
        case l.L:
          a = _[A++], h = _[A++];
          var M = b(a - i),
            R = b(h - o);
          if (M > E || R > S) {
            if (C) {
              var N = f[T++];
              if (O + N > p) {
                var D = (p - O) / N;
                e.lineTo(i * (1 - D) + a * D, o * (1 - D) + h * D);
                break e;
              }
              O += N;
            }
            e.lineTo(a, h), i = a, o = h, L = 0;
          } else {
            var I = M * M + R * R;
            I > L && (w = a, x = h, L = I);
          }
          break;
        case l.C:
          var $ = _[A++],
            F = _[A++],
            B = _[A++],
            V = _[A++],
            W = _[A++],
            H = _[A++];
          if (C) {
            N = f[T++];
            if (O + N > p) {
              D = (p - O) / N;
              Object(s["g"])(i, $, B, W, D, c), Object(s["g"])(o, F, V, H, D, u), e.bezierCurveTo(c[1], u[1], c[2], u[2], c[3], u[3]);
              break e;
            }
            O += N;
          }
          e.bezierCurveTo($, F, B, V, W, H), i = W, o = H;
          break;
        case l.Q:
          $ = _[A++], F = _[A++], B = _[A++], V = _[A++];
          if (C) {
            N = f[T++];
            if (O + N > p) {
              D = (p - O) / N;
              Object(s["n"])(i, $, B, D, c), Object(s["n"])(o, F, V, D, u), e.quadraticCurveTo(c[1], u[1], c[2], u[2]);
              break e;
            }
            O += N;
          }
          e.quadraticCurveTo($, F, B, V), i = B, o = V;
          break;
        case l.A:
          var U = _[A++],
            z = _[A++],
            G = _[A++],
            q = _[A++],
            K = _[A++],
            Y = _[A++],
            X = _[A++],
            Q = !_[A++],
            Z = G > q ? G : q,
            J = b(G - q) > .001,
            ee = K + Y,
            te = !1;
          if (C) {
            N = f[T++];
            O + N > p && (ee = K + Y * (p - O) / N, te = !0), O += N;
          }
          if (J && e.ellipse ? e.ellipse(U, z, G, q, X, K, ee, Q) : e.arc(U, z, Z, K, ee, Q), te) break e;
          j && (n = v(K) * G + U, r = y(K) * q + z), i = v(ee) * G + U, o = y(ee) * q + z;
          break;
        case l.R:
          n = i = _[A], r = o = _[A + 1], a = _[A++], h = _[A++];
          var ne = _[A++],
            re = _[A++];
          if (C) {
            N = f[T++];
            if (O + N > p) {
              var ie = p - O;
              e.moveTo(a, h), e.lineTo(a + m(ie, ne), h), ie -= ne, ie > 0 && e.lineTo(a + ne, h + m(ie, re)), ie -= re, ie > 0 && e.lineTo(a + g(ne - ie, 0), h + re), ie -= ne, ie > 0 && e.lineTo(a, h + g(re - ie, 0));
              break e;
            }
            O += N;
          }
          e.rect(a, h, ne, re);
          break;
        case l.Z:
          if (C) {
            N = f[T++];
            if (O + N > p) {
              D = (p - O) / N;
              e.lineTo(i * (1 - D) + n * D, o * (1 - D) + r * D);
              break e;
            }
            O += N;
          }
          e.closePath(), i = n, o = r;
      }
    }
  }, e.prototype.clone = function () {
    var t = new e(),
      n = this.data;
    return t.data = n.slice ? n.slice() : Array.prototype.slice.call(n), t._len = this._len, t;
  }, e.CMD = l, e.initDefaultProps = function () {
    var t = e.prototype;
    t._saveData = !0, t._ux = 0, t._uy = 0, t._pendingPtDist = 0, t._version = 0;
  }(), e;
}();
legacyExports["a"] = C;
