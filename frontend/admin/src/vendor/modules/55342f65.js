let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return l;
});
var r = require("./62597459.js"),
  i = require("./36477258.js"),
  o = function () {
    function e(e, t, n) {
      this._prepareParams(e, t, n);
    }
    return e.prototype._prepareParams = function (e, t, n) {
      n[1] < n[0] && (n = [NaN, NaN]), this._dataMin = n[0], this._dataMax = n[1];
      var o = this._isOrdinal = "ordinal" === e.type;
      this._needCrossZero = "interval" === e.type && t.getNeedCrossZero && t.getNeedCrossZero();
      var a = this._modelMinRaw = t.get("min", !0);
      Object(r["u"])(a) ? this._modelMinNum = u(e, a({
        min: n[0],
        max: n[1]
      })) : "dataMin" !== a && (this._modelMinNum = u(e, a));
      var s = this._modelMaxRaw = t.get("max", !0);
      if (Object(r["u"])(s) ? this._modelMaxNum = u(e, s({
        min: n[0],
        max: n[1]
      })) : "dataMax" !== s && (this._modelMaxNum = u(e, s)), o) this._axisDataLen = t.getCategories().length;else {
        var l = t.get("boundaryGap"),
          c = Object(r["r"])(l) ? l : [l || 0, l || 0];
        "boolean" === typeof c[0] || "boolean" === typeof c[1] ? this._boundaryGapInner = [0, 0] : this._boundaryGapInner = [Object(i["g"])(c[0], 1), Object(i["g"])(c[1], 1)];
      }
    }, e.prototype.calculate = function () {
      var e = this._isOrdinal,
        t = this._dataMin,
        n = this._dataMax,
        i = this._axisDataLen,
        o = this._boundaryGapInner,
        a = e ? null : n - t || Math.abs(t),
        s = "dataMin" === this._modelMinRaw ? t : this._modelMinNum,
        l = "dataMax" === this._modelMaxRaw ? n : this._modelMaxNum,
        u = null != s,
        c = null != l;
      null == s && (s = e ? i ? 0 : NaN : t - o[0] * a), null == l && (l = e ? i ? i - 1 : NaN : n + o[1] * a), (null == s || !isFinite(s)) && (s = NaN), (null == l || !isFinite(l)) && (l = NaN);
      var f = Object(r["k"])(s) || Object(r["k"])(l) || e && !i;
      this._needCrossZero && (s > 0 && l > 0 && !u && (s = 0), s < 0 && l < 0 && !c && (l = 0));
      var d = this._determinedMin,
        h = this._determinedMax;
      return null != d && (s = d, u = !0), null != h && (l = h, c = !0), {
        min: s,
        max: l,
        minFixed: u,
        maxFixed: c,
        isBlank: f
      };
    }, e.prototype.modifyDataMinMax = function (e, t) {
      this[s[e]] = t;
    }, e.prototype.setDeterminedMinMax = function (e, t) {
      var n = a[e];
      this[n] = t;
    }, e.prototype.freeze = function () {
      this.frozen = !0;
    }, e;
  }(),
  a = {
    min: "_determinedMin",
    max: "_determinedMax"
  },
  s = {
    min: "_dataMin",
    max: "_dataMax"
  };
function l(e, t, n) {
  var r = e.rawExtentInfo;
  return r || (r = new o(e, t, n), e.rawExtentInfo = r, r);
}
function u(e, t) {
  return null == t ? null : Object(r["k"])(t) ? NaN : e.parse(t);
}
