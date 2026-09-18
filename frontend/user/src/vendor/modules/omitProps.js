const {
  interopDefault
} = require("../../app/moduleInterop.js");
var objectAssignModule = require("./objectAssignHelper.js"),
  objectAssign = interopDefault(objectAssignModule);

function omitProps(source, excludedKeys) {
  for (var result = objectAssign()({}, source), index = 0; index < excludedKeys.length; index++) {
    var key = excludedKeys[index];
    delete result[key];
  }
  return result;
}

exports["a"] = omitProps;
