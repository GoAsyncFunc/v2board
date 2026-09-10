let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "b", function () {
  return r;
}), defineExport(legacyExports, "f", function () {
  return o;
}), defineExport(legacyExports, "a", function () {
  return i;
}), defineExport(legacyExports, "g", function () {
  return s;
}), defineExport(legacyExports, "h", function () {
  return c;
}), defineExport(legacyExports, "c", function () {
  return u;
}), defineExport(legacyExports, "d", function () {
  return l;
}), defineExport(legacyExports, "e", function () {
  return f;
}), defineExport(legacyExports, "i", function () {
  return p;
});
var r = "@@router/LOCATION_CHANGE",
  o = function (e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    return {
      type: r,
      payload: {
        location: e,
        action: t,
        isFirstRendering: n
      }
    };
  },
  i = "@@router/CALL_HISTORY_METHOD",
  a = function (e) {
    return function () {
      for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
      return {
        type: i,
        payload: {
          method: e,
          args: n
        }
      };
    };
  },
  s = a("push"),
  c = a("replace"),
  u = a("go"),
  l = a("goBack"),
  f = a("goForward"),
  p = {
    push: s,
    replace: c,
    go: u,
    goBack: l,
    goForward: f
  };
