let legacyModule = module,
  legacyExports = exports;
var isArray = require("./isArray.js"),
  isSymbol = require("./isSymbol.js"),
  a = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
  o = /^\w*$/;
function isKeyPath(value, object) {
  if (isArray(value)) return !1;
  var valueType = typeof value;
  return !("number" != valueType && "symbol" != valueType && "boolean" != valueType && null != value && !isSymbol(value)) || o.test(value) || !a.test(value) || null != object && value in Object(object);
}
legacyModule.exports = isKeyPath;
