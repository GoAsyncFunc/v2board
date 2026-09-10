let legacyModule = module,
  legacyExports = exports;
var r = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  },
  i = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e;
  },
  o = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source;
function a(e) {
  var t = void 0,
    n = void 0,
    r = void 0,
    i = e.ownerDocument,
    o = i.body,
    a = i && i.documentElement;
  return t = e.getBoundingClientRect(), n = t.left, r = t.top, n -= a.clientLeft || o.clientLeft || 0, r -= a.clientTop || o.clientTop || 0, {
    left: n,
    top: r
  };
}
function s(e, t) {
  var n = e["page" + (t ? "Y" : "X") + "Offset"],
    r = "scroll" + (t ? "Top" : "Left");
  if ("number" !== typeof n) {
    var i = e.document;
    n = i.documentElement[r], "number" !== typeof n && (n = i.body[r]);
  }
  return n;
}
function l(e) {
  return s(e);
}
function c(e) {
  return s(e, !0);
}
function u(e) {
  var t = a(e),
    n = e.ownerDocument,
    r = n.defaultView || n.parentWindow;
  return t.left += l(r), t.top += c(r), t;
}
function h(e, t, n) {
  var r = "",
    i = e.ownerDocument,
    o = n || i.defaultView.getComputedStyle(e, null);
  return o && (r = o.getPropertyValue(t) || o[t]), r;
}
var f = new RegExp("^(" + o + ")(?!px)[a-z%]+$", "i"),
  d = /^(top|right|bottom|left)$/,
  p = "currentStyle",
  m = "runtimeStyle",
  g = "left",
  v = "px";
function y(e, t) {
  var n = e[p] && e[p][t];
  if (f.test(n) && !d.test(t)) {
    var r = e.style,
      i = r[g],
      o = e[m][g];
    e[m][g] = e[p][g], r[g] = "fontSize" === t ? "1em" : n || 0, n = r.pixelLeft + v, r[g] = i, e[m][g] = o;
  }
  return "" === n ? "auto" : n;
}
var b = void 0;
function w(e, t) {
  for (var n = 0; n < e.length; n++) t(e[n]);
}
function x(e) {
  return "border-box" === b(e, "boxSizing");
}
"undefined" !== typeof window && (b = window.getComputedStyle ? h : y);
var _ = ["margin", "border", "padding"],
  E = -1,
  S = 2,
  k = 1,
  C = 0;
function O(e, t, n) {
  var r = {},
    i = e.style,
    o = void 0;
  for (o in t) t.hasOwnProperty(o) && (r[o] = i[o], i[o] = t[o]);
  for (o in n.call(e), t) t.hasOwnProperty(o) && (i[o] = r[o]);
}
function T(e, t, n) {
  var r = 0,
    i = void 0,
    o = void 0,
    a = void 0;
  for (o = 0; o < t.length; o++) if (i = t[o], i) for (a = 0; a < n.length; a++) {
    var s = void 0;
    s = "border" === i ? i + n[a] + "Width" : i + n[a], r += parseFloat(b(e, s)) || 0;
  }
  return r;
}
function L(e) {
  return null != e && e == e.window;
}
var A = {};
function P(e, t, n) {
  if (L(e)) return "width" === t ? A.viewportWidth(e) : A.viewportHeight(e);
  if (9 === e.nodeType) return "width" === t ? A.docWidth(e) : A.docHeight(e);
  var r = "width" === t ? ["Left", "Right"] : ["Top", "Bottom"],
    i = "width" === t ? e.offsetWidth : e.offsetHeight,
    o = b(e),
    a = x(e, o),
    s = 0;
  (null == i || i <= 0) && (i = void 0, s = b(e, t), (null == s || Number(s) < 0) && (s = e.style[t] || 0), s = parseFloat(s) || 0), void 0 === n && (n = a ? k : E);
  var l = void 0 !== i || a,
    c = i || s;
  if (n === E) return l ? c - T(e, ["border", "padding"], r, o) : s;
  if (l) {
    var u = n === S ? -T(e, ["border"], r, o) : T(e, ["margin"], r, o);
    return c + (n === k ? 0 : u);
  }
  return s + T(e, _.slice(n), r, o);
}
w(["Width", "Height"], function (e) {
  A["doc" + e] = function (t) {
    var n = t.document;
    return Math.max(n.documentElement["scroll" + e], n.body["scroll" + e], A["viewport" + e](n));
  }, A["viewport" + e] = function (t) {
    var n = "client" + e,
      r = t.document,
      i = r.body,
      o = r.documentElement,
      a = o[n];
    return "CSS1Compat" === r.compatMode && a || i && i[n] || a;
  };
});
var j = {
  position: "absolute",
  visibility: "hidden",
  display: "block"
};
function M(e) {
  var t = void 0,
    n = arguments;
  return 0 !== e.offsetWidth ? t = P.apply(void 0, n) : O(e, j, function () {
    t = P.apply(void 0, n);
  }), t;
}
function R(e, t, n) {
  var r = n;
  if ("object" !== ("undefined" === typeof t ? "undefined" : i(t))) return "undefined" !== typeof r ? ("number" === typeof r && (r += "px"), void (e.style[t] = r)) : b(e, t);
  for (var o in t) t.hasOwnProperty(o) && R(e, o, t[o]);
}
function N(e, t) {
  "static" === R(e, "position") && (e.style.position = "relative");
  var n = u(e),
    r = {},
    i = void 0,
    o = void 0;
  for (o in t) t.hasOwnProperty(o) && (i = parseFloat(R(e, o)) || 0, r[o] = i + t[o] - n[o]);
  R(e, r);
}
w(["width", "height"], function (e) {
  var t = e.charAt(0).toUpperCase() + e.slice(1);
  A["outer" + t] = function (t, n) {
    return t && M(t, e, n ? C : k);
  };
  var n = "width" === e ? ["Left", "Right"] : ["Top", "Bottom"];
  A[e] = function (t, r) {
    if (void 0 === r) return t && M(t, e, E);
    if (t) {
      var i = b(t),
        o = x(t);
      return o && (r += T(t, ["padding", "border"], n, i)), R(t, e, r);
    }
  };
}), legacyModule.exports = r({
  getWindow: function (e) {
    var t = e.ownerDocument || e;
    return t.defaultView || t.parentWindow;
  },
  offset: function (e, t) {
    if ("undefined" === typeof t) return u(e);
    N(e, t);
  },
  isWindow: L,
  each: w,
  css: R,
  clone: function (e) {
    var t = {};
    for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
    var r = e.overflow;
    if (r) for (var n in e) e.hasOwnProperty(n) && (t.overflow[n] = e.overflow[n]);
    return t;
  },
  scrollLeft: function (e, t) {
    if (L(e)) {
      if (void 0 === t) return l(e);
      window.scrollTo(t, c(e));
    } else {
      if (void 0 === t) return e.scrollLeft;
      e.scrollLeft = t;
    }
  },
  scrollTop: function (e, t) {
    if (L(e)) {
      if (void 0 === t) return c(e);
      window.scrollTo(l(e), t);
    } else {
      if (void 0 === t) return e.scrollTop;
      e.scrollTop = t;
    }
  },
  viewportWidth: 0,
  viewportHeight: 0
}, A);
