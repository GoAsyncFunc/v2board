let legacyModule = module,
  legacyExports = exports;
var r = require("./isArray.js"),
  i = require("./39676747.js"),
  a = require("./474e694d.js"),
  o = require("./toString.js");
function u(e, t) {
  return r(e) ? e : i(e, t) ? [e] : a(o(e));
}
legacyModule.exports = u;
