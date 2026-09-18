let legacyModule = module,
  legacyExports = exports;
var r = require("./coreJsShared.js"),
  i = function () {
    var e = /[^.]+$/.exec(r && r.keys && r.keys.IE_PROTO || "");
    return e ? "Symbol(src)_1." + e : "";
  }();
function o(e) {
  return !!i && i in e;
}
legacyModule.exports = o;
