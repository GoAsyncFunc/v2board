let legacyModule = module,
  legacyExports = exports;
var r = require("./43773475.js"),
  i = require("./4a633770.js"),
  o = "Set";
legacyModule.exports = require("./6e574d51.js")(o, function (e) {
  return function () {
    return e(this, arguments.length > 0 ? arguments[0] : void 0);
  };
}, {
  add: function (e) {
    return r.def(i(this, o), e = 0 === e ? 0 : e, e);
  }
}, r);
