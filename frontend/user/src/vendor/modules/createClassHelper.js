exports.__esModule = !0;
var definePropertyModule = require("./objectDefinePropertyDefault.js"),
  defineProperty = interopDefault(definePropertyModule);

function interopDefault(value) {
  return value && value.__esModule ? value : {
    default: value
  };
}

exports.default = function () {
  function defineProperties(target, descriptors) {
    for (var index = 0; index < descriptors.length; index++) {
      var descriptor = descriptors[index];
      descriptor.enumerable = descriptor.enumerable || !1;
      descriptor.configurable = !0;
      if ("value" in descriptor) descriptor.writable = !0;
      (0, defineProperty.default)(target, descriptor.key, descriptor);
    }
  }
  return function createClass(constructor, prototypeDescriptors, staticDescriptors) {
    if (prototypeDescriptors) defineProperties(constructor.prototype, prototypeDescriptors);
    if (staticDescriptors) defineProperties(constructor, staticDescriptors);
    return constructor;
  };
}();
