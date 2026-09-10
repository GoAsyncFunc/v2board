let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return c;
});
var r,
  i = require("./62597459.js"),
  o = require("./74396d68.js"),
  a = require("./37472b63.js"),
  s = "undefined",
  l = typeof Uint32Array === s ? Array : Uint32Array,
  u = typeof Uint16Array === s ? Array : Uint16Array,
  c = typeof Int32Array === s ? Array : Int32Array,
  f = typeof Float64Array === s ? Array : Float64Array,
  d = {
    float: f,
    int: c,
    ordinal: Array,
    number: Array,
    time: f
  };
function h(e) {
  return e > 65535 ? l : u;
}
function p() {
  return [1 / 0, -1 / 0];
}
function g(e) {
  var t = e.constructor;
  return t === Array ? e.slice() : new t(e);
}
function m(e, t, n, r, i) {
  var o = d[n || "float"];
  if (i) {
    var a = e[t],
      s = a && a.length;
    if (s !== r) {
      for (var l = new o(r), u = 0; u < s; u++) l[u] = a[u];
      e[t] = l;
    }
  } else e[t] = new o(r);
}
var v = function () {
  function e() {
    this._chunks = [], this._rawExtent = [], this._extent = [], this._count = 0, this._rawCount = 0, this._calcDimNameToIdx = Object(i["f"])();
  }
  return e.prototype.initData = function (e, t, n) {
    this._provider = e, this._chunks = [], this._indices = null, this.getRawIndex = this._getRawIdxIdentity;
    var o = e.getSource(),
      s = this.defaultDimValueGetter = r[o.sourceFormat];
    this._dimValueGetter = n || s, this._rawExtent = [];
    Object(a["f"])(o);
    this._dimensions = Object(i["D"])(t, function (e) {
      return {
        type: e.type,
        property: e.property
      };
    }), this._initDataFromProvider(0, e.count());
  }, e.prototype.getProvider = function () {
    return this._provider;
  }, e.prototype.getSource = function () {
    return this._provider.getSource();
  }, e.prototype.ensureCalculationDimension = function (e, t) {
    var n = this._calcDimNameToIdx,
      r = this._dimensions,
      i = n.get(e);
    if (null != i) {
      if (r[i].type === t) return i;
    } else i = r.length;
    return r[i] = {
      type: t
    }, n.set(e, i), this._chunks[i] = new d[t || "float"](this._rawCount), this._rawExtent[i] = p(), i;
  }, e.prototype.collectOrdinalMeta = function (e, t) {
    var n = this._chunks[e],
      r = this._dimensions[e],
      i = this._rawExtent,
      o = r.ordinalOffset || 0,
      a = n.length;
    0 === o && (i[e] = p());
    for (var s = i[e], l = o; l < a; l++) {
      var u = n[l] = t.parseAndCollect(n[l]);
      isNaN(u) || (s[0] = Math.min(u, s[0]), s[1] = Math.max(u, s[1]));
    }
    r.ordinalMeta = t, r.ordinalOffset = a, r.type = "ordinal";
  }, e.prototype.getOrdinalMeta = function (e) {
    var t = this._dimensions[e],
      n = t.ordinalMeta;
    return n;
  }, e.prototype.getDimensionProperty = function (e) {
    var t = this._dimensions[e];
    return t && t.property;
  }, e.prototype.appendData = function (e) {
    var t = this._provider,
      n = this.count();
    t.appendData(e);
    var r = t.count();
    return t.persistent || (r += n), n < r && this._initDataFromProvider(n, r, !0), [n, r];
  }, e.prototype.appendValues = function (e, t) {
    for (var n = this._chunks, i = this._dimensions, o = i.length, a = this._rawExtent, s = this.count(), l = s + Math.max(e.length, t || 0), u = 0; u < o; u++) {
      var c = i[u];
      m(n, u, c.type, l, !0);
    }
    for (var f = [], d = s; d < l; d++) for (var h = d - s, p = 0; p < o; p++) {
      c = i[p];
      var g = r.arrayRows.call(this, e[h] || f, c.property, h, p);
      n[p][d] = g;
      var v = a[p];
      g < v[0] && (v[0] = g), g > v[1] && (v[1] = g);
    }
    return this._rawCount = this._count = l, {
      start: s,
      end: l
    };
  }, e.prototype._initDataFromProvider = function (e, t, n) {
    for (var r = this._provider, o = this._chunks, a = this._dimensions, s = a.length, l = this._rawExtent, u = Object(i["D"])(a, function (e) {
        return e.property;
      }), c = 0; c < s; c++) {
      var f = a[c];
      l[c] || (l[c] = p()), m(o, c, f.type, t, n);
    }
    if (r.fillStorage) r.fillStorage(e, t, o, l);else for (var d = [], h = e; h < t; h++) {
      d = r.getItem(h, d);
      for (var g = 0; g < s; g++) {
        var v = o[g],
          y = this._dimValueGetter(d, u[g], h, g);
        v[h] = y;
        var b = l[g];
        y < b[0] && (b[0] = y), y > b[1] && (b[1] = y);
      }
    }
    !r.persistent && r.clean && r.clean(), this._rawCount = this._count = t, this._extent = [];
  }, e.prototype.count = function () {
    return this._count;
  }, e.prototype.get = function (e, t) {
    if (!(t >= 0 && t < this._count)) return NaN;
    var n = this._chunks[e];
    return n ? n[this.getRawIndex(t)] : NaN;
  }, e.prototype.getValues = function (e, t) {
    var n = [],
      r = [];
    if (null == t) {
      t = e, e = [];
      for (var i = 0; i < this._dimensions.length; i++) r.push(i);
    } else r = e;
    i = 0;
    for (var o = r.length; i < o; i++) n.push(this.get(r[i], t));
    return n;
  }, e.prototype.getByRawIndex = function (e, t) {
    if (!(t >= 0 && t < this._rawCount)) return NaN;
    var n = this._chunks[e];
    return n ? n[t] : NaN;
  }, e.prototype.getSum = function (e) {
    var t = this._chunks[e],
      n = 0;
    if (t) for (var r = 0, i = this.count(); r < i; r++) {
      var o = this.get(e, r);
      isNaN(o) || (n += o);
    }
    return n;
  }, e.prototype.getMedian = function (e) {
    var t = [];
    this.each([e], function (e) {
      isNaN(e) || t.push(e);
    });
    var n = t.sort(function (e, t) {
        return e - t;
      }),
      r = this.count();
    return 0 === r ? 0 : r % 2 === 1 ? n[(r - 1) / 2] : (n[r / 2] + n[r / 2 - 1]) / 2;
  }, e.prototype.indexOfRawIndex = function (e) {
    if (e >= this._rawCount || e < 0) return -1;
    if (!this._indices) return e;
    var t = this._indices,
      n = t[e];
    if (null != n && n < this._count && n === e) return e;
    var r = 0,
      i = this._count - 1;
    while (r <= i) {
      var o = (r + i) / 2 | 0;
      if (t[o] < e) r = o + 1;else {
        if (!(t[o] > e)) return o;
        i = o - 1;
      }
    }
    return -1;
  }, e.prototype.indicesOfNearest = function (e, t, n) {
    var r = this._chunks,
      i = r[e],
      o = [];
    if (!i) return o;
    null == n && (n = 1 / 0);
    for (var a = 1 / 0, s = -1, l = 0, u = 0, c = this.count(); u < c; u++) {
      var f = this.getRawIndex(u),
        d = t - i[f],
        h = Math.abs(d);
      h <= n && ((h < a || h === a && d >= 0 && s < 0) && (a = h, s = d, l = 0), d === s && (o[l++] = u));
    }
    return o.length = l, o;
  }, e.prototype.getIndices = function () {
    var e,
      t = this._indices;
    if (t) {
      var n = t.constructor,
        r = this._count;
      if (n === Array) {
        e = new n(r);
        for (var i = 0; i < r; i++) e[i] = t[i];
      } else e = new n(t.buffer, 0, r);
    } else {
      n = h(this._rawCount);
      e = new n(this.count());
      for (i = 0; i < e.length; i++) e[i] = i;
    }
    return e;
  }, e.prototype.filter = function (e, t) {
    if (!this._count) return this;
    for (var n = this.clone(), r = n.count(), i = h(n._rawCount), o = new i(r), a = [], s = e.length, l = 0, u = e[0], c = n._chunks, f = 0; f < r; f++) {
      var d = void 0,
        p = n.getRawIndex(f);
      if (0 === s) d = t(f);else if (1 === s) {
        var g = c[u][p];
        d = t(g, f);
      } else {
        for (var m = 0; m < s; m++) a[m] = c[e[m]][p];
        a[m] = f, d = t.apply(null, a);
      }
      d && (o[l++] = p);
    }
    return l < r && (n._indices = o), n._count = l, n._extent = [], n._updateGetRawIdx(), n;
  }, e.prototype.selectRange = function (e) {
    var t = this.clone(),
      n = t._count;
    if (!n) return this;
    var r = Object(i["B"])(e),
      o = r.length;
    if (!o) return this;
    var a = t.count(),
      s = h(t._rawCount),
      l = new s(a),
      u = 0,
      c = r[0],
      f = e[c][0],
      d = e[c][1],
      p = t._chunks,
      g = !1;
    if (!t._indices) {
      var m = 0;
      if (1 === o) {
        for (var v = p[r[0]], y = 0; y < n; y++) {
          var b = v[y];
          (b >= f && b <= d || isNaN(b)) && (l[u++] = m), m++;
        }
        g = !0;
      } else if (2 === o) {
        v = p[r[0]];
        var x = p[r[1]],
          _ = e[r[1]][0],
          w = e[r[1]][1];
        for (y = 0; y < n; y++) {
          b = v[y];
          var O = x[y];
          (b >= f && b <= d || isNaN(b)) && (O >= _ && O <= w || isNaN(O)) && (l[u++] = m), m++;
        }
        g = !0;
      }
    }
    if (!g) if (1 === o) for (y = 0; y < a; y++) {
      var S = t.getRawIndex(y);
      b = p[r[0]][S];
      (b >= f && b <= d || isNaN(b)) && (l[u++] = S);
    } else for (y = 0; y < a; y++) {
      for (var k = !0, j = (S = t.getRawIndex(y), 0); j < o; j++) {
        var M = r[j];
        b = p[M][S];
        (b < e[M][0] || b > e[M][1]) && (k = !1);
      }
      k && (l[u++] = t.getRawIndex(y));
    }
    return u < a && (t._indices = l), t._count = u, t._extent = [], t._updateGetRawIdx(), t;
  }, e.prototype.map = function (e, t) {
    var n = this.clone(e);
    return this._updateDims(n, e, t), n;
  }, e.prototype.modify = function (e, t) {
    this._updateDims(this, e, t);
  }, e.prototype._updateDims = function (e, t, n) {
    for (var r = e._chunks, i = [], o = t.length, a = e.count(), s = [], l = e._rawExtent, u = 0; u < t.length; u++) l[t[u]] = p();
    for (var c = 0; c < a; c++) {
      for (var f = e.getRawIndex(c), d = 0; d < o; d++) s[d] = r[t[d]][f];
      s[o] = c;
      var h = n && n.apply(null, s);
      if (null != h) {
        "object" !== typeof h && (i[0] = h, h = i);
        for (u = 0; u < h.length; u++) {
          var g = t[u],
            m = h[u],
            v = l[g],
            y = r[g];
          y && (y[f] = m), m < v[0] && (v[0] = m), m > v[1] && (v[1] = m);
        }
      }
    }
  }, e.prototype.lttbDownSample = function (e, t) {
    var n,
      r,
      i,
      o = this.clone([e], !0),
      a = o._chunks,
      s = a[e],
      l = this.count(),
      u = 0,
      c = Math.floor(1 / t),
      f = this.getRawIndex(0),
      d = new (h(this._rawCount))(Math.min(2 * (Math.ceil(l / c) + 2), l));
    d[u++] = f;
    for (var p = 1; p < l - 1; p += c) {
      for (var g = Math.min(p + c, l - 1), m = Math.min(p + 2 * c, l), v = (m + g) / 2, y = 0, b = g; b < m; b++) {
        var x = this.getRawIndex(b),
          _ = s[x];
        isNaN(_) || (y += _);
      }
      y /= m - g;
      var w = p,
        O = Math.min(p + c, l),
        S = p - 1,
        k = s[f];
      n = -1, i = w;
      var j = -1,
        M = 0;
      for (b = w; b < O; b++) {
        x = this.getRawIndex(b), _ = s[x];
        isNaN(_) ? (M++, j < 0 && (j = x)) : (r = Math.abs((S - v) * (_ - k) - (S - b) * (y - k)), r > n && (n = r, i = x));
      }
      M > 0 && M < O - w && (d[u++] = Math.min(j, i), i = Math.max(j, i)), d[u++] = i, f = i;
    }
    return d[u++] = this.getRawIndex(l - 1), o._count = u, o._indices = d, o.getRawIndex = this._getRawIdx, o;
  }, e.prototype.downSample = function (e, t, n, r) {
    for (var i = this.clone([e], !0), o = i._chunks, a = [], s = Math.floor(1 / t), l = o[e], u = this.count(), c = i._rawExtent[e] = p(), f = new (h(this._rawCount))(Math.ceil(u / s)), d = 0, g = 0; g < u; g += s) {
      s > u - g && (s = u - g, a.length = s);
      for (var m = 0; m < s; m++) {
        var v = this.getRawIndex(g + m);
        a[m] = l[v];
      }
      var y = n(a),
        b = this.getRawIndex(Math.min(g + r(a, y) || 0, u - 1));
      l[b] = y, y < c[0] && (c[0] = y), y > c[1] && (c[1] = y), f[d++] = b;
    }
    return i._count = d, i._indices = f, i._updateGetRawIdx(), i;
  }, e.prototype.each = function (e, t) {
    if (this._count) for (var n = e.length, r = this._chunks, i = 0, o = this.count(); i < o; i++) {
      var a = this.getRawIndex(i);
      switch (n) {
        case 0:
          t(i);
          break;
        case 1:
          t(r[e[0]][a], i);
          break;
        case 2:
          t(r[e[0]][a], r[e[1]][a], i);
          break;
        default:
          for (var s = 0, l = []; s < n; s++) l[s] = r[e[s]][a];
          l[s] = i, t.apply(null, l);
      }
    }
  }, e.prototype.getDataExtent = function (e) {
    var t = this._chunks[e],
      n = p();
    if (!t) return n;
    var r,
      i = this.count(),
      o = !this._indices;
    if (o) return this._rawExtent[e].slice();
    if (r = this._extent[e], r) return r.slice();
    r = n;
    for (var a = r[0], s = r[1], l = 0; l < i; l++) {
      var u = this.getRawIndex(l),
        c = t[u];
      c < a && (a = c), c > s && (s = c);
    }
    return r = [a, s], this._extent[e] = r, r;
  }, e.prototype.getRawDataItem = function (e) {
    var t = this.getRawIndex(e);
    if (this._provider.persistent) return this._provider.getItem(t);
    for (var n = [], r = this._chunks, i = 0; i < r.length; i++) n.push(r[i][t]);
    return n;
  }, e.prototype.clone = function (t, n) {
    var r = new e(),
      o = this._chunks,
      a = t && Object(i["I"])(t, function (e, t) {
        return e[t] = !0, e;
      }, {});
    if (a) for (var s = 0; s < o.length; s++) r._chunks[s] = a[s] ? g(o[s]) : o[s];else r._chunks = o;
    return this._copyCommonProps(r), n || (r._indices = this._cloneIndices()), r._updateGetRawIdx(), r;
  }, e.prototype._copyCommonProps = function (e) {
    e._count = this._count, e._rawCount = this._rawCount, e._provider = this._provider, e._dimensions = this._dimensions, e._extent = Object(i["d"])(this._extent), e._rawExtent = Object(i["d"])(this._rawExtent);
  }, e.prototype._cloneIndices = function () {
    if (this._indices) {
      var e = this._indices.constructor,
        t = void 0;
      if (e === Array) {
        var n = this._indices.length;
        t = new e(n);
        for (var r = 0; r < n; r++) t[r] = this._indices[r];
      } else t = new e(this._indices);
      return t;
    }
    return null;
  }, e.prototype._getRawIdxIdentity = function (e) {
    return e;
  }, e.prototype._getRawIdx = function (e) {
    return e < this._count && e >= 0 ? this._indices[e] : -1;
  }, e.prototype._updateGetRawIdx = function () {
    this.getRawIndex = this._indices ? this._getRawIdx : this._getRawIdxIdentity;
  }, e.internalField = function () {
    function e(e, t, n, r) {
      return Object(o["b"])(e[r], this._dimensions[r]);
    }
    r = {
      arrayRows: e,
      objectRows: function (e, t, n, r) {
        return Object(o["b"])(e[t], this._dimensions[r]);
      },
      keyedColumns: e,
      original: function (e, t, n, r) {
        var i = e && (null == e.value ? e : e.value);
        return Object(o["b"])(i instanceof Array ? i[r] : i, this._dimensions[r]);
      },
      typedArray: function (e, t, n, r) {
        return e[r];
      }
    };
  }(), e;
}();
legacyExports["b"] = v;
