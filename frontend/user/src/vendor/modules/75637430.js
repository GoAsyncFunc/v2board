let legacyModule = module,
  legacyExports = exports;
legacyExports.__esModule = !0;
var n = require("./reactRuntime.js"),
  r = a(n),
  o = require("./786d5661.js"),
  l = a(o);
function a(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
legacyExports.default = r.default.createContext || l.default, legacyModule.exports = legacyExports["default"];
