let legacyModule = module,
  legacyExports = exports;
var r = require("./definePropertyHelper.js"),
  o = require("./createPropertyDescriptor.js");
legacyModule.exports = function (e, t, n) {
  t in e ? r.f(e, t, o(0, n)) : e[t] = n;
};
