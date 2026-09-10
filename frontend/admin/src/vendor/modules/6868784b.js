let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return i;
}), defineExport(legacyExports, "b", function () {
  return o;
});
var r = require("./344e4f34.js"),
  i = Object(r["m"])(),
  o = function (e, t, n, r) {
    if (r) {
      var o = i(r);
      o.dataIndex = n, o.dataType = t, o.seriesIndex = e, "group" === r.type && r.traverse(function (r) {
        var o = i(r);
        o.seriesIndex = e, o.dataIndex = n, o.dataType = t;
      });
    }
  };
