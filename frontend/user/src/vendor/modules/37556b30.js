let legacyModule = module,
  legacyExports = exports;
var r = require("./696c3471.js"),
  o = require("./53706333.js"),
  i = require("./4f735664.js");
legacyModule.exports = function (e) {
  var t = r(this),
    n = i(t.length),
    a = arguments.length,
    s = o(a > 1 ? arguments[1] : void 0, n),
    c = a > 2 ? arguments[2] : void 0,
    u = void 0 === c ? n : o(c, n);
  while (u > s) t[s++] = e;
  return t;
};
