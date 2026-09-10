let legacyModule = module,
  legacyExports = exports;
(function (e, r) {
  var i;
  (function (o) {
    legacyExports && legacyExports.nodeType, e && e.nodeType;
    var a = "object" == typeof r && r;
    a.global !== a && a.window !== a && a.self;
    var s,
      l = 2147483647,
      c = 36,
      u = 1,
      h = 26,
      f = 38,
      d = 700,
      p = 72,
      m = 128,
      g = "-",
      v = /^xn--/,
      y = /[^\x20-\x7E]/,
      b = /[\x2E\u3002\uFF0E\uFF61]/g,
      w = {
        overflow: "Overflow: input needs wider integers to process",
        "not-basic": "Illegal input >= 0x80 (not a basic code point)",
        "invalid-input": "Invalid input"
      },
      x = c - u,
      _ = Math.floor,
      E = String.fromCharCode;
    function S(e) {
      throw new RangeError(w[e]);
    }
    function k(e, t) {
      var n = e.length,
        r = [];
      while (n--) r[n] = t(e[n]);
      return r;
    }
    function C(e, t) {
      var n = e.split("@"),
        r = "";
      n.length > 1 && (r = n[0] + "@", e = n[1]), e = e.replace(b, ".");
      var i = e.split("."),
        o = k(i, t).join(".");
      return r + o;
    }
    function O(e) {
      var t,
        n,
        r = [],
        i = 0,
        o = e.length;
      while (i < o) t = e.charCodeAt(i++), t >= 55296 && t <= 56319 && i < o ? (n = e.charCodeAt(i++), 56320 == (64512 & n) ? r.push(((1023 & t) << 10) + (1023 & n) + 65536) : (r.push(t), i--)) : r.push(t);
      return r;
    }
    function T(e) {
      return k(e, function (e) {
        var t = "";
        return e > 65535 && (e -= 65536, t += E(e >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), t += E(e), t;
      }).join("");
    }
    function L(e) {
      return e - 48 < 10 ? e - 22 : e - 65 < 26 ? e - 65 : e - 97 < 26 ? e - 97 : c;
    }
    function A(e, t) {
      return e + 22 + 75 * (e < 26) - ((0 != t) << 5);
    }
    function P(e, t, n) {
      var r = 0;
      for (e = n ? _(e / d) : e >> 1, e += _(e / t); e > x * h >> 1; r += c) e = _(e / x);
      return _(r + (x + 1) * e / (e + f));
    }
    function j(e) {
      var t,
        n,
        r,
        i,
        o,
        a,
        s,
        f,
        d,
        v,
        y = [],
        b = e.length,
        w = 0,
        x = m,
        E = p;
      for (n = e.lastIndexOf(g), n < 0 && (n = 0), r = 0; r < n; ++r) e.charCodeAt(r) >= 128 && S("not-basic"), y.push(e.charCodeAt(r));
      for (i = n > 0 ? n + 1 : 0; i < b;) {
        for (o = w, a = 1, s = c;; s += c) {
          if (i >= b && S("invalid-input"), f = L(e.charCodeAt(i++)), (f >= c || f > _((l - w) / a)) && S("overflow"), w += f * a, d = s <= E ? u : s >= E + h ? h : s - E, f < d) break;
          v = c - d, a > _(l / v) && S("overflow"), a *= v;
        }
        t = y.length + 1, E = P(w - o, t, 0 == o), _(w / t) > l - x && S("overflow"), x += _(w / t), w %= t, y.splice(w++, 0, x);
      }
      return T(y);
    }
    function M(e) {
      var t,
        n,
        r,
        i,
        o,
        a,
        s,
        f,
        d,
        v,
        y,
        b,
        w,
        x,
        k,
        C = [];
      for (e = O(e), b = e.length, t = m, n = 0, o = p, a = 0; a < b; ++a) y = e[a], y < 128 && C.push(E(y));
      r = i = C.length, i && C.push(g);
      while (r < b) {
        for (s = l, a = 0; a < b; ++a) y = e[a], y >= t && y < s && (s = y);
        for (w = r + 1, s - t > _((l - n) / w) && S("overflow"), n += (s - t) * w, t = s, a = 0; a < b; ++a) if (y = e[a], y < t && ++n > l && S("overflow"), y == t) {
          for (f = n, d = c;; d += c) {
            if (v = d <= o ? u : d >= o + h ? h : d - o, f < v) break;
            k = f - v, x = c - v, C.push(E(A(v + k % x, 0))), f = _(k / x);
          }
          C.push(E(A(f, 0))), o = P(n, w, r == i), n = 0, ++r;
        }
        ++n, ++t;
      }
      return C.join("");
    }
    function R(e) {
      return C(e, function (e) {
        return v.test(e) ? j(e.slice(4).toLowerCase()) : e;
      });
    }
    function N(e) {
      return C(e, function (e) {
        return y.test(e) ? "xn--" + M(e) : e;
      });
    }
    s = {
      version: "1.4.1",
      ucs2: {
        decode: O,
        encode: T
      },
      decode: j,
      encode: M,
      toASCII: N,
      toUnicode: R
    }, i = function () {
      return s;
    }.call(legacyExports, undefined, legacyExports, e), void 0 === i || (e.exports = i);
  })();
}).call(this, require("./59755469.js")(legacyModule), require("./794c706a.js"));
