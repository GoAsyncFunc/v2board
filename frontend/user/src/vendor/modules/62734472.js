let legacyModule = module,
  legacyExports = exports;
var r = require("./32612f68.js"),
  o = RegExp.prototype.exec;
legacyModule.exports = function (e, t) {
  var n = e.exec;
  if ("function" === typeof n) {
    var i = n.call(e, t);
    if ("object" !== typeof i) throw new TypeError("RegExp exec method returned something other than an Object or null");
    return i;
  }
  if ("RegExp" !== r(e)) throw new TypeError("RegExp#exec called on incompatible receiver");
  return o.call(e, t);
};
