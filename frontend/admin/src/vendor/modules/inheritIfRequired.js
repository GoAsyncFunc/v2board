let legacyModule = module,
  legacyExports = exports;
var r = require("./isObject.js"),
  i = require("./setPrototypeOfFallback.js").set;
legacyModule.exports = function (e, t, n) {
  var o,
    a = t.constructor;
  return a !== n && "function" == typeof a && (o = a.prototype) !== n.prototype && r(o) && i && i(e, o), e;
};
