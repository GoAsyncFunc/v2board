let legacyModule = module,
  legacyExports = exports;
var r = require("./propertyIsEnumerableLegacy.js"),
  o = require("./propertyDescriptorFlags.js"),
  i = require("./toArray.js"),
  a = require("./toPrimitive.js"),
  s = require("./hasOwnLegacy.js"),
  c = require("./65557446.js"),
  u = Object.getOwnPropertyDescriptor;
legacyExports.f = require("./descriptorsSupport.js") ? u : function (e, t) {
  if (e = i(e), t = a(t, !0), c) try {
    return u(e, t);
  } catch (e) {}
  if (s(e, t)) return o(!r.f.call(e, t), e[t]);
};
