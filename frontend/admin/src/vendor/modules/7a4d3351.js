let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return i;
});
var r = require("./344e4f34.js");
function i() {
  var e = Object(r["m"])();
  return function (t) {
    var n = e(t),
      r = t.pipelineContext,
      i = !!n.large,
      o = !!n.progressiveRender,
      a = n.large = !(!r || !r.large),
      s = n.progressiveRender = !(!r || !r.progressiveRender);
    return !(i === a && o === s) && "reset";
  };
}
