let legacyModule = module,
  legacyExports = exports;
var r = require("./6e565674.js"),
  o = require("./64575353.js"),
  i = require("./64516569.js"),
  a = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7
  },
  s = {
    PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
    G15: 1335,
    G18: 7973,
    G15_MASK: 21522,
    getBCHTypeInfo: function (e) {
      var t = e << 10;
      while (s.getBCHDigit(t) - s.getBCHDigit(s.G15) >= 0) t ^= s.G15 << s.getBCHDigit(t) - s.getBCHDigit(s.G15);
      return (e << 10 | t) ^ s.G15_MASK;
    },
    getBCHTypeNumber: function (e) {
      var t = e << 12;
      while (s.getBCHDigit(t) - s.getBCHDigit(s.G18) >= 0) t ^= s.G18 << s.getBCHDigit(t) - s.getBCHDigit(s.G18);
      return e << 12 | t;
    },
    getBCHDigit: function (e) {
      var t = 0;
      while (0 != e) t++, e >>>= 1;
      return t;
    },
    getPatternPosition: function (e) {
      return s.PATTERN_POSITION_TABLE[e - 1];
    },
    getMask: function (e, t, n) {
      switch (e) {
        case a.PATTERN000:
          return (t + n) % 2 == 0;
        case a.PATTERN001:
          return t % 2 == 0;
        case a.PATTERN010:
          return n % 3 == 0;
        case a.PATTERN011:
          return (t + n) % 3 == 0;
        case a.PATTERN100:
          return (Math.floor(t / 2) + Math.floor(n / 3)) % 2 == 0;
        case a.PATTERN101:
          return t * n % 2 + t * n % 3 == 0;
        case a.PATTERN110:
          return (t * n % 2 + t * n % 3) % 2 == 0;
        case a.PATTERN111:
          return (t * n % 3 + (t + n) % 2) % 2 == 0;
        default:
          throw new Error("bad maskPattern:" + e);
      }
    },
    getErrorCorrectPolynomial: function (e) {
      for (var t = new o([1], 0), n = 0; n < e; n++) t = t.multiply(new o([1, i.gexp(n)], 0));
      return t;
    },
    getLengthInBits: function (e, t) {
      if (1 <= t && t < 10) switch (e) {
        case r.MODE_NUMBER:
          return 10;
        case r.MODE_ALPHA_NUM:
          return 9;
        case r.MODE_8BIT_BYTE:
          return 8;
        case r.MODE_KANJI:
          return 8;
        default:
          throw new Error("mode:" + e);
      } else if (t < 27) switch (e) {
        case r.MODE_NUMBER:
          return 12;
        case r.MODE_ALPHA_NUM:
          return 11;
        case r.MODE_8BIT_BYTE:
          return 16;
        case r.MODE_KANJI:
          return 10;
        default:
          throw new Error("mode:" + e);
      } else {
        if (!(t < 41)) throw new Error("type:" + t);
        switch (e) {
          case r.MODE_NUMBER:
            return 14;
          case r.MODE_ALPHA_NUM:
            return 13;
          case r.MODE_8BIT_BYTE:
            return 16;
          case r.MODE_KANJI:
            return 12;
          default:
            throw new Error("mode:" + e);
        }
      }
    },
    getLostPoint: function (e) {
      for (var t = e.getModuleCount(), n = 0, r = 0; r < t; r++) for (var o = 0; o < t; o++) {
        for (var i = 0, a = e.isDark(r, o), s = -1; s <= 1; s++) if (!(r + s < 0 || t <= r + s)) for (var c = -1; c <= 1; c++) o + c < 0 || t <= o + c || 0 == s && 0 == c || a == e.isDark(r + s, o + c) && i++;
        i > 5 && (n += 3 + i - 5);
      }
      for (r = 0; r < t - 1; r++) for (o = 0; o < t - 1; o++) {
        var u = 0;
        e.isDark(r, o) && u++, e.isDark(r + 1, o) && u++, e.isDark(r, o + 1) && u++, e.isDark(r + 1, o + 1) && u++, 0 != u && 4 != u || (n += 3);
      }
      for (r = 0; r < t; r++) for (o = 0; o < t - 6; o++) e.isDark(r, o) && !e.isDark(r, o + 1) && e.isDark(r, o + 2) && e.isDark(r, o + 3) && e.isDark(r, o + 4) && !e.isDark(r, o + 5) && e.isDark(r, o + 6) && (n += 40);
      for (o = 0; o < t; o++) for (r = 0; r < t - 6; r++) e.isDark(r, o) && !e.isDark(r + 1, o) && e.isDark(r + 2, o) && e.isDark(r + 3, o) && e.isDark(r + 4, o) && !e.isDark(r + 5, o) && e.isDark(r + 6, o) && (n += 40);
      var l = 0;
      for (o = 0; o < t; o++) for (r = 0; r < t; r++) e.isDark(r, o) && l++;
      var f = Math.abs(100 * l / t / t - 50) / 5;
      return n += 10 * f, n;
    }
  };
legacyModule.exports = s;
