let legacyModule = module,
  legacyExports = exports;
var r = require("./hasOwn.js"),
  i = require("./696c3471.js"),
  o = require("./4a35372f.js")("IE_PROTO"),
  a = Object.prototype;
legacyModule.exports = Object.getPrototypeOf || function (e) {
  return e = i(e), r(e, o) ? e[o] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? a : null;
};
