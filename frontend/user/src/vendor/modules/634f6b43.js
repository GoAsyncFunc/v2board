let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.warning = o, legacyExports.note = i, legacyExports.resetWarned = a, legacyExports.call = s, legacyExports.warningOnce = c, legacyExports.noteOnce = u, legacyExports.default = void 0;
var r = {};
function o(e, t) {
  0;
}
function i(e, t) {
  0;
}
function a() {
  r = {};
}
function s(e, t, n) {
  t || r[n] || (e(!1, n), r[n] = !0);
}
function c(e, t) {
  s(o, e, t);
}
function u(e, t) {
  s(i, e, t);
}
var l = c;
legacyExports.default = l;
