let legacyModule = module,
  legacyExports = exports;
require("./427a3773.js");
var r = require("./assertObject.js"),
  o = require("./37744e78.js"),
  i = require("./descriptorsLegacySupport.js"),
  a = "toString",
  s = /./[a],
  c = function (e) {
    require("./724b496c.js")(RegExp.prototype, a, e, !0);
  };
require("./77555779.js")(function () {
  return "/a/b" != s.call({
    source: "a",
    flags: "b"
  });
}) ? c(function () {
  var e = r(this);
  return "/".concat(e.source, "/", "flags" in e ? e.flags : !i && e instanceof RegExp ? o.call(e) : void 0);
}) : s.name != a && c(function () {
  return s.call(this);
});
