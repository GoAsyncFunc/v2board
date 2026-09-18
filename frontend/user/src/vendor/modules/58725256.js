let legacyModule = module,
  legacyExports = exports;
var r = require("./57474e57.js"),
  o = require("./696c3471.js"),
  i = require("./77596d38.js"),
  a = require("./definePropertyHelper.js");
require("./descriptorsLegacySupport.js") && r(r.P + require("./setterSupport.js"), "Object", {
  __defineGetter__: function (e, t) {
    a.f(o(this), e, {
      get: i(t),
      enumerable: !0,
      configurable: !0
    });
  }
});
