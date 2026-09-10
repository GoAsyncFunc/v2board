let legacyModule = module,
  legacyExports = exports;
"function" === typeof Object.create ? legacyModule.exports = function (e, t) {
  t && (e.super_ = t, e.prototype = Object.create(t.prototype, {
    constructor: {
      value: e,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }));
} : legacyModule.exports = function (e, t) {
  if (t) {
    e.super_ = t;
    var n = function () {};
    n.prototype = t.prototype, e.prototype = new n(), e.prototype.constructor = e;
  }
};
