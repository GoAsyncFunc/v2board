let legacyModule = module,
  legacyExports = exports;
var r = require("./isArray.js"),
  i = require("./39676747.js"),
  o = require("./474e694d.js"),
  a = require("./6474307a.js");
function s(e, t) {
  return r(e) ? e : i(e, t) ? [e] : o(a(e));
}
legacyModule.exports = s;
