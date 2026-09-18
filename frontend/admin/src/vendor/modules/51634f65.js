let legacyModule = module,
  legacyExports = exports;
var r = require("./isObjectValue.js"),
  i = require("./3673565a.js"),
  o = require("./keysIn.js"),
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
