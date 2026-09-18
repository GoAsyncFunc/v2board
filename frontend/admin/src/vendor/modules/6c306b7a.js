let legacyModule = module,
  legacyExports = exports;
var r = require("./tryCatchTest.js");
legacyModule.exports = function (e, t) {
  return !!e && r(function () {
    t ? e.call(null, function () {}, 1) : e.call(null);
  });
};
