let legacyModule = module,
  legacyExports = exports;
var r = require("./toStringTagType.js"),
  o = {};
o[require("./wellKnownSymbol.js")("toStringTag")] = "z", o + "" != "[object z]" && require("./redefine.js")(Object.prototype, "toString", function () {
  return "[object " + r(this) + "]";
}, !0);
