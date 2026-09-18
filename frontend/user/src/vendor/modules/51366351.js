let legacyModule = module,
  legacyExports = exports;
var r = require("./75382b75.js"),
  o = require("./42467438.js"),
  i = require("./wellKnownSymbol.js")("hasInstance"),
  a = Function.prototype;
i in a || require("./definePropertyHelper.js").f(a, i, {
  value: function (e) {
    if ("function" != typeof this || !r(e)) return !1;
    if (!r(this.prototype)) return e instanceof this;
    while (e = o(e)) if (this.prototype === e) return !0;
    return !1;
  }
});
