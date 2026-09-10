let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return a;
}), defineExport(legacyExports, "h", function () {
  return l;
}), defineExport(legacyExports, "c", function () {
  return u;
}), defineExport(legacyExports, "d", function () {
  return c;
}), defineExport(legacyExports, "e", function () {
  return f;
}), defineExport(legacyExports, "f", function () {
  return h;
}), defineExport(legacyExports, "g", function () {
  return p;
}), defineExport(legacyExports, "b", function () {
  return g;
});
var r = require("./62597459.js"),
  i = require("./344e4f34.js"),
  o = Object(i["m"])();
function a(e, t, n, i, o) {
  var a;
  if (t && t.ecModel) {
    var s = t.ecModel.getUpdatePayload();
    a = s && s.animation;
  }
  var l = t && t.isAnimationEnabled(),
    u = "update" === e;
  if (l) {
    var c = void 0,
      f = void 0,
      d = void 0;
    i ? (c = Object(r["K"])(i.duration, 200), f = Object(r["K"])(i.easing, "cubicOut"), d = 0) : (c = t.getShallow(u ? "animationDurationUpdate" : "animationDuration"), f = t.getShallow(u ? "animationEasingUpdate" : "animationEasing"), d = t.getShallow(u ? "animationDelayUpdate" : "animationDelay")), a && (null != a.duration && (c = a.duration), null != a.easing && (f = a.easing), null != a.delay && (d = a.delay)), Object(r["u"])(d) && (d = d(n, o)), Object(r["u"])(c) && (c = c(n));
    var h = {
      duration: c || 0,
      delay: d,
      easing: f
    };
    return h;
  }
  return null;
}
function s(e, t, n, i, o, s, l) {
  var u,
    c = !1;
  Object(r["u"])(o) ? (l = s, s = o, o = null) : Object(r["x"])(o) && (s = o.cb, l = o.during, c = o.isFrom, u = o.removeOpt, o = o.dataIndex);
  var f = "leave" === e;
  f || t.stopAnimation("leave");
  var d = a(e, i, o, f ? u || {} : null, i && i.getAnimationDelayParams ? i.getAnimationDelayParams(t, o) : null);
  if (d && d.duration > 0) {
    var h = d.duration,
      p = d.delay,
      g = d.easing,
      m = {
        duration: h,
        delay: p || 0,
        easing: g,
        done: s,
        force: !!s || !!l,
        setToFinal: !f,
        scope: e,
        during: l
      };
    c ? t.animateFrom(n, m) : t.animateTo(n, m);
  } else t.stopAnimation(), !c && t.attr(n), l && l(1), s && s();
}
function l(e, t, n, r, i, o) {
  s("update", e, t, n, r, i, o);
}
function u(e, t, n, r, i, o) {
  s("enter", e, t, n, r, i, o);
}
function c(e) {
  if (!e.__zr) return !0;
  for (var t = 0; t < e.animators.length; t++) {
    var n = e.animators[t];
    if ("leave" === n.scope) return !0;
  }
  return !1;
}
function f(e, t, n, r, i, o) {
  c(e) || s("leave", e, t, n, r, i, o);
}
function d(e, t, n, r) {
  e.removeTextContent(), e.removeTextGuideLine(), f(e, {
    style: {
      opacity: 0
    }
  }, t, n, r);
}
function h(e, t, n) {
  function r() {
    e.parent && e.parent.remove(e);
  }
  e.isGroup ? e.traverse(function (e) {
    e.isGroup || d(e, t, n, r);
  }) : d(e, t, n, r);
}
function p(e) {
  o(e).oldStyle = e.style;
}
function g(e) {
  return o(e).oldStyle;
}
