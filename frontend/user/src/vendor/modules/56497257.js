let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.storeShape = void 0;
var r = require("./31377839.js"),
  o = i(r);
function i(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
legacyExports.storeShape = o.default.shape({
  subscribe: o.default.func.isRequired,
  setState: o.default.func.isRequired,
  getState: o.default.func.isRequired
});
