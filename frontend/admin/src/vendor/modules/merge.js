let legacyModule = module,
  legacyExports = exports;
var baseMerge = require("./baseMerge.js"),
  createAssigner = require("./createAssigner.js"),
  merge = createAssigner(function (object, source, sourceIndex) {
    baseMerge(object, source, sourceIndex);
  });
legacyModule.exports = merge;
