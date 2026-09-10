let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.push = i, legacyExports.replace = a, legacyExports.go = s, legacyExports.goBack = c, legacyExports.goForward = u, legacyExports.default = void 0;
var r = o(require("../../app/history.js"));
function o(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function i() {
  r.default.push.apply(r.default, arguments);
}
function a() {
  r.default.replace.apply(r.default, arguments);
}
function s() {
  r.default.go.apply(r.default, arguments);
}
function c() {
  r.default.goBack.apply(r.default, arguments);
}
function u() {
  r.default.goForward.apply(r.default, arguments);
}
var l = {
  push: i,
  replace: a,
  go: s,
  goBack: c,
  goForward: u
};
legacyExports.default = l;
