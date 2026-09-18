let legacyModule = module,
  legacyExports = exports;
var castPath = require("./castPath.js"),
  toKey = require("./toKey.js");
function baseGet(object, path) {
  path = castPath(path, object);
  var index = 0,
    length = path.length;
  while (null != object && index < length) object = object[toKey(path[index++])];
  return index && index == length ? object : void 0;
}
legacyModule.exports = baseGet;
