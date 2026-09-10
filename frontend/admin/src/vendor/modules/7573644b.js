let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.push = o, legacyExports.replace = a, legacyExports.go = s, legacyExports.goBack = l, legacyExports.goForward = c, legacyExports.default = void 0;
var r = i(require("../../app/history.js"));
function i(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function o() {
  r.default.push.apply(r.default, arguments);
}
function a() {
  r.default.replace.apply(r.default, arguments);
}
function s() {
  r.default.go.apply(r.default, arguments);
}
function l() {
  r.default.goBack.apply(r.default, arguments);
}
function c() {
  r.default.goForward.apply(r.default, arguments);
}
var u = {
  push: o,
  replace: a,
  go: s,
  goBack: l,
  goForward: c
};
legacyExports.default = u;
