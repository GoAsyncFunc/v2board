let legacyModule = module,
  legacyExports = exports;
legacyExports.__esModule = !0;
var reactModule = require("./reactRuntime.js"),
  React = interopDefault(reactModule),
  polyfillModule = require("./createReactContextPolyfill.js"),
  createReactContextPolyfill = interopDefault(polyfillModule);
function interopDefault(value) {
  return value && value.__esModule ? value : {
    default: value
  };
}
var createReactContext = React.default.createContext || createReactContextPolyfill.default;
legacyExports.default = createReactContext, legacyModule.exports = legacyExports["default"];
