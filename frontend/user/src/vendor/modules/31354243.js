let legacyModule = module,
  legacyExports = exports;
var r = require("./propertyIsEnumerable.js"),
  o = require("./createPropertyDescriptor.js"),
  i = require("./4f654f43.js"),
  a = require("./toPrimitive.js"),
  s = require("./hasOwn.js"),
  c = require("./4137522b.js"),
  u = Object.getOwnPropertyDescriptor;
legacyExports.f = require("./descriptorsLegacySupport.js") ? u : function (e, t) {
  if (e = i(e), t = a(t, !0), c) try {
    return u(e, t);
  } catch (e) {}
  if (s(e, t)) return o(!r.f.call(e, t), e[t]);
};
