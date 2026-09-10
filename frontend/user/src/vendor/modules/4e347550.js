let legacyModule = module,
  legacyExports = exports;
var r = require("./63304f79.js"),
  o = require("./57474e57.js"),
  i = require("./30385178.js"),
  a = [].slice,
  s = /MSIE .\./.test(i),
  c = function (e) {
    return function (t, n) {
      var r = arguments.length > 2,
        o = !!r && a.call(arguments, 2);
      return e(r ? function () {
        ("function" == typeof t ? t : Function(t)).apply(this, o);
      } : t, n);
    };
  };
o(o.G + o.B + o.F * s, {
  setTimeout: c(r.setTimeout),
  setInterval: c(r.setInterval)
});
