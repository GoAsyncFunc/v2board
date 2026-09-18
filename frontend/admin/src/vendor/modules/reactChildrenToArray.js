let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.default = flattenChildren;
var reactModule = interopDefault(require("./reactRuntime.js")),
  reactIs = require("./reactIsLegacyEntry.js");
function interopDefault(moduleValue) {
  return moduleValue && moduleValue.__esModule ? moduleValue : {
    default: moduleValue
  };
}
function flattenChildren(children) {
  var result = [];
  return reactModule.default.Children.forEach(children, function (child) {
    void 0 !== child && null !== child && (Array.isArray(child) ? result = result.concat(flattenChildren(child)) : (0, reactIs.isFragment)(child) && child.props ? result = result.concat(flattenChildren(child.props.children)) : result.push(child));
  }), result;
}
