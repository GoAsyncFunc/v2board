let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var r = require("./51624c5a.js"),
  i = interopDefault(r),
  o = require("./classCallCheck.js"),
  a = interopDefault(o),
  s = require("./46597733.js"),
  l = interopDefault(s),
  c = require("./6d526730.js"),
  u = interopDefault(c),
  h = require("./reactRuntime.js"),
  f = interopDefault(h),
  d = require("./propTypesRuntime.js"),
  p = interopDefault(d),
  m = require("./reactDomRuntime.js"),
  g = interopDefault(m),
  v = require("./reactLifecyclesCompat.js"),
  y = require("./6c346159.js"),
  b = require("./7a543168.js"),
  w = require("./5049416d.js"),
  x = require("./51432b4d.js"),
  _ = require("./classNames.js"),
  E = interopDefault(_);
function S(e, t, n) {
  return n ? e[0] === t[0] : e[0] === t[0] && e[1] === t[1];
}
function k(e, t, n) {
  var r = e[t] || {};
  return i()({}, r, n);
}
function C(e, t, n, r) {
  var i = n.points;
  for (var o in e) if (e.hasOwnProperty(o) && S(e[o].points, i, r)) return t + "-placement-" + o;
  return "";
}
function O(e, t) {
  this[e] = t;
}
var T,
  L = require("./56376f43.js"),
  A = interopDefault(L);
function P(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function j(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? P(Object(n), !0).forEach(function (t) {
      R(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : P(Object(n)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function M(e) {
  "@babel/helpers - typeof";

  return M = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, M(e);
}
function R(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var N = {
  Webkit: "-webkit-",
  Moz: "-moz-",
  ms: "-ms-",
  O: "-o-"
};
function D() {
  if (void 0 !== T) return T;
  T = "";
  var e = document.createElement("p").style,
    t = "Transform";
  for (var n in N) n + t in e && (T = n);
  return T;
}
function I() {
  return D() ? "".concat(D(), "TransitionProperty") : "transitionProperty";
}
function $() {
  return D() ? "".concat(D(), "Transform") : "transform";
}
function F(e, t) {
  var n = I();
  n && (e.style[n] = t, "transitionProperty" !== n && (e.style.transitionProperty = t));
}
function B(e, t) {
  var n = $();
  n && (e.style[n] = t, "transform" !== n && (e.style.transform = t));
}
function V(e) {
  return e.style.transitionProperty || e.style[I()];
}
function W(e) {
  var t = window.getComputedStyle(e, null),
    n = t.getPropertyValue("transform") || t.getPropertyValue($());
  if (n && "none" !== n) {
    var r = n.replace(/[^0-9\-.,]/g, "").split(",");
    return {
      x: parseFloat(r[12] || r[4], 0),
      y: parseFloat(r[13] || r[5], 0)
    };
  }
  return {
    x: 0,
    y: 0
  };
}
var H = /matrix\((.*)\)/,
  U = /matrix3d\((.*)\)/;
function z(e, t) {
  var n = window.getComputedStyle(e, null),
    r = n.getPropertyValue("transform") || n.getPropertyValue($());
  if (r && "none" !== r) {
    var i,
      o = r.match(H);
    if (o) o = o[1], i = o.split(",").map(function (e) {
      return parseFloat(e, 10);
    }), i[4] = t.x, i[5] = t.y, B(e, "matrix(".concat(i.join(","), ")"));else {
      var a = r.match(U)[1];
      i = a.split(",").map(function (e) {
        return parseFloat(e, 10);
      }), i[12] = t.x, i[13] = t.y, B(e, "matrix3d(".concat(i.join(","), ")"));
    }
  } else B(e, "translateX(".concat(t.x, "px) translateY(").concat(t.y, "px) translateZ(0)"));
}
var G,
  q = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source;
function K(e) {
  var t = e.style.display;
  e.style.display = "none", e.offsetHeight, e.style.display = t;
}
function Y(e, t, n) {
  var r = n;
  if ("object" !== M(t)) return "undefined" !== typeof r ? ("number" === typeof r && (r = "".concat(r, "px")), void (e.style[t] = r)) : G(e, t);
  for (var i in t) t.hasOwnProperty(i) && Y(e, i, t[i]);
}
function X(e) {
  var t,
    n,
    r,
    i = e.ownerDocument,
    o = i.body,
    a = i && i.documentElement;
  return t = e.getBoundingClientRect(), n = Math.floor(t.left), r = Math.floor(t.top), n -= a.clientLeft || o.clientLeft || 0, r -= a.clientTop || o.clientTop || 0, {
    left: n,
    top: r
  };
}
function Q(e, t) {
  var n = e["page".concat(t ? "Y" : "X", "Offset")],
    r = "scroll".concat(t ? "Top" : "Left");
  if ("number" !== typeof n) {
    var i = e.document;
    n = i.documentElement[r], "number" !== typeof n && (n = i.body[r]);
  }
  return n;
}
function Z(e) {
  return Q(e);
}
function J(e) {
  return Q(e, !0);
}
function ee(e) {
  var t = X(e),
    n = e.ownerDocument,
    r = n.defaultView || n.parentWindow;
  return t.left += Z(r), t.top += J(r), t;
}
function te(e) {
  return null !== e && void 0 !== e && e == e.window;
}
function ne(e) {
  return te(e) ? e.document : 9 === e.nodeType ? e : e.ownerDocument;
}
function re(e, t, n) {
  var r = n,
    i = "",
    o = ne(e);
  return r = r || o.defaultView.getComputedStyle(e, null), r && (i = r.getPropertyValue(t) || r[t]), i;
}
var ie = new RegExp("^(".concat(q, ")(?!px)[a-z%]+$"), "i"),
  oe = /^(top|right|bottom|left)$/,
  ae = "currentStyle",
  se = "runtimeStyle",
  le = "left",
  ce = "px";
function ue(e, t) {
  var n = e[ae] && e[ae][t];
  if (ie.test(n) && !oe.test(t)) {
    var r = e.style,
      i = r[le],
      o = e[se][le];
    e[se][le] = e[ae][le], r[le] = "fontSize" === t ? "1em" : n || 0, n = r.pixelLeft + ce, r[le] = i, e[se][le] = o;
  }
  return "" === n ? "auto" : n;
}
function he(e, t) {
  return "left" === e ? t.useCssRight ? "right" : e : t.useCssBottom ? "bottom" : e;
}
function fe(e) {
  return "left" === e ? "right" : "right" === e ? "left" : "top" === e ? "bottom" : "bottom" === e ? "top" : void 0;
}
function de(e, t, n) {
  "static" === Y(e, "position") && (e.style.position = "relative");
  var r = -999,
    i = -999,
    o = he("left", n),
    a = he("top", n),
    s = fe(o),
    l = fe(a);
  "left" !== o && (r = 999), "top" !== a && (i = 999);
  var c = "",
    u = ee(e);
  ("left" in t || "top" in t) && (c = V(e) || "", F(e, "none")), "left" in t && (e.style[s] = "", e.style[o] = "".concat(r, "px")), "top" in t && (e.style[l] = "", e.style[a] = "".concat(i, "px")), K(e);
  var h = ee(e),
    f = {};
  for (var d in t) if (t.hasOwnProperty(d)) {
    var p = he(d, n),
      m = "left" === d ? r : i,
      g = u[d] - h[d];
    f[p] = p === d ? m + g : m - g;
  }
  Y(e, f), K(e), ("left" in t || "top" in t) && F(e, c);
  var v = {};
  for (var y in t) if (t.hasOwnProperty(y)) {
    var b = he(y, n),
      w = t[y] - u[y];
    v[b] = y === b ? f[b] + w : f[b] - w;
  }
  Y(e, v);
}
function pe(e, t) {
  var n = ee(e),
    r = W(e),
    i = {
      x: r.x,
      y: r.y
    };
  "left" in t && (i.x = r.x + t.left - n.left), "top" in t && (i.y = r.y + t.top - n.top), z(e, i);
}
function me(e, t, n) {
  if (n.ignoreShake) {
    var r = ee(e),
      i = r.left.toFixed(0),
      o = r.top.toFixed(0),
      a = t.left.toFixed(0),
      s = t.top.toFixed(0);
    if (i === a && o === s) return;
  }
  n.useCssRight || n.useCssBottom ? de(e, t, n) : n.useCssTransform && $() in document.body.style ? pe(e, t) : de(e, t, n);
}
function ge(e, t) {
  for (var n = 0; n < e.length; n++) t(e[n]);
}
function ve(e) {
  return "border-box" === G(e, "boxSizing");
}
"undefined" !== typeof window && (G = window.getComputedStyle ? re : ue);
var ye = ["margin", "border", "padding"],
  be = -1,
  we = 2,
  xe = 1,
  _e = 0;
function Ee(e, t, n) {
  var r,
    i = {},
    o = e.style;
  for (r in t) t.hasOwnProperty(r) && (i[r] = o[r], o[r] = t[r]);
  for (r in n.call(e), t) t.hasOwnProperty(r) && (o[r] = i[r]);
}
function Se(e, t, n) {
  var r,
    i,
    o,
    a = 0;
  for (i = 0; i < t.length; i++) if (r = t[i], r) for (o = 0; o < n.length; o++) {
    var s = void 0;
    s = "border" === r ? "".concat(r).concat(n[o], "Width") : r + n[o], a += parseFloat(G(e, s)) || 0;
  }
  return a;
}
var ke = {
  getParent: function (e) {
    var t = e;
    do {
      t = 11 === t.nodeType && t.host ? t.host : t.parentNode;
    } while (t && 1 !== t.nodeType && 9 !== t.nodeType);
    return t;
  }
};
function Ce(e, t, n) {
  var r = n;
  if (te(e)) return "width" === t ? ke.viewportWidth(e) : ke.viewportHeight(e);
  if (9 === e.nodeType) return "width" === t ? ke.docWidth(e) : ke.docHeight(e);
  var i = "width" === t ? ["Left", "Right"] : ["Top", "Bottom"],
    o = "width" === t ? Math.floor(e.getBoundingClientRect().width) : Math.floor(e.getBoundingClientRect().height),
    a = ve(e),
    s = 0;
  (null === o || void 0 === o || o <= 0) && (o = void 0, s = G(e, t), (null === s || void 0 === s || Number(s) < 0) && (s = e.style[t] || 0), s = Math.floor(parseFloat(s)) || 0), void 0 === r && (r = a ? xe : be);
  var l = void 0 !== o || a,
    c = o || s;
  return r === be ? l ? c - Se(e, ["border", "padding"], i) : s : l ? r === xe ? c : c + (r === we ? -Se(e, ["border"], i) : Se(e, ["margin"], i)) : s + Se(e, ye.slice(r), i);
}
ge(["Width", "Height"], function (e) {
  ke["doc".concat(e)] = function (t) {
    var n = t.document;
    return Math.max(n.documentElement["scroll".concat(e)], n.body["scroll".concat(e)], ke["viewport".concat(e)](n));
  }, ke["viewport".concat(e)] = function (t) {
    var n = "client".concat(e),
      r = t.document,
      i = r.body,
      o = r.documentElement,
      a = o[n];
    return "CSS1Compat" === r.compatMode && a || i && i[n] || a;
  };
});
var Oe = {
  position: "absolute",
  visibility: "hidden",
  display: "block"
};
function Te() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
  var r,
    i = t[0];
  return 0 !== i.offsetWidth ? r = Ce.apply(void 0, t) : Ee(i, Oe, function () {
    r = Ce.apply(void 0, t);
  }), r;
}
function Le(e, t) {
  for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
  return e;
}
ge(["width", "height"], function (e) {
  var t = e.charAt(0).toUpperCase() + e.slice(1);
  ke["outer".concat(t)] = function (t, n) {
    return t && Te(t, e, n ? _e : xe);
  };
  var n = "width" === e ? ["Left", "Right"] : ["Top", "Bottom"];
  ke[e] = function (t, r) {
    var i = r;
    if (void 0 === i) return t && Te(t, e, be);
    if (t) {
      var o = ve(t);
      return o && (i += Se(t, ["padding", "border"], n)), Y(t, e, i);
    }
  };
});
var Ae = {
  getWindow: function (e) {
    if (e && e.document && e.setTimeout) return e;
    var t = e.ownerDocument || e;
    return t.defaultView || t.parentWindow;
  },
  getDocument: ne,
  offset: function (e, t, n) {
    if ("undefined" === typeof t) return ee(e);
    me(e, t, n || {});
  },
  isWindow: te,
  each: ge,
  css: Y,
  clone: function (e) {
    var t,
      n = {};
    for (t in e) e.hasOwnProperty(t) && (n[t] = e[t]);
    var r = e.overflow;
    if (r) for (t in e) e.hasOwnProperty(t) && (n.overflow[t] = e.overflow[t]);
    return n;
  },
  mix: Le,
  getWindowScrollLeft: function (e) {
    return Z(e);
  },
  getWindowScrollTop: function (e) {
    return J(e);
  },
  merge: function () {
    for (var e = {}, t = 0; t < arguments.length; t++) Ae.mix(e, t < 0 || arguments.length <= t ? void 0 : arguments[t]);
    return e;
  },
  viewportWidth: 0,
  viewportHeight: 0
};
Le(Ae, ke);
var Pe = Ae.getParent;
function je(e) {
  if (Ae.isWindow(e) || 9 === e.nodeType) return null;
  var t,
    n = Ae.getDocument(e),
    r = n.body,
    i = Ae.css(e, "position"),
    o = "fixed" === i || "absolute" === i;
  if (!o) return "html" === e.nodeName.toLowerCase() ? null : Pe(e);
  for (t = Pe(e); t && t !== r && 9 !== t.nodeType; t = Pe(t)) if (i = Ae.css(t, "position"), "static" !== i) return t;
  return null;
}
var Me = Ae.getParent;
function Re(e) {
  if (Ae.isWindow(e) || 9 === e.nodeType) return !1;
  var t = Ae.getDocument(e),
    n = t.body,
    r = null;
  for (r = Me(e); r && r !== n && r !== t; r = Me(r)) {
    var i = Ae.css(r, "position");
    if ("fixed" === i) return !0;
  }
  return !1;
}
function Ne(e, t) {
  var n = {
      left: 0,
      right: 1 / 0,
      top: 0,
      bottom: 1 / 0
    },
    r = je(e),
    i = Ae.getDocument(e),
    o = i.defaultView || i.parentWindow,
    a = i.body,
    s = i.documentElement;
  while (r) {
    if (-1 !== navigator.userAgent.indexOf("MSIE") && 0 === r.clientWidth || r === a || r === s || "visible" === Ae.css(r, "overflow")) {
      if (r === a || r === s) break;
    } else {
      var l = Ae.offset(r);
      l.left += r.clientLeft, l.top += r.clientTop, n.top = Math.max(n.top, l.top), n.right = Math.min(n.right, l.left + r.clientWidth), n.bottom = Math.min(n.bottom, l.top + r.clientHeight), n.left = Math.max(n.left, l.left);
    }
    r = je(r);
  }
  var c = null;
  if (!Ae.isWindow(e) && 9 !== e.nodeType) {
    c = e.style.position;
    var u = Ae.css(e, "position");
    "absolute" === u && (e.style.position = "fixed");
  }
  var h = Ae.getWindowScrollLeft(o),
    f = Ae.getWindowScrollTop(o),
    d = Ae.viewportWidth(o),
    p = Ae.viewportHeight(o),
    m = s.scrollWidth,
    g = s.scrollHeight,
    v = window.getComputedStyle(a);
  if ("hidden" === v.overflowX && (m = o.innerWidth), "hidden" === v.overflowY && (g = o.innerHeight), e.style && (e.style.position = c), t || Re(e)) n.left = Math.max(n.left, h), n.top = Math.max(n.top, f), n.right = Math.min(n.right, h + d), n.bottom = Math.min(n.bottom, f + p);else {
    var y = Math.max(m, h + d);
    n.right = Math.min(n.right, y);
    var b = Math.max(g, f + p);
    n.bottom = Math.min(n.bottom, b);
  }
  return n.top >= 0 && n.left >= 0 && n.bottom > n.top && n.right > n.left ? n : null;
}
function De(e, t, n, r) {
  var i = Ae.clone(e),
    o = {
      width: t.width,
      height: t.height
    };
  return r.adjustX && i.left < n.left && (i.left = n.left), r.resizeWidth && i.left >= n.left && i.left + o.width > n.right && (o.width -= i.left + o.width - n.right), r.adjustX && i.left + o.width > n.right && (i.left = Math.max(n.right - o.width, n.left)), r.adjustY && i.top < n.top && (i.top = n.top), r.resizeHeight && i.top >= n.top && i.top + o.height > n.bottom && (o.height -= i.top + o.height - n.bottom), r.adjustY && i.top + o.height > n.bottom && (i.top = Math.max(n.bottom - o.height, n.top)), Ae.mix(i, o);
}
function Ie(e) {
  var t, n, r;
  if (Ae.isWindow(e) || 9 === e.nodeType) {
    var i = Ae.getWindow(e);
    t = {
      left: Ae.getWindowScrollLeft(i),
      top: Ae.getWindowScrollTop(i)
    }, n = Ae.viewportWidth(i), r = Ae.viewportHeight(i);
  } else t = Ae.offset(e), n = Ae.outerWidth(e), r = Ae.outerHeight(e);
  return t.width = n, t.height = r, t;
}
function $e(e, t) {
  var n = t.charAt(0),
    r = t.charAt(1),
    i = e.width,
    o = e.height,
    a = e.left,
    s = e.top;
  return "c" === n ? s += o / 2 : "b" === n && (s += o), "c" === r ? a += i / 2 : "r" === r && (a += i), {
    left: a,
    top: s
  };
}
function Fe(e, t, n, r, i) {
  var o = $e(t, n[1]),
    a = $e(e, n[0]),
    s = [a.left - o.left, a.top - o.top];
  return {
    left: Math.round(e.left - s[0] + r[0] - i[0]),
    top: Math.round(e.top - s[1] + r[1] - i[1])
  };
}
function Be(e, t, n) {
  return e.left < n.left || e.left + t.width > n.right;
}
function Ve(e, t, n) {
  return e.top < n.top || e.top + t.height > n.bottom;
}
function We(e, t, n) {
  return e.left > n.right || e.left + t.width < n.left;
}
function He(e, t, n) {
  return e.top > n.bottom || e.top + t.height < n.top;
}
function Ue(e, t, n) {
  var r = [];
  return Ae.each(e, function (e) {
    r.push(e.replace(t, function (e) {
      return n[e];
    }));
  }), r;
}
function ze(e, t) {
  return e[t] = -e[t], e;
}
function Ge(e, t) {
  var n;
  return n = /%$/.test(e) ? parseInt(e.substring(0, e.length - 1), 10) / 100 * t : parseInt(e, 10), n || 0;
}
function qe(e, t) {
  e[0] = Ge(e[0], t.width), e[1] = Ge(e[1], t.height);
}
function Ke(e, t, n, r) {
  var i = n.points,
    o = n.offset || [0, 0],
    a = n.targetOffset || [0, 0],
    s = n.overflow,
    l = n.source || e;
  o = [].concat(o), a = [].concat(a), s = s || {};
  var c = {},
    u = 0,
    h = !(!s || !s.alwaysByViewport),
    f = Ne(l, h),
    d = Ie(l);
  qe(o, d), qe(a, t);
  var p = Fe(d, t, i, o, a),
    m = Ae.merge(d, p);
  if (f && (s.adjustX || s.adjustY) && r) {
    if (s.adjustX && Be(p, d, f)) {
      var g = Ue(i, /[lr]/gi, {
          l: "r",
          r: "l"
        }),
        v = ze(o, 0),
        y = ze(a, 0),
        b = Fe(d, t, g, v, y);
      We(b, d, f) || (u = 1, i = g, o = v, a = y);
    }
    if (s.adjustY && Ve(p, d, f)) {
      var w = Ue(i, /[tb]/gi, {
          t: "b",
          b: "t"
        }),
        x = ze(o, 1),
        _ = ze(a, 1),
        E = Fe(d, t, w, x, _);
      He(E, d, f) || (u = 1, i = w, o = x, a = _);
    }
    u && (p = Fe(d, t, i, o, a), Ae.mix(m, p));
    var S = Be(p, d, f),
      k = Ve(p, d, f);
    if (S || k) {
      var C = i;
      S && (C = Ue(i, /[lr]/gi, {
        l: "r",
        r: "l"
      })), k && (C = Ue(i, /[tb]/gi, {
        t: "b",
        b: "t"
      })), i = C, o = n.offset || [0, 0], a = n.targetOffset || [0, 0];
    }
    c.adjustX = s.adjustX && S, c.adjustY = s.adjustY && k, (c.adjustX || c.adjustY) && (m = De(p, d, f, c));
  }
  return m.width !== d.width && Ae.css(l, "width", Ae.width(l) + m.width - d.width), m.height !== d.height && Ae.css(l, "height", Ae.height(l) + m.height - d.height), Ae.offset(l, {
    left: m.left,
    top: m.top
  }, {
    useCssRight: n.useCssRight,
    useCssBottom: n.useCssBottom,
    useCssTransform: n.useCssTransform,
    ignoreShake: n.ignoreShake
  }), {
    points: i,
    offset: o,
    targetOffset: a,
    overflow: c
  };
}
function Ye(e, t) {
  var n = Ne(e, t),
    r = Ie(e);
  return !n || r.left + r.width <= n.left || r.top + r.height <= n.top || r.left >= n.right || r.top >= n.bottom;
}
function Xe(e, t, n) {
  var r = n.target || t,
    i = Ie(r),
    o = !Ye(r, n.overflow && n.overflow.alwaysByViewport);
  return Ke(e, i, n, o);
}
function Qe(e, t, n) {
  var r,
    i,
    o = Ae.getDocument(e),
    a = o.defaultView || o.parentWindow,
    s = Ae.getWindowScrollLeft(a),
    l = Ae.getWindowScrollTop(a),
    c = Ae.viewportWidth(a),
    u = Ae.viewportHeight(a);
  r = "pageX" in t ? t.pageX : s + t.clientX, i = "pageY" in t ? t.pageY : l + t.clientY;
  var h = {
      left: r,
      top: i,
      width: 0,
      height: 0
    },
    f = r >= 0 && r <= s + c && i >= 0 && i <= l + u,
    d = [n.points[0], "cc"];
  return Ke(e, h, j(j({}, n), {}, {
    points: d
  }), f);
}
Xe.__getOffsetParent = je, Xe.__getVisibleRectForElement = Ne;
function Ze(e, t) {
  var n = void 0;
  function r() {
    n && (clearTimeout(n), n = null);
  }
  function i() {
    r(), n = setTimeout(e, t);
  }
  return i.clear = r, i;
}
function Je(e, t) {
  return e === t || !(!e || !t) && ("pageX" in t && "pageY" in t ? e.pageX === t.pageX && e.pageY === t.pageY : "clientX" in t && "clientY" in t && e.clientX === t.clientX && e.clientY === t.clientY);
}
function et(e) {
  return e && "object" === typeof e && e.window === e;
}
function tt(e, t) {
  var n = Math.floor(e),
    r = Math.floor(t);
  return Math.abs(n - r) <= 1;
}
function nt(e, t) {
  e !== document.activeElement && Object(y["a"])(t, e) && e.focus();
}
function rt(e) {
  return "function" === typeof e && e ? e() : null;
}
function it(e) {
  return "object" === typeof e && e ? e : null;
}
var ot = function (e) {
  function t() {
    var e, n, r, i;
    a()(this, t);
    for (var o = arguments.length, s = Array(o), c = 0; c < o; c++) s[c] = arguments[c];
    return r = l()(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(s))), n = r, r.forceAlign = function () {
      var e = r.props,
        t = e.disabled,
        n = e.target,
        i = e.align,
        o = e.onAlign;
      if (!t && n) {
        var a = g.a.findDOMNode(r),
          s = void 0,
          l = rt(n),
          c = it(n),
          u = document.activeElement;
        l ? s = Xe(a, l, i) : c && (s = Qe(a, c, i)), nt(u, a), o && o(a, s);
      }
    }, i = n, l()(r, i);
  }
  return u()(t, e), A()(t, [{
    key: "componentDidMount",
    value: function () {
      var e = this.props;
      this.forceAlign(), !e.disabled && e.monitorWindowResize && this.startMonitorWindowResize();
    }
  }, {
    key: "componentDidUpdate",
    value: function (e) {
      var t = !1,
        n = this.props;
      if (!n.disabled) {
        var r = g.a.findDOMNode(this),
          i = r ? r.getBoundingClientRect() : null;
        if (e.disabled) t = !0;else {
          var o = rt(e.target),
            a = rt(n.target),
            s = it(e.target),
            l = it(n.target);
          et(o) && et(a) ? t = !1 : (o !== a || o && !a && l || s && l && a || l && !Je(s, l)) && (t = !0);
          var c = this.sourceRect || {};
          t || !r || tt(c.width, i.width) && tt(c.height, i.height) || (t = !0);
        }
        this.sourceRect = i;
      }
      t && this.forceAlign(), n.monitorWindowResize && !n.disabled ? this.startMonitorWindowResize() : this.stopMonitorWindowResize();
    }
  }, {
    key: "componentWillUnmount",
    value: function () {
      this.stopMonitorWindowResize();
    }
  }, {
    key: "startMonitorWindowResize",
    value: function () {
      this.resizeHandler || (this.bufferMonitor = Ze(this.forceAlign, this.props.monitorBufferTime), this.resizeHandler = Object(b["a"])(window, "resize", this.bufferMonitor));
    }
  }, {
    key: "stopMonitorWindowResize",
    value: function () {
      this.resizeHandler && (this.bufferMonitor.clear(), this.resizeHandler.remove(), this.resizeHandler = null);
    }
  }, {
    key: "render",
    value: function () {
      var e = this,
        t = this.props,
        n = t.childrenProps,
        r = t.children,
        i = f.a.Children.only(r);
      if (n) {
        var o = {},
          a = Object.keys(n);
        return a.forEach(function (t) {
          o[t] = e.props[n[t]];
        }), f.a.cloneElement(i, o);
      }
      return i;
    }
  }]), t;
}(h["Component"]);
ot.propTypes = {
  childrenProps: p.a.object,
  align: p.a.object.isRequired,
  target: p.a.oneOfType([p.a.func, p.a.shape({
    clientX: p.a.number,
    clientY: p.a.number,
    pageX: p.a.number,
    pageY: p.a.number
  })]),
  onAlign: p.a.func,
  monitorBufferTime: p.a.number,
  monitorWindowResize: p.a.bool,
  disabled: p.a.bool,
  children: p.a.any
}, ot.defaultProps = {
  target: function () {
    return window;
  },
  monitorBufferTime: 50,
  monitorWindowResize: !1,
  disabled: !1
};
var at = ot,
  st = at,
  lt = require("./4d466a32.js"),
  ct = require("./objectWithoutProperties.js"),
  ut = interopDefault(ct),
  ht = function (e) {
    function t() {
      return a()(this, t), l()(this, e.apply(this, arguments));
    }
    return u()(t, e), t.prototype.shouldComponentUpdate = function (e) {
      return e.hiddenClassName || e.visible;
    }, t.prototype.render = function () {
      var e = this.props,
        t = e.hiddenClassName,
        n = e.visible,
        r = ut()(e, ["hiddenClassName", "visible"]);
      return t || f.a.Children.count(r.children) > 1 ? (!n && t && (r.className += " " + t), f.a.createElement("div", r)) : f.a.Children.only(r.children);
    }, t;
  }(h["Component"]);
ht.propTypes = {
  children: p.a.any,
  className: p.a.string,
  visible: p.a.bool,
  hiddenClassName: p.a.string
};
var ft = ht,
  dt = function (e) {
    function t() {
      return a()(this, t), l()(this, e.apply(this, arguments));
    }
    return u()(t, e), t.prototype.render = function () {
      var e = this.props,
        t = e.className;
      return e.visible || (t += " " + e.hiddenClassName), f.a.createElement("div", {
        className: t,
        onMouseEnter: e.onMouseEnter,
        onMouseLeave: e.onMouseLeave,
        onMouseDown: e.onMouseDown,
        onTouchStart: e.onTouchStart,
        style: e.style
      }, f.a.createElement(ft, {
        className: e.prefixCls + "-content",
        visible: e.visible
      }, e.children));
    }, t;
  }(h["Component"]);
dt.propTypes = {
  hiddenClassName: p.a.string,
  className: p.a.string,
  prefixCls: p.a.string,
  onMouseEnter: p.a.func,
  onMouseLeave: p.a.func,
  onMouseDown: p.a.func,
  onTouchStart: p.a.func,
  children: p.a.any
};
var pt = dt,
  mt = function (e) {
    function t(n) {
      a()(this, t);
      var r = l()(this, e.call(this, n));
      return gt.call(r), r.state = {
        stretchChecked: !1,
        targetWidth: void 0,
        targetHeight: void 0
      }, r.savePopupRef = O.bind(r, "popupInstance"), r.saveAlignRef = O.bind(r, "alignInstance"), r;
    }
    return u()(t, e), t.prototype.componentDidMount = function () {
      this.rootNode = this.getPopupDomNode(), this.setStretchSize();
    }, t.prototype.componentDidUpdate = function () {
      this.setStretchSize();
    }, t.prototype.getPopupDomNode = function () {
      return g.a.findDOMNode(this.popupInstance);
    }, t.prototype.getMaskTransitionName = function () {
      var e = this.props,
        t = e.maskTransitionName,
        n = e.maskAnimation;
      return !t && n && (t = e.prefixCls + "-" + n), t;
    }, t.prototype.getTransitionName = function () {
      var e = this.props,
        t = e.transitionName;
      return !t && e.animation && (t = e.prefixCls + "-" + e.animation), t;
    }, t.prototype.getClassName = function (e) {
      return this.props.prefixCls + " " + this.props.className + " " + e;
    }, t.prototype.getPopupElement = function () {
      var e = this,
        t = this.savePopupRef,
        n = this.state,
        r = n.stretchChecked,
        o = n.targetHeight,
        a = n.targetWidth,
        s = this.props,
        l = s.align,
        c = s.visible,
        u = s.prefixCls,
        h = s.style,
        d = s.getClassNameFromAlign,
        p = s.destroyPopupOnHide,
        m = s.stretch,
        g = s.children,
        v = s.onMouseEnter,
        y = s.onMouseLeave,
        b = s.onMouseDown,
        w = s.onTouchStart,
        x = this.getClassName(this.currentAlignClassName || d(l)),
        _ = u + "-hidden";
      c || (this.currentAlignClassName = null);
      var E = {};
      m && (-1 !== m.indexOf("height") ? E.height = o : -1 !== m.indexOf("minHeight") && (E.minHeight = o), -1 !== m.indexOf("width") ? E.width = a : -1 !== m.indexOf("minWidth") && (E.minWidth = a), r || (E.visibility = "hidden", setTimeout(function () {
        e.alignInstance && e.alignInstance.forceAlign();
      }, 0)));
      var S = i()({}, E, h, this.getZIndexStyle()),
        k = {
          className: x,
          prefixCls: u,
          ref: t,
          onMouseEnter: v,
          onMouseLeave: y,
          onMouseDown: b,
          onTouchStart: w,
          style: S
        };
      return p ? f.a.createElement(lt["a"], {
        component: "",
        exclusive: !0,
        transitionAppear: !0,
        transitionName: this.getTransitionName()
      }, c ? f.a.createElement(st, {
        target: this.getAlignTarget(),
        key: "popup",
        ref: this.saveAlignRef,
        monitorWindowResize: !0,
        align: l,
        onAlign: this.onAlign
      }, f.a.createElement(pt, i()({
        visible: !0
      }, k), g)) : null) : f.a.createElement(lt["a"], {
        component: "",
        exclusive: !0,
        transitionAppear: !0,
        transitionName: this.getTransitionName(),
        showProp: "xVisible"
      }, f.a.createElement(st, {
        target: this.getAlignTarget(),
        key: "popup",
        ref: this.saveAlignRef,
        monitorWindowResize: !0,
        xVisible: c,
        childrenProps: {
          visible: "xVisible"
        },
        disabled: !c,
        align: l,
        onAlign: this.onAlign
      }, f.a.createElement(pt, i()({
        hiddenClassName: _
      }, k), g)));
    }, t.prototype.getZIndexStyle = function () {
      var e = {},
        t = this.props;
      return void 0 !== t.zIndex && (e.zIndex = t.zIndex), e;
    }, t.prototype.getMaskElement = function () {
      var e = this.props,
        t = void 0;
      if (e.mask) {
        var n = this.getMaskTransitionName();
        t = f.a.createElement(ft, {
          style: this.getZIndexStyle(),
          key: "mask",
          className: e.prefixCls + "-mask",
          hiddenClassName: e.prefixCls + "-mask-hidden",
          visible: e.visible
        }), n && (t = f.a.createElement(lt["a"], {
          key: "mask",
          showProp: "visible",
          transitionAppear: !0,
          component: "",
          transitionName: n
        }, t));
      }
      return t;
    }, t.prototype.render = function () {
      return f.a.createElement("div", null, this.getMaskElement(), this.getPopupElement());
    }, t;
  }(h["Component"]);
mt.propTypes = {
  visible: p.a.bool,
  style: p.a.object,
  getClassNameFromAlign: p.a.func,
  onAlign: p.a.func,
  getRootDomNode: p.a.func,
  align: p.a.any,
  destroyPopupOnHide: p.a.bool,
  className: p.a.string,
  prefixCls: p.a.string,
  onMouseEnter: p.a.func,
  onMouseLeave: p.a.func,
  onMouseDown: p.a.func,
  onTouchStart: p.a.func,
  stretch: p.a.string,
  children: p.a.node,
  point: p.a.shape({
    pageX: p.a.number,
    pageY: p.a.number
  })
};
var gt = function () {
    var e = this;
    this.onAlign = function (t, n) {
      var r = e.props,
        i = r.getClassNameFromAlign(n);
      e.currentAlignClassName !== i && (e.currentAlignClassName = i, t.className = e.getClassName(i)), r.onAlign(t, n);
    }, this.setStretchSize = function () {
      var t = e.props,
        n = t.stretch,
        r = t.getRootDomNode,
        i = t.visible,
        o = e.state,
        a = o.stretchChecked,
        s = o.targetHeight,
        l = o.targetWidth;
      if (n && i) {
        var c = r();
        if (c) {
          var u = c.offsetHeight,
            h = c.offsetWidth;
          s === u && l === h && a || e.setState({
            stretchChecked: !0,
            targetHeight: u,
            targetWidth: h
          });
        }
      } else a && e.setState({
        stretchChecked: !1
      });
    }, this.getTargetElement = function () {
      return e.props.getRootDomNode();
    }, this.getAlignTarget = function () {
      var t = e.props.point;
      return t || e.getTargetElement;
    };
  },
  vt = mt;
function yt() {}
function bt() {
  return "";
}
function wt() {
  return window.document;
}
var xt = ["onClick", "onMouseDown", "onTouchStart", "onMouseEnter", "onMouseLeave", "onFocus", "onBlur", "onContextMenu"],
  _t = !!m["createPortal"],
  Et = {
    rcTrigger: p.a.shape({
      onPopupMouseDown: p.a.func
    })
  },
  St = function (e) {
    function t(n) {
      a()(this, t);
      var r = l()(this, e.call(this, n));
      kt.call(r);
      var i = void 0;
      return i = "popupVisible" in n ? !!n.popupVisible : !!n.defaultPopupVisible, r.state = {
        prevPopupVisible: i,
        popupVisible: i
      }, xt.forEach(function (e) {
        r["fire" + e] = function (t) {
          r.fireEvents(e, t);
        };
      }), r;
    }
    return u()(t, e), t.prototype.getChildContext = function () {
      return {
        rcTrigger: {
          onPopupMouseDown: this.onPopupMouseDown
        }
      };
    }, t.prototype.componentDidMount = function () {
      this.componentDidUpdate({}, {
        popupVisible: this.state.popupVisible
      });
    }, t.prototype.componentDidUpdate = function (e, t) {
      var n = this.props,
        r = this.state,
        i = function () {
          t.popupVisible !== r.popupVisible && n.afterPopupVisibleChange(r.popupVisible);
        };
      if (_t || this.renderComponent(null, i), r.popupVisible) {
        var o = void 0;
        return this.clickOutsideHandler || !this.isClickToHide() && !this.isContextMenuToShow() || (o = n.getDocument(), this.clickOutsideHandler = Object(b["a"])(o, "mousedown", this.onDocumentClick)), this.touchOutsideHandler || (o = o || n.getDocument(), this.touchOutsideHandler = Object(b["a"])(o, "touchstart", this.onDocumentClick)), !this.contextMenuOutsideHandler1 && this.isContextMenuToShow() && (o = o || n.getDocument(), this.contextMenuOutsideHandler1 = Object(b["a"])(o, "scroll", this.onContextMenuClose)), void (!this.contextMenuOutsideHandler2 && this.isContextMenuToShow() && (this.contextMenuOutsideHandler2 = Object(b["a"])(window, "blur", this.onContextMenuClose)));
      }
      this.clearOutsideHandler();
    }, t.prototype.componentWillUnmount = function () {
      this.clearDelayTimer(), this.clearOutsideHandler(), clearTimeout(this.mouseDownTimeout);
    }, t.getDerivedStateFromProps = function (e, t) {
      var n = e.popupVisible,
        r = {};
      return void 0 !== n && t.popupVisible !== n && (r.popupVisible = n, r.prevPopupVisible = t.popupVisible), r;
    }, t.prototype.getPopupDomNode = function () {
      return this._component && this._component.getPopupDomNode ? this._component.getPopupDomNode() : null;
    }, t.prototype.getPopupAlign = function () {
      var e = this.props,
        t = e.popupPlacement,
        n = e.popupAlign,
        r = e.builtinPlacements;
      return t && r ? k(r, t, n) : n;
    }, t.prototype.setPopupVisible = function (e, t) {
      var n = this.props.alignPoint,
        r = this.state.popupVisible;
      this.clearDelayTimer(), r !== e && ("popupVisible" in this.props || this.setState({
        popupVisible: e,
        prevPopupVisible: r
      }), this.props.onPopupVisibleChange(e)), n && t && this.setPoint(t);
    }, t.prototype.delaySetPopupVisible = function (e, t, n) {
      var r = this,
        i = 1e3 * t;
      if (this.clearDelayTimer(), i) {
        var o = n ? {
          pageX: n.pageX,
          pageY: n.pageY
        } : null;
        this.delayTimer = setTimeout(function () {
          r.setPopupVisible(e, o), r.clearDelayTimer();
        }, i);
      } else this.setPopupVisible(e, n);
    }, t.prototype.clearDelayTimer = function () {
      this.delayTimer && (clearTimeout(this.delayTimer), this.delayTimer = null);
    }, t.prototype.clearOutsideHandler = function () {
      this.clickOutsideHandler && (this.clickOutsideHandler.remove(), this.clickOutsideHandler = null), this.contextMenuOutsideHandler1 && (this.contextMenuOutsideHandler1.remove(), this.contextMenuOutsideHandler1 = null), this.contextMenuOutsideHandler2 && (this.contextMenuOutsideHandler2.remove(), this.contextMenuOutsideHandler2 = null), this.touchOutsideHandler && (this.touchOutsideHandler.remove(), this.touchOutsideHandler = null);
    }, t.prototype.createTwoChains = function (e) {
      var t = this.props.children.props,
        n = this.props;
      return t[e] && n[e] ? this["fire" + e] : t[e] || n[e];
    }, t.prototype.isClickToShow = function () {
      var e = this.props,
        t = e.action,
        n = e.showAction;
      return -1 !== t.indexOf("click") || -1 !== n.indexOf("click");
    }, t.prototype.isContextMenuToShow = function () {
      var e = this.props,
        t = e.action,
        n = e.showAction;
      return -1 !== t.indexOf("contextMenu") || -1 !== n.indexOf("contextMenu");
    }, t.prototype.isClickToHide = function () {
      var e = this.props,
        t = e.action,
        n = e.hideAction;
      return -1 !== t.indexOf("click") || -1 !== n.indexOf("click");
    }, t.prototype.isMouseEnterToShow = function () {
      var e = this.props,
        t = e.action,
        n = e.showAction;
      return -1 !== t.indexOf("hover") || -1 !== n.indexOf("mouseEnter");
    }, t.prototype.isMouseLeaveToHide = function () {
      var e = this.props,
        t = e.action,
        n = e.hideAction;
      return -1 !== t.indexOf("hover") || -1 !== n.indexOf("mouseLeave");
    }, t.prototype.isFocusToShow = function () {
      var e = this.props,
        t = e.action,
        n = e.showAction;
      return -1 !== t.indexOf("focus") || -1 !== n.indexOf("focus");
    }, t.prototype.isBlurToHide = function () {
      var e = this.props,
        t = e.action,
        n = e.hideAction;
      return -1 !== t.indexOf("focus") || -1 !== n.indexOf("blur");
    }, t.prototype.forcePopupAlign = function () {
      this.state.popupVisible && this._component && this._component.alignInstance && this._component.alignInstance.forceAlign();
    }, t.prototype.fireEvents = function (e, t) {
      var n = this.props.children.props[e];
      n && n(t);
      var r = this.props[e];
      r && r(t);
    }, t.prototype.close = function () {
      this.setPopupVisible(!1);
    }, t.prototype.render = function () {
      var e = this,
        t = this.state.popupVisible,
        n = this.props,
        r = n.children,
        i = n.forceRender,
        o = n.alignPoint,
        a = n.className,
        s = f.a.Children.only(r),
        l = {
          key: "trigger"
        };
      this.isContextMenuToShow() ? l.onContextMenu = this.onContextMenu : l.onContextMenu = this.createTwoChains("onContextMenu"), this.isClickToHide() || this.isClickToShow() ? (l.onClick = this.onClick, l.onMouseDown = this.onMouseDown, l.onTouchStart = this.onTouchStart) : (l.onClick = this.createTwoChains("onClick"), l.onMouseDown = this.createTwoChains("onMouseDown"), l.onTouchStart = this.createTwoChains("onTouchStart")), this.isMouseEnterToShow() ? (l.onMouseEnter = this.onMouseEnter, o && (l.onMouseMove = this.onMouseMove)) : l.onMouseEnter = this.createTwoChains("onMouseEnter"), this.isMouseLeaveToHide() ? l.onMouseLeave = this.onMouseLeave : l.onMouseLeave = this.createTwoChains("onMouseLeave"), this.isFocusToShow() || this.isBlurToHide() ? (l.onFocus = this.onFocus, l.onBlur = this.onBlur) : (l.onFocus = this.createTwoChains("onFocus"), l.onBlur = this.createTwoChains("onBlur"));
      var c = E()(s && s.props && s.props.className, a);
      c && (l.className = c);
      var u = f.a.cloneElement(s, l);
      if (!_t) return f.a.createElement(w["a"], {
        parent: this,
        visible: t,
        autoMount: !1,
        forceRender: i,
        getComponent: this.getComponent,
        getContainer: this.getContainer
      }, function (t) {
        var n = t.renderComponent;
        return e.renderComponent = n, u;
      });
      var h = void 0;
      return (t || this._component || i) && (h = f.a.createElement(x["a"], {
        key: "portal",
        getContainer: this.getContainer,
        didUpdate: this.handlePortalUpdate
      }, this.getComponent())), [u, h];
    }, t;
  }(f.a.Component);
St.propTypes = {
  children: p.a.any,
  action: p.a.oneOfType([p.a.string, p.a.arrayOf(p.a.string)]),
  showAction: p.a.any,
  hideAction: p.a.any,
  getPopupClassNameFromAlign: p.a.any,
  onPopupVisibleChange: p.a.func,
  afterPopupVisibleChange: p.a.func,
  popup: p.a.oneOfType([p.a.node, p.a.func]).isRequired,
  popupStyle: p.a.object,
  prefixCls: p.a.string,
  popupClassName: p.a.string,
  className: p.a.string,
  popupPlacement: p.a.string,
  builtinPlacements: p.a.object,
  popupTransitionName: p.a.oneOfType([p.a.string, p.a.object]),
  popupAnimation: p.a.any,
  mouseEnterDelay: p.a.number,
  mouseLeaveDelay: p.a.number,
  zIndex: p.a.number,
  focusDelay: p.a.number,
  blurDelay: p.a.number,
  getPopupContainer: p.a.func,
  getDocument: p.a.func,
  forceRender: p.a.bool,
  destroyPopupOnHide: p.a.bool,
  mask: p.a.bool,
  maskClosable: p.a.bool,
  onPopupAlign: p.a.func,
  popupAlign: p.a.object,
  popupVisible: p.a.bool,
  defaultPopupVisible: p.a.bool,
  maskTransitionName: p.a.oneOfType([p.a.string, p.a.object]),
  maskAnimation: p.a.string,
  stretch: p.a.string,
  alignPoint: p.a.bool
}, St.contextTypes = Et, St.childContextTypes = Et, St.defaultProps = {
  prefixCls: "rc-trigger-popup",
  getPopupClassNameFromAlign: bt,
  getDocument: wt,
  onPopupVisibleChange: yt,
  afterPopupVisibleChange: yt,
  onPopupAlign: yt,
  popupClassName: "",
  mouseEnterDelay: 0,
  mouseLeaveDelay: .1,
  focusDelay: 0,
  blurDelay: .15,
  popupStyle: {},
  destroyPopupOnHide: !1,
  popupAlign: {},
  defaultPopupVisible: !1,
  mask: !1,
  maskClosable: !0,
  action: [],
  showAction: [],
  hideAction: []
};
var kt = function () {
  var e = this;
  this.onMouseEnter = function (t) {
    var n = e.props.mouseEnterDelay;
    e.fireEvents("onMouseEnter", t), e.delaySetPopupVisible(!0, n, n ? null : t);
  }, this.onMouseMove = function (t) {
    e.fireEvents("onMouseMove", t), e.setPoint(t);
  }, this.onMouseLeave = function (t) {
    e.fireEvents("onMouseLeave", t), e.delaySetPopupVisible(!1, e.props.mouseLeaveDelay);
  }, this.onPopupMouseEnter = function () {
    e.clearDelayTimer();
  }, this.onPopupMouseLeave = function (t) {
    t.relatedTarget && !t.relatedTarget.setTimeout && e._component && e._component.getPopupDomNode && Object(y["a"])(e._component.getPopupDomNode(), t.relatedTarget) || e.delaySetPopupVisible(!1, e.props.mouseLeaveDelay);
  }, this.onFocus = function (t) {
    e.fireEvents("onFocus", t), e.clearDelayTimer(), e.isFocusToShow() && (e.focusTime = Date.now(), e.delaySetPopupVisible(!0, e.props.focusDelay));
  }, this.onMouseDown = function (t) {
    e.fireEvents("onMouseDown", t), e.preClickTime = Date.now();
  }, this.onTouchStart = function (t) {
    e.fireEvents("onTouchStart", t), e.preTouchTime = Date.now();
  }, this.onBlur = function (t) {
    e.fireEvents("onBlur", t), e.clearDelayTimer(), e.isBlurToHide() && e.delaySetPopupVisible(!1, e.props.blurDelay);
  }, this.onContextMenu = function (t) {
    t.preventDefault(), e.fireEvents("onContextMenu", t), e.setPopupVisible(!0, t);
  }, this.onContextMenuClose = function () {
    e.isContextMenuToShow() && e.close();
  }, this.onClick = function (t) {
    if (e.fireEvents("onClick", t), e.focusTime) {
      var n = void 0;
      if (e.preClickTime && e.preTouchTime ? n = Math.min(e.preClickTime, e.preTouchTime) : e.preClickTime ? n = e.preClickTime : e.preTouchTime && (n = e.preTouchTime), Math.abs(n - e.focusTime) < 20) return;
      e.focusTime = 0;
    }
    e.preClickTime = 0, e.preTouchTime = 0, e.isClickToShow() && (e.isClickToHide() || e.isBlurToHide()) && t && t.preventDefault && t.preventDefault();
    var r = !e.state.popupVisible;
    (e.isClickToHide() && !r || r && e.isClickToShow()) && e.setPopupVisible(!e.state.popupVisible, t);
  }, this.onPopupMouseDown = function () {
    var t = e.context.rcTrigger,
      n = void 0 === t ? {} : t;
    e.hasPopupMouseDown = !0, clearTimeout(e.mouseDownTimeout), e.mouseDownTimeout = setTimeout(function () {
      e.hasPopupMouseDown = !1;
    }, 0), n.onPopupMouseDown && n.onPopupMouseDown.apply(n, arguments);
  }, this.onDocumentClick = function (t) {
    if (!e.props.mask || e.props.maskClosable) {
      var n = t.target,
        r = Object(m["findDOMNode"])(e);
      Object(y["a"])(r, n) || e.hasPopupMouseDown || e.close();
    }
  }, this.getRootDomNode = function () {
    return Object(m["findDOMNode"])(e);
  }, this.getPopupClassNameFromAlign = function (t) {
    var n = [],
      r = e.props,
      i = r.popupPlacement,
      o = r.builtinPlacements,
      a = r.prefixCls,
      s = r.alignPoint,
      l = r.getPopupClassNameFromAlign;
    return i && o && n.push(C(o, a, t, s)), l && n.push(l(t)), n.join(" ");
  }, this.getComponent = function () {
    var t = e.props,
      n = t.prefixCls,
      r = t.destroyPopupOnHide,
      o = t.popupClassName,
      a = t.action,
      s = t.onPopupAlign,
      l = t.popupAnimation,
      c = t.popupTransitionName,
      u = t.popupStyle,
      h = t.mask,
      d = t.maskAnimation,
      p = t.maskTransitionName,
      m = t.zIndex,
      g = t.popup,
      v = t.stretch,
      y = t.alignPoint,
      b = e.state,
      w = b.popupVisible,
      x = b.point,
      _ = e.getPopupAlign(),
      E = {};
    return e.isMouseEnterToShow() && (E.onMouseEnter = e.onPopupMouseEnter), e.isMouseLeaveToHide() && (E.onMouseLeave = e.onPopupMouseLeave), E.onMouseDown = e.onPopupMouseDown, E.onTouchStart = e.onPopupMouseDown, f.a.createElement(vt, i()({
      prefixCls: n,
      destroyPopupOnHide: r,
      visible: w,
      point: y && x,
      className: o,
      action: a,
      align: _,
      onAlign: s,
      animation: l,
      getClassNameFromAlign: e.getPopupClassNameFromAlign
    }, E, {
      stretch: v,
      getRootDomNode: e.getRootDomNode,
      style: u,
      mask: h,
      zIndex: m,
      transitionName: c,
      maskAnimation: d,
      maskTransitionName: p,
      ref: e.savePopup
    }), "function" === typeof g ? g() : g);
  }, this.getContainer = function () {
    var t = e.props,
      n = document.createElement("div");
    n.style.position = "absolute", n.style.top = "0", n.style.left = "0", n.style.width = "100%";
    var r = t.getPopupContainer ? t.getPopupContainer(Object(m["findDOMNode"])(e)) : t.getDocument().body;
    return r.appendChild(n), n;
  }, this.setPoint = function (t) {
    var n = e.props.alignPoint;
    n && t && e.setState({
      point: {
        pageX: t.pageX,
        pageY: t.pageY
      }
    });
  }, this.handlePortalUpdate = function () {
    e.state.prevPopupVisible !== e.state.popupVisible && e.props.afterPopupVisibleChange(e.state.popupVisible);
  }, this.savePopup = function (t) {
    e._component = t;
  };
};
Object(v["polyfill"])(St);
legacyExports["a"] = St;
