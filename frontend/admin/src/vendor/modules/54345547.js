let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
var r = require("./6d725347.js"),
  i = require("./62597459.js"),
  o = require("./49744746.js"),
  a = require("./344e4f34.js"),
  s = require("./624c6677.js"),
  l = require("./51454731.js"),
  u = require("./4f4b4a32.js"),
  c = require("./2b54542f.js"),
  f = require("./6e37796e.js"),
  d = require("./596c3763.js"),
  h = require("./37472b63.js"),
  p = require("./422f3347.js"),
  g = require("./44356e59.js"),
  m = require("./4250642b.js"),
  v = require("./304d3567.js"),
  y = require("./4b786641.js"),
  b = function () {
    function e(e) {
      this._sourceList = [], this._storeList = [], this._upstreamSignList = [], this._versionSignBase = 0, this._dirty = !0, this._sourceHost = e;
    }
    return e.prototype.dirty = function () {
      this._setLocalSource([], []), this._storeList = [], this._dirty = !0;
    }, e.prototype._setLocalSource = function (e, t) {
      this._sourceList = e, this._upstreamSignList = t, this._versionSignBase++, this._versionSignBase > 9e10 && (this._versionSignBase = 0);
    }, e.prototype._getVersionSign = function () {
      return this._sourceHost.uid + "_" + this._versionSignBase;
    }, e.prototype.prepareSource = function () {
      this._isDirty() && (this._createSource(), this._dirty = !1);
    }, e.prototype._createSource = function () {
      this._setLocalSource([], []);
      var e,
        t,
        n = this._sourceHost,
        r = this._getUpstreamSourceManagers(),
        o = !!r.length;
      if (x(n)) {
        var a = n,
          s = void 0,
          l = void 0,
          u = void 0;
        if (o) {
          var c = r[0];
          c.prepareSource(), u = c.getSource(), s = u.data, l = u.sourceFormat, t = [c._getVersionSign()];
        } else s = a.get("data", !0), l = Object(i["A"])(s) ? p["g"] : p["f"], t = [];
        var f = this._getSourceMetaRawOption() || {},
          d = u && u.metaRawOption || {},
          g = Object(i["K"])(f.seriesLayoutBy, d.seriesLayoutBy) || null,
          m = Object(i["K"])(f.sourceHeader, d.sourceHeader),
          v = Object(i["K"])(f.dimensions, d.dimensions),
          y = g !== d.seriesLayoutBy || !!m !== !!d.sourceHeader || v;
        e = y ? [Object(h["b"])(s, {
          seriesLayoutBy: g,
          sourceHeader: m,
          dimensions: v
        }, l)] : [];
      } else {
        var b = n;
        if (o) {
          var _ = this._applyTransform(r);
          e = _.sourceList, t = _.upstreamSignList;
        } else {
          var w = b.get("source", !0);
          e = [Object(h["b"])(w, this._getSourceMetaRawOption(), null)], t = [];
        }
      }
      this._setLocalSource(e, t);
    }, e.prototype._applyTransform = function (e) {
      var t,
        n = this._sourceHost,
        r = n.get("transform", !0),
        o = n.get("fromTransformResult", !0);
      if (null != o) {
        var a = "";
        1 !== e.length && _(a);
      }
      var s = [],
        l = [];
      return Object(i["j"])(e, function (e) {
        e.prepareSource();
        var t = e.getSource(o || 0),
          n = "";
        null == o || t || _(n), s.push(t), l.push(e._getVersionSign());
      }), r ? t = Object(m["a"])(r, s, {
        datasetIndex: n.componentIndex
      }) : null != o && (t = [Object(h["a"])(s[0])]), {
        sourceList: t,
        upstreamSignList: l
      };
    }, e.prototype._isDirty = function () {
      if (this._dirty) return !0;
      for (var e = this._getUpstreamSourceManagers(), t = 0; t < e.length; t++) {
        var n = e[t];
        if (n._isDirty() || this._upstreamSignList[t] !== n._getVersionSign()) return !0;
      }
    }, e.prototype.getSource = function (e) {
      e = e || 0;
      var t = this._sourceList[e];
      if (!t) {
        var n = this._getUpstreamSourceManagers();
        return n[0] && n[0].getSource(e);
      }
      return t;
    }, e.prototype.getSharedDataStore = function (e) {
      var t = e.makeStoreSchema();
      return this._innerGetDataStore(t.dimensions, e.source, t.hash);
    }, e.prototype._innerGetDataStore = function (e, t, n) {
      var r = 0,
        i = this._storeList,
        o = i[r];
      o || (o = i[r] = {});
      var a = o[n];
      if (!a) {
        var s = this._getUpstreamSourceManagers()[0];
        x(this._sourceHost) && s ? a = s._innerGetDataStore(e, t, n) : (a = new v["b"](), a.initData(new y["a"](t, e.length), e)), o[n] = a;
      }
      return a;
    }, e.prototype._getUpstreamSourceManagers = function () {
      var e = this._sourceHost;
      if (x(e)) {
        var t = Object(g["e"])(e);
        return t ? [t.getSourceManager()] : [];
      }
      return Object(i["D"])(Object(g["d"])(e), function (e) {
        return e.getSourceManager();
      });
    }, e.prototype._getSourceMetaRawOption = function () {
      var e,
        t,
        n,
        r = this._sourceHost;
      if (x(r)) e = r.get("seriesLayoutBy", !0), t = r.get("sourceHeader", !0), n = r.get("dimensions", !0);else if (!this._getUpstreamSourceManagers().length) {
        var i = r;
        e = i.get("seriesLayoutBy", !0), t = i.get("sourceHeader", !0), n = i.get("dimensions", !0);
      }
      return {
        seriesLayoutBy: e,
        sourceHeader: t,
        dimensions: n
      };
    }, e;
  }();
function x(e) {
  return "series" === e.mainType;
}
function _(e) {
  throw new Error(e);
}
var w = require("./49587a71.js");
function O(e) {
  var t,
    n,
    r,
    o,
    s = e.series,
    l = e.dataIndex,
    u = e.multipleSeries,
    c = s.getData(),
    f = c.mapDimensionsAll("defaultedTooltip"),
    d = f.length,
    h = s.getRawValue(l),
    p = Object(i["r"])(h),
    g = Object(w["e"])(s, l);
  if (d > 1 || p && !d) {
    var m = S(h, s, l, f, g);
    t = m.inlineValues, n = m.inlineValueTypes, r = m.blocks, o = m.inlineValues[0];
  } else if (d) {
    var v = c.getDimensionInfo(f[0]);
    o = t = Object(y["e"])(c, l, f[0]), n = v.type;
  } else o = t = p ? h[0] : h;
  var b = Object(a["l"])(s),
    x = b && s.name || "",
    _ = c.getName(l),
    O = u ? x : _;
  return Object(w["c"])("section", {
    header: x,
    noHeader: u || !b,
    sortParam: o,
    blocks: [Object(w["c"])("nameValue", {
      markerType: "item",
      markerColor: g,
      name: O,
      noName: !Object(i["O"])(O),
      value: t,
      valueType: n
    })].concat(r || [])
  });
}
function S(e, t, n, r, o) {
  var a = t.getData(),
    s = Object(i["I"])(e, function (e, t, n) {
      var r = a.getDimensionInfo(n);
      return e || r && !1 !== r.tooltip && null != r.displayName;
    }, !1),
    l = [],
    u = [],
    c = [];
  function f(e, t) {
    var n = a.getDimensionInfo(t);
    n && !1 !== n.otherDims.tooltip && (s ? c.push(Object(w["c"])("nameValue", {
      markerType: "subItem",
      markerColor: o,
      name: n.displayName,
      value: e,
      valueType: n.type
    })) : (l.push(e), u.push(n.type)));
  }
  return r.length ? Object(i["j"])(r, function (e) {
    f(Object(y["e"])(a, n, e), e);
  }) : Object(i["j"])(e, f), {
    inlineValues: l,
    inlineValueTypes: u,
    blocks: c
  };
}
defineExport(legacyExports, "a", function () {
  return M;
});
var k = a["m"]();
function j(e, t) {
  return e.getName(t) || e.getId(t);
}
var M = "__universalTransitionEnabled",
  C = function (e) {
    function t() {
      var t = null !== e && e.apply(this, arguments) || this;
      return t._selectedDataIndicesMap = {}, t;
    }
    return Object(r["a"])(t, e), t.prototype.init = function (e, t, n) {
      this.seriesIndex = this.componentIndex, this.dataTask = Object(f["a"])({
        count: D,
        reset: A
      }), this.dataTask.context = {
        model: this
      }, this.mergeDefaultAndTheme(e, n);
      var r = k(this).sourceManager = new b(this);
      r.prepareSource();
      var i = this.getInitialData(e, n);
      P(i, this), this.dataTask.context.data = i, k(this).dataBeforeProcessed = i, T(this), this._initSelectedMapFromData(i);
    }, t.prototype.mergeDefaultAndTheme = function (e, t) {
      var n = Object(c["b"])(this),
        r = n ? Object(c["c"])(e) : {},
        o = this.subType;
      s["a"].hasClass(o) && (o += "Series"), i["E"](e, t.getTheme().get(this.subType)), i["E"](e, this.getDefaultOption()), a["e"](e, "label", ["show"]), this.fillDataTextStyle(e.data), n && Object(c["e"])(e, r, n);
    }, t.prototype.mergeOption = function (e, t) {
      e = i["E"](this.option, e, !0), this.fillDataTextStyle(e.data);
      var n = Object(c["b"])(this);
      n && Object(c["e"])(this.option, e, n);
      var r = k(this).sourceManager;
      r.dirty(), r.prepareSource();
      var o = this.getInitialData(e, t);
      P(o, this), this.dataTask.dirty(), this.dataTask.context.data = o, k(this).dataBeforeProcessed = o, T(this), this._initSelectedMapFromData(o);
    }, t.prototype.fillDataTextStyle = function (e) {
      if (e && !i["A"](e)) for (var t = ["show"], n = 0; n < e.length; n++) e[n] && e[n].label && a["e"](e[n], "label", t);
    }, t.prototype.getInitialData = function (e, t) {}, t.prototype.appendData = function (e) {
      var t = this.getRawData();
      t.appendData(e.data);
    }, t.prototype.getData = function (e) {
      var t = N(this);
      if (t) {
        var n = t.context.data;
        return null == e ? n : n.getLinkedData(e);
      }
      return k(this).data;
    }, t.prototype.getAllData = function () {
      var e = this.getData();
      return e && e.getLinkedDataAll ? e.getLinkedDataAll() : [{
        data: e
      }];
    }, t.prototype.setData = function (e) {
      var t = N(this);
      if (t) {
        var n = t.context;
        n.outputData = e, t !== this.dataTask && (n.data = e);
      }
      k(this).data = e;
    }, t.prototype.getEncode = function () {
      var e = this.get("encode", !0);
      if (e) return i["f"](e);
    }, t.prototype.getSourceManager = function () {
      return k(this).sourceManager;
    }, t.prototype.getSource = function () {
      return this.getSourceManager().getSource();
    }, t.prototype.getRawData = function () {
      return k(this).dataBeforeProcessed;
    }, t.prototype.getColorBy = function () {
      var e = this.get("colorBy");
      return e || "series";
    }, t.prototype.isColorBySeries = function () {
      return "series" === this.getColorBy();
    }, t.prototype.getBaseAxis = function () {
      var e = this.coordinateSystem;
      return e && e.getBaseAxis && e.getBaseAxis();
    }, t.prototype.formatTooltip = function (e, t, n) {
      return O({
        series: this,
        dataIndex: e,
        multipleSeries: t
      });
    }, t.prototype.isAnimationEnabled = function () {
      var e = this.ecModel;
      if (o["a"].node && (!e || !e.ssr)) return !1;
      var t = this.getShallow("animation");
      return t && this.getData().count() > this.getShallow("animationThreshold") && (t = !1), !!t;
    }, t.prototype.restoreData = function () {
      this.dataTask.dirty();
    }, t.prototype.getColorFromPalette = function (e, t, n) {
      var r = this.ecModel,
        i = l["a"].prototype.getColorFromPalette.call(this, e, t, n);
      return i || (i = r.getColorFromPalette(e, t, n)), i;
    }, t.prototype.coordDimToDataDim = function (e) {
      return this.getRawData().mapDimensionsAll(e);
    }, t.prototype.getProgressive = function () {
      return this.get("progressive");
    }, t.prototype.getProgressiveThreshold = function () {
      return this.get("progressiveThreshold");
    }, t.prototype.select = function (e, t) {
      this._innerSelect(this.getData(t), e);
    }, t.prototype.unselect = function (e, t) {
      var n = this.option.selectedMap;
      if (n) {
        var r = this.option.selectedMode,
          i = this.getData(t);
        if ("series" === r || "all" === n) return this.option.selectedMap = {}, void (this._selectedDataIndicesMap = {});
        for (var o = 0; o < e.length; o++) {
          var a = e[o],
            s = j(i, a);
          n[s] = !1, this._selectedDataIndicesMap[s] = -1;
        }
      }
    }, t.prototype.toggleSelect = function (e, t) {
      for (var n = [], r = 0; r < e.length; r++) n[0] = e[r], this.isSelected(e[r], t) ? this.unselect(n, t) : this.select(n, t);
    }, t.prototype.getSelectedDataIndices = function () {
      if ("all" === this.option.selectedMap) return [].slice.call(this.getData().getIndices());
      for (var e = this._selectedDataIndicesMap, t = i["B"](e), n = [], r = 0; r < t.length; r++) {
        var o = e[t[r]];
        o >= 0 && n.push(o);
      }
      return n;
    }, t.prototype.isSelected = function (e, t) {
      var n = this.option.selectedMap;
      if (!n) return !1;
      var r = this.getData(t);
      return ("all" === n || n[j(r, e)]) && !r.getItemModel(e).get(["select", "disabled"]);
    }, t.prototype.isUniversalTransitionEnabled = function () {
      if (this[M]) return !0;
      var e = this.option.universalTransition;
      return !!e && (!0 === e || e && e.enabled);
    }, t.prototype._innerSelect = function (e, t) {
      var n,
        r,
        o = this.option,
        a = o.selectedMode,
        s = t.length;
      if (a && s) if ("series" === a) o.selectedMap = "all";else if ("multiple" === a) {
        i["x"](o.selectedMap) || (o.selectedMap = {});
        for (var l = o.selectedMap, u = 0; u < s; u++) {
          var c = t[u],
            f = j(e, c);
          l[f] = !0, this._selectedDataIndicesMap[f] = e.getRawIndex(c);
        }
      } else if ("single" === a || !0 === a) {
        var d = t[s - 1];
        f = j(e, d);
        o.selectedMap = (n = {}, n[f] = !0, n), this._selectedDataIndicesMap = (r = {}, r[f] = e.getRawIndex(d), r);
      }
    }, t.prototype._initSelectedMapFromData = function (e) {
      if (!this.option.selectedMap) {
        var t = [];
        e.hasItemOption && e.each(function (n) {
          var r = e.getRawDataItem(n);
          r && r.selected && t.push(n);
        }), t.length > 0 && this._innerSelect(e, t);
      }
    }, t.registerClass = function (e) {
      return s["a"].registerClass(e);
    }, t.protoInitialize = function () {
      var e = t.prototype;
      e.type = "series.__base__", e.seriesIndex = 0, e.ignoreStyleOnData = !1, e.hasSymbolVisual = !1, e.defaultSymbol = "circle", e.visualStyleAccessPath = "itemStyle", e.visualDrawType = "fill";
    }(), t;
  }(s["a"]);
function T(e) {
  var t = e.name;
  a["l"](e) || (e.name = I(e) || t);
}
function I(e) {
  var t = e.getRawData(),
    n = t.mapDimensionsAll("seriesName"),
    r = [];
  return i["j"](n, function (e) {
    var n = t.getDimensionInfo(e);
    n.displayName && r.push(n.displayName);
  }), r.join(" ");
}
function D(e) {
  return e.model.getRawData().count();
}
function A(e) {
  var t = e.model;
  return t.setData(t.getRawData().cloneShallow()), E;
}
function E(e, t) {
  t.outputData && e.end > t.outputData.count() && t.model.getRawData().cloneShallow(t.outputData);
}
function P(e, t) {
  i["j"](i["e"](e.CHANGABLE_METHODS, e.DOWNSAMPLE_METHODS), function (n) {
    e.wrapMethod(n, i["h"](L, t));
  });
}
function L(e, t) {
  var n = N(e);
  return n && n.setOutputEnd((t || this).count()), t;
}
function N(e) {
  var t = (e.ecModel || {}).scheduler,
    n = t && t.getPipeline(e.uid);
  if (n) {
    var r = n.currentTask;
    if (r) {
      var i = r.agentStubMap;
      i && (r = i.get(e.uid));
    }
    return r;
  }
}
i["F"](C, u["a"]), i["F"](C, l["a"]), Object(d["e"])(C, s["a"]);
legacyExports["b"] = C;
