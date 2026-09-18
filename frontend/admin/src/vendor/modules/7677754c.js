let legacyModule = module,
  legacyExports = exports;
var r = require("./propertyIsEnumerableLegacy.js"),
  i = require("./propertyDescriptorFlags.js"),
  o = require("./toArray.js"),
  a = require("./toPrimitive.js"),
  s = require("./hasOwnLegacy.js"),
  l = require("./65557446.js"),
  c = Object.getOwnPropertyDescriptor;
legacyExports.f = require("./descriptorsSupport.js") ? c : function (e, t) {
  if (e = o(e), t = a(t, !0), l) try {
    return c(e, t);
  } catch (e) {}
  if (s(e, t)) return i(!r.f.call(e, t), e[t]);
};
