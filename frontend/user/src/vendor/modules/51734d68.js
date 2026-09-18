let legacyModule = module,
  legacyExports = exports;
var r = require("./57474e57.js"),
  o = require("./77596d38.js"),
  i = require("./696c3471.js"),
  a = require("./tryCatchTest.js"),
  s = [].sort,
  c = [1, 2, 3];
r(r.P + r.F * (a(function () {
  c.sort(void 0);
}) || !a(function () {
  c.sort(null);
}) || !require("./6c306b7a.js")(s)), "Array", {
  sort: function (e) {
    return void 0 === e ? s.call(i(this)) : s.call(i(this), o(e));
  }
});
