let legacyModule = module,
  legacyExports = exports;
require("./descriptorsLegacySupport.js") && "g" != /./g.flags && require("./definePropertyHelper.js").f(RegExp.prototype, "flags", {
  configurable: !0,
  get: require("./regexpFlags.js")
});
