let legacyModule = module,
  legacyExports = exports;
legacyExports.__esModule = !0, legacyExports.default = function (e, t) {
  var n = {};
  for (var r in e) t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
  return n;
};
