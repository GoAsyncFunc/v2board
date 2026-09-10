let legacyModule = module,
  legacyExports = exports;
var r;
(function (i) {
  var o = /^\s+/,
    a = /\s+$/,
    s = 0,
    l = i.round,
    c = i.min,
    u = i.max,
    h = i.random;
  function f(e, t) {
    if (e = e || "", t = t || {}, e instanceof f) return e;
    if (!(this instanceof f)) return new f(e, t);
    var n = d(e);
    this._originalInput = e, this._r = n.r, this._g = n.g, this._b = n.b, this._a = n.a, this._roundA = l(100 * this._a) / 100, this._format = t.format || n.format, this._gradientType = t.gradientType, this._r < 1 && (this._r = l(this._r)), this._g < 1 && (this._g = l(this._g)), this._b < 1 && (this._b = l(this._b)), this._ok = n.ok, this._tc_id = s++;
  }
  function d(e) {
    var t = {
        r: 0,
        g: 0,
        b: 0
      },
      n = 1,
      r = null,
      i = null,
      o = null,
      a = !1,
      s = !1;
    return "string" == typeof e && (e = X(e)), "object" == typeof e && (Y(e.r) && Y(e.g) && Y(e.b) ? (t = p(e.r, e.g, e.b), a = !0, s = "%" === String(e.r).substr(-1) ? "prgb" : "rgb") : Y(e.h) && Y(e.s) && Y(e.v) ? (r = z(e.s), i = z(e.v), t = y(e.h, r, i), a = !0, s = "hsv") : Y(e.h) && Y(e.s) && Y(e.l) && (r = z(e.s), o = z(e.l), t = g(e.h, r, o), a = !0, s = "hsl"), e.hasOwnProperty("a") && (n = e.a)), n = $(n), {
      ok: a,
      format: e.format || s,
      r: c(255, u(t.r, 0)),
      g: c(255, u(t.g, 0)),
      b: c(255, u(t.b, 0)),
      a: n
    };
  }
  function p(e, t, n) {
    return {
      r: 255 * F(e, 255),
      g: 255 * F(t, 255),
      b: 255 * F(n, 255)
    };
  }
  function m(e, t, n) {
    e = F(e, 255), t = F(t, 255), n = F(n, 255);
    var r,
      i,
      o = u(e, t, n),
      a = c(e, t, n),
      s = (o + a) / 2;
    if (o == a) r = i = 0;else {
      var l = o - a;
      switch (i = s > .5 ? l / (2 - o - a) : l / (o + a), o) {
        case e:
          r = (t - n) / l + (t < n ? 6 : 0);
          break;
        case t:
          r = (n - e) / l + 2;
          break;
        case n:
          r = (e - t) / l + 4;
          break;
      }
      r /= 6;
    }
    return {
      h: r,
      s: i,
      l: s
    };
  }
  function g(e, t, n) {
    var r, i, o;
    function a(e, t, n) {
      return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + 6 * (t - e) * n : n < .5 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
    }
    if (e = F(e, 360), t = F(t, 100), n = F(n, 100), 0 === t) r = i = o = n;else {
      var s = n < .5 ? n * (1 + t) : n + t - n * t,
        l = 2 * n - s;
      r = a(l, s, e + 1 / 3), i = a(l, s, e), o = a(l, s, e - 1 / 3);
    }
    return {
      r: 255 * r,
      g: 255 * i,
      b: 255 * o
    };
  }
  function v(e, t, n) {
    e = F(e, 255), t = F(t, 255), n = F(n, 255);
    var r,
      i,
      o = u(e, t, n),
      a = c(e, t, n),
      s = o,
      l = o - a;
    if (i = 0 === o ? 0 : l / o, o == a) r = 0;else {
      switch (o) {
        case e:
          r = (t - n) / l + (t < n ? 6 : 0);
          break;
        case t:
          r = (n - e) / l + 2;
          break;
        case n:
          r = (e - t) / l + 4;
          break;
      }
      r /= 6;
    }
    return {
      h: r,
      s: i,
      v: s
    };
  }
  function y(e, t, n) {
    e = 6 * F(e, 360), t = F(t, 100), n = F(n, 100);
    var r = i.floor(e),
      o = e - r,
      a = n * (1 - t),
      s = n * (1 - o * t),
      l = n * (1 - (1 - o) * t),
      c = r % 6,
      u = [n, s, a, a, l, n][c],
      h = [l, n, n, s, a, a][c],
      f = [a, a, l, n, n, s][c];
    return {
      r: 255 * u,
      g: 255 * h,
      b: 255 * f
    };
  }
  function b(e, t, n, r) {
    var i = [U(l(e).toString(16)), U(l(t).toString(16)), U(l(n).toString(16))];
    return r && i[0].charAt(0) == i[0].charAt(1) && i[1].charAt(0) == i[1].charAt(1) && i[2].charAt(0) == i[2].charAt(1) ? i[0].charAt(0) + i[1].charAt(0) + i[2].charAt(0) : i.join("");
  }
  function w(e, t, n, r, i) {
    var o = [U(l(e).toString(16)), U(l(t).toString(16)), U(l(n).toString(16)), U(G(r))];
    return i && o[0].charAt(0) == o[0].charAt(1) && o[1].charAt(0) == o[1].charAt(1) && o[2].charAt(0) == o[2].charAt(1) && o[3].charAt(0) == o[3].charAt(1) ? o[0].charAt(0) + o[1].charAt(0) + o[2].charAt(0) + o[3].charAt(0) : o.join("");
  }
  function x(e, t, n, r) {
    var i = [U(G(r)), U(l(e).toString(16)), U(l(t).toString(16)), U(l(n).toString(16))];
    return i.join("");
  }
  function _(e, t) {
    t = 0 === t ? 0 : t || 10;
    var n = f(e).toHsl();
    return n.s -= t / 100, n.s = B(n.s), f(n);
  }
  function E(e, t) {
    t = 0 === t ? 0 : t || 10;
    var n = f(e).toHsl();
    return n.s += t / 100, n.s = B(n.s), f(n);
  }
  function S(e) {
    return f(e).desaturate(100);
  }
  function k(e, t) {
    t = 0 === t ? 0 : t || 10;
    var n = f(e).toHsl();
    return n.l += t / 100, n.l = B(n.l), f(n);
  }
  function C(e, t) {
    t = 0 === t ? 0 : t || 10;
    var n = f(e).toRgb();
    return n.r = u(0, c(255, n.r - l(-t / 100 * 255))), n.g = u(0, c(255, n.g - l(-t / 100 * 255))), n.b = u(0, c(255, n.b - l(-t / 100 * 255))), f(n);
  }
  function O(e, t) {
    t = 0 === t ? 0 : t || 10;
    var n = f(e).toHsl();
    return n.l -= t / 100, n.l = B(n.l), f(n);
  }
  function T(e, t) {
    var n = f(e).toHsl(),
      r = (n.h + t) % 360;
    return n.h = r < 0 ? 360 + r : r, f(n);
  }
  function L(e) {
    var t = f(e).toHsl();
    return t.h = (t.h + 180) % 360, f(t);
  }
  function A(e) {
    var t = f(e).toHsl(),
      n = t.h;
    return [f(e), f({
      h: (n + 120) % 360,
      s: t.s,
      l: t.l
    }), f({
      h: (n + 240) % 360,
      s: t.s,
      l: t.l
    })];
  }
  function P(e) {
    var t = f(e).toHsl(),
      n = t.h;
    return [f(e), f({
      h: (n + 90) % 360,
      s: t.s,
      l: t.l
    }), f({
      h: (n + 180) % 360,
      s: t.s,
      l: t.l
    }), f({
      h: (n + 270) % 360,
      s: t.s,
      l: t.l
    })];
  }
  function j(e) {
    var t = f(e).toHsl(),
      n = t.h;
    return [f(e), f({
      h: (n + 72) % 360,
      s: t.s,
      l: t.l
    }), f({
      h: (n + 216) % 360,
      s: t.s,
      l: t.l
    })];
  }
  function M(e, t, n) {
    t = t || 6, n = n || 30;
    var r = f(e).toHsl(),
      i = 360 / n,
      o = [f(e)];
    for (r.h = (r.h - (i * t >> 1) + 720) % 360; --t;) r.h = (r.h + i) % 360, o.push(f(r));
    return o;
  }
  function R(e, t) {
    t = t || 6;
    var n = f(e).toHsv(),
      r = n.h,
      i = n.s,
      o = n.v,
      a = [],
      s = 1 / t;
    while (t--) a.push(f({
      h: r,
      s: i,
      v: o
    })), o = (o + s) % 1;
    return a;
  }
  f.prototype = {
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
        o,
        a,
        s = this.toRgb();
      return e = s.r / 255, t = s.g / 255, n = s.b / 255, r = e <= .03928 ? e / 12.92 : i.pow((e + .055) / 1.055, 2.4), o = t <= .03928 ? t / 12.92 : i.pow((t + .055) / 1.055, 2.4), a = n <= .03928 ? n / 12.92 : i.pow((n + .055) / 1.055, 2.4), .2126 * r + .7152 * o + .0722 * a;
    },
    setAlpha: function (e) {
      return this._a = $(e), this._roundA = l(100 * this._a) / 100, this;
    },
    toHsv: function () {
      var e = v(this._r, this._g, this._b);
      return {
        h: 360 * e.h,
        s: e.s,
        v: e.v,
        a: this._a
      };
    },
    toHsvString: function () {
      var e = v(this._r, this._g, this._b),
        t = l(360 * e.h),
        n = l(100 * e.s),
        r = l(100 * e.v);
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
        t = l(360 * e.h),
        n = l(100 * e.s),
        r = l(100 * e.l);
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
        r: l(this._r),
        g: l(this._g),
        b: l(this._b),
        a: this._a
      };
    },
    toRgbString: function () {
      return 1 == this._a ? "rgb(" + l(this._r) + ", " + l(this._g) + ", " + l(this._b) + ")" : "rgba(" + l(this._r) + ", " + l(this._g) + ", " + l(this._b) + ", " + this._roundA + ")";
    },
    toPercentageRgb: function () {
      return {
        r: l(100 * F(this._r, 255)) + "%",
        g: l(100 * F(this._g, 255)) + "%",
        b: l(100 * F(this._b, 255)) + "%",
        a: this._a
      };
    },
    toPercentageRgbString: function () {
      return 1 == this._a ? "rgb(" + l(100 * F(this._r, 255)) + "%, " + l(100 * F(this._g, 255)) + "%, " + l(100 * F(this._b, 255)) + "%)" : "rgba(" + l(100 * F(this._r, 255)) + "%, " + l(100 * F(this._g, 255)) + "%, " + l(100 * F(this._b, 255)) + "%, " + this._roundA + ")";
    },
    toName: function () {
      return 0 === this._a ? "transparent" : !(this._a < 1) && (D[b(this._r, this._g, this._b, !0)] || !1);
    },
    toFilter: function (e) {
      var t = "#" + x(this._r, this._g, this._b, this._a),
        n = t,
        r = this._gradientType ? "GradientType = 1, " : "";
      if (e) {
        var i = f(e);
        n = "#" + x(i._r, i._g, i._b, i._a);
      }
      return "progid:DXImageTransform.Microsoft.gradient(" + r + "startColorstr=" + t + ",endColorstr=" + n + ")";
    },
    toString: function (e) {
      var t = !!e;
      e = e || this._format;
      var n = !1,
        r = this._a < 1 && this._a >= 0,
        i = !t && r && ("hex" === e || "hex6" === e || "hex3" === e || "hex4" === e || "hex8" === e || "name" === e);
      return i ? "name" === e && 0 === this._a ? this.toName() : this.toRgbString() : ("rgb" === e && (n = this.toRgbString()), "prgb" === e && (n = this.toPercentageRgbString()), "hex" !== e && "hex6" !== e || (n = this.toHexString()), "hex3" === e && (n = this.toHexString(!0)), "hex4" === e && (n = this.toHex8String(!0)), "hex8" === e && (n = this.toHex8String()), "name" === e && (n = this.toName()), "hsl" === e && (n = this.toHslString()), "hsv" === e && (n = this.toHsvString()), n || this.toHexString());
    },
    clone: function () {
      return f(this.toString());
    },
    _applyModification: function (e, t) {
      var n = e.apply(null, [this].concat([].slice.call(t)));
      return this._r = n._r, this._g = n._g, this._b = n._b, this.setAlpha(n._a), this;
    },
    lighten: function () {
      return this._applyModification(k, arguments);
    },
    brighten: function () {
      return this._applyModification(C, arguments);
    },
    darken: function () {
      return this._applyModification(O, arguments);
    },
    desaturate: function () {
      return this._applyModification(_, arguments);
    },
    saturate: function () {
      return this._applyModification(E, arguments);
    },
    greyscale: function () {
      return this._applyModification(S, arguments);
    },
    spin: function () {
      return this._applyModification(T, arguments);
    },
    _applyCombination: function (e, t) {
      return e.apply(null, [this].concat([].slice.call(t)));
    },
    analogous: function () {
      return this._applyCombination(M, arguments);
    },
    complement: function () {
      return this._applyCombination(L, arguments);
    },
    monochromatic: function () {
      return this._applyCombination(R, arguments);
    },
    splitcomplement: function () {
      return this._applyCombination(j, arguments);
    },
    triad: function () {
      return this._applyCombination(A, arguments);
    },
    tetrad: function () {
      return this._applyCombination(P, arguments);
    }
  }, f.fromRatio = function (e, t) {
    if ("object" == typeof e) {
      var n = {};
      for (var r in e) e.hasOwnProperty(r) && (n[r] = "a" === r ? e[r] : z(e[r]));
      e = n;
    }
    return f(e, t);
  }, f.equals = function (e, t) {
    return !(!e || !t) && f(e).toRgbString() == f(t).toRgbString();
  }, f.random = function () {
    return f.fromRatio({
      r: h(),
      g: h(),
      b: h()
    });
  }, f.mix = function (e, t, n) {
    n = 0 === n ? 0 : n || 50;
    var r = f(e).toRgb(),
      i = f(t).toRgb(),
      o = n / 100,
      a = {
        r: (i.r - r.r) * o + r.r,
        g: (i.g - r.g) * o + r.g,
        b: (i.b - r.b) * o + r.b,
        a: (i.a - r.a) * o + r.a
      };
    return f(a);
  }, f.readability = function (e, t) {
    var n = f(e),
      r = f(t);
    return (i.max(n.getLuminance(), r.getLuminance()) + .05) / (i.min(n.getLuminance(), r.getLuminance()) + .05);
  }, f.isReadable = function (e, t, n) {
    var r,
      i,
      o = f.readability(e, t);
    switch (i = !1, r = Q(n), r.level + r.size) {
      case "AAsmall":
      case "AAAlarge":
        i = o >= 4.5;
        break;
      case "AAlarge":
        i = o >= 3;
        break;
      case "AAAsmall":
        i = o >= 7;
        break;
    }
    return i;
  }, f.mostReadable = function (e, t, n) {
    var r,
      i,
      o,
      a,
      s = null,
      l = 0;
    n = n || {}, i = n.includeFallbackColors, o = n.level, a = n.size;
    for (var c = 0; c < t.length; c++) r = f.readability(e, t[c]), r > l && (l = r, s = f(t[c]));
    return f.isReadable(e, s, {
      level: o,
      size: a
    }) || !i ? s : (n.includeFallbackColors = !1, f.mostReadable(e, ["#fff", "#000"], n));
  };
  var N = f.names = {
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
    D = f.hexNames = I(N);
  function I(e) {
    var t = {};
    for (var n in e) e.hasOwnProperty(n) && (t[e[n]] = n);
    return t;
  }
  function $(e) {
    return e = parseFloat(e), (isNaN(e) || e < 0 || e > 1) && (e = 1), e;
  }
  function F(e, t) {
    W(e) && (e = "100%");
    var n = H(e);
    return e = c(t, u(0, parseFloat(e))), n && (e = parseInt(e * t, 10) / 100), i.abs(e - t) < 1e-6 ? 1 : e % t / parseFloat(t);
  }
  function B(e) {
    return c(1, u(0, e));
  }
  function V(e) {
    return parseInt(e, 16);
  }
  function W(e) {
    return "string" == typeof e && -1 != e.indexOf(".") && 1 === parseFloat(e);
  }
  function H(e) {
    return "string" === typeof e && -1 != e.indexOf("%");
  }
  function U(e) {
    return 1 == e.length ? "0" + e : "" + e;
  }
  function z(e) {
    return e <= 1 && (e = 100 * e + "%"), e;
  }
  function G(e) {
    return i.round(255 * parseFloat(e)).toString(16);
  }
  function q(e) {
    return V(e) / 255;
  }
  var K = function () {
    var e = "[-\\+]?\\d+%?",
      t = "[-\\+]?\\d*\\.\\d+%?",
      n = "(?:" + t + ")|(?:" + e + ")",
      r = "[\\s|\\(]+(" + n + ")[,|\\s]+(" + n + ")[,|\\s]+(" + n + ")\\s*\\)?",
      i = "[\\s|\\(]+(" + n + ")[,|\\s]+(" + n + ")[,|\\s]+(" + n + ")[,|\\s]+(" + n + ")\\s*\\)?";
    return {
      CSS_UNIT: new RegExp(n),
      rgb: new RegExp("rgb" + r),
      rgba: new RegExp("rgba" + i),
      hsl: new RegExp("hsl" + r),
      hsla: new RegExp("hsla" + i),
      hsv: new RegExp("hsv" + r),
      hsva: new RegExp("hsva" + i),
      hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
      hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
    };
  }();
  function Y(e) {
    return !!K.CSS_UNIT.exec(e);
  }
  function X(e) {
    e = e.replace(o, "").replace(a, "").toLowerCase();
    var t,
      n = !1;
    if (N[e]) e = N[e], n = !0;else if ("transparent" == e) return {
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
      r: V(t[1]),
      g: V(t[2]),
      b: V(t[3]),
      a: q(t[4]),
      format: n ? "name" : "hex8"
    } : (t = K.hex6.exec(e)) ? {
      r: V(t[1]),
      g: V(t[2]),
      b: V(t[3]),
      format: n ? "name" : "hex"
    } : (t = K.hex4.exec(e)) ? {
      r: V(t[1] + "" + t[1]),
      g: V(t[2] + "" + t[2]),
      b: V(t[3] + "" + t[3]),
      a: q(t[4] + "" + t[4]),
      format: n ? "name" : "hex8"
    } : !!(t = K.hex3.exec(e)) && {
      r: V(t[1] + "" + t[1]),
      g: V(t[2] + "" + t[2]),
      b: V(t[3] + "" + t[3]),
      format: n ? "name" : "hex"
    };
  }
  function Q(e) {
    var t, n;
    return e = e || {
      level: "AA",
      size: "small"
    }, t = (e.level || "AA").toUpperCase(), n = (e.size || "small").toLowerCase(), "AA" !== t && "AAA" !== t && (t = "AA"), "small" !== n && "large" !== n && (n = "small"), {
      level: t,
      size: n
    };
  }
  legacyModule.exports ? legacyModule.exports = f : (r = function () {
    return f;
  }.call(legacyExports, undefined, legacyExports, legacyModule), void 0 === r || (legacyModule.exports = r));
})(Math);
