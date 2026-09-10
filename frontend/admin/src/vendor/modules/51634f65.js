let legacyModule = module,
  legacyExports = exports;
var r = require("./476f7951.js"),
  i = require("./3673565a.js"),
  o = require("./37497833.js"),
  a = Object.prototype,
  s = a.hasOwnProperty;
function l(e) {
  if (!r(e)) return o(e);
  var t = i(e),
    n = [];
  for (var a in e) ("constructor" != a || !t && s.call(e, a)) && n.push(a);
  return n;
}
legacyModule.exports = l;
