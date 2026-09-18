let legacyModule = module,
  legacyExports = exports;
var assignValue = require("./assignValue.js"),
  baseAssignValue = require("./baseAssignValue.js");
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1,
    length = props.length;
  while (++index < length) {
    var key = props[index],
      newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    void 0 === newValue && (newValue = source[key]), isNew ? baseAssignValue(object, key, newValue) : assignValue(object, key, newValue);
  }
  return object;
}
legacyModule.exports = copyObject;
