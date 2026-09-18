let legacyModule = module,
  legacyExports = exports;
var toObject = require("./toArray.js"),
  getOwnPropertyNames = require("./getOwnPropertyNamesLegacy.js").f,
  objectToString = {}.toString,
  windowPropertyNames = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
  getWindowPropertyNames = function (object) {
    try {
      return getOwnPropertyNames(object);
    } catch (error) {
      return windowPropertyNames.slice();
    }
  };
legacyModule.exports.f = function getOwnPropertyNamesWindowSafe(object) {
  return windowPropertyNames && "[object Window]" == objectToString.call(object) ? getWindowPropertyNames(object) : getOwnPropertyNames(toObject(object));
};
