let legacyModule = module,
  legacyExports = exports;
var r = require("./hasOwn.js"),
  o = require("./696c3471.js"),
  i = require("./4a35372f.js")("IE_PROTO"),
  a = Object.prototype;
legacyModule.exports = Object.getPrototypeOf || function (e) {
  return e = o(e), r(e, i) ? e[i] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? a : null;
};
