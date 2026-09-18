let legacyModule = module,
  legacyExports = exports;
var r = require("./hasOwnLegacy.js"),
  i = require("./toObject.js"),
  o = require("./sharedKeyLegacy.js")("IE_PROTO"),
  a = Object.prototype;
legacyModule.exports = Object.getPrototypeOf || function (e) {
  return e = i(e), r(e, o) ? e[o] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? a : null;
};
