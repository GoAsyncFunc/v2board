exports.__esModule = !0;
var iteratorModule = require("./iteratorDefault.js"),
  iteratorSymbol = interopDefault(iteratorModule),
  symbolModule = require("./symbolRuntimeDefault.js"),
  SymbolConstructor = interopDefault(symbolModule),
  nativeTypeof = "function" === typeof SymbolConstructor.default && "symbol" === typeof iteratorSymbol.default ? function (value) {
    return typeof value;
  } : function (value) {
    return value && "function" === typeof SymbolConstructor.default && value.constructor === SymbolConstructor.default && value !== SymbolConstructor.default.prototype ? "symbol" : typeof value;
  };

function interopDefault(value) {
  return value && value.__esModule ? value : {
    default: value
  };
}

exports.default = "function" === typeof SymbolConstructor.default && "symbol" === nativeTypeof(iteratorSymbol.default) ? function typeOf(value) {
  return "undefined" === typeof value ? "undefined" : nativeTypeof(value);
} : function typeOf(value) {
  return value && "function" === typeof SymbolConstructor.default && value.constructor === SymbolConstructor.default && value !== SymbolConstructor.default.prototype ? "symbol" : "undefined" === typeof value ? "undefined" : nativeTypeof(value);
};
