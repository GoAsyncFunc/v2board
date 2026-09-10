let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "b", function () {
  return r;
}), defineExport(legacyExports, "f", function () {
  return i;
}), defineExport(legacyExports, "a", function () {
  return o;
}), defineExport(legacyExports, "g", function () {
  return s;
}), defineExport(legacyExports, "h", function () {
  return l;
}), defineExport(legacyExports, "c", function () {
  return c;
}), defineExport(legacyExports, "d", function () {
  return u;
}), defineExport(legacyExports, "e", function () {
  return h;
}), defineExport(legacyExports, "i", function () {
  return f;
});
var r = "@@router/LOCATION_CHANGE",
  i = function (e, t) {
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
  o = "@@router/CALL_HISTORY_METHOD",
  a = function (e) {
    return function () {
      for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
      return {
        type: o,
        payload: {
          method: e,
          args: n
        }
      };
    };
  },
  s = a("push"),
  l = a("replace"),
  c = a("go"),
  u = a("goBack"),
  h = a("goForward"),
  f = {
    push: s,
    replace: l,
    go: c,
    goBack: u,
    goForward: h
  };
