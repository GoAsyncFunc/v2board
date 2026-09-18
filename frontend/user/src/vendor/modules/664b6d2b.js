let legacyModule = module,
  legacyExports = exports;
var r = require("./324f7332.js"),
  o = require("./collectionReceiver.js"),
  i = "WeakSet";
require("./collectionStrong.js")(i, function (e) {
  return function () {
    return e(this, arguments.length > 0 ? arguments[0] : void 0);
  };
}, {
  add: function (e) {
    return r.def(o(this, i), e, !0);
  }
}, r, !1, !0);
