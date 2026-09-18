let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.storeShape = void 0;
var r = require("./propTypesRuntime.js"),
  i = o(r);
function o(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
legacyExports.storeShape = i.default.shape({
  subscribe: i.default.func.isRequired,
  setState: i.default.func.isRequired,
  getState: i.default.func.isRequired
});
