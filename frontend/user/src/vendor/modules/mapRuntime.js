let legacyModule = module,
  legacyExports = exports;
var r = require("./43773475.js"),
  o = require("./collectionReceiver.js"),
  i = "Map";
legacyModule.exports = require("./collectionStrong.js")(i, function (e) {
  return function () {
    return e(this, arguments.length > 0 ? arguments[0] : void 0);
  };
}, {
  get: function (e) {
    var t = r.getEntry(o(this, i), e);
    return t && t.v;
  },
  set: function (e, t) {
    return r.def(o(this, i), 0 === e ? 0 : e, t);
  }
}, r, !0);
