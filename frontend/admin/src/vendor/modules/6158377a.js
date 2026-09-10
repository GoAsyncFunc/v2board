let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
var r = require("./62597459.js"),
  i = require("./6d725347.js"),
  o = require("./344e6755.js"),
  a = require("./6a6b5041.js"),
  s = require("./6c45374a.js"),
  l = function (e) {
    function t(t) {
      var n = e.call(this, t) || this;
      n.type = "ordinal";
      var i = n.getSetting("ordinalMeta");
      return i || (i = new a["a"]({})), Object(r["r"])(i) && (i = new a["a"]({
        categories: Object(r["D"])(i, function (e) {
          return Object(r["x"])(e) ? e.value : e;
        })
      })), n._ordinalMeta = i, n._extent = n.getSetting("extent") || [0, i.categories.length - 1], n;
    }
    return Object(i["a"])(t, e), t.prototype.parse = function (e) {
      return null == e ? NaN : Object(r["y"])(e) ? this._ordinalMeta.getOrdinal(e) : Math.round(e);
    }, t.prototype.contain = function (e) {
      return e = this.parse(e), s["a"](e, this._extent) && null != this._ordinalMeta.categories[e];
    }, t.prototype.normalize = function (e) {
      return e = this._getTickNumber(this.parse(e)), s["f"](e, this._extent);
    }, t.prototype.scale = function (e) {
      return e = Math.round(s["g"](e, this._extent)), this.getRawOrdinalNumber(e);
    }, t.prototype.getTicks = function () {
      var e = [],
        t = this._extent,
        n = t[0];
      while (n <= t[1]) e.push({
        value: n
      }), n++;
      return e;
    }, t.prototype.getMinorTicks = function (e) {}, t.prototype.setSortInfo = function (e) {
      if (null != e) {
        for (var t = e.ordinalNumbers, n = this._ordinalNumbersByTick = [], r = this._ticksByOrdinalNumber = [], i = 0, o = this._ordinalMeta.categories.length, a = Math.min(o, t.length); i < a; ++i) {
          var s = t[i];
          n[i] = s, r[s] = i;
        }
        for (var l = 0; i < o; ++i) {
          while (null != r[l]) l++;
          n.push(l), r[l] = i;
        }
      } else this._ordinalNumbersByTick = this._ticksByOrdinalNumber = null;
    }, t.prototype._getTickNumber = function (e) {
      var t = this._ticksByOrdinalNumber;
      return t && e >= 0 && e < t.length ? t[e] : e;
    }, t.prototype.getRawOrdinalNumber = function (e) {
      var t = this._ordinalNumbersByTick;
      return t && e >= 0 && e < t.length ? t[e] : e;
    }, t.prototype.getLabel = function (e) {
      if (!this.isBlank()) {
        var t = this.getRawOrdinalNumber(e.value),
          n = this._ordinalMeta.categories[t];
        return null == n ? "" : n + "";
      }
    }, t.prototype.count = function () {
      return this._extent[1] - this._extent[0] + 1;
    }, t.prototype.unionExtentFromData = function (e, t) {
      this.unionExtent(e.getApproximateExtent(t));
    }, t.prototype.isInExtentRange = function (e) {
      return e = this._getTickNumber(e), this._extent[0] <= e && this._extent[1] >= e;
    }, t.prototype.getOrdinalMeta = function () {
      return this._ordinalMeta;
    }, t.prototype.calcNiceTicks = function () {}, t.prototype.calcNiceExtent = function () {}, t.type = "ordinal", t;
  }(o["a"]);
o["a"].registerClass(l);
var u = l,
  c = require("./69654d6a.js"),
  f = require("./6e566655.js"),
  d = require("./6d464469.js"),
  h = require("./4f454c42.js"),
  p = require("./2b486175.js"),
  g = function (e, t, n, r) {
    while (n < r) {
      var i = n + r >>> 1;
      e[i][1] < t ? n = i + 1 : r = i;
    }
    return n;
  },
  m = function (e) {
    function t(t) {
      var n = e.call(this, t) || this;
      return n.type = "time", n;
    }
    return Object(i["a"])(t, e), t.prototype.getLabel = function (e) {
      var t = this.getSetting("useUTC");
      return Object(p["h"])(e.value, p["i"][Object(p["l"])(Object(p["m"])(this._minLevelUnit))] || p["i"].second, t, this.getSetting("locale"));
    }, t.prototype.getFormattedLabel = function (e, t, n) {
      var r = this.getSetting("useUTC"),
        i = this.getSetting("locale");
      return Object(p["r"])(e, t, n, i, r);
    }, t.prototype.getTicks = function () {
      var e = this._interval,
        t = this._extent,
        n = [];
      if (!e) return n;
      n.push({
        value: t[0],
        level: 0
      });
      var r = this.getSetting("useUTC"),
        i = k(this._minLevelUnit, this._approxInterval, r, t);
      return n = n.concat(i), n.push({
        value: t[1],
        level: 0
      }), n;
    }, t.prototype.calcNiceExtent = function (e) {
      var t = this._extent;
      if (t[0] === t[1] && (t[0] -= p["a"], t[1] += p["a"]), t[1] === -1 / 0 && t[0] === 1 / 0) {
        var n = new Date();
        t[1] = +new Date(n.getFullYear(), n.getMonth(), n.getDate()), t[0] = t[1] - p["a"];
      }
      this.calcNiceTicks(e.splitNumber, e.minInterval, e.maxInterval);
    }, t.prototype.calcNiceTicks = function (e, t, n) {
      e = e || 10;
      var r = this._extent,
        i = r[1] - r[0];
      this._approxInterval = i / e, null != t && this._approxInterval < t && (this._approxInterval = t), null != n && this._approxInterval > n && (this._approxInterval = n);
      var o = v.length,
        a = Math.min(g(v, this._approxInterval, 0, o), o - 1);
      this._interval = v[a][1], this._minLevelUnit = v[Math.max(a - 1, 0)][0];
    }, t.prototype.parse = function (e) {
      return Object(r["w"])(e) ? e : +h["l"](e);
    }, t.prototype.contain = function (e) {
      return s["a"](this.parse(e), this._extent);
    }, t.prototype.normalize = function (e) {
      return s["f"](this.parse(e), this._extent);
    }, t.prototype.scale = function (e) {
      return s["g"](e, this._extent);
    }, t.type = "time", t;
  }(c["a"]),
  v = [["second", p["d"]], ["minute", p["c"]], ["hour", p["b"]], ["quarter-day", 6 * p["b"]], ["half-day", 12 * p["b"]], ["day", 1.2 * p["a"]], ["half-week", 3.5 * p["a"]], ["week", 7 * p["a"]], ["month", 31 * p["a"]], ["quarter", 95 * p["a"]], ["half-year", p["e"] / 2], ["year", p["e"]]];
function y(e, t, n, r) {
  var i = h["l"](t),
    o = h["l"](n),
    a = function (e) {
      return Object(p["n"])(i, e, r) === Object(p["n"])(o, e, r);
    },
    s = function () {
      return a("year");
    },
    l = function () {
      return s() && a("month");
    },
    u = function () {
      return l() && a("day");
    },
    c = function () {
      return u() && a("hour");
    },
    f = function () {
      return c() && a("minute");
    },
    d = function () {
      return f() && a("second");
    },
    g = function () {
      return d() && a("millisecond");
    };
  switch (e) {
    case "year":
      return s();
    case "month":
      return l();
    case "day":
      return u();
    case "hour":
      return c();
    case "minute":
      return f();
    case "second":
      return d();
    case "millisecond":
      return g();
  }
}
function b(e, t) {
  return e /= p["a"], e > 16 ? 16 : e > 7.5 ? 7 : e > 3.5 ? 4 : e > 1.5 ? 2 : 1;
}
function x(e) {
  var t = 30 * p["a"];
  return e /= t, e > 6 ? 6 : e > 3 ? 3 : e > 2 ? 2 : 1;
}
function _(e) {
  return e /= p["b"], e > 12 ? 12 : e > 6 ? 6 : e > 3.5 ? 4 : e > 2 ? 2 : 1;
}
function w(e, t) {
  return e /= t ? p["c"] : p["d"], e > 30 ? 30 : e > 20 ? 20 : e > 15 ? 15 : e > 10 ? 10 : e > 5 ? 5 : e > 2 ? 2 : 1;
}
function O(e) {
  return h["j"](e, !0);
}
function S(e, t, n) {
  var r = new Date(e);
  switch (Object(p["m"])(t)) {
    case "year":
    case "month":
      r[Object(p["x"])(n)](0);
    case "day":
      r[Object(p["g"])(n)](1);
    case "hour":
      r[Object(p["p"])(n)](0);
    case "minute":
      r[Object(p["v"])(n)](0);
    case "second":
      r[Object(p["A"])(n)](0), r[Object(p["t"])(n)](0);
  }
  return r.getTime();
}
function k(e, t, n, i) {
  var o = 1e4,
    a = p["B"],
    s = 0;
  function l(e, t, n, r, o, a, s) {
    var l = new Date(t),
      u = t,
      c = l[r]();
    while (u < n && u <= i[1]) s.push({
      value: u
    }), c += e, l[o](c), u = l.getTime();
    s.push({
      value: u,
      notAdd: !0
    });
  }
  function u(e, r, o) {
    var a = [],
      s = !r.length;
    if (!y(Object(p["m"])(e), i[0], i[1], n)) {
      s && (r = [{
        value: S(new Date(i[0]), e, n)
      }, {
        value: i[1]
      }]);
      for (var u = 0; u < r.length - 1; u++) {
        var c = r[u].value,
          f = r[u + 1].value;
        if (c !== f) {
          var d = void 0,
            h = void 0,
            g = void 0,
            m = !1;
          switch (e) {
            case "year":
              d = Math.max(1, Math.round(t / p["a"] / 365)), h = Object(p["j"])(n), g = Object(p["k"])(n);
              break;
            case "half-year":
            case "quarter":
            case "month":
              d = x(t), h = Object(p["w"])(n), g = Object(p["x"])(n);
              break;
            case "week":
            case "half-week":
            case "day":
              d = b(t, 31), h = Object(p["f"])(n), g = Object(p["g"])(n), m = !0;
              break;
            case "half-day":
            case "quarter-day":
            case "hour":
              d = _(t), h = Object(p["o"])(n), g = Object(p["p"])(n);
              break;
            case "minute":
              d = w(t, !0), h = Object(p["u"])(n), g = Object(p["v"])(n);
              break;
            case "second":
              d = w(t, !1), h = Object(p["z"])(n), g = Object(p["A"])(n);
              break;
            case "millisecond":
              d = O(t), h = Object(p["s"])(n), g = Object(p["t"])(n);
              break;
          }
          l(d, c, f, h, g, m, a), "year" === e && o.length > 1 && 0 === u && o.unshift({
            value: o[0].value - d
          });
        }
      }
      for (u = 0; u < a.length; u++) o.push(a[u]);
      return a;
    }
  }
  for (var c = [], f = [], d = 0, h = 0, g = 0; g < a.length && s++ < o; ++g) {
    var m = Object(p["m"])(a[g]);
    if (Object(p["q"])(a[g])) {
      u(a[g], c[c.length - 1] || [], f);
      var v = a[g + 1] ? Object(p["m"])(a[g + 1]) : null;
      if (m !== v) {
        if (f.length) {
          h = d, f.sort(function (e, t) {
            return e.value - t.value;
          });
          for (var k = [], j = 0; j < f.length; ++j) {
            var M = f[j].value;
            0 !== j && f[j - 1].value === M || (k.push(f[j]), M >= i[0] && M <= i[1] && d++);
          }
          var C = (i[1] - i[0]) / t;
          if (d > 1.5 * C && h > C / 1.5) break;
          if (c.push(k), d > C || e === a[g]) break;
        }
        f = [];
      }
    }
  }
  var T = Object(r["m"])(Object(r["D"])(c, function (e) {
      return Object(r["m"])(e, function (e) {
        return e.value >= i[0] && e.value <= i[1] && !e.notAdd;
      });
    }), function (e) {
      return e.length > 0;
    }),
    I = [],
    D = T.length - 1;
  for (g = 0; g < T.length; ++g) for (var A = T[g], E = 0; E < A.length; ++E) I.push({
    value: A[E].value,
    level: D - g
  });
  I.sort(function (e, t) {
    return e.value - t.value;
  });
  var P = [];
  for (g = 0; g < I.length; ++g) 0 !== g && I[g].value === I[g - 1].value || P.push(I[g]);
  return P;
}
o["a"].registerClass(m);
var j = m,
  M = o["a"].prototype,
  C = c["a"].prototype,
  T = h["q"],
  I = Math.floor,
  D = Math.ceil,
  A = Math.pow,
  E = Math.log,
  P = function (e) {
    function t() {
      var t = null !== e && e.apply(this, arguments) || this;
      return t.type = "log", t.base = 10, t._originalScale = new c["a"](), t._interval = 0, t;
    }
    return Object(i["a"])(t, e), t.prototype.getTicks = function (e) {
      var t = this._originalScale,
        n = this._extent,
        i = t.getExtent(),
        o = C.getTicks.call(this, e);
      return r["D"](o, function (e) {
        var t = e.value,
          r = h["q"](A(this.base, t));
        return r = t === n[0] && this._fixMin ? N(r, i[0]) : r, r = t === n[1] && this._fixMax ? N(r, i[1]) : r, {
          value: r
        };
      }, this);
    }, t.prototype.setExtent = function (e, t) {
      var n = E(this.base);
      e = E(Math.max(0, e)) / n, t = E(Math.max(0, t)) / n, C.setExtent.call(this, e, t);
    }, t.prototype.getExtent = function () {
      var e = this.base,
        t = M.getExtent.call(this);
      t[0] = A(e, t[0]), t[1] = A(e, t[1]);
      var n = this._originalScale,
        r = n.getExtent();
      return this._fixMin && (t[0] = N(t[0], r[0])), this._fixMax && (t[1] = N(t[1], r[1])), t;
    }, t.prototype.unionExtent = function (e) {
      this._originalScale.unionExtent(e);
      var t = this.base;
      e[0] = E(e[0]) / E(t), e[1] = E(e[1]) / E(t), M.unionExtent.call(this, e);
    }, t.prototype.unionExtentFromData = function (e, t) {
      this.unionExtent(e.getApproximateExtent(t));
    }, t.prototype.calcNiceTicks = function (e) {
      e = e || 10;
      var t = this._extent,
        n = t[1] - t[0];
      if (!(n === 1 / 0 || n <= 0)) {
        var r = h["n"](n),
          i = e / n * r;
        i <= .5 && (r *= 10);
        while (!isNaN(r) && Math.abs(r) < 1 && Math.abs(r) > 0) r *= 10;
        var o = [h["q"](D(t[0] / r) * r), h["q"](I(t[1] / r) * r)];
        this._interval = r, this._niceExtent = o;
      }
    }, t.prototype.calcNiceExtent = function (e) {
      C.calcNiceExtent.call(this, e), this._fixMin = e.fixMin, this._fixMax = e.fixMax;
    }, t.prototype.parse = function (e) {
      return e;
    }, t.prototype.contain = function (e) {
      return e = E(e) / E(this.base), s["a"](e, this._extent);
    }, t.prototype.normalize = function (e) {
      return e = E(e) / E(this.base), s["f"](e, this._extent);
    }, t.prototype.scale = function (e) {
      return e = s["g"](e, this._extent), A(this.base, e);
    }, t.type = "log", t;
  }(o["a"]),
  L = P.prototype;
function N(e, t) {
  return T(e, h["e"](t));
}
L.getMinorTicks = C.getMinorTicks, L.getLabel = C.getLabel, o["a"].registerClass(P);
var R = P,
  z = require("./37687172.js"),
  F = require("./55342f65.js");
function B(e, t) {
  var n = e.type,
    i = Object(F["a"])(e, t, e.getExtent()).calculate();
  e.setBlank(i.isBlank);
  var o = i.min,
    a = i.max,
    s = t.ecModel;
  if (s && "time" === n) {
    var l = Object(f["d"])("bar", s),
      u = !1;
    if (r["j"](l, function (e) {
      u = u || e.getBaseAxis() === t.axis;
    }), u) {
      var c = Object(f["c"])(l),
        d = Y(o, a, t, c);
      o = d.min, a = d.max;
    }
  }
  return {
    extent: [o, a],
    fixMin: i.minFixed,
    fixMax: i.maxFixed
  };
}
function Y(e, t, n, i) {
  var o = n.axis.getExtent(),
    a = o[1] - o[0],
    s = Object(f["e"])(i, n.axis);
  if (void 0 === s) return {
    min: e,
    max: t
  };
  var l = 1 / 0;
  r["j"](s, function (e) {
    l = Math.min(e.offset, l);
  });
  var u = -1 / 0;
  r["j"](s, function (e) {
    u = Math.max(e.offset + e.width, u);
  }), l = Math.abs(l), u = Math.abs(u);
  var c = l + u,
    d = t - e,
    h = 1 - (l + u) / a,
    p = d / h - d;
  return t += p * (u / c), e -= p * (l / c), {
    min: e,
    max: t
  };
}
function V(e, t) {
  var n = t,
    r = B(e, n),
    i = r.extent,
    o = n.get("splitNumber");
  e instanceof R && (e.base = n.get("logBase"));
  var a = e.type,
    s = n.get("interval"),
    l = "interval" === a || "time" === a;
  e.setExtent(i[0], i[1]), e.calcNiceExtent({
    splitNumber: o,
    fixMin: r.fixMin,
    fixMax: r.fixMax,
    minInterval: l ? n.get("minInterval") : null,
    maxInterval: l ? n.get("maxInterval") : null
  }), null != s && e.setInterval && e.setInterval(s);
}
function G(e, t) {
  if (t = t || e.get("type"), t) switch (t) {
    case "category":
      return new u({
        ordinalMeta: e.getOrdinalMeta ? e.getOrdinalMeta() : e.getCategories(),
        extent: [1 / 0, -1 / 0]
      });
    case "time":
      return new j({
        locale: e.ecModel.getLocaleModel(),
        useUTC: e.ecModel.get("useUTC")
      });
    default:
      return new (o["a"].getClass(t) || c["a"])();
  }
}
function W(e) {
  var t = e.scale.getExtent(),
    n = t[0],
    r = t[1];
  return !(n > 0 && r > 0 || n < 0 && r < 0);
}
function U(e) {
  var t = e.getLabelModel().get("formatter"),
    n = "category" === e.type ? e.scale.getExtent()[0] : null;
  return "time" === e.scale.type ? function (t) {
    return function (n, r) {
      return e.scale.getFormattedLabel(n, r, t);
    };
  }(t) : r["y"](t) ? function (t) {
    return function (n) {
      var r = e.scale.getLabel(n),
        i = t.replace("{value}", null != r ? r : "");
      return i;
    };
  }(t) : r["u"](t) ? function (t) {
    return function (r, i) {
      return null != n && (i = r.value - n), t(H(e, r), i, null != r.level ? {
        level: r.level
      } : null);
    };
  }(t) : function (t) {
    return e.scale.getLabel(t);
  };
}
function H(e, t) {
  return "category" === e.type ? e.scale.getLabel(t) : t.value;
}
function q(e) {
  var t = e.model,
    n = e.scale;
  if (t.get(["axisLabel", "show"]) && !n.isBlank()) {
    var r,
      i,
      o = n.getExtent();
    n instanceof u ? i = n.count() : (r = n.getTicks(), i = r.length);
    var a,
      s = e.getLabelModel(),
      l = U(e),
      c = 1;
    i > 40 && (c = Math.ceil(i / 40));
    for (var f = 0; f < i; f += c) {
      var d = r ? r[f] : {
          value: o[0] + f
        },
        h = l(d, f),
        p = s.getTextRect(h),
        g = K(p, s.get("rotate") || 0);
      a ? a.union(g) : a = g;
    }
    return a;
  }
}
function K(e, t) {
  var n = t * Math.PI / 180,
    r = e.width,
    i = e.height,
    o = r * Math.abs(Math.cos(n)) + Math.abs(i * Math.sin(n)),
    a = r * Math.abs(Math.sin(n)) + Math.abs(i * Math.cos(n)),
    s = new d["a"](e.x, e.y, o, a);
  return s;
}
function Z(e) {
  var t = e.get("interval");
  return null == t ? "auto" : t;
}
function X(e) {
  return "category" === e.type && 0 === Z(e.getLabelModel());
}
function Q(e, t) {
  var n = {};
  return r["j"](e.mapDimensionsAll(t), function (t) {
    n[Object(z["b"])(e, t)] = !0;
  }), r["B"](n);
}
function $(e, t, n) {
  t && r["j"](Q(t, n), function (n) {
    var r = t.getApproximateExtent(n);
    r[0] < e[0] && (e[0] = r[0]), r[1] > e[1] && (e[1] = r[1]);
  });
}
defineExport(legacyExports, "f", function () {
  return B;
}), defineExport(legacyExports, "i", function () {
  return V;
}), defineExport(legacyExports, "a", function () {
  return G;
}), defineExport(legacyExports, "g", function () {
  return W;
}), defineExport(legacyExports, "h", function () {
  return U;
}), defineExport(legacyExports, "c", function () {
  return H;
}), defineExport(legacyExports, "b", function () {
  return q;
}), defineExport(legacyExports, "e", function () {
  return Z;
}), defineExport(legacyExports, "j", function () {
  return X;
}), defineExport(legacyExports, "d", function () {
  return Q;
}), defineExport(legacyExports, "k", function () {
  return $;
});
