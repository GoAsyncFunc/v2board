let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.create = legacyExports.connect = legacyExports.Provider = void 0;
var providerModule = require("./5a346578.js"),
  provider = interopDefault(providerModule),
  connectModule = require("./562f3649.js"),
  connect = interopDefault(connectModule),
  storeModule = require("./reduxStore.js"),
  createStore = interopDefault(storeModule);
function interopDefault(moduleValue) {
  return moduleValue && moduleValue.__esModule ? moduleValue : {
    default: moduleValue
  };
}
legacyExports.Provider = provider.default, legacyExports.connect = connect.default, legacyExports.create = createStore.default;
