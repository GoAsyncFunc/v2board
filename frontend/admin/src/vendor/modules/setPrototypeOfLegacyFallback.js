let legacyModule = module,
  legacyExports = exports;
var isObject = require("./isObject.js"),
  assertObject = require("./assertObjectLegacy.js"),
  checkPrototype = function (object, prototype) {
    if (assertObject(object), !isObject(prototype) && null !== prototype) throw TypeError(prototype + ": can't set as prototype!");
  };
legacyModule.exports = {
  set: Object.setPrototypeOf || ("__proto__" in {} ? function (e, t, r) {
    try {
      r = require("./32475450.js")(Function.call, require("./7677754c.js").f(Object.prototype, "__proto__").set, 2), r(e, []), t = !(e instanceof Array);
    } catch (e) {
      t = !0;
    }
    return function (object, prototype) {
      return checkPrototype(object, prototype), t ? object.__proto__ = prototype : r(object, prototype), object;
    };
  }({}, !1) : void 0),
  check: checkPrototype
};
