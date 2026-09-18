var nativeSymbol = require("./nativeSymbol.js"),
  objectPrototype = Object.prototype,
  hasOwnProperty = objectPrototype.hasOwnProperty,
  nativeObjectToString = objectPrototype.toString,
  toStringTag = nativeSymbol ? nativeSymbol.toStringTag : void 0;

function getRawTag(value) {
  var hadOwnTag = hasOwnProperty.call(value, toStringTag),
    originalTag = value[toStringTag];

  try {
    value[toStringTag] = void 0;
    var tagWasUnmasked = !0;
  } catch (error) {}

  var result = nativeObjectToString.call(value);
  if (tagWasUnmasked) {
    if (hadOwnTag) value[toStringTag] = originalTag;else delete value[toStringTag];
  }
  return result;
}

module.exports = getRawTag;
