"use strict";

function hasOwnProperty(value, key) {
  return Object.prototype.hasOwnProperty.call(value, key);
}

const isArray = Array.isArray || function isArray(value) {
  return Object.prototype.toString.call(value) === "[object Array]";
};

module.exports = function decodeQueryString(query, separator, assignment, options) {
  separator = separator || "&";
  assignment = assignment || "=";

  const result = {};
  if (typeof query !== "string" || query.length === 0) return result;

  const plusPattern = /\+/g;
  const entries = query.split(separator);
  let maxKeys = 1000;
  if (options && typeof options.maxKeys === "number") maxKeys = options.maxKeys;

  let entryCount = entries.length;
  if (maxKeys > 0 && entryCount > maxKeys) entryCount = maxKeys;

  for (let index = 0; index < entryCount; index++) {
    const entry = entries[index].replace(plusPattern, "%20");
    const assignmentIndex = entry.indexOf(assignment);
    let encodedKey;
    let encodedValue;

    if (assignmentIndex >= 0) {
      encodedKey = entry.substr(0, assignmentIndex);
      encodedValue = entry.substr(assignmentIndex + 1);
    } else {
      encodedKey = entry;
      encodedValue = "";
    }

    const key = decodeURIComponent(encodedKey);
    const value = decodeURIComponent(encodedValue);
    if (hasOwnProperty(result, key)) {
      if (isArray(result[key])) result[key].push(value);
      else result[key] = [result[key], value];
    } else {
      result[key] = value;
    }
  }

  return result;
};
