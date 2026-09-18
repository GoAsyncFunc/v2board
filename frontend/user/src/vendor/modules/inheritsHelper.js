exports.__esModule = !0;
var setPrototypeOfModule = require("./setPrototypeOfDefault.js"),
  setPrototypeOf = interopDefault(setPrototypeOfModule),
  objectCreateModule = require("./objectCreateDefault.js"),
  objectCreate = interopDefault(objectCreateModule),
  typeofModule = require("./typeofHelper.js"),
  typeOf = interopDefault(typeofModule);

function interopDefault(value) {
  return value && value.__esModule ? value : {
    default: value
  };
}

exports.default = function inheritsHelper(subClass, superClass) {
  if ("function" !== typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + ("undefined" === typeof superClass ? "undefined" : (0, typeOf.default)(superClass)));
  subClass.prototype = (0, objectCreate.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  });
  if (superClass) {
    if (setPrototypeOf.default) (0, setPrototypeOf.default)(subClass, superClass);else subClass.__proto__ = superClass;
  }
};
