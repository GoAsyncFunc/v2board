let legacyModule = module,
  legacyExports = exports;
var isArray = require("./isArray.js"),
  isKey = require("./39676747.js"),
  stringToPath = require("./474e694d.js"),
  toString = require("./toString.js");
function castPath(value, object) {
  return isArray(value) ? value : isKey(value, object) ? [value] : stringToPath(toString(value));
}
legacyModule.exports = castPath;
