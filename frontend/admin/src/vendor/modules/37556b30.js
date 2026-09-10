let legacyModule = module,
  legacyExports = exports;
var r = require("./696c3471.js"),
  i = require("./53706333.js"),
  o = require("./4f735664.js");
legacyModule.exports = function (e) {
  var t = r(this),
    n = o(t.length),
    a = arguments.length,
    s = i(a > 1 ? arguments[1] : void 0, n),
    l = a > 2 ? arguments[2] : void 0,
    c = void 0 === l ? n : i(l, n);
  while (c > s) t[s++] = e;
  return t;
};
