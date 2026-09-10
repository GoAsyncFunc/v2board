let legacyModule = module,
  legacyExports = exports;
var r = require("./43773475.js"),
  o = require("./4a633770.js"),
  i = "Set";
legacyModule.exports = require("./6e574d51.js")(i, function (e) {
  return function () {
    return e(this, arguments.length > 0 ? arguments[0] : void 0);
  };
}, {
  add: function (e) {
    return r.def(o(this, i), e = 0 === e ? 0 : e, e);
  }
}, r);
