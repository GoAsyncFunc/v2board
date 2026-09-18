let legacyModule = module,
  legacyExports = exports;
var r = require("./toStringTagType.js"),
  i = {};
i[require("./wellKnownSymbol.js")("toStringTag")] = "z", i + "" != "[object z]" && require("./redefine.js")(Object.prototype, "toString", function () {
  return "[object " + r(this) + "]";
}, !0);
