let legacyModule = module,
  legacyExports = exports;
var r;
(function (o) {
  var i = /^\s+/,
    a = /\s+$/,
    s = 0,
    c = o.round,
    u = o.min,
    l = o.max,
    f = o.random;
  function p(e, t) {
    if (e = e || "", t = t || {}, e instanceof p) return e;
    if (!(this instanceof p)) return new p(e, t);
    var n = d(e);
    this._originalInput = e, this._r = n.r, this._g = n.g, this._b = n.b, this._a = n.a, this._roundA = c(100 * this._a) / 100, this._format = t.format || n.format, this._gradientType = t.gradientType, this._r < 1 && (this._r = c(this._r)), this._g < 1 && (this._g = c(this._g)), this._b < 1 && (this._b = c(this._b)), this._ok = n.ok, this._tc_id = s++;
  }
  function d(e) {
    var t = {
        r: 0,
        g: 0,
        b: 0
      },
      n = 1,
      r = null,
      o = null,
      i = null,
      a = !1,
      s = !1;
    return "string" == typeof e && (e = Q(e)), "object" == typeof e && (Z(e.r) && Z(e.g) && Z(e.b) ? (t = h(e.r, e.g, e.b), a = !0, s = "%" === String(e.r).substr(-1) ? "prgb" : "rgb") : Z(e.h) && Z(e.s) && Z(e.v) ? (r = H(e.s), o = H(e.v), t = g(e.h, r, o), a = !0, s = "hsv") : Z(e.h) && Z(e.s) && Z(e.l) && (r = H(e.s), i = H(e.l), t = v(e.h, r, i), a = !0, s = "hsl"), e.hasOwnProperty("a") && (n = e.a)), n = F(n), {
      ok: a,
      format: e.format || s,
      r: u(255, l(t.r, 0)),
      g: u(255, l(t.g, 0)),
      b: u(255, l(t.b, 0)),
      a: n
    };
  }
  function h(e, t, n) {
    return {
      r: 255 * V(e, 255),
      g: 255 * V(t, 255),
      b: 255 * V(n, 255)
    };
  }
  function m(e, t, n) {
    e = V(e, 255), t = V(t, 255), n = V(n, 255);
    var r,
      o,
      i = l(e, t, n),
      a = u(e, t, n),
      s = (i + a) / 2;
    if (i == a) r = o = 0;else {
      var c = i - a;
      switch (o = s > .5 ? c / (2 - i - a) : c / (i + a), i) {
        case e:
          r = (t - n) / c + (t < n ? 6 : 0);
          break;
        case t:
          r = (n - e) / c + 2;
          break;
        case n:
          r = (e - t) / c + 4;
          break;
      }
      r /= 6;
    }
    return {
      h: r,
      s: o,
      l: s
    };
  }
  function v(e, t, n) {
    var r, o, i;
    function a(e, t, n) {
      return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + 6 * (t - e) * n : n < .5 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
    }
    if (e = V(e, 360), t = V(t, 100), n = V(n, 100), 0 === t) r = o = i = n;else {
      var s = n < .5 ? n * (1 + t) : n + t - n * t,
        c = 2 * n - s;
      r = a(c, s, e + 1 / 3), o = a(c, s, e), i = a(c, s, e - 1 / 3);
    }
    return {
      r: 255 * r,
      g: 255 * o,
      b: 255 * i
    };
  }
  function y(e, t, n) {
    e = V(e, 255), t = V(t, 255), n = V(n, 255);
    var r,
      o,
      i = l(e, t, n),
      a = u(e, t, n),
      s = i,
      c = i - a;
    if (o = 0 === i ? 0 : c / i, i == a) r = 0;else {
      switch (i) {
        case e:
          r = (t - n) / c + (t < n ? 6 : 0);
          break;
        case t:
          r = (n - e) / c + 2;
          break;
        case n:
          r = (e - t) / c + 4;
          break;
      }
      r /= 6;
    }
    return {
      h: r,
      s: o,
      v: s
    };
  }
  function g(e, t, n) {
    e = 6 * V(e, 360), t = V(t, 100), n = V(n, 100);
    var r = o.floor(e),
      i = e - r,
      a = n * (1 - t),
      s = n * (1 - i * t),
      c = n * (1 - (1 - i) * t),
      u = r % 6,
      l = [n, s, a, a, c, n][u],
      f = [c, n, n, s, a, a][u],
      p = [a, a, c, n, n, s][u];
    return {
      r: 255 * l,
      g: 255 * f,
      b: 255 * p
    };
  }
  function b(e, t, n, r) {
    var o = [q(c(e).toString(16)), q(c(t).toString(16)), q(c(n).toString(16))];
    return r && o[0].charAt(0) == o[0].charAt(1) && o[1].charAt(0) == o[1].charAt(1) && o[2].charAt(0) == o[2].charAt(1) ? o[0].charAt(0) + o[1].charAt(0) + o[2].charAt(0) : o.join("");
  }
  function w(e, t, n, r, o) {
    var i = [q(c(e).toString(16)), q(c(t).toString(16)), q(c(n).toString(16)), q(Y(r))];
    return o && i[0].charAt(0) == i[0].charAt(1) && i[1].charAt(0) == i[1].charAt(1) && i[2].charAt(0) == i[2].charAt(1) && i[3].charAt(0) == i[3].charAt(1) ? i[0].charAt(0) + i[1].charAt(0) + i[2].charAt(0) + i[3].charAt(0) : i.join("");
  }
  function x(e, t, n, r) {
    var o = [q(Y(r)), q(c(e).toString(16)), q(c(t).toString(16)), q(c(n).toString(16))];
    return o.join("");
  }
  function O(e, t) {
    t = 0 === t ? 0 : t || 10;
    var n = p(e).toHsl();
    return n.s -= t / 100, n.s = z(n.s), p(n);
  }
  function E(e, t) {
    t = 0 === t ? 0 : t || 10;
    var n = p(e).toHsl();
    return n.s += t / 100, n.s = z(n.s), p(n);
  }
  function _(e) {
    return p(e).desaturate(100);
  }
  function k(e, t) {
    t = 0 === t ? 0 : t || 10;
    var n = p(e).toHsl();
    return n.l += t / 100, n.l = z(n.l), p(n);
  }
  function S(e, t) {
    t = 0 === t ? 0 : t || 10;
    var n = p(e).toRgb();
    return n.r = l(0, u(255, n.r - c(-t / 100 * 255))), n.g = l(0, u(255, n.g - c(-t / 100 * 255))), n.b = l(0, u(255, n.b - c(-t / 100 * 255))), p(n);
  }
  function C(e, t) {
    t = 0 === t ? 0 : t || 10;
    var n = p(e).toHsl();
    return n.l -= t / 100, n.l = z(n.l), p(n);
  }
  function j(e, t) {
    var n = p(e).toHsl(),
      r = (n.h + t) % 360;
    return n.h = r < 0 ? 360 + r : r, p(n);
  }
  function P(e) {
    var t = p(e).toHsl();
    return t.h = (t.h + 180) % 360, p(t);
  }
  function T(e) {
    var t = p(e).toHsl(),
      n = t.h;
    return [p(e), p({
      h: (n + 120) % 360,
      s: t.s,
      l: t.l
    }), p({
      h: (n + 240) % 360,
      s: t.s,
      l: t.l
    })];
  }
  function L(e) {
    var t = p(e).toHsl(),
      n = t.h;
    return [p(e), p({
      h: (n + 90) % 360,
      s: t.s,
      l: t.l
    }), p({
      h: (n + 180) % 360,
      s: t.s,
      l: t.l
    }), p({
      h: (n + 270) % 360,
      s: t.s,
      l: t.l
    })];
  }
  function N(e) {
    var t = p(e).toHsl(),
      n = t.h;
    return [p(e), p({
      h: (n + 72) % 360,
      s: t.s,
      l: t.l
    }), p({
      h: (n + 216) % 360,
      s: t.s,
      l: t.l
    })];
  }
  function M(e, t, n) {
    t = t || 6, n = n || 30;
    var r = p(e).toHsl(),
      o = 360 / n,
      i = [p(e)];
    for (r.h = (r.h - (o * t >> 1) + 720) % 360; --t;) r.h = (r.h + o) % 360, i.push(p(r));
    return i;
  }
  function A(e, t) {
    t = t || 6;
    var n = p(e).toHsv(),
      r = n.h,
      o = n.s,
      i = n.v,
      a = [],
      s = 1 / t;
    while (t--) a.push(p({
      h: r,
      s: o,
      v: i
    })), i = (i + s) % 1;
    return a;
  }
  p.prototype = {
    isDark: function () {
      return this.getBrightness() < 128;
    },
    isLight: function () {
      return !this.isDark();
    },
    isValid: function () {
      return this._ok;
    },
    getOriginalInput: function () {
      return this._originalInput;
    },
    getFormat: function () {
      return this._format;
    },
    getAlpha: function () {
      return this._a;
    },
    getBrightness: function () {
      var e = this.toRgb();
      return (299 * e.r + 587 * e.g + 114 * e.b) / 1e3;
    },
    getLuminance: function () {
      var e,
        t,
        n,
        r,
        i,
        a,
        s = this.toRgb();
      return e = s.r / 255, t = s.g / 255, n = s.b / 255, r = e <= .03928 ? e / 12.92 : o.pow((e + .055) / 1.055, 2.4), i = t <= .03928 ? t / 12.92 : o.pow((t + .055) / 1.055, 2.4), a = n <= .03928 ? n / 12.92 : o.pow((n + .055) / 1.055, 2.4), .2126 * r + .7152 * i + .0722 * a;
    },
    setAlpha: function (e) {
      return this._a = F(e), this._roundA = c(100 * this._a) / 100, this;
    },
    toHsv: function () {
      var e = y(this._r, this._g, this._b);
      return {
        h: 360 * e.h,
        s: e.s,
        v: e.v,
        a: this._a
      };
    },
    toHsvString: function () {
      var e = y(this._r, this._g, this._b),
        t = c(360 * e.h),
        n = c(100 * e.s),
        r = c(100 * e.v);
      return 1 == this._a ? "hsv(" + t + ", " + n + "%, " + r + "%)" : "hsva(" + t + ", " + n + "%, " + r + "%, " + this._roundA + ")";
    },
    toHsl: function () {
      var e = m(this._r, this._g, this._b);
      return {
        h: 360 * e.h,
        s: e.s,
        l: e.l,
        a: this._a
      };
    },
    toHslString: function () {
      var e = m(this._r, this._g, this._b),
        t = c(360 * e.h),
        n = c(100 * e.s),
        r = c(100 * e.l);
      return 1 == this._a ? "hsl(" + t + ", " + n + "%, " + r + "%)" : "hsla(" + t + ", " + n + "%, " + r + "%, " + this._roundA + ")";
    },
    toHex: function (e) {
      return b(this._r, this._g, this._b, e);
    },
    toHexString: function (e) {
      return "#" + this.toHex(e);
    },
    toHex8: function (e) {
      return w(this._r, this._g, this._b, this._a, e);
    },
    toHex8String: function (e) {
      return "#" + this.toHex8(e);
    },
    toRgb: function () {
      return {
        r: c(this._r),
        g: c(this._g),
        b: c(this._b),
        a: this._a
      };
    },
    toRgbString: function () {
      return 1 == this._a ? "rgb(" + c(this._r) + ", " + c(this._g) + ", " + c(this._b) + ")" : "rgba(" + c(this._r) + ", " + c(this._g) + ", " + c(this._b) + ", " + this._roundA + ")";
    },
    toPercentageRgb: function () {
      return {
        r: c(100 * V(this._r, 255)) + "%",
        g: c(100 * V(this._g, 255)) + "%",
        b: c(100 * V(this._b, 255)) + "%",
        a: this._a
      };
    },
    toPercentageRgbString: function () {
      return 1 == this._a ? "rgb(" + c(100 * V(this._r, 255)) + "%, " + c(100 * V(this._g, 255)) + "%, " + c(100 * V(this._b, 255)) + "%)" : "rgba(" + c(100 * V(this._r, 255)) + "%, " + c(100 * V(this._g, 255)) + "%, " + c(100 * V(this._b, 255)) + "%, " + this._roundA + ")";
    },
    toName: function () {
      return 0 === this._a ? "transparent" : !(this._a < 1) && (I[b(this._r, this._g, this._b, !0)] || !1);
    },
    toFilter: function (e) {
      var t = "#" + x(this._r, this._g, this._b, this._a),
        n = t,
        r = this._gradientType ? "GradientType = 1, " : "";
      if (e) {
        var o = p(e);
        n = "#" + x(o._r, o._g, o._b, o._a);
      }
      return "progid:DXImageTransform.Microsoft.gradient(" + r + "startColorstr=" + t + ",endColorstr=" + n + ")";
    },
    toString: function (e) {
      var t = !!e;
      e = e || this._format;
      var n = !1,
        r = this._a < 1 && this._a >= 0,
        o = !t && r && ("hex" === e || "hex6" === e || "hex3" === e || "hex4" === e || "hex8" === e || "name" === e);
      return o ? "name" === e && 0 === this._a ? this.toName() : this.toRgbString() : ("rgb" === e && (n = this.toRgbString()), "prgb" === e && (n = this.toPercentageRgbString()), "hex" !== e && "hex6" !== e || (n = this.toHexString()), "hex3" === e && (n = this.toHexString(!0)), "hex4" === e && (n = this.toHex8String(!0)), "hex8" === e && (n = this.toHex8String()), "name" === e && (n = this.toName()), "hsl" === e && (n = this.toHslString()), "hsv" === e && (n = this.toHsvString()), n || this.toHexString());
    },
    clone: function () {
      return p(this.toString());
    },
    _applyModification: function (e, t) {
      var n = e.apply(null, [this].concat([].slice.call(t)));
      return this._r = n._r, this._g = n._g, this._b = n._b, this.setAlpha(n._a), this;
    },
    lighten: function () {
      return this._applyModification(k, arguments);
    },
    brighten: function () {
      return this._applyModification(S, arguments);
    },
    darken: function () {
      return this._applyModification(C, arguments);
    },
    desaturate: function () {
      return this._applyModification(O, arguments);
    },
    saturate: function () {
      return this._applyModification(E, arguments);
    },
    greyscale: function () {
      return this._applyModification(_, arguments);
    },
    spin: function () {
      return this._applyModification(j, arguments);
    },
    _applyCombination: function (e, t) {
      return e.apply(null, [this].concat([].slice.call(t)));
    },
    analogous: function () {
      return this._applyCombination(M, arguments);
    },
    complement: function () {
      return this._applyCombination(P, arguments);
    },
    monochromatic: function () {
      return this._applyCombination(A, arguments);
    },
    splitcomplement: function () {
      return this._applyCombination(N, arguments);
    },
    triad: function () {
      return this._applyCombination(T, arguments);
    },
    tetrad: function () {
      return this._applyCombination(L, arguments);
    }
  }, p.fromRatio = function (e, t) {
    if ("object" == typeof e) {
      var n = {};
      for (var r in e) e.hasOwnProperty(r) && (n[r] = "a" === r ? e[r] : H(e[r]));
      e = n;
    }
    return p(e, t);
  }, p.equals = function (e, t) {
    return !(!e || !t) && p(e).toRgbString() == p(t).toRgbString();
  }, p.random = function () {
    return p.fromRatio({
      r: f(),
      g: f(),
      b: f()
    });
  }, p.mix = function (e, t, n) {
    n = 0 === n ? 0 : n || 50;
    var r = p(e).toRgb(),
      o = p(t).toRgb(),
      i = n / 100,
      a = {
        r: (o.r - r.r) * i + r.r,
        g: (o.g - r.g) * i + r.g,
        b: (o.b - r.b) * i + r.b,
        a: (o.a - r.a) * i + r.a
      };
    return p(a);
  }, p.readability = function (e, t) {
    var n = p(e),
      r = p(t);
    return (o.max(n.getLuminance(), r.getLuminance()) + .05) / (o.min(n.getLuminance(), r.getLuminance()) + .05);
  }, p.isReadable = function (e, t, n) {
    var r,
      o,
      i = p.readability(e, t);
    switch (o = !1, r = X(n), r.level + r.size) {
      case "AAsmall":
      case "AAAlarge":
        o = i >= 4.5;
        break;
      case "AAlarge":
        o = i >= 3;
        break;
      case "AAAsmall":
        o = i >= 7;
        break;
    }
    return o;
  }, p.mostReadable = function (e, t, n) {
    var r,
      o,
      i,
      a,
      s = null,
      c = 0;
    n = n || {}, o = n.includeFallbackColors, i = n.level, a = n.size;
    for (var u = 0; u < t.length; u++) r = p.readability(e, t[u]), r > c && (c = r, s = p(t[u]));
    return p.isReadable(e, s, {
      level: i,
      size: a
    }) || !o ? s : (n.includeFallbackColors = !1, p.mostReadable(e, ["#fff", "#000"], n));
  };
  var D = p.names = {
      aliceblue: "f0f8ff",
      antiquewhite: "faebd7",
      aqua: "0ff",
      aquamarine: "7fffd4",
      azure: "f0ffff",
      beige: "f5f5dc",
      bisque: "ffe4c4",
      black: "000",
      blanchedalmond: "ffebcd",
      blue: "00f",
      blueviolet: "8a2be2",
      brown: "a52a2a",
      burlywood: "deb887",
      burntsienna: "ea7e5d",
      cadetblue: "5f9ea0",
      chartreuse: "7fff00",
      chocolate: "d2691e",
      coral: "ff7f50",
      cornflowerblue: "6495ed",
      cornsilk: "fff8dc",
      crimson: "dc143c",
      cyan: "0ff",
      darkblue: "00008b",
      darkcyan: "008b8b",
      darkgoldenrod: "b8860b",
      darkgray: "a9a9a9",
      darkgreen: "006400",
      darkgrey: "a9a9a9",
      darkkhaki: "bdb76b",
      darkmagenta: "8b008b",
      darkolivegreen: "556b2f",
      darkorange: "ff8c00",
      darkorchid: "9932cc",
      darkred: "8b0000",
      darksalmon: "e9967a",
      darkseagreen: "8fbc8f",
      darkslateblue: "483d8b",
      darkslategray: "2f4f4f",
      darkslategrey: "2f4f4f",
      darkturquoise: "00ced1",
      darkviolet: "9400d3",
      deeppink: "ff1493",
      deepskyblue: "00bfff",
      dimgray: "696969",
      dimgrey: "696969",
      dodgerblue: "1e90ff",
      firebrick: "b22222",
      floralwhite: "fffaf0",
      forestgreen: "228b22",
      fuchsia: "f0f",
      gainsboro: "dcdcdc",
      ghostwhite: "f8f8ff",
      gold: "ffd700",
      goldenrod: "daa520",
      gray: "808080",
      green: "008000",
      greenyellow: "adff2f",
      grey: "808080",
      honeydew: "f0fff0",
      hotpink: "ff69b4",
      indianred: "cd5c5c",
      indigo: "4b0082",
      ivory: "fffff0",
      khaki: "f0e68c",
      lavender: "e6e6fa",
      lavenderblush: "fff0f5",
      lawngreen: "7cfc00",
      lemonchiffon: "fffacd",
      lightblue: "add8e6",
      lightcoral: "f08080",
      lightcyan: "e0ffff",
      lightgoldenrodyellow: "fafad2",
      lightgray: "d3d3d3",
      lightgreen: "90ee90",
      lightgrey: "d3d3d3",
      lightpink: "ffb6c1",
      lightsalmon: "ffa07a",
      lightseagreen: "20b2aa",
      lightskyblue: "87cefa",
      lightslategray: "789",
      lightslategrey: "789",
      lightsteelblue: "b0c4de",
      lightyellow: "ffffe0",
      lime: "0f0",
      limegreen: "32cd32",
      linen: "faf0e6",
      magenta: "f0f",
      maroon: "800000",
      mediumaquamarine: "66cdaa",
      mediumblue: "0000cd",
      mediumorchid: "ba55d3",
      mediumpurple: "9370db",
      mediumseagreen: "3cb371",
      mediumslateblue: "7b68ee",
      mediumspringgreen: "00fa9a",
      mediumturquoise: "48d1cc",
      mediumvioletred: "c71585",
      midnightblue: "191970",
      mintcream: "f5fffa",
      mistyrose: "ffe4e1",
      moccasin: "ffe4b5",
      navajowhite: "ffdead",
      navy: "000080",
      oldlace: "fdf5e6",
      olive: "808000",
      olivedrab: "6b8e23",
      orange: "ffa500",
      orangered: "ff4500",
      orchid: "da70d6",
      palegoldenrod: "eee8aa",
      palegreen: "98fb98",
      paleturquoise: "afeeee",
      palevioletred: "db7093",
      papayawhip: "ffefd5",
      peachpuff: "ffdab9",
      peru: "cd853f",
      pink: "ffc0cb",
      plum: "dda0dd",
      powderblue: "b0e0e6",
      purple: "800080",
      rebeccapurple: "663399",
      red: "f00",
      rosybrown: "bc8f8f",
      royalblue: "4169e1",
      saddlebrown: "8b4513",
      salmon: "fa8072",
      sandybrown: "f4a460",
      seagreen: "2e8b57",
      seashell: "fff5ee",
      sienna: "a0522d",
      silver: "c0c0c0",
      skyblue: "87ceeb",
      slateblue: "6a5acd",
      slategray: "708090",
      slategrey: "708090",
      snow: "fffafa",
      springgreen: "00ff7f",
      steelblue: "4682b4",
      tan: "d2b48c",
      teal: "008080",
      thistle: "d8bfd8",
      tomato: "ff6347",
      turquoise: "40e0d0",
      violet: "ee82ee",
      wheat: "f5deb3",
      white: "fff",
      whitesmoke: "f5f5f5",
      yellow: "ff0",
      yellowgreen: "9acd32"
    },
    I = p.hexNames = R(D);
  function R(e) {
    var t = {};
    for (var n in e) e.hasOwnProperty(n) && (t[e[n]] = n);
    return t;
  }
  function F(e) {
    return e = parseFloat(e), (isNaN(e) || e < 0 || e > 1) && (e = 1), e;
  }
  function V(e, t) {
    W(e) && (e = "100%");
    var n = U(e);
    return e = u(t, l(0, parseFloat(e))), n && (e = parseInt(e * t, 10) / 100), o.abs(e - t) < 1e-6 ? 1 : e % t / parseFloat(t);
  }
  function z(e) {
    return u(1, l(0, e));
  }
  function B(e) {
    return parseInt(e, 16);
  }
  function W(e) {
    return "string" == typeof e && -1 != e.indexOf(".") && 1 === parseFloat(e);
  }
  function U(e) {
    return "string" === typeof e && -1 != e.indexOf("%");
  }
  function q(e) {
    return 1 == e.length ? "0" + e : "" + e;
  }
  function H(e) {
    return e <= 1 && (e = 100 * e + "%"), e;
  }
  function Y(e) {
    return o.round(255 * parseFloat(e)).toString(16);
  }
  function G(e) {
    return B(e) / 255;
  }
  var K = function () {
    var e = "[-\\+]?\\d+%?",
      t = "[-\\+]?\\d*\\.\\d+%?",
      n = "(?:" + t + ")|(?:" + e + ")",
      r = "[\\s|\\(]+(" + n + ")[,|\\s]+(" + n + ")[,|\\s]+(" + n + ")\\s*\\)?",
      o = "[\\s|\\(]+(" + n + ")[,|\\s]+(" + n + ")[,|\\s]+(" + n + ")[,|\\s]+(" + n + ")\\s*\\)?";
    return {
      CSS_UNIT: new RegExp(n),
      rgb: new RegExp("rgb" + r),
      rgba: new RegExp("rgba" + o),
      hsl: new RegExp("hsl" + r),
      hsla: new RegExp("hsla" + o),
      hsv: new RegExp("hsv" + r),
      hsva: new RegExp("hsva" + o),
      hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
      hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
    };
  }();
  function Z(e) {
    return !!K.CSS_UNIT.exec(e);
  }
  function Q(e) {
    e = e.replace(i, "").replace(a, "").toLowerCase();
    var t,
      n = !1;
    if (D[e]) e = D[e], n = !0;else if ("transparent" == e) return {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
      format: "name"
    };
    return (t = K.rgb.exec(e)) ? {
      r: t[1],
      g: t[2],
      b: t[3]
    } : (t = K.rgba.exec(e)) ? {
      r: t[1],
      g: t[2],
      b: t[3],
      a: t[4]
    } : (t = K.hsl.exec(e)) ? {
      h: t[1],
      s: t[2],
      l: t[3]
    } : (t = K.hsla.exec(e)) ? {
      h: t[1],
      s: t[2],
      l: t[3],
      a: t[4]
    } : (t = K.hsv.exec(e)) ? {
      h: t[1],
      s: t[2],
      v: t[3]
    } : (t = K.hsva.exec(e)) ? {
      h: t[1],
      s: t[2],
      v: t[3],
      a: t[4]
    } : (t = K.hex8.exec(e)) ? {
      r: B(t[1]),
      g: B(t[2]),
      b: B(t[3]),
      a: G(t[4]),
      format: n ? "name" : "hex8"
    } : (t = K.hex6.exec(e)) ? {
      r: B(t[1]),
      g: B(t[2]),
      b: B(t[3]),
      format: n ? "name" : "hex"
    } : (t = K.hex4.exec(e)) ? {
      r: B(t[1] + "" + t[1]),
      g: B(t[2] + "" + t[2]),
      b: B(t[3] + "" + t[3]),
      a: G(t[4] + "" + t[4]),
      format: n ? "name" : "hex8"
    } : !!(t = K.hex3.exec(e)) && {
      r: B(t[1] + "" + t[1]),
      g: B(t[2] + "" + t[2]),
      b: B(t[3] + "" + t[3]),
      format: n ? "name" : "hex"
    };
  }
  function X(e) {
    var t, n;
    return e = e || {
      level: "AA",
      size: "small"
    }, t = (e.level || "AA").toUpperCase(), n = (e.size || "small").toLowerCase(), "AA" !== t && "AAA" !== t && (t = "AA"), "small" !== n && "large" !== n && (n = "small"), {
      level: t,
      size: n
    };
  }
  legacyModule.exports ? legacyModule.exports = p : (r = function () {
    return p;
  }.call(legacyExports, undefined, legacyExports, legacyModule), void 0 === r || (legacyModule.exports = r));
})(Math);
