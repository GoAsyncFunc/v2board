let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var r = Object.assign || function (e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t];
    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
  }
  return e;
};
function o(e) {
  var t = e,
    n = [];
  function o(e) {
    t = r({}, t, e);
    for (var o = 0; o < n.length; o++) n[o]();
  }
  function i() {
    return t;
  }
  function a(e) {
    return n.push(e), function () {
      var t = n.indexOf(e);
      n.splice(t, 1);
    };
  }
  return {
    setState: o,
    getState: i,
    subscribe: a
  };
}
legacyExports.default = o;
