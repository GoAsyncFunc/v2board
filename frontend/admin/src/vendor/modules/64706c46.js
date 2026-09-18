let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.default = o;
var r = i(require("./reactDomRuntime.js"));
function i(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function o(e) {
  return e instanceof HTMLElement ? e : r.default.findDOMNode(e);
}
