let legacyModule = module,
  legacyExports = exports;
var r = require("./75382b75.js"),
  i = require("./2f2f336e.js").set;
legacyModule.exports = function (e, t, n) {
  var o,
    a = t.constructor;
  return a !== n && "function" == typeof a && (o = a.prototype) !== n.prototype && r(o) && i && i(e, o), e;
};
