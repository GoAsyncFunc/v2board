let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.default = a;
var r = o(require("./4c494178.js")),
  i = o(require("./reactDomRuntime.js"));
function o(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function a(e, t, n, o) {
  var a = i.default.unstable_batchedUpdates ? function (e) {
    i.default.unstable_batchedUpdates(n, e);
  } : n;
  return (0, r.default)(e, t, a, o);
}
