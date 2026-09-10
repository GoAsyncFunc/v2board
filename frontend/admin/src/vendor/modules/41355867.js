let legacyModule = module,
  legacyExports = exports;
var r = require("./4e734f2f.js"),
  i = require("./61722f70.js").f,
  o = {}.toString,
  a = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
  s = function (e) {
    try {
      return i(e);
    } catch (e) {
      return a.slice();
    }
  };
legacyModule.exports.f = function (e) {
  return a && "[object Window]" == o.call(e) ? s(e) : i(r(e));
};
