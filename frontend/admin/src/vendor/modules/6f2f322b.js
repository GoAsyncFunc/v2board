let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var n = require("./createReactContext.js"),
  r = interopDefault(n),
  o = r()({});
legacyExports["a"] = o;
