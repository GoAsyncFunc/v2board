let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  defineExport
} = require("../../app/moduleInterop.js");
markEsModule(legacyExports), defineExport(legacyExports, "extendShape", function () {
  return L;
}), defineExport(legacyExports, "extendPath", function () {
  return R;
}), defineExport(legacyExports, "registerShape", function () {
  return z;
}), defineExport(legacyExports, "getShapeClass", function () {
  return F;
}), defineExport(legacyExports, "makePath", function () {
  return B;
}), defineExport(legacyExports, "makeImage", function () {
  return Y;
}), defineExport(legacyExports, "mergePath", function () {
  return G;
}), defineExport(legacyExports, "resizePath", function () {
  return W;
}), defineExport(legacyExports, "subPixelOptimizeLine", function () {
  return U;
}), defineExport(legacyExports, "subPixelOptimizeRect", function () {
  return H;
}), defineExport(legacyExports, "subPixelOptimize", function () {
  return q;
}), defineExport(legacyExports, "getTransform", function () {
  return K;
}), defineExport(legacyExports, "applyTransform", function () {
  return Z;
}), defineExport(legacyExports, "transformDirection", function () {
  return X;
}), defineExport(legacyExports, "groupTransition", function () {
  return J;
}), defineExport(legacyExports, "clipPointsByRect", function () {
  return ee;
}), defineExport(legacyExports, "clipRectByRect", function () {
  return te;
}), defineExport(legacyExports, "createIcon", function () {
  return ne;
}), defineExport(legacyExports, "linePolygonIntersect", function () {
  return re;
}), defineExport(legacyExports, "lineLineIntersect", function () {
  return ie;
}), defineExport(legacyExports, "setTooltipConfig", function () {
  return se;
}), defineExport(legacyExports, "traverseElements", function () {
  return ue;
});
var r = require("./4e433138.js"),
  i = require("./466f6678.js"),
  o = require("./5142737a.js"),
  a = require("./792b5674.js");
defineExport(legacyExports, "Path", function () {
  return a["b"];
});
var s = require("./68594c6a.js"),
  l = require("./44616767.js");
defineExport(legacyExports, "Image", function () {
  return l["a"];
});
var u = require("./4c63584c.js");
defineExport(legacyExports, "Group", function () {
  return u["a"];
});
var c = require("./64715547.js");
defineExport(legacyExports, "Text", function () {
  return c["a"];
});
var f = require("./32667736.js");
defineExport(legacyExports, "Circle", function () {
  return f["a"];
});
var d = require("./726d6c56.js");
defineExport(legacyExports, "Ellipse", function () {
  return d["a"];
});
var h = require("./53714939.js");
defineExport(legacyExports, "Sector", function () {
  return h["a"];
});
var p = require("./52584d61.js");
defineExport(legacyExports, "Ring", function () {
  return p["a"];
});
var g = require("./68374851.js");
defineExport(legacyExports, "Polygon", function () {
  return g["a"];
});
var m = require("./314a6837.js");
defineExport(legacyExports, "Polyline", function () {
  return m["a"];
});
var v = require("./78364b74.js");
defineExport(legacyExports, "Rect", function () {
  return v["a"];
});
var y = require("./79784652.js");
defineExport(legacyExports, "Line", function () {
  return y["a"];
});
var b = require("./72413939.js");
defineExport(legacyExports, "BezierCurve", function () {
  return b["a"];
});
var x = require("./6a544c36.js");
defineExport(legacyExports, "Arc", function () {
  return x["a"];
});
var _ = require("./314d594a.js");
defineExport(legacyExports, "CompoundPath", function () {
  return _["a"];
});
var w = require("./534b6e63.js");
defineExport(legacyExports, "LinearGradient", function () {
  return w["a"];
});
var O = require("./33653347.js");
defineExport(legacyExports, "RadialGradient", function () {
  return O["a"];
});
var S = require("./6d464469.js");
defineExport(legacyExports, "BoundingRect", function () {
  return S["a"];
});
var k = require("./796f4438.js");
defineExport(legacyExports, "OrientedBoundingRect", function () {
  return k["a"];
});
var j = require("./334f6a37.js");
defineExport(legacyExports, "Point", function () {
  return j["a"];
});
var M = require("./4f533953.js");
defineExport(legacyExports, "IncrementalDisplayable", function () {
  return M["a"];
});
var C = require("./6e506e68.js"),
  T = require("./62597459.js"),
  I = require("./6868784b.js"),
  D = require("./33736f46.js");
defineExport(legacyExports, "updateProps", function () {
  return D["h"];
}), defineExport(legacyExports, "initProps", function () {
  return D["c"];
}), defineExport(legacyExports, "removeElement", function () {
  return D["e"];
}), defineExport(legacyExports, "removeElementWithFadeOut", function () {
  return D["f"];
}), defineExport(legacyExports, "isElementRemoved", function () {
  return D["d"];
});
var A = Math.max,
  E = Math.min,
  P = {};
function L(e) {
  return a["b"].extend(e);
}
var N = r["c"];
function R(e, t) {
  return N(e, t);
}
function z(e, t) {
  P[e] = t;
}
function F(e) {
  if (P.hasOwnProperty(e)) return P[e];
}
function B(e, t, n, i) {
  var o = r["b"](e, t);
  return n && ("center" === i && (n = V(n, o.getBoundingRect())), W(o, n)), o;
}
function Y(e, t, n) {
  var r = new l["a"]({
    style: {
      image: e,
      x: t.x,
      y: t.y,
      width: t.width,
      height: t.height
    },
    onload: function (e) {
      if ("center" === n) {
        var i = {
          width: e.width,
          height: e.height
        };
        r.setStyle(V(t, i));
      }
    }
  });
  return r;
}
function V(e, t) {
  var n,
    r = t.width / t.height,
    i = e.height * r;
  i <= e.width ? n = e.height : (i = e.width, n = i / r);
  var o = e.x + e.width / 2,
    a = e.y + e.height / 2;
  return {
    x: o - i / 2,
    y: a - n / 2,
    width: i,
    height: n
  };
}
var G = r["d"];
function W(e, t) {
  if (e.applyTransform) {
    var n = e.getBoundingRect(),
      r = n.calculateTransform(t);
    e.applyTransform(r);
  }
}
function U(e, t) {
  return C["b"](e, e, {
    lineWidth: t
  }), e;
}
function H(e) {
  return C["c"](e.shape, e.shape, e.style), e;
}
var q = C["a"];
function K(e, t) {
  var n = i["c"]([]);
  while (e && e !== t) i["e"](n, e.getLocalTransform(), n), e = e.parent;
  return n;
}
function Z(e, t, n) {
  return t && !Object(T["s"])(t) && (t = s["c"].getLocalTransform(t)), n && (t = i["d"]([], t)), o["b"]([], e, t);
}
function X(e, t, n) {
  var r = 0 === t[4] || 0 === t[5] || 0 === t[0] ? 1 : Math.abs(2 * t[4] / t[0]),
    i = 0 === t[4] || 0 === t[5] || 0 === t[2] ? 1 : Math.abs(2 * t[4] / t[2]),
    o = ["left" === e ? -r : "right" === e ? r : 0, "top" === e ? -i : "bottom" === e ? i : 0];
  return o = Z(o, t, n), Math.abs(o[0]) > Math.abs(o[1]) ? o[0] > 0 ? "right" : "left" : o[1] > 0 ? "bottom" : "top";
}
function Q(e) {
  return !e.isGroup;
}
function $(e) {
  return null != e.shape;
}
function J(e, t, n) {
  if (e && t) {
    var r = i(e);
    t.traverse(function (e) {
      if (Q(e) && e.anid) {
        var t = r[e.anid];
        if (t) {
          var i = o(e);
          e.attr(o(t)), Object(D["h"])(e, i, n, Object(I["a"])(e).dataIndex);
        }
      }
    });
  }
  function i(e) {
    var t = {};
    return e.traverse(function (e) {
      Q(e) && e.anid && (t[e.anid] = e);
    }), t;
  }
  function o(e) {
    var t = {
      x: e.x,
      y: e.y,
      rotation: e.rotation
    };
    return $(e) && (t.shape = Object(T["l"])({}, e.shape)), t;
  }
}
function ee(e, t) {
  return Object(T["D"])(e, function (e) {
    var n = e[0];
    n = A(n, t.x), n = E(n, t.x + t.width);
    var r = e[1];
    return r = A(r, t.y), r = E(r, t.y + t.height), [n, r];
  });
}
function te(e, t) {
  var n = A(e.x, t.x),
    r = E(e.x + e.width, t.x + t.width),
    i = A(e.y, t.y),
    o = E(e.y + e.height, t.y + t.height);
  if (r >= n && o >= i) return {
    x: n,
    y: i,
    width: r - n,
    height: o - i
  };
}
function ne(e, t, n) {
  var r = Object(T["l"])({
      rectHover: !0
    }, t),
    i = r.style = {
      strokeNoScale: !0
    };
  if (n = n || {
    x: -1,
    y: -1,
    width: 2,
    height: 2
  }, e) return 0 === e.indexOf("image://") ? (i.image = e.slice(8), Object(T["i"])(i, n), new l["a"](r)) : B(e.replace("path://", ""), r, n, "center");
}
function re(e, t, n, r, i) {
  for (var o = 0, a = i[i.length - 1]; o < i.length; o++) {
    var s = i[o];
    if (ie(e, t, n, r, s[0], s[1], a[0], a[1])) return !0;
    a = s;
  }
}
function ie(e, t, n, r, i, o, a, s) {
  var l = n - e,
    u = r - t,
    c = a - i,
    f = s - o,
    d = oe(c, f, l, u);
  if (ae(d)) return !1;
  var h = e - i,
    p = t - o,
    g = oe(h, p, l, u) / d;
  if (g < 0 || g > 1) return !1;
  var m = oe(h, p, c, f) / d;
  return !(m < 0 || m > 1);
}
function oe(e, t, n, r) {
  return e * r - n * t;
}
function ae(e) {
  return e <= 1e-6 && e >= -1e-6;
}
function se(e) {
  var t = e.itemTooltipOption,
    n = e.componentModel,
    r = e.itemName,
    i = Object(T["y"])(t) ? {
      formatter: t
    } : t,
    o = n.mainType,
    a = n.componentIndex,
    s = {
      componentType: o,
      name: r,
      $vars: ["name"]
    };
  s[o + "Index"] = a;
  var l = e.formatterParamsExtra;
  l && Object(T["j"])(Object(T["B"])(l), function (e) {
    Object(T["o"])(s, e) || (s[e] = l[e], s.$vars.push(e));
  });
  var u = Object(I["a"])(e.el);
  u.componentMainType = o, u.componentIndex = a, u.tooltipConfig = {
    name: r,
    option: Object(T["i"])({
      content: r,
      formatterParams: s
    }, i)
  };
}
function le(e, t) {
  var n;
  e.isGroup && (n = t(e)), n || e.traverse(t);
}
function ue(e, t) {
  if (e) if (Object(T["r"])(e)) for (var n = 0; n < e.length; n++) le(e[n], t);else le(e, t);
}
z("circle", f["a"]), z("ellipse", d["a"]), z("sector", h["a"]), z("ring", p["a"]), z("polygon", g["a"]), z("polyline", m["a"]), z("rect", v["a"]), z("line", y["a"]), z("bezierCurve", b["a"]), z("arc", x["a"]);
