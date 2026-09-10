let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return d;
}), defineExport(legacyExports, "c", function () {
  return g;
}), defineExport(legacyExports, "b", function () {
  return y;
}), defineExport(legacyExports, "d", function () {
  return _;
}), defineExport(legacyExports, "e", function () {
  return O;
});
var r,
  i,
  o,
  a,
  s,
  l = require("./62597459.js"),
  u = require("./344e4f34.js"),
  c = require("./37472b63.js"),
  f = require("./422f3347.js"),
  d = function () {
    function e(e, t) {
      var n = Object(c["e"])(e) ? e : Object(c["c"])(e);
      this._source = n;
      var r = this._data = n.data;
      n.sourceFormat === f["g"] && (this._offset = 0, this._dimSize = t, this._data = r), s(this, r, n);
    }
    return e.prototype.getSource = function () {
      return this._source;
    }, e.prototype.count = function () {
      return 0;
    }, e.prototype.getItem = function (e, t) {}, e.prototype.appendData = function (e) {}, e.prototype.clean = function () {}, e.protoInitialize = function () {
      var t = e.prototype;
      t.pure = !1, t.persistent = !0;
    }(), e.internalField = function () {
      var e;
      s = function (e, i, o) {
        var s = o.sourceFormat,
          u = o.seriesLayoutBy,
          c = o.startIndex,
          d = o.dimensionsDefine,
          h = a[w(s, u)];
        if (Object(l["l"])(e, h), s === f["g"]) e.getItem = t, e.count = r, e.fillStorage = n;else {
          var p = g(s, u);
          e.getItem = Object(l["c"])(p, null, i, c, d);
          var m = y(s, u);
          e.count = Object(l["c"])(m, null, i, c, d);
        }
      };
      var t = function (e, t) {
          e -= this._offset, t = t || [];
          for (var n = this._data, r = this._dimSize, i = r * e, o = 0; o < r; o++) t[o] = n[i + o];
          return t;
        },
        n = function (e, t, n, r) {
          for (var i = this._data, o = this._dimSize, a = 0; a < o; a++) {
            for (var s = r[a], l = null == s[0] ? 1 / 0 : s[0], u = null == s[1] ? -1 / 0 : s[1], c = t - e, f = n[a], d = 0; d < c; d++) {
              var h = i[d * o + a];
              f[e + d] = h, h < l && (l = h), h > u && (u = h);
            }
            s[0] = l, s[1] = u;
          }
        },
        r = function () {
          return this._data ? this._data.length / this._dimSize : 0;
        };
      function i(e) {
        for (var t = 0; t < e.length; t++) this._data.push(e[t]);
      }
      e = {}, e[f["c"] + "_" + f["a"]] = {
        pure: !0,
        appendData: i
      }, e[f["c"] + "_" + f["b"]] = {
        pure: !0,
        appendData: function () {
          throw new Error('Do not support appendData when set seriesLayoutBy: "row".');
        }
      }, e[f["e"]] = {
        pure: !0,
        appendData: i
      }, e[f["d"]] = {
        pure: !0,
        appendData: function (e) {
          var t = this._data;
          Object(l["j"])(e, function (e, n) {
            for (var r = t[n] || (t[n] = []), i = 0; i < (e || []).length; i++) r.push(e[i]);
          });
        }
      }, e[f["f"]] = {
        appendData: i
      }, e[f["g"]] = {
        persistent: !1,
        pure: !0,
        appendData: function (e) {
          this._data = e;
        },
        clean: function () {
          this._offset += this.count(), this._data = null;
        }
      }, a = e;
    }(), e;
  }(),
  h = function (e, t, n, r) {
    return e[r];
  },
  p = (r = {}, r[f["c"] + "_" + f["a"]] = function (e, t, n, r) {
    return e[r + t];
  }, r[f["c"] + "_" + f["b"]] = function (e, t, n, r, i) {
    r += t;
    for (var o = i || [], a = e, s = 0; s < a.length; s++) {
      var l = a[s];
      o[s] = l ? l[r] : null;
    }
    return o;
  }, r[f["e"]] = h, r[f["d"]] = function (e, t, n, r, i) {
    for (var o = i || [], a = 0; a < n.length; a++) {
      var s = n[a].name;
      0;
      var l = e[s];
      o[a] = l ? l[r] : null;
    }
    return o;
  }, r[f["f"]] = h, r);
function g(e, t) {
  var n = p[w(e, t)];
  return n;
}
var m = function (e, t, n) {
    return e.length;
  },
  v = (i = {}, i[f["c"] + "_" + f["a"]] = function (e, t, n) {
    return Math.max(0, e.length - t);
  }, i[f["c"] + "_" + f["b"]] = function (e, t, n) {
    var r = e[0];
    return r ? Math.max(0, r.length - t) : 0;
  }, i[f["e"]] = m, i[f["d"]] = function (e, t, n) {
    var r = n[0].name;
    var i = e[r];
    return i ? i.length : 0;
  }, i[f["f"]] = m, i);
function y(e, t) {
  var n = v[w(e, t)];
  return n;
}
var b = function (e, t, n) {
    return e[t];
  },
  x = (o = {}, o[f["c"]] = b, o[f["e"]] = function (e, t, n) {
    return e[n];
  }, o[f["d"]] = b, o[f["f"]] = function (e, t, n) {
    var r = Object(u["g"])(e);
    return r instanceof Array ? r[t] : r;
  }, o[f["g"]] = b, o);
function _(e) {
  var t = x[e];
  return t;
}
function w(e, t) {
  return e === f["c"] ? e + "_" + t : e;
}
function O(e, t, n) {
  if (e) {
    var r = e.getRawDataItem(t);
    if (null != r) {
      var i = e.getStore(),
        o = i.getSource().sourceFormat;
      if (null != n) {
        var a = e.getDimensionIndex(n),
          s = i.getDimensionProperty(a);
        return _(o)(r, a, s);
      }
      var l = r;
      return o === f["f"] && (l = Object(u["g"])(r)), l;
    }
  }
}
