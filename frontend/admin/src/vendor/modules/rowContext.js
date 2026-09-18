let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var createReactContextModule = require("./createReactContext.js"),
  createReactContext = interopDefault(createReactContextModule),
  RowContext = createReactContext()({});
legacyExports["a"] = RowContext;
