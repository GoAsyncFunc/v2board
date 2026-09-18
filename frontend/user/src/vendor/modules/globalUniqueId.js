let legacyModule = module,
  legacyExports = exports;
(function (t) {
  var n = "__global_unique_id__";
  legacyModule.exports = function () {
    return t[n] = (t[n] || 0) + 1;
  };
}).call(this, require("./globalObjectLegacy.js"));
