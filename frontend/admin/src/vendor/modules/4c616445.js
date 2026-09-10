let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
var r = require("./7231774e.js"),
  i = require("./4972526e.js"),
  o = require("./6d725347.js"),
  a = require("./624c6677.js"),
  s = function (e) {
    function t() {
      var n = null !== e && e.apply(this, arguments) || this;
      return n.type = t.type, n;
    }
    return Object(o["a"])(t, e), t.type = "tooltip", t.dependencies = ["axisPointer"], t.defaultOption = {
      z: 60,
      show: !0,
      showContent: !0,
      trigger: "item",
      triggerOn: "mousemove|click",
      alwaysShowContent: !1,
      displayMode: "single",
      renderMode: "auto",
      confine: null,
      showDelay: 0,
      hideDelay: 100,
      transitionDuration: .4,
      enterable: !1,
      backgroundColor: "#fff",
      shadowBlur: 10,
      shadowColor: "rgba(0, 0, 0, .2)",
      shadowOffsetX: 1,
      shadowOffsetY: 2,
      borderRadius: 4,
      borderWidth: 1,
      padding: null,
      extraCssText: "",
      axisPointer: {
        type: "line",
        axis: "auto",
        animation: "auto",
        animationDurationUpdate: 200,
        animationEasingUpdate: "exponentialOut",
        crossStyle: {
          color: "#999",
          width: 1,
          type: "dashed",
          textStyle: {}
        }
      },
      textStyle: {
        color: "#666",
        fontSize: 14
      }
    }, t;
  }(a["a"]),
  l = s,
  u = require("./62597459.js"),
  c = require("./49744746.js"),
  f = require("./59483231.js"),
  d = require("./5a653132.js"),
  h = require("./37614b42.js");
function p(e) {
  var t = e.get("confine");
  return null != t ? !!t : "richText" === e.get("renderMode");
}
function g(e) {
  if (c["a"].domSupported) for (var t = document.documentElement.style, n = 0, r = e.length; n < r; n++) if (e[n] in t) return e[n];
}
var m = g(["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]),
  v = g(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]);
function y(e, t) {
  if (!e) return t;
  t = Object(h["g"])(t, !0);
  var n = e.indexOf(t);
  return e = -1 === n ? t : "-" + e.slice(0, n) + "-" + t, e.toLowerCase();
}
function b(e, t) {
  var n = e.currentStyle || document.defaultView && document.defaultView.getComputedStyle(e);
  return n ? t ? n[t] : n : null;
}
var x = require("./49587a71.js"),
  _ = y(v, "transition"),
  w = y(m, "transform"),
  O = "position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;" + (c["a"].transform3dSupported ? "will-change:transform;" : "");
function S(e) {
  return e = "left" === e ? "right" : "right" === e ? "left" : "top" === e ? "bottom" : "top", e;
}
function k(e, t, n) {
  if (!Object(u["y"])(n) || "inside" === n) return "";
  var r = e.get("backgroundColor"),
    i = e.get("borderWidth");
  t = Object(h["b"])(t);
  var o,
    a = S(n),
    s = Math.max(1.5 * Math.round(i), 6),
    l = "",
    c = w + ":";
  Object(u["p"])(["left", "right"], a) > -1 ? (l += "top:50%", c += "translateY(-50%) rotate(" + (o = "left" === a ? -225 : -45) + "deg)") : (l += "left:50%", c += "translateX(-50%) rotate(" + (o = "top" === a ? 225 : 45) + "deg)");
  var f = o * Math.PI / 180,
    d = s + i,
    p = d * Math.abs(Math.cos(f)) + d * Math.abs(Math.sin(f)),
    g = Math.round(100 * ((p - Math.SQRT2 * i) / 2 + Math.SQRT2 * i - (p - d) / 2)) / 100;
  l += ";" + a + ":-" + g + "px";
  var m = t + " solid " + i + "px;",
    v = ["position:absolute;width:" + s + "px;height:" + s + "px;", l + ";" + c + ";", "border-bottom:" + m, "border-right:" + m, "background-color:" + r + ";"];
  return '<div style="' + v.join("") + '"></div>';
}
function j(e, t) {
  var n = "cubic-bezier(0.23,1,0.32,1)",
    r = " " + e / 2 + "s " + n,
    i = "opacity" + r + ",visibility" + r;
  return t || (r = " " + e + "s " + n, i += c["a"].transformSupported ? "," + w + r : ",left" + r + ",top" + r), _ + ":" + i;
}
function M(e, t, n) {
  var r = e.toFixed(0) + "px",
    i = t.toFixed(0) + "px";
  if (!c["a"].transformSupported) return n ? "top:" + i + ";left:" + r + ";" : [["top", i], ["left", r]];
  var o = c["a"].transform3dSupported,
    a = "translate" + (o ? "3d" : "") + "(" + r + "," + i + (o ? ",0" : "") + ")";
  return n ? "top:0;left:0;" + w + ":" + a + ";" : [["top", 0], ["left", 0], [m, a]];
}
function C(e) {
  var t = [],
    n = e.get("fontSize"),
    r = e.getTextColor();
  r && t.push("color:" + r), t.push("font:" + e.getFont()), n && t.push("line-height:" + Math.round(3 * n / 2) + "px");
  var i = e.get("textShadowColor"),
    o = e.get("textShadowBlur") || 0,
    a = e.get("textShadowOffsetX") || 0,
    s = e.get("textShadowOffsetY") || 0;
  return i && o && t.push("text-shadow:" + a + "px " + s + "px " + o + "px " + i), Object(u["j"])(["decoration", "align"], function (n) {
    var r = e.get(n);
    r && t.push("text-" + n + ":" + r);
  }), t.join(";");
}
function T(e, t, n) {
  var r = [],
    i = e.get("transitionDuration"),
    o = e.get("backgroundColor"),
    a = e.get("shadowBlur"),
    s = e.get("shadowColor"),
    l = e.get("shadowOffsetX"),
    c = e.get("shadowOffsetY"),
    f = e.getModel("textStyle"),
    d = Object(x["d"])(e, "html"),
    p = l + "px " + c + "px " + a + "px " + s;
  return r.push("box-shadow:" + p), t && i && r.push(j(i, n)), o && r.push("background-color:" + o), Object(u["j"])(["width", "color", "radius"], function (t) {
    var n = "border-" + t,
      i = Object(h["g"])(n),
      o = e.get(i);
    null != o && r.push(n + ":" + o + ("color" === t ? "" : "px"));
  }), r.push(C(f)), null != d && r.push("padding:" + Object(h["f"])(d).join("px ") + "px"), r.join(";") + ";";
}
function I(e, t, n, r, i) {
  var o = t && t.painter;
  if (n) {
    var a = o && o.getViewportRoot();
    a && Object(d["d"])(e, a, document.body, r, i);
  } else {
    e[0] = r, e[1] = i;
    var s = o && o.getViewportRootOffset();
    s && (e[0] += s.offsetLeft, e[1] += s.offsetTop);
  }
  e[2] = e[0] / t.getWidth(), e[3] = e[1] / t.getHeight();
}
var D = function () {
    function e(e, t, n) {
      if (this._show = !1, this._styleCoord = [0, 0, 0, 0], this._enterable = !0, this._firstShow = !0, this._longHide = !0, c["a"].wxa) return null;
      var r = document.createElement("div");
      r.domBelongToZr = !0, this.el = r;
      var i = this._zr = t.getZr(),
        o = this._appendToBody = n && n.appendToBody;
      I(this._styleCoord, i, o, t.getWidth() / 2, t.getHeight() / 2), o ? document.body.appendChild(r) : e.appendChild(r), this._container = e;
      var a = this;
      r.onmouseenter = function () {
        a._enterable && (clearTimeout(a._hideTimeout), a._show = !0), a._inContent = !0;
      }, r.onmousemove = function (e) {
        if (e = e || window.event, !a._enterable) {
          var t = i.handler,
            n = i.painter.getViewportRoot();
          Object(f["d"])(n, e, !0), t.dispatch("mousemove", e);
        }
      }, r.onmouseleave = function () {
        a._inContent = !1, a._enterable && a._show && a.hideLater(a._hideDelay);
      };
    }
    return e.prototype.update = function (e) {
      var t = this._container,
        n = b(t, "position"),
        r = t.style;
      "absolute" !== r.position && "absolute" !== n && (r.position = "relative");
      var i = e.get("alwaysShowContent");
      i && this._moveIfResized(), this.el.className = e.get("className") || "";
    }, e.prototype.show = function (e, t) {
      clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout);
      var n = this.el,
        r = n.style,
        i = this._styleCoord;
      n.innerHTML ? r.cssText = O + T(e, !this._firstShow, this._longHide) + M(i[0], i[1], !0) + "border-color:" + Object(h["b"])(t) + ";" + (e.get("extraCssText") || "") + ";pointer-events:" + (this._enterable ? "auto" : "none") : r.display = "none", this._show = !0, this._firstShow = !1, this._longHide = !1;
    }, e.prototype.setContent = function (e, t, n, r, i) {
      var o = this.el;
      if (null != e) {
        var a = "";
        if (Object(u["y"])(i) && "item" === n.get("trigger") && !p(n) && (a = k(n, r, i)), Object(u["y"])(e)) o.innerHTML = e + a;else if (e) {
          o.innerHTML = "", Object(u["r"])(e) || (e = [e]);
          for (var s = 0; s < e.length; s++) Object(u["t"])(e[s]) && e[s].parentNode !== o && o.appendChild(e[s]);
          if (a && o.childNodes.length) {
            var l = document.createElement("div");
            l.innerHTML = a, o.appendChild(l);
          }
        }
      } else o.innerHTML = "";
    }, e.prototype.setEnterable = function (e) {
      this._enterable = e;
    }, e.prototype.getSize = function () {
      var e = this.el;
      return [e.offsetWidth, e.offsetHeight];
    }, e.prototype.moveTo = function (e, t) {
      var n = this._styleCoord;
      if (I(n, this._zr, this._appendToBody, e, t), null != n[0] && null != n[1]) {
        var r = this.el.style,
          i = M(n[0], n[1]);
        Object(u["j"])(i, function (e) {
          r[e[0]] = e[1];
        });
      }
    }, e.prototype._moveIfResized = function () {
      var e = this._styleCoord[2],
        t = this._styleCoord[3];
      this.moveTo(e * this._zr.getWidth(), t * this._zr.getHeight());
    }, e.prototype.hide = function () {
      var e = this,
        t = this.el.style;
      t.visibility = "hidden", t.opacity = "0", c["a"].transform3dSupported && (t.willChange = ""), this._show = !1, this._longHideTimeout = setTimeout(function () {
        return e._longHide = !0;
      }, 500);
    }, e.prototype.hideLater = function (e) {
      !this._show || this._inContent && this._enterable || (e ? (this._hideDelay = e, this._show = !1, this._hideTimeout = setTimeout(Object(u["c"])(this.hide, this), e)) : this.hide());
    }, e.prototype.isShow = function () {
      return this._show;
    }, e.prototype.dispose = function () {
      this.el.parentNode.removeChild(this.el);
    }, e;
  }(),
  A = D,
  E = require("./64715547.js"),
  P = require("./37613470.js"),
  L = function () {
    function e(e) {
      this._show = !1, this._styleCoord = [0, 0, 0, 0], this._enterable = !0, this._zr = e.getZr(), z(this._styleCoord, this._zr, e.getWidth() / 2, e.getHeight() / 2);
    }
    return e.prototype.update = function (e) {
      var t = e.get("alwaysShowContent");
      t && this._moveIfResized();
    }, e.prototype.show = function () {
      this._hideTimeout && clearTimeout(this._hideTimeout), this.el.show(), this._show = !0;
    }, e.prototype.setContent = function (e, t, n, r, i) {
      var o = this;
      u["x"](e) && Object(P["c"])(""), this.el && this._zr.remove(this.el);
      var a = n.getModel("textStyle");
      this.el = new E["a"]({
        style: {
          rich: t.richTextStyles,
          text: e,
          lineHeight: 22,
          borderWidth: 1,
          borderColor: r,
          textShadowColor: a.get("textShadowColor"),
          fill: n.get(["textStyle", "color"]),
          padding: Object(x["d"])(n, "richText"),
          verticalAlign: "top",
          align: "left"
        },
        z: n.get("z")
      }), u["j"](["backgroundColor", "borderRadius", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"], function (e) {
        o.el.style[e] = n.get(e);
      }), u["j"](["textShadowBlur", "textShadowOffsetX", "textShadowOffsetY"], function (e) {
        o.el.style[e] = a.get(e) || 0;
      }), this._zr.add(this.el);
      var s = this;
      this.el.on("mouseover", function () {
        s._enterable && (clearTimeout(s._hideTimeout), s._show = !0), s._inContent = !0;
      }), this.el.on("mouseout", function () {
        s._enterable && s._show && s.hideLater(s._hideDelay), s._inContent = !1;
      });
    }, e.prototype.setEnterable = function (e) {
      this._enterable = e;
    }, e.prototype.getSize = function () {
      var e = this.el,
        t = this.el.getBoundingRect(),
        n = R(e.style);
      return [t.width + n.left + n.right, t.height + n.top + n.bottom];
    }, e.prototype.moveTo = function (e, t) {
      var n = this.el;
      if (n) {
        var r = this._styleCoord;
        z(r, this._zr, e, t), e = r[0], t = r[1];
        var i = n.style,
          o = N(i.borderWidth || 0),
          a = R(i);
        n.x = e + o + a.left, n.y = t + o + a.top, n.markRedraw();
      }
    }, e.prototype._moveIfResized = function () {
      var e = this._styleCoord[2],
        t = this._styleCoord[3];
      this.moveTo(e * this._zr.getWidth(), t * this._zr.getHeight());
    }, e.prototype.hide = function () {
      this.el && this.el.hide(), this._show = !1;
    }, e.prototype.hideLater = function (e) {
      !this._show || this._inContent && this._enterable || (e ? (this._hideDelay = e, this._show = !1, this._hideTimeout = setTimeout(u["c"](this.hide, this), e)) : this.hide());
    }, e.prototype.isShow = function () {
      return this._show;
    }, e.prototype.dispose = function () {
      this._zr.remove(this.el);
    }, e;
  }();
function N(e) {
  return Math.max(0, e);
}
function R(e) {
  var t = N(e.shadowBlur || 0),
    n = N(e.shadowOffsetX || 0),
    r = N(e.shadowOffsetY || 0);
  return {
    left: N(t - n),
    right: N(t + n),
    top: N(t - r),
    bottom: N(t + r)
  };
}
function z(e, t, n, r) {
  e[0] = n, e[1] = r, e[2] = e[0] / t.getWidth(), e[3] = e[1] / t.getHeight();
}
var F = L,
  B = require("./4f454c42.js"),
  Y = require("./78364b74.js"),
  V = require("./457a3244.js"),
  G = require("./2b54542f.js"),
  W = require("./51786b74.js"),
  U = require("./46396247.js"),
  H = require("./6158377a.js"),
  q = require("./2f79374e.js"),
  K = require("./344e4f34.js"),
  Z = require("./73532f72.js"),
  X = require("./2b486175.js"),
  Q = require("./6868784b.js"),
  $ = require("./4f4b4a32.js"),
  J = require("./2b743052.js"),
  ee = require("./694c4e76.js"),
  te = new Y["a"]({
    shape: {
      x: -1,
      y: -1,
      width: 2,
      height: 2
    }
  }),
  ne = function (e) {
    function t() {
      var n = null !== e && e.apply(this, arguments) || this;
      return n.type = t.type, n;
    }
    return Object(o["a"])(t, e), t.prototype.init = function (e, t) {
      if (!c["a"].node && t.getDom()) {
        var n = e.getComponent("tooltip"),
          r = this._renderMode = Object(K["h"])(n.get("renderMode"));
        this._tooltipContent = "richText" === r ? new F(t) : new A(t.getDom(), t, {
          appendToBody: n.get("appendToBody", !0)
        });
      }
    }, t.prototype.render = function (e, t, n) {
      if (!c["a"].node && n.getDom()) {
        this.group.removeAll(), this._tooltipModel = e, this._ecModel = t, this._api = n, this._alwaysShowContent = e.get("alwaysShowContent");
        var r = this._tooltipContent;
        r.update(e), r.setEnterable(e.get("enterable")), this._initGlobalListener(), this._keepShow(), "richText" !== this._renderMode && e.get("transitionDuration") ? Object(ee["b"])(this, "_updatePosition", 50, "fixRate") : Object(ee["a"])(this, "_updatePosition");
      }
    }, t.prototype._initGlobalListener = function () {
      var e = this._tooltipModel,
        t = e.get("triggerOn");
      U["a"]("itemTooltip", this._api, Object(u["c"])(function (e, n, r) {
        "none" !== t && (t.indexOf(e) >= 0 ? this._tryShow(n, r) : "leave" === e && this._hide(r));
      }, this));
    }, t.prototype._keepShow = function () {
      var e = this._tooltipModel,
        t = this._ecModel,
        n = this._api,
        r = e.get("triggerOn");
      if (null != this._lastX && null != this._lastY && "none" !== r && "click" !== r) {
        var i = this;
        clearTimeout(this._refreshUpdateTimeout), this._refreshUpdateTimeout = setTimeout(function () {
          !n.isDisposed() && i.manuallyShowTip(e, t, n, {
            x: i._lastX,
            y: i._lastY,
            dataByCoordSys: i._lastDataByCoordSys
          });
        });
      }
    }, t.prototype.manuallyShowTip = function (e, t, n, r) {
      if (r.from !== this.uid && !c["a"].node && n.getDom()) {
        var i = ie(r, n);
        this._ticket = "";
        var o = r.dataByCoordSys,
          a = ue(r, t, n);
        if (a) {
          var s = a.el.getBoundingRect().clone();
          s.applyTransform(a.el.transform), this._tryShow({
            offsetX: s.x + s.width / 2,
            offsetY: s.y + s.height / 2,
            target: a.el,
            position: r.position,
            positionDefault: "bottom"
          }, i);
        } else if (r.tooltip && null != r.x && null != r.y) {
          var l = te;
          l.x = r.x, l.y = r.y, l.update(), Object(Q["a"])(l).tooltipConfig = {
            name: null,
            option: r.tooltip
          }, this._tryShow({
            offsetX: r.x,
            offsetY: r.y,
            target: l
          }, i);
        } else if (o) this._tryShow({
          offsetX: r.x,
          offsetY: r.y,
          position: r.position,
          dataByCoordSys: o,
          tooltipOption: r.tooltipOption
        }, i);else if (null != r.seriesIndex) {
          if (this._manuallyAxisShowTip(e, t, n, r)) return;
          var u = Object(V["a"])(r, t),
            f = u.point[0],
            d = u.point[1];
          null != f && null != d && this._tryShow({
            offsetX: f,
            offsetY: d,
            target: u.el,
            position: r.position,
            positionDefault: "bottom"
          }, i);
        } else null != r.x && null != r.y && (n.dispatchAction({
          type: "updateAxisPointer",
          x: r.x,
          y: r.y
        }), this._tryShow({
          offsetX: r.x,
          offsetY: r.y,
          position: r.position,
          target: n.getZr().findHover(r.x, r.y).target
        }, i));
      }
    }, t.prototype.manuallyHideTip = function (e, t, n, r) {
      var i = this._tooltipContent;
      !this._alwaysShowContent && this._tooltipModel && i.hideLater(this._tooltipModel.get("hideDelay")), this._lastX = this._lastY = this._lastDataByCoordSys = null, r.from !== this.uid && this._hide(ie(r, n));
    }, t.prototype._manuallyAxisShowTip = function (e, t, n, r) {
      var i = r.seriesIndex,
        o = r.dataIndex,
        a = t.getComponent("axisPointer").coordSysAxesInfo;
      if (null != i && null != o && null != a) {
        var s = t.getSeriesByIndex(i);
        if (s) {
          var l = s.getData(),
            u = re([l.getItemModel(o), s, (s.coordinateSystem || {}).model], this._tooltipModel);
          if ("axis" === u.get("trigger")) return n.dispatchAction({
            type: "updateAxisPointer",
            seriesIndex: i,
            dataIndex: o,
            position: r.position
          }), !0;
        }
      }
    }, t.prototype._tryShow = function (e, t) {
      var n = e.target,
        r = this._tooltipModel;
      if (r) {
        this._lastX = e.offsetX, this._lastY = e.offsetY;
        var i = e.dataByCoordSys;
        if (i && i.length) this._showAxisTooltip(i, e);else if (n) {
          var o, a;
          this._lastDataByCoordSys = null, Object(J["a"])(n, function (e) {
            return null != Object(Q["a"])(e).dataIndex ? (o = e, !0) : null != Object(Q["a"])(e).tooltipConfig ? (a = e, !0) : void 0;
          }, !0), o ? this._showSeriesItemTooltip(e, o, t) : a ? this._showComponentItemTooltip(e, a, t) : this._hide(t);
        } else this._lastDataByCoordSys = null, this._hide(t);
      }
    }, t.prototype._showOrMove = function (e, t) {
      var n = e.get("showDelay");
      t = Object(u["c"])(t, this), clearTimeout(this._showTimout), n > 0 ? this._showTimout = setTimeout(t, n) : t();
    }, t.prototype._showAxisTooltip = function (e, t) {
      var n = this._ecModel,
        r = this._tooltipModel,
        i = [t.offsetX, t.offsetY],
        o = re([t.tooltipOption], r),
        a = this._renderMode,
        s = [],
        l = Object(x["c"])("section", {
          blocks: [],
          noHeader: !0
        }),
        c = [],
        f = new x["a"]();
      Object(u["j"])(e, function (e) {
        Object(u["j"])(e.dataByAxis, function (e) {
          var t = n.getComponent(e.axisDim + "Axis", e.axisIndex),
            i = e.value;
          if (t && null != i) {
            var o = q["d"](i, t.axis, n, e.seriesDataIndices, e.valueLabelOpt),
              d = Object(x["c"])("section", {
                header: o,
                noHeader: !Object(u["O"])(o),
                sortBlocks: !0,
                blocks: []
              });
            l.blocks.push(d), Object(u["j"])(e.seriesDataIndices, function (l) {
              var p = n.getSeriesByIndex(l.seriesIndex),
                g = l.dataIndexInside,
                m = p.getDataParams(g);
              if (!(m.dataIndex < 0)) {
                m.axisDim = e.axisDim, m.axisIndex = e.axisIndex, m.axisType = e.axisType, m.axisId = e.axisId, m.axisValue = H["c"](t.axis, {
                  value: i
                }), m.axisValueLabel = o, m.marker = f.makeTooltipMarker("item", Object(h["b"])(m.color), a);
                var v = Object($["b"])(p.formatTooltip(g, !0, null)),
                  y = v.frag;
                if (y) {
                  var b = re([p], r).get("valueFormatter");
                  d.blocks.push(b ? Object(u["l"])({
                    valueFormatter: b
                  }, y) : y);
                }
                v.text && c.push(v.text), s.push(m);
              }
            });
          }
        });
      }), l.blocks.reverse(), c.reverse();
      var d = t.position,
        p = o.get("order"),
        g = Object(x["b"])(l, f, a, p, n.get("useUTC"), o.get("textStyle"));
      g && c.unshift(g);
      var m = "richText" === a ? "\n\n" : "<br/>",
        v = c.join(m);
      this._showOrMove(o, function () {
        this._updateContentNotChangedOnAxis(e, s) ? this._updatePosition(o, d, i[0], i[1], this._tooltipContent, s) : this._showTooltipContent(o, v, s, Math.random() + "", i[0], i[1], d, null, f);
      });
    }, t.prototype._showSeriesItemTooltip = function (e, t, n) {
      var r = this._ecModel,
        i = Object(Q["a"])(t),
        o = i.seriesIndex,
        a = r.getSeriesByIndex(o),
        s = i.dataModel || a,
        l = i.dataIndex,
        c = i.dataType,
        f = s.getData(c),
        d = this._renderMode,
        p = e.positionDefault,
        g = re([f.getItemModel(l), s, a && (a.coordinateSystem || {}).model], this._tooltipModel, p ? {
          position: p
        } : null),
        m = g.get("trigger");
      if (null == m || "item" === m) {
        var v = s.getDataParams(l, c),
          y = new x["a"]();
        v.marker = y.makeTooltipMarker("item", Object(h["b"])(v.color), d);
        var b = Object($["b"])(s.formatTooltip(l, !1, c)),
          _ = g.get("order"),
          w = g.get("valueFormatter"),
          O = b.frag,
          S = O ? Object(x["b"])(w ? Object(u["l"])({
            valueFormatter: w
          }, O) : O, y, d, _, r.get("useUTC"), g.get("textStyle")) : b.text,
          k = "item_" + s.name + "_" + l;
        this._showOrMove(g, function () {
          this._showTooltipContent(g, S, v, k, e.offsetX, e.offsetY, e.position, e.target, y);
        }), n({
          type: "showTip",
          dataIndexInside: l,
          dataIndex: f.getRawIndex(l),
          seriesIndex: o,
          from: this.uid
        });
      }
    }, t.prototype._showComponentItemTooltip = function (e, t, n) {
      var r = Object(Q["a"])(t),
        i = r.tooltipConfig,
        o = i.option || {};
      if (Object(u["y"])(o)) {
        var a = o;
        o = {
          content: a,
          formatter: a
        };
      }
      var s = [o],
        l = this._ecModel.getComponent(r.componentMainType, r.componentIndex);
      l && s.push(l), s.push({
        formatter: o.content
      });
      var c = e.positionDefault,
        f = re(s, this._tooltipModel, c ? {
          position: c
        } : null),
        d = f.get("content"),
        h = Math.random() + "",
        p = new x["a"]();
      this._showOrMove(f, function () {
        var n = Object(u["d"])(f.get("formatterParams") || {});
        this._showTooltipContent(f, d, n, h, e.offsetX, e.offsetY, e.position, t, p);
      }), n({
        type: "showTip",
        from: this.uid
      });
    }, t.prototype._showTooltipContent = function (e, t, n, r, i, o, a, s, l) {
      if (this._ticket = "", e.get("showContent") && e.get("show")) {
        var c = this._tooltipContent;
        c.setEnterable(e.get("enterable"));
        var f = e.get("formatter");
        a = a || e.get("position");
        var d = t,
          p = this._getNearestPoint([i, o], n, e.get("trigger"), e.get("borderColor")),
          g = p.color;
        if (f) if (Object(u["y"])(f)) {
          var m = e.ecModel.get("useUTC"),
            v = Object(u["r"])(n) ? n[0] : n,
            y = v && v.axisType && v.axisType.indexOf("time") >= 0;
          d = f, y && (d = Object(X["h"])(v.axisValue, d, m)), d = Object(h["c"])(d, n, !0);
        } else if (Object(u["u"])(f)) {
          var b = Object(u["c"])(function (t, r) {
            t === this._ticket && (c.setContent(r, l, e, g, a), this._updatePosition(e, a, i, o, c, n, s));
          }, this);
          this._ticket = r, d = f(n, r, b);
        } else d = f;
        c.setContent(d, l, e, g, a), c.show(e, g), this._updatePosition(e, a, i, o, c, n, s);
      }
    }, t.prototype._getNearestPoint = function (e, t, n, r) {
      return "axis" === n || Object(u["r"])(t) ? {
        color: r || ("html" === this._renderMode ? "#fff" : "none")
      } : Object(u["r"])(t) ? void 0 : {
        color: r || t.color || t.borderColor
      };
    }, t.prototype._updatePosition = function (e, t, n, r, i, o, a) {
      var s = this._api.getWidth(),
        l = this._api.getHeight();
      t = t || e.get("position");
      var c = i.getSize(),
        f = e.get("align"),
        d = e.get("verticalAlign"),
        h = a && a.getBoundingRect().clone();
      if (a && h.applyTransform(a.transform), Object(u["u"])(t) && (t = t([n, r], o, i.el, h, {
        viewSize: [s, l],
        contentSize: c.slice()
      })), Object(u["r"])(t)) n = Object(B["m"])(t[0], s), r = Object(B["m"])(t[1], l);else if (Object(u["x"])(t)) {
        var g = t;
        g.width = c[0], g.height = c[1];
        var m = Object(G["d"])(g, {
          width: s,
          height: l
        });
        n = m.x, r = m.y, f = null, d = null;
      } else if (Object(u["y"])(t) && a) {
        var v = se(t, h, c, e.get("borderWidth"));
        n = v[0], r = v[1];
      } else {
        v = oe(n, r, i, s, l, f ? null : 20, d ? null : 20);
        n = v[0], r = v[1];
      }
      if (f && (n -= le(f) ? c[0] / 2 : "right" === f ? c[0] : 0), d && (r -= le(d) ? c[1] / 2 : "bottom" === d ? c[1] : 0), p(e)) {
        v = ae(n, r, i, s, l);
        n = v[0], r = v[1];
      }
      i.moveTo(n, r);
    }, t.prototype._updateContentNotChangedOnAxis = function (e, t) {
      var n = this._lastDataByCoordSys,
        r = this._cbParamsList,
        i = !!n && n.length === e.length;
      return i && Object(u["j"])(n, function (n, o) {
        var a = n.dataByAxis || [],
          s = e[o] || {},
          l = s.dataByAxis || [];
        i = i && a.length === l.length, i && Object(u["j"])(a, function (e, n) {
          var o = l[n] || {},
            a = e.seriesDataIndices || [],
            s = o.seriesDataIndices || [];
          i = i && e.value === o.value && e.axisType === o.axisType && e.axisId === o.axisId && a.length === s.length, i && Object(u["j"])(a, function (e, t) {
            var n = s[t];
            i = i && e.seriesIndex === n.seriesIndex && e.dataIndex === n.dataIndex;
          }), r && Object(u["j"])(e.seriesDataIndices, function (e) {
            var n = e.seriesIndex,
              o = t[n],
              a = r[n];
            o && a && a.data !== o.data && (i = !1);
          });
        });
      }), this._lastDataByCoordSys = e, this._cbParamsList = t, !!i;
    }, t.prototype._hide = function (e) {
      this._lastDataByCoordSys = null, e({
        type: "hideTip",
        from: this.uid
      });
    }, t.prototype.dispose = function (e, t) {
      !c["a"].node && t.getDom() && (Object(ee["a"])(this, "_updatePosition"), this._tooltipContent.dispose(), U["b"]("itemTooltip", t));
    }, t.type = "tooltip", t;
  }(Z["a"]);
function re(e, t, n) {
  var r,
    i = t.ecModel;
  n ? (r = new W["a"](n, i, i), r = new W["a"](t.option, r, i)) : r = t;
  for (var o = e.length - 1; o >= 0; o--) {
    var a = e[o];
    a && (a instanceof W["a"] && (a = a.get("tooltip", !0)), Object(u["y"])(a) && (a = {
      formatter: a
    }), a && (r = new W["a"](a, r, i)));
  }
  return r;
}
function ie(e, t) {
  return e.dispatchAction || Object(u["c"])(t.dispatchAction, t);
}
function oe(e, t, n, r, i, o, a) {
  var s = n.getSize(),
    l = s[0],
    u = s[1];
  return null != o && (e + l + o + 2 > r ? e -= l + o : e += o), null != a && (t + u + a > i ? t -= u + a : t += a), [e, t];
}
function ae(e, t, n, r, i) {
  var o = n.getSize(),
    a = o[0],
    s = o[1];
  return e = Math.min(e + a, r) - a, t = Math.min(t + s, i) - s, e = Math.max(e, 0), t = Math.max(t, 0), [e, t];
}
function se(e, t, n, r) {
  var i = n[0],
    o = n[1],
    a = Math.ceil(Math.SQRT2 * r) + 8,
    s = 0,
    l = 0,
    u = t.width,
    c = t.height;
  switch (e) {
    case "inside":
      s = t.x + u / 2 - i / 2, l = t.y + c / 2 - o / 2;
      break;
    case "top":
      s = t.x + u / 2 - i / 2, l = t.y - o - a;
      break;
    case "bottom":
      s = t.x + u / 2 - i / 2, l = t.y + c + a;
      break;
    case "left":
      s = t.x - i - a, l = t.y + c / 2 - o / 2;
      break;
    case "right":
      s = t.x + u + a, l = t.y + c / 2 - o / 2;
  }
  return [s, l];
}
function le(e) {
  return "center" === e || "middle" === e;
}
function ue(e, t, n) {
  var r = Object(K["r"])(e).queryOptionMap,
    i = r.keys()[0];
  if (i && "series" !== i) {
    var o = Object(K["t"])(t, i, r.get(i), {
        useDefault: !1,
        enableAll: !1,
        enableNone: !1
      }),
      a = o.models[0];
    if (a) {
      var s,
        l = n.getViewOfComponentModel(a);
      return l.group.traverse(function (t) {
        var n = Object(Q["a"])(t).tooltipConfig;
        if (n && n.name === e.name) return s = t, !0;
      }), s ? {
        componentMainType: i,
        componentIndex: a.componentIndex,
        el: s
      } : void 0;
    }
  }
}
var ce = ne;
function fe(e) {
  Object(i["a"])(r["a"]), e.registerComponentModel(l), e.registerComponentView(ce), e.registerAction({
    type: "showTip",
    event: "showTip",
    update: "tooltip:manuallyShowTip"
  }, u["G"]), e.registerAction({
    type: "hideTip",
    event: "hideTip",
    update: "tooltip:manuallyHideTip"
  }, u["G"]);
}
defineExport(legacyExports, "a", function () {
  return fe;
});
