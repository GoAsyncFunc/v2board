let legacyModule = module,
  legacyExports = exports;
var r = require("./62597459.js"),
  i = require("./4c63584c.js"),
  o = require("./79784652.js"),
  a = require("./49776253.js"),
  s = require("./64715547.js"),
  l = require("./6868784b.js"),
  u = require("./65446668.js"),
  c = require("./51786b74.js"),
  f = require("./4f454c42.js"),
  d = require("./6f567045.js"),
  h = require("./466f6678.js"),
  p = require("./5142737a.js"),
  g = require("./6158377a.js"),
  m = require("./796f4438.js"),
  v = require("./6d464469.js");
function y(e) {
  for (var t = [], n = 0; n < e.length; n++) {
    var r = e[n];
    if (!r.defaultAttr.ignore) {
      var i = r.label,
        o = i.getComputedTransform(),
        a = i.getBoundingRect(),
        s = !o || o[1] < 1e-5 && o[2] < 1e-5,
        l = i.style.margin || 0,
        u = a.clone();
      u.applyTransform(o), u.x -= l / 2, u.y -= l / 2, u.width += l, u.height += l;
      var c = s ? new m["a"](a, o) : null;
      t.push({
        label: i,
        labelLine: r.labelLine,
        rect: u,
        localRect: a,
        obb: c,
        priority: r.priority,
        defaultAttr: r.defaultAttr,
        layoutOption: r.computedLayoutOption,
        axisAligned: s,
        transform: o
      });
    }
  }
  return t;
}
function b(e) {
  var t = [];
  e.sort(function (e, t) {
    return t.priority - e.priority;
  });
  var n = new v["a"](0, 0, 0, 0);
  function r(e) {
    if (!e.ignore) {
      var t = e.ensureState("emphasis");
      null == t.ignore && (t.ignore = !1);
    }
    e.ignore = !0;
  }
  for (var i = 0; i < e.length; i++) {
    var o = e[i],
      a = o.axisAligned,
      s = o.localRect,
      l = o.transform,
      u = o.label,
      c = o.labelLine;
    n.copy(o.rect), n.width -= .1, n.height -= .1, n.x += .05, n.y += .05;
    for (var f = o.obb, d = !1, h = 0; h < t.length; h++) {
      var p = t[h];
      if (n.intersect(p.rect)) {
        if (a && p.axisAligned) {
          d = !0;
          break;
        }
        if (p.obb || (p.obb = new m["a"](p.localRect, p.transform)), f || (f = new m["a"](s, l)), f.intersect(p.obb)) {
          d = !0;
          break;
        }
      }
    }
    d ? (r(u), c && r(c)) : (u.attr("ignore", o.defaultAttr.ignore), c && c.attr("ignore", o.defaultAttr.labelGuideIgnore), t.push(o));
  }
}
var x = Math.PI,
  _ = function () {
    function e(e, t) {
      this.group = new i["a"](), this.opt = t, this.axisModel = e, Object(r["i"])(t, {
        labelOffset: 0,
        nameDirection: 1,
        tickDirection: 1,
        labelDirection: 1,
        silent: !0,
        handleAutoShown: function () {
          return !0;
        }
      });
      var n = new i["a"]({
        x: t.position[0],
        y: t.position[1],
        rotation: t.rotation
      });
      n.updateTransform(), this._transformGroup = n;
    }
    return e.prototype.hasBuilder = function (e) {
      return !!w[e];
    }, e.prototype.add = function (e) {
      w[e](this.opt, this.axisModel, this.group, this._transformGroup);
    }, e.prototype.getGroup = function () {
      return this.group;
    }, e.innerTextLayout = function (e, t, n) {
      var r,
        i,
        o = Object(f["p"])(t - e);
      return Object(f["h"])(o) ? (i = n > 0 ? "top" : "bottom", r = "center") : Object(f["h"])(o - x) ? (i = n > 0 ? "bottom" : "top", r = "center") : (i = "middle", r = o > 0 && o < x ? n > 0 ? "right" : "left" : n > 0 ? "left" : "right"), {
        rotation: o,
        textAlign: r,
        textVerticalAlign: i
      };
    }, e.makeAxisEventDataBase = function (e) {
      var t = {
        componentType: e.mainType,
        componentIndex: e.componentIndex
      };
      return t[e.mainType + "Index"] = e.componentIndex, t;
    }, e.isLabelSilent = function (e) {
      var t = e.get("tooltip");
      return e.get("silent") || !(e.get("triggerEvent") || t && t.show);
    }, e;
  }(),
  w = {
    axisLine: function (e, t, n, i) {
      var s = t.get(["axisLine", "show"]);
      if ("auto" === s && e.handleAutoShown && (s = e.handleAutoShown("axisLine")), s) {
        var l = t.axis.getExtent(),
          u = i.transform,
          c = [l[0], 0],
          f = [l[1], 0],
          h = c[0] > f[0];
        u && (Object(p["b"])(c, c, u), Object(p["b"])(f, f, u));
        var g = Object(r["l"])({
            lineCap: "round"
          }, t.getModel(["axisLine", "lineStyle"]).getLineStyle()),
          m = new o["a"]({
            shape: {
              x1: c[0],
              y1: c[1],
              x2: f[0],
              y2: f[1]
            },
            style: g,
            strokeContainThreshold: e.strokeContainThreshold || 5,
            silent: !0,
            z2: 1
          });
        a["subPixelOptimizeLine"](m.shape, m.style.lineWidth), m.anid = "line", n.add(m);
        var v = t.get(["axisLine", "symbol"]);
        if (null != v) {
          var y = t.get(["axisLine", "symbolSize"]);
          Object(r["y"])(v) && (v = [v, v]), (Object(r["y"])(y) || Object(r["w"])(y)) && (y = [y, y]);
          var b = Object(d["b"])(t.get(["axisLine", "symbolOffset"]) || 0, y),
            x = y[0],
            _ = y[1];
          Object(r["j"])([{
            rotate: e.rotation + Math.PI / 2,
            offset: b[0],
            r: 0
          }, {
            rotate: e.rotation - Math.PI / 2,
            offset: b[1],
            r: Math.sqrt((c[0] - f[0]) * (c[0] - f[0]) + (c[1] - f[1]) * (c[1] - f[1]))
          }], function (t, r) {
            if ("none" !== v[r] && null != v[r]) {
              var i = Object(d["a"])(v[r], -x / 2, -_ / 2, x, _, g.stroke, !0),
                o = t.r + t.offset,
                a = h ? f : c;
              i.attr({
                rotation: t.rotate,
                x: a[0] + o * Math.cos(e.rotation),
                y: a[1] - o * Math.sin(e.rotation),
                silent: !0,
                z2: 11
              }), n.add(i);
            }
          });
        }
      }
    },
    axisTickLabel: function (e, t, n, i) {
      var o = T(n, i, t, e),
        a = D(n, i, t, e);
      if (S(t, a, o), I(n, i, t, e.tickDirection), t.get(["axisLabel", "hideOverlap"])) {
        var s = y(Object(r["D"])(a, function (e) {
          return {
            label: e,
            priority: e.z2,
            defaultAttr: {
              ignore: e.ignore
            }
          };
        }));
        b(s);
      }
    },
    axisName: function (e, t, n, i) {
      var o = Object(r["J"])(e.axisName, t.get("name"));
      if (o) {
        var c,
          f,
          d = t.get("nameLocation"),
          h = e.nameDirection,
          p = t.getModel("nameTextStyle"),
          g = t.get("nameGap") || 0,
          m = t.axis.getExtent(),
          v = m[0] > m[1] ? -1 : 1,
          y = ["start" === d ? m[0] - v * g : "end" === d ? m[1] + v * g : (m[0] + m[1]) / 2, M(d) ? e.labelOffset + h * g : 0],
          b = t.get("nameRotate");
        null != b && (b = b * x / 180), M(d) ? c = _.innerTextLayout(e.rotation, null != b ? b : e.rotation, h) : (c = O(e.rotation, d, b || 0, m), f = e.axisNameAvailableWidth, null != f && (f = Math.abs(f / Math.sin(c.rotation)), !isFinite(f) && (f = null)));
        var w = p.getFont(),
          S = t.get("nameTruncate", !0) || {},
          k = S.ellipsis,
          j = Object(r["J"])(e.nameTruncateMaxWidth, S.maxWidth, f),
          C = new s["a"]({
            x: y[0],
            y: y[1],
            rotation: c.rotation,
            silent: _.isLabelSilent(t),
            style: Object(u["a"])(p, {
              text: o,
              font: w,
              overflow: "truncate",
              width: j,
              ellipsis: k,
              fill: p.getTextColor() || t.get(["axisLine", "lineStyle", "color"]),
              align: p.get("align") || c.textAlign,
              verticalAlign: p.get("verticalAlign") || c.textVerticalAlign
            }),
            z2: 1
          });
        if (a["setTooltipConfig"]({
          el: C,
          componentModel: t,
          itemName: o
        }), C.__fullText = o, C.anid = "name", t.get("triggerEvent")) {
          var T = _.makeAxisEventDataBase(t);
          T.targetType = "axisName", T.name = o, Object(l["a"])(C).eventData = T;
        }
        i.add(C), C.updateTransform(), n.add(C), C.decomposeTransform();
      }
    }
  };
function O(e, t, n, r) {
  var i,
    o,
    a = Object(f["p"])(n - e),
    s = r[0] > r[1],
    l = "start" === t && !s || "start" !== t && s;
  return Object(f["h"])(a - x / 2) ? (o = l ? "bottom" : "top", i = "center") : Object(f["h"])(a - 1.5 * x) ? (o = l ? "top" : "bottom", i = "center") : (o = "middle", i = a < 1.5 * x && a > x / 2 ? l ? "left" : "right" : l ? "right" : "left"), {
    rotation: a,
    textAlign: i,
    textVerticalAlign: o
  };
}
function S(e, t, n) {
  if (!Object(g["j"])(e.axis)) {
    var r = e.get(["axisLabel", "showMinLabel"]),
      i = e.get(["axisLabel", "showMaxLabel"]);
    t = t || [], n = n || [];
    var o = t[0],
      a = t[1],
      s = t[t.length - 1],
      l = t[t.length - 2],
      u = n[0],
      c = n[1],
      f = n[n.length - 1],
      d = n[n.length - 2];
    !1 === r ? (k(o), k(u)) : j(o, a) && (r ? (k(a), k(c)) : (k(o), k(u))), !1 === i ? (k(s), k(f)) : j(l, s) && (i ? (k(l), k(d)) : (k(s), k(f)));
  }
}
function k(e) {
  e && (e.ignore = !0);
}
function j(e, t) {
  var n = e && e.getBoundingRect().clone(),
    r = t && t.getBoundingRect().clone();
  if (n && r) {
    var i = h["c"]([]);
    return h["f"](i, i, -e.rotation), n.applyTransform(h["e"]([], i, e.getLocalTransform())), r.applyTransform(h["e"]([], i, t.getLocalTransform())), n.intersect(r);
  }
}
function M(e) {
  return "middle" === e || "center" === e;
}
function C(e, t, n, r, i) {
  for (var s = [], l = [], u = [], c = 0; c < e.length; c++) {
    var f = e[c].coord;
    l[0] = f, l[1] = 0, u[0] = f, u[1] = n, t && (Object(p["b"])(l, l, t), Object(p["b"])(u, u, t));
    var d = new o["a"]({
      shape: {
        x1: l[0],
        y1: l[1],
        x2: u[0],
        y2: u[1]
      },
      style: r,
      z2: 2,
      autoBatch: !0,
      silent: !0
    });
    a["subPixelOptimizeLine"](d.shape, d.style.lineWidth), d.anid = i + "_" + e[c].tickValue, s.push(d);
  }
  return s;
}
function T(e, t, n, i) {
  var o = n.axis,
    a = n.getModel("axisTick"),
    s = a.get("show");
  if ("auto" === s && i.handleAutoShown && (s = i.handleAutoShown("axisTick")), s && !o.scale.isBlank()) {
    for (var l = a.getModel("lineStyle"), u = i.tickDirection * a.get("length"), c = o.getTicksCoords(), f = C(c, t.transform, u, Object(r["i"])(l.getLineStyle(), {
        stroke: n.get(["axisLine", "lineStyle", "color"])
      }), "ticks"), d = 0; d < f.length; d++) e.add(f[d]);
    return f;
  }
}
function I(e, t, n, i) {
  var o = n.axis,
    a = n.getModel("minorTick");
  if (a.get("show") && !o.scale.isBlank()) {
    var s = o.getMinorTicksCoords();
    if (s.length) for (var l = a.getModel("lineStyle"), u = i * a.get("length"), c = Object(r["i"])(l.getLineStyle(), Object(r["i"])(n.getModel("axisTick").getLineStyle(), {
        stroke: n.get(["axisLine", "lineStyle", "color"])
      })), f = 0; f < s.length; f++) for (var d = C(s[f], t.transform, u, c, "minorticks_" + f), h = 0; h < d.length; h++) e.add(d[h]);
  }
}
function D(e, t, n, i) {
  var o = n.axis,
    a = Object(r["J"])(i.axisLabelShow, n.get(["axisLabel", "show"]));
  if (a && !o.scale.isBlank()) {
    var f = n.getModel("axisLabel"),
      d = f.get("margin"),
      h = o.getViewLabels(),
      p = (Object(r["J"])(i.labelRotate, f.get("rotate")) || 0) * x / 180,
      g = _.innerTextLayout(i.rotation, p, i.labelDirection),
      m = n.getCategories && n.getCategories(!0),
      v = [],
      y = _.isLabelSilent(n),
      b = n.get("triggerEvent");
    return Object(r["j"])(h, function (a, h) {
      var p = "ordinal" === o.scale.type ? o.scale.getRawOrdinalNumber(a.tickValue) : a.tickValue,
        x = a.formattedLabel,
        w = a.rawLabel,
        O = f;
      if (m && m[p]) {
        var S = m[p];
        Object(r["x"])(S) && S.textStyle && (O = new c["a"](S.textStyle, f, n.ecModel));
      }
      var k = O.getTextColor() || n.get(["axisLine", "lineStyle", "color"]),
        j = o.dataToCoord(p),
        M = new s["a"]({
          x: j,
          y: i.labelOffset + i.labelDirection * d,
          rotation: g.rotation,
          silent: y,
          z2: 10 + (a.level || 0),
          style: Object(u["a"])(O, {
            text: x,
            align: O.getShallow("align", !0) || g.textAlign,
            verticalAlign: O.getShallow("verticalAlign", !0) || O.getShallow("baseline", !0) || g.textVerticalAlign,
            fill: Object(r["u"])(k) ? k("category" === o.type ? w : "value" === o.type ? p + "" : p, h) : k
          })
        });
      if (M.anid = "label_" + p, b) {
        var C = _.makeAxisEventDataBase(n);
        C.targetType = "axisLabel", C.value = w, C.tickIndex = h, "category" === o.type && (C.dataIndex = p), Object(l["a"])(M).eventData = C;
      }
      t.add(M), M.updateTransform(), v.push(M), e.add(M), M.decomposeTransform();
    }), v;
  }
}
legacyExports["a"] = _;
