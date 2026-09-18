"use strict";

const toPropertyKey = require("./toPropertyKey.js");

function defineProperties(target, descriptors) {
  for (let index = 0; index < descriptors.length; index++) {
    const descriptor = descriptors[index];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}

function createClass(constructor, prototypeDescriptors, staticDescriptors) {
  if (prototypeDescriptors) defineProperties(constructor.prototype, prototypeDescriptors);
  if (staticDescriptors) defineProperties(constructor, staticDescriptors);
  Object.defineProperty(constructor, "prototype", { writable: false });
  return constructor;
}

module.exports = createClass;
module.exports.__esModule = true;
module.exports.default = module.exports;
