let legacyModule = module,
  legacyExports = exports;
var r = require("./isObject.js"),
  o = require("./setPrototypeOfFallback.js").set;
legacyModule.exports = function (e, t, n) {
  var i,
    a = t.constructor;
  return a !== n && "function" == typeof a && (i = a.prototype) !== n.prototype && r(i) && o && o(e, i), e;
};
