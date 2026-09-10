let legacyModule = module,
  legacyExports = exports;
var r = require("./39334934.js"),
  i = require("./354b375a.js"),
  o = function (e, t) {
    if (i(e), !r(t) && null !== t) throw TypeError(t + ": can't set as prototype!");
  };
legacyModule.exports = {
  set: Object.setPrototypeOf || ("__proto__" in {} ? function (e, t, r) {
    try {
      r = require("./32475450.js")(Function.call, require("./7677754c.js").f(Object.prototype, "__proto__").set, 2), r(e, []), t = !(e instanceof Array);
    } catch (e) {
      t = !0;
    }
    return function (e, n) {
      return o(e, n), t ? e.__proto__ = n : r(e, n), e;
    };
  }({}, !1) : void 0),
  check: o
};
