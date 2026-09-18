"use strict";

const hasOwnProperty = Object.prototype.hasOwnProperty;

module.exports = function copyOwnProperties() {
  const result = {};
  for (let argumentIndex = 0; argumentIndex < arguments.length; argumentIndex++) {
    const source = arguments[argumentIndex];
    for (const propertyName in source) {
      if (hasOwnProperty.call(source, propertyName)) {
        result[propertyName] = source[propertyName];
      }
    }
  }
  return result;
};
