let legacyModule = module,
  legacyExports = exports;
var r = require("./propertyIsEnumerable.js"),
  i = require("./createPropertyDescriptor.js"),
  o = require("./toIndexedObject.js"),
  a = require("./toPrimitive.js"),
  s = require("./hasOwn.js"),
  l = require("./4137522b.js"),
  c = Object.getOwnPropertyDescriptor;
legacyExports.f = require("./descriptorsLegacySupport.js") ? c : function (e, t) {
  if (e = o(e), t = a(t, !0), l) try {
    return c(e, t);
  } catch (e) {}
  if (s(e, t)) return i(!r.f.call(e, t), e[t]);
};
