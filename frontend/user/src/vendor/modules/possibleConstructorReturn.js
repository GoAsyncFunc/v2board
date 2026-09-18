let legacyModule = module,
  legacyExports = exports;
legacyExports.__esModule = !0;
var typeofModule = require("./typeofHelper.js"),
  typeOf = interopDefault(typeofModule);
function interopDefault(value) {
  return value && value.__esModule ? value : {
    default: value
  };
}
legacyExports.default = function possibleConstructorReturn(self, callResult) {
  if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !callResult || "object" !== ("undefined" === typeof callResult ? "undefined" : (0, typeOf.default)(callResult)) && "function" !== typeof callResult ? self : callResult;
};
