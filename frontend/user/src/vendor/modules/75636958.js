let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var r = require("./51624c5a.js"),
  o = interopDefault(r),
  i = require("./69436335.js"),
  a = interopDefault(i),
  s = require("./46597733.js"),
  c = interopDefault(s),
  u = require("./6d526730.js"),
  l = interopDefault(u),
  f = require("./71317449.js"),
  p = interopDefault(f),
  d = require("./31377839.js"),
  h = interopDefault(d),
  m = require("./69386934.js"),
  v = interopDefault(m),
  y = require("./56434c38.js"),
  g = require("./6c346159.js"),
  b = require("./7a543168.js"),
  w = require("./5049416d.js"),
  x = require("./51432b4d.js"),
  O = require("./54535951.js"),
  E = interopDefault(O);
function _(e, t, n) {
  return n ? e[0] === t[0] : e[0] === t[0] && e[1] === t[1];
}
function k(e, t, n) {
  var r = e[t] || {};
  return o()({}, r, n);
}
function S(e, t, n, r) {
  var o = n.points;
  for (var i in e) if (e.hasOwnProperty(i) && _(e[i].points, o, r)) return t + "-placement-" + i;
  return "";
}
function C(e, t) {
  this[e] = t;
}
var j,
  P = require("./56376f43.js"),
  T = interopDefault(P);
function L(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function N(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? L(Object(n), !0).forEach(function (t) {
      A(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : L(Object(n)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function M(e) {
  "@babel/helpers - typeof";

  return M = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, M(e);
}
function A(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var D = {
  Webkit: "-webkit-",
  Moz: "-moz-",
  ms: "-ms-",
  O: "-o-"
};
function I() {
  if (void 0 !== j) return j;
  j = "";
  var e = document.createElement("p").style,
    t = "Transform";
  for (var n in D) n + t in e && (j = n);
  return j;
}
function R() {
  return I() ? "".concat(I(), "TransitionProperty") : "transitionProperty";
}
function F() {
  return I() ? "".concat(I(), "Transform") : "transform";
}
function V(e, t) {
  var n = R();
  n && (e.style[n] = t, "transitionProperty" !== n && (e.style.transitionProperty = t));
}
function z(e, t) {
  var n = F();
  n && (e.style[n] = t, "transform" !== n && (e.style.transform = t));
}
function B(e) {
  return e.style.transitionProperty || e.style[R()];
}
function W(e) {
  var t = window.getComputedStyle(e, null),
    n = t.getPropertyValue("transform") || t.getPropertyValue(F());
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
var U = /matrix\((.*)\)/,
  q = /matrix3d\((.*)\)/;
function H(e, t) {
  var n = window.getComputedStyle(e, null),
    r = n.getPropertyValue("transform") || n.getPropertyValue(F());
  if (r && "none" !== r) {
    var o,
      i = r.match(U);
    if (i) i = i[1], o = i.split(",").map(function (e) {
      return parseFloat(e, 10);
    }), o[4] = t.x, o[5] = t.y, z(e, "matrix(".concat(o.join(","), ")"));else {
      var a = r.match(q)[1];
      o = a.split(",").map(function (e) {
        return parseFloat(e, 10);
      }), o[12] = t.x, o[13] = t.y, z(e, "matrix3d(".concat(o.join(","), ")"));
    }
  } else z(e, "translateX(".concat(t.x, "px) translateY(").concat(t.y, "px) translateZ(0)"));
}
var Y,
  G = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source;
function K(e) {
  var t = e.style.display;
  e.style.display = "none", e.offsetHeight, e.style.display = t;
}
function Z(e, t, n) {
  var r = n;
  if ("object" !== M(t)) return "undefined" !== typeof r ? ("number" === typeof r && (r = "".concat(r, "px")), void (e.style[t] = r)) : Y(e, t);
  for (var o in t) t.hasOwnProperty(o) && Z(e, o, t[o]);
}
function Q(e) {
  var t,
    n,
    r,
    o = e.ownerDocument,
    i = o.body,
    a = o && o.documentElement;
  return t = e.getBoundingClientRect(), n = Math.floor(t.left), r = Math.floor(t.top), n -= a.clientLeft || i.clientLeft || 0, r -= a.clientTop || i.clientTop || 0, {
    left: n,
    top: r
  };
}
function X(e, t) {
  var n = e["page".concat(t ? "Y" : "X", "Offset")],
    r = "scroll".concat(t ? "Top" : "Left");
  if ("number" !== typeof n) {
    var o = e.document;
    n = o.documentElement[r], "number" !== typeof n && (n = o.body[r]);
  }
  return n;
}
function J(e) {
  return X(e);
}
function $(e) {
  return X(e, !0);
}
function ee(e) {
  var t = Q(e),
    n = e.ownerDocument,
    r = n.defaultView || n.parentWindow;
  return t.left += J(r), t.top += $(r), t;
}
function te(e) {
  return null !== e && void 0 !== e && e == e.window;
}
function ne(e) {
  return te(e) ? e.document : 9 === e.nodeType ? e : e.ownerDocument;
}
function re(e, t, n) {
  var r = n,
    o = "",
    i = ne(e);
  return r = r || i.defaultView.getComputedStyle(e, null), r && (o = r.getPropertyValue(t) || r[t]), o;
}
var oe = new RegExp("^(".concat(G, ")(?!px)[a-z%]+$"), "i"),
  ie = /^(top|right|bottom|left)$/,
  ae = "currentStyle",
  se = "runtimeStyle",
  ce = "left",
  ue = "px";
function le(e, t) {
  var n = e[ae] && e[ae][t];
  if (oe.test(n) && !ie.test(t)) {
    var r = e.style,
      o = r[ce],
      i = e[se][ce];
    e[se][ce] = e[ae][ce], r[ce] = "fontSize" === t ? "1em" : n || 0, n = r.pixelLeft + ue, r[ce] = o, e[se][ce] = i;
  }
  return "" === n ? "auto" : n;
}
function fe(e, t) {
  return "left" === e ? t.useCssRight ? "right" : e : t.useCssBottom ? "bottom" : e;
}
function pe(e) {
  return "left" === e ? "right" : "right" === e ? "left" : "top" === e ? "bottom" : "bottom" === e ? "top" : void 0;
}
function de(e, t, n) {
  "static" === Z(e, "position") && (e.style.position = "relative");
  var r = -999,
    o = -999,
    i = fe("left", n),
    a = fe("top", n),
    s = pe(i),
    c = pe(a);
  "left" !== i && (r = 999), "top" !== a && (o = 999);
  var u = "",
    l = ee(e);
  ("left" in t || "top" in t) && (u = B(e) || "", V(e, "none")), "left" in t && (e.style[s] = "", e.style[i] = "".concat(r, "px")), "top" in t && (e.style[c] = "", e.style[a] = "".concat(o, "px")), K(e);
  var f = ee(e),
    p = {};
  for (var d in t) if (t.hasOwnProperty(d)) {
    var h = fe(d, n),
      m = "left" === d ? r : o,
      v = l[d] - f[d];
    p[h] = h === d ? m + v : m - v;
  }
  Z(e, p), K(e), ("left" in t || "top" in t) && V(e, u);
  var y = {};
  for (var g in t) if (t.hasOwnProperty(g)) {
    var b = fe(g, n),
      w = t[g] - l[g];
    y[b] = g === b ? p[b] + w : p[b] - w;
  }
  Z(e, y);
}
function he(e, t) {
  var n = ee(e),
    r = W(e),
    o = {
      x: r.x,
      y: r.y
    };
  "left" in t && (o.x = r.x + t.left - n.left), "top" in t && (o.y = r.y + t.top - n.top), H(e, o);
}
function me(e, t, n) {
  if (n.ignoreShake) {
    var r = ee(e),
      o = r.left.toFixed(0),
      i = r.top.toFixed(0),
      a = t.left.toFixed(0),
      s = t.top.toFixed(0);
    if (o === a && i === s) return;
  }
  n.useCssRight || n.useCssBottom ? de(e, t, n) : n.useCssTransform && F() in document.body.style ? he(e, t) : de(e, t, n);
}
function ve(e, t) {
  for (var n = 0; n < e.length; n++) t(e[n]);
}
function ye(e) {
  return "border-box" === Y(e, "boxSizing");
}
"undefined" !== typeof window && (Y = window.getComputedStyle ? re : le);
var ge = ["margin", "border", "padding"],
  be = -1,
  we = 2,
  xe = 1,
  Oe = 0;
function Ee(e, t, n) {
  var r,
    o = {},
    i = e.style;
  for (r in t) t.hasOwnProperty(r) && (o[r] = i[r], i[r] = t[r]);
  for (r in n.call(e), t) t.hasOwnProperty(r) && (i[r] = o[r]);
}
function _e(e, t, n) {
  var r,
    o,
    i,
    a = 0;
  for (o = 0; o < t.length; o++) if (r = t[o], r) for (i = 0; i < n.length; i++) {
    var s = void 0;
    s = "border" === r ? "".concat(r).concat(n[i], "Width") : r + n[i], a += parseFloat(Y(e, s)) || 0;
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
function Se(e, t, n) {
  var r = n;
  if (te(e)) return "width" === t ? ke.viewportWidth(e) : ke.viewportHeight(e);
  if (9 === e.nodeType) return "width" === t ? ke.docWidth(e) : ke.docHeight(e);
  var o = "width" === t ? ["Left", "Right"] : ["Top", "Bottom"],
    i = "width" === t ? Math.floor(e.getBoundingClientRect().width) : Math.floor(e.getBoundingClientRect().height),
    a = ye(e),
    s = 0;
  (null === i || void 0 === i || i <= 0) && (i = void 0, s = Y(e, t), (null === s || void 0 === s || Number(s) < 0) && (s = e.style[t] || 0), s = parseFloat(s) || 0), void 0 === r && (r = a ? xe : be);
  var c = void 0 !== i || a,
    u = i || s;
  return r === be ? c ? u - _e(e, ["border", "padding"], o) : s : c ? r === xe ? u : u + (r === we ? -_e(e, ["border"], o) : _e(e, ["margin"], o)) : s + _e(e, ge.slice(r), o);
}
ve(["Width", "Height"], function (e) {
  ke["doc".concat(e)] = function (t) {
    var n = t.document;
    return Math.max(n.documentElement["scroll".concat(e)], n.body["scroll".concat(e)], ke["viewport".concat(e)](n));
  }, ke["viewport".concat(e)] = function (t) {
    var n = "client".concat(e),
      r = t.document,
      o = r.body,
      i = r.documentElement,
      a = i[n];
    return "CSS1Compat" === r.compatMode && a || o && o[n] || a;
  };
});
var Ce = {
  position: "absolute",
  visibility: "hidden",
  display: "block"
};
function je() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
  var r,
    o = t[0];
  return 0 !== o.offsetWidth ? r = Se.apply(void 0, t) : Ee(o, Ce, function () {
    r = Se.apply(void 0, t);
  }), r;
}
function Pe(e, t) {
  for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
  return e;
}
ve(["width", "height"], function (e) {
  var t = e.charAt(0).toUpperCase() + e.slice(1);
  ke["outer".concat(t)] = function (t, n) {
    return t && je(t, e, n ? Oe : xe);
  };
  var n = "width" === e ? ["Left", "Right"] : ["Top", "Bottom"];
  ke[e] = function (t, r) {
    var o = r;
    if (void 0 === o) return t && je(t, e, be);
    if (t) {
      var i = ye(t);
      return i && (o += _e(t, ["padding", "border"], n)), Z(t, e, o);
    }
  };
});
var Te = {
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
  each: ve,
  css: Z,
  clone: function (e) {
    var t,
      n = {};
    for (t in e) e.hasOwnProperty(t) && (n[t] = e[t]);
    var r = e.overflow;
    if (r) for (t in e) e.hasOwnProperty(t) && (n.overflow[t] = e.overflow[t]);
    return n;
  },
  mix: Pe,
  getWindowScrollLeft: function (e) {
    return J(e);
  },
  getWindowScrollTop: function (e) {
    return $(e);
  },
  merge: function () {
    for (var e = {}, t = 0; t < arguments.length; t++) Te.mix(e, t < 0 || arguments.length <= t ? void 0 : arguments[t]);
    return e;
  },
  viewportWidth: 0,
  viewportHeight: 0
};
Pe(Te, ke);
var Le = Te.getParent;
function Ne(e) {
  if (Te.isWindow(e) || 9 === e.nodeType) return null;
  var t,
    n = Te.getDocument(e),
    r = n.body,
    o = Te.css(e, "position"),
    i = "fixed" === o || "absolute" === o;
  if (!i) return "html" === e.nodeName.toLowerCase() ? null : Le(e);
  for (t = Le(e); t && t !== r && 9 !== t.nodeType; t = Le(t)) if (o = Te.css(t, "position"), "static" !== o) return t;
  return null;
}
var Me = Te.getParent;
function Ae(e) {
  if (Te.isWindow(e) || 9 === e.nodeType) return !1;
  var t = Te.getDocument(e),
    n = t.body,
    r = null;
  for (r = Me(e); r && r !== n && r !== t; r = Me(r)) {
    var o = Te.css(r, "position");
    if ("fixed" === o) return !0;
  }
  return !1;
}
function De(e, t) {
  var n = {
      left: 0,
      right: 1 / 0,
      top: 0,
      bottom: 1 / 0
    },
    r = Ne(e),
    o = Te.getDocument(e),
    i = o.defaultView || o.parentWindow,
    a = o.body,
    s = o.documentElement;
  while (r) {
    if (-1 !== navigator.userAgent.indexOf("MSIE") && 0 === r.clientWidth || r === a || r === s || "visible" === Te.css(r, "overflow")) {
      if (r === a || r === s) break;
    } else {
      var c = Te.offset(r);
      c.left += r.clientLeft, c.top += r.clientTop, n.top = Math.max(n.top, c.top), n.right = Math.min(n.right, c.left + r.clientWidth), n.bottom = Math.min(n.bottom, c.top + r.clientHeight), n.left = Math.max(n.left, c.left);
    }
    r = Ne(r);
  }
  var u = null;
  if (!Te.isWindow(e) && 9 !== e.nodeType) {
    u = e.style.position;
    var l = Te.css(e, "position");
    "absolute" === l && (e.style.position = "fixed");
  }
  var f = Te.getWindowScrollLeft(i),
    p = Te.getWindowScrollTop(i),
    d = Te.viewportWidth(i),
    h = Te.viewportHeight(i),
    m = s.scrollWidth,
    v = s.scrollHeight,
    y = window.getComputedStyle(a);
  if ("hidden" === y.overflowX && (m = i.innerWidth), "hidden" === y.overflowY && (v = i.innerHeight), e.style && (e.style.position = u), t || Ae(e)) n.left = Math.max(n.left, f), n.top = Math.max(n.top, p), n.right = Math.min(n.right, f + d), n.bottom = Math.min(n.bottom, p + h);else {
    var g = Math.max(m, f + d);
    n.right = Math.min(n.right, g);
    var b = Math.max(v, p + h);
    n.bottom = Math.min(n.bottom, b);
  }
  return n.top >= 0 && n.left >= 0 && n.bottom > n.top && n.right > n.left ? n : null;
}
function Ie(e, t, n, r) {
  var o = Te.clone(e),
    i = {
      width: t.width,
      height: t.height
    };
  return r.adjustX && o.left < n.left && (o.left = n.left), r.resizeWidth && o.left >= n.left && o.left + i.width > n.right && (i.width -= o.left + i.width - n.right), r.adjustX && o.left + i.width > n.right && (o.left = Math.max(n.right - i.width, n.left)), r.adjustY && o.top < n.top && (o.top = n.top), r.resizeHeight && o.top >= n.top && o.top + i.height > n.bottom && (i.height -= o.top + i.height - n.bottom), r.adjustY && o.top + i.height > n.bottom && (o.top = Math.max(n.bottom - i.height, n.top)), Te.mix(o, i);
}
function Re(e) {
  var t, n, r;
  if (Te.isWindow(e) || 9 === e.nodeType) {
    var o = Te.getWindow(e);
    t = {
      left: Te.getWindowScrollLeft(o),
      top: Te.getWindowScrollTop(o)
    }, n = Te.viewportWidth(o), r = Te.viewportHeight(o);
  } else t = Te.offset(e), n = Te.outerWidth(e), r = Te.outerHeight(e);
  return t.width = n, t.height = r, t;
}
function Fe(e, t) {
  var n = t.charAt(0),
    r = t.charAt(1),
    o = e.width,
    i = e.height,
    a = e.left,
    s = e.top;
  return "c" === n ? s += i / 2 : "b" === n && (s += i), "c" === r ? a += o / 2 : "r" === r && (a += o), {
    left: a,
    top: s
  };
}
function Ve(e, t, n, r, o) {
  var i = Fe(t, n[1]),
    a = Fe(e, n[0]),
    s = [a.left - i.left, a.top - i.top];
  return {
    left: Math.round(e.left - s[0] + r[0] - o[0]),
    top: Math.round(e.top - s[1] + r[1] - o[1])
  };
}
function ze(e, t, n) {
  return e.left < n.left || e.left + t.width > n.right;
}
function Be(e, t, n) {
  return e.top < n.top || e.top + t.height > n.bottom;
}
function We(e, t, n) {
  return e.left > n.right || e.left + t.width < n.left;
}
function Ue(e, t, n) {
  return e.top > n.bottom || e.top + t.height < n.top;
}
function qe(e, t, n) {
  var r = [];
  return Te.each(e, function (e) {
    r.push(e.replace(t, function (e) {
      return n[e];
    }));
  }), r;
}
function He(e, t) {
  return e[t] = -e[t], e;
}
function Ye(e, t) {
  var n;
  return n = /%$/.test(e) ? parseInt(e.substring(0, e.length - 1), 10) / 100 * t : parseInt(e, 10), n || 0;
}
function Ge(e, t) {
  e[0] = Ye(e[0], t.width), e[1] = Ye(e[1], t.height);
}
function Ke(e, t, n, r) {
  var o = n.points,
    i = n.offset || [0, 0],
    a = n.targetOffset || [0, 0],
    s = n.overflow,
    c = n.source || e;
  i = [].concat(i), a = [].concat(a), s = s || {};
  var u = {},
    l = 0,
    f = !(!s || !s.alwaysByViewport),
    p = De(c, f),
    d = Re(c);
  Ge(i, d), Ge(a, t);
  var h = Ve(d, t, o, i, a),
    m = Te.merge(d, h);
  if (p && (s.adjustX || s.adjustY) && r) {
    if (s.adjustX && ze(h, d, p)) {
      var v = qe(o, /[lr]/gi, {
          l: "r",
          r: "l"
        }),
        y = He(i, 0),
        g = He(a, 0),
        b = Ve(d, t, v, y, g);
      We(b, d, p) || (l = 1, o = v, i = y, a = g);
    }
    if (s.adjustY && Be(h, d, p)) {
      var w = qe(o, /[tb]/gi, {
          t: "b",
          b: "t"
        }),
        x = He(i, 1),
        O = He(a, 1),
        E = Ve(d, t, w, x, O);
      Ue(E, d, p) || (l = 1, o = w, i = x, a = O);
    }
    l && (h = Ve(d, t, o, i, a), Te.mix(m, h));
    var _ = ze(h, d, p),
      k = Be(h, d, p);
    if (_ || k) {
      var S = o;
      _ && (S = qe(o, /[lr]/gi, {
        l: "r",
        r: "l"
      })), k && (S = qe(o, /[tb]/gi, {
        t: "b",
        b: "t"
      })), o = S, i = n.offset || [0, 0], a = n.targetOffset || [0, 0];
    }
    u.adjustX = s.adjustX && _, u.adjustY = s.adjustY && k, (u.adjustX || u.adjustY) && (m = Ie(h, d, p, u));
  }
  return m.width !== d.width && Te.css(c, "width", Te.width(c) + m.width - d.width), m.height !== d.height && Te.css(c, "height", Te.height(c) + m.height - d.height), Te.offset(c, {
    left: m.left,
    top: m.top
  }, {
    useCssRight: n.useCssRight,
    useCssBottom: n.useCssBottom,
    useCssTransform: n.useCssTransform,
    ignoreShake: n.ignoreShake
  }), {
    points: o,
    offset: i,
    targetOffset: a,
    overflow: u
  };
}
function Ze(e, t) {
  var n = De(e, t),
    r = Re(e);
  return !n || r.left + r.width <= n.left || r.top + r.height <= n.top || r.left >= n.right || r.top >= n.bottom;
}
function Qe(e, t, n) {
  var r = n.target || t,
    o = Re(r),
    i = !Ze(r, n.overflow && n.overflow.alwaysByViewport);
  return Ke(e, o, n, i);
}
function Xe(e, t, n) {
  var r,
    o,
    i = Te.getDocument(e),
    a = i.defaultView || i.parentWindow,
    s = Te.getWindowScrollLeft(a),
    c = Te.getWindowScrollTop(a),
    u = Te.viewportWidth(a),
    l = Te.viewportHeight(a);
  r = "pageX" in t ? t.pageX : s + t.clientX, o = "pageY" in t ? t.pageY : c + t.clientY;
  var f = {
      left: r,
      top: o,
      width: 0,
      height: 0
    },
    p = r >= 0 && r <= s + u && o >= 0 && o <= c + l,
    d = [n.points[0], "cc"];
  return Ke(e, f, N(N({}, n), {}, {
    points: d
  }), p);
}
Qe.__getOffsetParent = Ne, Qe.__getVisibleRectForElement = De;
function Je(e, t) {
  var n = void 0;
  function r() {
    n && (clearTimeout(n), n = null);
  }
  function o() {
    r(), n = setTimeout(e, t);
  }
  return o.clear = r, o;
}
function $e(e, t) {
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
  e !== document.activeElement && Object(g["a"])(t, e) && e.focus();
}
function rt(e) {
  return "function" === typeof e && e ? e() : null;
}
function ot(e) {
  return "object" === typeof e && e ? e : null;
}
var it = function (e) {
  function t() {
    var e, n, r, o;
    a()(this, t);
    for (var i = arguments.length, s = Array(i), u = 0; u < i; u++) s[u] = arguments[u];
    return r = c()(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(s))), n = r, r.forceAlign = function () {
      var e = r.props,
        t = e.disabled,
        n = e.target,
        o = e.align,
        i = e.onAlign;
      if (!t && n) {
        var a = v.a.findDOMNode(r),
          s = void 0,
          c = rt(n),
          u = ot(n),
          l = document.activeElement;
        c ? s = Qe(a, c, o) : u && (s = Xe(a, u, o)), nt(l, a), i && i(a, s);
      }
    }, o = n, c()(r, o);
  }
  return l()(t, e), T()(t, [{
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
        var r = v.a.findDOMNode(this),
          o = r ? r.getBoundingClientRect() : null;
        if (e.disabled) t = !0;else {
          var i = rt(e.target),
            a = rt(n.target),
            s = ot(e.target),
            c = ot(n.target);
          et(i) && et(a) ? t = !1 : (i !== a || i && !a && c || s && c && a || c && !$e(s, c)) && (t = !0);
          var u = this.sourceRect || {};
          t || !r || tt(u.width, o.width) && tt(u.height, o.height) || (t = !0);
        }
        this.sourceRect = o;
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
      this.resizeHandler || (this.bufferMonitor = Je(this.forceAlign, this.props.monitorBufferTime), this.resizeHandler = Object(b["a"])(window, "resize", this.bufferMonitor));
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
        o = p.a.Children.only(r);
      if (n) {
        var i = {},
          a = Object.keys(n);
        return a.forEach(function (t) {
          i[t] = e.props[n[t]];
        }), p.a.cloneElement(o, i);
      }
      return o;
    }
  }]), t;
}(f["Component"]);
it.propTypes = {
  childrenProps: h.a.object,
  align: h.a.object.isRequired,
  target: h.a.oneOfType([h.a.func, h.a.shape({
    clientX: h.a.number,
    clientY: h.a.number,
    pageX: h.a.number,
    pageY: h.a.number
  })]),
  onAlign: h.a.func,
  monitorBufferTime: h.a.number,
  monitorWindowResize: h.a.bool,
  disabled: h.a.bool,
  children: h.a.any
}, it.defaultProps = {
  target: function () {
    return window;
  },
  monitorBufferTime: 50,
  monitorWindowResize: !1,
  disabled: !1
};
var at = it,
  st = at,
  ct = require("./4d466a32.js"),
  ut = require("./6a6f3659.js"),
  lt = interopDefault(ut),
  ft = function (e) {
    function t() {
      return a()(this, t), c()(this, e.apply(this, arguments));
    }
    return l()(t, e), t.prototype.shouldComponentUpdate = function (e) {
      return e.hiddenClassName || e.visible;
    }, t.prototype.render = function () {
      var e = this.props,
        t = e.hiddenClassName,
        n = e.visible,
        r = lt()(e, ["hiddenClassName", "visible"]);
      return t || p.a.Children.count(r.children) > 1 ? (!n && t && (r.className += " " + t), p.a.createElement("div", r)) : p.a.Children.only(r.children);
    }, t;
  }(f["Component"]);
ft.propTypes = {
  children: h.a.any,
  className: h.a.string,
  visible: h.a.bool,
  hiddenClassName: h.a.string
};
var pt = ft,
  dt = function (e) {
    function t() {
      return a()(this, t), c()(this, e.apply(this, arguments));
    }
    return l()(t, e), t.prototype.render = function () {
      var e = this.props,
        t = e.className;
      return e.visible || (t += " " + e.hiddenClassName), p.a.createElement("div", {
        className: t,
        onMouseEnter: e.onMouseEnter,
        onMouseLeave: e.onMouseLeave,
        onMouseDown: e.onMouseDown,
        onTouchStart: e.onTouchStart,
        style: e.style
      }, p.a.createElement(pt, {
        className: e.prefixCls + "-content",
        visible: e.visible
      }, e.children));
    }, t;
  }(f["Component"]);
dt.propTypes = {
  hiddenClassName: h.a.string,
  className: h.a.string,
  prefixCls: h.a.string,
  onMouseEnter: h.a.func,
  onMouseLeave: h.a.func,
  onMouseDown: h.a.func,
  onTouchStart: h.a.func,
  children: h.a.any
};
var ht = dt,
  mt = function (e) {
    function t(n) {
      a()(this, t);
      var r = c()(this, e.call(this, n));
      return vt.call(r), r.state = {
        stretchChecked: !1,
        targetWidth: void 0,
        targetHeight: void 0
      }, r.savePopupRef = C.bind(r, "popupInstance"), r.saveAlignRef = C.bind(r, "alignInstance"), r;
    }
    return l()(t, e), t.prototype.componentDidMount = function () {
      this.rootNode = this.getPopupDomNode(), this.setStretchSize();
    }, t.prototype.componentDidUpdate = function () {
      this.setStretchSize();
    }, t.prototype.getPopupDomNode = function () {
      return v.a.findDOMNode(this.popupInstance);
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
        i = n.targetHeight,
        a = n.targetWidth,
        s = this.props,
        c = s.align,
        u = s.visible,
        l = s.prefixCls,
        f = s.style,
        d = s.getClassNameFromAlign,
        h = s.destroyPopupOnHide,
        m = s.stretch,
        v = s.children,
        y = s.onMouseEnter,
        g = s.onMouseLeave,
        b = s.onMouseDown,
        w = s.onTouchStart,
        x = this.getClassName(this.currentAlignClassName || d(c)),
        O = l + "-hidden";
      u || (this.currentAlignClassName = null);
      var E = {};
      m && (-1 !== m.indexOf("height") ? E.height = i : -1 !== m.indexOf("minHeight") && (E.minHeight = i), -1 !== m.indexOf("width") ? E.width = a : -1 !== m.indexOf("minWidth") && (E.minWidth = a), r || (E.visibility = "hidden", setTimeout(function () {
        e.alignInstance && e.alignInstance.forceAlign();
      }, 0)));
      var _ = o()({}, E, f, this.getZIndexStyle()),
        k = {
          className: x,
          prefixCls: l,
          ref: t,
          onMouseEnter: y,
          onMouseLeave: g,
          onMouseDown: b,
          onTouchStart: w,
          style: _
        };
      return h ? p.a.createElement(ct["a"], {
        component: "",
        exclusive: !0,
        transitionAppear: !0,
        transitionName: this.getTransitionName()
      }, u ? p.a.createElement(st, {
        target: this.getAlignTarget(),
        key: "popup",
        ref: this.saveAlignRef,
        monitorWindowResize: !0,
        align: c,
        onAlign: this.onAlign
      }, p.a.createElement(ht, o()({
        visible: !0
      }, k), v)) : null) : p.a.createElement(ct["a"], {
        component: "",
        exclusive: !0,
        transitionAppear: !0,
        transitionName: this.getTransitionName(),
        showProp: "xVisible"
      }, p.a.createElement(st, {
        target: this.getAlignTarget(),
        key: "popup",
        ref: this.saveAlignRef,
        monitorWindowResize: !0,
        xVisible: u,
        childrenProps: {
          visible: "xVisible"
        },
        disabled: !u,
        align: c,
        onAlign: this.onAlign
      }, p.a.createElement(ht, o()({
        hiddenClassName: O
      }, k), v)));
    }, t.prototype.getZIndexStyle = function () {
      var e = {},
        t = this.props;
      return void 0 !== t.zIndex && (e.zIndex = t.zIndex), e;
    }, t.prototype.getMaskElement = function () {
      var e = this.props,
        t = void 0;
      if (e.mask) {
        var n = this.getMaskTransitionName();
        t = p.a.createElement(pt, {
          style: this.getZIndexStyle(),
          key: "mask",
          className: e.prefixCls + "-mask",
          hiddenClassName: e.prefixCls + "-mask-hidden",
          visible: e.visible
        }), n && (t = p.a.createElement(ct["a"], {
          key: "mask",
          showProp: "visible",
          transitionAppear: !0,
          component: "",
          transitionName: n
        }, t));
      }
      return t;
    }, t.prototype.render = function () {
      return p.a.createElement("div", null, this.getMaskElement(), this.getPopupElement());
    }, t;
  }(f["Component"]);
mt.propTypes = {
  visible: h.a.bool,
  style: h.a.object,
  getClassNameFromAlign: h.a.func,
  onAlign: h.a.func,
  getRootDomNode: h.a.func,
  align: h.a.any,
  destroyPopupOnHide: h.a.bool,
  className: h.a.string,
  prefixCls: h.a.string,
  onMouseEnter: h.a.func,
  onMouseLeave: h.a.func,
  onMouseDown: h.a.func,
  onTouchStart: h.a.func,
  stretch: h.a.string,
  children: h.a.node,
  point: h.a.shape({
    pageX: h.a.number,
    pageY: h.a.number
  })
};
var vt = function () {
    var e = this;
    this.onAlign = function (t, n) {
      var r = e.props,
        o = r.getClassNameFromAlign(n);
      e.currentAlignClassName !== o && (e.currentAlignClassName = o, t.className = e.getClassName(o)), r.onAlign(t, n);
    }, this.setStretchSize = function () {
      var t = e.props,
        n = t.stretch,
        r = t.getRootDomNode,
        o = t.visible,
        i = e.state,
        a = i.stretchChecked,
        s = i.targetHeight,
        c = i.targetWidth;
      if (n && o) {
        var u = r();
        if (u) {
          var l = u.offsetHeight,
            f = u.offsetWidth;
          s === l && c === f && a || e.setState({
            stretchChecked: !0,
            targetHeight: l,
            targetWidth: f
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
  yt = mt;
function gt() {}
function bt() {
  return "";
}
function wt() {
  return window.document;
}
var xt = ["onClick", "onMouseDown", "onTouchStart", "onMouseEnter", "onMouseLeave", "onFocus", "onBlur", "onContextMenu"],
  Ot = !!m["createPortal"],
  Et = {
    rcTrigger: h.a.shape({
      onPopupMouseDown: h.a.func
    })
  },
  _t = function (e) {
    function t(n) {
      a()(this, t);
      var r = c()(this, e.call(this, n));
      kt.call(r);
      var o = void 0;
      return o = "popupVisible" in n ? !!n.popupVisible : !!n.defaultPopupVisible, r.state = {
        prevPopupVisible: o,
        popupVisible: o
      }, xt.forEach(function (e) {
        r["fire" + e] = function (t) {
          r.fireEvents(e, t);
        };
      }), r;
    }
    return l()(t, e), t.prototype.getChildContext = function () {
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
        o = function () {
          t.popupVisible !== r.popupVisible && n.afterPopupVisibleChange(r.popupVisible);
        };
      if (Ot || this.renderComponent(null, o), r.popupVisible) {
        var i = void 0;
        return this.clickOutsideHandler || !this.isClickToHide() && !this.isContextMenuToShow() || (i = n.getDocument(), this.clickOutsideHandler = Object(b["a"])(i, "mousedown", this.onDocumentClick)), this.touchOutsideHandler || (i = i || n.getDocument(), this.touchOutsideHandler = Object(b["a"])(i, "touchstart", this.onDocumentClick)), !this.contextMenuOutsideHandler1 && this.isContextMenuToShow() && (i = i || n.getDocument(), this.contextMenuOutsideHandler1 = Object(b["a"])(i, "scroll", this.onContextMenuClose)), void (!this.contextMenuOutsideHandler2 && this.isContextMenuToShow() && (this.contextMenuOutsideHandler2 = Object(b["a"])(window, "blur", this.onContextMenuClose)));
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
        o = 1e3 * t;
      if (this.clearDelayTimer(), o) {
        var i = n ? {
          pageX: n.pageX,
          pageY: n.pageY
        } : null;
        this.delayTimer = setTimeout(function () {
          r.setPopupVisible(e, i), r.clearDelayTimer();
        }, o);
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
        o = n.forceRender,
        i = n.alignPoint,
        a = n.className,
        s = p.a.Children.only(r),
        c = {
          key: "trigger"
        };
      this.isContextMenuToShow() ? c.onContextMenu = this.onContextMenu : c.onContextMenu = this.createTwoChains("onContextMenu"), this.isClickToHide() || this.isClickToShow() ? (c.onClick = this.onClick, c.onMouseDown = this.onMouseDown, c.onTouchStart = this.onTouchStart) : (c.onClick = this.createTwoChains("onClick"), c.onMouseDown = this.createTwoChains("onMouseDown"), c.onTouchStart = this.createTwoChains("onTouchStart")), this.isMouseEnterToShow() ? (c.onMouseEnter = this.onMouseEnter, i && (c.onMouseMove = this.onMouseMove)) : c.onMouseEnter = this.createTwoChains("onMouseEnter"), this.isMouseLeaveToHide() ? c.onMouseLeave = this.onMouseLeave : c.onMouseLeave = this.createTwoChains("onMouseLeave"), this.isFocusToShow() || this.isBlurToHide() ? (c.onFocus = this.onFocus, c.onBlur = this.onBlur) : (c.onFocus = this.createTwoChains("onFocus"), c.onBlur = this.createTwoChains("onBlur"));
      var u = E()(s && s.props && s.props.className, a);
      u && (c.className = u);
      var l = p.a.cloneElement(s, c);
      if (!Ot) return p.a.createElement(w["a"], {
        parent: this,
        visible: t,
        autoMount: !1,
        forceRender: o,
        getComponent: this.getComponent,
        getContainer: this.getContainer
      }, function (t) {
        var n = t.renderComponent;
        return e.renderComponent = n, l;
      });
      var f = void 0;
      return (t || this._component || o) && (f = p.a.createElement(x["a"], {
        key: "portal",
        getContainer: this.getContainer,
        didUpdate: this.handlePortalUpdate
      }, this.getComponent())), [l, f];
    }, t;
  }(p.a.Component);
_t.propTypes = {
  children: h.a.any,
  action: h.a.oneOfType([h.a.string, h.a.arrayOf(h.a.string)]),
  showAction: h.a.any,
  hideAction: h.a.any,
  getPopupClassNameFromAlign: h.a.any,
  onPopupVisibleChange: h.a.func,
  afterPopupVisibleChange: h.a.func,
  popup: h.a.oneOfType([h.a.node, h.a.func]).isRequired,
  popupStyle: h.a.object,
  prefixCls: h.a.string,
  popupClassName: h.a.string,
  className: h.a.string,
  popupPlacement: h.a.string,
  builtinPlacements: h.a.object,
  popupTransitionName: h.a.oneOfType([h.a.string, h.a.object]),
  popupAnimation: h.a.any,
  mouseEnterDelay: h.a.number,
  mouseLeaveDelay: h.a.number,
  zIndex: h.a.number,
  focusDelay: h.a.number,
  blurDelay: h.a.number,
  getPopupContainer: h.a.func,
  getDocument: h.a.func,
  forceRender: h.a.bool,
  destroyPopupOnHide: h.a.bool,
  mask: h.a.bool,
  maskClosable: h.a.bool,
  onPopupAlign: h.a.func,
  popupAlign: h.a.object,
  popupVisible: h.a.bool,
  defaultPopupVisible: h.a.bool,
  maskTransitionName: h.a.oneOfType([h.a.string, h.a.object]),
  maskAnimation: h.a.string,
  stretch: h.a.string,
  alignPoint: h.a.bool
}, _t.contextTypes = Et, _t.childContextTypes = Et, _t.defaultProps = {
  prefixCls: "rc-trigger-popup",
  getPopupClassNameFromAlign: bt,
  getDocument: wt,
  onPopupVisibleChange: gt,
  afterPopupVisibleChange: gt,
  onPopupAlign: gt,
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
    t.relatedTarget && !t.relatedTarget.setTimeout && e._component && e._component.getPopupDomNode && Object(g["a"])(e._component.getPopupDomNode(), t.relatedTarget) || e.delaySetPopupVisible(!1, e.props.mouseLeaveDelay);
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
      Object(g["a"])(r, n) || e.hasPopupMouseDown || e.close();
    }
  }, this.getRootDomNode = function () {
    return Object(m["findDOMNode"])(e);
  }, this.getPopupClassNameFromAlign = function (t) {
    var n = [],
      r = e.props,
      o = r.popupPlacement,
      i = r.builtinPlacements,
      a = r.prefixCls,
      s = r.alignPoint,
      c = r.getPopupClassNameFromAlign;
    return o && i && n.push(S(i, a, t, s)), c && n.push(c(t)), n.join(" ");
  }, this.getComponent = function () {
    var t = e.props,
      n = t.prefixCls,
      r = t.destroyPopupOnHide,
      i = t.popupClassName,
      a = t.action,
      s = t.onPopupAlign,
      c = t.popupAnimation,
      u = t.popupTransitionName,
      l = t.popupStyle,
      f = t.mask,
      d = t.maskAnimation,
      h = t.maskTransitionName,
      m = t.zIndex,
      v = t.popup,
      y = t.stretch,
      g = t.alignPoint,
      b = e.state,
      w = b.popupVisible,
      x = b.point,
      O = e.getPopupAlign(),
      E = {};
    return e.isMouseEnterToShow() && (E.onMouseEnter = e.onPopupMouseEnter), e.isMouseLeaveToHide() && (E.onMouseLeave = e.onPopupMouseLeave), E.onMouseDown = e.onPopupMouseDown, E.onTouchStart = e.onPopupMouseDown, p.a.createElement(yt, o()({
      prefixCls: n,
      destroyPopupOnHide: r,
      visible: w,
      point: g && x,
      className: i,
      action: a,
      align: O,
      onAlign: s,
      animation: c,
      getClassNameFromAlign: e.getPopupClassNameFromAlign
    }, E, {
      stretch: y,
      getRootDomNode: e.getRootDomNode,
      style: l,
      mask: f,
      zIndex: m,
      transitionName: u,
      maskAnimation: d,
      maskTransitionName: h,
      ref: e.savePopup
    }), "function" === typeof v ? v() : v);
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
Object(y["polyfill"])(_t);
legacyExports["a"] = _t;
