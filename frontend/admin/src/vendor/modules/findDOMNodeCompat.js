let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.default = findDOMNode;
var reactDom = interopDefault(require("./reactDomRuntime.js"));
function interopDefault(moduleValue) {
  return moduleValue && moduleValue.__esModule ? moduleValue : {
    default: moduleValue
  };
}
function findDOMNode(component) {
  return component instanceof HTMLElement ? component : reactDom.default.findDOMNode(component);
}
