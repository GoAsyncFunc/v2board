"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var hasOwnProperty = Object.prototype.hasOwnProperty;
var objectToString = Object.prototype.toString;

var supportsDefineProperty = (function () {
  try {
    return Boolean(Object.defineProperty({}, "test", {}));
  } catch (error) {
    return false;
  }
})();

var defineProperty = supportsDefineProperty
  ? Object.defineProperty
  : function definePropertyFallback(object, property, descriptor) {
      if ("get" in descriptor && object.__defineGetter__) {
        object.__defineGetter__(property, descriptor.get);
      } else if (!hasOwnProperty.call(object, property) || "value" in descriptor) {
        object[property] = descriptor.value;
      }
    };

var objCreate = Object.create || function createObjectFallback(prototype, properties) {
  function TemporaryConstructor() {}
  TemporaryConstructor.prototype = prototype;
  var object = new TemporaryConstructor();
  for (var property in properties) {
    if (hasOwnProperty.call(properties, property)) {
      defineProperty(object, property, properties[property]);
    }
  }
  return object;
};

var arrIndexOf = Array.prototype.indexOf || function indexOfFallback(value, startIndex) {
  if (!this.length) return -1;
  for (var index = startIndex || 0; index < this.length; index++) {
    if (this[index] === value) return index;
  }
  return -1;
};

var isArray = Array.isArray || function isArrayFallback(value) {
  return objectToString.call(value) === "[object Array]";
};

var dateNow = Date.now || function dateNowFallback() {
  return new Date().getTime();
};

exports.defineProperty = defineProperty;
exports.objCreate = objCreate;
exports.arrIndexOf = arrIndexOf;
exports.isArray = isArray;
exports.dateNow = dateNow;
