let legacyModule = module,
  legacyExports = exports;
var r = require("./toStringTagType.js"),
  o = {};
o[require("./wellKnownSymbol.js")("toStringTag")] = "z", o + "" != "[object z]" && require("./724b496c.js")(Object.prototype, "toString", function () {
  return "[object " + r(this) + "]";
}, !0);
