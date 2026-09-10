let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.default = a;
var r = i(require("./4c494178.js")),
  o = i(require("./69386934.js"));
function i(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function a(e, t, n, i) {
  var a = o.default.unstable_batchedUpdates ? function (e) {
    o.default.unstable_batchedUpdates(n, e);
  } : n;
  return (0, r.default)(e, t, a, i);
}
