let legacyModule = module,
  legacyExports = exports;
function r(e) {
  return !(e.type && e.type.prototype && !e.type.prototype.render);
}
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.supportRef = r;
