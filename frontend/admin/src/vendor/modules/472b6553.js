let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
var r = require("./6d725347.js"),
  i = require("./61583538.js"),
  o = require("./62597459.js"),
  a = require("./49744746.js"),
  s = require("./42505a55.js"),
  l = require("./62394f74.js"),
  u = require("./344e4f34.js"),
  c = require("./51786b74.js"),
  f = require("./624c6677.js"),
  d = "";
"undefined" !== typeof navigator && (d = navigator.platform || "");
var h,
  p,
  g,
  m = "rgba(0, 0, 0, 0.2)",
  v = {
    darkMode: "auto",
    colorBy: "series",
    color: ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de", "#3ba272", "#fc8452", "#9a60b4", "#ea7ccc"],
    gradientColor: ["#f6efa6", "#d88273", "#bf444c"],
    aria: {
      decal: {
        decals: [{
          color: m,
          dashArrayX: [1, 0],
          dashArrayY: [2, 5],
          symbolSize: 1,
          rotation: Math.PI / 6
        }, {
          color: m,
          symbol: "circle",
          dashArrayX: [[8, 8], [0, 8, 8, 0]],
          dashArrayY: [6, 0],
          symbolSize: .8
        }, {
          color: m,
          dashArrayX: [1, 0],
          dashArrayY: [4, 3],
          rotation: -Math.PI / 4
        }, {
          color: m,
          dashArrayX: [[6, 6], [0, 6, 6, 0]],
          dashArrayY: [6, 0]
        }, {
          color: m,
          dashArrayX: [[1, 0], [1, 6]],
          dashArrayY: [1, 0, 6, 0],
          rotation: Math.PI / 4
        }, {
          color: m,
          symbol: "triangle",
          dashArrayX: [[9, 9], [0, 9, 9, 0]],
          dashArrayY: [7, 2],
          symbolSize: .75
        }]
      }
    },
    textStyle: {
      fontFamily: d.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
      fontSize: 12,
      fontStyle: "normal",
      fontWeight: "normal"
    },
    blendMode: null,
    stateAnimation: {
      duration: 300,
      easing: "cubicOut"
    },
    animation: "auto",
    animationDuration: 1e3,
    animationDurationUpdate: 500,
    animationEasing: "cubicInOut",
    animationEasingUpdate: "cubicInOut",
    animationThreshold: 2e3,
    progressiveThreshold: 3e3,
    progressive: 400,
    hoverLayerThreshold: 3e3,
    useUTC: !1
  },
  y = require("./44356e59.js"),
  b = require("./4c783943.js"),
  x = require("./51454731.js"),
  _ = require("./37613470.js"),
  w = "\0_ec_inner",
  O = 1;
var S = function (e) {
  function t() {
    return null !== e && e.apply(this, arguments) || this;
  }
  return Object(r["a"])(t, e), t.prototype.init = function (e, t, n, r, i, o) {
    r = r || {}, this.option = null, this._theme = new c["a"](r), this._locale = new c["a"](i), this._optionManager = o;
  }, t.prototype.setOption = function (e, t, n) {
    var r = T(t);
    this._optionManager.setOption(e, n, r), this._resetOption(null, r);
  }, t.prototype.resetOption = function (e, t) {
    return this._resetOption(e, T(t));
  }, t.prototype._resetOption = function (e, t) {
    var n = !1,
      r = this._optionManager;
    if (!e || "recreate" === e) {
      var i = r.mountOption("recreate" === e);
      0, this.option && "recreate" !== e ? (this.restoreData(), this._mergeOption(i, t)) : g(this, i), n = !0;
    }
    if ("timeline" !== e && "media" !== e || this.restoreData(), !e || "recreate" === e || "timeline" === e) {
      var a = r.getTimelineOption(this);
      a && (n = !0, this._mergeOption(a, t));
    }
    if (!e || "recreate" === e || "media" === e) {
      var s = r.getMediaOption(this);
      s.length && Object(o["j"])(s, function (e) {
        n = !0, this._mergeOption(e, t);
      }, this);
    }
    return n;
  }, t.prototype.mergeOption = function (e) {
    this._mergeOption(e, null);
  }, t.prototype._mergeOption = function (e, t) {
    var n = this.option,
      r = this._componentsMap,
      i = this._componentsCount,
      a = [],
      s = Object(o["f"])(),
      l = t && t.replaceMergeMainTypeMap;
    function c(t) {
      var a = Object(b["a"])(this, t, u["p"](e[t])),
        s = r.get(t),
        c = s ? l && l.get(t) ? "replaceMerge" : "normalMerge" : "replaceAll",
        d = u["o"](s, a, c);
      u["v"](d, t, f["a"]), n[t] = null, r.set(t, null), i.set(t, 0);
      var p,
        g = [],
        m = [],
        v = 0;
      Object(o["j"])(d, function (e, n) {
        var r = e.existing,
          i = e.newOption;
        if (i) {
          var a = "series" === t,
            s = f["a"].getClass(t, e.keyInfo.subType, !a);
          if (!s) return;
          if ("tooltip" === t) {
            if (p) return void 0;
            p = !0;
          }
          if (r && r.constructor === s) r.name = e.keyInfo.name, r.mergeOption(i, this), r.optionUpdated(i, !1);else {
            var l = Object(o["l"])({
              componentIndex: n
            }, e.keyInfo);
            r = new s(i, this, this, l), Object(o["l"])(r, l), e.brandNew && (r.__requireNewView = !0), r.init(i, this, this), r.optionUpdated(null, !0);
          }
        } else r && (r.mergeOption({}, this), r.optionUpdated({}, !1));
        r ? (g.push(r.option), m.push(r), v++) : (g.push(void 0), m.push(void 0));
      }, this), n[t] = g, r.set(t, m), i.set(t, v), "series" === t && h(this);
    }
    Object(y["f"])(this), Object(o["j"])(e, function (e, t) {
      null != e && (f["a"].hasClass(t) ? t && (a.push(t), s.set(t, !0)) : n[t] = null == n[t] ? Object(o["d"])(e) : Object(o["E"])(n[t], e, !0));
    }), l && l.each(function (e, t) {
      f["a"].hasClass(t) && !s.get(t) && (a.push(t), s.set(t, !0));
    }), f["a"].topologicalTravel(a, f["a"].getAllClassMainTypes(), c, this), this._seriesIndices || h(this);
  }, t.prototype.getOption = function () {
    var e = Object(o["d"])(this.option);
    return Object(o["j"])(e, function (t, n) {
      if (f["a"].hasClass(n)) {
        for (var r = u["p"](t), i = r.length, o = !1, a = i - 1; a >= 0; a--) r[a] && !u["j"](r[a]) ? o = !0 : (r[a] = null, !o && i--);
        r.length = i, e[n] = r;
      }
    }), delete e[w], e;
  }, t.prototype.getTheme = function () {
    return this._theme;
  }, t.prototype.getLocaleModel = function () {
    return this._locale;
  }, t.prototype.setUpdatePayload = function (e) {
    this._payload = e;
  }, t.prototype.getUpdatePayload = function () {
    return this._payload;
  }, t.prototype.getComponent = function (e, t) {
    var n = this._componentsMap.get(e);
    if (n) {
      var r = n[t || 0];
      if (r) return r;
      if (null == t) for (var i = 0; i < n.length; i++) if (n[i]) return n[i];
    }
  }, t.prototype.queryComponents = function (e) {
    var t = e.mainType;
    if (!t) return [];
    var n,
      r = e.index,
      i = e.id,
      a = e.name,
      s = this._componentsMap.get(t);
    return s && s.length ? (null != r ? (n = [], Object(o["j"])(u["p"](r), function (e) {
      s[e] && n.push(s[e]);
    })) : n = null != i ? M("id", i, s) : null != a ? M("name", a, s) : Object(o["m"])(s, function (e) {
      return !!e;
    }), C(n, e)) : [];
  }, t.prototype.findComponents = function (e) {
    var t = e.query,
      n = e.mainType,
      r = a(t),
      i = r ? this.queryComponents(r) : Object(o["m"])(this._componentsMap.get(n), function (e) {
        return !!e;
      });
    return s(C(i, e));
    function a(e) {
      var t = n + "Index",
        r = n + "Id",
        i = n + "Name";
      return !e || null == e[t] && null == e[r] && null == e[i] ? null : {
        mainType: n,
        index: e[t],
        id: e[r],
        name: e[i]
      };
    }
    function s(t) {
      return e.filter ? Object(o["m"])(t, e.filter) : t;
    }
  }, t.prototype.eachComponent = function (e, t, n) {
    var r = this._componentsMap;
    if (Object(o["u"])(e)) {
      var i = t,
        a = e;
      r.each(function (e, t) {
        for (var n = 0; e && n < e.length; n++) {
          var r = e[n];
          r && a.call(i, t, r, r.componentIndex);
        }
      });
    } else for (var s = Object(o["y"])(e) ? r.get(e) : Object(o["x"])(e) ? this.findComponents(e) : null, l = 0; s && l < s.length; l++) {
      var u = s[l];
      u && t.call(n, u, u.componentIndex);
    }
  }, t.prototype.getSeriesByName = function (e) {
    var t = u["d"](e, null);
    return Object(o["m"])(this._componentsMap.get("series"), function (e) {
      return !!e && null != t && e.name === t;
    });
  }, t.prototype.getSeriesByIndex = function (e) {
    return this._componentsMap.get("series")[e];
  }, t.prototype.getSeriesByType = function (e) {
    return Object(o["m"])(this._componentsMap.get("series"), function (t) {
      return !!t && t.subType === e;
    });
  }, t.prototype.getSeries = function () {
    return Object(o["m"])(this._componentsMap.get("series"), function (e) {
      return !!e;
    });
  }, t.prototype.getSeriesCount = function () {
    return this._componentsCount.get("series");
  }, t.prototype.eachSeries = function (e, t) {
    p(this), Object(o["j"])(this._seriesIndices, function (n) {
      var r = this._componentsMap.get("series")[n];
      e.call(t, r, n);
    }, this);
  }, t.prototype.eachRawSeries = function (e, t) {
    Object(o["j"])(this._componentsMap.get("series"), function (n) {
      n && e.call(t, n, n.componentIndex);
    });
  }, t.prototype.eachSeriesByType = function (e, t, n) {
    p(this), Object(o["j"])(this._seriesIndices, function (r) {
      var i = this._componentsMap.get("series")[r];
      i.subType === e && t.call(n, i, r);
    }, this);
  }, t.prototype.eachRawSeriesByType = function (e, t, n) {
    return Object(o["j"])(this.getSeriesByType(e), t, n);
  }, t.prototype.isSeriesFiltered = function (e) {
    return p(this), null == this._seriesIndicesMap.get(e.componentIndex);
  }, t.prototype.getCurrentSeriesIndices = function () {
    return (this._seriesIndices || []).slice();
  }, t.prototype.filterSeries = function (e, t) {
    p(this);
    var n = [];
    Object(o["j"])(this._seriesIndices, function (r) {
      var i = this._componentsMap.get("series")[r];
      e.call(t, i, r) && n.push(r);
    }, this), this._seriesIndices = n, this._seriesIndicesMap = Object(o["f"])(n);
  }, t.prototype.restoreData = function (e) {
    h(this);
    var t = this._componentsMap,
      n = [];
    t.each(function (e, t) {
      f["a"].hasClass(t) && n.push(t);
    }), f["a"].topologicalTravel(n, f["a"].getAllClassMainTypes(), function (n) {
      Object(o["j"])(t.get(n), function (t) {
        !t || "series" === n && k(t, e) || t.restoreData();
      });
    });
  }, t.internalField = function () {
    h = function (e) {
      var t = e._seriesIndices = [];
      Object(o["j"])(e._componentsMap.get("series"), function (e) {
        e && t.push(e.componentIndex);
      }), e._seriesIndicesMap = Object(o["f"])(t);
    }, p = function (e) {
      0;
    }, g = function (e, t) {
      e.option = {}, e.option[w] = O, e._componentsMap = Object(o["f"])({
        series: []
      }), e._componentsCount = Object(o["f"])();
      var n = t.aria;
      Object(o["x"])(n) && null == n.enabled && (n.enabled = !0), j(t, e._theme.option), Object(o["E"])(t, v, !1), e._mergeOption(t, null);
    };
  }(), t;
}(c["a"]);
function k(e, t) {
  if (t) {
    var n = t.seriesIndex,
      r = t.seriesId,
      i = t.seriesName;
    return null != n && e.componentIndex !== n || null != r && e.id !== r || null != i && e.name !== i;
  }
}
function j(e, t) {
  var n = e.color && !e.colorLayer;
  Object(o["j"])(t, function (t, r) {
    "colorLayer" === r && n || f["a"].hasClass(r) || ("object" === typeof t ? e[r] = e[r] ? Object(o["E"])(e[r], t, !1) : Object(o["d"])(t) : null == e[r] && (e[r] = t));
  });
}
function M(e, t, n) {
  if (Object(o["r"])(t)) {
    var r = Object(o["f"])();
    return Object(o["j"])(t, function (e) {
      if (null != e) {
        var t = u["d"](e, null);
        null != t && r.set(e, !0);
      }
    }), Object(o["m"])(n, function (t) {
      return t && r.get(t[e]);
    });
  }
  var i = u["d"](t, null);
  return Object(o["m"])(n, function (t) {
    return t && null != i && t[e] === i;
  });
}
function C(e, t) {
  return t.hasOwnProperty("subType") ? Object(o["m"])(e, function (e) {
    return e && e.subType === t.subType;
  }) : e;
}
function T(e) {
  var t = Object(o["f"])();
  return e && Object(o["j"])(u["p"](e.replaceMerge), function (e) {
    t.set(e, !0);
  }), {
    replaceMergeMainTypeMap: t
  };
}
Object(o["F"])(S, x["a"]);
var I = S,
  D = ["getDom", "getZr", "getWidth", "getHeight", "getDevicePixelRatio", "dispatchAction", "isSSR", "isDisposed", "on", "off", "getDataURL", "getConnectedDataURL", "getOption", "getId", "updateLabelLayout"],
  A = function () {
    function e(e) {
      o["j"](D, function (t) {
        this[t] = o["c"](e[t], e);
      }, this);
    }
    return e;
  }(),
  E = A,
  P = require("./487a6e49.js"),
  L = /^(min|max)?(.+)$/,
  N = function () {
    function e(e) {
      this._timelineOptions = [], this._mediaList = [], this._currentMediaIndices = [], this._api = e;
    }
    return e.prototype.setOption = function (e, t, n) {
      e && (Object(o["j"])(Object(u["p"])(e.series), function (e) {
        e && e.data && Object(o["A"])(e.data) && Object(o["M"])(e.data);
      }), Object(o["j"])(Object(u["p"])(e.dataset), function (e) {
        e && e.source && Object(o["A"])(e.source) && Object(o["M"])(e.source);
      })), e = Object(o["d"])(e);
      var r = this._optionBackup,
        i = R(e, t, !r);
      this._newBaseOption = i.baseOption, r ? (i.timelineOptions.length && (r.timelineOptions = i.timelineOptions), i.mediaList.length && (r.mediaList = i.mediaList), i.mediaDefault && (r.mediaDefault = i.mediaDefault)) : this._optionBackup = i;
    }, e.prototype.mountOption = function (e) {
      var t = this._optionBackup;
      return this._timelineOptions = t.timelineOptions, this._mediaList = t.mediaList, this._mediaDefault = t.mediaDefault, this._currentMediaIndices = [], Object(o["d"])(e ? t.baseOption : this._newBaseOption);
    }, e.prototype.getTimelineOption = function (e) {
      var t,
        n = this._timelineOptions;
      if (n.length) {
        var r = e.getComponent("timeline");
        r && (t = Object(o["d"])(n[r.getCurrentIndex()]));
      }
      return t;
    }, e.prototype.getMediaOption = function (e) {
      var t = this._api.getWidth(),
        n = this._api.getHeight(),
        r = this._mediaList,
        i = this._mediaDefault,
        a = [],
        s = [];
      if (!r.length && !i) return s;
      for (var l = 0, u = r.length; l < u; l++) z(r[l].query, t, n) && a.push(l);
      return !a.length && i && (a = [-1]), a.length && !B(a, this._currentMediaIndices) && (s = Object(o["D"])(a, function (e) {
        return Object(o["d"])(-1 === e ? i.option : r[e].option);
      })), this._currentMediaIndices = a, s;
    }, e;
  }();
function R(e, t, n) {
  var r,
    i,
    a = [],
    s = e.baseOption,
    l = e.timeline,
    u = e.options,
    c = e.media,
    f = !!e.media,
    d = !!(u || l || s && s.timeline);
  function h(e) {
    Object(o["j"])(t, function (t) {
      t(e, n);
    });
  }
  return s ? (i = s, i.timeline || (i.timeline = l)) : ((d || f) && (e.options = e.media = null), i = e), f && Object(o["r"])(c) && Object(o["j"])(c, function (e) {
    e && e.option && (e.query ? a.push(e) : r || (r = e));
  }), h(i), Object(o["j"])(u, function (e) {
    return h(e);
  }), Object(o["j"])(a, function (e) {
    return h(e.option);
  }), {
    baseOption: i,
    timelineOptions: u || [],
    mediaDefault: r,
    mediaList: a
  };
}
function z(e, t, n) {
  var r = {
      width: t,
      height: n,
      aspectratio: t / n
    },
    i = !0;
  return Object(o["j"])(e, function (e, t) {
    var n = t.match(L);
    if (n && n[1] && n[2]) {
      var o = n[1],
        a = n[2].toLowerCase();
      F(r[a], e, o) || (i = !1);
    }
  }), i;
}
function F(e, t, n) {
  return "min" === n ? e >= t : "max" === n ? e <= t : e === t;
}
function B(e, t) {
  return e.join(",") === t.join(",");
}
var Y = N,
  V = o["j"],
  G = o["x"],
  W = ["areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine"];
function U(e) {
  var t = e && e.itemStyle;
  if (t) for (var n = 0, r = W.length; n < r; n++) {
    var i = W[n],
      a = t.normal,
      s = t.emphasis;
    a && a[i] && (e[i] = e[i] || {}, e[i].normal ? o["E"](e[i].normal, a[i]) : e[i].normal = a[i], a[i] = null), s && s[i] && (e[i] = e[i] || {}, e[i].emphasis ? o["E"](e[i].emphasis, s[i]) : e[i].emphasis = s[i], s[i] = null);
  }
}
function H(e, t, n) {
  if (e && e[t] && (e[t].normal || e[t].emphasis)) {
    var r = e[t].normal,
      i = e[t].emphasis;
    r && (n ? (e[t].normal = e[t].emphasis = null, o["i"](e[t], r)) : e[t] = r), i && (e.emphasis = e.emphasis || {}, e.emphasis[t] = i, i.focus && (e.emphasis.focus = i.focus), i.blurScope && (e.emphasis.blurScope = i.blurScope));
  }
}
function q(e) {
  H(e, "itemStyle"), H(e, "lineStyle"), H(e, "areaStyle"), H(e, "label"), H(e, "labelLine"), H(e, "upperLabel"), H(e, "edgeLabel");
}
function K(e, t) {
  var n = G(e) && e[t],
    r = G(n) && n.textStyle;
  if (r) {
    0;
    for (var i = 0, o = u["c"].length; i < o; i++) {
      var a = u["c"][i];
      r.hasOwnProperty(a) && (n[a] = r[a]);
    }
  }
}
function Z(e) {
  e && (q(e), K(e, "label"), e.emphasis && K(e.emphasis, "label"));
}
function X(e) {
  if (G(e)) {
    U(e), q(e), K(e, "label"), K(e, "upperLabel"), K(e, "edgeLabel"), e.emphasis && (K(e.emphasis, "label"), K(e.emphasis, "upperLabel"), K(e.emphasis, "edgeLabel"));
    var t = e.markPoint;
    t && (U(t), Z(t));
    var n = e.markLine;
    n && (U(n), Z(n));
    var r = e.markArea;
    r && Z(r);
    var i = e.data;
    if ("graph" === e.type) {
      i = i || e.nodes;
      var a = e.links || e.edges;
      if (a && !o["A"](a)) for (var s = 0; s < a.length; s++) Z(a[s]);
      o["j"](e.categories, function (e) {
        q(e);
      });
    }
    if (i && !o["A"](i)) for (s = 0; s < i.length; s++) Z(i[s]);
    if (t = e.markPoint, t && t.data) {
      var l = t.data;
      for (s = 0; s < l.length; s++) Z(l[s]);
    }
    if (n = e.markLine, n && n.data) {
      var u = n.data;
      for (s = 0; s < u.length; s++) o["r"](u[s]) ? (Z(u[s][0]), Z(u[s][1])) : Z(u[s]);
    }
    "gauge" === e.type ? (K(e, "axisLabel"), K(e, "title"), K(e, "detail")) : "treemap" === e.type ? (H(e.breadcrumb, "itemStyle"), o["j"](e.levels, function (e) {
      q(e);
    })) : "tree" === e.type && q(e.leaves);
  }
}
function Q(e) {
  return o["r"](e) ? e : e ? [e] : [];
}
function $(e) {
  return (o["r"](e) ? e[0] : e) || {};
}
function J(e, t) {
  V(Q(e.series), function (e) {
    G(e) && X(e);
  });
  var n = ["xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "parallelAxis", "radar"];
  t && n.push("valueAxis", "categoryAxis", "logAxis", "timeAxis"), V(n, function (t) {
    V(Q(e[t]), function (e) {
      e && (K(e, "axisLabel"), K(e.axisPointer, "label"));
    });
  }), V(Q(e.parallel), function (e) {
    var t = e && e.parallelAxisDefault;
    K(t, "axisLabel"), K(t && t.axisPointer, "label");
  }), V(Q(e.calendar), function (e) {
    H(e, "itemStyle"), K(e, "dayLabel"), K(e, "monthLabel"), K(e, "yearLabel");
  }), V(Q(e.radar), function (e) {
    K(e, "name"), e.name && null == e.axisName && (e.axisName = e.name, delete e.name), null != e.nameGap && null == e.axisNameGap && (e.axisNameGap = e.nameGap, delete e.nameGap);
  }), V(Q(e.geo), function (e) {
    G(e) && (Z(e), V(Q(e.regions), function (e) {
      Z(e);
    }));
  }), V(Q(e.timeline), function (e) {
    Z(e), H(e, "label"), H(e, "itemStyle"), H(e, "controlStyle", !0);
    var t = e.data;
    o["r"](t) && o["j"](t, function (e) {
      o["x"](e) && (H(e, "label"), H(e, "itemStyle"));
    });
  }), V(Q(e.toolbox), function (e) {
    H(e, "iconStyle"), V(e.feature, function (e) {
      H(e, "iconStyle");
    });
  }), K($(e.axisPointer), "label"), K($(e.tooltip).axisPointer, "label");
}
function ee(e, t) {
  for (var n = t.split(","), r = e, i = 0; i < n.length; i++) if (r = r && r[n[i]], null == r) break;
  return r;
}
function te(e, t, n, r) {
  for (var i, o = t.split(","), a = e, s = 0; s < o.length - 1; s++) i = o[s], null == a[i] && (a[i] = {}), a = a[i];
  (r || null == a[o[s]]) && (a[o[s]] = n);
}
function ne(e) {
  e && Object(o["j"])(re, function (t) {
    t[0] in e && !(t[1] in e) && (e[t[1]] = e[t[0]]);
  });
}
var re = [["x", "left"], ["y", "top"], ["x2", "right"], ["y2", "bottom"]],
  ie = ["grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline"],
  oe = [["borderRadius", "barBorderRadius"], ["borderColor", "barBorderColor"], ["borderWidth", "barBorderWidth"]];
function ae(e) {
  var t = e && e.itemStyle;
  if (t) for (var n = 0; n < oe.length; n++) {
    var r = oe[n][1],
      i = oe[n][0];
    null != t[r] && (t[i] = t[r]);
  }
}
function se(e) {
  e && "edge" === e.alignTo && null != e.margin && null == e.edgeDistance && (e.edgeDistance = e.margin);
}
function le(e) {
  e && e.downplay && !e.blur && (e.blur = e.downplay);
}
function ue(e) {
  e && null != e.focusNodeAdjacency && (e.emphasis = e.emphasis || {}, null == e.emphasis.focus && (e.emphasis.focus = "adjacency"));
}
function ce(e, t) {
  if (e) for (var n = 0; n < e.length; n++) t(e[n]), e[n] && ce(e[n].children, t);
}
function fe(e, t) {
  J(e, t), e.series = Object(u["p"])(e.series), Object(o["j"])(e.series, function (e) {
    if (Object(o["x"])(e)) {
      var t = e.type;
      if ("line" === t) null != e.clipOverflow && (e.clip = e.clipOverflow);else if ("pie" === t || "gauge" === t) {
        null != e.clockWise && (e.clockwise = e.clockWise), se(e.label);
        var n = e.data;
        if (n && !Object(o["A"])(n)) for (var r = 0; r < n.length; r++) se(n[r]);
        null != e.hoverOffset && (e.emphasis = e.emphasis || {}, (e.emphasis.scaleSize = null) && (e.emphasis.scaleSize = e.hoverOffset));
      } else if ("gauge" === t) {
        var i = ee(e, "pointer.color");
        null != i && te(e, "itemStyle.color", i);
      } else if ("bar" === t) {
        ae(e), ae(e.backgroundStyle), ae(e.emphasis);
        n = e.data;
        if (n && !Object(o["A"])(n)) for (r = 0; r < n.length; r++) "object" === typeof n[r] && (ae(n[r]), ae(n[r] && n[r].emphasis));
      } else if ("sunburst" === t) {
        var a = e.highlightPolicy;
        a && (e.emphasis = e.emphasis || {}, e.emphasis.focus || (e.emphasis.focus = a)), le(e), ce(e.data, le);
      } else "graph" === t || "sankey" === t ? ue(e) : "map" === t && (e.mapType && !e.map && (e.map = e.mapType), e.mapLocation && Object(o["i"])(e, e.mapLocation));
      null != e.hoverAnimation && (e.emphasis = e.emphasis || {}, e.emphasis && null == e.emphasis.scale && (e.emphasis.scale = e.hoverAnimation)), ne(e);
    }
  }), e.dataRange && (e.visualMap = e.dataRange), Object(o["j"])(ie, function (t) {
    var n = e[t];
    n && (Object(o["r"])(n) || (n = [n]), Object(o["j"])(n, function (e) {
      ne(e);
    }));
  });
}
var de = require("./4f454c42.js");
function he(e) {
  var t = Object(o["f"])();
  e.eachSeries(function (e) {
    var n = e.get("stack");
    if (n) {
      var r = t.get(n) || t.set(n, []),
        i = e.getData(),
        o = {
          stackResultDimension: i.getCalculationInfo("stackResultDimension"),
          stackedOverDimension: i.getCalculationInfo("stackedOverDimension"),
          stackedDimension: i.getCalculationInfo("stackedDimension"),
          stackedByDimension: i.getCalculationInfo("stackedByDimension"),
          isStackedByIndex: i.getCalculationInfo("isStackedByIndex"),
          data: i,
          seriesModel: e
        };
      if (!o.stackedDimension || !o.isStackedByIndex && !o.stackedByDimension) return;
      r.length && i.setCalculationInfo("stackedOnSeries", r[r.length - 1].seriesModel), r.push(o);
    }
  }), t.each(pe);
}
function pe(e) {
  Object(o["j"])(e, function (t, n) {
    var r = [],
      i = [NaN, NaN],
      o = [t.stackResultDimension, t.stackedOverDimension],
      a = t.data,
      s = t.isStackedByIndex,
      l = t.seriesModel.get("stackStrategy") || "samesign";
    a.modify(o, function (o, u, c) {
      var f,
        d,
        h = a.get(t.stackedDimension, c);
      if (isNaN(h)) return i;
      s ? d = a.getRawIndex(c) : f = a.get(t.stackedByDimension, c);
      for (var p = NaN, g = n - 1; g >= 0; g--) {
        var m = e[g];
        if (s || (d = m.data.rawIndexOf(m.stackedByDimension, f)), d >= 0) {
          var v = m.data.getByRawIndex(m.stackResultDimension, d);
          if ("all" === l || "positive" === l && v > 0 || "negative" === l && v < 0 || "samesign" === l && h >= 0 && v > 0 || "samesign" === l && h <= 0 && v < 0) {
            h = Object(de["a"])(h, v), p = v;
            break;
          }
        }
      }
      return r[0] = h, r[1] = p, r;
    });
  });
}
var ge = require("./54345547.js"),
  me = require("./73532f72.js"),
  ve = require("./36496336.js"),
  ye = require("./78364b74.js"),
  be = require("./44616767.js"),
  xe = require("./33736f46.js"),
  _e = require("./792b5674.js"),
  we = require("./6868784b.js"),
  Oe = require("./66577761.js"),
  Se = require("./694c4e76.js"),
  ke = require("./4b43735a.js"),
  je = require("./5652396c.js"),
  Me = require("./4f514673.js"),
  Ce = Object(u["m"])(),
  Te = {
    itemStyle: Object(ke["a"])(je["a"], !0),
    lineStyle: Object(ke["a"])(Me["a"], !0)
  },
  Ie = {
    lineStyle: "stroke",
    itemStyle: "fill"
  };
function De(e, t) {
  var n = e.visualStyleMapper || Te[t];
  return n || (console.warn("Unkown style type '" + t + "'."), Te.itemStyle);
}
function Ae(e, t) {
  var n = e.visualDrawType || Ie[t];
  return n || (console.warn("Unkown style type '" + t + "'."), "fill");
}
var Ee = {
    createOnAllSeries: !0,
    performRawSeries: !0,
    reset: function (e, t) {
      var n = e.getData(),
        r = e.visualStyleAccessPath || "itemStyle",
        i = e.getModel(r),
        a = De(e, r),
        s = a(i),
        l = i.getShallow("decal");
      l && (n.setVisual("decal", l), l.dirty = !0);
      var u = Ae(e, r),
        c = s[u],
        f = Object(o["u"])(c) ? c : null,
        d = "auto" === s.fill || "auto" === s.stroke;
      if (!s[u] || f || d) {
        var h = e.getColorFromPalette(e.name, null, t.getSeriesCount());
        s[u] || (s[u] = h, n.setVisual("colorFromPalette", !0)), s.fill = "auto" === s.fill || Object(o["u"])(s.fill) ? h : s.fill, s.stroke = "auto" === s.stroke || Object(o["u"])(s.stroke) ? h : s.stroke;
      }
      if (n.setVisual("style", s), n.setVisual("drawType", u), !t.isSeriesFiltered(e) && f) return n.setVisual("colorFromPalette", !1), {
        dataEach: function (t, n) {
          var r = e.getDataParams(n),
            i = Object(o["l"])({}, s);
          i[u] = f(r), t.setItemVisual(n, "style", i);
        }
      };
    }
  },
  Pe = new c["a"](),
  Le = {
    createOnAllSeries: !0,
    performRawSeries: !0,
    reset: function (e, t) {
      if (!e.ignoreStyleOnData && !t.isSeriesFiltered(e)) {
        var n = e.getData(),
          r = e.visualStyleAccessPath || "itemStyle",
          i = De(e, r),
          a = n.getVisual("drawType");
        return {
          dataEach: n.hasItemOption ? function (e, t) {
            var n = e.getRawDataItem(t);
            if (n && n[r]) {
              Pe.option = n[r];
              var s = i(Pe),
                l = e.ensureUniqueItemVisual(t, "style");
              Object(o["l"])(l, s), Pe.option.decal && (e.setItemVisual(t, "decal", Pe.option.decal), Pe.option.decal.dirty = !0), a in s && e.setItemVisual(t, "colorFromPalette", !1);
            }
          } : null
        };
      }
    }
  },
  Ne = {
    performRawSeries: !0,
    overallReset: function (e) {
      var t = Object(o["f"])();
      e.eachSeries(function (e) {
        var n = e.getColorBy();
        if (!e.isColorBySeries()) {
          var r = e.type + "-" + n,
            i = t.get(r);
          i || (i = {}, t.set(r, i)), Ce(e).scope = i;
        }
      }), e.eachSeries(function (t) {
        if (!t.isColorBySeries() && !e.isSeriesFiltered(t)) {
          var n = t.getRawData(),
            r = {},
            i = t.getData(),
            o = Ce(t).scope,
            a = t.visualStyleAccessPath || "itemStyle",
            s = Ae(t, a);
          i.each(function (e) {
            var t = i.getRawIndex(e);
            r[t] = e;
          }), n.each(function (e) {
            var a = r[e],
              l = i.getItemVisual(a, "colorFromPalette");
            if (l) {
              var u = i.ensureUniqueItemVisual(a, "style"),
                c = n.getName(e) || e + "",
                f = n.count();
              u[s] = t.getColorFromPalette(c, o, f);
            }
          });
        }
      });
    }
  },
  Re = require("./4c63584c.js"),
  ze = require("./64715547.js"),
  Fe = require("./6a544c36.js"),
  Be = Math.PI;
function Ye(e, t) {
  t = t || {}, o["i"](t, {
    text: "loading",
    textColor: "#000",
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    fontFamily: "sans-serif",
    maskColor: "rgba(255, 255, 255, 0.8)",
    showSpinner: !0,
    color: "#5470c6",
    spinnerRadius: 10,
    lineWidth: 5,
    zlevel: 0
  });
  var n = new Re["a"](),
    r = new ye["a"]({
      style: {
        fill: t.maskColor
      },
      zlevel: t.zlevel,
      z: 1e4
    });
  n.add(r);
  var i,
    a = new ze["a"]({
      style: {
        text: t.text,
        fill: t.textColor,
        fontSize: t.fontSize,
        fontWeight: t.fontWeight,
        fontStyle: t.fontStyle,
        fontFamily: t.fontFamily
      },
      zlevel: t.zlevel,
      z: 10001
    }),
    s = new ye["a"]({
      style: {
        fill: "none"
      },
      textContent: a,
      textConfig: {
        position: "right",
        distance: 10
      },
      zlevel: t.zlevel,
      z: 10001
    });
  return n.add(s), t.showSpinner && (i = new Fe["a"]({
    shape: {
      startAngle: -Be / 2,
      endAngle: -Be / 2 + .1,
      r: t.spinnerRadius
    },
    style: {
      stroke: t.color,
      lineCap: "round",
      lineWidth: t.lineWidth
    },
    zlevel: t.zlevel,
    z: 10001
  }), i.animateShape(!0).when(1e3, {
    endAngle: 3 * Be / 2
  }).start("circularInOut"), i.animateShape(!0).when(1e3, {
    startAngle: 3 * Be / 2
  }).delay(300).start("circularInOut"), n.add(i)), n.resize = function () {
    var n = a.getBoundingRect().width,
      o = t.showSpinner ? t.spinnerRadius : 0,
      l = (e.getWidth() - 2 * o - (t.showSpinner && n ? 10 : 0) - n) / 2 - (t.showSpinner && n ? 0 : 5 + n / 2) + (t.showSpinner ? 0 : n / 2) + (n ? 0 : o),
      u = e.getHeight() / 2;
    t.showSpinner && i.setShape({
      cx: l,
      cy: u
    }), s.setShape({
      x: l - o,
      y: u - o,
      width: 2 * o,
      height: 2 * o
    }), r.setShape({
      x: 0,
      y: 0,
      width: e.getWidth(),
      height: e.getHeight()
    });
  }, n.resize(), n;
}
var Ve = require("./6e37796e.js"),
  Ge = require("./69526a57.js"),
  We = function () {
    function e(e, t, n, r) {
      this._stageTaskMap = Object(o["f"])(), this.ecInstance = e, this.api = t, n = this._dataProcessorHandlers = n.slice(), r = this._visualHandlers = r.slice(), this._allHandlers = n.concat(r);
    }
    return e.prototype.restoreData = function (e, t) {
      e.restoreData(t), this._stageTaskMap.each(function (e) {
        var t = e.overallTask;
        t && t.dirty();
      });
    }, e.prototype.getPerformArgs = function (e, t) {
      if (e.__pipeline) {
        var n = this._pipelineMap.get(e.__pipeline.id),
          r = n.context,
          i = !t && n.progressiveEnabled && (!r || r.progressiveRender) && e.__idxInPipeline > n.blockIndex,
          o = i ? n.step : null,
          a = r && r.modDataCount,
          s = null != a ? Math.ceil(a / o) : null;
        return {
          step: o,
          modBy: s,
          modDataCount: a
        };
      }
    }, e.prototype.getPipeline = function (e) {
      return this._pipelineMap.get(e);
    }, e.prototype.updateStreamModes = function (e, t) {
      var n = this._pipelineMap.get(e.uid),
        r = e.getData(),
        i = r.count(),
        o = n.progressiveEnabled && t.incrementalPrepareRender && i >= n.threshold,
        a = e.get("large") && i >= e.get("largeThreshold"),
        s = "mod" === e.get("progressiveChunkMode") ? i : null;
      e.pipelineContext = n.context = {
        progressiveRender: o,
        modDataCount: s,
        large: a
      };
    }, e.prototype.restorePipelines = function (e) {
      var t = this,
        n = t._pipelineMap = Object(o["f"])();
      e.eachSeries(function (e) {
        var r = e.getProgressive(),
          i = e.uid;
        n.set(i, {
          id: i,
          head: null,
          tail: null,
          threshold: e.getProgressiveThreshold(),
          progressiveEnabled: r && !(e.preventIncremental && e.preventIncremental()),
          blockIndex: -1,
          step: Math.round(r || 700),
          count: 0
        }), t._pipe(e, e.dataTask);
      });
    }, e.prototype.prepareStageTasks = function () {
      var e = this._stageTaskMap,
        t = this.api.getModel(),
        n = this.api;
      Object(o["j"])(this._allHandlers, function (r) {
        var i = e.get(r.uid) || e.set(r.uid, {}),
          a = "";
        Object(o["b"])(!(r.reset && r.overallReset), a), r.reset && this._createSeriesStageTask(r, i, t, n), r.overallReset && this._createOverallStageTask(r, i, t, n);
      }, this);
    }, e.prototype.prepareView = function (e, t, n, r) {
      var i = e.renderTask,
        o = i.context;
      o.model = t, o.ecModel = n, o.api = r, i.__block = !e.incrementalPrepareRender, this._pipe(t, i);
    }, e.prototype.performDataProcessorTasks = function (e, t) {
      this._performStageTasks(this._dataProcessorHandlers, e, t, {
        block: !0
      });
    }, e.prototype.performVisualTasks = function (e, t, n) {
      this._performStageTasks(this._visualHandlers, e, t, n);
    }, e.prototype._performStageTasks = function (e, t, n, r) {
      r = r || {};
      var i = !1,
        a = this;
      function s(e, t) {
        return e.setDirty && (!e.dirtyMap || e.dirtyMap.get(t.__pipeline.id));
      }
      Object(o["j"])(e, function (e, o) {
        if (!r.visualType || r.visualType === e.visualType) {
          var l = a._stageTaskMap.get(e.uid),
            u = l.seriesTaskMap,
            c = l.overallTask;
          if (c) {
            var f,
              d = c.agentStubMap;
            d.each(function (e) {
              s(r, e) && (e.dirty(), f = !0);
            }), f && c.dirty(), a.updatePayload(c, n);
            var h = a.getPerformArgs(c, r.block);
            d.each(function (e) {
              e.perform(h);
            }), c.perform(h) && (i = !0);
          } else u && u.each(function (o, l) {
            s(r, o) && o.dirty();
            var u = a.getPerformArgs(o, r.block);
            u.skip = !e.performRawSeries && t.isSeriesFiltered(o.context.model), a.updatePayload(o, n), o.perform(u) && (i = !0);
          });
        }
      }), this.unfinished = i || this.unfinished;
    }, e.prototype.performSeriesTasks = function (e) {
      var t;
      e.eachSeries(function (e) {
        t = e.dataTask.perform() || t;
      }), this.unfinished = t || this.unfinished;
    }, e.prototype.plan = function () {
      this._pipelineMap.each(function (e) {
        var t = e.tail;
        do {
          if (t.__block) {
            e.blockIndex = t.__idxInPipeline;
            break;
          }
          t = t.getUpstream();
        } while (t);
      });
    }, e.prototype.updatePayload = function (e, t) {
      "remain" !== t && (e.context.payload = t);
    }, e.prototype._createSeriesStageTask = function (e, t, n, r) {
      var i = this,
        a = t.seriesTaskMap,
        s = t.seriesTaskMap = Object(o["f"])(),
        l = e.seriesType,
        u = e.getTargetSeries;
      function c(t) {
        var o = t.uid,
          l = s.set(o, a && a.get(o) || Object(Ve["a"])({
            plan: Ze,
            reset: Xe,
            count: Je
          }));
        l.context = {
          model: t,
          ecModel: n,
          api: r,
          useClearVisual: e.isVisual && !e.isLayout,
          plan: e.plan,
          reset: e.reset,
          scheduler: i
        }, i._pipe(t, l);
      }
      e.createOnAllSeries ? n.eachRawSeries(c) : l ? n.eachRawSeriesByType(l, c) : u && u(n, r).each(c);
    }, e.prototype._createOverallStageTask = function (e, t, n, r) {
      var i = this,
        a = t.overallTask = t.overallTask || Object(Ve["a"])({
          reset: Ue
        });
      a.context = {
        ecModel: n,
        api: r,
        overallReset: e.overallReset,
        scheduler: i
      };
      var s = a.agentStubMap,
        l = a.agentStubMap = Object(o["f"])(),
        u = e.seriesType,
        c = e.getTargetSeries,
        f = !0,
        d = !1,
        h = "";
      function p(e) {
        var t = e.uid,
          n = l.set(t, s && s.get(t) || (d = !0, Object(Ve["a"])({
            reset: He,
            onDirty: Ke
          })));
        n.context = {
          model: e,
          overallProgress: f
        }, n.agent = a, n.__block = f, i._pipe(e, n);
      }
      Object(o["b"])(!e.createOnAllSeries, h), u ? n.eachRawSeriesByType(u, p) : c ? c(n, r).each(p) : (f = !1, Object(o["j"])(n.getSeries(), p)), d && a.dirty();
    }, e.prototype._pipe = function (e, t) {
      var n = e.uid,
        r = this._pipelineMap.get(n);
      !r.head && (r.head = t), r.tail && r.tail.pipe(t), r.tail = t, t.__idxInPipeline = r.count++, t.__pipeline = r;
    }, e.wrapStageHandler = function (e, t) {
      return Object(o["u"])(e) && (e = {
        overallReset: e,
        seriesType: et(e)
      }), e.uid = Object(Ge["c"])("stageHandler"), t && (e.visualType = t), e;
    }, e;
  }();
function Ue(e) {
  e.overallReset(e.ecModel, e.api, e.payload);
}
function He(e) {
  return e.overallProgress && qe;
}
function qe() {
  this.agent.dirty(), this.getDownstream().dirty();
}
function Ke() {
  this.agent && this.agent.dirty();
}
function Ze(e) {
  return e.plan ? e.plan(e.model, e.ecModel, e.api, e.payload) : null;
}
function Xe(e) {
  e.useClearVisual && e.data.clearAllVisual();
  var t = e.resetDefines = Object(u["p"])(e.reset(e.model, e.ecModel, e.api, e.payload));
  return t.length > 1 ? Object(o["D"])(t, function (e, t) {
    return $e(t);
  }) : Qe;
}
var Qe = $e(0);
function $e(e) {
  return function (t, n) {
    var r = n.data,
      i = n.resetDefines[e];
    if (i && i.dataEach) for (var o = t.start; o < t.end; o++) i.dataEach(r, o);else i && i.progress && i.progress(t, r);
  };
}
function Je(e) {
  return e.data.count();
}
function et(e) {
  tt = null;
  try {
    e(nt, rt);
  } catch (e) {}
  return tt;
}
var tt,
  nt = {},
  rt = {};
function it(e, t) {
  for (var n in t.prototype) e[n] = o["G"];
}
it(nt, I), it(rt, E), nt.eachSeriesByType = nt.eachRawSeriesByType = function (e) {
  tt = e;
}, nt.eachComponent = function (e) {
  "series" === e.mainType && e.subType && (tt = e.subType);
};
var ot = We,
  at = ["#37A2DA", "#32C5E9", "#67E0E3", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#E062AE", "#E690D1", "#e7bcf3", "#9d96f5", "#8378EA", "#96BFFF"],
  st = {
    color: at,
    colorLayer: [["#37A2DA", "#ffd85c", "#fd7b5f"], ["#37A2DA", "#67E0E3", "#FFDB5C", "#ff9f7f", "#E062AE", "#9d96f5"], ["#37A2DA", "#32C5E9", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#e7bcf3", "#8378EA", "#96BFFF"], at]
  },
  lt = "#B9B8CE",
  ut = "#100C2A",
  ct = function () {
    return {
      axisLine: {
        lineStyle: {
          color: lt
        }
      },
      splitLine: {
        lineStyle: {
          color: "#484753"
        }
      },
      splitArea: {
        areaStyle: {
          color: ["rgba(255,255,255,0.02)", "rgba(255,255,255,0.05)"]
        }
      },
      minorSplitLine: {
        lineStyle: {
          color: "#20203B"
        }
      }
    };
  },
  ft = ["#4992ff", "#7cffb2", "#fddd60", "#ff6e76", "#58d9f9", "#05c091", "#ff8a45", "#8d48e3", "#dd79ff"],
  dt = {
    darkMode: !0,
    color: ft,
    backgroundColor: ut,
    axisPointer: {
      lineStyle: {
        color: "#817f91"
      },
      crossStyle: {
        color: "#817f91"
      },
      label: {
        color: "#fff"
      }
    },
    legend: {
      textStyle: {
        color: lt
      }
    },
    textStyle: {
      color: lt
    },
    title: {
      textStyle: {
        color: "#EEF1FA"
      },
      subtextStyle: {
        color: "#B9B8CE"
      }
    },
    toolbox: {
      iconStyle: {
        borderColor: lt
      }
    },
    dataZoom: {
      borderColor: "#71708A",
      textStyle: {
        color: lt
      },
      brushStyle: {
        color: "rgba(135,163,206,0.3)"
      },
      handleStyle: {
        color: "#353450",
        borderColor: "#C5CBE3"
      },
      moveHandleStyle: {
        color: "#B0B6C3",
        opacity: .3
      },
      fillerColor: "rgba(135,163,206,0.2)",
      emphasis: {
        handleStyle: {
          borderColor: "#91B7F2",
          color: "#4D587D"
        },
        moveHandleStyle: {
          color: "#636D9A",
          opacity: .7
        }
      },
      dataBackground: {
        lineStyle: {
          color: "#71708A",
          width: 1
        },
        areaStyle: {
          color: "#71708A"
        }
      },
      selectedDataBackground: {
        lineStyle: {
          color: "#87A3CE"
        },
        areaStyle: {
          color: "#87A3CE"
        }
      }
    },
    visualMap: {
      textStyle: {
        color: lt
      }
    },
    timeline: {
      lineStyle: {
        color: lt
      },
      label: {
        color: lt
      },
      controlStyle: {
        color: lt,
        borderColor: lt
      }
    },
    calendar: {
      itemStyle: {
        color: ut
      },
      dayLabel: {
        color: lt
      },
      monthLabel: {
        color: lt
      },
      yearLabel: {
        color: lt
      }
    },
    timeAxis: ct(),
    logAxis: ct(),
    valueAxis: ct(),
    categoryAxis: ct(),
    line: {
      symbol: "circle"
    },
    graph: {
      color: ft
    },
    gauge: {
      title: {
        color: lt
      },
      axisLine: {
        lineStyle: {
          color: [[1, "rgba(207,212,219,0.2)"]]
        }
      },
      axisLabel: {
        color: lt
      },
      detail: {
        color: "#EEF1FA"
      }
    },
    candlestick: {
      itemStyle: {
        color: "#f64e56",
        color0: "#54ea92",
        borderColor: "#f64e56",
        borderColor0: "#54ea92"
      }
    }
  };
dt.categoryAxis.splitLine.show = !1;
var ht = dt,
  pt = require("./596c3763.js"),
  gt = function () {
    function e() {}
    return e.prototype.normalizeQuery = function (e) {
      var t = {},
        n = {},
        r = {};
      if (o["y"](e)) {
        var i = Object(pt["f"])(e);
        t.mainType = i.main || null, t.subType = i.sub || null;
      } else {
        var a = ["Index", "Name", "Id"],
          s = {
            name: 1,
            dataIndex: 1,
            dataType: 1
          };
        o["j"](e, function (e, i) {
          for (var o = !1, l = 0; l < a.length; l++) {
            var u = a[l],
              c = i.lastIndexOf(u);
            if (c > 0 && c === i.length - u.length) {
              var f = i.slice(0, c);
              "data" !== f && (t.mainType = f, t[u.toLowerCase()] = e, o = !0);
            }
          }
          s.hasOwnProperty(i) && (n[i] = e, o = !0), o || (r[i] = e);
        });
      }
      return {
        cptQuery: t,
        dataQuery: n,
        otherQuery: r
      };
    }, e.prototype.filter = function (e, t) {
      var n = this.eventInfo;
      if (!n) return !0;
      var r = n.targetEl,
        i = n.packedEvent,
        o = n.model,
        a = n.view;
      if (!o || !a) return !0;
      var s = t.cptQuery,
        l = t.dataQuery;
      return u(s, o, "mainType") && u(s, o, "subType") && u(s, o, "index", "componentIndex") && u(s, o, "name") && u(s, o, "id") && u(l, i, "name") && u(l, i, "dataIndex") && u(l, i, "dataType") && (!a.filterForExposedEvent || a.filterForExposedEvent(e, t.otherQuery, r, i));
      function u(e, t, n, r) {
        return null == e[n] || t[r || n] === e[n];
      }
    }, e.prototype.afterTrigger = function () {
      this.eventInfo = null;
    }, e;
  }(),
  mt = ["symbol", "symbolSize", "symbolRotate", "symbolOffset"],
  vt = mt.concat(["symbolKeepAspect"]),
  yt = {
    createOnAllSeries: !0,
    performRawSeries: !0,
    reset: function (e, t) {
      var n = e.getData();
      if (e.legendIcon && n.setVisual("legendIcon", e.legendIcon), e.hasSymbolVisual) {
        for (var r = {}, i = {}, a = !1, s = 0; s < mt.length; s++) {
          var l = mt[s],
            u = e.get(l);
          Object(o["u"])(u) ? (a = !0, i[l] = u) : r[l] = u;
        }
        if (r.symbol = r.symbol || e.defaultSymbol, n.setVisual(Object(o["l"])({
          legendIcon: e.legendIcon || r.symbol,
          symbolKeepAspect: e.get("symbolKeepAspect")
        }, r)), !t.isSeriesFiltered(e)) {
          var c = Object(o["B"])(i);
          return {
            dataEach: a ? f : null
          };
        }
      }
      function f(t, n) {
        for (var r = e.getRawValue(n), o = e.getDataParams(n), a = 0; a < c.length; a++) {
          var s = c[a];
          t.setItemVisual(n, s, i[s](r, o));
        }
      }
    }
  },
  bt = {
    createOnAllSeries: !0,
    performRawSeries: !0,
    reset: function (e, t) {
      if (e.hasSymbolVisual && !t.isSeriesFiltered(e)) {
        var n = e.getData();
        return {
          dataEach: n.hasItemOption ? r : null
        };
      }
      function r(e, t) {
        for (var n = e.getItemModel(t), r = 0; r < vt.length; r++) {
          var i = vt[r],
            o = n.getShallow(i, !0);
          null != o && e.setItemVisual(t, i, o);
        }
      }
    }
  };
function xt(e, t, n) {
  switch (n) {
    case "color":
      var r = e.getItemVisual(t, "style");
      return r[e.getVisual("drawType")];
    case "opacity":
      return e.getItemVisual(t, "style").opacity;
    case "symbol":
    case "symbolSize":
    case "liftZ":
      return e.getItemVisual(t, n);
    default:
      0;
  }
}
function _t(e, t) {
  switch (t) {
    case "color":
      var n = e.getVisual("style");
      return n[e.getVisual("drawType")];
    case "opacity":
      return e.getVisual("style").opacity;
    case "symbol":
    case "symbolSize":
    case "liftZ":
      return e.getVisual(t);
    default:
      0;
  }
}
function wt(e, t, n, r, i) {
  var a = e + t;
  n.isSilent(a) || r.eachComponent({
    mainType: "series",
    subType: "pie"
  }, function (e) {
    for (var t = e.seriesIndex, r = e.option.selectedMap, s = i.selected, l = 0; l < s.length; l++) if (s[l].seriesIndex === t) {
      var c = e.getData(),
        f = Object(u["s"])(c, i.fromActionPayload);
      n.trigger(a, {
        type: a,
        seriesId: e.id,
        name: Object(o["r"])(f) ? c.getName(f[0]) : c.getName(f),
        selected: Object(o["y"])(r) ? r : Object(o["l"])({}, r)
      });
    }
  });
}
function Ot(e, t, n) {
  e.on("selectchanged", function (e) {
    var r = n.getModel();
    e.isFromClick ? (wt("map", "selectchanged", t, r, e), wt("pie", "selectchanged", t, r, e)) : "select" === e.fromAction ? (wt("map", "selected", t, r, e), wt("pie", "selected", t, r, e)) : "unselect" === e.fromAction && (wt("map", "unselected", t, r, e), wt("pie", "unselected", t, r, e));
  });
}
var St = require("./4250642b.js"),
  kt = require("./37316b68.js"),
  jt = require("./2b743052.js"),
  Mt = require("./73384662.js");
function Ct(e, t) {
  e.eachRawSeries(function (n) {
    if (!e.isSeriesFiltered(n)) {
      var r = n.getData();
      r.hasItemVisual() && r.each(function (e) {
        var n = r.getItemVisual(e, "decal");
        if (n) {
          var i = r.ensureUniqueItemVisual(e, "style");
          i.decal = Object(Mt["a"])(n, t);
        }
      });
      var i = r.getVisual("decal");
      if (i) {
        var o = r.getVisual("style");
        o.decal = Object(Mt["a"])(i, t);
      }
    }
  });
}
var Tt = new l["a"](),
  It = Tt,
  Dt = require("./636d3672.js"),
  At = require("./574d6c4a.js");
defineExport(legacyExports, "a", function () {
  return Xt;
}), defineExport(legacyExports, "b", function () {
  return Wn;
}), defineExport(legacyExports, "j", function () {
  return qn;
}), defineExport(legacyExports, "k", function () {
  return Kn;
}), defineExport(legacyExports, "h", function () {
  return Zn;
}), defineExport(legacyExports, "i", function () {
  return Xn;
}), defineExport(legacyExports, "m", function () {
  return Qn;
}), defineExport(legacyExports, "c", function () {
  return $n;
}), defineExport(legacyExports, "d", function () {
  return Jn;
}), defineExport(legacyExports, "e", function () {
  return er;
}), defineExport(legacyExports, "n", function () {
  return tr;
}), defineExport(legacyExports, "f", function () {
  return ir;
}), defineExport(legacyExports, "g", function () {
  return or;
}), defineExport(legacyExports, "l", function () {
  return ar;
});
var Et = "undefined" !== typeof window,
  Pt = 1,
  Lt = 800,
  Nt = 900,
  Rt = 1e3,
  zt = 2e3,
  Ft = 5e3,
  Bt = 1e3,
  Yt = 1100,
  Vt = 2e3,
  Gt = 3e3,
  Wt = 4e3,
  Ut = 4500,
  Ht = 4600,
  qt = 5e3,
  Kt = 6e3,
  Zt = 7e3,
  Xt = {
    PROCESSOR: {
      FILTER: Rt,
      SERIES_FILTER: Lt,
      STATISTIC: Ft
    },
    VISUAL: {
      LAYOUT: Bt,
      PROGRESSIVE_LAYOUT: Yt,
      GLOBAL: Vt,
      CHART: Gt,
      POST_CHART_LAYOUT: Ht,
      COMPONENT: Wt,
      BRUSH: qt,
      CHART_ITEM: Ut,
      ARIA: Kt,
      DECAL: Zt
    }
  },
  Qt = "__flagInMainProcess",
  $t = "__pendingUpdate",
  Jt = "__needsUpdateStatus",
  en = /^[a-zA-Z0-9_]+$/,
  tn = "__connectUpdateStatus",
  nn = 0,
  rn = 1,
  on = 2;
function an(e) {
  return function () {
    for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
    if (!this.isDisposed()) return ln(this, e, t);
    An(this.id);
  };
}
function sn(e) {
  return function () {
    for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
    return ln(this, e, t);
  };
}
function ln(e, t, n) {
  return n[0] = n[0] && n[0].toLowerCase(), l["a"].prototype[t].apply(e, n);
}
var un,
  cn,
  fn,
  dn,
  hn,
  pn,
  gn,
  mn,
  vn,
  yn,
  bn,
  xn,
  _n,
  wn,
  On,
  Sn,
  kn,
  jn,
  Mn = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }
    return Object(r["a"])(t, e), t;
  }(l["a"]),
  Cn = Mn.prototype;
Cn.on = sn("on"), Cn.off = sn("off");
var Tn = function (e) {
    function t(t, n, r) {
      var a = e.call(this, new gt()) || this;
      a._chartsViews = [], a._chartsMap = {}, a._componentsViews = [], a._componentsMap = {}, a._pendingActions = [], r = r || {}, Object(o["y"])(n) && (n = zn[n]), a._dom = t;
      var l = "canvas",
        u = "auto",
        c = !1,
        f = a._zr = i["a"](t, {
          renderer: r.renderer || l,
          devicePixelRatio: r.devicePixelRatio,
          width: r.width,
          height: r.height,
          ssr: r.ssr,
          useDirtyRect: Object(o["K"])(r.useDirtyRect, c),
          useCoarsePointer: Object(o["K"])(r.useCoarsePointer, u),
          pointerSize: r.pointerSize
        });
      a._ssr = r.ssr, a._throttledZrFlush = Object(Se["c"])(Object(o["c"])(f.flush, f), 17), n = Object(o["d"])(n), n && fe(n, !0), a._theme = n, a._locale = Object(kt["b"])(r.locale || kt["a"]), a._coordSysMgr = new P["a"]();
      var d = a._api = On(a);
      function h(e, t) {
        return e.__prio - t.__prio;
      }
      return Object(s["a"])(Rn, h), Object(s["a"])(Ln, h), a._scheduler = new ot(a, d, Ln, Rn), a._messageCenter = new Mn(), a._initEvents(), a.resize = Object(o["c"])(a.resize, a), f.animation.on("frame", a._onframe, a), yn(f, a), bn(f, a), Object(o["M"])(a), a;
    }
    return Object(r["a"])(t, e), t.prototype._onframe = function () {
      if (!this._disposed) {
        jn(this);
        var e = this._scheduler;
        if (this[$t]) {
          var t = this[$t].silent;
          this[Qt] = !0;
          try {
            un(this), dn.update.call(this, null, this[$t].updateParams);
          } catch (e) {
            throw this[Qt] = !1, this[$t] = null, e;
          }
          this._zr.flush(), this[Qt] = !1, this[$t] = null, mn.call(this, t), vn.call(this, t);
        } else if (e.unfinished) {
          var n = Pt,
            r = this._model,
            i = this._api;
          e.unfinished = !1;
          do {
            var o = +new Date();
            e.performSeriesTasks(r), e.performDataProcessorTasks(r), pn(this, r), e.performVisualTasks(r), wn(this, this._model, i, "remain", {}), n -= +new Date() - o;
          } while (n > 0 && e.unfinished);
          e.unfinished || this._zr.flush();
        }
      }
    }, t.prototype.getDom = function () {
      return this._dom;
    }, t.prototype.getId = function () {
      return this.id;
    }, t.prototype.getZr = function () {
      return this._zr;
    }, t.prototype.isSSR = function () {
      return this._ssr;
    }, t.prototype.setOption = function (e, t, n) {
      if (!this[Qt]) if (this._disposed) An(this.id);else {
        var r, i, a;
        if (Object(o["x"])(t) && (n = t.lazyUpdate, r = t.silent, i = t.replaceMerge, a = t.transition, t = t.notMerge), this[Qt] = !0, !this._model || t) {
          var s = new Y(this._api),
            l = this._theme,
            u = this._model = new I();
          u.scheduler = this._scheduler, u.ssr = this._ssr, u.init(null, null, null, l, this._locale, s);
        }
        this._model.setOption(e, {
          replaceMerge: i
        }, Nn);
        var c = {
          seriesTransition: a,
          optionChanged: !0
        };
        if (n) this[$t] = {
          silent: r,
          updateParams: c
        }, this[Qt] = !1, this.getZr().wakeUp();else {
          try {
            un(this), dn.update.call(this, null, c);
          } catch (e) {
            throw this[$t] = null, this[Qt] = !1, e;
          }
          this._ssr || this._zr.flush(), this[$t] = null, this[Qt] = !1, mn.call(this, r), vn.call(this, r);
        }
      }
    }, t.prototype.setTheme = function () {
      Object(_["a"])("ECharts#setTheme() is DEPRECATED in ECharts 3.0");
    }, t.prototype.getModel = function () {
      return this._model;
    }, t.prototype.getOption = function () {
      return this._model && this._model.getOption();
    }, t.prototype.getWidth = function () {
      return this._zr.getWidth();
    }, t.prototype.getHeight = function () {
      return this._zr.getHeight();
    }, t.prototype.getDevicePixelRatio = function () {
      return this._zr.painter.dpr || Et && window.devicePixelRatio || 1;
    }, t.prototype.getRenderedCanvas = function (e) {
      return this.renderToCanvas(e);
    }, t.prototype.renderToCanvas = function (e) {
      e = e || {};
      var t = this._zr.painter;
      return t.getRenderedCanvas({
        backgroundColor: e.backgroundColor || this._model.get("backgroundColor"),
        pixelRatio: e.pixelRatio || this.getDevicePixelRatio()
      });
    }, t.prototype.renderToSVGString = function (e) {
      e = e || {};
      var t = this._zr.painter;
      return t.renderToString({
        useViewBox: e.useViewBox
      });
    }, t.prototype.getSvgDataURL = function () {
      if (a["a"].svgSupported) {
        var e = this._zr,
          t = e.storage.getDisplayList();
        return Object(o["j"])(t, function (e) {
          e.stopAnimation(null, !0);
        }), e.painter.toDataURL();
      }
    }, t.prototype.getDataURL = function (e) {
      if (!this._disposed) {
        e = e || {};
        var t = e.excludeComponents,
          n = this._model,
          r = [],
          i = this;
        Object(o["j"])(t, function (e) {
          n.eachComponent({
            mainType: e
          }, function (e) {
            var t = i._componentsMap[e.__viewId];
            t.group.ignore || (r.push(t), t.group.ignore = !0);
          });
        });
        var a = "svg" === this._zr.painter.getType() ? this.getSvgDataURL() : this.renderToCanvas(e).toDataURL("image/" + (e && e.type || "png"));
        return Object(o["j"])(r, function (e) {
          e.group.ignore = !1;
        }), a;
      }
      An(this.id);
    }, t.prototype.getConnectedDataURL = function (e) {
      if (!this._disposed) {
        var t = "svg" === e.type,
          n = this.group,
          r = Math.min,
          a = Math.max,
          s = 1 / 0;
        if (Yn[n]) {
          var l = s,
            u = s,
            c = -s,
            f = -s,
            d = [],
            h = e && e.pixelRatio || this.getDevicePixelRatio();
          Object(o["j"])(Bn, function (i, s) {
            if (i.group === n) {
              var h = t ? i.getZr().painter.getSvgDom().innerHTML : i.renderToCanvas(Object(o["d"])(e)),
                p = i.getDom().getBoundingClientRect();
              l = r(p.left, l), u = r(p.top, u), c = a(p.right, c), f = a(p.bottom, f), d.push({
                dom: h,
                left: p.left,
                top: p.top
              });
            }
          }), l *= h, u *= h, c *= h, f *= h;
          var p = c - l,
            g = f - u,
            m = Dt["d"].createCanvas(),
            v = i["a"](m, {
              renderer: t ? "svg" : "canvas"
            });
          if (v.resize({
            width: p,
            height: g
          }), t) {
            var y = "";
            return Object(o["j"])(d, function (e) {
              var t = e.left - l,
                n = e.top - u;
              y += '<g transform="translate(' + t + "," + n + ')">' + e.dom + "</g>";
            }), v.painter.getSvgRoot().innerHTML = y, e.connectedBackgroundColor && v.painter.setBackgroundColor(e.connectedBackgroundColor), v.refreshImmediately(), v.painter.toDataURL();
          }
          return e.connectedBackgroundColor && v.add(new ye["a"]({
            shape: {
              x: 0,
              y: 0,
              width: p,
              height: g
            },
            style: {
              fill: e.connectedBackgroundColor
            }
          })), Object(o["j"])(d, function (e) {
            var t = new be["a"]({
              style: {
                x: e.left * h - l,
                y: e.top * h - u,
                image: e.dom
              }
            });
            v.add(t);
          }), v.refreshImmediately(), m.toDataURL("image/" + (e && e.type || "png"));
        }
        return this.getDataURL(e);
      }
      An(this.id);
    }, t.prototype.convertToPixel = function (e, t) {
      return hn(this, "convertToPixel", e, t);
    }, t.prototype.convertFromPixel = function (e, t) {
      return hn(this, "convertFromPixel", e, t);
    }, t.prototype.containPixel = function (e, t) {
      if (!this._disposed) {
        var n,
          r = this._model,
          i = u["q"](r, e);
        return Object(o["j"])(i, function (e, r) {
          r.indexOf("Models") >= 0 && Object(o["j"])(e, function (e) {
            var i = e.coordinateSystem;
            if (i && i.containPoint) n = n || !!i.containPoint(t);else if ("seriesModels" === r) {
              var o = this._chartsMap[e.__viewId];
              o && o.containPoint && (n = n || o.containPoint(t, e));
            } else 0;
          }, this);
        }, this), !!n;
      }
      An(this.id);
    }, t.prototype.getVisual = function (e, t) {
      var n = this._model,
        r = u["q"](n, e, {
          defaultMainType: "series"
        }),
        i = r.seriesModel;
      var o = i.getData(),
        a = r.hasOwnProperty("dataIndexInside") ? r.dataIndexInside : r.hasOwnProperty("dataIndex") ? o.indexOfRawIndex(r.dataIndex) : null;
      return null != a ? xt(o, a, t) : _t(o, t);
    }, t.prototype.getViewOfComponentModel = function (e) {
      return this._componentsMap[e.__viewId];
    }, t.prototype.getViewOfSeriesModel = function (e) {
      return this._chartsMap[e.__viewId];
    }, t.prototype._initEvents = function () {
      var e = this;
      Object(o["j"])(Dn, function (t) {
        var n = function (n) {
          var r,
            i = e.getModel(),
            a = n.target,
            s = "globalout" === t;
          if (s ? r = {} : a && Object(jt["a"])(a, function (e) {
            var t = Object(we["a"])(e);
            if (t && null != t.dataIndex) {
              var n = t.dataModel || i.getSeriesByIndex(t.seriesIndex);
              return r = n && n.getDataParams(t.dataIndex, t.dataType) || {}, !0;
            }
            if (t.eventData) return r = Object(o["l"])({}, t.eventData), !0;
          }, !0), r) {
            var l = r.componentType,
              u = r.componentIndex;
            "markLine" !== l && "markPoint" !== l && "markArea" !== l || (l = "series", u = r.seriesIndex);
            var c = l && null != u && i.getComponent(l, u),
              f = c && e["series" === c.mainType ? "_chartsMap" : "_componentsMap"][c.__viewId];
            0, r.event = n, r.type = t, e._$eventProcessor.eventInfo = {
              targetEl: a,
              packedEvent: r,
              model: c,
              view: f
            }, e.trigger(t, r);
          }
        };
        n.zrEventfulCallAtLast = !0, e._zr.on(t, n, e);
      }), Object(o["j"])(Pn, function (t, n) {
        e._messageCenter.on(n, function (e) {
          this.trigger(n, e);
        }, e);
      }), Object(o["j"])(["selectchanged"], function (t) {
        e._messageCenter.on(t, function (e) {
          this.trigger(t, e);
        }, e);
      }), Ot(this._messageCenter, this, this._api);
    }, t.prototype.isDisposed = function () {
      return this._disposed;
    }, t.prototype.clear = function () {
      this._disposed ? An(this.id) : this.setOption({
        series: []
      }, !0);
    }, t.prototype.dispose = function () {
      if (this._disposed) An(this.id);else {
        this._disposed = !0;
        var e = this.getDom();
        e && u["u"](this.getDom(), Gn, "");
        var t = this,
          n = t._api,
          r = t._model;
        Object(o["j"])(t._componentsViews, function (e) {
          e.dispose(r, n);
        }), Object(o["j"])(t._chartsViews, function (e) {
          e.dispose(r, n);
        }), t._zr.dispose(), t._dom = t._model = t._chartsMap = t._componentsMap = t._chartsViews = t._componentsViews = t._scheduler = t._api = t._zr = t._throttledZrFlush = t._theme = t._coordSysMgr = t._messageCenter = null, delete Bn[t.id];
      }
    }, t.prototype.resize = function (e) {
      if (!this[Qt]) if (this._disposed) An(this.id);else {
        this._zr.resize(e);
        var t = this._model;
        if (this._loadingFX && this._loadingFX.resize(), t) {
          var n = t.resetOption("media"),
            r = e && e.silent;
          this[$t] && (null == r && (r = this[$t].silent), n = !0, this[$t] = null), this[Qt] = !0;
          try {
            n && un(this), dn.update.call(this, {
              type: "resize",
              animation: Object(o["l"])({
                duration: 0
              }, e && e.animation)
            });
          } catch (e) {
            throw this[Qt] = !1, e;
          }
          this[Qt] = !1, mn.call(this, r), vn.call(this, r);
        }
      }
    }, t.prototype.showLoading = function (e, t) {
      if (this._disposed) An(this.id);else if (Object(o["x"])(e) && (t = e, e = ""), e = e || "default", this.hideLoading(), Fn[e]) {
        var n = Fn[e](this._api, t),
          r = this._zr;
        this._loadingFX = n, r.add(n);
      }
    }, t.prototype.hideLoading = function () {
      this._disposed ? An(this.id) : (this._loadingFX && this._zr.remove(this._loadingFX), this._loadingFX = null);
    }, t.prototype.makeActionFromEvent = function (e) {
      var t = Object(o["l"])({}, e);
      return t.type = Pn[e.type], t;
    }, t.prototype.dispatchAction = function (e, t) {
      if (this._disposed) An(this.id);else if (Object(o["x"])(t) || (t = {
        silent: !!t
      }), En[e.type] && this._model) if (this[Qt]) this._pendingActions.push(e);else {
        var n = t.silent;
        gn.call(this, e, n);
        var r = t.flush;
        r ? this._zr.flush() : !1 !== r && a["a"].browser.weChat && this._throttledZrFlush(), mn.call(this, n), vn.call(this, n);
      }
    }, t.prototype.updateLabelLayout = function () {
      It.trigger("series:layoutlabels", this._model, this._api, {
        updatedSeries: []
      });
    }, t.prototype.appendData = function (e) {
      if (this._disposed) An(this.id);else {
        var t = e.seriesIndex,
          n = this.getModel(),
          r = n.getSeriesByIndex(t);
        0, r.appendData(e), this._scheduler.unfinished = !0, this.getZr().wakeUp();
      }
    }, t.internalField = function () {
      function e(e) {
        e.clearColorPalette(), e.eachSeries(function (e) {
          e.clearColorPalette();
        });
      }
      function t(e) {
        var t = [],
          n = [],
          r = !1;
        if (e.eachComponent(function (e, i) {
          var o = i.get("zlevel") || 0,
            a = i.get("z") || 0,
            s = i.getZLevelKey();
          r = r || !!s, ("series" === e ? n : t).push({
            zlevel: o,
            z: a,
            idx: i.componentIndex,
            type: e,
            key: s
          });
        }), r) {
          var i,
            a,
            l = t.concat(n);
          Object(s["a"])(l, function (e, t) {
            return e.zlevel === t.zlevel ? e.z - t.z : e.zlevel - t.zlevel;
          }), Object(o["j"])(l, function (t) {
            var n = e.getComponent(t.type, t.idx),
              r = t.zlevel,
              o = t.key;
            null != i && (r = Math.max(i, r)), o ? (r === i && o !== a && r++, a = o) : a && (r === i && r++, a = ""), i = r, n.setZLevel(r);
          });
        }
      }
      function n(e) {
        for (var t = [], n = e.currentStates, r = 0; r < n.length; r++) {
          var i = n[r];
          "emphasis" !== i && "blur" !== i && "select" !== i && t.push(i);
        }
        e.selected && e.states.select && t.push("select"), e.hoverState === Oe["e"] && e.states.emphasis ? t.push("emphasis") : e.hoverState === Oe["d"] && e.states.blur && t.push("blur"), e.useStates(t);
      }
      function i(e, t) {
        var n = e._zr,
          r = n.storage,
          i = 0;
        r.traverse(function (e) {
          e.isGroup || i++;
        }), i > t.get("hoverLayerThreshold") && !a["a"].node && !a["a"].worker && t.eachSeries(function (t) {
          if (!t.preventUsingHoverLayer) {
            var n = e._chartsMap[t.__viewId];
            n.__alive && n.eachRendered(function (e) {
              e.states.emphasis && (e.states.emphasis.hoverLayer = !0);
            });
          }
        });
      }
      function l(e, t) {
        var n = e.get("blendMode") || null;
        t.eachRendered(function (e) {
          e.isGroup || (e.style.blend = n);
        });
      }
      function c(e, t) {
        if (!e.preventAutoZ) {
          var n = e.get("z") || 0,
            r = e.get("zlevel") || 0;
          t.eachRendered(function (e) {
            return f(e, n, r, -1 / 0), !0;
          });
        }
      }
      function f(e, t, n, r) {
        var i = e.getTextContent(),
          o = e.getTextGuideLine(),
          a = e.isGroup;
        if (a) for (var s = e.childrenRef(), l = 0; l < s.length; l++) r = Math.max(f(s[l], t, n, r), r);else e.z = t, e.zlevel = n, r = Math.max(e.z2, r);
        if (i && (i.z = t, i.zlevel = n, isFinite(r) && (i.z2 = r + 2)), o) {
          var u = e.textGuideLineConfig;
          o.z = t, o.zlevel = n, isFinite(r) && (o.z2 = r + (u && u.showAbove ? 1 : -1));
        }
        return r;
      }
      function d(e, t) {
        t.eachRendered(function (e) {
          if (!xe["d"](e)) {
            var t = e.getTextContent(),
              n = e.getTextGuideLine();
            e.stateTransition && (e.stateTransition = null), t && t.stateTransition && (t.stateTransition = null), n && n.stateTransition && (n.stateTransition = null), e.hasState() ? (e.prevStates = e.currentStates, e.clearStates()) : e.prevStates && (e.prevStates = null);
          }
        });
      }
      function h(e, t) {
        var r = e.getModel("stateAnimation"),
          i = e.isAnimationEnabled(),
          o = r.get("duration"),
          a = o > 0 ? {
            duration: o,
            delay: r.get("delay"),
            easing: r.get("easing")
          } : null;
        t.eachRendered(function (e) {
          if (e.states && e.states.emphasis) {
            if (xe["d"](e)) return;
            if (e instanceof _e["b"] && Object(Oe["B"])(e), e.__dirty) {
              var t = e.prevStates;
              t && e.useStates(t);
            }
            if (i) {
              e.stateTransition = a;
              var r = e.getTextContent(),
                o = e.getTextGuideLine();
              r && (r.stateTransition = a), o && (o.stateTransition = a);
            }
            e.__dirty && n(e);
          }
        });
      }
      un = function (e) {
        var t = e._scheduler;
        t.restorePipelines(e._model), t.prepareStageTasks(), cn(e, !0), cn(e, !1), t.plan();
      }, cn = function (e, t) {
        for (var n = e._model, r = e._scheduler, i = t ? e._componentsViews : e._chartsViews, o = t ? e._componentsMap : e._chartsMap, a = e._zr, s = e._api, l = 0; l < i.length; l++) i[l].__alive = !1;
        function u(e) {
          var l = e.__requireNewView;
          e.__requireNewView = !1;
          var u = "_ec_" + e.id + "_" + e.type,
            c = !l && o[u];
          if (!c) {
            var f = Object(pt["f"])(e.type),
              d = t ? me["a"].getClass(f.main, f.sub) : ve["a"].getClass(f.sub);
            0, c = new d(), c.init(n, s), o[u] = c, i.push(c), a.add(c.group);
          }
          e.__viewId = c.__id = u, c.__alive = !0, c.__model = e, c.group.__ecComponentInfo = {
            mainType: e.mainType,
            index: e.componentIndex
          }, !t && r.prepareView(c, e, n, s);
        }
        t ? n.eachComponent(function (e, t) {
          "series" !== e && u(t);
        }) : n.eachSeries(u);
        for (l = 0; l < i.length;) {
          var c = i[l];
          c.__alive ? l++ : (!t && c.renderTask.dispose(), a.remove(c.group), c.dispose(n, s), i.splice(l, 1), o[c.__id] === c && delete o[c.__id], c.__id = c.group.__ecComponentInfo = null);
        }
      }, fn = function (e, t, n, r, i) {
        var a = e._model;
        if (a.setUpdatePayload(n), r) {
          var s = {};
          s[r + "Id"] = n[r + "Id"], s[r + "Index"] = n[r + "Index"], s[r + "Name"] = n[r + "Name"];
          var l = {
            mainType: r,
            query: s
          };
          i && (l.subType = i);
          var c,
            f = n.excludeSeriesId;
          null != f && (c = Object(o["f"])(), Object(o["j"])(u["p"](f), function (e) {
            var t = u["d"](e, null);
            null != t && c.set(t, !0);
          })), a && a.eachComponent(l, function (t) {
            var r = c && null !== c.get(t.id);
            if (!r) if (Object(Oe["w"])(n)) {
              if (t instanceof ge["b"]) n.type !== Oe["c"] || n.notBlur || t.get(["emphasis", "disabled"]) || Object(Oe["l"])(t, n, e._api);else {
                var i = Object(Oe["q"])(t.mainType, t.componentIndex, n.name, e._api),
                  a = i.focusSelf,
                  s = i.dispatchers;
                n.type === Oe["c"] && a && !n.notBlur && Object(Oe["k"])(t.mainType, t.componentIndex, e._api), s && Object(o["j"])(s, function (e) {
                  n.type === Oe["c"] ? Object(Oe["o"])(e) : Object(Oe["z"])(e);
                });
              }
            } else Object(Oe["x"])(n) && t instanceof ge["b"] && (Object(Oe["F"])(t, n, e._api), Object(Oe["G"])(t), kn(e));
          }, e), a && a.eachComponent(l, function (t) {
            var n = c && null !== c.get(t.id);
            n || d(e["series" === r ? "_chartsMap" : "_componentsMap"][t.__viewId]);
          }, e);
        } else Object(o["j"])([].concat(e._componentsViews).concat(e._chartsViews), d);
        function d(r) {
          r && r.__alive && r[t] && r[t](r.__model, a, e._api, n);
        }
      }, dn = {
        prepareAndUpdate: function (e) {
          un(this), dn.update.call(this, e, {
            optionChanged: null != e.newOption
          });
        },
        update: function (t, n) {
          var r = this._model,
            i = this._api,
            o = this._zr,
            a = this._coordSysMgr,
            s = this._scheduler;
          if (r) {
            r.setUpdatePayload(t), s.restoreData(r, t), s.performSeriesTasks(r), a.create(r, i), s.performDataProcessorTasks(r, t), pn(this, r), a.update(r, i), e(r), s.performVisualTasks(r, t), xn(this, r, i, t, n);
            var l = r.get("backgroundColor") || "transparent",
              u = r.get("darkMode");
            o.setBackgroundColor(l), null != u && "auto" !== u && o.setDarkMode(u), It.trigger("afterupdate", r, i);
          }
        },
        updateTransform: function (t) {
          var n = this,
            r = this._model,
            i = this._api;
          if (r) {
            r.setUpdatePayload(t);
            var a = [];
            r.eachComponent(function (e, o) {
              if ("series" !== e) {
                var s = n.getViewOfComponentModel(o);
                if (s && s.__alive) if (s.updateTransform) {
                  var l = s.updateTransform(o, r, i, t);
                  l && l.update && a.push(s);
                } else a.push(s);
              }
            });
            var s = Object(o["f"])();
            r.eachSeries(function (e) {
              var o = n._chartsMap[e.__viewId];
              if (o.updateTransform) {
                var a = o.updateTransform(e, r, i, t);
                a && a.update && s.set(e.uid, 1);
              } else s.set(e.uid, 1);
            }), e(r), this._scheduler.performVisualTasks(r, t, {
              setDirty: !0,
              dirtyMap: s
            }), wn(this, r, i, t, {}, s), It.trigger("afterupdate", r, i);
          }
        },
        updateView: function (t) {
          var n = this._model;
          n && (n.setUpdatePayload(t), ve["a"].markUpdateMethod(t, "updateView"), e(n), this._scheduler.performVisualTasks(n, t, {
            setDirty: !0
          }), xn(this, n, this._api, t, {}), It.trigger("afterupdate", n, this._api));
        },
        updateVisual: function (t) {
          var n = this,
            r = this._model;
          r && (r.setUpdatePayload(t), r.eachSeries(function (e) {
            e.getData().clearAllVisual();
          }), ve["a"].markUpdateMethod(t, "updateVisual"), e(r), this._scheduler.performVisualTasks(r, t, {
            visualType: "visual",
            setDirty: !0
          }), r.eachComponent(function (e, i) {
            if ("series" !== e) {
              var o = n.getViewOfComponentModel(i);
              o && o.__alive && o.updateVisual(i, r, n._api, t);
            }
          }), r.eachSeries(function (e) {
            var i = n._chartsMap[e.__viewId];
            i.updateVisual(e, r, n._api, t);
          }), It.trigger("afterupdate", r, this._api));
        },
        updateLayout: function (e) {
          dn.update.call(this, e);
        }
      }, hn = function (e, t, n, r) {
        if (e._disposed) An(e.id);else {
          for (var i, o = e._model, a = e._coordSysMgr.getCoordinateSystems(), s = u["q"](o, n), l = 0; l < a.length; l++) {
            var c = a[l];
            if (c[t] && null != (i = c[t](o, s, r))) return i;
          }
          0;
        }
      }, pn = function (e, t) {
        var n = e._chartsMap,
          r = e._scheduler;
        t.eachSeries(function (e) {
          r.updateStreamModes(e, n[e.__viewId]);
        });
      }, gn = function (e, t) {
        var n = this,
          r = this.getModel(),
          i = e.type,
          a = e.escapeConnect,
          s = En[i],
          l = s.actionInfo,
          c = (l.update || "update").split(":"),
          f = c.pop(),
          d = null != c[0] && Object(pt["f"])(c[0]);
        this[Qt] = !0;
        var h = [e],
          p = !1;
        e.batch && (p = !0, h = Object(o["D"])(e.batch, function (t) {
          return t = Object(o["i"])(Object(o["l"])({}, t), e), t.batch = null, t;
        }));
        var g,
          m = [],
          v = Object(Oe["x"])(e),
          y = Object(Oe["w"])(e);
        if (y && Object(Oe["j"])(this._api), Object(o["j"])(h, function (t) {
          if (g = s.action(t, n._model, n._api), g = g || Object(o["l"])({}, t), g.type = l.event || g.type, m.push(g), y) {
            var r = u["r"](e),
              i = r.queryOptionMap,
              a = r.mainTypeSpecified,
              c = a ? i.keys()[0] : "series";
            fn(n, f, t, c), kn(n);
          } else v ? (fn(n, f, t, "series"), kn(n)) : d && fn(n, f, t, d.main, d.sub);
        }), "none" !== f && !y && !v && !d) try {
          this[$t] ? (un(this), dn.update.call(this, e), this[$t] = null) : dn[f].call(this, e);
        } catch (e) {
          throw this[Qt] = !1, e;
        }
        if (g = p ? {
          type: l.event || i,
          escapeConnect: a,
          batch: m
        } : m[0], this[Qt] = !1, !t) {
          var b = this._messageCenter;
          if (b.trigger(g.type, g), v) {
            var x = {
              type: "selectchanged",
              escapeConnect: a,
              selected: Object(Oe["r"])(r),
              isFromClick: e.isFromClick || !1,
              fromAction: e.type,
              fromActionPayload: e
            };
            b.trigger(x.type, x);
          }
        }
      }, mn = function (e) {
        var t = this._pendingActions;
        while (t.length) {
          var n = t.shift();
          gn.call(this, n, e);
        }
      }, vn = function (e) {
        !e && this.trigger("updated");
      }, yn = function (e, t) {
        e.on("rendered", function (n) {
          t.trigger("rendered", n), !e.animation.isFinished() || t[$t] || t._scheduler.unfinished || t._pendingActions.length || t.trigger("finished");
        });
      }, bn = function (e, t) {
        e.on("mouseover", function (e) {
          var n = e.target,
            r = Object(jt["a"])(n, Oe["v"]);
          r && (Object(Oe["u"])(r, e, t._api), kn(t));
        }).on("mouseout", function (e) {
          var n = e.target,
            r = Object(jt["a"])(n, Oe["v"]);
          r && (Object(Oe["t"])(r, e, t._api), kn(t));
        }).on("click", function (e) {
          var n = e.target,
            r = Object(jt["a"])(n, function (e) {
              return null != Object(we["a"])(e).dataIndex;
            }, !0);
          if (r) {
            var i = r.selected ? "unselect" : "select",
              o = Object(we["a"])(r);
            t._api.dispatchAction({
              type: i,
              dataType: o.dataType,
              dataIndexInside: o.dataIndex,
              seriesIndex: o.seriesIndex,
              isFromClick: !0
            });
          }
        });
      }, xn = function (e, n, r, i, a) {
        t(n), _n(e, n, r, i, a), Object(o["j"])(e._chartsViews, function (e) {
          e.__alive = !1;
        }), wn(e, n, r, i, a), Object(o["j"])(e._chartsViews, function (e) {
          e.__alive || e.remove(n, r);
        });
      }, _n = function (e, t, n, r, i, a) {
        Object(o["j"])(a || e._componentsViews, function (e) {
          var i = e.__model;
          d(i, e), e.render(i, t, n, r), c(i, e), h(i, e);
        });
      }, wn = function (e, t, n, r, a, s) {
        var u = e._scheduler;
        a = Object(o["l"])(a || {}, {
          updatedSeries: t.getSeries()
        }), It.trigger("series:beforeupdate", t, n, a);
        var f = !1;
        t.eachSeries(function (t) {
          var n = e._chartsMap[t.__viewId];
          n.__alive = !0;
          var i = n.renderTask;
          u.updatePayload(i, r), d(t, n), s && s.get(t.uid) && i.dirty(), i.perform(u.getPerformArgs(i)) && (f = !0), n.group.silent = !!t.get("silent"), l(t, n), Object(Oe["G"])(t);
        }), u.unfinished = f || u.unfinished, It.trigger("series:layoutlabels", t, n, a), It.trigger("series:transition", t, n, a), t.eachSeries(function (t) {
          var n = e._chartsMap[t.__viewId];
          c(t, n), h(t, n);
        }), i(e, t), It.trigger("series:afterupdate", t, n, a);
      }, kn = function (e) {
        e[Jt] = !0, e.getZr().wakeUp();
      }, jn = function (e) {
        e[Jt] && (e.getZr().storage.traverse(function (e) {
          xe["d"](e) || n(e);
        }), e[Jt] = !1);
      }, On = function (e) {
        return new (function (t) {
          function n() {
            return null !== t && t.apply(this, arguments) || this;
          }
          return Object(r["a"])(n, t), n.prototype.getCoordinateSystems = function () {
            return e._coordSysMgr.getCoordinateSystems();
          }, n.prototype.getComponentByElement = function (t) {
            while (t) {
              var n = t.__ecComponentInfo;
              if (null != n) return e._model.getComponent(n.mainType, n.index);
              t = t.parent;
            }
          }, n.prototype.enterEmphasis = function (t, n) {
            Object(Oe["o"])(t, n), kn(e);
          }, n.prototype.leaveEmphasis = function (t, n) {
            Object(Oe["z"])(t, n), kn(e);
          }, n.prototype.enterBlur = function (t) {
            Object(Oe["n"])(t), kn(e);
          }, n.prototype.leaveBlur = function (t) {
            Object(Oe["y"])(t), kn(e);
          }, n.prototype.enterSelect = function (t) {
            Object(Oe["p"])(t), kn(e);
          }, n.prototype.leaveSelect = function (t) {
            Object(Oe["A"])(t), kn(e);
          }, n.prototype.getModel = function () {
            return e.getModel();
          }, n.prototype.getViewOfComponentModel = function (t) {
            return e.getViewOfComponentModel(t);
          }, n.prototype.getViewOfSeriesModel = function (t) {
            return e.getViewOfSeriesModel(t);
          }, n;
        }(E))(e);
      }, Sn = function (e) {
        function t(e, t) {
          for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r[tn] = t;
          }
        }
        Object(o["j"])(Pn, function (n, r) {
          e._messageCenter.on(r, function (n) {
            if (Yn[e.group] && e[tn] !== nn) {
              if (n && n.escapeConnect) return;
              var r = e.makeActionFromEvent(n),
                i = [];
              Object(o["j"])(Bn, function (t) {
                t !== e && t.group === e.group && i.push(t);
              }), t(i, nn), Object(o["j"])(i, function (e) {
                e[tn] !== rn && e.dispatchAction(r);
              }), t(i, on);
            }
          });
        });
      };
    }(), t;
  }(l["a"]),
  In = Tn.prototype;
In.on = an("on"), In.off = an("off"), In.one = function (e, t, n) {
  var r = this;
  function i() {
    for (var n = [], o = 0; o < arguments.length; o++) n[o] = arguments[o];
    t && t.apply && t.apply(this, n), r.off(e, i);
  }
  Object(_["a"])("ECharts#one is deprecated."), this.on.call(this, e, i, n);
};
var Dn = ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu"];
function An(e) {
  0;
}
var En = {},
  Pn = {},
  Ln = [],
  Nn = [],
  Rn = [],
  zn = {},
  Fn = {},
  Bn = {},
  Yn = {},
  Vn = +new Date() - 0,
  Gn = (new Date(), "_echarts_instance_");
function Wn(e, t, n) {
  var r = !(n && n.ssr);
  if (r) {
    0;
    var i = Un(e);
    if (i) return i;
    0;
  }
  var o = new Tn(e, t, n);
  return o.id = "ec_" + Vn++, Bn[o.id] = o, r && u["u"](e, Gn, o.id), Sn(o), It.trigger("afterinit", o), o;
}
function Un(e) {
  return Bn[u["f"](e, Gn)];
}
function Hn(e, t) {
  zn[e] = t;
}
function qn(e) {
  Object(o["p"])(Nn, e) < 0 && Nn.push(e);
}
function Kn(e, t) {
  rr(Ln, e, t, zt);
}
function Zn(e) {
  Qn("afterinit", e);
}
function Xn(e) {
  Qn("afterupdate", e);
}
function Qn(e, t) {
  It.on(e, t);
}
function $n(e, t, n) {
  Object(o["u"])(t) && (n = t, t = "");
  var r = Object(o["x"])(e) ? e.type : [e, e = {
    event: t
  }][0];
  e.event = (e.event || r).toLowerCase(), t = e.event, Pn[t] || (Object(o["b"])(en.test(r) && en.test(t)), En[r] || (En[r] = {
    action: n,
    actionInfo: e
  }), Pn[t] = r);
}
function Jn(e, t) {
  P["a"].register(e, t);
}
function er(e, t) {
  rr(Rn, e, t, Bt, "layout");
}
function tr(e, t) {
  rr(Rn, e, t, Gt, "visual");
}
var nr = [];
function rr(e, t, n, r, i) {
  if ((Object(o["u"])(t) || Object(o["x"])(t)) && (n = t, t = r), !(Object(o["p"])(nr, n) >= 0)) {
    nr.push(n);
    var a = ot.wrapStageHandler(n, i);
    a.__prio = t, a.__raw = n, e.push(a);
  }
}
function ir(e, t) {
  Fn[e] = t;
}
function or(e, t, n) {
  var r = Object(At["a"])("registerMap");
  r && r(e, t, n);
}
var ar = St["b"];
tr(Vt, Ee), tr(Ut, Le), tr(Ut, Ne), tr(Vt, yt), tr(Ut, bt), tr(Zt, Ct), qn(fe), Kn(Nt, he), ir("default", Ye), $n({
  type: Oe["c"],
  event: Oe["c"],
  update: Oe["c"]
}, o["G"]), $n({
  type: Oe["b"],
  event: Oe["b"],
  update: Oe["b"]
}, o["G"]), $n({
  type: Oe["f"],
  event: Oe["f"],
  update: Oe["f"]
}, o["G"]), $n({
  type: Oe["i"],
  event: Oe["i"],
  update: Oe["i"]
}, o["G"]), $n({
  type: Oe["h"],
  event: Oe["h"],
  update: Oe["h"]
}, o["G"]), Hn("light", st), Hn("dark", ht);
