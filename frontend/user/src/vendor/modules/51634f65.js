let legacyModule = module,
  legacyExports = exports;
var r = require("./isObjectValue.js"),
  i = require("./isPrototype.js"),
  a = require("./keysIn.js"),
  o = Object.prototype,
  u = o.hasOwnProperty;
function l(e) {
  if (!r(e)) return a(e);
  var t = i(e),
    n = [];
  for (var o in e) ("constructor" != o || !t && u.call(e, o)) && n.push(o);
  return n;
}
legacyModule.exports = l;
