let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.default = i;
var r = o(require("./69386934.js"));
function o(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function i(e) {
  return e instanceof HTMLElement ? e : r.default.findDOMNode(e);
}
