let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "e", function () {
  return c;
}), defineExport(legacyExports, "c", function () {
  return f;
}), defineExport(legacyExports, "a", function () {
  return d;
}), defineExport(legacyExports, "b", function () {
  return x;
}), defineExport(legacyExports, "d", function () {
  return _;
}), defineExport(legacyExports, "f", function () {
  return w;
});
var r = require("./64715547.js"),
  i = require("./62597459.js"),
  o = require("./66577761.js"),
  a = require("./344e4f34.js"),
  s = (require("./33736f46.js"), {});
function l(e, t) {
  for (var n = 0; n < o["g"].length; n++) {
    var r = o["g"][n],
      i = t[r],
      a = e.ensureState(r);
    a.style = a.style || {}, a.style.text = i;
  }
  var s = e.currentStates.slice();
  e.clearStates(!0), e.setStyle({
    text: t.normal
  }), e.useStates(s, !0);
}
function u(e, t, n) {
  var r,
    a = e.labelFetcher,
    s = e.labelDataIndex,
    l = e.labelDimIndex,
    u = t.normal;
  a && (r = a.getFormattedLabel(s, "normal", null, l, u && u.get("formatter"), null != n ? {
    interpolatedValue: n
  } : null)), null == r && (r = Object(i["u"])(e.defaultText) ? e.defaultText(s, e, n) : e.defaultText);
  for (var c = {
      normal: r
    }, f = 0; f < o["g"].length; f++) {
    var d = o["g"][f],
      h = t[d];
    c[d] = Object(i["K"])(a ? a.getFormattedLabel(s, d, null, l, h && h.get("formatter")) : null, r);
  }
  return c;
}
function c(e, t, n, a) {
  n = n || s;
  for (var c = e instanceof r["a"], f = !1, p = 0; p < o["a"].length; p++) {
    var g = t[o["a"][p]];
    if (g && g.getShallow("show")) {
      f = !0;
      break;
    }
  }
  var m = c ? e : e.getTextContent();
  if (f) {
    c || (m || (m = new r["a"](), e.setTextContent(m)), e.stateProxy && (m.stateProxy = e.stateProxy));
    var v = u(n, t),
      y = t.normal,
      b = !!y.getShallow("show"),
      x = d(y, a && a.normal, n, !1, !c);
    x.text = v.normal, c || e.setTextConfig(h(y, n, !1));
    for (p = 0; p < o["g"].length; p++) {
      var w = o["g"][p];
      g = t[w];
      if (g) {
        var O = m.ensureState(w),
          S = !!Object(i["K"])(g.getShallow("show"), b);
        if (S !== b && (O.ignore = !S), O.style = d(g, a && a[w], n, !0, !c), O.style.text = v[w], !c) {
          var k = e.ensureState(w);
          k.textConfig = h(g, n, !0);
        }
      }
    }
    m.silent = !!y.getShallow("silent"), null != m.style.x && (x.x = m.style.x), null != m.style.y && (x.y = m.style.y), m.ignore = !b, m.useStyle(x), m.dirty(), n.enableTextSetter && (_(m).setLabelText = function (e) {
      var r = u(n, t, e);
      l(m, r);
    });
  } else m && (m.ignore = !0);
  e.dirty();
}
function f(e, t) {
  t = t || "label";
  for (var n = {
      normal: e.getModel(t)
    }, r = 0; r < o["g"].length; r++) {
    var i = o["g"][r];
    n[i] = e.getModel([i, t]);
  }
  return n;
}
function d(e, t, n, r, o) {
  var a = {};
  return p(a, e, n, r, o), t && Object(i["l"])(a, t), a;
}
function h(e, t, n) {
  t = t || {};
  var r,
    o = {},
    a = e.getShallow("rotate"),
    s = Object(i["K"])(e.getShallow("distance"), n ? null : 5),
    l = e.getShallow("offset");
  return r = e.getShallow("position") || (n ? null : "inside"), "outside" === r && (r = t.defaultOutsidePosition || "top"), null != r && (o.position = r), null != l && (o.offset = l), null != a && (a *= Math.PI / 180, o.rotation = a), null != s && (o.distance = s), o.outsideFill = "inherit" === e.get("color") ? t.inheritColor || null : "auto", o;
}
function p(e, t, n, r, i) {
  n = n || s;
  var o,
    a = t.ecModel,
    l = a && a.option.textStyle,
    u = g(t);
  if (u) for (var c in o = {}, u) if (u.hasOwnProperty(c)) {
    var f = t.getModel(["rich", c]);
    b(o[c] = {}, f, l, n, r, i, !1, !0);
  }
  o && (e.rich = o);
  var d = t.get("overflow");
  d && (e.overflow = d);
  var h = t.get("minMargin");
  null != h && (e.margin = h), b(e, t, l, n, r, i, !0, !1);
}
function g(e) {
  var t;
  while (e && e !== e.ecModel) {
    var n = (e.option || s).rich;
    if (n) {
      t = t || {};
      for (var r = Object(i["B"])(n), o = 0; o < r.length; o++) {
        var a = r[o];
        t[a] = 1;
      }
    }
    e = e.parentModel;
  }
  return t;
}
var m = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY"],
  v = ["align", "lineHeight", "width", "height", "tag", "verticalAlign"],
  y = ["padding", "borderWidth", "borderRadius", "borderDashOffset", "backgroundColor", "borderColor", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"];
function b(e, t, n, r, o, a, l, u) {
  n = !o && n || s;
  var c = r && r.inheritColor,
    f = t.getShallow("color"),
    d = t.getShallow("textBorderColor"),
    h = Object(i["K"])(t.getShallow("opacity"), n.opacity);
  "inherit" !== f && "auto" !== f || (f = c || null), "inherit" !== d && "auto" !== d || (d = c || null), a || (f = f || n.color, d = d || n.textBorderColor), null != f && (e.fill = f), null != d && (e.stroke = d);
  var p = Object(i["K"])(t.getShallow("textBorderWidth"), n.textBorderWidth);
  null != p && (e.lineWidth = p);
  var g = Object(i["K"])(t.getShallow("textBorderType"), n.textBorderType);
  null != g && (e.lineDash = g);
  var b = Object(i["K"])(t.getShallow("textBorderDashOffset"), n.textBorderDashOffset);
  null != b && (e.lineDashOffset = b), o || null != h || u || (h = r && r.defaultOpacity), null != h && (e.opacity = h), o || a || null == e.fill && r.inheritColor && (e.fill = r.inheritColor);
  for (var x = 0; x < m.length; x++) {
    var _ = m[x],
      w = Object(i["K"])(t.getShallow(_), n[_]);
    null != w && (e[_] = w);
  }
  for (x = 0; x < v.length; x++) {
    _ = v[x], w = t.getShallow(_);
    null != w && (e[_] = w);
  }
  if (null == e.verticalAlign) {
    var O = t.getShallow("baseline");
    null != O && (e.verticalAlign = O);
  }
  if (!l || !r.disableBox) {
    for (x = 0; x < y.length; x++) {
      _ = y[x], w = t.getShallow(_);
      null != w && (e[_] = w);
    }
    var S = t.getShallow("borderType");
    null != S && (e.borderDash = S), "auto" !== e.backgroundColor && "inherit" !== e.backgroundColor || !c || (e.backgroundColor = c), "auto" !== e.borderColor && "inherit" !== e.borderColor || !c || (e.borderColor = c);
  }
}
function x(e, t) {
  var n = t && t.getModel("textStyle");
  return Object(i["O"])([e.fontStyle || n && n.getShallow("fontStyle") || "", e.fontWeight || n && n.getShallow("fontWeight") || "", (e.fontSize || n && n.getShallow("fontSize") || 12) + "px", e.fontFamily || n && n.getShallow("fontFamily") || "sans-serif"].join(" "));
}
var _ = Object(a["m"])();
function w(e, t, n, r) {
  if (e) {
    var i = _(e);
    i.prevValue = i.value, i.value = n;
    var o = t.normal;
    i.valueAnimation = o.get("valueAnimation"), i.valueAnimation && (i.precision = o.get("precision"), i.defaultInterpolatedText = r, i.statesModels = t);
  }
}
