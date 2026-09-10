let legacyModule = module,
  legacyExports = exports;
var r = require("./32776532.js"),
  i = require("./674c374e.js")("toStringTag"),
  o = "Arguments" == r(function () {
    return arguments;
  }()),
  a = function (e, t) {
    try {
      return e[t];
    } catch (e) {}
  };
legacyModule.exports = function (e) {
  var t, n, s;
  return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (n = a(t = Object(e), i)) ? n : o ? r(t) : "Object" == (s = r(t)) && "function" == typeof t.callee ? "Arguments" : s;
};
