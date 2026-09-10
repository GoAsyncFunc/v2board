let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var r = require("./51624c5a.js"),
  i = interopDefault(r);
function o(e, t) {
  for (var n = i()({}, e), r = 0; r < t.length; r++) {
    var o = t[r];
    delete n[o];
  }
  return n;
}
legacyExports["a"] = o;
