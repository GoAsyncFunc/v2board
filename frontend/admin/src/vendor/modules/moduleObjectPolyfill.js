"use strict";

module.exports = function applyWebpackModulePolyfill(moduleObject) {
  if (moduleObject.webpackPolyfill) return moduleObject;

  moduleObject.deprecate = function () {};
  moduleObject.paths = [];
  if (!moduleObject.children) moduleObject.children = [];

  Object.defineProperty(moduleObject, "loaded", {
    enumerable: true,
    get: function () {
      return moduleObject.l;
    }
  });
  Object.defineProperty(moduleObject, "id", {
    enumerable: true,
    get: function () {
      return moduleObject.i;
    }
  });

  moduleObject.webpackPolyfill = 1;
  return moduleObject;
};
