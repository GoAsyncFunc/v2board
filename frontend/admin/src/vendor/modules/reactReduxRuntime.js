let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.create = legacyExports.connect = legacyExports.Provider = void 0;
var r = require("./5a346578.js"),
  i = c(r),
  o = require("./562f3649.js"),
  a = c(o),
  s = require("./reduxStore.js"),
  l = c(s);
function c(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
legacyExports.Provider = i.default, legacyExports.connect = a.default, legacyExports.create = l.default;
