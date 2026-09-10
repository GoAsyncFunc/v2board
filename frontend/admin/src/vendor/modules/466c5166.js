let legacyModule = module,
  legacyExports = exports;
var r = require("./63634537.js")(!0);
require("./4d504670.js")(String, "String", function (e) {
  this._t = String(e), this._i = 0;
}, function () {
  var e,
    t = this._t,
    n = this._i;
  return n >= t.length ? {
    value: void 0,
    done: !0
  } : (e = r(t, n), this._i += e.length, {
    value: e,
    done: !1
  });
});
