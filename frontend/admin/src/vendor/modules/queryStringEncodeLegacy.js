"use strict";

function stringifyPrimitive(value) {
  switch (typeof value) {
    case "string":
      return value;
    case "boolean":
      return value ? "true" : "false";
    case "number":
      return isFinite(value) ? value : "";
    default:
      return "";
  }
}

const isArray = Array.isArray || function isArray(value) {
  return Object.prototype.toString.call(value) === "[object Array]";
};

function map(values, callback) {
  if (values.map) return values.map(callback);

  const result = [];
  for (let index = 0; index < values.length; index++) {
    result.push(callback(values[index], index));
  }
  return result;
}

const objectKeys = Object.keys || function objectKeys(value) {
  const keys = [];
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) keys.push(key);
  }
  return keys;
};

module.exports = function encodeQueryString(value, separator, assignment, name) {
  separator = separator || "&";
  assignment = assignment || "=";
  if (value === null) value = undefined;

  if (typeof value === "object") {
    return map(objectKeys(value), function encodeProperty(key) {
      const keyPrefix = encodeURIComponent(stringifyPrimitive(key)) + assignment;
      if (isArray(value[key])) {
        return map(value[key], function encodeArrayValue(item) {
          return keyPrefix + encodeURIComponent(stringifyPrimitive(item));
        }).join(separator);
      }
      return keyPrefix + encodeURIComponent(stringifyPrimitive(value[key]));
    }).join(separator);
  }

  if (!name) return "";
  return encodeURIComponent(stringifyPrimitive(name)) + assignment +
    encodeURIComponent(stringifyPrimitive(value));
};
