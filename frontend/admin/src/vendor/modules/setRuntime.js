let legacyModule = module,
  legacyExports = exports;
var r = require("./43773475.js"),
  i = require("./collectionReceiver.js"),
  o = "Set";
legacyModule.exports = require("./collectionStrong.js")(o, function (e) {
  return function () {
    return e(this, arguments.length > 0 ? arguments[0] : void 0);
  };
}, {
  add: function (e) {
    return r.def(i(this, o), e = 0 === e ? 0 : e, e);
  }
}, r);
