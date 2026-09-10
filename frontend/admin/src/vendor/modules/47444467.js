let legacyModule = module,
  legacyExports = exports;
var r = require("./62597459.js"),
  i = require("./51786b74.js"),
  o = require("./6750416f.js"),
  a = require("./4b786641.js"),
  s = require("./422f3347.js"),
  l = function () {
    function e(e, t) {
      this._encode = e, this._schema = t;
    }
    return e.prototype.get = function () {
      return {
        fullDimensions: this._getFullDimensionNames(),
        encode: this._encode
      };
    }, e.prototype._getFullDimensionNames = function () {
      return this._cachedDimNames || (this._cachedDimNames = this._schema ? this._schema.makeOutputDimensionNames() : []), this._cachedDimNames;
    }, e;
  }();
function u(e, t) {
  var n = {},
    i = n.encode = {},
    o = Object(r["f"])(),
    a = [],
    u = [],
    f = {};
  Object(r["j"])(e.dimensions, function (t) {
    var n = e.getDimensionInfo(t),
      r = n.coordDim;
    if (r) {
      0;
      var l = n.coordDimIndex;
      c(i, r)[l] = t, n.isExtraCoord || (o.set(r, 1), d(n.type) && (a[0] = t), c(f, r)[l] = e.getDimensionIndex(n.name)), n.defaultTooltip && u.push(t);
    }
    s["i"].each(function (e, t) {
      var r = c(i, t),
        o = n.otherDims[t];
      null != o && !1 !== o && (r[o] = n.name);
    });
  });
  var h = [],
    p = {};
  o.each(function (e, t) {
    var n = i[t];
    p[t] = n[0], h = h.concat(n);
  }), n.dataDimsOnCoord = h, n.dataDimIndicesOnCoord = Object(r["D"])(h, function (t) {
    return e.getDimensionInfo(t).storeDimIndex;
  }), n.encodeFirstDimNotExtra = p;
  var g = i.label;
  g && g.length && (a = g.slice());
  var m = i.tooltip;
  return m && m.length ? u = m.slice() : u.length || (u = a.slice()), i.defaultedLabel = a, i.defaultedTooltip = u, n.userOutput = new l(f, t), n;
}
function c(e, t) {
  return e.hasOwnProperty(t) || (e[t] = []), e[t];
}
function f(e) {
  return "category" === e ? "ordinal" : "time" === e ? "time" : "float";
}
function d(e) {
  return !("ordinal" === e || "time" === e);
}
var h,
  p,
  g,
  m,
  v,
  y,
  b,
  x = function () {
    function e(e) {
      this.otherDims = {}, null != e && r["l"](this, e);
    }
    return e;
  }(),
  _ = x,
  w = require("./344e4f34.js"),
  O = require("./6868784b.js"),
  S = require("./37472b63.js"),
  k = require("./304d3567.js"),
  j = require("./674c6b6e.js"),
  M = r["x"],
  C = r["D"],
  T = "undefined" === typeof Int32Array ? Array : Int32Array,
  I = "e\0\0",
  D = -1,
  A = ["hasItemOption", "_nameList", "_idList", "_invertedIndicesMap", "_dimSummary", "userOutput", "_rawData", "_dimValueGetter", "_nameDimIdx", "_idDimIdx", "_nameRepeatCount"],
  E = ["_approximateExtent"],
  P = function () {
    function e(e, t) {
      var n;
      this.type = "list", this._dimOmitted = !1, this._nameList = [], this._idList = [], this._visual = {}, this._layout = {}, this._itemVisuals = [], this._itemLayouts = [], this._graphicEls = [], this._approximateExtent = {}, this._calculationInfo = {}, this.hasItemOption = !1, this.TRANSFERABLE_METHODS = ["cloneShallow", "downSample", "lttbDownSample", "map"], this.CHANGABLE_METHODS = ["filterSelf", "selectRange"], this.DOWNSAMPLE_METHODS = ["downSample", "lttbDownSample"];
      var i = !1;
      Object(j["d"])(e) ? (n = e.dimensions, this._dimOmitted = e.isDimensionOmitted(), this._schema = e) : (i = !0, n = e), n = n || ["x", "y"];
      for (var o = {}, a = [], s = {}, l = !1, u = {}, c = 0; c < n.length; c++) {
        var f = n[c],
          d = r["y"](f) ? new _({
            name: f
          }) : f instanceof _ ? f : new _(f),
          h = d.name;
        d.type = d.type || "float", d.coordDim || (d.coordDim = h, d.coordDimIndex = 0);
        var p = d.otherDims = d.otherDims || {};
        a.push(h), o[h] = d, null != u[h] && (l = !0), d.createInvertedIndices && (s[h] = []), 0 === p.itemName && (this._nameDimIdx = c), 0 === p.itemId && (this._idDimIdx = c), i && (d.storeDimIndex = c);
      }
      if (this.dimensions = a, this._dimInfos = o, this._initGetDimensionInfo(l), this.hostModel = t, this._invertedIndicesMap = s, this._dimOmitted) {
        var g = this._dimIdxToName = r["f"]();
        r["j"](a, function (e) {
          g.set(o[e].storeDimIndex, e);
        });
      }
    }
    return e.prototype.getDimension = function (e) {
      var t = this._recognizeDimIndex(e);
      if (null == t) return e;
      if (t = e, !this._dimOmitted) return this.dimensions[t];
      var n = this._dimIdxToName.get(t);
      if (null != n) return n;
      var r = this._schema.getSourceDimension(t);
      return r ? r.name : void 0;
    }, e.prototype.getDimensionIndex = function (e) {
      var t = this._recognizeDimIndex(e);
      if (null != t) return t;
      if (null == e) return -1;
      var n = this._getDimInfo(e);
      return n ? n.storeDimIndex : this._dimOmitted ? this._schema.getSourceDimensionIndex(e) : -1;
    }, e.prototype._recognizeDimIndex = function (e) {
      if (r["w"](e) || null != e && !isNaN(e) && !this._getDimInfo(e) && (!this._dimOmitted || this._schema.getSourceDimensionIndex(e) < 0)) return +e;
    }, e.prototype._getStoreDimIndex = function (e) {
      var t = this.getDimensionIndex(e);
      return t;
    }, e.prototype.getDimensionInfo = function (e) {
      return this._getDimInfo(this.getDimension(e));
    }, e.prototype._initGetDimensionInfo = function (e) {
      var t = this._dimInfos;
      this._getDimInfo = e ? function (e) {
        return t.hasOwnProperty(e) ? t[e] : void 0;
      } : function (e) {
        return t[e];
      };
    }, e.prototype.getDimensionsOnCoord = function () {
      return this._dimSummary.dataDimsOnCoord.slice();
    }, e.prototype.mapDimension = function (e, t) {
      var n = this._dimSummary;
      if (null == t) return n.encodeFirstDimNotExtra[e];
      var r = n.encode[e];
      return r ? r[t] : null;
    }, e.prototype.mapDimensionsAll = function (e) {
      var t = this._dimSummary,
        n = t.encode[e];
      return (n || []).slice();
    }, e.prototype.getStore = function () {
      return this._store;
    }, e.prototype.initData = function (e, t, n) {
      var i,
        o = this;
      if (e instanceof k["b"] && (i = e), !i) {
        var s = this.dimensions,
          l = Object(S["e"])(e) || r["s"](e) ? new a["a"](e, s.length) : e;
        i = new k["b"]();
        var c = C(s, function (e) {
          return {
            type: o._dimInfos[e].type,
            property: e
          };
        });
        i.initData(l, c, n);
      }
      this._store = i, this._nameList = (t || []).slice(), this._idList = [], this._nameRepeatCount = {}, this._doInit(0, i.count()), this._dimSummary = u(this, this._schema), this.userOutput = this._dimSummary.userOutput;
    }, e.prototype.appendData = function (e) {
      var t = this._store.appendData(e);
      this._doInit(t[0], t[1]);
    }, e.prototype.appendValues = function (e, t) {
      var n = this._store.appendValues(e, t.length),
        r = n.start,
        i = n.end,
        o = this._shouldMakeIdFromName();
      if (this._updateOrdinalMeta(), t) for (var a = r; a < i; a++) {
        var s = a - r;
        this._nameList[a] = t[s], o && b(this, a);
      }
    }, e.prototype._updateOrdinalMeta = function () {
      for (var e = this._store, t = this.dimensions, n = 0; n < t.length; n++) {
        var r = this._dimInfos[t[n]];
        r.ordinalMeta && e.collectOrdinalMeta(r.storeDimIndex, r.ordinalMeta);
      }
    }, e.prototype._shouldMakeIdFromName = function () {
      var e = this._store.getProvider();
      return null == this._idDimIdx && e.getSource().sourceFormat !== s["g"] && !e.fillStorage;
    }, e.prototype._doInit = function (e, t) {
      if (!(e >= t)) {
        var n = this._store,
          r = n.getProvider();
        this._updateOrdinalMeta();
        var i = this._nameList,
          o = this._idList,
          a = r.getSource().sourceFormat,
          l = a === s["f"];
        if (l && !r.pure) for (var u = [], c = e; c < t; c++) {
          var f = r.getItem(c, u);
          if (!this.hasItemOption && Object(w["k"])(f) && (this.hasItemOption = !0), f) {
            var d = f.name;
            null == i[c] && null != d && (i[c] = Object(w["d"])(d, null));
            var p = f.id;
            null == o[c] && null != p && (o[c] = Object(w["d"])(p, null));
          }
        }
        if (this._shouldMakeIdFromName()) for (c = e; c < t; c++) b(this, c);
        h(this);
      }
    }, e.prototype.getApproximateExtent = function (e) {
      return this._approximateExtent[e] || this._store.getDataExtent(this._getStoreDimIndex(e));
    }, e.prototype.setApproximateExtent = function (e, t) {
      t = this.getDimension(t), this._approximateExtent[t] = e.slice();
    }, e.prototype.getCalculationInfo = function (e) {
      return this._calculationInfo[e];
    }, e.prototype.setCalculationInfo = function (e, t) {
      M(e) ? r["l"](this._calculationInfo, e) : this._calculationInfo[e] = t;
    }, e.prototype.getName = function (e) {
      var t = this.getRawIndex(e),
        n = this._nameList[t];
      return null == n && null != this._nameDimIdx && (n = g(this, this._nameDimIdx, t)), null == n && (n = ""), n;
    }, e.prototype._getCategory = function (e, t) {
      var n = this._store.get(e, t),
        r = this._store.getOrdinalMeta(e);
      return r ? r.categories[n] : n;
    }, e.prototype.getId = function (e) {
      return p(this, this.getRawIndex(e));
    }, e.prototype.count = function () {
      return this._store.count();
    }, e.prototype.get = function (e, t) {
      var n = this._store,
        r = this._dimInfos[e];
      if (r) return n.get(r.storeDimIndex, t);
    }, e.prototype.getByRawIndex = function (e, t) {
      var n = this._store,
        r = this._dimInfos[e];
      if (r) return n.getByRawIndex(r.storeDimIndex, t);
    }, e.prototype.getIndices = function () {
      return this._store.getIndices();
    }, e.prototype.getDataExtent = function (e) {
      return this._store.getDataExtent(this._getStoreDimIndex(e));
    }, e.prototype.getSum = function (e) {
      return this._store.getSum(this._getStoreDimIndex(e));
    }, e.prototype.getMedian = function (e) {
      return this._store.getMedian(this._getStoreDimIndex(e));
    }, e.prototype.getValues = function (e, t) {
      var n = this,
        i = this._store;
      return r["r"](e) ? i.getValues(C(e, function (e) {
        return n._getStoreDimIndex(e);
      }), t) : i.getValues(e);
    }, e.prototype.hasValue = function (e) {
      for (var t = this._dimSummary.dataDimIndicesOnCoord, n = 0, r = t.length; n < r; n++) if (isNaN(this._store.get(t[n], e))) return !1;
      return !0;
    }, e.prototype.indexOfName = function (e) {
      for (var t = 0, n = this._store.count(); t < n; t++) if (this.getName(t) === e) return t;
      return -1;
    }, e.prototype.getRawIndex = function (e) {
      return this._store.getRawIndex(e);
    }, e.prototype.indexOfRawIndex = function (e) {
      return this._store.indexOfRawIndex(e);
    }, e.prototype.rawIndexOf = function (e, t) {
      var n = e && this._invertedIndicesMap[e];
      var r = n[t];
      return null == r || isNaN(r) ? D : r;
    }, e.prototype.indicesOfNearest = function (e, t, n) {
      return this._store.indicesOfNearest(this._getStoreDimIndex(e), t, n);
    }, e.prototype.each = function (e, t, n) {
      r["u"](e) && (n = t, t = e, e = []);
      var i = n || this,
        o = C(m(e), this._getStoreDimIndex, this);
      this._store.each(o, i ? r["c"](t, i) : t);
    }, e.prototype.filterSelf = function (e, t, n) {
      r["u"](e) && (n = t, t = e, e = []);
      var i = n || this,
        o = C(m(e), this._getStoreDimIndex, this);
      return this._store = this._store.filter(o, i ? r["c"](t, i) : t), this;
    }, e.prototype.selectRange = function (e) {
      var t = this,
        n = {},
        i = r["B"](e),
        o = [];
      return r["j"](i, function (r) {
        var i = t._getStoreDimIndex(r);
        n[i] = e[r], o.push(i);
      }), this._store = this._store.selectRange(n), this;
    }, e.prototype.mapArray = function (e, t, n) {
      r["u"](e) && (n = t, t = e, e = []), n = n || this;
      var i = [];
      return this.each(e, function () {
        i.push(t && t.apply(this, arguments));
      }, n), i;
    }, e.prototype.map = function (e, t, n, i) {
      var o = n || i || this,
        a = C(m(e), this._getStoreDimIndex, this),
        s = y(this);
      return s._store = this._store.map(a, o ? r["c"](t, o) : t), s;
    }, e.prototype.modify = function (e, t, n, i) {
      var o = n || i || this;
      var a = C(m(e), this._getStoreDimIndex, this);
      this._store.modify(a, o ? r["c"](t, o) : t);
    }, e.prototype.downSample = function (e, t, n, r) {
      var i = y(this);
      return i._store = this._store.downSample(this._getStoreDimIndex(e), t, n, r), i;
    }, e.prototype.lttbDownSample = function (e, t) {
      var n = y(this);
      return n._store = this._store.lttbDownSample(this._getStoreDimIndex(e), t), n;
    }, e.prototype.getRawDataItem = function (e) {
      return this._store.getRawDataItem(e);
    }, e.prototype.getItemModel = function (e) {
      var t = this.hostModel,
        n = this.getRawDataItem(e);
      return new i["a"](n, t, t && t.ecModel);
    }, e.prototype.diff = function (e) {
      var t = this;
      return new o["a"](e ? e.getStore().getIndices() : [], this.getStore().getIndices(), function (t) {
        return p(e, t);
      }, function (e) {
        return p(t, e);
      });
    }, e.prototype.getVisual = function (e) {
      var t = this._visual;
      return t && t[e];
    }, e.prototype.setVisual = function (e, t) {
      this._visual = this._visual || {}, M(e) ? r["l"](this._visual, e) : this._visual[e] = t;
    }, e.prototype.getItemVisual = function (e, t) {
      var n = this._itemVisuals[e],
        r = n && n[t];
      return null == r ? this.getVisual(t) : r;
    }, e.prototype.hasItemVisual = function () {
      return this._itemVisuals.length > 0;
    }, e.prototype.ensureUniqueItemVisual = function (e, t) {
      var n = this._itemVisuals,
        i = n[e];
      i || (i = n[e] = {});
      var o = i[t];
      return null == o && (o = this.getVisual(t), r["r"](o) ? o = o.slice() : M(o) && (o = r["l"]({}, o)), i[t] = o), o;
    }, e.prototype.setItemVisual = function (e, t, n) {
      var i = this._itemVisuals[e] || {};
      this._itemVisuals[e] = i, M(t) ? r["l"](i, t) : i[t] = n;
    }, e.prototype.clearAllVisual = function () {
      this._visual = {}, this._itemVisuals = [];
    }, e.prototype.setLayout = function (e, t) {
      M(e) ? r["l"](this._layout, e) : this._layout[e] = t;
    }, e.prototype.getLayout = function (e) {
      return this._layout[e];
    }, e.prototype.getItemLayout = function (e) {
      return this._itemLayouts[e];
    }, e.prototype.setItemLayout = function (e, t, n) {
      this._itemLayouts[e] = n ? r["l"](this._itemLayouts[e] || {}, t) : t;
    }, e.prototype.clearItemLayouts = function () {
      this._itemLayouts.length = 0;
    }, e.prototype.setItemGraphicEl = function (e, t) {
      var n = this.hostModel && this.hostModel.seriesIndex;
      Object(O["b"])(n, this.dataType, e, t), this._graphicEls[e] = t;
    }, e.prototype.getItemGraphicEl = function (e) {
      return this._graphicEls[e];
    }, e.prototype.eachItemGraphicEl = function (e, t) {
      r["j"](this._graphicEls, function (n, r) {
        n && e && e.call(t, n, r);
      });
    }, e.prototype.cloneShallow = function (t) {
      return t || (t = new e(this._schema ? this._schema : C(this.dimensions, this._getDimInfo, this), this.hostModel)), v(t, this), t._store = this._store, t;
    }, e.prototype.wrapMethod = function (e, t) {
      var n = this[e];
      r["u"](n) && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(e), this[e] = function () {
        var e = n.apply(this, arguments);
        return t.apply(this, [e].concat(r["N"](arguments)));
      });
    }, e.internalField = function () {
      h = function (e) {
        var t = e._invertedIndicesMap;
        r["j"](t, function (n, r) {
          var i = e._dimInfos[r],
            o = i.ordinalMeta,
            a = e._store;
          if (o) {
            n = t[r] = new T(o.categories.length);
            for (var s = 0; s < n.length; s++) n[s] = D;
            for (s = 0; s < a.count(); s++) n[a.get(i.storeDimIndex, s)] = s;
          }
        });
      }, g = function (e, t, n) {
        return Object(w["d"])(e._getCategory(t, n), null);
      }, p = function (e, t) {
        var n = e._idList[t];
        return null == n && null != e._idDimIdx && (n = g(e, e._idDimIdx, t)), null == n && (n = I + t), n;
      }, m = function (e) {
        return r["r"](e) || (e = null != e ? [e] : []), e;
      }, y = function (t) {
        var n = new e(t._schema ? t._schema : C(t.dimensions, t._getDimInfo, t), t.hostModel);
        return v(n, t), n;
      }, v = function (e, t) {
        r["j"](A.concat(t.__wrappedMethods || []), function (n) {
          t.hasOwnProperty(n) && (e[n] = t[n]);
        }), e.__wrappedMethods = t.__wrappedMethods, r["j"](E, function (n) {
          e[n] = r["d"](t[n]);
        }), e._calculationInfo = r["l"]({}, t._calculationInfo);
      }, b = function (e, t) {
        var n = e._nameList,
          r = e._idList,
          i = e._nameDimIdx,
          o = e._idDimIdx,
          a = n[t],
          s = r[t];
        if (null == a && null != i && (n[t] = a = g(e, i, t)), null == s && null != o && (r[t] = s = g(e, o, t)), null == s && null != a) {
          var l = e._nameRepeatCount,
            u = l[a] = (l[a] || 0) + 1;
          s = a, u > 1 && (s += "__ec__" + u), r[t] = s;
        }
      };
    }(), e;
  }(),
  L = P,
  N = require("./44356e59.js");
function R(e, t) {
  Object(S["e"])(e) || (e = Object(S["c"])(e)), t = t || {};
  var n = t.coordDimensions || [],
    i = t.dimensionsDefine || e.dimensionsDefine || [],
    o = Object(r["f"])(),
    a = [],
    l = F(e, n, i, t.dimensionsCount),
    u = t.canOmitUnusedDimensions && Object(j["e"])(l),
    c = i === e.dimensionsDefine,
    f = c ? Object(j["c"])(e) : Object(j["b"])(i),
    d = t.encodeDefine;
  !d && t.encodeDefaulter && (d = t.encodeDefaulter(e, l));
  for (var h = Object(r["f"])(d), p = new k["a"](l), g = 0; g < p.length; g++) p[g] = -1;
  function m(e) {
    var t = p[e];
    if (t < 0) {
      var n = i[e],
        o = Object(r["x"])(n) ? n : {
          name: n
        },
        s = new _(),
        l = o.name;
      null != l && null != f.get(l) && (s.name = s.displayName = l), null != o.type && (s.type = o.type), null != o.displayName && (s.displayName = o.displayName);
      var u = a.length;
      return p[e] = u, s.storeDimIndex = e, a.push(s), s;
    }
    return a[t];
  }
  if (!u) for (g = 0; g < l; g++) m(g);
  h.each(function (e, t) {
    var n = Object(w["p"])(e).slice();
    if (1 === n.length && !Object(r["y"])(n[0]) && n[0] < 0) h.set(t, !1);else {
      var i = h.set(t, []);
      Object(r["j"])(n, function (e, n) {
        var o = Object(r["y"])(e) ? f.get(e) : e;
        null != o && o < l && (i[n] = o, y(m(o), t, n));
      });
    }
  });
  var v = 0;
  function y(e, t, n) {
    null != s["i"].get(t) ? e.otherDims[t] = n : (e.coordDim = t, e.coordDimIndex = n, o.set(t, !0));
  }
  Object(r["j"])(n, function (e) {
    var t, n, i, o;
    if (Object(r["y"])(e)) t = e, o = {};else {
      o = e, t = o.name;
      var a = o.ordinalMeta;
      o.ordinalMeta = null, o = Object(r["l"])({}, o), o.ordinalMeta = a, n = o.dimsDef, i = o.otherDims, o.name = o.coordDim = o.coordDimIndex = o.dimsDef = o.otherDims = null;
    }
    var s = h.get(t);
    if (!1 !== s) {
      if (s = Object(w["p"])(s), !s.length) for (var u = 0; u < (n && n.length || 1); u++) {
        while (v < l && null != m(v).coordDim) v++;
        v < l && s.push(v++);
      }
      Object(r["j"])(s, function (e, a) {
        var s = m(e);
        if (c && null != o.type && (s.type = o.type), y(Object(r["i"])(s, o), t, a), null == s.name && n) {
          var l = n[a];
          !Object(r["x"])(l) && (l = {
            name: l
          }), s.name = s.displayName = l.name, s.defaultTooltip = l.defaultTooltip;
        }
        i && Object(r["i"])(s.otherDims, i);
      });
    }
  });
  var b = t.generateCoord,
    x = t.generateCoordCount,
    O = null != x;
  x = b ? x || 1 : 0;
  var M = b || "value";
  function C(e) {
    null == e.name && (e.name = e.coordDim);
  }
  if (u) Object(r["j"])(a, function (e) {
    C(e);
  }), a.sort(function (e, t) {
    return e.storeDimIndex - t.storeDimIndex;
  });else for (var T = 0; T < l; T++) {
    var I = m(T),
      D = I.coordDim;
    null == D && (I.coordDim = B(M, o, O), I.coordDimIndex = 0, (!b || x <= 0) && (I.isExtraCoord = !0), x--), C(I), null != I.type || Object(N["b"])(e, T) !== N["a"].Must && (!I.isExtraCoord || null == I.otherDims.itemName && null == I.otherDims.seriesName) || (I.type = "ordinal");
  }
  return z(a), new j["a"]({
    source: e,
    dimensions: a,
    fullDimensionCount: l,
    dimensionOmitted: u
  });
}
function z(e) {
  for (var t = Object(r["f"])(), n = 0; n < e.length; n++) {
    var i = e[n],
      o = i.name,
      a = t.get(o) || 0;
    a > 0 && (i.name = o + (a - 1)), a++, t.set(o, a);
  }
}
function F(e, t, n, i) {
  var o = Math.max(e.dimensionsDetectedCount || 1, t.length, n.length, i || 0);
  return Object(r["j"])(t, function (e) {
    var t;
    Object(r["x"])(e) && (t = e.dimsDef) && (o = Math.max(o, t.length));
  }), o;
}
function B(e, t, n) {
  var r = t.data;
  if (n || r.hasOwnProperty(e)) {
    var i = 0;
    while (r.hasOwnProperty(e + i)) i++;
    e += i;
  }
  return t.set(e, !0), e;
}
var Y = require("./487a6e49.js"),
  V = function () {
    function e(e) {
      this.coordSysDims = [], this.axisMap = Object(r["f"])(), this.categoryAxisMap = Object(r["f"])(), this.coordSysName = e;
    }
    return e;
  }();
function G(e) {
  var t = e.get("coordinateSystem"),
    n = new V(t),
    r = W[t];
  if (r) return r(e, n, n.axisMap, n.categoryAxisMap), n;
}
var W = {
  cartesian2d: function (e, t, n, r) {
    var i = e.getReferringComponents("xAxis", w["b"]).models[0],
      o = e.getReferringComponents("yAxis", w["b"]).models[0];
    t.coordSysDims = ["x", "y"], n.set("x", i), n.set("y", o), U(i) && (r.set("x", i), t.firstCategoryDimIndex = 0), U(o) && (r.set("y", o), null == t.firstCategoryDimIndex && (t.firstCategoryDimIndex = 1));
  },
  singleAxis: function (e, t, n, r) {
    var i = e.getReferringComponents("singleAxis", w["b"]).models[0];
    t.coordSysDims = ["single"], n.set("single", i), U(i) && (r.set("single", i), t.firstCategoryDimIndex = 0);
  },
  polar: function (e, t, n, r) {
    var i = e.getReferringComponents("polar", w["b"]).models[0],
      o = i.findAxisModel("radiusAxis"),
      a = i.findAxisModel("angleAxis");
    t.coordSysDims = ["radius", "angle"], n.set("radius", o), n.set("angle", a), U(o) && (r.set("radius", o), t.firstCategoryDimIndex = 0), U(a) && (r.set("angle", a), null == t.firstCategoryDimIndex && (t.firstCategoryDimIndex = 1));
  },
  geo: function (e, t, n, r) {
    t.coordSysDims = ["lng", "lat"];
  },
  parallel: function (e, t, n, i) {
    var o = e.ecModel,
      a = o.getComponent("parallel", e.get("parallelIndex")),
      s = t.coordSysDims = a.dimensions.slice();
    Object(r["j"])(a.parallelAxisIndex, function (e, r) {
      var a = o.getComponent("parallelAxis", e),
        l = s[r];
      n.set(l, a), U(a) && (i.set(l, a), null == t.firstCategoryDimIndex && (t.firstCategoryDimIndex = r));
    });
  }
};
function U(e) {
  return "category" === e.get("type");
}
var H = require("./37687172.js");
function q(e, t) {
  var n,
    i = e.get("coordinateSystem"),
    o = Y["a"].get(i);
  return t && t.coordSysDims && (n = r["D"](t.coordSysDims, function (e) {
    var n = {
        name: e
      },
      r = t.axisMap.get(e);
    if (r) {
      var i = r.get("type");
      n.type = f(i);
    }
    return n;
  })), n || (n = o && (o.getDimensionsInfo ? o.getDimensionsInfo() : o.dimensions.slice()) || ["x", "y"]), n;
}
function K(e, t, n) {
  var i, o;
  return n && r["j"](e, function (e, r) {
    var a = e.coordDim,
      s = n.categoryAxisMap.get(a);
    s && (null == i && (i = r), e.ordinalMeta = s.getOrdinalMeta(), t && (e.createInvertedIndices = !0)), null != e.otherDims.itemName && (o = !0);
  }), o || null == i || (e[i].otherDims.itemName = 0), i;
}
function Z(e, t, n) {
  n = n || {};
  var i,
    o = t.getSourceManager(),
    a = !1;
  e ? (a = !0, i = Object(S["c"])(e)) : (i = o.getSource(), a = i.sourceFormat === s["f"]);
  var l = G(t),
    u = q(t, l),
    c = n.useEncodeDefaulter,
    f = r["u"](c) ? c : c ? r["h"](N["c"], u, t) : null,
    d = {
      coordDimensions: u,
      generateCoord: n.generateCoord,
      encodeDefine: t.getEncode(),
      encodeDefaulter: f,
      canOmitUnusedDimensions: !a
    },
    h = R(i, d),
    p = K(h.dimensions, n.createInvertedIndices, l),
    g = a ? null : o.getSharedDataStore(h),
    m = Object(H["a"])(t, {
      schema: h,
      store: g
    }),
    v = new L(h, t);
  v.setCalculationInfo(m);
  var y = null != p && X(i) ? function (e, t, n, r) {
    return r === p ? n : this.defaultDimValueGetter(e, t, n, r);
  } : null;
  return v.hasItemOption = !1, v.initData(a ? i : g, null, y), v;
}
function X(e) {
  if (e.sourceFormat === s["f"]) {
    var t = Q(e.data || []);
    return !r["r"](Object(w["g"])(t));
  }
}
function Q(e) {
  var t = 0;
  while (t < e.length && null == e[t]) t++;
  return e[t];
}
legacyExports["a"] = Z;
