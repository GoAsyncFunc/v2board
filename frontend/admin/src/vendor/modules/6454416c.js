let legacyModule = module,
  legacyExports = exports;
var r = require("./476f7951.js"),
  i = Object.create,
  o = function () {
    function e() {}
    return function (t) {
      if (!r(t)) return {};
      if (i) return i(t);
      e.prototype = t;
      var n = new e();
      return e.prototype = void 0, n;
    };
  }();
legacyModule.exports = o;
