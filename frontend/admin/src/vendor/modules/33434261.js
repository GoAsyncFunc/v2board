let legacyModule = module,
  legacyExports = exports;
var r = require("./65696e52.js"),
  i = require("./792b5674.js"),
  o = require("./44616767.js"),
  a = require("./36477258.js"),
  s = require("./33553866.js"),
  l = Math.sin,
  c = Math.cos,
  u = Math.PI,
  h = 2 * Math.PI,
  f = 180 / u,
  d = function () {
    function e() {}
    return e.prototype.reset = function (e) {
      this._start = !0, this._d = [], this._str = "", this._p = Math.pow(10, e || 4);
    }, e.prototype.moveTo = function (e, t) {
      this._add("M", e, t);
    }, e.prototype.lineTo = function (e, t) {
      this._add("L", e, t);
    }, e.prototype.bezierCurveTo = function (e, t, n, r, i, o) {
      this._add("C", e, t, n, r, i, o);
    }, e.prototype.quadraticCurveTo = function (e, t, n, r) {
      this._add("Q", e, t, n, r);
    }, e.prototype.arc = function (e, t, n, r, i, o) {
      this.ellipse(e, t, n, n, 0, r, i, o);
    }, e.prototype.ellipse = function (e, t, n, i, o, a, s, d) {
      var p = s - a,
        m = !d,
        g = Math.abs(p),
        v = Object(r["j"])(g - h) || (m ? p >= h : -p >= h),
        y = p > 0 ? p % h : p % h + h,
        b = !1;
      b = !!v || !Object(r["j"])(g) && y >= u === !!m;
      var w = e + n * c(a),
        x = t + i * l(a);
      this._start && this._add("M", w, x);
      var _ = Math.round(o * f);
      if (v) {
        var E = 1 / this._p,
          S = (m ? 1 : -1) * (h - E);
        this._add("A", n, i, _, 1, +m, e + n * c(a + S), t + i * l(a + S)), E > .01 && this._add("A", n, i, _, 0, +m, w, x);
      } else {
        var k = e + n * c(s),
          C = t + i * l(s);
        this._add("A", n, i, _, +b, +m, k, C);
      }
    }, e.prototype.rect = function (e, t, n, r) {
      this._add("M", e, t), this._add("l", n, 0), this._add("l", 0, r), this._add("l", -n, 0), this._add("Z");
    }, e.prototype.closePath = function () {
      this._d.length > 0 && this._add("Z");
    }, e.prototype._add = function (e, t, n, r, i, o, a, s, l) {
      for (var c = [], u = this._p, h = 1; h < arguments.length; h++) {
        var f = arguments[h];
        if (isNaN(f)) return void (this._invalid = !0);
        c.push(Math.round(f * u) / u);
      }
      this._d.push(e + c.join(" ")), this._start = "Z" === e;
    }, e.prototype.generateStr = function () {
      this._str = this._invalid ? "" : this._d.join(""), this._d = [];
    }, e.prototype.getStr = function () {
      return this._str;
    }, e;
  }(),
  p = d,
  m = require("./6a523278.js"),
  g = require("./62597459.js"),
  v = "none",
  y = Math.round;
function b(e) {
  var t = e.fill;
  return null != t && t !== v;
}
function w(e) {
  var t = e.stroke;
  return null != t && t !== v;
}
var x = ["lineCap", "miterLimit", "lineJoin"],
  _ = Object(g["D"])(x, function (e) {
    return "stroke-" + e.toLowerCase();
  });
function E(e, t, n, a) {
  var s = null == t.opacity ? 1 : t.opacity;
  if (n instanceof o["a"]) e("opacity", s);else {
    if (b(t)) {
      var l = Object(r["p"])(t.fill);
      e("fill", l.color);
      var c = null != t.fillOpacity ? t.fillOpacity * l.opacity * s : l.opacity * s;
      (a || c < 1) && e("fill-opacity", c);
    } else e("fill", v);
    if (w(t)) {
      var u = Object(r["p"])(t.stroke);
      e("stroke", u.color);
      var h = t.strokeNoScale ? n.getLineScale() : 1,
        f = h ? (t.lineWidth || 0) / h : 0,
        d = null != t.strokeOpacity ? t.strokeOpacity * u.opacity * s : u.opacity * s,
        p = t.strokeFirst;
      if ((a || 1 !== f) && e("stroke-width", f), (a || p) && e("paint-order", p ? "stroke" : "fill"), (a || d < 1) && e("stroke-opacity", d), t.lineDash) {
        var g = Object(m["a"])(n),
          E = g[0],
          S = g[1];
        E && (S = y(S || 0), e("stroke-dasharray", E.join(",")), (S || a) && e("stroke-dashoffset", S));
      } else a && e("stroke-dasharray", v);
      for (var k = 0; k < x.length; k++) {
        var C = x[k];
        if (a || t[C] !== i["a"][C]) {
          var O = t[C] || i["a"][C];
          O && e(_[k], O);
        }
      }
    } else a && e("stroke", v);
  }
}
var S = require("./5a653132.js"),
  k = "http://www.w3.org/2000/svg",
  C = "http://www.w3.org/1999/xlink",
  O = "http://www.w3.org/2000/xmlns/",
  T = "http://www.w3.org/XML/1998/namespace";
function L(e) {
  return document.createElementNS(k, e);
}
function A(e, t, n, r, i) {
  return {
    tag: e,
    attrs: n || {},
    children: r,
    text: i,
    key: t
  };
}
function P(e, t) {
  var n = [];
  if (t) for (var r in t) {
    var i = t[r],
      o = r;
    !1 !== i && (!0 !== i && null != i && (o += '="' + i + '"'), n.push(o));
  }
  return "<" + e + " " + n.join(" ") + ">";
}
function j(e) {
  return "</" + e + ">";
}
function M(e, t) {
  t = t || {};
  var n = t.newline ? "\n" : "";
  function r(e) {
    var t = e.children,
      i = e.tag,
      o = e.attrs;
    return P(i, o) + Object(S["a"])(e.text) + (t ? "" + n + Object(g["D"])(t, function (e) {
      return r(e);
    }).join(n) + n : "") + j(i);
  }
  return r(e);
}
function R(e, t, n) {
  n = n || {};
  var r = n.newline ? "\n" : "",
    i = " {" + r,
    o = r + "}",
    a = Object(g["D"])(Object(g["B"])(e), function (t) {
      return t + i + Object(g["D"])(Object(g["B"])(e[t]), function (n) {
        return n + ":" + e[t][n] + ";";
      }).join(r) + o;
    }).join(r),
    s = Object(g["D"])(Object(g["B"])(t), function (e) {
      return "@keyframes " + e + i + Object(g["D"])(Object(g["B"])(t[e]), function (n) {
        return n + i + Object(g["D"])(Object(g["B"])(t[e][n]), function (r) {
          var i = t[e][n][r];
          return "d" === r && (i = 'path("' + i + '")'), r + ":" + i + ";";
        }).join(r) + o;
      }).join(r) + o;
    }).join(r);
  return a || s ? ["<![CDATA[", a, s, "]]>"].join(r) : "";
}
function N(e) {
  return {
    zrId: e,
    shadowCache: {},
    patternCache: {},
    gradientCache: {},
    clipPathCache: {},
    defs: {},
    cssNodes: {},
    cssAnims: {},
    cssClassIdx: 0,
    cssAnimIdx: 0,
    shadowIdx: 0,
    gradientIdx: 0,
    patternIdx: 0,
    clipPathIdx: 0
  };
}
function D(e, t, n, r) {
  return A("svg", "root", {
    width: e,
    height: t,
    xmlns: k,
    "xmlns:xlink": C,
    version: "1.1",
    baseProfile: "full",
    viewBox: !!r && "0 0 " + e + " " + t
  }, n);
}
var I = require("./586e6237.js"),
  $ = require("./68594c6a.js"),
  F = require("./494d6948.js"),
  B = require("./314d594a.js"),
  V = require("./7332497a.js"),
  W = {
    cubicIn: "0.32,0,0.67,0",
    cubicOut: "0.33,1,0.68,1",
    cubicInOut: "0.65,0,0.35,1",
    quadraticIn: "0.11,0,0.5,0",
    quadraticOut: "0.5,1,0.89,1",
    quadraticInOut: "0.45,0,0.55,1",
    quarticIn: "0.5,0,0.75,0",
    quarticOut: "0.25,1,0.5,1",
    quarticInOut: "0.76,0,0.24,1",
    quinticIn: "0.64,0,0.78,0",
    quinticOut: "0.22,1,0.36,1",
    quinticInOut: "0.83,0,0.17,1",
    sinusoidalIn: "0.12,0,0.39,0",
    sinusoidalOut: "0.61,1,0.88,1",
    sinusoidalInOut: "0.37,0,0.63,1",
    exponentialIn: "0.7,0,0.84,0",
    exponentialOut: "0.16,1,0.3,1",
    exponentialInOut: "0.87,0,0.13,1",
    circularIn: "0.55,0,1,0.45",
    circularOut: "0,0.55,0.45,1",
    circularInOut: "0.85,0,0.15,1"
  },
  H = "transform-origin";
function U(e, t, n) {
  var i = Object(g["l"])({}, e.shape);
  Object(g["l"])(i, t), e.buildPath(n, i);
  var o = new p();
  return o.reset(Object(r["f"])(e)), n.rebuildPath(o, 1), o.generateStr(), o.getStr();
}
function z(e, t) {
  var n = t.originX,
    r = t.originY;
  (n || r) && (e[H] = n + "px " + r + "px");
}
var G = {
  fill: "fill",
  opacity: "opacity",
  lineWidth: "stroke-width",
  lineDashOffset: "stroke-dashoffset"
};
function q(e, t) {
  var n = t.zrId + "-ani-" + t.cssAnimIdx++;
  return t.cssAnims[n] = e, n;
}
function K(e, t, n) {
  var r,
    i,
    o = e.shape.paths,
    a = {};
  if (Object(g["j"])(o, function (e) {
    var t = N(n.zrId);
    t.animation = !0, X(e, {}, t, !0);
    var o = t.cssAnims,
      s = t.cssNodes,
      l = Object(g["B"])(o),
      c = l.length;
    if (c) {
      i = l[c - 1];
      var u = o[i];
      for (var h in u) {
        var f = u[h];
        a[h] = a[h] || {
          d: ""
        }, a[h].d += f.d || "";
      }
      for (var d in s) {
        var p = s[d].animation;
        p.indexOf(i) >= 0 && (r = p);
      }
    }
  }), r) {
    t.d = !1;
    var s = q(a, n);
    return r.replace(i, s);
  }
}
function Y(e) {
  return Object(g["y"])(e) ? W[e] ? "cubic-bezier(" + W[e] + ")" : Object(V["a"])(e) ? e : "" : "";
}
function X(e, t, n, i) {
  var o = e.animators,
    a = o.length,
    s = [];
  if (e instanceof B["a"]) {
    var l = K(e, t, n);
    if (l) s.push(l);else if (!a) return;
  } else if (!a) return;
  for (var c = {}, u = 0; u < a; u++) {
    var h = o[u],
      f = [h.getMaxTime() / 1e3 + "s"],
      d = Y(h.getClip().easing),
      p = h.getDelay();
    d ? f.push(d) : f.push("linear"), p && f.push(p / 1e3 + "s"), h.getLoop() && f.push("infinite");
    var m = f.join(" ");
    c[m] = c[m] || [m, []], c[m][1].push(h);
  }
  function v(o) {
    var a,
      s = o[1],
      l = s.length,
      c = {},
      u = {},
      h = {},
      f = "animation-timing-function";
    function d(e, t, n) {
      for (var r = e.getTracks(), i = e.getMaxTime(), o = 0; o < r.length; o++) {
        var a = r[o];
        if (a.needsAnimate()) {
          var s = a.keyframes,
            l = a.propName;
          if (n && (l = n(l)), l) for (var c = 0; c < s.length; c++) {
            var u = s[c],
              h = Math.round(u.time / i * 100) + "%",
              d = Y(u.easing),
              p = u.rawValue;
            (Object(g["y"])(p) || Object(g["w"])(p)) && (t[h] = t[h] || {}, t[h][l] = u.rawValue, d && (t[h][f] = d));
          }
        }
      }
    }
    for (var p = 0; p < l; p++) {
      var m = s[p],
        v = m.targetName;
      v ? "shape" === v && d(m, u) : !i && d(m, c);
    }
    for (var y in c) {
      var b = {};
      Object($["b"])(b, e), Object(g["l"])(b, c[y]);
      var w = Object(r["g"])(b),
        x = c[y][f];
      h[y] = w ? {
        transform: w
      } : {}, z(h[y], b), x && (h[y][f] = x);
    }
    var _ = !0;
    for (var y in u) {
      h[y] = h[y] || {};
      var E = !a;
      x = u[y][f];
      E && (a = new F["a"]());
      var S = a.len();
      a.reset(), h[y].d = U(e, u[y], a);
      var k = a.len();
      if (!E && S !== k) {
        _ = !1;
        break;
      }
      x && (h[y][f] = x);
    }
    if (!_) for (var y in h) delete h[y].d;
    if (!i) for (p = 0; p < l; p++) {
      m = s[p], v = m.targetName;
      "style" === v && d(m, h, function (e) {
        return G[e];
      });
    }
    var C,
      O = Object(g["B"])(h),
      T = !0;
    for (p = 1; p < O.length; p++) {
      var L = O[p - 1],
        A = O[p];
      if (h[L][H] !== h[A][H]) {
        T = !1;
        break;
      }
      C = h[L][H];
    }
    if (T && C) {
      for (var y in h) h[y][H] && delete h[y][H];
      t[H] = C;
    }
    if (Object(g["m"])(O, function (e) {
      return Object(g["B"])(h[e]).length > 0;
    }).length) {
      var P = q(h, n);
      return P + " " + o[0] + " both";
    }
  }
  for (var y in c) {
    l = v(c[y]);
    l && s.push(l);
  }
  if (s.length) {
    var b = n.zrId + "-cls-" + n.cssClassIdx++;
    n.cssNodes["." + b] = {
      animation: s.join(",")
    }, t["class"] = b;
  }
}
var Q = require("./64715547.js"),
  Z = require("./636d3672.js"),
  J = Math.round;
function ee(e) {
  return e && Object(g["y"])(e.src);
}
function te(e) {
  return e && Object(g["u"])(e.toDataURL);
}
function ne(e, t, n, i) {
  E(function (o, a) {
    var s = "fill" === o || "stroke" === o;
    s && Object(r["k"])(a) ? ge(t, e, o, i) : s && Object(r["n"])(a) ? ve(n, e, o, i) : e[o] = a;
  }, t, n, !1), me(n, e, i);
}
function re(e) {
  return Object(r["j"])(e[0] - 1) && Object(r["j"])(e[1]) && Object(r["j"])(e[2]) && Object(r["j"])(e[3] - 1);
}
function ie(e) {
  return Object(r["j"])(e[4]) && Object(r["j"])(e[5]);
}
function oe(e, t, n) {
  if (t && (!ie(t) || !re(t))) {
    var i = n ? 10 : 1e4;
    e.transform = re(t) ? "translate(" + J(t[4] * i) / i + " " + J(t[5] * i) / i + ")" : Object(r["e"])(t);
  }
}
function ae(e, t, n) {
  for (var r = e.points, i = [], o = 0; o < r.length; o++) i.push(J(r[o][0] * n) / n), i.push(J(r[o][1] * n) / n);
  t.points = i.join(" ");
}
function se(e) {
  return !e.smooth;
}
function le(e) {
  var t = Object(g["D"])(e, function (e) {
    return "string" === typeof e ? [e, e] : e;
  });
  return function (e, n, r) {
    for (var i = 0; i < t.length; i++) {
      var o = t[i],
        a = e[o[0]];
      null != a && (n[o[1]] = J(a * r) / r);
    }
  };
}
var ce = {
  circle: [le(["cx", "cy", "r"])],
  polyline: [ae, se],
  polygon: [ae, se]
};
function ue(e) {
  for (var t = e.animators, n = 0; n < t.length; n++) if ("shape" === t[n].targetName) return !0;
  return !1;
}
function he(e, t) {
  var n = e.style,
    i = e.shape,
    o = ce[e.type],
    a = {},
    s = t.animation,
    l = "path",
    c = e.style.strokePercent,
    u = t.compress && Object(r["f"])(e) || 4;
  if (!o || t.willUpdate || o[1] && !o[1](i) || s && ue(e) || c < 1) {
    e.path || e.createPathProxy();
    var h = e.path;
    e.shapeChanged() && (h.beginPath(), e.buildPath(h, e.shape), e.pathUpdated());
    var f = h.getVersion(),
      d = e,
      m = d.__svgPathBuilder;
    d.__svgPathVersion === f && m && c === d.__svgPathStrokePercent || (m || (m = d.__svgPathBuilder = new p()), m.reset(u), h.rebuildPath(m, c), m.generateStr(), d.__svgPathVersion = f, d.__svgPathStrokePercent = c), a.d = m.getStr();
  } else {
    l = e.type;
    var g = Math.pow(10, u);
    o[0](i, a, g);
  }
  return oe(a, e.transform), ne(a, n, e, t), t.animation && X(e, a, t), A(l, e.id + "", a);
}
function fe(e, t) {
  var n = e.style,
    r = n.image;
  if (r && !Object(g["y"])(r) && (ee(r) ? r = r.src : te(r) && (r = r.toDataURL())), r) {
    var i = n.x || 0,
      o = n.y || 0,
      a = n.width,
      s = n.height,
      l = {
        href: r,
        width: a,
        height: s
      };
    return i && (l.x = i), o && (l.y = o), oe(l, e.transform), ne(l, n, e, t), t.animation && X(e, l, t), A("image", e.id + "", l);
  }
}
function de(e, t) {
  var n = e.style,
    i = n.text;
  if (null != i && (i += ""), i && !isNaN(n.x) && !isNaN(n.y)) {
    var o = n.font || Z["a"],
      s = n.x || 0,
      l = Object(r["b"])(n.y || 0, Object(a["e"])(o), n.textBaseline),
      c = r["a"][n.textAlign] || n.textAlign,
      u = {
        "dominant-baseline": "central",
        "text-anchor": c
      };
    if (Object(Q["b"])(n)) {
      var h = "",
        f = n.fontStyle,
        d = Object(Q["c"])(n.fontSize);
      if (!parseFloat(d)) return;
      var p = n.fontFamily || Z["b"],
        m = n.fontWeight;
      h += "font-size:" + d + ";font-family:" + p + ";", f && "normal" !== f && (h += "font-style:" + f + ";"), m && "normal" !== m && (h += "font-weight:" + m + ";"), u.style = h;
    } else u.style = "font: " + o;
    return i.match(/\s/) && (u["xml:space"] = "preserve"), s && (u.x = s), l && (u.y = l), oe(u, e.transform), ne(u, n, e, t), t.animation && X(e, u, t), A("text", e.id + "", u, void 0, i);
  }
}
function pe(e, t) {
  return e instanceof i["b"] ? he(e, t) : e instanceof o["a"] ? fe(e, t) : e instanceof s["a"] ? de(e, t) : void 0;
}
function me(e, t, n) {
  var i = e.style;
  if (Object(r["i"])(i)) {
    var o = Object(r["h"])(e),
      a = n.shadowCache,
      s = a[o];
    if (!s) {
      var l = e.getGlobalScale(),
        c = l[0],
        u = l[1];
      if (!c || !u) return;
      var h = i.shadowOffsetX || 0,
        f = i.shadowOffsetY || 0,
        d = i.shadowBlur,
        p = Object(r["p"])(i.shadowColor),
        m = p.opacity,
        g = p.color,
        v = d / 2 / c,
        y = d / 2 / u,
        b = v + " " + y;
      s = n.zrId + "-s" + n.shadowIdx++, n.defs[s] = A("filter", s, {
        id: s,
        x: "-100%",
        y: "-100%",
        width: "300%",
        height: "300%"
      }, [A("feDropShadow", "", {
        dx: h / c,
        dy: f / u,
        stdDeviation: b,
        "flood-color": g,
        "flood-opacity": m
      })]), a[o] = s;
    }
    t.filter = Object(r["d"])(s);
  }
}
function ge(e, t, n, i) {
  var o,
    a = e[n],
    s = {
      gradientUnits: a.global ? "userSpaceOnUse" : "objectBoundingBox"
    };
  if (Object(r["m"])(a)) o = "linearGradient", s.x1 = a.x, s.y1 = a.y, s.x2 = a.x2, s.y2 = a.y2;else {
    if (!Object(r["o"])(a)) return void 0;
    o = "radialGradient", s.cx = Object(g["K"])(a.x, .5), s.cy = Object(g["K"])(a.y, .5), s.r = Object(g["K"])(a.r, .5);
  }
  for (var l = a.colorStops, c = [], u = 0, h = l.length; u < h; ++u) {
    var f = 100 * Object(r["q"])(l[u].offset) + "%",
      d = l[u].color,
      p = Object(r["p"])(d),
      m = p.color,
      v = p.opacity,
      y = {
        offset: f
      };
    y["stop-color"] = m, v < 1 && (y["stop-opacity"] = v), c.push(A("stop", u + "", y));
  }
  var b = A(o, "", s, c),
    w = M(b),
    x = i.gradientCache,
    _ = x[w];
  _ || (_ = i.zrId + "-g" + i.gradientIdx++, x[w] = _, s.id = _, i.defs[_] = A(o, _, s, c)), t[n] = Object(r["d"])(_);
}
function ve(e, t, n, i) {
  var o,
    a = e.style[n],
    s = {
      patternUnits: "userSpaceOnUse"
    };
  if (Object(r["l"])(a)) {
    var l = a.imageWidth,
      c = a.imageHeight,
      u = void 0,
      h = a.image;
    if (Object(g["y"])(h) ? u = h : ee(h) ? u = h.src : te(h) && (u = h.toDataURL()), "undefined" === typeof Image) {
      var f = "Image width/height must been given explictly in svg-ssr renderer.";
      Object(g["b"])(l, f), Object(g["b"])(c, f);
    } else if (null == l || null == c) {
      var d = function (e, t) {
          if (e) {
            var n = e.elm,
              r = e.attrs.width = l || t.width,
              i = e.attrs.height = c || t.height;
            n && (n.setAttribute("width", r), n.setAttribute("height", i));
          }
        },
        p = Object(I["a"])(u, null, e, function (e) {
          d(m, e), d(o, e);
        });
      p && p.width && p.height && (l = l || p.width, c = c || p.height);
    }
    o = A("image", "img", {
      href: u,
      width: l,
      height: c
    }), s.width = l, s.height = c;
  } else a.svgElement && (o = Object(g["d"])(a.svgElement), s.width = a.svgWidth, s.height = a.svgHeight);
  if (o) {
    s.patternTransform = Object(r["g"])(a);
    var m = A("pattern", "", s, [o]),
      v = M(m),
      y = i.patternCache,
      b = y[v];
    b || (b = i.zrId + "-p" + i.patternIdx++, y[v] = b, s.id = b, m = i.defs[b] = A("pattern", b, s, [o])), t[n] = Object(r["d"])(b);
  }
}
function ye(e, t, n) {
  var i = n.clipPathCache,
    o = n.defs,
    a = i[e.id];
  if (!a) {
    a = n.zrId + "-c" + n.clipPathIdx++;
    var s = {
      id: a
    };
    i[e.id] = a, o[a] = A("clipPath", a, s, [he(e, n)]);
  }
  t["clip-path"] = Object(r["d"])(a);
}
function be(e) {
  return document.createTextNode(e);
}
function we(e, t, n) {
  e.insertBefore(t, n);
}
function xe(e, t) {
  e.removeChild(t);
}
function _e(e, t) {
  e.appendChild(t);
}
function Ee(e) {
  return e.parentNode;
}
function Se(e) {
  return e.nextSibling;
}
function ke(e, t) {
  e.textContent = t;
}
var Ce = 58,
  Oe = 120,
  Te = A("", "");
function Le(e) {
  return void 0 === e;
}
function Ae(e) {
  return void 0 !== e;
}
function Pe(e, t, n) {
  for (var r = {}, i = t; i <= n; ++i) {
    var o = e[i].key;
    void 0 !== o && (r[o] = i);
  }
  return r;
}
function je(e, t) {
  var n = e.key === t.key,
    r = e.tag === t.tag;
  return r && n;
}
function Me(e) {
  var t,
    n = e.children,
    r = e.tag;
  if (Ae(r)) {
    var i = e.elm = L(r);
    if (De(Te, e), Object(g["r"])(n)) for (t = 0; t < n.length; ++t) {
      var o = n[t];
      null != o && _e(i, Me(o));
    } else Ae(e.text) && !Object(g["x"])(e.text) && _e(i, be(e.text));
  } else e.elm = be(e.text);
  return e.elm;
}
function Re(e, t, n, r, i) {
  for (; r <= i; ++r) {
    var o = n[r];
    null != o && we(e, Me(o), t);
  }
}
function Ne(e, t, n, r) {
  for (; n <= r; ++n) {
    var i = t[n];
    if (null != i) if (Ae(i.tag)) {
      var o = Ee(i.elm);
      xe(o, i.elm);
    } else xe(e, i.elm);
  }
}
function De(e, t) {
  var n,
    r = t.elm,
    i = e && e.attrs || {},
    o = t.attrs || {};
  if (i !== o) {
    for (n in o) {
      var a = o[n],
        s = i[n];
      s !== a && (!0 === a ? r.setAttribute(n, "") : !1 === a ? r.removeAttribute(n) : n.charCodeAt(0) !== Oe ? r.setAttribute(n, a) : "xmlns:xlink" === n || "xmlns" === n ? r.setAttributeNS(O, n, a) : n.charCodeAt(3) === Ce ? r.setAttributeNS(T, n, a) : n.charCodeAt(5) === Ce ? r.setAttributeNS(C, n, a) : r.setAttribute(n, a));
    }
    for (n in i) n in o || r.removeAttribute(n);
  }
}
function Ie(e, t, n) {
  var r,
    i,
    o,
    a,
    s = 0,
    l = 0,
    c = t.length - 1,
    u = t[0],
    h = t[c],
    f = n.length - 1,
    d = n[0],
    p = n[f];
  while (s <= c && l <= f) null == u ? u = t[++s] : null == h ? h = t[--c] : null == d ? d = n[++l] : null == p ? p = n[--f] : je(u, d) ? ($e(u, d), u = t[++s], d = n[++l]) : je(h, p) ? ($e(h, p), h = t[--c], p = n[--f]) : je(u, p) ? ($e(u, p), we(e, u.elm, Se(h.elm)), u = t[++s], p = n[--f]) : je(h, d) ? ($e(h, d), we(e, h.elm, u.elm), h = t[--c], d = n[++l]) : (Le(r) && (r = Pe(t, s, c)), i = r[d.key], Le(i) ? we(e, Me(d), u.elm) : (o = t[i], o.tag !== d.tag ? we(e, Me(d), u.elm) : ($e(o, d), t[i] = void 0, we(e, o.elm, u.elm))), d = n[++l]);
  (s <= c || l <= f) && (s > c ? (a = null == n[f + 1] ? null : n[f + 1].elm, Re(e, a, n, l, f)) : Ne(e, t, s, c));
}
function $e(e, t) {
  var n = t.elm = e.elm,
    r = e.children,
    i = t.children;
  e !== t && (De(e, t), Le(t.text) ? Ae(r) && Ae(i) ? r !== i && Ie(n, r, i) : Ae(i) ? (Ae(e.text) && ke(n, ""), Re(n, null, i, 0, i.length - 1)) : Ae(r) ? Ne(n, r, 0, r.length - 1) : Ae(e.text) && ke(n, "") : e.text !== t.text && (Ae(r) && Ne(n, r, 0, r.length - 1), ke(n, t.text)));
}
function Fe(e, t) {
  if (je(e, t)) $e(e, t);else {
    var n = e.elm,
      r = Ee(n);
    Me(t), null !== r && (we(r, t.elm, Se(n)), Ne(r, [e], 0, 0));
  }
  return t;
}
var Be = require("./4e44632f.js"),
  Ve = 0,
  We = function () {
    function e(e, t, n) {
      if (this.type = "svg", this.refreshHover = He("refreshHover"), this.configLayer = He("configLayer"), this.storage = t, this._opts = n = Object(g["l"])({}, n), this.root = e, this._id = "zr" + Ve++, this._oldVNode = D(n.width, n.height), e && !n.ssr) {
        var r = this._viewport = document.createElement("div");
        r.style.cssText = "position:relative;overflow:hidden";
        var i = this._svgDom = this._oldVNode.elm = L("svg");
        De(null, this._oldVNode), r.appendChild(i), e.appendChild(r);
      }
      this.resize(n.width, n.height);
    }
    return e.prototype.getType = function () {
      return this.type;
    }, e.prototype.getViewportRoot = function () {
      return this._viewport;
    }, e.prototype.getViewportRootOffset = function () {
      var e = this.getViewportRoot();
      if (e) return {
        offsetLeft: e.offsetLeft || 0,
        offsetTop: e.offsetTop || 0
      };
    }, e.prototype.getSvgDom = function () {
      return this._svgDom;
    }, e.prototype.refresh = function () {
      if (this.root) {
        var e = this.renderToVNode({
          willUpdate: !0
        });
        e.attrs.style = "position:absolute;left:0;top:0;user-select:none", Fe(this._oldVNode, e), this._oldVNode = e;
      }
    }, e.prototype.renderOneToVNode = function (e) {
      return pe(e, N(this._id));
    }, e.prototype.renderToVNode = function (e) {
      e = e || {};
      var t = this.storage.getDisplayList(!0),
        n = this._backgroundColor,
        i = this._width,
        o = this._height,
        a = N(this._id);
      a.animation = e.animation, a.willUpdate = e.willUpdate, a.compress = e.compress;
      var s = [];
      if (n && "none" !== n) {
        var l = Object(r["p"])(n),
          c = l.color,
          u = l.opacity;
        this._bgVNode = A("rect", "bg", {
          width: i,
          height: o,
          x: "0",
          y: "0",
          id: "0",
          fill: c,
          "fill-opacity": u
        }), s.push(this._bgVNode);
      } else this._bgVNode = null;
      var h = e.compress ? null : this._mainVNode = A("g", "main", {}, []);
      this._paintList(t, a, h ? h.children : s), h && s.push(h);
      var f = Object(g["D"])(Object(g["B"])(a.defs), function (e) {
        return a.defs[e];
      });
      if (f.length && s.push(A("defs", "defs", {}, f)), e.animation) {
        var d = R(a.cssNodes, a.cssAnims, {
          newline: !0
        });
        if (d) {
          var p = A("style", "stl", {}, [], d);
          s.push(p);
        }
      }
      return D(i, o, s, e.useViewBox);
    }, e.prototype.renderToString = function (e) {
      return e = e || {}, M(this.renderToVNode({
        animation: Object(g["K"])(e.cssAnimation, !0),
        willUpdate: !1,
        compress: !0,
        useViewBox: Object(g["K"])(e.useViewBox, !0)
      }), {
        newline: !0
      });
    }, e.prototype.setBackgroundColor = function (e) {
      this._backgroundColor = e;
      var t = this._bgVNode;
      if (t && t.elm) {
        var n = Object(r["p"])(e),
          i = n.color,
          o = n.opacity;
        t.elm.setAttribute("fill", i), o < 1 && t.elm.setAttribute("fill-opacity", o);
      }
    }, e.prototype.getSvgRoot = function () {
      return this._mainVNode && this._mainVNode.elm;
    }, e.prototype._paintList = function (e, t, n) {
      for (var r, i, o = e.length, a = [], s = 0, l = 0, c = 0; c < o; c++) {
        var u = e[c];
        if (!u.invisible) {
          var h = u.__clipPaths,
            f = h && h.length || 0,
            d = i && i.length || 0,
            p = void 0;
          for (p = Math.max(f - 1, d - 1); p >= 0; p--) if (h && i && h[p] === i[p]) break;
          for (var m = d - 1; m > p; m--) s--, r = a[s - 1];
          for (var g = p + 1; g < f; g++) {
            var v = {};
            ye(h[g], v, t);
            var y = A("g", "clip-g-" + l++, v, []);
            (r ? r.children : n).push(y), a[s++] = y, r = y;
          }
          i = h;
          var b = pe(u, t);
          b && (r ? r.children : n).push(b);
        }
      }
    }, e.prototype.resize = function (e, t) {
      var n = this._opts,
        r = this.root,
        i = this._viewport;
      if (null != e && (n.width = e), null != t && (n.height = t), r && i && (i.style.display = "none", e = Object(Be["b"])(r, 0, n), t = Object(Be["b"])(r, 1, n), i.style.display = ""), this._width !== e || this._height !== t) {
        if (this._width = e, this._height = t, i) {
          var o = i.style;
          o.width = e + "px", o.height = t + "px";
        }
        var a = this._svgDom;
        a && (a.setAttribute("width", e), a.setAttribute("height", t));
      }
    }, e.prototype.getWidth = function () {
      return this._width;
    }, e.prototype.getHeight = function () {
      return this._height;
    }, e.prototype.dispose = function () {
      this.root && (this.root.innerHTML = ""), this._svgDom = this._viewport = this.storage = this._oldVNode = this._bgVNode = this._mainVNode = null;
    }, e.prototype.clear = function () {
      this._svgDom && (this._svgDom.innerHTML = null), this._oldVNode = null;
    }, e.prototype.toDataURL = function (e) {
      var t = encodeURIComponent(this.renderToString()),
        n = "data:image/svg+xml;";
      return e ? (t = Object(r["c"])(t), t && n + "base64," + t) : n + "charset=UTF-8," + t;
    }, e;
  }();
function He(e) {
  return function () {
    0;
  };
}
legacyExports["a"] = We;
