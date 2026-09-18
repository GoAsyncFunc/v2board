let legacyModule = module,
  legacyExports = exports;
var r = function (e, t, n, r, o, i, a, s) {
  if (!e) {
    var c;
    if (void 0 === t) c = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else {
      var u = [n, r, o, i, a, s],
        l = 0;
      c = new Error(t.replace(/%s/g, function () {
        return u[l++];
      })), c.name = "Invariant Violation";
    }
    throw c.framesToPop = 1, c;
  }
};
legacyModule.exports = r;
