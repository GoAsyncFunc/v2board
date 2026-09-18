const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(exports, "a", function () {
  return tuple;
});
var tuple = function () {
  for (var length = arguments.length, values = new Array(length), index = 0; index < length; index++) values[index] = arguments[index];
  return values;
};
