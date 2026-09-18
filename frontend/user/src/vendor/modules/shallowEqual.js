let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule
} = require("../../app/moduleInterop.js");
markEsModule(legacyExports);
var getTypeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (value) {
  return typeof value;
} : function (value) {
  return value && "function" === typeof Symbol && value.constructor === Symbol && value !== Symbol.prototype ? "symbol" : typeof value;
};
function shallowEqual(firstValue, secondValue) {
  if (firstValue === secondValue) return !0;
  if (null == firstValue || null == secondValue) return !1;
  if (Array.isArray(firstValue)) return Array.isArray(secondValue) && firstValue.length === secondValue.length && firstValue.every(function (value, index) {
    return shallowEqual(value, secondValue[index]);
  });
  var firstType = "undefined" === typeof firstValue ? "undefined" : getTypeof(firstValue),
    secondType = "undefined" === typeof secondValue ? "undefined" : getTypeof(secondValue);
  if (firstType !== secondType) return !1;
  if ("object" === firstType) {
    var firstValueOf = firstValue.valueOf(),
      secondValueOf = secondValue.valueOf();
    if (firstValueOf !== firstValue || secondValueOf !== secondValue) return shallowEqual(firstValueOf, secondValueOf);
    var firstKeys = Object.keys(firstValue),
      secondKeys = Object.keys(secondValue);
    return firstKeys.length === secondKeys.length && firstKeys.every(function (key) {
      return shallowEqual(firstValue[key], secondValue[key]);
    });
  }
  return !1;
}
legacyExports["default"] = shallowEqual;
