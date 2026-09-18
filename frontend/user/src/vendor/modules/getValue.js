let legacyModule = module,
  legacyExports = exports;
function n(e, t) {
  if (("constructor" !== t || "function" !== typeof e[t]) && "__proto__" != t) return e[t];
}
legacyModule.exports = n;
