let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
var r = require("./4972526e.js"),
  i = require("./6d725347.js"),
  o = require("./62597459.js"),
  a = require("./51786b74.js"),
  s = require("./344e4f34.js"),
  l = require("./624c6677.js"),
  u = function (e, t) {
    return "all" === t ? {
      type: "all",
      title: e.getLocaleModel().get(["legend", "selector", "all"])
    } : "inverse" === t ? {
      type: "inverse",
      title: e.getLocaleModel().get(["legend", "selector", "inverse"])
    } : void 0;
  },
  c = function (e) {
    function t() {
      var n = null !== e && e.apply(this, arguments) || this;
      return n.type = t.type, n.layoutMode = {
        type: "box",
        ignoreSize: !0
      }, n;
    }
    return Object(i["a"])(t, e), t.prototype.init = function (e, t, n) {
      this.mergeDefaultAndTheme(e, n), e.selected = e.selected || {}, this._updateSelector(e);
    }, t.prototype.mergeOption = function (t, n) {
      e.prototype.mergeOption.call(this, t, n), this._updateSelector(t);
    }, t.prototype._updateSelector = function (e) {
      var t = e.selector,
        n = this.ecModel;
      !0 === t && (t = e.selector = ["all", "inverse"]), o["r"](t) && o["j"](t, function (e, r) {
        o["y"](e) && (e = {
          type: e
        }), t[r] = o["E"](e, u(n, e.type));
      });
    }, t.prototype.optionUpdated = function () {
      this._updateData(this.ecModel);
      var e = this._data;
      if (e[0] && "single" === this.get("selectedMode")) {
        for (var t = !1, n = 0; n < e.length; n++) {
          var r = e[n].get("name");
          if (this.isSelected(r)) {
            this.select(r), t = !0;
            break;
          }
        }
        !t && this.select(e[0].get("name"));
      }
    }, t.prototype._updateData = function (e) {
      var t = [],
        n = [];
      e.eachRawSeries(function (r) {
        var i,
          o = r.name;
        if (n.push(o), r.legendVisualProvider) {
          var a = r.legendVisualProvider,
            l = a.getAllNames();
          e.isSeriesFiltered(r) || (n = n.concat(l)), l.length ? t = t.concat(l) : i = !0;
        } else i = !0;
        i && Object(s["l"])(r) && t.push(r.name);
      }), this._availableNames = n;
      var r = this.get("data") || t,
        i = o["D"](r, function (e) {
          return (o["y"](e) || o["w"](e)) && (e = {
            name: e
          }), new a["a"](e, this, this.ecModel);
        }, this);
      this._data = i;
    }, t.prototype.getData = function () {
      return this._data;
    }, t.prototype.select = function (e) {
      var t = this.option.selected,
        n = this.get("selectedMode");
      if ("single" === n) {
        var r = this._data;
        o["j"](r, function (e) {
          t[e.get("name")] = !1;
        });
      }
      t[e] = !0;
    }, t.prototype.unSelect = function (e) {
      "single" !== this.get("selectedMode") && (this.option.selected[e] = !1);
    }, t.prototype.toggleSelected = function (e) {
      var t = this.option.selected;
      t.hasOwnProperty(e) || (t[e] = !0), this[t[e] ? "unSelect" : "select"](e);
    }, t.prototype.allSelect = function () {
      var e = this._data,
        t = this.option.selected;
      o["j"](e, function (e) {
        t[e.get("name", !0)] = !0;
      });
    }, t.prototype.inverseSelect = function () {
      var e = this._data,
        t = this.option.selected;
      o["j"](e, function (e) {
        var n = e.get("name", !0);
        t.hasOwnProperty(n) || (t[n] = !0), t[n] = !t[n];
      });
    }, t.prototype.isSelected = function (e) {
      var t = this.option.selected;
      return !(t.hasOwnProperty(e) && !t[e]) && o["p"](this._availableNames, e) >= 0;
    }, t.prototype.getOrient = function () {
      return "vertical" === this.get("orient") ? {
        index: 1,
        name: "vertical"
      } : {
        index: 0,
        name: "horizontal"
      };
    }, t.type = "legend.plain", t.dependencies = ["series"], t.defaultOption = {
      z: 4,
      show: !0,
      orient: "horizontal",
      left: "center",
      top: 0,
      align: "auto",
      backgroundColor: "rgba(0,0,0,0)",
      borderColor: "#ccc",
      borderRadius: 0,
      borderWidth: 0,
      padding: 5,
      itemGap: 10,
      itemWidth: 25,
      itemHeight: 14,
      symbolRotate: "inherit",
      symbolKeepAspect: !0,
      inactiveColor: "#ccc",
      inactiveBorderColor: "#ccc",
      inactiveBorderWidth: "auto",
      itemStyle: {
        color: "inherit",
        opacity: "inherit",
        borderColor: "inherit",
        borderWidth: "auto",
        borderCap: "inherit",
        borderJoin: "inherit",
        borderDashOffset: "inherit",
        borderMiterLimit: "inherit"
      },
      lineStyle: {
        width: "auto",
        color: "inherit",
        inactiveColor: "#ccc",
        inactiveWidth: 2,
        opacity: "inherit",
        type: "inherit",
        cap: "inherit",
        join: "inherit",
        dashOffset: "inherit",
        miterLimit: "inherit"
      },
      textStyle: {
        color: "#333"
      },
      selectedMode: !0,
      selector: !1,
      selectorLabel: {
        show: !0,
        borderRadius: 10,
        padding: [3, 5, 3, 5],
        fontSize: 12,
        fontFamily: "sans-serif",
        color: "#666",
        borderWidth: 1,
        borderColor: "#666"
      },
      emphasis: {
        selectorLabel: {
          show: !0,
          color: "#eee",
          backgroundColor: "#666"
        }
      },
      selectorPosition: "auto",
      selectorItemGap: 7,
      selectorButtonGap: 10,
      tooltip: {
        show: !1
      }
    }, t;
  }(l["a"]),
  f = c,
  d = require("./51653970.js"),
  h = require("./4c63584c.js"),
  p = require("./64715547.js"),
  g = require("./78364b74.js"),
  m = require("./49776253.js"),
  v = require("./66577761.js"),
  y = require("./65446668.js"),
  b = require("./65526b4f.js"),
  x = require("./2b54542f.js"),
  _ = require("./73532f72.js"),
  w = require("./6f567045.js"),
  O = require("./73384662.js"),
  S = o["h"],
  k = o["j"],
  j = h["a"],
  M = function (e) {
    function t() {
      var n = null !== e && e.apply(this, arguments) || this;
      return n.type = t.type, n.newlineDisabled = !1, n;
    }
    return Object(i["a"])(t, e), t.prototype.init = function () {
      this.group.add(this._contentGroup = new j()), this.group.add(this._selectorGroup = new j()), this._isFirstRender = !0;
    }, t.prototype.getContentGroup = function () {
      return this._contentGroup;
    }, t.prototype.getSelectorGroup = function () {
      return this._selectorGroup;
    }, t.prototype.render = function (e, t, n) {
      var r = this._isFirstRender;
      if (this._isFirstRender = !1, this.resetInner(), e.get("show", !0)) {
        var i = e.get("align"),
          a = e.get("orient");
        i && "auto" !== i || (i = "right" === e.get("left") && "vertical" === a ? "right" : "left");
        var s = e.get("selector", !0),
          l = e.get("selectorPosition", !0);
        !s || l && "auto" !== l || (l = "horizontal" === a ? "end" : "start"), this.renderInner(i, e, t, n, s, a, l);
        var u = e.getBoxLayoutParams(),
          c = {
            width: n.getWidth(),
            height: n.getHeight()
          },
          f = e.get("padding"),
          d = x["d"](u, c, f),
          h = this.layoutInner(e, i, d, r, s, l),
          p = x["d"](o["i"]({
            width: h.width,
            height: h.height
          }, u), c, f);
        this.group.x = p.x - h.x, this.group.y = p.y - h.y, this.group.markRedraw(), this.group.add(this._backgroundEl = Object(b["b"])(h, e));
      }
    }, t.prototype.resetInner = function () {
      this.getContentGroup().removeAll(), this._backgroundEl && this.group.remove(this._backgroundEl), this.getSelectorGroup().removeAll();
    }, t.prototype.renderInner = function (e, t, n, r, i, a, s) {
      var l = this.getContentGroup(),
        u = o["f"](),
        c = t.get("selectedMode"),
        f = [];
      n.eachRawSeries(function (e) {
        !e.get("legendHoverLink") && f.push(e.id);
      }), k(t.getData(), function (i, a) {
        var s = i.get("name");
        if (!this.newlineDisabled && ("" === s || "\n" === s)) {
          var h = new j();
          return h.newline = !0, void l.add(h);
        }
        var p = n.getSeriesByName(s)[0];
        if (!u.get(s)) {
          if (p) {
            var g = p.getData(),
              m = g.getVisual("legendLineStyle") || {},
              v = g.getVisual("legendIcon"),
              y = g.getVisual("style"),
              b = this._createItem(p, s, a, i, t, e, m, y, v, c, r);
            b.on("click", S(I, s, null, r, f)).on("mouseover", S(A, p.name, null, r, f)).on("mouseout", S(E, p.name, null, r, f)), u.set(s, !0);
          } else n.eachRawSeries(function (n) {
            if (!u.get(s) && n.legendVisualProvider) {
              var l = n.legendVisualProvider;
              if (!l.containName(s)) return;
              var h = l.indexOfName(s),
                p = l.getItemVisual(h, "style"),
                g = l.getItemVisual(h, "legendIcon"),
                m = Object(d["d"])(p.fill);
              m && 0 === m[3] && (m[3] = .2, p = o["l"](o["l"]({}, p), {
                fill: Object(d["e"])(m, "rgba")
              }));
              var v = this._createItem(n, s, a, i, t, e, {}, p, g, c, r);
              v.on("click", S(I, null, s, r, f)).on("mouseover", S(A, null, s, r, f)).on("mouseout", S(E, null, s, r, f)), u.set(s, !0);
            }
          }, this);
          0;
        }
      }, this), i && this._createSelector(i, t, r, a, s);
    }, t.prototype._createSelector = function (e, t, n, r, i) {
      var o = this.getSelectorGroup();
      k(e, function (e) {
        var r = e.type,
          i = new p["a"]({
            style: {
              x: 0,
              y: 0,
              align: "center",
              verticalAlign: "middle"
            },
            onclick: function () {
              n.dispatchAction({
                type: "all" === r ? "legendAllSelect" : "legendInverseSelect"
              });
            }
          });
        o.add(i);
        var a = t.getModel("selectorLabel"),
          s = t.getModel(["emphasis", "selectorLabel"]);
        Object(y["e"])(i, {
          normal: a,
          emphasis: s
        }, {
          defaultText: e.title
        }), Object(v["m"])(i);
      });
    }, t.prototype._createItem = function (e, t, n, r, i, a, s, l, u, c, f) {
      var d = e.visualDrawType,
        h = i.get("itemWidth"),
        b = i.get("itemHeight"),
        x = i.isSelected(t),
        _ = r.get("symbolRotate"),
        w = r.get("symbolKeepAspect"),
        O = r.get("icon");
      u = O || u || "roundRect";
      var S = C(u, r, s, l, d, x, f),
        k = new j(),
        M = r.getModel("textStyle");
      if (!o["u"](e.getLegendIcon) || O && "inherit" !== O) {
        var I = "inherit" === O && e.getData().getVisual("symbol") ? "inherit" === _ ? e.getData().getVisual("symbolRotate") : _ : 0;
        k.add(T({
          itemWidth: h,
          itemHeight: b,
          icon: u,
          iconRotate: I,
          itemStyle: S.itemStyle,
          lineStyle: S.lineStyle,
          symbolKeepAspect: w
        }));
      } else k.add(e.getLegendIcon({
        itemWidth: h,
        itemHeight: b,
        icon: u,
        iconRotate: _,
        itemStyle: S.itemStyle,
        lineStyle: S.lineStyle,
        symbolKeepAspect: w
      }));
      var D = "left" === a ? h + 5 : -5,
        A = a,
        E = i.get("formatter"),
        P = t;
      o["y"](E) && E ? P = E.replace("{name}", null != t ? t : "") : o["u"](E) && (P = E(t));
      var L = r.get("inactiveColor");
      k.add(new p["a"]({
        style: Object(y["a"])(M, {
          text: P,
          x: D,
          y: b / 2,
          fill: x ? M.getTextColor() : L,
          align: A,
          verticalAlign: "middle"
        })
      }));
      var N = new g["a"]({
          shape: k.getBoundingRect(),
          invisible: !0
        }),
        R = r.getModel("tooltip");
      return R.get("show") && m["setTooltipConfig"]({
        el: N,
        componentModel: i,
        itemName: t,
        itemTooltipOption: R.option
      }), k.add(N), k.eachChild(function (e) {
        e.silent = !0;
      }), N.silent = !c, this.getContentGroup().add(k), Object(v["m"])(k), k.__legendDataIndex = n, k;
    }, t.prototype.layoutInner = function (e, t, n, r, i, o) {
      var a = this.getContentGroup(),
        s = this.getSelectorGroup();
      x["a"](e.get("orient"), a, e.get("itemGap"), n.width, n.height);
      var l = a.getBoundingRect(),
        u = [-l.x, -l.y];
      if (s.markRedraw(), a.markRedraw(), i) {
        x["a"]("horizontal", s, e.get("selectorItemGap", !0));
        var c = s.getBoundingRect(),
          f = [-c.x, -c.y],
          d = e.get("selectorButtonGap", !0),
          h = e.getOrient().index,
          p = 0 === h ? "width" : "height",
          g = 0 === h ? "height" : "width",
          m = 0 === h ? "y" : "x";
        "end" === o ? f[h] += l[p] + d : u[h] += c[p] + d, f[1 - h] += l[g] / 2 - c[g] / 2, s.x = f[0], s.y = f[1], a.x = u[0], a.y = u[1];
        var v = {
          x: 0,
          y: 0
        };
        return v[p] = l[p] + d + c[p], v[g] = Math.max(l[g], c[g]), v[m] = Math.min(0, c[m] + f[1 - h]), v;
      }
      return a.x = u[0], a.y = u[1], this.group.getBoundingRect();
    }, t.prototype.remove = function () {
      this.getContentGroup().removeAll(), this._isFirstRender = !0;
    }, t.type = "legend.plain", t;
  }(_["a"]);
function C(e, t, n, r, i, o, a) {
  function s(e, t) {
    "auto" === e.lineWidth && (e.lineWidth = t.lineWidth > 0 ? 2 : 0), k(e, function (n, r) {
      "inherit" === e[r] && (e[r] = t[r]);
    });
  }
  var l = t.getModel("itemStyle"),
    u = l.getItemStyle(),
    c = 0 === e.lastIndexOf("empty", 0) ? "fill" : "stroke",
    f = l.getShallow("decal");
  u.decal = f && "inherit" !== f ? Object(O["a"])(f, a) : r.decal, "inherit" === u.fill && (u.fill = r[i]), "inherit" === u.stroke && (u.stroke = r[c]), "inherit" === u.opacity && (u.opacity = ("fill" === i ? r : n).opacity), s(u, r);
  var d = t.getModel("lineStyle"),
    h = d.getLineStyle();
  if (s(h, n), "auto" === u.fill && (u.fill = r.fill), "auto" === u.stroke && (u.stroke = r.fill), "auto" === h.stroke && (h.stroke = r.fill), !o) {
    var p = t.get("inactiveBorderWidth"),
      g = u[c];
    u.lineWidth = "auto" === p ? r.lineWidth > 0 && g ? 2 : 0 : u.lineWidth, u.fill = t.get("inactiveColor"), u.stroke = t.get("inactiveBorderColor"), h.stroke = d.get("inactiveColor"), h.lineWidth = d.get("inactiveWidth");
  }
  return {
    itemStyle: u,
    lineStyle: h
  };
}
function T(e) {
  var t = e.icon || "roundRect",
    n = Object(w["a"])(t, 0, 0, e.itemWidth, e.itemHeight, e.itemStyle.fill, e.symbolKeepAspect);
  return n.setStyle(e.itemStyle), n.rotation = (e.iconRotate || 0) * Math.PI / 180, n.setOrigin([e.itemWidth / 2, e.itemHeight / 2]), t.indexOf("empty") > -1 && (n.style.stroke = n.style.fill, n.style.fill = "#fff", n.style.lineWidth = 2), n;
}
function I(e, t, n, r) {
  E(e, t, n, r), n.dispatchAction({
    type: "legendToggleSelect",
    name: null != e ? e : t
  }), A(e, t, n, r);
}
function D(e) {
  var t,
    n = e.getZr().storage.getDisplayList(),
    r = 0,
    i = n.length;
  while (r < i && !(t = n[r].states.emphasis)) r++;
  return t && t.hoverLayer;
}
function A(e, t, n, r) {
  D(n) || n.dispatchAction({
    type: "highlight",
    seriesName: e,
    name: t,
    excludeSeriesId: r
  });
}
function E(e, t, n, r) {
  D(n) || n.dispatchAction({
    type: "downplay",
    seriesName: e,
    name: t,
    excludeSeriesId: r
  });
}
var P = M;
function L(e) {
  var t = e.findComponents({
    mainType: "legend"
  });
  t && t.length && e.filterSeries(function (e) {
    for (var n = 0; n < t.length; n++) if (!t[n].isSelected(e.name)) return !1;
    return !0;
  });
}
function N(e, t, n) {
  var r,
    i = {},
    a = "toggleSelected" === e;
  return n.eachComponent("legend", function (n) {
    a && null != r ? n[r ? "select" : "unSelect"](t.name) : "allSelect" === e || "inverseSelect" === e ? n[e]() : (n[e](t.name), r = n.isSelected(t.name));
    var s = n.getData();
    Object(o["j"])(s, function (e) {
      var t = e.get("name");
      if ("\n" !== t && "" !== t) {
        var r = n.isSelected(t);
        i.hasOwnProperty(t) ? i[t] = i[t] && r : i[t] = r;
      }
    });
  }), "allSelect" === e || "inverseSelect" === e ? {
    selected: i
  } : {
    name: t.name,
    selected: i
  };
}
function R(e) {
  e.registerAction("legendToggleSelect", "legendselectchanged", Object(o["h"])(N, "toggleSelected")), e.registerAction("legendAllSelect", "legendselectall", Object(o["h"])(N, "allSelect")), e.registerAction("legendInverseSelect", "legendinverseselect", Object(o["h"])(N, "inverseSelect")), e.registerAction("legendSelect", "legendselected", Object(o["h"])(N, "select")), e.registerAction("legendUnSelect", "legendunselected", Object(o["h"])(N, "unSelect"));
}
function z(e) {
  e.registerComponentModel(f), e.registerComponentView(P), e.registerProcessor(e.PRIORITY.PROCESSOR.SERIES_FILTER, L), e.registerSubTypeDefaulter("legend", function () {
    return "plain";
  }), R(e);
}
var F = require("./69526a57.js"),
  B = function (e) {
    function t() {
      var n = null !== e && e.apply(this, arguments) || this;
      return n.type = t.type, n;
    }
    return Object(i["a"])(t, e), t.prototype.setScrollDataIndex = function (e) {
      this.option.scrollDataIndex = e;
    }, t.prototype.init = function (t, n, r) {
      var i = Object(x["c"])(t);
      e.prototype.init.call(this, t, n, r), Y(this, t, i);
    }, t.prototype.mergeOption = function (t, n) {
      e.prototype.mergeOption.call(this, t, n), Y(this, this.option, t);
    }, t.type = "legend.scroll", t.defaultOption = Object(F["d"])(f.defaultOption, {
      scrollDataIndex: 0,
      pageButtonItemGap: 5,
      pageButtonGap: null,
      pageButtonPosition: "end",
      pageFormatter: "{current}/{total}",
      pageIcons: {
        horizontal: ["M0,0L12,-10L12,10z", "M0,0L-12,-10L-12,10z"],
        vertical: ["M0,0L20,0L10,-20z", "M0,0L20,0L10,20z"]
      },
      pageIconColor: "#2f4554",
      pageIconInactiveColor: "#aaa",
      pageIconSize: 15,
      pageTextStyle: {
        color: "#333"
      },
      animationDurationUpdate: 800
    }), t;
  }(f);
function Y(e, t, n) {
  var r = e.getOrient(),
    i = [1, 1];
  i[r.index] = 0, Object(x["e"])(t, n, {
    type: "box",
    ignoreSize: !!i
  });
}
var V = B,
  G = require("./33736f46.js"),
  W = h["a"],
  U = ["width", "height"],
  H = ["x", "y"],
  q = function (e) {
    function t() {
      var n = null !== e && e.apply(this, arguments) || this;
      return n.type = t.type, n.newlineDisabled = !0, n._currentIndex = 0, n;
    }
    return Object(i["a"])(t, e), t.prototype.init = function () {
      e.prototype.init.call(this), this.group.add(this._containerGroup = new W()), this._containerGroup.add(this.getContentGroup()), this.group.add(this._controllerGroup = new W());
    }, t.prototype.resetInner = function () {
      e.prototype.resetInner.call(this), this._controllerGroup.removeAll(), this._containerGroup.removeClipPath(), this._containerGroup.__rectSize = null;
    }, t.prototype.renderInner = function (t, n, r, i, a, s, l) {
      var u = this;
      e.prototype.renderInner.call(this, t, n, r, i, a, s, l);
      var c = this._controllerGroup,
        f = n.get("pageIconSize", !0),
        d = o["r"](f) ? f : [f, f];
      g("pagePrev", 0);
      var h = n.getModel("pageTextStyle");
      function g(e, t) {
        var r = e + "DataIndex",
          a = m["createIcon"](n.get("pageIcons", !0)[n.getOrient().name][t], {
            onclick: o["c"](u._pageGo, u, r, n, i)
          }, {
            x: -d[0] / 2,
            y: -d[1] / 2,
            width: d[0],
            height: d[1]
          });
        a.name = e, c.add(a);
      }
      c.add(new p["a"]({
        name: "pageText",
        style: {
          text: "xx/xx",
          fill: h.getTextColor(),
          font: h.getFont(),
          verticalAlign: "middle",
          align: "center"
        },
        silent: !0
      })), g("pageNext", 1);
    }, t.prototype.layoutInner = function (e, t, n, r, i, a) {
      var s = this.getSelectorGroup(),
        l = e.getOrient().index,
        u = U[l],
        c = H[l],
        f = U[1 - l],
        d = H[1 - l];
      i && x["a"]("horizontal", s, e.get("selectorItemGap", !0));
      var h = e.get("selectorButtonGap", !0),
        p = s.getBoundingRect(),
        g = [-p.x, -p.y],
        m = o["d"](n);
      i && (m[u] = n[u] - p[u] - h);
      var v = this._layoutContentAndController(e, r, m, l, u, f, d, c);
      if (i) {
        if ("end" === a) g[l] += v[u] + h;else {
          var y = p[u] + h;
          g[l] -= y, v[c] -= y;
        }
        v[u] += p[u] + h, g[1 - l] += v[d] + v[f] / 2 - p[f] / 2, v[f] = Math.max(v[f], p[f]), v[d] = Math.min(v[d], p[d] + g[1 - l]), s.x = g[0], s.y = g[1], s.markRedraw();
      }
      return v;
    }, t.prototype._layoutContentAndController = function (e, t, n, r, i, a, s, l) {
      var u = this.getContentGroup(),
        c = this._containerGroup,
        f = this._controllerGroup;
      x["a"](e.get("orient"), u, e.get("itemGap"), r ? n.width : null, r ? null : n.height), x["a"]("horizontal", f, e.get("pageButtonItemGap", !0));
      var d = u.getBoundingRect(),
        h = f.getBoundingRect(),
        p = this._showController = d[i] > n[i],
        m = [-d.x, -d.y];
      t || (m[r] = u[l]);
      var v = [0, 0],
        y = [-h.x, -h.y],
        b = o["K"](e.get("pageButtonGap", !0), e.get("itemGap", !0));
      if (p) {
        var _ = e.get("pageButtonPosition", !0);
        "end" === _ ? y[r] += n[i] - h[i] : v[r] += h[i] + b;
      }
      y[1 - r] += d[a] / 2 - h[a] / 2, u.setPosition(m), c.setPosition(v), f.setPosition(y);
      var w = {
        x: 0,
        y: 0
      };
      if (w[i] = p ? n[i] : d[i], w[a] = Math.max(d[a], h[a]), w[s] = Math.min(0, h[s] + y[1 - r]), c.__rectSize = n[i], p) {
        var O = {
          x: 0,
          y: 0
        };
        O[i] = Math.max(n[i] - h[i] - b, 0), O[a] = w[a], c.setClipPath(new g["a"]({
          shape: O
        })), c.__rectSize = O[i];
      } else f.eachChild(function (e) {
        e.attr({
          invisible: !0,
          silent: !0
        });
      });
      var S = this._getPageInfo(e);
      return null != S.pageIndex && G["h"](u, {
        x: S.contentPosition[0],
        y: S.contentPosition[1]
      }, p ? e : null), this._updatePageInfoView(e, S), w;
    }, t.prototype._pageGo = function (e, t, n) {
      var r = this._getPageInfo(t)[e];
      null != r && n.dispatchAction({
        type: "legendScroll",
        scrollDataIndex: r,
        legendId: t.id
      });
    }, t.prototype._updatePageInfoView = function (e, t) {
      var n = this._controllerGroup;
      o["j"](["pagePrev", "pageNext"], function (r) {
        var i = r + "DataIndex",
          o = null != t[i],
          a = n.childOfName(r);
        a && (a.setStyle("fill", o ? e.get("pageIconColor", !0) : e.get("pageIconInactiveColor", !0)), a.cursor = o ? "pointer" : "default");
      });
      var r = n.childOfName("pageText"),
        i = e.get("pageFormatter"),
        a = t.pageIndex,
        s = null != a ? a + 1 : 0,
        l = t.pageCount;
      r && i && r.setStyle("text", o["y"](i) ? i.replace("{current}", null == s ? "" : s + "").replace("{total}", null == l ? "" : l + "") : i({
        current: s,
        total: l
      }));
    }, t.prototype._getPageInfo = function (e) {
      var t = e.get("scrollDataIndex", !0),
        n = this.getContentGroup(),
        r = this._containerGroup.__rectSize,
        i = e.getOrient().index,
        o = U[i],
        a = H[i],
        s = this._findTargetItemIndex(t),
        l = n.children(),
        u = l[s],
        c = l.length,
        f = c ? 1 : 0,
        d = {
          contentPosition: [n.x, n.y],
          pageCount: f,
          pageIndex: f - 1,
          pagePrevDataIndex: null,
          pageNextDataIndex: null
        };
      if (!u) return d;
      var h = y(u);
      d.contentPosition[i] = -h.s;
      for (var p = s + 1, g = h, m = h, v = null; p <= c; ++p) v = y(l[p]), (!v && m.e > g.s + r || v && !b(v, g.s)) && (g = m.i > g.i ? m : v, g && (null == d.pageNextDataIndex && (d.pageNextDataIndex = g.i), ++d.pageCount)), m = v;
      for (p = s - 1, g = h, m = h, v = null; p >= -1; --p) v = y(l[p]), v && b(m, v.s) || !(g.i < m.i) || (m = g, null == d.pagePrevDataIndex && (d.pagePrevDataIndex = g.i), ++d.pageCount, ++d.pageIndex), g = v;
      return d;
      function y(e) {
        if (e) {
          var t = e.getBoundingRect(),
            n = t[a] + e[a];
          return {
            s: n,
            e: n + t[o],
            i: e.__legendDataIndex
          };
        }
      }
      function b(e, t) {
        return e.e >= t && e.s <= t + r;
      }
    }, t.prototype._findTargetItemIndex = function (e) {
      if (!this._showController) return 0;
      var t,
        n,
        r = this.getContentGroup();
      return r.eachChild(function (r, i) {
        var o = r.__legendDataIndex;
        null == n && null != o && (n = i), o === e && (t = i);
      }), null != t ? t : n;
    }, t.type = "legend.scroll", t;
  }(P),
  K = q;
function Z(e) {
  e.registerAction("legendScroll", "legendscroll", function (e, t) {
    var n = e.scrollDataIndex;
    null != n && t.eachComponent({
      mainType: "legend",
      subType: "scroll",
      query: e
    }, function (e) {
      e.setScrollDataIndex(n);
    });
  });
}
function X(e) {
  Object(r["a"])(z), e.registerComponentModel(V), e.registerComponentView(K), Z(e);
}
function Q(e) {
  Object(r["a"])(z), Object(r["a"])(X);
}
defineExport(legacyExports, "a", function () {
  return Q;
});
