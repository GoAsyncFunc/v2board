let legacyModule = module,
  legacyExports = exports;
var r = require("./hasOwnLegacy.js"),
  o = require("./toObject.js"),
  i = require("./56566c78.js")("IE_PROTO"),
  a = Object.prototype;
legacyModule.exports = Object.getPrototypeOf || function (e) {
  return e = o(e), r(e, i) ? e[i] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? a : null;
};
