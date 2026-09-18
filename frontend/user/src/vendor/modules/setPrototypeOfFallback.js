let legacyModule = module,
  legacyExports = exports;
var isObject = require("./isObject.js"),
  assertObject = require("./assertObject.js"),
  checkPrototype = function (object, prototype) {
    if (assertObject(object), !isObject(prototype) && null !== prototype) throw TypeError(prototype + ": can't set as prototype!");
  };
legacyModule.exports = {
  set: Object.setPrototypeOf || ("__proto__" in {} ? function (e, t, r) {
    try {
      r = require("./bindContextLegacy.js")(Function.call, require("./getOwnPropertyDescriptor.js").f(Object.prototype, "__proto__").set, 2), r(e, []), t = !(e instanceof Array);
    } catch (e) {
      t = !0;
    }
    return function (object, prototype) {
      return checkPrototype(object, prototype), t ? object.__proto__ = prototype : r(object, prototype), object;
    };
  }({}, !1) : void 0),
  check: checkPrototype
};
