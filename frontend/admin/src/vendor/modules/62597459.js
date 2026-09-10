let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "n", function () {
  return g;
}), defineExport(legacyExports, "C", function () {
  return v;
}), defineExport(legacyExports, "d", function () {
  return y;
}), defineExport(legacyExports, "E", function () {
  return b;
}), defineExport(legacyExports, "l", function () {
  return w;
}), defineExport(legacyExports, "i", function () {
  return x;
}), defineExport(legacyExports, "p", function () {
  return _;
}), defineExport(legacyExports, "q", function () {
  return E;
}), defineExport(legacyExports, "F", function () {
  return S;
}), defineExport(legacyExports, "s", function () {
  return k;
}), defineExport(legacyExports, "j", function () {
  return C;
}), defineExport(legacyExports, "D", function () {
  return O;
}), defineExport(legacyExports, "I", function () {
  return T;
}), defineExport(legacyExports, "m", function () {
  return L;
}), defineExport(legacyExports, "B", function () {
  return A;
}), defineExport(legacyExports, "c", function () {
  return j;
}), defineExport(legacyExports, "h", function () {
  return M;
}), defineExport(legacyExports, "r", function () {
  return R;
}), defineExport(legacyExports, "u", function () {
  return N;
}), defineExport(legacyExports, "y", function () {
  return D;
}), defineExport(legacyExports, "z", function () {
  return I;
}), defineExport(legacyExports, "w", function () {
  return $;
}), defineExport(legacyExports, "x", function () {
  return F;
}), defineExport(legacyExports, "A", function () {
  return V;
}), defineExport(legacyExports, "t", function () {
  return W;
}), defineExport(legacyExports, "v", function () {
  return H;
}), defineExport(legacyExports, "k", function () {
  return U;
}), defineExport(legacyExports, "J", function () {
  return z;
}), defineExport(legacyExports, "K", function () {
  return G;
}), defineExport(legacyExports, "L", function () {
  return q;
}), defineExport(legacyExports, "N", function () {
  return K;
}), defineExport(legacyExports, "H", function () {
  return Y;
}), defineExport(legacyExports, "b", function () {
  return X;
}), defineExport(legacyExports, "O", function () {
  return Q;
}), defineExport(legacyExports, "M", function () {
  return J;
}), defineExport(legacyExports, "f", function () {
  return ne;
}), defineExport(legacyExports, "e", function () {
  return re;
}), defineExport(legacyExports, "g", function () {
  return ie;
}), defineExport(legacyExports, "o", function () {
  return oe;
}), defineExport(legacyExports, "G", function () {
  return ae;
}), defineExport(legacyExports, "a", function () {
  return se;
});
var r = require("./636d3672.js"),
  i = T(["Function", "RegExp", "Date", "Error", "CanvasGradient", "CanvasPattern", "Image", "Canvas"], function (e, t) {
    return e["[object " + t + "]"] = !0, e;
  }, {}),
  o = T(["Int8", "Uint8", "Uint8Clamped", "Int16", "Uint16", "Int32", "Uint32", "Float32", "Float64"], function (e, t) {
    return e["[object " + t + "Array]"] = !0, e;
  }, {}),
  a = Object.prototype.toString,
  s = Array.prototype,
  l = s.forEach,
  c = s.filter,
  u = s.slice,
  h = s.map,
  f = function () {}.constructor,
  d = f ? f.prototype : null,
  p = "__proto__",
  m = 2311;
function g() {
  return m++;
}
function v() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  "undefined" !== typeof console && console.error.apply(console, e);
}
function y(e) {
  if (null == e || "object" !== typeof e) return e;
  var t = e,
    n = a.call(e);
  if ("[object Array]" === n) {
    if (!ee(e)) {
      t = [];
      for (var r = 0, s = e.length; r < s; r++) t[r] = y(e[r]);
    }
  } else if (o[n]) {
    if (!ee(e)) {
      var l = e.constructor;
      if (l.from) t = l.from(e);else {
        t = new l(e.length);
        for (r = 0, s = e.length; r < s; r++) t[r] = e[r];
      }
    }
  } else if (!i[n] && !ee(e) && !W(e)) for (var c in t = {}, e) e.hasOwnProperty(c) && c !== p && (t[c] = y(e[c]));
  return t;
}
function b(e, t, n) {
  if (!F(t) || !F(e)) return n ? y(t) : e;
  for (var r in t) if (t.hasOwnProperty(r) && r !== p) {
    var i = e[r],
      o = t[r];
    !F(o) || !F(i) || R(o) || R(i) || W(o) || W(i) || B(o) || B(i) || ee(o) || ee(i) ? !n && r in e || (e[r] = y(t[r])) : b(i, o, n);
  }
  return e;
}
function w(e, t) {
  if (Object.assign) Object.assign(e, t);else for (var n in t) t.hasOwnProperty(n) && n !== p && (e[n] = t[n]);
  return e;
}
function x(e, t, n) {
  for (var r = A(t), i = 0; i < r.length; i++) {
    var o = r[i];
    (n ? null != t[o] : null == e[o]) && (e[o] = t[o]);
  }
  return e;
}
r["d"].createCanvas;
function _(e, t) {
  if (e) {
    if (e.indexOf) return e.indexOf(t);
    for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return n;
  }
  return -1;
}
function E(e, t) {
  var n = e.prototype;
  function r() {}
  for (var i in r.prototype = t.prototype, e.prototype = new r(), n) n.hasOwnProperty(i) && (e.prototype[i] = n[i]);
  e.prototype.constructor = e, e.superClass = t;
}
function S(e, t, n) {
  if (e = "prototype" in e ? e.prototype : e, t = "prototype" in t ? t.prototype : t, Object.getOwnPropertyNames) for (var r = Object.getOwnPropertyNames(t), i = 0; i < r.length; i++) {
    var o = r[i];
    "constructor" !== o && (n ? null != t[o] : null == e[o]) && (e[o] = t[o]);
  } else x(e, t, n);
}
function k(e) {
  return !!e && "string" !== typeof e && "number" === typeof e.length;
}
function C(e, t, n) {
  if (e && t) if (e.forEach && e.forEach === l) e.forEach(t, n);else if (e.length === +e.length) for (var r = 0, i = e.length; r < i; r++) t.call(n, e[r], r, e);else for (var o in e) e.hasOwnProperty(o) && t.call(n, e[o], o, e);
}
function O(e, t, n) {
  if (!e) return [];
  if (!t) return K(e);
  if (e.map && e.map === h) return e.map(t, n);
  for (var r = [], i = 0, o = e.length; i < o; i++) r.push(t.call(n, e[i], i, e));
  return r;
}
function T(e, t, n, r) {
  if (e && t) {
    for (var i = 0, o = e.length; i < o; i++) n = t.call(r, n, e[i], i, e);
    return n;
  }
}
function L(e, t, n) {
  if (!e) return [];
  if (!t) return K(e);
  if (e.filter && e.filter === c) return e.filter(t, n);
  for (var r = [], i = 0, o = e.length; i < o; i++) t.call(n, e[i], i, e) && r.push(e[i]);
  return r;
}
function A(e) {
  if (!e) return [];
  if (Object.keys) return Object.keys(e);
  var t = [];
  for (var n in e) e.hasOwnProperty(n) && t.push(n);
  return t;
}
function P(e, t) {
  for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
  return function () {
    return e.apply(t, n.concat(u.call(arguments)));
  };
}
var j = d && N(d.bind) ? d.call.bind(d.bind) : P;
function M(e) {
  for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
  return function () {
    return e.apply(this, t.concat(u.call(arguments)));
  };
}
function R(e) {
  return Array.isArray ? Array.isArray(e) : "[object Array]" === a.call(e);
}
function N(e) {
  return "function" === typeof e;
}
function D(e) {
  return "string" === typeof e;
}
function I(e) {
  return "[object String]" === a.call(e);
}
function $(e) {
  return "number" === typeof e;
}
function F(e) {
  var t = typeof e;
  return "function" === t || !!e && "object" === t;
}
function B(e) {
  return !!i[a.call(e)];
}
function V(e) {
  return !!o[a.call(e)];
}
function W(e) {
  return "object" === typeof e && "number" === typeof e.nodeType && "object" === typeof e.ownerDocument;
}
function H(e) {
  return null != e.colorStops;
}
function U(e) {
  return e !== e;
}
function z() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  for (var n = 0, r = e.length; n < r; n++) if (null != e[n]) return e[n];
}
function G(e, t) {
  return null != e ? e : t;
}
function q(e, t, n) {
  return null != e ? e : null != t ? t : n;
}
function K(e) {
  for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
  return u.apply(e, t);
}
function Y(e) {
  if ("number" === typeof e) return [e, e, e, e];
  var t = e.length;
  return 2 === t ? [e[0], e[1], e[0], e[1]] : 3 === t ? [e[0], e[1], e[2], e[1]] : e;
}
function X(e, t) {
  if (!e) throw new Error(t);
}
function Q(e) {
  return null == e ? null : "function" === typeof e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}
var Z = "__ec_primitive__";
function J(e) {
  e[Z] = !0;
}
function ee(e) {
  return e[Z];
}
var te = function () {
  function e(t) {
    this.data = {};
    var n = R(t);
    this.data = {};
    var r = this;
    function i(e, t) {
      n ? r.set(e, t) : r.set(t, e);
    }
    t instanceof e ? t.each(i) : t && C(t, i);
  }
  return e.prototype.get = function (e) {
    return this.data.hasOwnProperty(e) ? this.data[e] : null;
  }, e.prototype.set = function (e, t) {
    return this.data[e] = t;
  }, e.prototype.each = function (e, t) {
    for (var n in this.data) this.data.hasOwnProperty(n) && e.call(t, this.data[n], n);
  }, e.prototype.keys = function () {
    return A(this.data);
  }, e.prototype.removeKey = function (e) {
    delete this.data[e];
  }, e;
}();
function ne(e) {
  return new te(e);
}
function re(e, t) {
  for (var n = new e.constructor(e.length + t.length), r = 0; r < e.length; r++) n[r] = e[r];
  var i = e.length;
  for (r = 0; r < t.length; r++) n[r + i] = t[r];
  return n;
}
function ie(e, t) {
  var n;
  if (Object.create) n = Object.create(e);else {
    var r = function () {};
    r.prototype = e, n = new r();
  }
  return t && w(n, t), n;
}
function oe(e, t) {
  return e.hasOwnProperty(t);
}
function ae() {}
var se = 180 / Math.PI;
