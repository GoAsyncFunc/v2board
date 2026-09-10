let legacyModule = module,
  legacyExports = exports;
function n(e, t) {
  var n,
    r = 0,
    i = e.length;
  for (r; r < i; r++) if (n = t(e[r], r), !1 === n) break;
}
function r(e) {
  return "[object Array]" === Object.prototype.toString.apply(e);
}
function i(e) {
  return "function" === typeof e;
}
legacyModule.exports = {
  isFunction: i,
  isArray: r,
  each: n
};
