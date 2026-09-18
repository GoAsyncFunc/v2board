let legacyModule = module,
  legacyExports = exports;
var warningOnce = require("./warningOnce.js");
legacyExports["a"] = function (condition, componentName, message) {
  Object(warningOnce["a"])(condition, "[antd: ".concat(componentName, "] ").concat(message));
};
