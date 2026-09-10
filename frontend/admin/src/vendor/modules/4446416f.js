let legacyModule = module,
  legacyExports = exports;
require("./427a3773.js");
var r = require("./3776594a.js"),
  i = require("./37744e78.js"),
  o = require("./385a2f56.js"),
  a = "toString",
  s = /./[a],
  l = function (e) {
    require("./724b496c.js")(RegExp.prototype, a, e, !0);
  };
require("./77555779.js")(function () {
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
