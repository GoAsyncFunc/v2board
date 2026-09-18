let legacyModule = module,
  legacyExports = exports;
require("./427a3773.js");
var r = require("./assertObject.js"),
  i = require("./37744e78.js"),
  o = require("./descriptorsLegacySupport.js"),
  a = "toString",
  s = /./[a],
  l = function (e) {
    require("./redefine.js")(RegExp.prototype, a, e, !0);
  };
require("./tryCatchTest.js")(function () {
  return "/a/b" != s.call({
    source: "a",
    flags: "b"
  });
}) ? l(function () {
  var e = r(this);
  return "/".concat(e.source, "/", "flags" in e ? e.flags : !o && e instanceof RegExp ? i.call(e) : void 0);
}) : s.name != a && l(function () {
  return s.call(this);
});
