let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
(function (e) {
  defineExport(legacyExports, "p", function () {
    return s;
  }), defineExport(legacyExports, "j", function () {
    return c;
  }), defineExport(legacyExports, "q", function () {
    return h;
  }), defineExport(legacyExports, "e", function () {
    return f;
  }), defineExport(legacyExports, "a", function () {
    return d;
  }), defineExport(legacyExports, "b", function () {
    return p;
  }), defineExport(legacyExports, "i", function () {
    return m;
  }), defineExport(legacyExports, "h", function () {
    return g;
  }), defineExport(legacyExports, "l", function () {
    return v;
  }), defineExport(legacyExports, "n", function () {
    return b;
  }), defineExport(legacyExports, "m", function () {
    return w;
  }), defineExport(legacyExports, "o", function () {
    return x;
  }), defineExport(legacyExports, "k", function () {
    return _;
  }), defineExport(legacyExports, "d", function () {
    return E;
  }), defineExport(legacyExports, "f", function () {
    return S;
  }), defineExport(legacyExports, "g", function () {
    return k;
  }), defineExport(legacyExports, "c", function () {
    return C;
  });
  var r = require("./62597459.js"),
    i = require("./51653970.js"),
    o = require("./49744746.js"),
    a = Math.round;
  function s(e) {
    var t;
    if (e && "transparent" !== e) {
      if ("string" === typeof e && e.indexOf("rgba") > -1) {
        var n = Object(i["d"])(e);
        n && (e = "rgb(" + n[0] + "," + n[1] + "," + n[2] + ")", t = n[3]);
      }
    } else e = "none";
    return {
      color: e,
      opacity: null == t ? 1 : t
    };
  }
  var l = 1e-4;
  function c(e) {
    return e < l && e > -l;
  }
  function u(e) {
    return a(1e3 * e) / 1e3;
  }
  function h(e) {
    return a(1e4 * e) / 1e4;
  }
  function f(e) {
    return "matrix(" + u(e[0]) + "," + u(e[1]) + "," + u(e[2]) + "," + u(e[3]) + "," + h(e[4]) + "," + h(e[5]) + ")";
  }
  var d = {
    left: "start",
    right: "end",
    center: "middle",
    middle: "middle"
  };
  function p(e, t, n) {
    return "top" === n ? e += t / 2 : "bottom" === n && (e -= t / 2), e;
  }
  function m(e) {
    return e && (e.shadowBlur || e.shadowOffsetX || e.shadowOffsetY);
  }
  function g(e) {
    var t = e.style,
      n = e.getGlobalScale();
    return [t.shadowColor, (t.shadowBlur || 0).toFixed(2), (t.shadowOffsetX || 0).toFixed(2), (t.shadowOffsetY || 0).toFixed(2), n[0], n[1]].join(",");
  }
  function v(e) {
    return e && !!e.image;
  }
  function y(e) {
    return e && !!e.svgElement;
  }
  function b(e) {
    return v(e) || y(e);
  }
  function w(e) {
    return "linear" === e.type;
  }
  function x(e) {
    return "radial" === e.type;
  }
  function _(e) {
    return e && ("linear" === e.type || "radial" === e.type);
  }
  function E(e) {
    return "url(#" + e + ")";
  }
  function S(e) {
    var t = e.getGlobalScale(),
      n = Math.max(t[0], t[1]);
    return Math.max(Math.ceil(Math.log(n) / Math.log(10)), 1);
  }
  function k(e) {
    var t = e.x || 0,
      n = e.y || 0,
      i = (e.rotation || 0) * r["a"],
      o = Object(r["K"])(e.scaleX, 1),
      s = Object(r["K"])(e.scaleY, 1),
      l = e.skewX || 0,
      c = e.skewY || 0,
      u = [];
    return (t || n) && u.push("translate(" + t + "px," + n + "px)"), i && u.push("rotate(" + i + ")"), 1 === o && 1 === s || u.push("scale(" + o + "," + s + ")"), (l || c) && u.push("skew(" + a(l * r["a"]) + "deg, " + a(c * r["a"]) + "deg)"), u.join(" ");
  }
  var C = function () {
    return o["a"].hasGlobalWindow && Object(r["u"])(window.btoa) ? function (e) {
      return window.btoa(unescape(e));
    } : "undefined" !== typeof e ? function (t) {
      return e.from(t).toString("base64");
    } : function (e) {
      return null;
    };
  }();
}).call(this, require("./746a6c41.js").Buffer);
