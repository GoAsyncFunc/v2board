let legacyModule = module,
  legacyExports = exports;
var r = require("./trimEndIndex.js"),
  i = /^\s+/;
function o(e) {
  return e ? e.slice(0, r(e) + 1).replace(i, "") : e;
}
legacyModule.exports = o;
