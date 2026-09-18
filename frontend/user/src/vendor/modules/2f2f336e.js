let legacyModule = module,
  legacyExports = exports;
var r = require("./75382b75.js"),
  o = require("./assertObject.js"),
  i = function (e, t) {
    if (o(e), !r(t) && null !== t) throw TypeError(t + ": can't set as prototype!");
  };
legacyModule.exports = {
  set: Object.setPrototypeOf || ("__proto__" in {} ? function (e, t, r) {
    try {
      r = require("./77487272.js")(Function.call, require("./31354243.js").f(Object.prototype, "__proto__").set, 2), r(e, []), t = !(e instanceof Array);
    } catch (e) {
      t = !0;
    }
    return function (e, n) {
      return i(e, n), t ? e.__proto__ = n : r(e, n), e;
    };
  }({}, !1) : void 0),
  check: i
};
