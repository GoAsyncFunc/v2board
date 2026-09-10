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
function i(e) {
  var t = e,
    n = [];
  function i(e) {
    t = r({}, t, e);
    for (var i = 0; i < n.length; i++) n[i]();
  }
  function o() {
    return t;
  }
  function a(e) {
    return n.push(e), function () {
      var t = n.indexOf(e);
      n.splice(t, 1);
    };
  }
  return {
    setState: i,
    getState: o,
    subscribe: a
  };
}
legacyExports.default = i;
