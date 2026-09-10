let legacyModule = module,
  legacyExports = exports;
var r = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  },
  o = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e;
  },
  i = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source;
function a(e) {
  var t = void 0,
    n = void 0,
    r = void 0,
    o = e.ownerDocument,
    i = o.body,
    a = o && o.documentElement;
  return t = e.getBoundingClientRect(), n = t.left, r = t.top, n -= a.clientLeft || i.clientLeft || 0, r -= a.clientTop || i.clientTop || 0, {
    left: n,
    top: r
  };
}
function s(e, t) {
  var n = e["page" + (t ? "Y" : "X") + "Offset"],
    r = "scroll" + (t ? "Top" : "Left");
  if ("number" !== typeof n) {
    var o = e.document;
    n = o.documentElement[r], "number" !== typeof n && (n = o.body[r]);
  }
  return n;
}
function c(e) {
  return s(e);
}
function u(e) {
  return s(e, !0);
}
function l(e) {
  var t = a(e),
    n = e.ownerDocument,
    r = n.defaultView || n.parentWindow;
  return t.left += c(r), t.top += u(r), t;
}
function f(e, t, n) {
  var r = "",
    o = e.ownerDocument,
    i = n || o.defaultView.getComputedStyle(e, null);
  return i && (r = i.getPropertyValue(t) || i[t]), r;
}
var p = new RegExp("^(" + i + ")(?!px)[a-z%]+$", "i"),
  d = /^(top|right|bottom|left)$/,
  h = "currentStyle",
  m = "runtimeStyle",
  v = "left",
  y = "px";
function g(e, t) {
  var n = e[h] && e[h][t];
  if (p.test(n) && !d.test(t)) {
    var r = e.style,
      o = r[v],
      i = e[m][v];
    e[m][v] = e[h][v], r[v] = "fontSize" === t ? "1em" : n || 0, n = r.pixelLeft + y, r[v] = o, e[m][v] = i;
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
"undefined" !== typeof window && (b = window.getComputedStyle ? f : g);
var O = ["margin", "border", "padding"],
  E = -1,
  _ = 2,
  k = 1,
  S = 0;
function C(e, t, n) {
  var r = {},
    o = e.style,
    i = void 0;
  for (i in t) t.hasOwnProperty(i) && (r[i] = o[i], o[i] = t[i]);
  for (i in n.call(e), t) t.hasOwnProperty(i) && (o[i] = r[i]);
}
function j(e, t, n) {
  var r = 0,
    o = void 0,
    i = void 0,
    a = void 0;
  for (i = 0; i < t.length; i++) if (o = t[i], o) for (a = 0; a < n.length; a++) {
    var s = void 0;
    s = "border" === o ? o + n[a] + "Width" : o + n[a], r += parseFloat(b(e, s)) || 0;
  }
  return r;
}
function P(e) {
  return null != e && e == e.window;
}
var T = {};
function L(e, t, n) {
  if (P(e)) return "width" === t ? T.viewportWidth(e) : T.viewportHeight(e);
  if (9 === e.nodeType) return "width" === t ? T.docWidth(e) : T.docHeight(e);
  var r = "width" === t ? ["Left", "Right"] : ["Top", "Bottom"],
    o = "width" === t ? e.offsetWidth : e.offsetHeight,
    i = b(e),
    a = x(e, i),
    s = 0;
  (null == o || o <= 0) && (o = void 0, s = b(e, t), (null == s || Number(s) < 0) && (s = e.style[t] || 0), s = parseFloat(s) || 0), void 0 === n && (n = a ? k : E);
  var c = void 0 !== o || a,
    u = o || s;
  if (n === E) return c ? u - j(e, ["border", "padding"], r, i) : s;
  if (c) {
    var l = n === _ ? -j(e, ["border"], r, i) : j(e, ["margin"], r, i);
    return u + (n === k ? 0 : l);
  }
  return s + j(e, O.slice(n), r, i);
}
w(["Width", "Height"], function (e) {
  T["doc" + e] = function (t) {
    var n = t.document;
    return Math.max(n.documentElement["scroll" + e], n.body["scroll" + e], T["viewport" + e](n));
  }, T["viewport" + e] = function (t) {
    var n = "client" + e,
      r = t.document,
      o = r.body,
      i = r.documentElement,
      a = i[n];
    return "CSS1Compat" === r.compatMode && a || o && o[n] || a;
  };
});
var N = {
  position: "absolute",
  visibility: "hidden",
  display: "block"
};
function M(e) {
  var t = void 0,
    n = arguments;
  return 0 !== e.offsetWidth ? t = L.apply(void 0, n) : C(e, N, function () {
    t = L.apply(void 0, n);
  }), t;
}
function A(e, t, n) {
  var r = n;
  if ("object" !== ("undefined" === typeof t ? "undefined" : o(t))) return "undefined" !== typeof r ? ("number" === typeof r && (r += "px"), void (e.style[t] = r)) : b(e, t);
  for (var i in t) t.hasOwnProperty(i) && A(e, i, t[i]);
}
function D(e, t) {
  "static" === A(e, "position") && (e.style.position = "relative");
  var n = l(e),
    r = {},
    o = void 0,
    i = void 0;
  for (i in t) t.hasOwnProperty(i) && (o = parseFloat(A(e, i)) || 0, r[i] = o + t[i] - n[i]);
  A(e, r);
}
w(["width", "height"], function (e) {
  var t = e.charAt(0).toUpperCase() + e.slice(1);
  T["outer" + t] = function (t, n) {
    return t && M(t, e, n ? S : k);
  };
  var n = "width" === e ? ["Left", "Right"] : ["Top", "Bottom"];
  T[e] = function (t, r) {
    if (void 0 === r) return t && M(t, e, E);
    if (t) {
      var o = b(t),
        i = x(t);
      return i && (r += j(t, ["padding", "border"], n, o)), A(t, e, r);
    }
  };
}), legacyModule.exports = r({
  getWindow: function (e) {
    var t = e.ownerDocument || e;
    return t.defaultView || t.parentWindow;
  },
  offset: function (e, t) {
    if ("undefined" === typeof t) return l(e);
    D(e, t);
  },
  isWindow: P,
  each: w,
  css: A,
  clone: function (e) {
    var t = {};
    for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
    var r = e.overflow;
    if (r) for (var n in e) e.hasOwnProperty(n) && (t.overflow[n] = e.overflow[n]);
    return t;
  },
  scrollLeft: function (e, t) {
    if (P(e)) {
      if (void 0 === t) return c(e);
      window.scrollTo(t, u(e));
    } else {
      if (void 0 === t) return e.scrollLeft;
      e.scrollLeft = t;
    }
  },
  scrollTop: function (e, t) {
    if (P(e)) {
      if (void 0 === t) return u(e);
      window.scrollTo(c(e), t);
    } else {
      if (void 0 === t) return e.scrollTop;
      e.scrollTop = t;
    }
  },
  viewportWidth: 0,
  viewportHeight: 0
}, T);
