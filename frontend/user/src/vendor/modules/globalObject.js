let legacyModule = module,
  legacyExports = exports;
var n = legacyModule.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
"number" == typeof __g && (__g = n);
