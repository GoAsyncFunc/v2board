let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var r = require("./51624c5a.js"),
  o = interopDefault(r);
function i(e, t) {
  for (var n = o()({}, e), r = 0; r < t.length; r++) {
    var i = t[r];
    delete n[i];
  }
  return n;
}
legacyExports["a"] = i;
