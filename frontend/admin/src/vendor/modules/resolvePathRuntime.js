let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule
} = require("../../app/moduleInterop.js");
function r(e) {
  return "/" === e.charAt(0);
}
function i(e, t) {
  for (var n = t, r = n + 1, i = e.length; r < i; n += 1, r += 1) e[n] = e[r];
  e.pop();
}
function o(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
    n = e && e.split("/") || [],
    o = t && t.split("/") || [],
    a = e && r(e),
    s = t && r(t),
    l = a || s;
  if (e && r(e) ? o = n : n.length && (o.pop(), o = o.concat(n)), !o.length) return "/";
  var c = void 0;
  if (o.length) {
    var u = o[o.length - 1];
    c = "." === u || ".." === u || "" === u;
  } else c = !1;
  for (var h = 0, f = o.length; f >= 0; f--) {
    var d = o[f];
    "." === d ? i(o, f) : ".." === d ? (i(o, f), h++) : h && (i(o, f), h--);
  }
  if (!l) for (; h--; h) o.unshift("..");
  !l || "" === o[0] || o[0] && r(o[0]) || o.unshift("");
  var p = o.join("/");
  return c && "/" !== p.substr(-1) && (p += "/"), p;
}
markEsModule(legacyExports), legacyExports["default"] = o;
