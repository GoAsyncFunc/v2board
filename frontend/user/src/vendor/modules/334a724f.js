let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.rootContainer = a, legacyExports.initialProps = s, legacyExports.modifyInitialProps = c;
var r = i(require("./71317449.js")),
  o = require("../../app/store.js");
function i(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function a(e) {
  return r.default.createElement(o._DvaContainer, null, e);
}
function s(e) {
  if (e) return e;
  var t = (0, o.getApp)()._store.getState();
  return Object.keys(t).reduce(function (e, n) {
    return ["@@dva", "loading", "routing"].includes(n) || (e[n] = t[n]), e;
  }, {});
}
function c(e) {
  return e ? {
    store: (0, o.getApp)()._store
  } : {};
}
