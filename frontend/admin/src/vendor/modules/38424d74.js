let legacyModule = module,
  legacyExports = exports;
var r = require("./isObject.js");
legacyModule.exports = function (e, t) {
  if (!r(e)) return e;
  var n, i;
  if (t && "function" == typeof (n = e.toString) && !r(i = n.call(e))) return i;
  if ("function" == typeof (n = e.valueOf) && !r(i = n.call(e))) return i;
  if (!t && "function" == typeof (n = e.toString) && !r(i = n.call(e))) return i;
  throw TypeError("Can't convert object to primitive value");
};
