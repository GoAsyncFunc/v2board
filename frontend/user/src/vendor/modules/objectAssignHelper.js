exports.__esModule = !0;
var objectAssignModule = require("./objectAssignDefault.js"),
  objectAssign = interopDefault(objectAssignModule);

function interopDefault(value) {
  return value && value.__esModule ? value : {
    default: value
  };
}

exports.default = objectAssign.default || function assign(target) {
  for (var sourceIndex = 1; sourceIndex < arguments.length; sourceIndex++) {
    var source = arguments[sourceIndex];
    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
  }
  return target;
};
