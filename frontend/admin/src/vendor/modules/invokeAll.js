let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
function invokeAll() {
  var functions = [].slice.call(arguments, 0);
  return 1 === functions.length ? functions[0] : function () {
    for (var index = 0; index < functions.length; index++) functions[index] && functions[index].apply && functions[index].apply(this, arguments);
  };
}
defineExport(legacyExports, "a", function () {
  return invokeAll;
});
