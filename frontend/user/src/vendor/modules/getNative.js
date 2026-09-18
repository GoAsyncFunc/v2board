var baseIsNative = require("./baseIsNative.js"),
  getValue = require("./getProperty.js");

function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}

module.exports = getNative;
