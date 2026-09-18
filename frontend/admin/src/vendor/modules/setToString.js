let legacyModule = module,
  legacyExports = exports;
var baseSetToString = require("./baseSetToString.js"),
  shortOut = require("./shortOut.js"),
  setToString = shortOut(baseSetToString);
legacyModule.exports = setToString;
