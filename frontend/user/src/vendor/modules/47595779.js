let legacyModule = module,
  legacyExports = exports;
(function (e, r) {
  var o;
  (function (i) {
    legacyExports && legacyExports.nodeType, e && e.nodeType;
    var a = "object" == typeof r && r;
    a.global !== a && a.window !== a && a.self;
    var s,
      c = 2147483647,
      u = 36,
      l = 1,
      f = 26,
      p = 38,
      d = 700,
      h = 72,
      m = 128,
      v = "-",
      y = /^xn--/,
      g = /[^\x20-\x7E]/,
      b = /[\x2E\u3002\uFF0E\uFF61]/g,
      w = {
        overflow: "Overflow: input needs wider integers to process",
        "not-basic": "Illegal input >= 0x80 (not a basic code point)",
        "invalid-input": "Invalid input"
      },
      x = u - l,
      O = Math.floor,
      E = String.fromCharCode;
    function _(e) {
      throw new RangeError(w[e]);
    }
    function k(e, t) {
      var n = e.length,
        r = [];
      while (n--) r[n] = t(e[n]);
      return r;
    }
    function S(e, t) {
      var n = e.split("@"),
        r = "";
      n.length > 1 && (r = n[0] + "@", e = n[1]), e = e.replace(b, ".");
      var o = e.split("."),
        i = k(o, t).join(".");
      return r + i;
    }
    function C(e) {
      var t,
        n,
        r = [],
        o = 0,
        i = e.length;
      while (o < i) t = e.charCodeAt(o++), t >= 55296 && t <= 56319 && o < i ? (n = e.charCodeAt(o++), 56320 == (64512 & n) ? r.push(((1023 & t) << 10) + (1023 & n) + 65536) : (r.push(t), o--)) : r.push(t);
      return r;
    }
    function j(e) {
      return k(e, function (e) {
        var t = "";
        return e > 65535 && (e -= 65536, t += E(e >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), t += E(e), t;
      }).join("");
    }
    function P(e) {
      return e - 48 < 10 ? e - 22 : e - 65 < 26 ? e - 65 : e - 97 < 26 ? e - 97 : u;
    }
    function T(e, t) {
      return e + 22 + 75 * (e < 26) - ((0 != t) << 5);
    }
    function L(e, t, n) {
      var r = 0;
      for (e = n ? O(e / d) : e >> 1, e += O(e / t); e > x * f >> 1; r += u) e = O(e / x);
      return O(r + (x + 1) * e / (e + p));
    }
    function N(e) {
      var t,
        n,
        r,
        o,
        i,
        a,
        s,
        p,
        d,
        y,
        g = [],
        b = e.length,
        w = 0,
        x = m,
        E = h;
      for (n = e.lastIndexOf(v), n < 0 && (n = 0), r = 0; r < n; ++r) e.charCodeAt(r) >= 128 && _("not-basic"), g.push(e.charCodeAt(r));
      for (o = n > 0 ? n + 1 : 0; o < b;) {
        for (i = w, a = 1, s = u;; s += u) {
          if (o >= b && _("invalid-input"), p = P(e.charCodeAt(o++)), (p >= u || p > O((c - w) / a)) && _("overflow"), w += p * a, d = s <= E ? l : s >= E + f ? f : s - E, p < d) break;
          y = u - d, a > O(c / y) && _("overflow"), a *= y;
        }
        t = g.length + 1, E = L(w - i, t, 0 == i), O(w / t) > c - x && _("overflow"), x += O(w / t), w %= t, g.splice(w++, 0, x);
      }
      return j(g);
    }
    function M(e) {
      var t,
        n,
        r,
        o,
        i,
        a,
        s,
        p,
        d,
        y,
        g,
        b,
        w,
        x,
        k,
        S = [];
      for (e = C(e), b = e.length, t = m, n = 0, i = h, a = 0; a < b; ++a) g = e[a], g < 128 && S.push(E(g));
      r = o = S.length, o && S.push(v);
      while (r < b) {
        for (s = c, a = 0; a < b; ++a) g = e[a], g >= t && g < s && (s = g);
        for (w = r + 1, s - t > O((c - n) / w) && _("overflow"), n += (s - t) * w, t = s, a = 0; a < b; ++a) if (g = e[a], g < t && ++n > c && _("overflow"), g == t) {
          for (p = n, d = u;; d += u) {
            if (y = d <= i ? l : d >= i + f ? f : d - i, p < y) break;
            k = p - y, x = u - y, S.push(E(T(y + k % x, 0))), p = O(k / x);
          }
          S.push(E(T(p, 0))), i = L(n, w, r == o), n = 0, ++r;
        }
        ++n, ++t;
      }
      return S.join("");
    }
    function A(e) {
      return S(e, function (e) {
        return y.test(e) ? N(e.slice(4).toLowerCase()) : e;
      });
    }
    function D(e) {
      return S(e, function (e) {
        return g.test(e) ? "xn--" + M(e) : e;
      });
    }
    s = {
      version: "1.4.1",
      ucs2: {
        decode: C,
        encode: j
      },
      decode: N,
      encode: M,
      toASCII: D,
      toUnicode: A
    }, o = function () {
      return s;
    }.call(legacyExports, undefined, legacyExports, e), void 0 === o || (e.exports = o);
  })();
}).call(this, require("./59755469.js")(legacyModule), require("./globalObjectLegacy.js"));
