let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "c", function () {
  return a;
}), defineExport(legacyExports, "b", function () {
  return s;
}), defineExport(legacyExports, "a", function () {
  return l;
});
var r = "\0__throttleOriginMethod",
  i = "\0__throttleRate",
  o = "\0__throttleType";
function a(e, t, n) {
  var r,
    i,
    o,
    a,
    s,
    l = 0,
    u = 0,
    c = null;
  function f() {
    u = new Date().getTime(), c = null, e.apply(o, a || []);
  }
  t = t || 0;
  var d = function () {
    for (var e = [], d = 0; d < arguments.length; d++) e[d] = arguments[d];
    r = new Date().getTime(), o = this, a = e;
    var h = s || t,
      p = s || n;
    s = null, i = r - (p ? l : u) - h, clearTimeout(c), p ? c = setTimeout(f, h) : i >= 0 ? f() : c = setTimeout(f, -i), l = r;
  };
  return d.clear = function () {
    c && (clearTimeout(c), c = null);
  }, d.debounceNextCall = function (e) {
    s = e;
  }, d;
}
function s(e, t, n, s) {
  var l = e[t];
  if (l) {
    var u = l[r] || l,
      c = l[o],
      f = l[i];
    if (f !== n || c !== s) {
      if (null == n || !s) return e[t] = u;
      l = e[t] = a(u, n, "debounce" === s), l[r] = u, l[o] = s, l[i] = n;
    }
    return l;
  }
}
function l(e, t) {
  var n = e[t];
  n && n[r] && (n.clear && n.clear(), e[t] = n[r]);
}
