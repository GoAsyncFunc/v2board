let legacyModule = module,
  legacyExports = exports;
function n(e, t) {
  var n,
    r = 0,
    o = e.length;
  for (r; r < o; r++) if (n = t(e[r], r), !1 === n) break;
}
function r(e) {
  return "[object Array]" === Object.prototype.toString.apply(e);
}
function o(e) {
  return "function" === typeof e;
}
legacyModule.exports = {
  isFunction: o,
  isArray: r,
  each: n
};
