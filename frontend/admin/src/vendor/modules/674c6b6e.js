let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return l;
}), defineExport(legacyExports, "d", function () {
  return u;
}), defineExport(legacyExports, "b", function () {
  return c;
}), defineExport(legacyExports, "c", function () {
  return f;
}), defineExport(legacyExports, "e", function () {
  return d;
});
var r = require("./62597459.js"),
  i = require("./344e4f34.js"),
  o = require("./37472b63.js"),
  a = Object(i["m"])(),
  s = {
    float: "f",
    int: "i",
    ordinal: "o",
    number: "n",
    time: "t"
  },
  l = function () {
    function e(e) {
      this.dimensions = e.dimensions, this._dimOmitted = e.dimensionOmitted, this.source = e.source, this._fullDimCount = e.fullDimensionCount, this._updateDimOmitted(e.dimensionOmitted);
    }
    return e.prototype.isDimensionOmitted = function () {
      return this._dimOmitted;
    }, e.prototype._updateDimOmitted = function (e) {
      this._dimOmitted = e, e && (this._dimNameMap || (this._dimNameMap = f(this.source)));
    }, e.prototype.getSourceDimensionIndex = function (e) {
      return Object(r["K"])(this._dimNameMap.get(e), -1);
    }, e.prototype.getSourceDimension = function (e) {
      var t = this.source.dimensionsDefine;
      if (t) return t[e];
    }, e.prototype.makeStoreSchema = function () {
      for (var e = this._fullDimCount, t = Object(o["f"])(this.source), n = !d(e), r = "", i = [], a = 0, l = 0; a < e; a++) {
        var u = void 0,
          c = void 0,
          f = void 0,
          h = this.dimensions[l];
        if (h && h.storeDimIndex === a) u = t ? h.name : null, c = h.type, f = h.ordinalMeta, l++;else {
          var p = this.getSourceDimension(a);
          p && (u = t ? p.name : null, c = p.type);
        }
        i.push({
          property: u,
          type: c,
          ordinalMeta: f
        }), !t || null == u || h && h.isCalculationCoord || (r += n ? u.replace(/\`/g, "`1").replace(/\$/g, "`2") : u), r += "$", r += s[c] || "f", f && (r += f.uid), r += "$";
      }
      var g = this.source,
        m = [g.seriesLayoutBy, g.startIndex, r].join("$$");
      return {
        dimensions: i,
        hash: m
      };
    }, e.prototype.makeOutputDimensionNames = function () {
      for (var e = [], t = 0, n = 0; t < this._fullDimCount; t++) {
        var r = void 0,
          i = this.dimensions[n];
        if (i && i.storeDimIndex === t) i.isCalculationCoord || (r = i.name), n++;else {
          var o = this.getSourceDimension(t);
          o && (r = o.name);
        }
        e.push(r);
      }
      return e;
    }, e.prototype.appendCalculationDimension = function (e) {
      this.dimensions.push(e), e.isCalculationCoord = !0, this._fullDimCount++, this._updateDimOmitted(!0);
    }, e;
  }();
function u(e) {
  return e instanceof l;
}
function c(e) {
  for (var t = Object(r["f"])(), n = 0; n < (e || []).length; n++) {
    var i = e[n],
      o = Object(r["x"])(i) ? i.name : i;
    null != o && null == t.get(o) && t.set(o, n);
  }
  return t;
}
function f(e) {
  var t = a(e);
  return t.dimNameMap || (t.dimNameMap = c(e.dimensionsDefine));
}
function d(e) {
  return e > 30;
}
