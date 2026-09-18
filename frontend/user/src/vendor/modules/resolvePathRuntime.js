let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule
} = require("../../app/moduleInterop.js");
function r(e) {
  return "/" === e.charAt(0);
}
function o(e, t) {
  for (var n = t, r = n + 1, o = e.length; r < o; n += 1, r += 1) e[n] = e[r];
  e.pop();
}
function i(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
    n = e && e.split("/") || [],
    i = t && t.split("/") || [],
    a = e && r(e),
    s = t && r(t),
    c = a || s;
  if (e && r(e) ? i = n : n.length && (i.pop(), i = i.concat(n)), !i.length) return "/";
  var u = void 0;
  if (i.length) {
    var l = i[i.length - 1];
    u = "." === l || ".." === l || "" === l;
  } else u = !1;
  for (var f = 0, p = i.length; p >= 0; p--) {
    var d = i[p];
    "." === d ? o(i, p) : ".." === d ? (o(i, p), f++) : f && (o(i, p), f--);
  }
  if (!c) for (; f--; f) i.unshift("..");
  !c || "" === i[0] || i[0] && r(i[0]) || i.unshift("");
  var h = i.join("/");
  return u && "/" !== h.substr(-1) && (h += "/"), h;
}
markEsModule(legacyExports), legacyExports["default"] = i;
