let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.default = i;
var r = o(require("./reactDomRuntime.js"));
function o(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function i(e) {
  return e instanceof HTMLElement ? e : r.default.findDOMNode(e);
}
