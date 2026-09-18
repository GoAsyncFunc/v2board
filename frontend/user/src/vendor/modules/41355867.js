let legacyModule = module,
  legacyExports = exports;
var r = require("./toArray.js"),
  o = require("./61722f70.js").f,
  i = {}.toString,
  a = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
  s = function (e) {
    try {
      return o(e);
    } catch (e) {
      return a.slice();
    }
  };
legacyModule.exports.f = function (e) {
  return a && "[object Window]" == i.call(e) ? s(e) : o(r(e));
};
