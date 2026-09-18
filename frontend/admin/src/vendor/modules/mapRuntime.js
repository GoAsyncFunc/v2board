let legacyModule = module,
  legacyExports = exports;
var r = require("./43773475.js"),
  i = require("./collectionReceiver.js"),
  o = "Map";
legacyModule.exports = require("./collectionStrong.js")(o, function (e) {
  return function () {
    return e(this, arguments.length > 0 ? arguments[0] : void 0);
  };
}, {
  get: function (e) {
    var t = r.getEntry(i(this, o), e);
    return t && t.v;
  },
  set: function (e, t) {
    return r.def(i(this, o), 0 === e ? 0 : e, t);
  }
}, r, !0);
