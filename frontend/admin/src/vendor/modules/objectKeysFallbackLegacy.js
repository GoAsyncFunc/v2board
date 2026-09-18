let legacyModule = module,
  legacyExports = exports;
var hasOwn = require("./hasOwnLegacy.js"),
  toArray = require("./toArray.js"),
  indexOf = require("./arrayIndexOfLegacyFactory.js")(!1),
  ieProtoKey = require("./sharedKeyLegacy.js")("IE_PROTO");
legacyModule.exports = function getObjectKeys(object, hiddenKeys) {
  var key,
    arrayLikeObject = toArray(object),
    hiddenKeyIndex = 0,
    keys = [];
  for (key in arrayLikeObject) key != ieProtoKey && hasOwn(arrayLikeObject, key) && keys.push(key);
  while (hiddenKeys.length > hiddenKeyIndex) hasOwn(arrayLikeObject, key = hiddenKeys[hiddenKeyIndex++]) && (~indexOf(keys, key) || keys.push(key));
  return keys;
};
