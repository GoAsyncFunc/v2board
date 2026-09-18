let legacyModule = module,
  legacyExports = exports;
var hasOwn = require("./hasOwn.js"),
  toObject = require("./toObjectLegacy.js"),
  ieProtoKey = require("./sharedKey.js")("IE_PROTO"),
  objectPrototype = Object.prototype;
legacyModule.exports = Object.getPrototypeOf || function getPrototypeOf(object) {
  return object = toObject(object), hasOwn(object, ieProtoKey) ? object[ieProtoKey] : "function" == typeof object.constructor && object instanceof object.constructor ? object.constructor.prototype : object instanceof Object ? objectPrototype : null;
};
