let legacyModule = module,
  legacyExports = exports;
var n = require("./warningOnce.js");
legacyExports["a"] = function (e, t, c) {
  Object(n["a"])(e, "[antd: ".concat(t, "] ").concat(c));
};
