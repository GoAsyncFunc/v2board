let legacyModule = module,
  legacyExports = exports;
var r = require("./32612f68.js"),
  i = RegExp.prototype.exec;
legacyModule.exports = function (e, t) {
  var n = e.exec;
  if ("function" === typeof n) {
    var o = n.call(e, t);
    if ("object" !== typeof o) throw new TypeError("RegExp exec method returned something other than an Object or null");
    return o;
  }
  if ("RegExp" !== r(e)) throw new TypeError("RegExp#exec called on incompatible receiver");
  return i.call(e, t);
};
