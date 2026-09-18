let legacyModule = module,
  legacyExports = exports;
var hasOwn = require("./hasOwnLegacy.js"),
  toObject = require("./toObject.js"),
  ieProtoKey = require("./sharedKeyLegacy.js")("IE_PROTO"),
  objectPrototype = Object.prototype;
legacyModule.exports = Object.getPrototypeOf || function getPrototypeOf(object) {
  return object = toObject(object), hasOwn(object, ieProtoKey) ? object[ieProtoKey] : "function" == typeof object.constructor && object instanceof object.constructor ? object.constructor.prototype : object instanceof Object ? objectPrototype : null;
};
