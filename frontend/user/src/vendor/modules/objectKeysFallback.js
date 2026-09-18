let legacyModule = module,
  legacyExports = exports;
var hasOwn = require("./hasOwn.js"),
  toIndexedObject = require("./toIndexedObject.js"),
  indexOf = require("./arrayIndexOfFactory.js")(!1),
  ieProtoKey = require("./sharedKey.js")("IE_PROTO");
legacyModule.exports = function getObjectKeys(object, hiddenKeys) {
  var key,
    indexedObject = toIndexedObject(object),
    hiddenKeyIndex = 0,
    keys = [];
  for (key in indexedObject) key != ieProtoKey && hasOwn(indexedObject, key) && keys.push(key);
  while (hiddenKeys.length > hiddenKeyIndex) hasOwn(indexedObject, key = hiddenKeys[hiddenKeyIndex++]) && (~indexOf(keys, key) || keys.push(key));
  return keys;
};
