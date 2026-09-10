let legacyModule = module,
  legacyExports = exports;
var r = require("./41552f77.js");
function i(e) {
  return s(e) || a(e) || o();
}
function o() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function a(e) {
  if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e);
}
function s(e) {
  if (Array.isArray(e)) {
    for (var t = 0, n = new Array(e.length); t < e.length; t++) n[t] = e[t];
    return n;
  }
}
var l = function (e) {
  return function (t) {
    return function (t) {
      return function (n) {
        if (n.type !== r["a"]) return t(n);
        var o = n.payload,
          a = o.method,
          s = o.args;
        e[a].apply(e, i(s));
      };
    };
  };
};
legacyExports["a"] = l;
