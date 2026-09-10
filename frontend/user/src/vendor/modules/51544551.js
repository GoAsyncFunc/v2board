let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = function (e, t) {
  return t = "number" == typeof t ? t : 1 / 0, t ? n(e, 1) : Array.isArray(e) ? e.map(function (e) {
    return e;
  }) : e;
  function n(e, r) {
    return e.reduce(function (e, o) {
      return Array.isArray(o) && r < t ? e.concat(n(o, r + 1)) : e.concat(o);
    }, []);
  }
};
