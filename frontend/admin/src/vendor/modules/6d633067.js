let legacyModule = module,
  legacyExports = exports;
function n(e) {
  return function (t, n, r) {
    var i = -1,
      o = Object(t),
      a = r(t),
      s = a.length;
    while (s--) {
      var l = a[e ? s : ++i];
      if (!1 === n(o[l], l, o)) break;
    }
    return t;
  };
}
legacyModule.exports = n;
