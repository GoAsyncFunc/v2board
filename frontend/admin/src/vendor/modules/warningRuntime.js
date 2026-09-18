let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.warning = i, legacyExports.note = o, legacyExports.resetWarned = a, legacyExports.call = s, legacyExports.warningOnce = l, legacyExports.noteOnce = c, legacyExports.default = void 0;
var r = {};
function i(e, t) {
  0;
}
function o(e, t) {
  0;
}
function a() {
  r = {};
}
function s(e, t, n) {
  t || r[n] || (e(!1, n), r[n] = !0);
}
function l(e, t) {
  s(i, e, t);
}
function c(e, t) {
  s(o, e, t);
}
var u = l;
legacyExports.default = u;
