let legacyModule = module,
  legacyExports = exports;
function n(e) {
  return function (t, n, r) {
    var i = -1,
      a = Object(t),
      o = r(t),
      u = o.length;
    while (u--) {
      var l = o[e ? u : ++i];
      if (!1 === n(a[l], l, a)) break;
    }
    return t;
  };
}
legacyModule.exports = n;
