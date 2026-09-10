let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "d", function () {
  return p;
}), defineExport(legacyExports, "e", function () {
  return g;
}), defineExport(legacyExports, "g", function () {
  return m;
}), defineExport(legacyExports, "a", function () {
  return v;
}), defineExport(legacyExports, "c", function () {
  return x;
}), defineExport(legacyExports, "b", function () {
  return _;
}), defineExport(legacyExports, "f", function () {
  return w;
}), defineExport(legacyExports, "i", function () {
  return O;
}), defineExport(legacyExports, "h", function () {
  return S;
}), defineExport(legacyExports, "C", function () {
  return R;
}), defineExport(legacyExports, "o", function () {
  return H;
}), defineExport(legacyExports, "z", function () {
  return q;
}), defineExport(legacyExports, "n", function () {
  return K;
}), defineExport(legacyExports, "y", function () {
  return Z;
}), defineExport(legacyExports, "p", function () {
  return X;
}), defineExport(legacyExports, "A", function () {
  return Q;
}), defineExport(legacyExports, "j", function () {
  return J;
}), defineExport(legacyExports, "k", function () {
  return te;
}), defineExport(legacyExports, "l", function () {
  return ne;
}), defineExport(legacyExports, "q", function () {
  return re;
}), defineExport(legacyExports, "u", function () {
  return ie;
}), defineExport(legacyExports, "t", function () {
  return oe;
}), defineExport(legacyExports, "F", function () {
  return ae;
}), defineExport(legacyExports, "G", function () {
  return se;
}), defineExport(legacyExports, "r", function () {
  return le;
}), defineExport(legacyExports, "m", function () {
  return ue;
}), defineExport(legacyExports, "E", function () {
  return fe;
}), defineExport(legacyExports, "D", function () {
  return ge;
}), defineExport(legacyExports, "v", function () {
  return ve;
}), defineExport(legacyExports, "s", function () {
  return ye;
}), defineExport(legacyExports, "x", function () {
  return be;
}), defineExport(legacyExports, "w", function () {
  return xe;
}), defineExport(legacyExports, "B", function () {
  return _e;
});
var r = require("./3152764e.js"),
  i = require("./62597459.js"),
  o = require("./6868784b.js"),
  a = require("./51653970.js"),
  s = require("./344e4f34.js"),
  l = require("./792b5674.js"),
  u = 1,
  c = {},
  f = Object(s["m"])(),
  d = Object(s["m"])(),
  h = 0,
  p = 1,
  g = 2,
  m = ["emphasis", "blur", "select"],
  v = ["normal", "emphasis", "blur", "select"],
  y = 10,
  b = 9,
  x = "highlight",
  _ = "downplay",
  w = "select",
  O = "unselect",
  S = "toggleSelect";
function k(e) {
  return null != e && "none" !== e;
}
var j = new r["a"](100);
function M(e) {
  if (Object(i["y"])(e)) {
    var t = j.get(e);
    return t || (t = a["b"](e, -.1), j.put(e, t)), t;
  }
  if (Object(i["v"])(e)) {
    var n = Object(i["l"])({}, e);
    return n.colorStops = Object(i["D"])(e.colorStops, function (e) {
      return {
        offset: e.offset,
        color: a["b"](e.color, -.1)
      };
    }), n;
  }
  return e;
}
function C(e, t, n) {
  e.onHoverStateChange && (e.hoverState || 0) !== n && e.onHoverStateChange(t), e.hoverState = n;
}
function T(e) {
  C(e, "emphasis", g);
}
function I(e) {
  e.hoverState === g && C(e, "normal", h);
}
function D(e) {
  C(e, "blur", p);
}
function A(e) {
  e.hoverState === p && C(e, "normal", h);
}
function E(e) {
  e.selected = !0;
}
function P(e) {
  e.selected = !1;
}
function L(e, t, n) {
  t(e, n);
}
function N(e, t, n) {
  L(e, t, n), e.isGroup && e.traverse(function (e) {
    L(e, t, n);
  });
}
function R(e, t) {
  switch (t) {
    case "emphasis":
      e.hoverState = g;
      break;
    case "normal":
      e.hoverState = h;
      break;
    case "blur":
      e.hoverState = p;
      break;
    case "select":
      e.selected = !0;
  }
}
function z(e, t, n, r) {
  for (var i = e.style, o = {}, a = 0; a < t.length; a++) {
    var s = t[a],
      l = i[s];
    o[s] = null == l ? r && r[s] : l;
  }
  for (a = 0; a < e.animators.length; a++) {
    var u = e.animators[a];
    u.__fromStateTransition && u.__fromStateTransition.indexOf(n) < 0 && "style" === u.targetName && u.saveTo(o, t);
  }
  return o;
}
function F(e, t, n, r) {
  var o = n && Object(i["p"])(n, "select") >= 0,
    a = !1;
  if (e instanceof l["b"]) {
    var s = f(e),
      u = o && s.selectFill || s.normalFill,
      c = o && s.selectStroke || s.normalStroke;
    if (k(u) || k(c)) {
      r = r || {};
      var d = r.style || {};
      "inherit" === d.fill ? (a = !0, r = Object(i["l"])({}, r), d = Object(i["l"])({}, d), d.fill = u) : !k(d.fill) && k(u) ? (a = !0, r = Object(i["l"])({}, r), d = Object(i["l"])({}, d), d.fill = M(u)) : !k(d.stroke) && k(c) && (a || (r = Object(i["l"])({}, r), d = Object(i["l"])({}, d)), d.stroke = M(c)), r.style = d;
    }
  }
  if (r && null == r.z2) {
    a || (r = Object(i["l"])({}, r));
    var h = e.z2EmphasisLift;
    r.z2 = e.z2 + (null != h ? h : y);
  }
  return r;
}
function B(e, t, n) {
  if (n && null == n.z2) {
    n = Object(i["l"])({}, n);
    var r = e.z2SelectLift;
    n.z2 = e.z2 + (null != r ? r : b);
  }
  return n;
}
function Y(e, t, n) {
  var r = Object(i["p"])(e.currentStates, t) >= 0,
    o = e.style.opacity,
    a = r ? null : z(e, ["opacity"], t, {
      opacity: 1
    });
  n = n || {};
  var s = n.style || {};
  return null == s.opacity && (n = Object(i["l"])({}, n), s = Object(i["l"])({
    opacity: r ? o : .1 * a.opacity
  }, s), n.style = s), n;
}
function V(e, t) {
  var n = this.states[e];
  if (this.style) {
    if ("emphasis" === e) return F(this, e, t, n);
    if ("blur" === e) return Y(this, e, n);
    if ("select" === e) return B(this, e, n);
  }
  return n;
}
function G(e) {
  e.stateProxy = V;
  var t = e.getTextContent(),
    n = e.getTextGuideLine();
  t && (t.stateProxy = V), n && (n.stateProxy = V);
}
function W(e, t) {
  !$(e, t) && !e.__highByOuter && N(e, T);
}
function U(e, t) {
  !$(e, t) && !e.__highByOuter && N(e, I);
}
function H(e, t) {
  e.__highByOuter |= 1 << (t || 0), N(e, T);
}
function q(e, t) {
  !(e.__highByOuter &= ~(1 << (t || 0))) && N(e, I);
}
function K(e) {
  N(e, D);
}
function Z(e) {
  N(e, A);
}
function X(e) {
  N(e, E);
}
function Q(e) {
  N(e, P);
}
function $(e, t) {
  return e.__highDownSilentOnTouch && t.zrByTouch;
}
function J(e) {
  var t = e.getModel(),
    n = [],
    r = [];
  t.eachComponent(function (t, i) {
    var o = d(i),
      a = "series" === t,
      s = a ? e.getViewOfSeriesModel(i) : e.getViewOfComponentModel(i);
    !a && r.push(s), o.isBlured && (s.group.traverse(function (e) {
      A(e);
    }), a && n.push(i)), o.isBlured = !1;
  }), Object(i["j"])(r, function (e) {
    e && e.toggleBlurSeries && e.toggleBlurSeries(n, !1, t);
  });
}
function ee(e, t, n, r) {
  var o = r.getModel();
  function a(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = e.getItemGraphicEl(t[n]);
      r && Z(r);
    }
  }
  if (n = n || "coordinateSystem", null != e && t && "none" !== t) {
    var s = o.getSeriesByIndex(e),
      l = s.coordinateSystem;
    l && l.master && (l = l.master);
    var u = [];
    o.eachSeries(function (e) {
      var o = s === e,
        c = e.coordinateSystem;
      c && c.master && (c = c.master);
      var f = c && l ? c === l : o;
      if (!("series" === n && !o || "coordinateSystem" === n && !f || "series" === t && o)) {
        var h = r.getViewOfSeriesModel(e);
        if (h.group.traverse(function (e) {
          D(e);
        }), Object(i["s"])(t)) a(e.getData(), t);else if (Object(i["x"])(t)) for (var p = Object(i["B"])(t), g = 0; g < p.length; g++) a(e.getData(p[g]), t[p[g]]);
        u.push(e), d(e).isBlured = !0;
      }
    }), o.eachComponent(function (e, t) {
      if ("series" !== e) {
        var n = r.getViewOfComponentModel(t);
        n && n.toggleBlurSeries && n.toggleBlurSeries(u, !0, o);
      }
    });
  }
}
function te(e, t, n) {
  if (null != e && null != t) {
    var r = n.getModel().getComponent(e, t);
    if (r) {
      d(r).isBlured = !0;
      var i = n.getViewOfComponentModel(r);
      i && i.focusBlurEnabled && i.group.traverse(function (e) {
        D(e);
      });
    }
  }
}
function ne(e, t, n) {
  var r = e.seriesIndex,
    a = e.getData(t.dataType);
  if (a) {
    var l = Object(s["s"])(a, t);
    l = (Object(i["r"])(l) ? l[0] : l) || 0;
    var u = a.getItemGraphicEl(l);
    if (!u) {
      var c = a.count(),
        f = 0;
      while (!u && f < c) u = a.getItemGraphicEl(f++);
    }
    if (u) {
      var d = Object(o["a"])(u);
      ee(r, d.focus, d.blurScope, n);
    } else {
      var h = e.get(["emphasis", "focus"]),
        p = e.get(["emphasis", "blurScope"]);
      null != h && ee(r, h, p, n);
    }
  }
}
function re(e, t, n, r) {
  var i = {
    focusSelf: !1,
    dispatchers: null
  };
  if (null == e || "series" === e || null == t || null == n) return i;
  var a = r.getModel().getComponent(e, t);
  if (!a) return i;
  var s = r.getViewOfComponentModel(a);
  if (!s || !s.findHighDownDispatchers) return i;
  for (var l, u = s.findHighDownDispatchers(n), c = 0; c < u.length; c++) if ("self" === Object(o["a"])(u[c]).focus) {
    l = !0;
    break;
  }
  return {
    focusSelf: l,
    dispatchers: u
  };
}
function ie(e, t, n) {
  var r = Object(o["a"])(e),
    a = re(r.componentMainType, r.componentIndex, r.componentHighDownName, n),
    s = a.dispatchers,
    l = a.focusSelf;
  s ? (l && te(r.componentMainType, r.componentIndex, n), Object(i["j"])(s, function (e) {
    return W(e, t);
  })) : (ee(r.seriesIndex, r.focus, r.blurScope, n), "self" === r.focus && te(r.componentMainType, r.componentIndex, n), W(e, t));
}
function oe(e, t, n) {
  J(n);
  var r = Object(o["a"])(e),
    a = re(r.componentMainType, r.componentIndex, r.componentHighDownName, n).dispatchers;
  a ? Object(i["j"])(a, function (e) {
    return U(e, t);
  }) : U(e, t);
}
function ae(e, t, n) {
  if (be(t)) {
    var r = t.dataType,
      o = e.getData(r),
      a = Object(s["s"])(o, t);
    Object(i["r"])(a) || (a = [a]), e[t.type === S ? "toggleSelect" : t.type === w ? "select" : "unselect"](a, r);
  }
}
function se(e) {
  var t = e.getAllData();
  Object(i["j"])(t, function (t) {
    var n = t.data,
      r = t.type;
    n.eachItemGraphicEl(function (t, n) {
      e.isSelected(n, r) ? X(t) : Q(t);
    });
  });
}
function le(e) {
  var t = [];
  return e.eachSeries(function (e) {
    var n = e.getAllData();
    Object(i["j"])(n, function (n) {
      n.data;
      var r = n.type,
        i = e.getSelectedDataIndices();
      if (i.length > 0) {
        var o = {
          dataIndex: i,
          seriesIndex: e.seriesIndex
        };
        null != r && (o.dataType = r), t.push(o);
      }
    });
  }), t;
}
function ue(e, t, n) {
  me(e, !0), N(e, G), de(e, t, n);
}
function ce(e) {
  me(e, !1);
}
function fe(e, t, n, r) {
  r ? ce(e) : ue(e, t, n);
}
function de(e, t, n) {
  var r = Object(o["a"])(e);
  null != t ? (r.focus = t, r.blurScope = n) : r.focus && (r.focus = null);
}
var he = ["emphasis", "blur", "select"],
  pe = {
    itemStyle: "getItemStyle",
    lineStyle: "getLineStyle",
    areaStyle: "getAreaStyle"
  };
function ge(e, t, n, r) {
  n = n || "itemStyle";
  for (var i = 0; i < he.length; i++) {
    var o = he[i],
      a = t.getModel([o, n]),
      s = e.ensureState(o);
    s.style = r ? r(a) : a[pe[n]]();
  }
}
function me(e, t) {
  var n = !1 === t,
    r = e;
  e.highDownSilentOnTouch && (r.__highDownSilentOnTouch = e.highDownSilentOnTouch), n && !r.__highDownDispatcher || (r.__highByOuter = r.__highByOuter || 0, r.__highDownDispatcher = !n);
}
function ve(e) {
  return !(!e || !e.__highDownDispatcher);
}
function ye(e) {
  var t = c[e];
  return null == t && u <= 32 && (t = c[e] = u++), t;
}
function be(e) {
  var t = e.type;
  return t === w || t === O || t === S;
}
function xe(e) {
  var t = e.type;
  return t === x || t === _;
}
function _e(e) {
  var t = f(e);
  t.normalFill = e.style.fill, t.normalStroke = e.style.stroke;
  var n = e.states.select || {};
  t.selectFill = n.style && n.style.fill || null, t.selectStroke = n.style && n.style.stroke || null;
}
