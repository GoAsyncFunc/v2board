let legacyModule = module,
  legacyExports = exports;
var defineProperty = require("./definePropertyLegacy.js").f,
  hasOwn = require("./hasOwnLegacy.js"),
  toStringTag = require("./wellKnownSymbolLegacy.js")("toStringTag");
legacyModule.exports = function setToStringTag(target, tag, stat) {
  target && !hasOwn(target = stat ? target : target.prototype, toStringTag) && defineProperty(target, toStringTag, {
    configurable: !0,
    value: tag
  });
};
