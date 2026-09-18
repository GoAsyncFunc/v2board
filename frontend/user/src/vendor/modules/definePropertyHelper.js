exports.__esModule = !0;
var definePropertyModule = require("./objectDefinePropertyDefault.js"),
  defineProperty = interopDefault(definePropertyModule);

function interopDefault(value) {
  return value && value.__esModule ? value : {
    default: value
  };
}

exports.default = function definePropertyHelper(target, key, value) {
  return key in target ? (0, defineProperty.default)(target, key, {
    value: value,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : target[key] = value, target;
};
