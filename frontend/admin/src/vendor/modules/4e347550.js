let legacyModule = module,
  legacyExports = exports;
var r = require("./63304f79.js"),
  i = require("./57474e57.js"),
  o = require("./30385178.js"),
  a = [].slice,
  s = /MSIE .\./.test(o),
  l = function (e) {
    return function (t, n) {
      var r = arguments.length > 2,
        i = !!r && a.call(arguments, 2);
      return e(r ? function () {
        ("function" == typeof t ? t : Function(t)).apply(this, i);
      } : t, n);
    };
  };
i(i.G + i.B + i.F * s, {
  setTimeout: l(r.setTimeout),
  setInterval: l(r.setInterval)
});
