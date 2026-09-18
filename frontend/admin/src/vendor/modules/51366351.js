let legacyModule = module,
  legacyExports = exports;
var r = require("./75382b75.js"),
  i = require("./42467438.js"),
  o = require("./wellKnownSymbol.js")("hasInstance"),
  a = Function.prototype;
o in a || require("./definePropertyHelper.js").f(a, o, {
  value: function (e) {
    if ("function" != typeof this || !r(e)) return !1;
    if (!r(this.prototype)) return e instanceof this;
    while (e = i(e)) if (this.prototype === e) return !0;
    return !1;
  }
});
