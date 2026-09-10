let legacyModule = module,
  legacyExports = exports;
var r = require("./476f7951.js"),
  i = require("./3673565a.js"),
  a = require("./37497833.js"),
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
